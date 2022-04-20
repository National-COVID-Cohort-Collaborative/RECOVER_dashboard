
export const layout = {
    state: () => ({ 
        darkMode: false
    }),
    mutations: {
        toggleDarkMode(state){
            state.darkMode = !state.darkMode;
        }
    },
    actions: {
    },
    getters: {
        darkMode: (state) => {
            return state.darkMode;
        }
    }
}