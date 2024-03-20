
#include "ObjectToTopo.h"
#include <fstream>
#include <iostream>
#include <algorithm>
#include <string>
#include <limits>
#include <cmath>
#include <iomanip>
#include <limits>
#include <sstream>
#include <cmath>

#define MAX_FLT std::numeric_limits<float>::max()
#define MIN_FLT std::numeric_limits<float>::min()

std::vector<std::string> splitString(std::string str, std::string delim)
{
	std::string token;
	std::stringstream ss(str);
	std::vector<std::string> v;
	while (std::getline(ss, token, ' '))
	{
		v.push_back(token);
	}
	return v;
}

float sigmoid(float x)
{
	return 1 / (1 + exp(-x));
}

ObjectToTopo::ObjectToTopo() : axisChar('y')
{
}

void ObjectToTopo::readObj()
{
	std::cout << "Reading obj file..." << std::endl;
	std::cout << inFile << std::endl;
	std::ifstream obj(inFile);
	xyz.clear();

	lCorner.fill(MAX_FLT);
	hCorner.fill(MIN_FLT);
	std::string line;
	while (std::getline(obj, line))
	{
		if (line[0] == 'v' && line[1] == ' ')
		{
			Vec3 v;
			std::string x, y, z;

			int i = 2;
			while (line[i] != ' ')
			{
				x += line[i];
				i++;
			}
			i++;
			while (line[i] != ' ')
			{
				y += line[i];
				i++;
			}
			i++;
			while (line[i] != ' ' && line[i] != '\0')
			{
				z += line[i];
				i++;
			}

			if (axisChar == 'x')
			{
				v.x = std::stof(y);
				v.y = std::stof(z);
				v.z = std::stof(x);
			}
			else if (axisChar == 'y')
			{
				v.x = std::stof(z);
				v.y = std::stof(x);
				v.z = std::stof(y);
			}
			else if (axisChar == 'z')
			{
				v.x = std::stof(x);
				v.y = std::stof(y);
				v.z = std::stof(z);
			}

			updateBound(v);
			xyz.push_back(v);
		}
	}
	xyz.shrink_to_fit();
}

void ObjectToTopo::readPLY()
{
	xyz.clear();
	std::cout << "Reading PLY File..." << std::endl;
	std::ifstream ply(inFile);
	xyz.clear();

	lCorner.fill(MAX_FLT);
	hCorner.fill(MIN_FLT);
	std::string line;

	int num_properties = 0;
	int num_vertices;
	int num_elements = 0;

	bool header = true;

	// Parse Header
	while (std::getline(ply, line) && header == true && num_elements <= 1)
	{
		if (line.find("end_header") != std::string::npos)
		{
			header = false;
		}
		std::vector<std::string> lineVector = splitString(line, " ");
		if (lineVector[0] == "element")
		{
			num_elements++;
			if (lineVector[1] == "vertex")
			{
				num_vertices = std::stoi(lineVector[2]);
				std::cout << line << std::endl;
			}
		}
		if (lineVector[0] == "property")
		{
			num_properties++;
		}
	}
	std::cout << "Num properties: " << num_properties << std::endl;
	std::cout << "Num vertices: " << num_vertices << std::endl;

	//Parse body
	//Assumes x, y, z are the first 3 properties
	int cycle_value = 0;
	int num_processed_vertices = 0;
	Vec3 persistent_v;
	int i = 0;
	while (std::getline(ply, line) && num_processed_vertices < num_vertices)
	{
		i++;
		std::vector<std::string> lineVec = splitString(line, " ");
		if (lineVec.size() != 1)
		{
			for (std::string property : lineVec)
			{
				cycle_value++;
				if (cycle_value == 1)
				{
					persistent_v.x = (std::stof(property)); // add sigmoid to these on actual examples
				}
				if (cycle_value == 2)
				{
					persistent_v.y = (std::stof(property));
				}
				if (cycle_value == 3)
				{
					persistent_v.z = (std::stof(property));
				}
				if (cycle_value == num_properties) //Finished processing vertex
				{
					Vec3 v = persistent_v;
					cycle_value = 0;
					updateBound(v);
					xyz.push_back(v);
					num_processed_vertices++;
				}
			}
		}
	}
	xyz.shrink_to_fit();
}

