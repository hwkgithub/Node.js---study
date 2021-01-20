var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient
var DB_CONN_STR = 'mongodb://localhost:27017/project'

router.post('/registor', function(req, res){
  var username = req.body['username']
  var password = req.body['password']
  var nickname = req.body['nickname']

  //插入数据
  var insertData = function (db, callback) {
    // 连接collection
    var conn = db.collection('user')

    // 获得前端提交过来的数据
    var data = [{username: username, password: password, nickname: nickname}]

    // 插入数据
    conn.insert(data, function(err, results) {
      if (err) {
        console.log(err)
        return;
      }
      callback(results)
    })
  }

  //数据库连接
  MongoClient.connect(DB_CONN_STR, function (err, db) {
    if (err) {
      console.log(err)
    } else {
      console.log('数据库连接成功')
      insertData(db, function (results) {
        console.log(results)
        // res.send('注册成功！')
        res.redirect('/login')
        db.close()
      })
    }
  })
})

router.post('/login', function (req, res) {
  var findData = function (db, callback) {
    // 连接collection
    var conn = db.collection('user')

    // 获取前端提交过来的数据
    var data = {username: req.body['username'], password: req.body['password']}

    // 查找数据
    conn.find(data).toArray(function (err, results) {
      callback(results)
    })
  }

  MongoClient.connect(DB_CONN_STR, function (err, db) {
    if (err) {
      console.log(err)
    } else {
      console.log('连接数据库成功')
      findData(db, function (results) {
        if (results.length > 0) {
          // res.send('登录成功')

          // 保存session
          req.session.username = results[0].username

          // 路由跳转
          res.redirect('/')
        } else {
          // res.send('登录失败')
          res.redirect('/login')
        }
        db.close()
      })
    }
  })
})

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
//   // res.send('hello')
// });
//
// router.get('/list', function(req, res) {
//   res.send('user lists')
// })
//
// router.get('/ab*cd', function(req, res) {
//   res.send('regexp')
// })
//
// router.get('/form', function(req, res) {
//   res.sendFile(__dirname + '/form.html')
// })
//
// router.post('/save', function(req, res) {
//   res.send('表单提交')
// })
//
// router.all('/all', function(req, res) {
//   res.send('all')
// })

module.exports = router;
