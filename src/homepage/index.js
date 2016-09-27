var page = require('page');
var template = require('./template');
var empty = require('empty-element');
var title = require('title');
//var request = require('superagent');
var request = require('axios');
var header = require('../header');
var Webcam = require('webcamjs');
var picture = require('../picture-card');

page('/', header, loading, asyncLoad, function (ctx, next) {
    title('Platzigram');
    var main = document.getElementById('main-container');

    empty(main).appendChild(template(ctx.pictures));
    const  picturePreview = $('#picturePreview');
    const  cameraInput = $('#cameraInput');
    const  cancelPicture = $('#cancelPicture');
    const  shootButton = $('#shoot');
    const  uploadButton = $('#uploadButton');


    function reset() {
        picturePreview.addClass('hide');
        cancelPicture.addClass('hide');
        uploadButton.addClass('hide');
        shootButton.removeClass('hide');
        cameraInput.removeClass('hide');
    }

    cancelPicture.click(reset);

    $('.modal-trigger').leanModal({
        ready: function () {
            Webcam.attach('#cameraInput');
            shootButton.click((ev)=>{
                Webcam.snap((data_uri) =>{
                    picturePreview.html(`<img src="${data_uri}" />`);
                    picturePreview.removeClass('hide');
                    cancelPicture.removeClass('hide');
                    uploadButton.removeClass('hide');
                    shootButton.addClass('hide');
                    cameraInput.addClass('hide');
                    uploadButton.off('click');
                    uploadButton.click(()=> {
                        const pic = {
                            url: data_uri,
                            likes: 0,
                            liked: false,
                            createAt: +new Date(),
                            user: {
                                username: 'jcvaldes',
                                avatar: 'https://avatars0.githubusercontent.com/u/2944428?v=3&s=460https://avatars0.githubusercontent.com/u/2944428?v=3&s=460'
                            }
                        }
                        $('#pictureCards').prepend(picture(pic));

                        this.complete();

                        $('#modalCamera').closeModal();
                    })
                })
            })
        },
        complete: function () {
            Webcam.reset();
            reset();
        }
    })
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