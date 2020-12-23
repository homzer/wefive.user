const commentRouter = [
    {
        path: '/comment/deptId=:deptId',
        name: 'comment',
        component: () => import('../../views/comment/DepartComment.vue')
    },
];

export default commentRouter;
