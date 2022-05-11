
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

        axios.get(`https://n3c.cd2h.org/dashboard/caption.jsp?tag=${props.name}&schema=n3c_recover.caption`)
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
