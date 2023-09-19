<template>
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent="true"
      @click="rail=false">


      <v-list
        density="compact"
        nav="true">
        <v-list-item
          prepend-icon="mdi-menu"
          title="Landscape Architecture">
          <template v-slot:append>
           <v-btn
             variant="text"
             icon="mdi-chevron-left"
             @click.stop="rail = !rail"
           ></v-btn>
          </template>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        density="compact"
        nav="true">
        <v-list-item
          prepend-icon="mdi-folder"
          title="Files">
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-account"
          title="Account">
        </v-list-item>
        <v-list-item
          prepend-icon="mdi-cogs"
          title="Settings">
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts" setup>
  //
  import { ref } from "vue";

  const drawer = ref(true);
  const rail = ref(true);

</script>
