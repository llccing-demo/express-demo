var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser')
var formidable = require('formidable')
var cookieParser = require('cookie-parser')
var expressSession = require('express-session')
// 使用文件系统存储 session
var FileStore = require('session-file-store')(expressSession)

var { getOneSentence, tours } = require('./src/home.logic');
var { cookieSecret } = require('./src/credentials');
const credentials = require('./src/credentials');
const { sendMail } = require('./src/email')

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
// app.use(cookieParser(cookieSecret))
var fileStoreOptions = {}
app.use(expressSession({
  secret: cookieSecret,
  store: new FileStore(fileStoreOptions),
  cookie: {
    maxAge: 1000 * 60 * 3
  }
}))


app.set('port', process.env.PORT || 3000);

// app.get 是添加路由的方法。
// app.VERB 帮我们做了很多工作，忽略了大小写和反斜杠
// 路由支持通配符
app.get('/', function (req, res) {
  console.log(fileStoreOptions)
  res.render('home');
})

app.get('/about', function (req, res) {
  res.render('about', {
    sentence: getOneSentence()
  });
})

app.get('/form', function (req, res) {
  console.log('/form', req.session)
  const { username } = req.session
  res.render('form', { type: 'img', year: '2020', month: '08', username })
})

app.get('/thank-you', function (req, res) {
  res.render('thank-you')
})

// 处理类似登录的 formData 信息
app.post('/process-concact', function (req, res) {
  const { pass, name } = req.body

  // 设置 cookie
  res.cookie('monster', 'nom nom');
  /**
   * 设置签名cookie
   * 使用 req.signedCookies 接收
   * 被篡改的签名 cookie 会被服务器拒绝，并且 cookie 值会被重置为原始值。
   */
  res.cookie('sign_monster', 'nom nom', { signed: true });

  res.render('form', { name, pass })
})

app.post('/login', function (req, res) {
  const { pass, name } = req.body
  req.session.username = name
  req.session.colorScheme = req.session.colorScheme || 'dark'
  console.log(req.session)
  res.locals.flash = {
    name,
    message: '成功登录了'
  }
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


app.get('/email', function (req, res) {
  res.render('email')
})


app.post('/email/send', function (req, res) {
  sendMail()
  res.json({
    message: '开始发送！'
  })
})

app.use(function (req, res, next) {
  res.locals.flash = req.session.flash;
  // delete req.session.flash;
  next()
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