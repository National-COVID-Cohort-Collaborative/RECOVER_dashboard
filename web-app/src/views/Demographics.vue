
<template>
  <section class="flex justify-center items-start p-4">
    <div class="container space-y-5">
      <TextBlock name="demographics_title"></TextBlock>
      <DemographicsTable></DemographicsTable>
      <TextBlock name="demographics_footer"></TextBlock>
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