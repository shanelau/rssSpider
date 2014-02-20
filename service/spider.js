
var request = require('request')
    , FeedParser = require('feedparser')
    , rssSite = require('../config/rssSite.json')
    , Iconv = require('iconv').Iconv;
var Post = require('../model/Post');
var DB = require('../DB');
var postService = require('../service/postService');


function fetch(feed,typeId) {
    var posts;
    // Define our streams
    var req = request(feed, {timeout: 10000, pool: false});
    req.setMaxListeners(50);
    // Some feeds do not response without user-agent and accept headers.
    req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
        .setHeader('accept', 'text/html,application/xhtml+xml');

    var feedparser = new FeedParser();

    // Define our handlers
    req.on('error', done);
    req.on('response', function(res) {
        var stream = this
            , iconv
            , charset;
        posts = new Array();
        if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));
        charset = getParams(res.headers['content-type'] || '').charset;
        if (!iconv && charset && !/utf-*8/i.test(charset)) {
            try {
                iconv = new Iconv(charset, 'utf-8');
                iconv.on('error', done);
                stream = this.pipe(iconv);
            } catch(err) {
                this.emit('error', err);
            }
        }
        stream.pipe(feedparser);
    });

    feedparser.on('error', done);
    feedparser.on('end', function(err){
        postService.savePost(posts);
    });
    feedparser.on('readable', function() {
        var post;
        while (post = this.read()) {
            posts.push(transToPost(post));//保存到数据库
        }
    });
    function transToPost(post){
        var mPost = new Post({
            title : post.title,
            link : post.link,
            description : post.description,
            pubDate : post.pubDate,
            source : post.source,
            author : post.author,
            typeId : typeId
        });
        return mPost;
    }
}

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

var channels = rssSite.channel;
channels.forEach(function(e,i){
    if(e.work != false){
        console.log("begin:"+ e.title);
        fetch(e.link, e.typeId);
    }
});

