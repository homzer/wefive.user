import goverRequest from '../utils/goverRequest';

// 根据部门id获取业务
const getBusiness = (deptId) => {
    return goverRequest.post("businesses/get", {deptId});
};

// 热门业务
const getHotBusiness = () => {
    return goverRequest.get('businesses/getHot');
};

export default {
    getBusiness,
    getHotBusiness,
};
