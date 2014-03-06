var BufferHelper = require('../');
var should = require('should');
var fs = require('fs');

describe("BufferHelper", function () {
  it('new', function () {
    var bh = new BufferHelper();
    bh.buffers.should.have.length(0);
  });

  it('contact', function () {
    var bh = new BufferHelper();
    var buffer = new Buffer("呵呵");
    bh.concat(buffer);
    bh.toBuffer().should.have.length(buffer.length);
    bh.buffers.should.have.length(1);
  });

  it('load', function (done) {
    var bh = new BufferHelper();
    var reader = fs.createReadStream(__filename);
    var file = fs.readFileSync(__filename);
    bh.load(reader, function (err, buf) {
      should.not.exist(err);
      buf.should.have.length(file.length);
      buf.toString().should.be.equal(file.toString());
      done();
    });
  });
});
