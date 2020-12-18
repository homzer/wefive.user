import goverRequest from '../utils/goverRequest';

// 根据业务id获取材料
const getMaterials = (busId) => {
    return goverRequest.post("material/get", {busId});
}

export default {
    getMaterials,
};
