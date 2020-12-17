import request from '../utils/loginRequest';

// 获取用户信息
const sendLoginInfo = (phone, password) => {
    // 定义api，向后端发送请求
    console.log(phone, password)
/*    return request.get("goverment/users/info/1");*/
    return request.post('login?phone='+phone+'&password='+password);
};

export default {
    sendLoginInfo,
};
