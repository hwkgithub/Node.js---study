var express = require('express')
var router = express.Router()

var async = require('async')

var multiparty = require('multiparty')
var fs = require('fs')

var MongoClient = require('mongodb').MongoClient
var DB_CONN_STR = 'mongodb://localhost:27017/project'

router.post('/submit', function (req, res) {
  var username = req.session.username || ''

  if (username) {
    var title = req.body['title']
    var content = req.body['content']

    var insertData = function (db, callback) {
      var conn = db.collection('comment')
      var ids = db.collection('ids')

      async.waterfall([
        function (callback) {
          ids.findAndModify(
            {name: 'comment'},
            [['_id', 'desc']],
            {$inc: {id: 1}},
            function (err, results) {
              callback(null, results.value.id)
            }
          )
        },
        function (id, callback) {
          var data = [{uid: id, title: title, content: content, username: username}]

          conn.insert(data, function (err, results) {
            if (err) {
              console.log(err)
              return
            }
            callback(results)
          })
        }
      ], function (err, results){
        callback(results)
      })
    }

    MongoClient.connect(DB_CONN_STR, function(err, db){
      if (err) {
        console.log(err);
      } else {
        console.log('连接成功')
        insertData(db, function (results) {
          // res.send('提交评论成功')
          res.redirect('/comment/list')
          db.close()
        })
      }
    })
  } else {
    res.send('<script>alert("session过期，请重新登录");location.href="/login"</script>')
  }
  // res.send('ok')
})

router.get('/list', function (req, res) {
  var username = req.session.username || ''

  if (username) {

    // 构建分页的基本信息
    var pageNo = req.query['pageNo']
    pageNo = pageNo ? pageNo : 1
    var pageSize = 10
    var count = 0
    var totalPage = 0

    var findData = function (db, callback) {
      var conn = db.collection('comment')

      async.series([
        function (callback) {
          conn.find({}).toArray(function (err, results) {
            if (err) {
              console.log(err);
            } else {
              totalPage = Math.ceil(results.length/pageSize)
              count = results.length

              pageNo = pageNo <=0 ? 1 : pageNo
              pageNo = pageNo > totalPage ? totalPage : pageNo

              callback(null, '')
            }
          })
        },
        function (callback) {
          conn.find({}).sort({_id: -1}).skip((pageNo-1) * pageSize).limit(pageSize).toArray(function (err, results) {
            if (err) {
              console.log(err)
            } else {
              callback(null, results)
            }
          })
        }
      ], function (err, results) {
        callback(results[1])
      })
    }

    MongoClient.connect(DB_CONN_STR, function(err, db){
      findData(db, function (results) {
        // console.log(results)
        res.render('list', {
          res: results,
          pageNo: pageNo,
          totalPage: totalPage,
          count: count
        })
      })
    })
  } else {
    res.send('<script>alert("session过期，请重新登录");location.href="/login"</script>')
  }
})

router.post('/uploadImg', function (req, res) {
  var form = new multiparty.Form()

  // 设置编码
  form.encoding = 'utf-8'

  // 设置文件存储路径
  form.uploadDir = './uploadtemp'

  // 设置文件打下限制
  form.maxFilesSize = 2 * 1024 * 1024

  form.parse(req, function (err, fields, files) {
    var uploadurl = '/images/upload/'
    file = files['filedata']
    originalFilename = file[0].originalFilename
    tmpPath = file[0].path

    var timestamp = new Date().getTime()
    uploadurl += timestamp + originalFilename
    newPath = './public/' + uploadurl

    var fileReadStream = fs.createReadStream(tmpPath)
    var fileWriteStream = fs.createWriteStream(newPath)
    fileReadStream.pipe(fileWriteStream)
    fileWriteStream.on('close', function () {
      fs.unlinkSync(tmpPath)
      res.send('{"err":"","msg":"'+uploadurl+'"}')
    })
  })
})

router.get('/detail', function (req, res) {
  var username = req.session.username || ''
  if (username) {
    var uid = parseInt(req.query['uid'])
    MongoClient.connect(DB_CONN_STR, function (err, db) {
      if(err) throw err
      db.collection('comment').findOne({uid:uid}, function (err, item) {
        res.render('detail', {item: item})
      })
    })
  } else {
    res.send('<script>alert("session过期，请重新登录");location.href="/login"</script>')
  }
})

module.exports = router
