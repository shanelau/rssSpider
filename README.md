rssSpider
=========

news spider,rss server

网络爬虫，使用NodeJs抓取RSS新闻

提供RSS服务的站点超级多，百度、网易、新浪、虎嗅网 等等站点，基于java  c++ php的rss抓取网上很多，今天说说NodeJs抓取RSS信息，
使用NodeJs做网络爬虫，抓取RSS新闻。各站点编码格式不一样 GBK,UTF-8,ISO8859-1等等，所以需要进行编码，对国人来说UTF-8是最酷的。抓取多站点，然后保存到数据库，充分利用javascript异步编程的特点，抓取速度超级快呀。

**本项目以网易的rss进行测试 http://www.163.com/rss**

**关键抓取代码，在service目录**

项目开发环境：nodejs、mongodb

**运行方式  node app.js**


项目的详细介绍地址：http://blog.csdn.net/kissliux/article/details/19560603

#2014.334  更新日志
1.  重新架构项目，使用jshint进行代码验证
2.  RSS抓取到新闻链接后，继续抓取新闻正文，提取出新闻正文中的有用图片、和正文。 新闻进行列表显示的时候，如果有图片，更能吸引眼球，本项目抓取网易的新闻正和图片，正确率在90%以上
3.  为其他客户端提供新闻查询的http服务，查询新闻列表(标题、图片、描述)，获取新闻正文

*客户端请求新闻列表协议*
Demo：
http://58.60.184.212:8001/getNewsPage?page=0&maxNums=5&typeId=3&pic=true

参数名	值类型	是否必须	默认值	描述
page	Int 	 否 	0	请求新闻的页数，

maxNums	Int 	是		每页显示的新闻数量
typeId	Int	是	1	新闻类别,比如新闻头条 typId值为1，社会新闻值为2
pic	Boolean  	否	false	Pic ==true 会返回图片的地址，其他情况不会返回图片

*响应格式*
参数名	值类型	描述
title   String	 新闻标题
pubDate 	String	新闻发布日期
typeId 	Number	类型编号
_id	String	新闻编号
Page	Number	当前页数
descImg	String 	新闻图片的url地址

*查询一条新闻正文协议*
Demo：http://localhost:8001/newsRecord?userId=liux&id=530c444a7c65d70000f9d1b8

参数名	值类型	是否必须	默认值	描述
userId	String 	否	无	用户的标志
Id	String	是	无	新闻编号 _id



#2014.2.27 更新日志
1、使用express 提供新闻服务，为android客户端和其他客户端提供服务

2、加入分页支持

3、使用chreeio插件，遍历web网页全文，抓取新闻标题和url地址。(针对m.baidu.com测试)实验。



