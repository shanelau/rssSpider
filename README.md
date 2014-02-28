rssSpider
=========


网络爬虫，使用NodeJs抓取RSS新闻

提供RSS服务的站点超级多，百度、网易、新浪、虎嗅网 等等站点，基于java  c++ php的rss抓取网上很多，今天说说NodeJs抓取RSS信息，
使用NodeJs做网络爬虫，抓取RSS新闻。各站点编码格式不一样 GBK,UTF-8,ISO8859-1等等，所以需要进行编码，对国人来说UTF-8是最酷的。抓取多站点，然后保存到数据库，充分利用javascript异步编程的特点，抓取速度超级快呀。


**关键抓取代码，在server目录**

**运行方式  node app.js**

项目的详细介绍地址：http://blog.csdn.net/kissliux/article/details/19560603

#新增功能
1、使用express 提供新闻服务，为android客户端和其他客户端提供服务

2、加入分页支持

3、使用chreeio插件，遍历web网页全文，抓取新闻标题和url地址。(针对m.baidu.com测试)实验。



