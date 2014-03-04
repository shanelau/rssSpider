/**
 * Created by liu.xing on 14-2-20.
 */
var mongoose = require('mongoose');
var PostSchema = new mongoose.Schema({
    title:{type:String,unique:true},
    link :String,
    description :String,
    descImg:String,
    context:String,
    pubDate :{
        type:Date,
        'default':Date.now
    },
    source :String,
    typeId : Number,
    records:[]
});
module.exports = PostSchema;