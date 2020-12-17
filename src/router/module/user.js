const userRouter = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../../views/login/Login.vue')
    },
    {
        path: '/login',
        name: 'SignUp',
        component: () => import('../../views/login/SignUp.vue')
    },
    {
        path: '/login',
        name: 'SignIn',
        component: () => import('../../views/login/SignIn.vue')
    },
];

export default userRouter;
