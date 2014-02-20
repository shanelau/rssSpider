/**
 * Created by liu.xing on 14-2-18.
 */
var Post = require('../model/Post');

function savePost(posts){
    for(var i = 0 ;i<posts.length;i++){
        var post = posts[i];
        console.log(post.title||"");
        Post.find({"title":post.title||""},function(err,r){ // 不存在，则插入
            if(err){
                console.error(err.stack);
                return;
            };
            if(r == null){
                post.save(function(err){
                    if(err){
                        console.error(err.stack);
                        return;
                    };
                });
            }

        });
    }
}
exports.savePost = savePost;