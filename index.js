/**
 * Created by liuxing on 14-9-22.
 */
var Promise = require('bluebird'),
    FeedParser = require('feedparser'),
    _ = require('lodash'),
    request = require('request'),
    read = require('node-readability'),
    postOptions = ['title', 'description', 'summary', 'date', 'link',
        'guid', 'author', 'comments', 'origlink', 'image', 'source', 'categories', 'enclosures'],
    siteInfoOption = ['title', 'description', 'date', 'link', 'xmlurl', 'author', 'favicon', 'copyright', 'generator', 'image'];

/**
 * get  all post info ,by rss url
 * @param url
 * @param options
 * @returns {Promise}
 */
function fetchRss(url, options) {
    options = options || postOptions;

    return new Promise(function (resolve, reject) {
        var posts;
        var req = request(url, {timeout: 10000, pool: false});
        req.setMaxListeners(50);
        req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
        req.setHeader('accept', 'text/html,application/xhtml+xml');

        var feedparser = new FeedParser();
        req.on('error', reject);
        req.on('response', function (res) {
            var stream = this;
            posts = [];
            if (res.statusCode !== 200) {
                return this.emit('error', new Error('Bad status code'));
            }
            //charset = getParams(res.headers['content-type'] || '').charset;
            stream.pipe(feedparser);
        });
        feedparser.on('error', reject);
        feedparser.on('end', function (err) {
            if (err) {
                reject(err);
            }
            resolve(posts);
        });
        feedparser.on('readable', function () {
            var post;
            while (post = this.read()) {
                var post = _.pick(post, options);
                posts.push(post);//添加到数组
            }
        });
    });
}
/**
 * get website info
 * @param url
 * @param options
 * @returns {Promise}
 */
function siteInfo(url, options) {
    options = options || siteInfoOption;
    return new Promise(function (resolve, reject) {
        var rss;
        var req = request(url, {timeout: 10000, pool: false});
        req.setMaxListeners(50);
        // Some feeds do not response without user-agent and accept headers.
        req.setHeader('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36')
        req.setHeader('accept', 'text/html,application/xhtml+xml');
        var feedparser = new FeedParser();
        req.on('error', reject);
        req.on('response', function (res) {
            var stream = this;
            if (res.statusCode !== 200) {
                return this.emit('error', new Error('Bad status code'));
            }
            //charset = getParams(res.headers['content-type'] || '').charset;
            stream.pipe(feedparser);
        });
        feedparser.on('error', reject);
        feedparser.on('end', function (err) {
            if (err) {
                reject(err);
            }
            resolve(rss);
        });
        feedparser.on('readable', function () {
            var post;
            if (post = this.read()) {
                rss = _.pick(post.meta, options);
                rss.feedurl = url;   //rss 的url
                resolve(rss);
            }
        });
    });
}
/**
 * get all post's body content  by  post list
 * @param posts
 * @returns {*|Promise}
 */
function fetchAllContent(posts) {
    return Promise.reduce(posts, function (total, post) {
        return getCleanBody(post.link).then(function (article) {
            post.content = article.content ? article.content : post.description || post.summary;
            return post;
        });
    }, []).then(function (total) {
        return posts;
    });
}
/**
 * get all content and rss post by rssUrl
 * @param url
 * @returns {*}
 */
function getAllByUrl(url) {
    return fetchRSS(url).then(function (posts) {
        return fetchAllContent(posts);
    });
}
/**
 *  get body content by link
 * @param link
 * @returns {Promise}
 */
function getCleanBody(link) {
    return new Promise(function (resolve, reject) {
        read(link, function (err, article, meta) {
            if (err) {
                reject(err);
            }
            resolve(article);
        });
    });
}
module.exports = {
    fetchRss: fetchRss,
    siteInfo: siteInfo,
    fetchAllContent: fetchAllContent,
    getCleanBody: getCleanBody,
    getAllByUrl: getAllByUrl
};