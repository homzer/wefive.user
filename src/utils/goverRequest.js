import axios from 'axios';

const goverService = axios.create({
    // api的url地址
    baseURL: "http://121.37.152.118:7777/",
    // 持续时间2分钟
    timeout: 1000 * 120,
});

export default goverService
