
#include "pch.h"
#include "ObjectToTopo.h"
#include <fstream>
#include <iostream>
#include <algorithm>
#include <string>
#include <limits>
#include <cmath>
#include <iomanip>

ObjectToTopo::ObjectToTopo() : axisChar('y')
{
}

void ObjectToTopo::readObj()
{
	std::ifstream obj(inFile);
	xyz.clear();

	lCorner.fill(FLT_MAX);
	hCorner.fill(FLT_MIN);
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
void ObjectToTopo::makeGrid()
{
	// Initialize matrix
	grid.resize(topoSize.x);
	for (int i = 0; i < topoSize.x; i++)
	{
		grid[i].resize(topoSize.y);
		for (int j = 0; j < topoSize.y; j++)
		{
			grid[i][j] = 0;
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

	for (auto row : grid)
	{
		for (auto col : row)
		{
			std::cout << std::fixed;
			std::cout << std::setprecision(2);
			std::cout << col << " ";
		}
		std::cout << std::endl;
	}
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
		std::cout << xyz[i].x << " " << xyz[i].y << " " << xyz[i].z << std::endl;
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
	float max = FLT_MAX;
	float min = FLT_MIN;

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