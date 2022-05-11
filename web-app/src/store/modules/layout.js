
export const layout = {
    state: () => ({ 
        noNav: false
    }),
    mutations: {
        setNoNav(state, payload){
            state.noNav = payload.value;
        }
    },
    actions: {
        checkParams({commit}){
            var url = new URL(window.location.href);
            var nav = url.searchParams.get("no-nav");
            if (nav == 'true' || nav == '1') {
                console.log('%c No Nav Mode', 'color:limegreen')
                commit('setNoNav', {'value': true});
            }
        }
    },
    getters: {
        noNav: (state) => {
            return state.noNav;
        }
    }
}