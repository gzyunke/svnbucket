import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import axios from 'axios'
import infiniteScroll from 'vue-infinite-scroll'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题

axios.defaults.timeout = 15000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('svnbucketToken');

Vue.directive('highlight', function (el) {
    let blocks = el.querySelectorAll('pre code');
    blocks.forEach((block)=>{
        hljs.highlightBlock(block)
    })
})

Vue.use(ElementUI);
Vue.use(infiniteScroll)
Vue.prototype.$axios = axios;
let vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

let loading = null;
let isNeedShowLoading = true;
// 发送请求前的处理
axios.interceptors.request.use((config) =>
{
    isNeedShowLoading = true;
    window.setTimeout(function ()
    {
        if (isNeedShowLoading)
        {
            loading = vm.$loading({lock: true, fullscreen: true, text: '请求中...', background: 'rgba(0, 0, 0, 0.7)'});
            window.setTimeout(function ()
            {
                if (loading)
                {
                    loading.close();
                    loading = null
                }
            }, 10000);
        }
    }, 500);

    var token = window.localStorage.getItem('svnbucketToken');
    config.headers.common['Authorization'] = token;
    return config;
},
(error) =>
{
    console.error("错误的传参");
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>
{
    isNeedShowLoading = false;
    if (loading)
    {
        loading.close();
        loading = null
    }

    if (res.data.isLogin === false)
    {
        vm.$router.replace('/login')
        return Promise.reject(res);
    }
    else if (res.data.success === false)
    {
        console.log('failed:' + res.data.msg);
        vm.$message.error(res.data.msg);
        return Promise.reject(res);
    }
    return res;
},
(error) =>
{
    console.error("网络异常");
    return Promise.reject(error);
});