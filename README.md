# rssSpider

Design and coding with all the love in the world by ShaneLau.


> Web crawler, use NodeJs grab the RSS news, fetching the contents of the include title,released time, description, source,content and images . At the same time for the client to provide the standard news service interface.    



Use nodejs captured above to network news, then insert into mongodb .
How the RSS news and links to the url address and grab a summary of the news text and the news pictures For a news client, without pictures is a fatal blow, illustrated to attract users.



## What's included
This project grabbed headlines news source,url,description,images,content.
Provide list query and single news query services.


### Demo

http://kissliux.github.io/2014/07/07/rss-spide/      


## Environment
nodejs、mongodb

## Usage ##
```
 npm install -d    

 node app.js
    
```
spide will begin after five seconds.
cpoy to broswer

```
 http://localhost:8002

```

** Test rss : http://www.163.com/rss **



## Features ##
1.  多站点同时抓取，需要抓取的站点可以在配置文件中配置
2.  抓取的新闻正文的准确率非常高，包括图片
3.  nodejs实现，抓取效率非常高
4.  可以配置抓取的时间，和新闻正文的开始标签，过滤掉广告无用的图片和广告（iframe广告）
5.  已经提供了，新闻列表和新闻查询的http服务，为android或者其他客户端完美提供数据源支持
6.  加入响应式框架skeleton,展示新闻列表，和新闻正文。



blog ：
  
http://blog.csdn.net/kissliux/article/details/19560603  

http://blog.csdn.net/kissliux/article/details/20466889  

>If you have any question,please tell me， shanelau1021@gmail.com


#2014.3.31  update logs  
1.  加入index.ejs页面，直接在web界面查看新闻的api接口，请求和响应的数据格式  


#2014.3.15 update logs
1.  加入响应式框架skeleton，框架一共20kb,适合开发移动网页，
2.  加入async异步编程控制库，请求所有新闻列表时，使用queue函数进行数据库查询，并发数量为5，访问数据库的数据超快。web响应也在100ms内
3.  http://localhost:8001/即新闻列表，点击新闻 跳转到新闻正文。  

#2014.3.4  update logs
1.  重新架构项目，使用jshint进行代码验证
2.  RSS抓取到新闻链接后，继续抓取新闻正文，提取出新闻正文中的有用图片、和正文。 新闻进行列表显示的时候，如果有图片，更能吸引眼球，本项目抓取网易的新闻正和图片，正确率在90%以上
3.  为其他客户端提供新闻查询的http服务，查询新闻列表(标题、图片、描述)，获取新闻正文

*客户端请求新闻列表协议* 见源码中的文档


#2014.2.27 更新日志
1、使用express 提供新闻服务，为android客户端和其他客户端提供服务  
2.  解决linux安装问题，去除iconv库

2、加入分页支持

3、使用chreeio插件，遍历web网页全文，抓取新闻标题和url地址。(针对m.baidu.com测试)实验。





