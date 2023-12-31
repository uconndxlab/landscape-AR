<template>
  <v-card class="pa-6">
    <v-card-title class="text-h5">Topo Display</v-card-title>

    <div class="pa-6" v-if="!topoIsDisplayed">
      <p>Contour map will be displayed here...</p>
    </div>
    <div class="pa-6" v-else>
      <svg></svg>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useFilesStore } from "@/stores/files";
import * as d3 from "d3";

interface DataType {
  gridBuffer: number[][];
  xSize: number;
  ySize: number;
}

const fileStore = useFilesStore();
const { latestFileId } = storeToRefs(fileStore);

// Watch the fileId for changes then call fetchAndRenderTopo
watch(latestFileId, (newFileId) => {
  console.log("fileId changed");
  clearTopoMap();
  fetchAndRenderTopo(newFileId);
});

const dataArray = ref<DataType | null>(null);
const topoIsDisplayed = ref<boolean>(false);

function clearTopoMap() {
  console.log("clearTopoMap called");
  topoIsDisplayed.value = false;
  const svg = d3.select("svg");
  svg.selectAll("*").remove();
}

async function fetchAndRenderTopo(fileId: number) {
  console.log("fetchAndRenderTopo called");
  topoIsDisplayed.value = true;
  // fetch the data based on the ID uploaded
  const response = await fetch(
    `http://localhost:8000/api/v0/model/objectToTopo?id=${fileId}`,
    {
      method: "GET",
    }
  );
  dataArray.value = (await response.json()) as DataType;
  if (dataArray.value) {
    console.log("DATA: ", dataArray);

    // Setup SVG
    const n = dataArray.value.xSize;
    const m = dataArray.value.ySize;
    const width = 600;
    const height = Math.round((m / n) * width);

    // convert dataArray to 1D array
    const grid = dataArray.value.gridBuffer.flat() as number[];

    console.log(grid);

    // Create scale, contours, color, and path generator
    const path = d3.geoPath().projection(d3.geoIdentity().scale(width / n));
    const contours = d3.contours().size([n, m]);
    const color = d3
      .scaleSequential(d3.interpolateTurbo)
      .domain(d3.extent(grid) as [number, number]);

    // Set SVG attributes
    const svg = d3
      .select("svg")
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
      .attr("fill", (d) => color(d.value));
  }
}
</script>
