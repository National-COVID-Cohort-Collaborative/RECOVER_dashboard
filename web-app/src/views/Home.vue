
<template>
  <section class="min-h-screen py-10 w-full darkMode space-y-10 leading-snug">
    <div class="container m-auto">
      <TextBlock name="intro"></TextBlock>
    </div>
    <div class="flex justify-center items-start container m-auto">
      <ul class="list-disc">
        <li>
          <router-link :to="{ name:'Home'}"><i class="fas fa-home"></i></router-link>
        </li>
        <li>
          <router-link :to="{ name:'Figure4'}">Figure 4</router-link>
        </li>
      </ul>
    </div>
  </section>
</template>