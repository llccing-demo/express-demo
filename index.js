var express = require('express');
var exphbs = require('express-handlebars');


var app = express();

app.engine('hbs', exphbs({
  layoutsDir: 'views/layouts',
  defaultLayout: 'main',
  extname: '.hbs'
}
));

app.set('view engine', 'hbs');


app.set('port', process.env.PORT || 3000);

// app.get 是添加路由的方法。
// app.VERB 帮我们做了很多工作，忽略了大小写和反斜杠
// 路由支持通配符
app.get('/', function (req, res) {
  res.render('home');
})

app.get('/about', function (req, res) {
  res.render('about');
})

// 定义了 404 页面
// app.use 是 Express 添加中间件的一种方式。
// 添加中间件和路由的顺序非常重要。
app.use(function (req, res) {
  res.status(404);
  res.render('404');
})

// 定义 500 页面，回调参数中多了 err
app.use(function (err, req, res, next) {
  console.error(err);
  res.type('text/plain');
  res.status(500);
  res.render('500');
})

app.listen(app.get('port'), function () {
  console.log(`Express started on http://localhost ${app.get('port')}; press Ctrl - C to terminate.`)
})