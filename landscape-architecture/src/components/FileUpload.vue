<template>
  <v-card class="pa-6">
    <v-card-title class="text-h5">Upload 3D Object</v-card-title>
    <br/>

    <div class="d-flex">
      <v-file-input
        @change="onFileSelected"
        @click:clear="clearFile"
        clearable
        variant="outlined"
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

<!-- TODO: show this when 3D model rendering works, removing now for demo purposes -->
<!--    <div v-if="fileSelected" class="d-flex">-->
<!--      <ModelView :blobUrl="blobUrl as string" />-->
<!--    </div>-->
  </v-card>

</template>

<script setup lang="ts">
import { ref } from "vue";
import { useFilesStore } from "@/stores/files";
// import ModelView from "@/components/ModelView.vue";

const fileStore = useFilesStore();

const formData = new FormData();

const blobUrl = ref<string>();
const fileSelected = ref<boolean>(false);

// Call this function when user selects a file
const onFileSelected = (event: Event) => {
  console.log('file selected');
  const target = event.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];

  // Check if the file is an .obj file
  if (file.name.split('.').pop() !== 'obj') {
    return;
  }

  // Update the ModelView component with the file
  blobUrl.value = URL.createObjectURL(file);
  fileSelected.value = true;

  // Add the file to the FormData object
  formData.append('formFile', file);
  formData.append('fileName', file.name);

}

// When the clear icon is clicked, clear the file
const clearFile = () => {
  formData.delete('formFile');
  formData.delete('fileName');
  fileSelected.value = false;
}

// When the submit button is clicked, upload the file
const onSubmit = async () => {
  // Check if a file has been selected
  if (!formData.has('formFile')) {
    return;
  }

  // Send the file to the API which takes a IFormFile as input
  // TODO: change endpoint to environment variable and to deployed endpoint (when it is deployed)
  const response = await fetch('https://localhost:4000/api/v0/Files/UploadFile', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }


  const fileId = await response.text();
  console.log('file uploaded ' + fileId)

  fileStore.setLatestFileId(Number(fileId));
}
</script>

