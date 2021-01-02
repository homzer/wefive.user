import request from '../utils/request';

const getAllComment = (deptId) => {
    // 定义api，向后端发送请求
    return request.get('goverment/comment/list?dept_id=' + deptId);
};

const getMyComment = (deptId, userId) => {
    // 定义api，向后端发送请求
    return request.get('goverment/comment/mylist?dept_id='+deptId+'&user_id=' + userId);
};

const sendComment = (content, deptId, userId, busId, reply) => {
    return request.post('goverment/comment/save', {userId, deptId, content, busId, reply});
};

export default {
    getAllComment,
    sendComment,
    getMyComment,
};
