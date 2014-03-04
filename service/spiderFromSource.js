/**
 * Created by liu.xing on 14-2-24.
 *抓取 新闻列表 网页，得到新闻标题和链接
 */
var http = require('http');
var cheerio = require('cheerio');
var newsSite = require('../config/newsSite.json');  //列表类新闻正文
var postService = require('../service/postService');


function fetchSource(url,callback){
    http.get(url,function(res){
        var size = 0;
        var chunks = [];
        res.on('data',function(chunk){
            size += chunk.length;
            chunks.push(chunk);
        });
        res.on('end',function(){
            callback( Buffer.concat(chunks,size).toString() );
        })
    }).on('error',function(e){
            console.log('Got error:'+e.message);
        });
}
function getPost(htmlData,spiderUrl,typeId){
    var $ = cheerio.load(htmlData);
    var item = $(".list .list-item");
    item.each(function(){
        var title = $(this).text();
       var  url = $(this).find("a").attr("href");
        url = spiderUrl.substr(0,spiderUrl.indexOf("news?"))+url;
        postService.savePost(title,url,typeId);
    });
}
var channels = newsSite.channel;
/*jshint unused: vars */
(function spiderBegin(){
    console.log("spider begin...");
    channels.forEach(function(e){
        if(e.work !== false){
            console.log("begin:"+ e.name);
            fetchSource(e.url,function(data){
                getPost(data, e.url, e.typeId);
            });
        }
    });
})();
//setInterval(spiderBegin,newsSite.ttl*60*1000,0);
