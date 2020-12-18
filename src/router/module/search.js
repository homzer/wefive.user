

const searchRouter = [
    {
        path: '/searchMaterial/:busId',
        name: 'searchMaterial',
        // 元信息
        /*meta: {
          // true 代表这个路由需要认证
          auth: true,
        },*/
        component: () => import('../../views/home/SearchMaterial.vue')
    },
    {
        path: '/SearchDepartment/:info',
        name: 'searchDepartment',
        // 元信息
        /*meta: {
          // true 代表这个路由需要认证
          auth: true,
        },*/
        component: () => import('../../views/home/SearchDepartment.vue')
    },
    {
        path: '/searchBusiness/:deptId',
        name: 'searchBusiness',
        // 元信息
        /*meta: {
          // true 代表这个路由需要认证
          auth: true,
        },*/
        component: () => import('../../views/home/SearchBusiness.vue')
    },
];

export default searchRouter;
