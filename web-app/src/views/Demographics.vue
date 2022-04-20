
<template>
  <section class="flex justify-center items-start min-h-screen darkMode p-4">
    <div class="rounded-xl bg-gray-400/20">
      <div class="container m-auto py-10">
        <h1>Characteristics of the three-site cohort used for model training and testing.</h1>
      </div>
      <div class="flex justify-center">
        <DemographicsTable></DemographicsTable>
      </div>
    </div>
  </section>
</template>

<script>
import DemographicsTable from '../components/DemographicsTable.vue'

export default {
  components: {
    DemographicsTable
  },
}
</script>