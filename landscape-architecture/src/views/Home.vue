<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" align-self="center">
        <FileUpload />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" align-self="center">
        <TopoDisplay />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
  import FileUpload from '@/components/FileUpload.vue'
  import TopoDisplay from "@/components/TopoDisplay.vue"
</script>
