// Define a pinia store called files
import {defineStore} from "pinia";

export const useFilesStore = defineStore('files', {
  state: () => ({
    latestFileId: 0
  }),

  actions: {
    setLatestFileId(id: number) {
      console.log('setLatestFileId', id)
      this.latestFileId = id
    }
  }
})
