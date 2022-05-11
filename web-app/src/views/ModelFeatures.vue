
<template>
  <section class="flex justify-center items-start min-h-screen p-4">
    <div class="container space-y-5">
      <TextBlock name="model_title"></TextBlock>
      <ModelFeaturesTable></ModelFeaturesTable>
      <TextBlock name="model_footer"></TextBlock>
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