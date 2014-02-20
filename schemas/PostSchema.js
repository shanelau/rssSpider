/**
 * Created by liu.xing on 14-2-20.
 */
var mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
    title:String,
    link :String,
    description :String,
    pubDate :String,
    source :String,
    author :String,
    typeId : Number
});
module.exports = PostSchema;