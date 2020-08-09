var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser')
var formidable = require('formidable')

var { getOneSentence, tours } = require('./src/home.logic');

var app = express();

app.engine('hbs', exphbs({
  layoutsDir: 'views/layouts',
  defaultLayout: 'main',
  extname: '.hbs'
}
));
app.set('view engine', 'hbs');


app.use(express.static(__dirname + '/public'))
// 这个处理 form 表单提交的内容
app.use(bodyParser.urlencoded({ extended: false }))
// 处理 json 格式的提交
app.use(bodyParser.json())

app.set('port', process.env.PORT || 3000);

// app.get 是添加路由的方法。
// app.VERB 帮我们做了很多工作，忽略了大小写和反斜杠
// 路由支持通配符
app.get('/', function (req, res) {
  res.render('home');
})

app.get('/about', function (req, res) {
  res.render('about', {
    sentence: getOneSentence()
  });
})

app.get('/form', function (req, res) {
  res.render('form', { type: 'img', year: '2020', month: '08' })
})

app.get('/thank-you', function (req, res) {
  res.render('thank-you')
})

// 处理类似登录的 formData 信息
app.post('/process-concact', function (req, res) {
  const { pass, name } = req.body
  console.log(`pass=`, pass)
  console.log(`name=`, name)
  res.render('form', { name, pass })
})

// 处理文件上传
app.post('/upload/:type/:year/:month', function (req, res, next) {
  const form = new formidable.IncomingForm();
  console.log(form)
  form.parse(req, (err, fields, files) => {
    console.log(fields)
    if (err) {
      res.json(err)
      return;
    }
    console.log(files)
    res.redirect(303, '/thank-you')
  })
})

app.get('/api/tours', function (req, res) {
  res.json(tours)
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