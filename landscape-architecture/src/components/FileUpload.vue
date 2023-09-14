<template>
  <v-container class="pa-6">
    <div class="d-flex">
      <v-file-input
        @change="onFileSelected"
        @click:clear="clearFile"
        clearable
        label="Upload 3D object"
        accept=".obj"
        hint="must be .obj file"
        persistent-hint
      />
      <v-btn
        class="ml-4 h-auto bg-grey"
        @click="onSubmit"
      >
        Upload
      </v-btn>
    </div>
  </v-container>

</template>

<script setup lang="ts">
import { ref } from 'vue'

const file = ref<File | null>(null)

// Call this function when user selects a file
const onFileSelected = (selectedFile: File) => {
  console.log('File selected:', selectedFile)
  file.value = selectedFile
}

// When the clear icon is clicked, clear the file
const clearFile = () => {
  file.value = null
}

// When the submit button is clicked, upload the file
// TODO: Implement the API call to upload the file
const onSubmit = async () => {
  if (!file.value) {
    console.log('No file selected.')
    return
  }

  // Send the file to the API which takes a IFormFile as input
  const formData = new FormData()
  formData.append('file', file.value)


  const response = await fetch('https://localhost:4000/api/v0/Files/UploadFile', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }
  console.log('Upload successful');
}
</script>

