import request from '../utils/request';

// 搜索返回
const getSeekInfo = (info,userId,createTime) => {
    // 定义api，向后端发送请求
    return request.post('goverment/search/info', {info,userId,createTime});
};

export default {
    getSeekInfo,
};