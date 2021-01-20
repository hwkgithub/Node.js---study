const chai = require('chai');
const should = chai.should()

describe('Demo', () => {
  it('使用 should 风格的断言测试', function () {
    var value = 'hello'
    value.should.exist.and.equal('hello').and.have.length(5).and.be.a('string')
    // value.should.be.a('string')
    // value.should.equal('hello')
    // value.should.not.equal('你好')
    // value.should.have.length(5)
  })
});
