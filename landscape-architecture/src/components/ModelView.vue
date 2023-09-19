<template>
  <v-card>
    <canvas ref="canvas"></canvas>
  </v-card>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import * as THREE from 'three';

const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
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
      '/path/to/model.obj',
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
