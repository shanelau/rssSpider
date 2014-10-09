/**
 * Created by liuxing on 14-10-9.
 */
var spide = require('../index'),
    url = 'http://www.bigertech.com/rss';
exports.fetchRSS = function(test){
    spide.fetchRss(url).then(function(data){
        test.ok(data.length > 0, "this assertion should pass");
        test.done();
    });

};

exports.fetchSiteInfo = function(test){
    spide.siteInfo(url).then(function(data) {
        console.log(data);

        test.ok(data.title !== '', "this assertion should pass");
        test.done();
    });

};

exports.getAllByUrl = function(test){
    spide.getAllByUrl(url).then(function(data) {
        test.ok(data.length > 0, "this assertion should pass");
        test.done();
    });
};

exports.getPostContent = function(test){
    var url = 'http://www.bigertech.com/the-art-of-mfc/';
    spide.getCleanBody(url).then(function(data){
        test.ok(data.title != '', "this assertion should pass");
        test.done();
    });
};
