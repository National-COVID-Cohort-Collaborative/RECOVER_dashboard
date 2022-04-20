
<template>
  <section class="flex justify-center items-start min-h-screen p-4 darkMode">
    <div class="rounded-xl bg-gray-400/20">
      <div class="container m-auto py-10">
        <h1>Characteristics of the three-site cohort used for model training and testing.</h1>
      </div>
      <div class="flex justify-center">
        <CohortTable></CohortTable>
      </div>
    </div>
  </section>
</template>

<script>
import CohortTable from '../components/CohortTable.vue'

export default {
  components: {
    CohortTable
  },
}
</script>