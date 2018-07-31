var util = require('../../utils/util.js')  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:'',//目录编号
    clickCode:'',//当前点击的二级目录编号
    iszk:false,//是否展开
    name:'',//目录名称
    firstDatas:[],
    secondData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let code = options.code;
    let that = this;
    util.sendAjax("https://www.yixiecha.cn/wx_catalog/queryFirst.php", { code: code }, function (data) {
      console.log(data);
      that.setData({
        code:data.code,
        name:data.name,
        firstDatas:data.second
      })
    });
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
  /*点击展开三级目录*/
  showSecond:function(e){
    let code = e.currentTarget.id;
    if(this.data.clickCode != '' && code != this.data.clickCode){
      this.data.iszk = true;
    }else{
      this.data.iszk = !this.data.iszk;
    }
    this.setData(this.data);
    this.setData({
      clickCode:code
    })
    let that = this;
    if (this.data.iszk){
      util.sendAjax("https://www.yixiecha.cn/wx_catalog/querySecond.php", { dir_num: this.data.code, first_num: code }, function (data) {
        that.setData({
          secondData: data.datas
        })
      });
    }
  },
  /*点击跳转详情页 */
  queryDetail:function(e){
    let secondCode = e.currentTarget.id;
    wx.navigateTo({
      url: '../second/second?dir_num=' + this.data.code + "&first_num=" + this.data.clickCode +"&second_num="+secondCode
    })
  }
})
