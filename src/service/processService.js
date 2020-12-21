import goverRequest from '../utils/goverRequest';

const getBusProcess = (busId) => {
    return goverRequest.get('process/all/'+busId);
};

export default {
    getBusProcess,
};
