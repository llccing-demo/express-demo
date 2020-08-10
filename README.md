# express

## 内容

循序渐进了解 express，为 nest.js 补充基础知识。

## Finish
- 解析表单内容，通过 body-parser
- 读写 cookie，通过 cookie-parser
- 使用 session 记录登录状态，通过 express-session
- 持久化登录信息，通过 session-file-store 模仿数据库
- 发送邮件，通过 nodemailer（普通 163 可以，企业免费 163 不行）
- 测试文件上传，通过 formidable

## 解决那些简单的问题

- [x] express 如何做环境变量设置
- [x] process.env 如何赋值

这两个问题可以通过 `dotenv` 来解决，读取文件，设置到 `process.env` 变量上。