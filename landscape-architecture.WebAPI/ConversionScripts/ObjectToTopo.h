#pragma once
#include "pch.h"
#include "Vec3.h"
#include <vector>
#include <string>

class ObjectToTopo
{
public:
	ObjectToTopo();
	ObjectToTopo(std::string _inFile, int _xs, int _ys, int _zs, char _axis) : inFile(_inFile), axisChar(_axis)
	{
		topoSize.x = _xs;
		topoSize.y = _ys;
		topoSize.z = _zs;

		if (_axis == 'x')
			axis = Vec3(1, 0, 0);
		else if (_axis == 'y')
			axis = Vec3(0, 1, 0);
		else if (_axis == 'z')
			axis = Vec3(0, 0, 1);
	}

	void readObj();
	void makeGrid();
	void dump();
	std::vector<std::vector<float>> getGrid() { return grid; }

private:
	Vec3 lCorner;		   // Lowest corner of object bounding box
	Vec3 hCorner;		   // Highest corner of object bounding box
	std::vector<Vec3> xyz; // Point cloud from obj file
	std::string inFile;
	std::vector<std::vector<float>> grid; // output xy grid of heights
	Vec3 topoSize;						  // Size of grid
	Vec3 axis;							  // Which axis to represent as
	char axisChar;

	void updateBound(Vec3 v);
	void fixZeros();
	void normalize();
};