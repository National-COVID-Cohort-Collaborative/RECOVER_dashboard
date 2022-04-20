<template>
  <main :class="[darkMode ? 'dark' : '']">
    <Navigation></Navigation>
    <router-view v-slot="{ Component }" :key="$route.href">
      <component :is="Component" />
    </router-view>
  </main>
</template>

<script>
  import { useStore } from 'vuex'
  import { computed } from 'vue'

  import Navigation from './components/Navigation.vue'

  export default {
  components:{
    Navigation
  },
  setup() {
    const store = useStore();
    let darkMode = computed(()=>store.getters.darkMode)

    return {
      darkMode
    }
  }
}
</script>
