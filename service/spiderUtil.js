/**
 * Created by liu.xing on 14-3-3.
 *  html页面正文
 *  解决中文乱码问题
 */
var request         = require('request'),
    iconv           = require('iconv-lite'),
    BufferHelper    = require('bufferhelper'),
    FeedParser      = require('feedparser'),
    when            = require('when');


/**抓取网页全文源代码、主要用来抓取新闻正文
 * @param url 需要抓取的url地址
 * @param calback
 */
function fetchContent(url,calback){
    var req = request(url, {timeout: 10000, pool: false});
    req.setMaxListeners(50);
    req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
        .setHeader('accept', 'text/html,application/xhtml+xml');

    req.on('error', function(err) {
        console.log(err);
    });
    req.on('response', function(res) {
        var bufferHelper = new BufferHelper();
        res.on('data', function (chunk) {
            bufferHelper.concat(chunk);
        });
        res.on('end',function(){
            var result = iconv.decode(bufferHelper.toBuffer(),'GBK');
            calback(result);
        });
    });
}
/**
 * response 参数处理
 * @param str
 * @returns {Object}
 */
function getParams(str) {
    var params = str.split(';').reduce(function (params, param) {
        var parts = param.split('=').map(function (part) { return part.trim(); });
        if (parts.length === 2) {
            params[parts[0]] = parts[1];
        }
        return params;
    }, {});
    return params;
}
function done(err) {
    if (err) {
        console.error(err.stack);
        // return process.exit(1);
    }
    //process.exit();
}
/**
 * RSS抓取网页
 * @param url
 * @param typeId 新闻类别ID、这个参数根据项目情况定，可以删掉
 * @param callback
 */
function fetchRSS(url) {
    var posts;
    var defer = when.defer();
    // Define our streams
    var req = request(url, {timeout: 10000, pool: false});
    req.setMaxListeners(50);
    // Some feeds do not response without user-agent and accept headers.
    req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
        .setHeader('accept', 'text/html,application/xhtml+xml');

    var feedparser = new FeedParser();
    // Define our handlers
    req.on('error', done);
    req.on('response', function(res) {
        var stream = this;
        posts = [];
        if (res.statusCode !== 200){ return this.emit('error', new Error('Bad status code'));}
        //charset = getParams(res.headers['content-type'] || '').charset;
        stream.pipe(feedparser);
    });
    feedparser.on('error', done);
    feedparser.on('end', function(err){
        if(err){
            console.error(err);
            return;
        }
       defer.resolve(posts);
    });
    feedparser.on('readable', function() {
        var post;
        while (post = this.read()) {
            posts.push(post);//添加到数组
        }
    });
    return defer.promise;
}


exports.fetchRSS = fetchRSS;
exports.fetchContent = fetchContent;


/*getNewsContent("http://news.163.com/14/0303/02/9MCM2V4Q00014AED.html","#endText",function(context,imgPath){
    console.log(context);
});*/
