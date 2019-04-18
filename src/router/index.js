import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/projects',
            component: resolve => require(['../components/Main.vue'], resolve),
            children: [
                {
                    path: '',
                    component: resolve => require(['../components/ProjectsLayout.vue'], resolve),
                    children: [
                        {
                            path: '',
                            component: resolve => require(['../components/Projects.vue'], resolve),
                        },
                        {
                            path: '/projects-dynamic',
                            component: resolve => require(['../components/ProjectsDynamic.vue'], resolve),
                        },
                    ]
                },
                {
                    path: '/detail/:pid',
                    component: resolve => require(['../components/Detail.vue'], resolve),
                    props: true,
                    children: [
                        {
                            path: '',
                            component: resolve => require(['../components/Source.vue'], resolve),
                            props: true
                        },
                        {
                            path: '/detail/:pid/source',
                            component: resolve => require(['../components/Source.vue'], resolve),
                            props: true
                        },
                        {
                            path: '/detail/:pid/logs',
                            component: resolve => require(['../components/CommitLogs.vue'], resolve),
                            props: true
                        },
                        {
                            path: '/detail/:pid/members',
                            component: resolve => require(['../components/Members.vue'], resolve),
                            props: true
                        },
                        {
                            path: '/detail/:pid/setting',
                            component: resolve => require(['../components/ProjectSetting.vue'], resolve),
                            props: true
                        },
                        {
                            path: '/detail/:pid/hooks',
                            component: resolve => require(['../components/Hooks.vue'], resolve),
                            props: true
                        },
                    ]
                },
                {
                    path: '/user',
                    component: resolve => require(['../components/user/UserSetting.vue'], resolve),
                    props: true,
                    children: [
                        {
                            path: '',
                            component: resolve => require(['../components/user/UserInfo.vue'], resolve),
                            props: true
                        },
                        {
                            path: '/user/info',
                            component: resolve => require(['../components/user/UserInfo.vue'], resolve),
                            props: true
                        },
                        {
                            path: '/user/state',
                            component: resolve => require(['../components/user/UserState.vue'], resolve),
                            props: true
                        },
                        {
                            path: '/user/bind',
                            component: resolve => require(['../components/user/UserBind.vue'], resolve),
                            props: true
                        },
                        {
                            path: '/user/password',
                            props: true,
                            component: resolve => require(['../components/user/ChangePassword.vue'], resolve)
                        },
                    ]
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/Login.vue'], resolve)
        },
        {
            path: '/bindnew',
            component: resolve => require(['../components/BindNew.vue'], resolve)
        },
        {
            path: '/bindold',
            component: resolve => require(['../components/BindOld.vue'], resolve)
        },
        {
            path: '/regist',
            component: resolve => require(['../components/Regist.vue'], resolve)
        },
        {
            path: '/terms',
            component: resolve => require(['../components/Terms.vue'], resolve)
        },
        {
            path: '/forget',
            component: resolve => require(['../components/Forget.vue'], resolve)
        },
        {
            path: '/resetpwd',
            component: resolve => require(['../components/ResetPassword.vue'], resolve)
        },
        {
            path: '/',
            alias: '/index',
            component: resolve => require(['../components/index/IndexContainer.vue'], resolve),
            children: [
                {
                    path: '',
                    component: resolve => require(['../components/index/indexContent.vue'], resolve)
                },
                {
                    path: '/about',
                    component: resolve => require(['../components/index/AboutUs.vue'], resolve)
                },
                {
                    path: '/download',
                    component: resolve => require(['../components/index/Download.vue'], resolve)
                },
                {
                    path: '/package',
                    component: resolve => require(['../components/index/Package.vue'], resolve)
                }
            ]
        },
    ]
})

export default router
