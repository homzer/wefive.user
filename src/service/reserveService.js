import request from '../utils/request';

// 预约
const reservation = (userId,deptId,orderDay,orderTime) => {
    // 定义api，向后端发送请求
    return request.post('order/add', {userId,deptId, orderDay,orderTime});
};

// 取消预约
const cancelReservation = (userId,deptId) => {
    // 定义api，向后端发送请求
    return request.post('order/cancel?userId='+userId+'&deptId='+deptId);
};

//查看我的预约
const checkReservation = (userId) => {
    // 定义api，向后端发送请求
    return request.post('order/myorder?userId='+userId);
};

//确定预约前提醒所选择部门和日期时间的预约人数
const checkPeople = (deptId,orderDay,orderTime) => {
    // 定义api，向后端发送请求
    return request.post('order/alert',{deptId, orderDay,orderTime});
};


export default {
    reservation,
    cancelReservation,
    checkReservation,
    checkPeople,
};
