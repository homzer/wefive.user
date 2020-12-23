import goverRequest from '../utils/goverRequest';

// 热门评论
const getHotChats = () => {
    return goverRequest.get('chat/getHot');
};

const getChatByChatId = (chatId) => {
    return goverRequest.get('chat/get/' + chatId);
};

const getSubChats  = (chatId) => {
    return goverRequest.get('chat/getSubChat/' + chatId);
};

const createNewChat = (userId, content, picture) => {
    return goverRequest.post("chat/create", {userId, content, picture});
};

export default {
    getHotChats,
    getSubChats,
    getChatByChatId,
    createNewChat,
};
