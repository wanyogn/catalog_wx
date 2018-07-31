var util = require('../../utils/util.js')  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dir_num:'',
    first_num:'',
    second_num:'',
    second_name:'',
    resultData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let dir_num = options.dir_num;
    let first_num = options.first_num;
    let second_num = options.second_num; 
   
    var that = this;
    util.sendAjax("https://www.yixiecha.cn/wx_catalog/queryDetail.php", { dir_num: dir_num, first_num: first_num ,second_num:second_num}, function (data) {
      that.setData({
        dir_num: dir_num,
        first_num: first_num,
        second_num: second_num,
        second_name: data.datas[0].second_product_name
      })
      if(dir_num != "IVD"){
        for (let i = 0; i < data.datas.length; i++) {
          ///data.datas[i].product_example = util.getExampleCount(data.datas[i].product_example);
          let product_example = data.datas[i].product_example;
          let arr = product_example.split("、");
          let _html = '';
          let count = 0;
          let exampleArray = new Array();

          if (arr.length > 0) {
            if (arr[0] != "") {
              for (let j = 0; j < arr.length; j++) {
                let example = {};
                util.sendAjax('https://www.yixiecha.cn/wx_catalog/queryExampleCount.php', { "keyword": arr[j] }, function (res) {
                  count = res.matchCount;
                  example.ecount = count;
                  example.name = arr[j];
                  exampleArray.push(example);
                  data.datas[i].product_example = exampleArray;
                  that.setData({
                    resultData: data.datas
                  })
                });
              }
            }
          }
        }
      }else{
        that.setData({
          resultData: data.datas
        })
      }
      
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
  bindExample:function(e){
    var text = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: '../search_pro/search_pro?classify=pro'+ '&keyword=' + text
    });
  }
})
