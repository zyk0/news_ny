Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        backendUrl: "https://jsonplaceholder.typicode.com"
    },
    mutations: {},
    actions: {},
    modules: {},
    getters: {
        getServerUrl: state => {
            return state.backendUrl
        }
    }
})

