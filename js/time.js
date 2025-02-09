const showTime = () => {
  // let create_time = Math.round(new Date('2021-10-15 00:00:00').getTime() / 1000); //在此行修改建站时间
  // 有苹果用户发现safari浏览器不能正常运行，百度了一下发现是格式化的问题，改成下面这种应该就可以了。感谢反馈。
  // 获取指定时间的时间戳，单位是ms，除1000是为了转化成s
  let create_time = Math.round(new Date('2024/11/26 00:00:00').getTime() / 1000); //在此行修改建站时间
  let timestamp = Math.round((new Date().getTime()) / 1000);
  let second = timestamp - create_time;
  let time = new Array(0, 0, 0, 0);

  var nol = function(h) {
      return h > 9 ? h : '0' + h;
  }
  //如果剩余的时间超过一天，则提取出天数
  if (second >= 24 * 3600) {
      time[0] = parseInt(second / (24 * 3600));
      second %= 24 * 3600;
  }
  //如果剩余的时间超过一小时，则提取出小时数
  if (second >= 3600) {
      time[1] = nol(parseInt(second / 3600));
      second %= 3600;
  }
  //如果剩余的时间超过一分钟，则提取出分钟数
  if (second >= 60) {
      time[2] = nol(parseInt(second / 60));
      second %= 60;
  }
  if (second >= 0) {
      time[3] = nol(second);
  }
  let currentTimeHtml = ""
  currentTimeHtml = '本站已运行：'+time[0] + ' 天' + time[1] + ' 时 ' + time[2] + ' 分';
  document.getElementById("runtime").innerHTML = currentTimeHtml;
}
showTime()
setInterval(showTime, 60*1000);//每一分钟就重新计算一次。