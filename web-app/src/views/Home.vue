
<template>
  <section class="min-h-screen py-10 w-full space-y-10 leading-snug">
    <div class="container m-auto">
      <TextBlock name="intro_paragraphs"></TextBlock>
    </div>
    <div class="flex justify-center items-start container m-auto">
      <ul class="list-disc">
        <li>
          <router-link :to="{ name:'Home'}"><i class="fas fa-home"></i></router-link>
        </li>
        <li>
          <router-link :to="{ name:'ModelFeatures'}">Model Features</router-link>
        </li>
        <li>
          <router-link :to="{ name:'CohortCharacteristics'}">Training Cohort Characteristics</router-link>
        </li>
        <li>
          <router-link :to="{ name:'Demographics'}">Demographics</router-link>
        </li>
      </ul>
    </div>
  </section>
</template>