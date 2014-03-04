
/*
 * GET home page.
 */
var postService = require('../service/postService');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

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
        res.json({"post":post});
    });
};

