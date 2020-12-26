import goverRequest from '../utils/goverRequest';

// 获取部门和业务
const getHotBusiness = () => {
    return goverRequest.get('businesses/getHot');
};

const getDepartment = (deptId) => {
    return goverRequest.get('department/get/' + deptId);
};

export default {
    getHotBusiness,
    getDepartment,
};
