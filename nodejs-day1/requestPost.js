const http = require('http')
const querystring = require('querystring')

var postData = querystring.stringify({
  'question[title]':'这个视频不错2',
  'question[content]':'<p>赞一个</p>',
  'question[courseId]':'227',
  'question[lessonId]':'1753',
  '_csrf_token':'32b0e1e07c657000e1f7250cdeac0377e6af688f'
})

var options = {
  hostname: 'www.codingke.com',
  port: 80,
  method: 'POST',
  path: '/ajax/create/course/question',
  headers: {
    'Accept':'*/*',
    'Accept-Encoding':'gzip, deflate',
    'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
    'Connection':'keep-alive',
    'Content-Length': postData.length,
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie':'PHPSESSID=qsqkoo0bq1grc6a5jo7kgk5tn7; CNZZDATA1256018185=1839628736-1476447839-null%7C1485424829; Hm_lvt_9f92046de4640f3c08cf26535ffdd93c=1485410187,1485420976; Hm_lpvt_9f92046de4640f3c08cf26535ffdd93c=1485426828',
    'Host':'www.codingke.com',
    'Origin':'http://www.codingke.com',
    'Referer':'http://www.codingke.com/v/398-chapter-227-course',
    'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.95 Safari/537.36',
    'X-CSRF-Token':'32b0e1e07c657000e1f7250cdeac0377e6af688f',
    'X-Requested-With':'XMLHttpRequest'
  }
}

var request = http.request(options, (res) => {
 console.log('Status:' + res.statusCode)
 console.log('headers:' + JSON.stringify(res.headers))
 res.setEncoding('utf8')
 res.on('data', (chunk) => {
   console.log(chunk)
 })
 res.on('end', () => {
   console.log('技术问答提交完毕！')
 })
})

request.on('error', (error) => {
  console.log(error)
})

request.write(postData)

request.end()