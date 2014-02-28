/**
 * Created by liu.xing on 14-2-18.
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
    post.save(function(err,r){
        if(err){
            console.error(err.stack);
            return;
        };
        console.log(post.title);
    });

}
function savePosts(posts){
    posts.forEach(function(e,i){
        e.save(function(err,r){
            if(err){
                console.error(err.stack);
                return;
            };
            console.log(e.title);
            console.log(r);
        });
    });
}
function getPage(page,maxPostPerPage,typeId,openDesc,callback){
    var filter = openDesc=='true'?
    {title:1,"pubDate":1,typeId:1,_id:1,description:1,records:0,descImg:1}
        :{description:0,link:0,records:0,descImg:0};
    Post.find({typeId:typeId},filter)
        .sort({"_id":-1})
        .skip(page*maxPostPerPage)
        .limit(maxPostPerPage)
        .exec(function(err,posts){
            if(err){console.log(err); return;}
            callback({"posts":posts,"page":page});
        });
}
function updatePost(postId,userId,callback){
    Post.update({"_id":postId},{"$addToSet":{"records":userId}},
        function(err,r){
            if(err){console.log(err); return;}
    });
    findPost(postId,callback);
}
function findPost(postId,callback){
    Post.find({"_id":postId},function(err,post){
        if(err){console.log(err); return;}
        console.log(post);
        if(post[0] != null){
            callback(post[0].link);
        }
    });
}

exports.savePost = savePost;
exports.savePosts = savePosts;
exports.getPage = getPage;
exports.updatePost = updatePost;
exports.findPost = findPost;