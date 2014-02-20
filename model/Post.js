/**
 * Created by liu.xing on 14-2-18.
 */
var mongoose = require('mongoose');
var PostSchema = require('../schemas/PostSchema');
var Post = mongoose.model('Post',PostSchema);

module.exports = Post;