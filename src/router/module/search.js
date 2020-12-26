const searchRouter = [
    {
        path: '/searchResult/info=:info',
        name: 'searchResult',
        component: () => import('../../views/search/SearchResult.vue')
    },
];

export default searchRouter;
