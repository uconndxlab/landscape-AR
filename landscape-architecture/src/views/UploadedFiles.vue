<template>
  <div>
    <v-card class="ma-12 pa-6" :key="key">
      <v-card-title>Uploaded Files</v-card-title>
      <v-card-text class="mx-auto">
        <v-progress-circular v-if="!fileData" indeterminate class="mx-auto" />
        <div class="d-flex flex-wrap">
          <v-card v-for="file in fileData" class="ma-4">
            <v-card-title>{{ file.Name }}</v-card-title>
            <v-card-text>
              <p>File ID: {{ file.Id }}</p>
              <p>Uploaded At: {{ file.UpdatedAt }}</p>
              <div class="d-flex">
                <v-checkbox
                  class="d-flex"
                  v-model="selectedFiles"
                  :value="{ Id: file.Id, Name: file.Name }"
                />
              </div>
            </v-card-text>
          </v-card>
        </div>
        <div class="d-flex">
          <v-btn class="mx-auto" @click="onDeleteClicked" v-if="fileData"
            >Delete</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" width="auto">
      <v-card width="32rem">
        <div v-if="!deleting" class="mx-auto">
          <v-card-text
            >Are you sure you want to delete {{ selectedFiles.length }}
            {{ selectedFiles.length === 1 ? "file" : "files" }}?</v-card-text
          >
          <v-list>
            <v-list-item v-for="item in selectedFiles">
              <span class="d-flex justify-center">{{ item.Name }}</span>
            </v-list-item>
          </v-list>
          <div class="button-container d-flex mx-auto">
            <v-btn class="ma-2" @click="abortDelete">No, Go Back</v-btn>
            <v-btn class="ma-2" color="" @click="startDelete"
              >Yes, Delete</v-btn
            >
          </div>
        </div>
        <div class="pa-8 mx-auto" v-if="deleting">
          <v-list>
            <v-list-item v-for="item in selectedFiles">
              <span class="d-flex justify-center">{{ item.Name }}</span>
              <v-progress-linear
                :indeterminate="!successfullyDeleted.includes(item.Id)"
                :color="successfullyDeleted.includes(item.Id) ? 'green' : ''"
                :model-value="successfullyDeleted.includes(item.Id) ? 100 : ''"
                class="mx-2"
              />
            </v-list-item>
          </v-list>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

interface FileInfo {
  Id: string;
  Name: string;
  UpdatedAt?: string;
}

const fileData = ref<Array<FileInfo>>();
const selectedFiles = ref<Array<FileInfo>>([]);
const dialog = ref<boolean>(false);
const deleting = ref<boolean>(false);
const successfullyDeleted = ref<Array<string>>([]);
const key = ref<number>(0);

onMounted(async () => {
  console.log("Fetching all files");
  const response = await fetch(
    "http://localhost:8000/api/v0/files/getAllFiles"
  );
  const data = await response.json();
  fileData.value = data;
  console.log(data);
});

const onDeleteClicked = () => {
  if (selectedFiles.value.length === 0) {
    return;
  }
  dialog.value = true;
};

const abortDelete = () => {
  dialog.value = false;
  selectedFiles.value = [];
};

const startDelete = async () => {
  console.log("Starting delete process");
  deleting.value = true;
  const deletePromises = selectedFiles.value.map((file) => {
    console.log("Deleting file with ID: ", file.Id);
    return fetch(`http://localhost:8000/api/v0/files/delete/?id=${file.Id}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        console.log("Successfully deleted file with ID: ", file.Id);
        successfullyDeleted.value.push(file.Id);
      }
    });
  });

  // Waiting for all promises to resolve
  await Promise.all(deletePromises);

  console.log("All files deleted successfully");
  selectedFiles.value = [];
  successfullyDeleted.value = [];
  dialog.value = false;
  key.value += 1;
  window.location.reload();
};
</script>
