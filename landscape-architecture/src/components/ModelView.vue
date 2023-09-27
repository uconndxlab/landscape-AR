<template>
  <v-row align="center">
    <v-col cols="12" align-self="center">
      <canvas ref="canvas"></canvas>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

const canvas = ref<HTMLCanvasElement>()

const props = defineProps({
  blobUrl: {
    type: String,
    required: true
  }
})

onMounted(() => {
  // Get blobUrl from FileUpload
  console.log('blobUrl from ModelView: ' + props.blobUrl)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
      75,
      canvas.value!.clientWidth / canvas.value!.clientHeight,
      0.1,
      1000
  )

  const renderer = new THREE.WebGLRenderer({canvas: canvas.value})
  renderer.setSize(canvas.value!.clientWidth, canvas.value!.clientHeight)

  // Load 3D model
  const loader = new OBJLoader()

  loader.load(
    // Path to model from FileUpload
    props.blobUrl,
    (object) => {
      scene.add(object)
    }
  )


  function animate() {
    requestAnimationFrame(animate)

    renderer.render(scene, camera)
  }

  animate()
})
</script>
