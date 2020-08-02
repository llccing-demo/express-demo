var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

// app.get 是添加路由的方法。
// app.VERB 帮我们做了很多工作，忽略了大小写和反斜杠
// 路由支持通配符
app.get('/', function(req, res) {
  // 方便的设置响应头
  res.type('text/plain');
  res.send('旅游网站 开始啦');
})

app.get('/about', function(req, res) {
  res.type('text/plain');
  res.send('关于 旅游网站')
})

// 定义了 404 页面
// app.use 是 Express 添加中间件的一种方式。
// 添加中间件和路由的顺序非常重要。
app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
})

// 定义 500 页面，回调参数中多了 err
app.use(function(err, req, res, next) {
  console.error(err);
  res.type('text/plain');
  res.status(500);
  res.send('500 - Server Error');
})

app.listen(app.get('port'), function() {
  console.log(`Express started on http://localhost ${app.get('port')}; press Ctrl - C to terminate.`)
})