
var tools = {
    CDN_ROOT:"https://svnbucket-1255322048.image.myqcloud.com",
    COS_APPID:1255322048,
    COS_BUCKET_NAME:'svnbucket',
    COS_REGION:'sh',

    add0(m)
    {
        return m < 10 ? '0' + m : m
    },
    isValidEmail(email)
    {
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        return reg.test(email);
    },
    isValidUsername(name)
    {
        let reg = /^[a-zA-Z0-9_-]{4,16}$/;
        return reg.test(name);
    },
    formatDate(datetime, type)
    {
        var time = new Date(datetime * 1000);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        var str = "";
        if (type === null || type === undefined)
            type = 1;
        if (type === 1)
        {
            str = y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
        }
        else if (type === 2)
        {
            str = this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm);
        }
        else if (type === 3)
        {
            str = y + '年' + this.add0(m) + '月' + this.add0(d) + '日';
        }
        else if (type === 4)
        {
            str = this.add0(h) + ':' + this.add0(mm);
        }
        return str;
    },

    /**
     * 转为xx前的格式
     */
    formatDateBefore(timets)
    {
        var now = new Date().getTime() / 1000;
        var todayMidnight = now - (now % 86400) - 28800

        var time = now - timets //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
        if (time < 0)
        {
            return ''
        }
        else if ((time < 60))
        {
            return '刚刚'
        }
        else if (time < 3600)
        {
            return parseInt(time / 60) + ' 分钟前'
        }
        else if (timets > todayMidnight)
        {
            return '今天 ' + this.formatDate(timets, 4)
        }
        else if (timets > todayMidnight - 86400)
        {
            return '昨天 ' + this.formatDate(timets, 4)
        }
        else if (timets > todayMidnight - 86400 * 2)
        {
            return '前天 ' + this.formatDate(timets, 4)
        }
        else
        {
            return this.formatDate(timets, 2)
        }
    },
    imgFullPath(imgName, cosPath, style, width, height)
    {
        if(!imgName)
            return ''
        if(imgName.indexOf("http") === 0)
        {
            return imgName
        }
        else if (width || height)
        {
            let rootURL = this.CDN_ROOT + "/" + cosPath + "/" + imgName + "?imageView2/" + style;
            if (width)
                rootURL += "/w/" + width;
            if (height)
                rootURL += "/h/" + height;
            return rootURL;
        }
        else
        {
            return this.CDN_ROOT + "/" + cosPath + "/" + imgName;
        }
    },
    round(value, count)
    {
        let multi = Math.pow(10, count)
        return Math.round(value * multi) / multi
    },
    wxLogin(page)
    {
        let url = 'https://open.weixin.qq.com/connect/qrconnect?appid=wx4dd53cf231f0777f&redirect_uri=https%3a%2f%2fsvnbucket.com/api/onwxcode&response_type=code&scope=snsapi_login&state=' + page + '#wechat_redirect';
        window.location.href=url;
    },
    urlEncode(param, key, encode)
    {
        if(param == null) return '';
        let paramStr = '';
        let t = typeof (param);
        if (t === 'string' || t === 'number' || t === 'boolean')
        {
            paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
        }
        else
        {
            for (let i in param)
            {
                let k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += urlEncode(param[i], k, encode);
            }
        }
        return paramStr;
    }
};

export default tools