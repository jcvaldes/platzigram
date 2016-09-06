var page = require('page');
var template = require('./template');
var empty = require('empty-element');
var title = require('title');

page('/', function (ctx, next) {
    title('Platzigram');
    var main = document.getElementById('main-container');
    var pictures = [
        {
            user: {
                username: 'jcvaldes',
                avatar: 'https://avatars0.githubusercontent.com/u/2944428?v=3&s=460https://avatars0.githubusercontent.com/u/2944428?v=3&s=460'
            },
            url: 'https://avatars0.githubusercontent.com/u/2944428?v=3&s=460https://avatars0.githubusercontent.com/u/2944428?v=3&s=460',
            likes: 10,
            liked: false,
            createdAt: new Date()
        },
        {
            user: {
                username: 'jcvaldes',
                avatar: 'https://avatars0.githubusercontent.com/u/2944428?v=3&s=460https://avatars0.githubusercontent.com/u/2944428?v=3&s=460'
            },
            url: 'https://avatars0.githubusercontent.com/u/2944428?v=3&s=460https://avatars0.githubusercontent.com/u/2944428?v=3&s=460',
            likes: 1024,
            liked: true,
            createdAt: new Date().setDate(new Date().getDate() - 10)
        }
    ]
    empty(main).appendChild(template(pictures));
});
