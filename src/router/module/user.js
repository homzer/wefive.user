const userRouter = [
    {
        path: '/init',
        name: 'init',
        component: () => import('../../views/login/Init.vue')
    },
    {
        path: '/signUp',
        name: 'signUp',
        component: () => import('../../views/login/SignUp.vue')
    },
    {
        path: '/signIn',
        name: 'signIn',
        component: () => import('../../views/login/SignIn.vue')
    },
    {
        path: '/userCenter',
        name: 'userCenter',
        /*meta: {
            auth: true,
        },*/
        component: () => import('../../views/user/UserCenter.vue'),
    },
];

export default userRouter;
