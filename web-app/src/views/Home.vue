
<template>
  <section class="flex justify-center items-start min-h-screen py-10 w-full darkMode">
    <ul class="list-disc">
      <li>
        <router-link :to="{ name:'Home'}"><i class="fas fa-home"></i></router-link>
      </li>
      <li>
        <router-link :to="{ name:'Figure4'}">Figure 4</router-link>
      </li>
    </ul>
  </section>
</template>