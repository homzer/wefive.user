import request from '../utils/request';

// 获取用户信息
const sendRegisterInfo = (name,cardId, password,phone) => {
    // 定义api，向后端发送请求
    return request.post('register', {name,cardId, password, phone});
};

export default {
    sendRegisterInfo,
};