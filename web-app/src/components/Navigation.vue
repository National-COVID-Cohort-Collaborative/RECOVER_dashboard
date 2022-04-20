
<template>
    <div class="w-full flex justify-around items-center p-2 darkMode shadow sticky top-0 z-10 bg-gray-200 dark:bg-theme2">
        <router-link :to="{ name:'Home' }">Home</router-link>
        <button type="button" class="dark:bg-blue-200 bg-indigo-900 px-2 py-1 rounded-full" @click="toggleDarkMode">
          <i class="fas" :class="[!darkMode ? 'fa-moon text-cyan-200' : 'fa-sun text-yellow-400']"></i>
        </button>
    </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore();
    let darkMode = computed(()=>store.getters.darkMode)

    function toggleDarkMode()  {
      store.commit('toggleDarkMode');
    }

    // lifecycle hooks
    onMounted(() => {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          console.log('prefers Dark: ', window.matchMedia('(prefers-color-scheme: dark)').matches)
          // default is false, toggle if prefers dark
          store.commit('toggleDarkMode');
      }
    })

    // expose to template and other options API hooks
    return {
      toggleDarkMode,
      darkMode
    }
  }
}
</script>
