
/*
 * GET home page.
 */
var postService = require('../service/postService');
var rssSite = require('../config/rssSite.json');
var async = require('async');



var sites = rssSite.sites;

/**
 * 获取新闻列表和类别列表
 * */
exports.index = function(req, res){
    var newsList = new Array();
    var quene = async.queue(worker,5); //任务队列
    sites.forEach(function(site){
        site.channel.forEach(function(e){  //配置文件中的新闻rss url地址*/
            quene.push(e,function(result){
                newsList.push(result);
            });
        });
    });
    quene.drain = function(){
        res.render('index', { "newsList": newsList });
    }
};

function worker(task,callback){
    var news = {};
    postService.getNewsPage(1,5,task.typeId,true,function(data){
        news.typeName = task.title;
        news.posts = data.posts;
        callback(news);
    });
}

exports.getNewsPage = function(req, res){
    var page = parseInt(req.query.page,10);
    var maxNums = parseInt(req.query.maxNums,10);
    var needPic = false; //是否开启图片
    if(req.query.pic != null){
        needPic = true;
    }
    if(page < 0||maxNums < 0){
        res.json({"error":1});//请求参数错误
    }else{
        postService.getNewsPage(page,maxNums,req.query.typeId,needPic,function(data){
            res.json(data);
        });
    }
};


exports.newsRecord = function(req, res){
    var postId = req.query.id;
    var userId = req.query.userId;
    postService.findPost(postId,userId,function(post){
        res.render("news",
            {"title":post[0].title,"content":post[0].context}
        );
    });
};

