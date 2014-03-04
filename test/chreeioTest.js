/**
 * Created by liu.xing on 14-3-4.
 */
var cheerio = require('cheerio');
var context = "<div><p class='hello'>Hello</p> how are <p>you?</p></div>";
var $ = cheerio.load(context);

console.log($("p").remove());
console.log($.html());

