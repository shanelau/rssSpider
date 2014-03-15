/**
 * Created by liu.xing on 14-2-18.
 * post 数据库操作，增删改查等等
 */
var Post = require('../model/Post');
function getPost(mTitle,mLink,mTypeId){
    var mPost = new Post({
        title : mTitle,
        link :  mLink,
        typeId : mTypeId
    });
    return mPost;
}
function savePost(mTitle,mLink,mTypeId){
    var post = getPost(mTitle,mLink,mTypeId);
    post.save(function(err){
        if(err){
            console.error(err.message);
            return;
        }
        console.log(post.title);
    });

}
function addPost(post){
    post.save(function(err){
        if(err){
            console.error(err.message);
            return;
        }
        console.log(post.title);
    });
}
function savePosts(posts){
    posts.forEach(function(e){
        addPost(e);
    });
}
/**
 * 获取新闻列表
 * @param page
 * @param maxPostPerPage
 * @param typeId
 * @param callback
 */
function getNewsPage(page,maxPostPerPage,typeId,needPic,callback){
    var filed = {link:0,context:0,records:0,_v:0};
    var filter = {
        typeId:typeId,
        "descImg":{"$exists":needPic}
    };
    Post.find(filter,filed)
        .sort({"_id":-1})
        .skip(page*maxPostPerPage)
        .limit(maxPostPerPage)
        .exec(function(err,posts){
            if(err){console.log(err); return;}
            callback({"posts":posts,"page":page});
        });
}
/**
 * 记录用户访问新闻的习惯
 * @param postId
 * @param userId
 */
function updatePost(postId,userId){
    Post.update({"_id":postId},{"$addToSet":{"records":userId}},
        function(err){
            if(err){
                console.log(err);
                throw err;
            }
    });
}
/**
 *  查找单条新闻。记录用户访问新闻的习惯
 * @param postId 新闻编号、
 * @param userId  用户编号
 * @param callback
 */
function findPost(postId,userId,callback){
    updatePost(postId,userId);
    Post.find({"_id":postId},{context:1,title:1}).exec(function(err,post){
        if(err){
            console.log(err);
            throw err;
        }
        if(post[0] != null){
            callback(post);
        }
    });
}

exports.savePost = savePost;
exports.addPost = addPost;
exports.savePosts = savePosts;
exports.getNewsPage = getNewsPage;
exports.updatePost = updatePost;
exports.findPost = findPost;