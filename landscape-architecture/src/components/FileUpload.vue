<template>
  <v-container class="pa-6">
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
  </v-container>

</template>

<script setup lang="ts">

const formData = new FormData();

// Call this function when user selects a file
const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file: File = (target.files as FileList)[0];

  // Check if the file is an .obj file
  if (file.name.split('.').pop() !== 'obj') {
    return;
  }

  // Add the file to the FormData object
  formData.append('formFile', file);
  formData.append('fileName', file.name);

  console.log('File selected ' + file.name);
}

// When the clear icon is clicked, clear the file
const clearFile = () => {
  formData.delete('formFile');
  formData.delete('fileName');
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
  console.log('Upload successful');
}
</script>

