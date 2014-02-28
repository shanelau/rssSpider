/**
 * Created by liu.xing on 14-2-24.
 */

var DB = require('./../DB');
var Post = require('./../model/Post');

function updatePost(postId,userId){
    Post.update({"_id":postId},{"$addToSet":{"records":userId}},
        function(err,r){
            if(err){console.log(err); return;}
            console.log(r.title);
        });
}
setTimeout(function(){
    Post.find({"_id":"530aeec5e413a10000fa2813"},function(err,r){
        console.log(r);
    });
    updatePost("530adcb163bde910dc43ec52","liux");
},2000);
