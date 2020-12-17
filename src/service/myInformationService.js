import request from '../utils/request';

const sendMyInformation = (userId,name, phone,cardId,password) => {
    return request.post('update',{userId,name,phone,cardId,password});
};

const getMyInformation = (userid) => {
    return request.get('goverment/users/info/'+userid);
};

export default {
    sendMyInformation,
    getMyInformation
};
