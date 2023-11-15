#pragma once

class Vec3
{
public:
	// each coordinate of vector, public for easy access
	float x;
	float y;
	float z;

	Vec3(float _x, float _y, float _z) : x(_x), y(_y), z(_z) {}
	Vec3() : x(0.0), y(0.0), z(0.0) {}

	float dot(Vec3 v1, Vec3 v2)
	{
		return (v1.x * v2.x) + (v1.y * v2.y) + (v1.z * v2.z);
	}

	void fill(float _v)
	{
		x = _v;
		y = _v;
		z = _v;
	}
};
