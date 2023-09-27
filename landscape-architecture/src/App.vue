<template>
  <v-app>
    <side-nav-bar />
    <v-main>
      <default />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
  import SideNavBar from "@/components/SideNavBar.vue";
  import Default from "@/layouts/default/Default.vue";
</script>
