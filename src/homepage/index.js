var page = require('page');
var template = require('./template');
var empty = require('empty-element');
var title = require('title');
//var request = require('superagent');
var request = require('axios');
var header = require('../header');

page('/', header, loading, asyncLoad, function (ctx, next) {
    title('Platzigram');
    var main = document.getElementById('main-container');

    empty(main).appendChild(template(ctx.pictures));
});

function loading(ctx, next) {
    var el = document.createElement('div');
    el.classList.add('loader');
    document.getElementById('main-container').appendChild(el);
    next();
}
// function loadPictures(ctx, next) {
//     request
//         .get('/api/pictures')
//         .end(function (err, res) {
//             if(err) return console.log(err);
//             ctx.pictures = res.body;
//             next();
//         })
// }

// function loadPictures(ctx, next) {
//     fetch('/api/pictures')
//         .then(function (res) {
//             return res.json();
//         })
//         .then(function (pictures) {
//             ctx.pictures = pictures;
//             next();
//         })
//         .catch(function (err) {
//             console.error(err);
//
//         })
// }

async function asyncLoad(ctx, next){
    try{
        ctx.pictures  = await fetch('/api/pictures').then(res => res.json());
        next();
    }catch (err){
        return console.log(err);
    }
}