var util = require('../../utils/util.js')  

Page({
  /**
   * 页面的初始数据
   */
  data: {
    keyword:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
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
  /*点击首页的目录事件*/
  clickDir:function(e){
    let dir_num = e.currentTarget.id;
    wx.navigateTo({
      url: '../first/first?code='+dir_num
    })
  },
  keyInput:function(e){
    this.setData({
      keyword: e.detail.value.trim()
    })
  },
  searchKey:function(e){
    if (this.data.keyword == ""){
      wx.showModal({
        title: '提示',
        content: '请输入关键词...',
        success: function (res) {
        }
      });
    }else{
      wx.navigateTo({
        url: '../searchResult/searchResult?keyword=' + this.data.keyword
      })
    }

  }
})
