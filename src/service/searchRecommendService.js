import request from '../utils/request';

// 搜索返回
const getSearchRecommend = (time) => {
    // 定义api，向后端发送请求
    return request.get('goverment/searchrecord/top?time='+time);
};

export default {
    getSearchRecommend,
};