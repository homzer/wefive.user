const searchRouter = [
    {
        path: '/searchMaterial/:busId',
        name: 'searchMaterial',
        // 元信息
        /*meta: {
          // true 代表这个路由需要认证
          auth: true,
        },*/
        component: () => import('../../views/search/SearchMaterial.vue')
    },
    {
        path: '/SearchDepartment/:info',
        name: 'searchDepartment',
        // 元信息
        /*meta: {
          // true 代表这个路由需要认证
          auth: true,
        },*/
        component: () => import('../../views/search/SearchDepartment.vue')
    },
    {
        path: '/searchBusiness/:deptId',
        name: 'searchBusiness',
        // 元信息
        /*meta: {
          // true 代表这个路由需要认证
          auth: true,
        },*/
        component: () => import('../../views/search/SearchBusiness.vue')
    },
    {
        path: '/searchResult',
        name: 'searchResult',
        // 元信息
        /*meta: {
          // true 代表这个路由需要认证
          auth: true,
        },*/
        component: () => import('../../views/search/SearchResult.vue')
    },
];

export default searchRouter;
