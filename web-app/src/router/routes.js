
export const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/model-features',
        name: 'ModelFeatures',
        component: () => import('../views/ModelFeatures.vue'),
    },
    {
        path: '/cohort-characteristics',
        name: 'CohortCharacteristics',
        component: () => import('../views/Cohort.vue'),
    },
    {
        path: '/demographics',
        name: 'Demographics',
        component: () => import('../views/Demographics.vue'),
    },
    // {
    //     path: "/:catchAll(.*)",
    //     name: '404',
    //     component: () => import('../views/404.vue'),
    //     meta: { sitemap: { ignoreRoute: true } }
    // }
]