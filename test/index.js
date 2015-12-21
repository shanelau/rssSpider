/**
 * Created by liuxing on 14-10-9.
 */
var spide = require('../index'),
  url =
  'http://wan.meizu.com/rss';
exports.fetchRSS = function(test) {
  spide.fetchRss(url).then(function(data) {
    test.ok(data.length > 0, "this assertion should pass");
    test.done();
  }).catch(test.done);
}

exports.fetchSiteInfo = function(test) {
  spide.siteInfo(url).then(function(data) {
    test.ok(data.title !== '', "this assertion should pass");
    test.done();
  }).catch(function(err) {
    console.error(err);
  });

};

exports.getAllByUrl = function(test) {
  spide.getAllByUrl(url).then(function(data) {
    test.ok(data.length > 0, "this assertion should pass");
    test.done();
  });
};

exports.getPostContent = function(test) {
  var url = 'http://www.bigertech.com/post/the-art-of-mfc/';
  spide.getCleanBody(url).then(function(data) {
    test.ok(data.title != '', "this assertion should pass");
    test.done();
  }).catch(function(err) {
    console.error(err);
  });
};
