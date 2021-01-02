import request from '../utils/request';

const getRoad = (deptId) => {
    // 定义api，向后端发送请求
    return request.get('gps/getroutebylocation?id=' + deptId);
};

export default {
    getRoad,
};
