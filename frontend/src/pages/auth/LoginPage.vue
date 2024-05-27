<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center page--bg__color">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-grey-9 text-h5 text-weight-bold">SISTEMA CRUD</div>
            <div class="text-grey-8">
              Bem vindo! Por favor informe suas credenciais para acessar o
              sistema.
            </div>
          </q-card-section>
          <q-card-section>
            <q-input dense outlined v-model="email" label="Email"></q-input>
            <q-input
              dense
              outlined
              class="q-mt-md"
              v-model="password"
              type="password"
              label="Senha"
            ></q-input>
          </q-card-section>
          <q-card-section>
            <q-btn
              style="border-radius: 8px"
              color="blue"
              rounded
              size="md"
              label="Entrar"
              no-caps
              class="full-width"
            ></q-btn>
          </q-card-section>
          <q-card-section class="text-center q-pt-none">
            <div class="text-grey-8">
              Não tem uma conta?
              <a
                href="#"
                class="text-dark text-weight-bold"
                style="text-decoration: none"
                >Cadastrar-se</a
              >
            </div>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineOptions({
  name: 'LoginPage',
});

const email = ref('');
const password = ref('');
</script>

<style scoped lang="scss">
.page--bg__color {
  background-image: repeating-linear-gradient(
    45deg,
    #55cdfc,
    #55cdfc 50px,
    #f7a8b8 50px,
    #f7a8b8 100px,
    #fff 100px,
    #fff 150px
  );
}
</style>
