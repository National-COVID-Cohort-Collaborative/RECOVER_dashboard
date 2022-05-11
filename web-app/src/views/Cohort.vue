
<template>
  <section class="flex justify-center items-start p-4">
    <div class="container space-y-5">
      <TextBlock name="training_title"></TextBlock>
      <CohortTable></CohortTable>
      <TextBlock name="training_footer"></TextBlock>
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