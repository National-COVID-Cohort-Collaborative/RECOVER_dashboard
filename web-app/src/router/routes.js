
export const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/figure4',
        name: 'Figure4',
        component: () => import('../views/Figure4.vue'),
    },
    // {
    //     path: "/:catchAll(.*)",
    //     name: '404',
    //     component: () => import('../views/404.vue'),
    //     meta: { sitemap: { ignoreRoute: true } }
    // }
]