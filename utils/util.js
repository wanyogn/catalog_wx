/*ajax发送 */
function sendAjax(url, data, callback) {
  wx.request({
    url: url,
    data: data,
    method: 'post',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      if (res.statusCode == 200) {
        callback(res.data);
      }
    },
    error: function (res) {
      console.log(res);
    }
  })
}
/*关键词变色 */
function changeColor(str, key) {
  let patt = /[a-zA-Z]/;
  let name_highlighted_html = '';
  let keyArr = key.split(" ");
  if (keyArr.length > 1) {
    name_highlighted_html = str;
    for (var i = 0; i < keyArr.length; i++) {
      if (keyArr[i] != "") {
        var reg = new RegExp(keyArr[i], "g");
        name_highlighted_html = name_highlighted_html.replace(reg, "<em style='color:#f39800;font-style: normal;'>" + keyArr[i] + "</em>");
      }
    }
  } else {
    if (patt.test(key)) {
      var reg = new RegExp(key, "g");
      name_highlighted_html = str.replace(reg, "<em style='color:#f39800;font-style: normal;'>" + key + "</em>");
    } else {
      for (var j = 0; j < str.length; j++) {
        var val = str.substring(j, j + 1);
        if (key.indexOf(val) >= 0) {
          name_highlighted_html = name_highlighted_html + "<em style='color:#f39800;font-style: normal;'>" + val + "</em>";
        } else {
          name_highlighted_html = name_highlighted_html + val;
        }
      }
    }
  }
  return name_highlighted_html;
}
function sendAjaxForCount(url, data) {
  var count = 0;
  wx.request({
    url: url,
    data: data,
    method: 'post',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      if (res.statusCode == 200) {
        //callback(res.data);
        let data = res.data;
        count = data.matchCount;
      }
    },
    error: function (res) {
      console.log(res);
    }
  })
  return count;
}


module.exports = {
  sendAjax:sendAjax,
  changeColor: changeColor,
  sendAjaxForCount: sendAjaxForCount
}
