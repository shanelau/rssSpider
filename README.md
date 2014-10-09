# rssSpider

Design and coding with all the love in the world by ShaneLau.



> The simplest way to use rssspide to fetch rss list and site info.  
> Fetch post'content ,give clean view to you.  

This project is base on [feedparser](https://github.com/kballard/feedparser) and [node-readability](https://github.com/luin/node-readability) 



## Usage  

```
npm install rssspide
```
Then:

``` 
var spide = require('rss-spide');
spide.fetchRss(url).then(function(data){
		console.log(data); // rss  post list
});
```

## API Documentation

** <code>fetchRss(url,[options])</code> **  
	
	get rss site'post list  ,like this  [www.bigertech.com/rss]http://www.bigertech.com/rss

	*  **url** : webiste'rss url 
    *  **options** :what data you need ?  default value:
	
	```
	['title','description','summary','date','link','guid','author','comments','origlink','image','source','categories','enclosures']
	```  
	response data
	**Array**  
	
	```
	[{ title: '一个营销人员的自我修养',
  description: '<p></p>',
  summary: '</p>',
  date: Wed Oct 08 2014 17:14:26 GMT+0800 (CST),
  link: 'http://www.bigertech.com/learn-social-media-marketing/',
  guid: 'a623d78a-dae9-4915-9caa-0fd34fb3757c',
  author: '巴依老爷',
  comments: null,
  origlink: null,
  image: {},
  source: {},
  categories: [],
  enclosures: [] },
  ....  // more
	]
	```
  
** <code>siteInfo(url,[options])</code>  **
    get website info
    * **url**   webiste'rss url
    * **options**  what data you need ?  default value:
    
    ```
['title','description','date','link','xmlurl','author','favicon','copyright','generator','image']

    ```
   response data **Array** 
   
   ```
  { title: '笔戈科技',
  description: '简单、有趣、有价值',
  date: Thu Oct 09 2014 18:15:14 GMT+0800 (CST),
  link: 'http://www.bigertech.com/',
  xmlurl: 'http://www.bigertech.com/rss/',
  author: null,
  favicon: null,
  copyright: null,
  generator: 'Ghost 0.5',
  image: {},
  feedurl: 'http://www.bigertech.com/rss' } 
   ```



** `getCleanBody(url)` **

Where

  * **html** url or html code.
  * **options** is an optional options object
  * **callback** is the callback to run - `callback(error, article, meta)`
  
  
  ```
  var url = 'http://www.bigertech.com/learn-social-media-marketing/';
  spide.getCleanBody(url).then(function(article){
        console.log(article);   //clean code view    
    });
  ```
  
##### More info [node-readability](https://github.com/luin/node-readability)

Turn any web page into a clean view. This module is based on arc90's readability project.
  

#### article.content  is clean view 

The article content of the web page. Return `false` if failed.



**<code>getAllByUrl(url,[options])</code>**
This method is similar to ** fetchRss **  
	What'more ,it fetch the clean page content.
	Turn any web page into a clean view. This module is based on arc90's readability project.
	
* **url** website'rss url  
	
* **Array**  respose data
	
get clean view code  
	
	
```  

	[{ title: '一个营销人员的自我修养',
	content:'clean code view',     // clean code view
  description: '<p></p>',
  summary: '</p>',
  date: Wed Oct 08 2014 17:14:26 GMT+0800 (CST),
  link: 'http://www.bigertech.com/learn-social-media-marketing/',
  guid: 'a623d78a-dae9-4915-9caa-0fd34fb3757c',
  author: '巴依老爷',
  comments: null,
  origlink: null,
  image: {},
  source: {},
  categories: [],
  enclosures: [] },
    ....... // more
	]

```

## test  100%
```
nodeunit test/index.js

```


### Any question [shanelau](http://weibo.com/kissliux)  
or  
[shanelau1021@gmail.com](shanelau1021@gmail.com)


