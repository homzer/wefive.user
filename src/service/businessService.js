import goverRequest from '../utils/goverRequest';

// 根据部门id获取业务
const getBusiness = (deptId) => {
    return goverRequest.post("businesses/get", {deptId});
}

export default {
    getBusiness,
};
