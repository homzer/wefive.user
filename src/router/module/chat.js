const chatRouter = [
    {
        path: '/chat/chatId=:chatId',
        name: 'chat',
        component: () => import('../../views/chat/Chat.vue')
    },
    {
        path: '/chat/newChat',
        name: 'newChat',
        component: () => import('../../views/chat/NewChat.vue')
    },
];

export default chatRouter;
