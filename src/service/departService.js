import goverRequest from '../utils/goverRequest';

// 获取部门和业务
const getHotBusiness = () => {
    return goverRequest.get('businesses/getHot');
};

export default {
    getHotBusiness,
};
