import goverRequest from '../utils/goverRequest';

// 热门评论
const getHotChats = () => {
    return goverRequest.get('chat/getHot');
};

const createSubChat = (chatId, content, userId) => {
    return goverRequest.post('chat/createSubChat', {chatId, content, userId});
};

const getChatByChatId = (chatId) => {
    return goverRequest.get('chat/get/' + chatId);
};

const getSubChats  = (chatId) => {
    return goverRequest.get('chat/getSubChat/' + chatId);
};

const createNewChat = (userId, content, title, picture) => {
    return goverRequest.post("chat/create", {userId, content, title, picture});
};

const deleteSubChat = (subId) => {
    return goverRequest.post("chat/deleteSubChat", {subId});
};

const likeChat = (chatId) => {
    return goverRequest.post("chat/like", {chatId})
};

const getChatsByTitle = (title) => {
    return goverRequest.post("chat/getByTitle", {title})
};

export default {
    getHotChats,
    getSubChats,
    getChatByChatId,
    createNewChat,
    createSubChat,
    deleteSubChat,
    likeChat,
    getChatsByTitle,
};
