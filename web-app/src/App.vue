<template>
  <main>
    <template v-if="!noNav">
      <Navigation></Navigation>
    </template>
    <router-view v-slot="{ Component }" :key="$route.href">
      <component :is="Component" />
    </router-view>
  </main>
</template>

<script>
  import { useStore } from 'vuex'
  import { computed, defineAsyncComponent, onUpdated } from 'vue'

  const Navigation = defineAsyncComponent({
    loader: () => import('./components/Navigation.vue'),
    delay: 200,
})

  export default {
  components:{
    Navigation
  },
  setup() {
    const store = useStore();
    let noNav = computed(()=>store.getters.noNav)

    onUpdated(()=>{
      store.dispatch('checkParams')
    });

    return {
      noNav
    }
  }
}
</script>
