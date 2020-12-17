const transRouter = [
    {
        path: '/trans',
        name: 'trans',
        /*meta: {
            auth: true,
        },*/
        component: () => import('../../views/trans/Trans.vue'),
    },

];

export default transRouter;
