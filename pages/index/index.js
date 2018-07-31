//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '请授权',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
   /* if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });console.log(1);
      wx.redirectTo({
        url: '../search/search'
      })
    } else if (this.data.canIUse){
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }; console.log(2);
     /* wx.redirectTo({
        url: '../search/search'
      })
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
      wx.redirectTo({
        url: '../search/search'
      })
    }*/
    /*wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {

              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
          wx.redirectTo({
            url: '../search/search'
          })
        } else {
          console.log("no");
        }
      }
    })*/
  },
  getUserInfo: function(e) {
    /*console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })*/
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo;
      wx.request({
        url: 'https://www.yixiecha.cn/wx_catalog/insert_user_info.php',//用户信息存入数据库中
        method: 'post',
        data: { openid: app.globalData.openid, nickName: e.detail.userInfo.nickName, sex: e.detail.userInfo.gender },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          var pages = getCurrentPages(); console.log(pages);
          var beforePage = pages[pages.length - 1]
          wx.navigateBack({
            success: function () {
              beforePage.onLoad(); // 执行前一个页面的onLoad方法
            }
          });
        },
        fail: function (e) {
          console.log(e);
          wx.showToast({
            title: '网络异常！',
            duration: 2000
          });
        }
      });
    }else{
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })

    }
  }
})
