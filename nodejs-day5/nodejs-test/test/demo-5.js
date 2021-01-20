const chai = require('chai');
const expect = chai.expect

var Demo = require('../lib/demo.js');

var demo = new Demo()

describe('Demo', () => {

  // this.timeout(5000)

  it('给汽车引擎加水是不能接受的事情', function () {
    expect(demo.engine.bind(demo, 'water')).to.throw('not accept')
  })
  // it('给汽车引擎加水是不能接受的事情', function () {
  //   expect(function () {
  //     demo.engine('gas')
  //   }).to.throw('not accept')
  // })

  // it('加载豆瓣 API 返回的数据应该包含 subjects 属性', function (done) {
  //   demo.fetchData('top250', function (data) {
  //     expect(data).to.have.property('subjects')
  //     done()
  //   })
  // })

  // it('一段时间以后返回数据', function (done) {
  //   demo.waitTwoSecond('hello', function (data) {
  //     expect(data).to.equal('hello')
  //     done()
  //   })
  // })

  // it('单价 10 块钱的 3 件商品小计金额应该是 30 块', function () {
  //   var subtotal = demo.subtotal(10, 3)
  //   expect(subtotal).to.equal(30)
  // })
});
