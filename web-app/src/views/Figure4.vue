
<template>
  <section class="flex justify-center items-start min-h-screen py-10 darkMode">
    <div class="rounded-xl bg-gray-400/20">
      <div class="container m-auto space-y-10">
        <h1>Figure 4</h1>
        <TextBlock name="intro"></TextBlock>
      </div>
      <Figure4></Figure4>
    </div>
  </section>
</template>

<script>
import Figure4 from '../components/Figure4.vue'

export default {
  components: {
    Figure4
  },
}
</script>