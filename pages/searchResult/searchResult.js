var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    clickCode: '',//当前点击的目录编号
    iszk: false,//是否展开
    showHeight:'',
    keyword:'',
    matchCount:0,
    searchData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var keyword = options.keyword;
    var that = this;
    wx.getSystemInfo({//赋值给scroll-view，获取屏幕的高度
      success: function (res) {
        console.log(res.screenHeight - 100);
        that.setData({
          showHeight:res.screenHeight-170
        })
      }
    });
   
    util.sendAjax("https://www.yixiecha.cn/wx_catalog/queryByKey.php", {keyword:keyword}, function (data) {
      for (let i = 0; i < data.datas.length; i++) {
        data.datas[i].name = util.changeColor(data.datas[i].name, keyword);
        data.datas[i].isZK = true;
        for (let j = 0; j < data.datas[i].data.length; j++) {
          data.datas[i].data[j].product_description = util.changeColor(data.datas[i].data[j].product_description, keyword);
          data.datas[i].data[j].expected_use = util.changeColor(data.datas[i].data[j].expected_use, keyword);
          // data.datas[i].data[j].product_example = util.changeColor(data.datas[i].data[j].product_example, keyword);
          let product_example = data.datas[i].data[j].product_example;
          let arr = product_example.split("、");
          let _html = '';
          let exampleArray = new Array();
          // let exampleCommon = new Array();//没有样式的品名举例
          if (arr.length > 0) {
            if (arr[0] != "") {
              for (let j = 0; j < arr.length; j++) {
                let example = {};
                example.old = arr[j];
                example.new = util.changeColor(arr[j], keyword);
                exampleArray.push(example);
              }
              data.datas[i].data[j].product_example = exampleArray;
            }
          }
        }

      }
      util.sendAjax("https://www.yixiecha.cn/wx_catalog/insert_search.php", { keyword: keyword, openid: wx.getStorageSync('openid'),tag:'FLML' }, function (data) {
        
      });
      that.setData({
        searchData:data.datas,
        matchCount:data.matchCount,
        keyword:keyword
      })
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  keyInput: function (e) {
    this.setData({
      keyword: e.detail.value
    })
  },
  searchKey: function (e) {
    if (this.data.keyword == "") {
      wx.showModal({
        title: '提示',
        content: '请输入关键词...',
        success: function (res) {
        }
      });
    } else {
      wx.navigateTo({
        url: '../searchResult/searchResult?keyword=' + this.data.keyword
      })
    }
  },
  bindExample:function(e){    
    let text = e.currentTarget.dataset.text;
    var afterStr = text.replace(/<[\/\!]*[^<>]*>/ig, "")//正则去掉文本中的HTML标签
    wx.navigateTo({
      url: '../search_pro/search_pro?classify=pro' + '&keyword=' + afterStr
    });
  },
  /*二级目录点击折叠 */
  dirTap:function(e){
    let id = e.currentTarget.id;
    let data = this.data.searchData;
    data[id].isZK = !data[id].isZK;
    this.setData({
      searchData: data,
    })
  }
})
