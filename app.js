
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var accessLogfile = fs.createWriteStream('logs/access.log', {flags: 'a'});
var errorLogfile = fs.createWriteStream('logs/error.log', {flags: 'a'});

var DB = require('./DB');
var spider = require('./service/spiderFromRss');
var rssSite = require('./config/rssSite.json'); //rss website config file

var interval = rssSite.ttl*60*1000; //运行间隔时间

var app = express();

// all environments
app.set('port', process.env.PORT || 8002);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.logger({stream: accessLogfile}));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}
app.configure('production', function() {
    app.use(function(err, req, res, next){
        var meta = '[' + new Date() + '] ' + req.url + '\n';
        errorLogfile.write(meta + err.stack + '\n');
        next();
    });
});
app.get('/', routes.index);
app.get('/list', routes.news_list);
app.get('/getNewsPage', routes.getNewsPage);
app.get('/newsRecord', routes.newsRecord);
app.get('/users', user.list);

DB.init();
//爬虫开始
setTimeout(function(){
    spider.rssSpider(function(){
        console.log('第一轮抓取完毕');
    });
    setInterval(function(){
        spider.rssSpider(function(){
            console.log('第一轮定时抓取完毕');
        });
    },interval);
},5000);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Running successfully ! copy url    http://127.0.0.1:8002/  to browser');
});
