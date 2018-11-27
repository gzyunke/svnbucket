export const KEY_USER_DATA = 'userData';
export const KEY_PROJECT_INFO = 'projectInfo';
export const KEY_PROJECTS = 'projects';
export const KEY_SIDEBAR_CURRNET_INDEX = 'sidebarCurrentIndex';

export const state = {
    // 项目列表数据
    projects: JSON.parse(window.sessionStorage.getItem(KEY_PROJECTS) || '[]'),

    // 新建项目
    newDialogVisible: false,
    feedbackDialogVisible: false,
    // 微信小程序
    wxminiDialogVisible: false,
    contactDialogVisible: false,


    // 用户基本信息
    userData: JSON.parse(window.localStorage.getItem(KEY_USER_DATA) || '{}'),
    // 是否显示通知的弹窗
    isShowNotifyWindow: false,
    //是否显示快捷选择项目弹窗
    isShowQuickSeletcProject: false,
    // 是否显示用户下拉菜单
    isShowUserOperateWindow: false,
    // 当前选中项目的信息
    currProjectInfo: JSON.parse(window.sessionStorage.getItem(KEY_PROJECT_INFO) || '{}'),
    sidebarCurrentIndex: window.sessionStorage.getItem(KEY_SIDEBAR_CURRNET_INDEX) || '1',

};

export const mutations = {

    updateSidebarIndex(state, index)
    {
        state.sidebarCurrentIndex = index
        window.sessionStorage.setItem(KEY_SIDEBAR_CURRNET_INDEX, index)
    },

    updateProjects(state, projects)
    {
        state.projects = projects;
        window.sessionStorage.setItem(KEY_PROJECTS, JSON.stringify(projects))
    },

    updateUserInfo(state, userData)
    {
        state.userData = userData;
        window.localStorage.setItem(KEY_USER_DATA, JSON.stringify(userData))
    },

    setNewProjectDialogVisible(state, isShow)
    {
        state.newDialogVisible = isShow
    },

    setFeedbackDialogVisible(state, isShow)
    {
        state.feedbackDialogVisible = isShow
    },

    setWxminiDialogVisible(state, isShow)
    {
        if(MtaH5)
            MtaH5.clickStat("showqrcode")
        state.wxminiDialogVisible = isShow
    },


    setContactDialogVisible(state, isShow)
    {
        if(MtaH5)
            MtaH5.clickStat("showhelp")
        state.contactDialogVisible = isShow
    },

    //更改快捷选择项目弹窗
    setShowQuickSelectProjectWindow(state, isShow)
    {
        state.isShowQuickSeletcProject = isShow;
    },

    //更改用户下拉菜单弹窗
    setShowUserOperateWindow(state, isShow)
    {
        state.isShowUserOperateWindow = isShow;
    },

    // 更新当前项目信息
    updateProjectInfo(state, projectInfo)
    {
        state.currProjectInfo = projectInfo
        window.sessionStorage.setItem(KEY_PROJECT_INFO, JSON.stringify(projectInfo))

        // 更新位置，以便快速切换项目那里能快速选择最近使用过的项目
        var findIndex = -1;
        var plen = state.projects.length
        for (var i = 0; i < plen; i++)
        {
            if (state.projects[i]['_id'] === projectInfo['_id'])
            {
                findIndex = i;
                break;
            }
        }

        if (findIndex > 0)
        {
            var deletes = state.projects.splice(findIndex, 1)
            state.projects.splice(0, 0, deletes[0])
        }
    },
}
