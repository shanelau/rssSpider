/**
 * Created by liu.xing on 14-2-25.
 */
var event = new (require('events').EventEmitter)();
event.emit('event1');
event.emit('error',new Error("something is error"));