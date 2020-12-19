const commentRouter = [
    {
        path: '/comment',
        name: 'comment',
        component: () => import('../../views/comment/Comment.vue')
    },
];

export default commentRouter;
