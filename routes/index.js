
/*
 * GET home page.
 */
var postService = require('../service/postService');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.news = function(req, res){
    var page = parseInt(req.query.page,0);
    var maxNums = parseInt(req.query.maxNums,5);
    var userId = req.query.maxNums;
    var openDesc = req.query.openDesc;
    if(page < 0||maxNums < 0){
        res.json({"error":1});//请求参数错误
    }else{
        postService.getPage(page,maxNums,req.query.typeId,openDesc,function(data){
            res.json(data);
        })
    }
};
exports.newsRecord = function(req, res){
    var postId = req.query.id;
    var userId = req.query.userId;
    postService.updatePost(postId,userId,function(url){
        console.log("redirct:"+url);
        res.redirect(url);
    });
};

