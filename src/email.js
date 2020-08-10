const nodemailer = require('nodemailer');

function sendMail() {
  nodemailer.createTestAccount((err, account) => {
    /**
     *  A16：网易免费企业邮支持POP3/SMTP服务，用户可通过Foxmail、Outlook等电脑客户端软件收发邮件，服务器地址：
        POP3：pop.ym.163.com 默认端口：110
        SMTP：smtp.ym.163.com 默认端口：25
     */
    let transporter = nodemailer.createTransport({
      // 普通版 smtp.163.com
      // 企业版 smtp.ym.163.com，貌似不支持呀
      host: 'smtp.163.com',
      // 465/994 secure; 25 not secure
      port: 465,
      secure: true,
      auth: {
        user: 'lcf33123@163.com',
        // 此处需要使用 163 给的授权码
        pass: 'xxx'
      }
    })

    let mailOptions = {
      // 这里注意拼写错误，not form
      from: 'lcf33123@163.com',
      to: 'lcf33123@foxmail.com, lcf33123@gmail.com',
      subject: 'nodemailer 测试邮件',
      text: '我是测试的内容哦！',
      html: '<strong>llccing 的第一个邮箱服务呢！</strong>',

    }

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return console.log('sendMain err', err)
      }

      console.log('邮件发送成功了呀！');
    })
  })
}

module.exports = {
  sendMail
}