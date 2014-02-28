/**
 * Created by liu.xing on 14-2-24.
 */
var http = require('http');
var cheerio = require('cheerio');
var newsSite = require('../config/newsSite.json');
var Post = require('../model/Post');
var postService = require('../service/postService');
var DB = require('../DB');


//wget函数负责抓取网页html
//@url 网页链接
//@callback 回调函数，返回html字符串
function wget(url,callback){
    http.get(url,function(res){
        var size = 0;
        var chunks = [];
        res.on('data',function(chunk){
            size += chunk.length;
            chunks.push(chunk);
        })
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
    item.each(function(i,e){
        title = $(this).text();
        url = $(this).find("a").attr("href");
        url = spiderUrl.substr(0,spiderUrl.indexOf("news?"))+url;
        postService.savePost(title,url,typeId);
    });
}
var channels = newsSite.channel;
function spiderBegin(){
    console.log("spider begin...")

    channels.forEach(function(e,i){
        if(e.work != false){
            console.log("begin:"+ e.name);
            wget(e.url,function(data){
                getPost(data, e.url, e.typeId);
            });
        }
    });
}
setInterval(spiderBegin,newsSite.ttl*60*1000,0);

