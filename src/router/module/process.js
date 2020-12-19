const processRouter = [
    {
        path: '/process',
        name: 'process',
        // 元信息
        /*meta: {
          // true 代表这个路由需要认证
          auth: true,
        },*/
        component: () => import('../../views/process/Process.vue')
    },
];

export default processRouter;
