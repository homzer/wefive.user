import request from '../utils/request';

// 搜索返回
const getSearchHistory = (userId) => {
    // 定义api，向后端发送请求
    return request.get('goverment/search/mysearchlist?userId='+userId);
};

export default {
    getSearchHistory,
};