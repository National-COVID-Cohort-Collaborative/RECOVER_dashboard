
<template>
  <section class="flex justify-center items-start min-h-screen darkMode p-4">
    <div class="rounded-xl bg-gray-400/20">
      <div class="container m-auto space-y-10">
        <h1>Most important model features for predicting visit to a Long-COVID clinic</h1>
        <TextBlock name="intro"></TextBlock>
      </div>
      <ModelFeaturesTable></ModelFeaturesTable>
    </div>
  </section>
</template>

<script>
import ModelFeaturesTable from '../components/ModelFeaturesTable.vue'

export default {
  components: {
    ModelFeaturesTable
  },
}
</script>