import axios from 'axios';

const goverService = axios.create({
    // api的url地址
    // baseURL: process.env.VUE_APP_API_GOVER_URL,
    baseURL: 'http://localhost:7777/',
    // 持续时间2分钟
    timeout: 1000 * 120,
});

export default goverService
