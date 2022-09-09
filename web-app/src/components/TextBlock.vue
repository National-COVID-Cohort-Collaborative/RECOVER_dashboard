
<template>
    <div class="space-y-3" v-html="txt"></div>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios';

export default {
    props: {
        name: String
    },
    setup(props) {

        let txt = ref('')

        axios.get(`https://discovery.biothings.io/recover/api/${props.name}`)
        .then(res=>{
            txt.value = res.data;
        }).catch((err) => {
            txt.value = 'N/A'
            throw err;
        })

        // expose to template and other options API hooks
        return {
            txt
        }
    }
}
</script>
