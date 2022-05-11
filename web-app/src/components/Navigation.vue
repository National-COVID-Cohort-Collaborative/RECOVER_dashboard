<template>
    <div class="w-full p-2 shadow sticky top-0 z-10 bg-main flex justify-around items-center flex-wrap">
        <div class="container flex justify-between items-center py-5">
          <router-link :to="{name: 'Home'}">
            <img :src="logo" class="h-[55px]" alt="RECOVER">
          </router-link>
          <div class="space-x-5">
            <router-link class="text-white" v-for="route in routes" :key="route.name" :to="{ name:route.name }">{{route.name}}</router-link>
          </div>
        </div>
    </div>
</template>

<script>
import logo from '../assets/img/recoverLogoReversed.svg';
import {routes} from '../router/routes'

export default {
  setup() {
    return {
      routes,
      logo
    }
  }
}
</script>
