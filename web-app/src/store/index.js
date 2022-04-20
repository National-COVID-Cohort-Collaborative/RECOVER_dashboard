import { createStore } from 'vuex'
import { layout } from './modules/layout'

const store = createStore({
    modules: {
        layout
    },
})

export default store
