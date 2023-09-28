<template>
  <v-card class="pa-6">
    <v-card-title class="text-h5">Topo Display</v-card-title>
    <br/>


      <div class="pa-6">
          <svg></svg>
      </div>
  </v-card>
</template>

<script lang="ts" setup>
import { onMounted, ref} from 'vue'
import * as d3 from 'd3'

interface DataType {
  grid: number[][];
  xSize: number;
  ySize: number;
}

const dataArray = ref<DataType | null>(null);

  onMounted(async () => {
    // fetch the data based on the ID uploaded
    const response = await fetch('https://localhost:4000/api/v0/Model/GetTopoFromModel?fileId=6');
    dataArray.value = await response.json() as DataType;

    if (dataArray.value) {
        console.log(dataArray.value)

        // Setup SVG
        const n = dataArray.value.xSize;
        const m = dataArray.value.ySize;
        const width = 600;
        const height = Math.round(m / n * width);

        // convert dataArray to 1D array
        const grid = dataArray.value.grid.flat() as number[];

        console.log(grid)


        // Create scale, contours, color, and path generator
        const path = d3.geoPath().projection(d3.geoIdentity().scale(width / n));
        const contours = d3.contours().size([n, m]);
        const color = d3.scaleSequential(d3.interpolateTurbo).domain(d3.extent(grid) as [number, number]);


        // Set SVG attributes
        const svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [0, 0, width, height])
            .attr("style", "max-width: 100%; height: auto;");

        // Render contours
        const g = svg.append("g");
        g.append("g")
            .attr("stroke", "black")
            .selectAll()
            .data(contours(grid))
            .join("path")
            .attr("d", path as any)
            .attr("fill", d => color(d.value));
    }

  })
</script>
