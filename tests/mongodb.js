/**
 * Created by liu.xing on 14-3-31.
 */

/* 百度开发平台数据库连接*/
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;
var dbConfig = require('../config/config.json');

/*数据库连接信息host,port,user,pwd*/


var db = new Db(dbConfig.db_name, new Server(dbConfig.db_host, dbConfig.db_port, {}), {w: 1});

function init() {

    db.on('error', console.error.bind(console, 'connection error:'));

    db.open(function(err, db) {
        db.authenticate(dbConfig.username, dbConfig.password, function(err) {
            if (err) {
                console.log(err.message);
                db.close();
                console('Authenticate failed!');
                return;
            }
            console.log("mongodb is ready!");
        });
    });
}