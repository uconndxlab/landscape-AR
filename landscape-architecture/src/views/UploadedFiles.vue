<template>
    <v-card class="ma-12 pa-6">
        <v-card-title>Uploaded Files</v-card-title>
        <v-card-text class="mx-auto">
            <v-progress-circular v-if="!fileData" indeterminate class="mx-auto " />
            <div class="d-flex flex-wrap">
                <v-card v-for="file in fileData" class="ma-4">
                    <v-card-title>{{ file.Name }}</v-card-title>
                    <v-card-text>
                        <p>File ID: {{ file.Id }}</p>
                        <p>Uploaded At: {{ file.UpdatedAt }}</p>
                        <div class="d-flex">
                            <v-checkbox class="d-flex" v-model="selectedFiles" :value="file.Id"/>
                        </div>
                    </v-card-text>
                </v-card>
            </div>
            <div class="d-flex">
                <v-btn class="mx-auto" @click="onDeleteClicked">Delete</v-btn>
            </div>
        </v-card-text>
    </v-card>
    <v-dialog v-model="dialog" width="auto">
        <v-card>
            <v-card-text>Are you sure you want to delete {{ selectedFiles.length }} {{ selectedFiles.length === 1 ? "file" : "files" }}?</v-card-text>
            <div class="button-container d-flex mx-auto">
                <v-btn class="ma-2" @click="abortDelete">No, Go Back</v-btn>
                <v-btn class="ma-2" color="">Yes, Delete</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue';

interface FileInfo {
    Id: string,
    Name: string,
    UpdatedAt: string,
}

const fileData = ref<Array<FileInfo> >();
const selectedFiles = ref<Array<string> >([]);
const dialog = ref<boolean>(false);

onMounted(async () => {
    console.log("Fetching all files")
    const response = await fetch("http://localhost:8000/api/v0/files/getAllFiles")
    const data = await response.json()
    fileData.value = data;
    console.log(data)
})

const onDeleteClicked = () => {
    if (selectedFiles.value.length === 0) {
        return;
    }
    dialog.value = true;
}

const abortDelete = () => {
    dialog.value = false;
    selectedFiles.value = [];
}
</script>
