<template>
  <q-layout view="lHh Lpr lFf">
    <login-page />
  </q-layout>
</template>

<script setup lang="ts">
import LoginPage from 'pages/auth/LoginPage.vue';

defineOptions({
  name: 'AuthLayout',
});
</script>
