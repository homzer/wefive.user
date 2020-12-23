const searchRouter = [
    {
        path: '/searchResult',
        name: 'searchResult',
        component: () => import('../../views/search/SearchResult.vue')
    },
];

export default searchRouter;