napi_value ObjectToTopo::makeGrid()
{
	// Initialize matrix
	grid.resize(topoSize.x);
	intGrid.resize(topoSize.x);
	for (int i = 0; i < topoSize.x; i++)
	{
		grid[i].resize(topoSize.y);
		intGrid[i].resize(topoSize.y);
		for (int j = 0; j < topoSize.y; j++)
		{
			grid[i][j] = 0;
			intGrid[i][j] = 0;
		}
	}

	// Determine range for x and y coords
	float x_min = lCorner.x;
	float x_max = hCorner.x;
	float y_min = lCorner.y;
	float y_max = hCorner.y;

	float grid_step_x = (x_max - x_min) / topoSize.x;
	float grid_step_y = (y_max - y_min) / topoSize.y;

	// For each point in the point cloud, find the grid cell it belongs to
	for (auto point : xyz)
	{
		int x = (point.x - x_min) / grid_step_x;
		int y = (point.y - y_min) / grid_step_y;

		// If the point is in the grid, update the height
		if (x >= 0 && x < topoSize.x && y >= 0 && y < topoSize.y)
		{
			if (point.z > grid[x][y])
				grid[x][y] = point.z;
		}
	}
	normalize();

	napi_value nodeGrid;
	napi_create_array_with_length(env, grid.size(), &nodeGrid);
	for (int i = 0; i < grid.size(); i++)
	{
		napi_value rowArray;
		napi_create_array_with_length(env, grid[i].size(), &rowArray);
		for (int j = 0; j < grid[i].size(); j++)
		{
			napi_value colValue;
			std::cout << floor(grid[i][j] * 1000) << " ";
			float val = std::floor(grid[i][j] * 1000);
			
			napi_create_int32(env, static_cast<int>(val), &colValue);
			napi_set_element(env, rowArray, j, colValue);
		}
		std::cout << std::endl;
		napi_set_element(env, nodeGrid, i, rowArray);
	}
	std::cout << "Done: makeGrid" << std::endl;
	return nodeGrid;
}

void ObjectToTopo::updateBound(Vec3 v)
{
	if (v.x < lCorner.x)
		lCorner.x = v.x;

	if (v.x > hCorner.x)
		hCorner.x = v.x;

	if (v.y < lCorner.y)
		lCorner.y = v.y;

	if (v.y > hCorner.y)
		hCorner.y = v.y;

	if (v.z < lCorner.z)
		lCorner.z = v.z;

	if (v.z > hCorner.z)
		hCorner.z = v.z;
}

void ObjectToTopo::dump()
{
	std::cout << "Dumping..." << std::endl;
	for (int i = 0; i < 10; i++)
	{
		std::cout << xyz[i].x * 100 << " " << xyz[i].y * 100 << " " << xyz[i].z * 100 << std::endl;
	}
}

void ObjectToTopo::fixZeros()
{
	for (int i = 0; i < grid.size(); i++)
	{
		for (int j = 0; j < grid[i].size(); j++)
		{
			if (grid[i][j] == 0)
			{
				// may not be needed
			}
		}
	}
}

void ObjectToTopo::normalize()
{
	float max = MIN_FLT;
	float min = MAX_FLT;

	for (auto row : grid)
	{
		for (auto col : row)
		{
			if (col > max)
				max = col;

			if (col < min)
				min = col;
		}
	}

	for (int row = 0; row < grid.size(); row++)
	{
		for (int col = 0; col < grid[row].size(); col++)
		{
			grid[row][col] = (grid[row][col] - min) / (max - min);
		}
	}
}