var express = require('express');
var multer = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        //cb(null, file.fieldname + '-' + Date.now())
        cb(null, +Date.now() + '.' + ext(file.originalname));
    }
})

var upload = multer({ storage: storage }).single('picture'); //picture es el pàrametro

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

// function restrict(req, res, next) {
//     if(req.user) return next();
//     res.redirect('/signin');
// }

//2do param restrict
app.get('/', function(req, res) {
    res.render('index', {title: 'Platzigram'});
});

app.get('/signup', function(req, res) {
    res.render('index', {title: 'Platzigram - Signup'});
});

app.get('/signin', function(req, res) {
    res.render('index', {title: 'Platzigram - Signin'});
});

app.get('/api/pictures', function(req, res, next) {
    var pictures = [
        {
            user: {
                username: 'jcvaldes',
                avatar: 'https://avatars0.githubusercontent.com/u/2944428?v=3&s=460https://avatars0.githubusercontent.com/u/2944428?v=3&s=460'
            },
            url: 'https://avatars0.githubusercontent.com/u/2944428?v=3&s=460https://avatars0.githubusercontent.com/u/2944428?v=3&s=460',
            likes: 0,
            liked: false,
            createdAt: new Date().getTime()
        },
        {
            user: {
                username: 'jcvaldes',
                avatar: 'https://avatars0.githubusercontent.com/u/2944428?v=3&s=460https://avatars0.githubusercontent.com/u/2944428?v=3&s=460'
            },
            url: 'https://avatars0.githubusercontent.com/u/2944428?v=3&s=460https://avatars0.githubusercontent.com/u/2944428?v=3&s=460',
            likes: 1,
            liked: true,
            createdAt: new Date().setDate(new Date().getDate() - 10)
        }
    ];

    setTimeout(() => res.send(pictures), 2000);


});

app.post('/api/pictures', function (req, res) {
    upload(req, res, function (err) {
        if(err) {
            return res.send(500, "Error uploading file");
        }
        return res.send("File uploaded successfully");
    })
});

app.get('/api/user/:username', function(req, res) {
   const user = {
       username: 'jcvaldes',
       avatar: 'https://avatars1.githubusercontent.com/u/2944428?v=3&s=466',
       pictures: [
           {
               id: 1,
               src: 'http://k42.kn3.net/taringa/3/4/7/2/3/2/7/djheistechs/457.jpg?7101',
               likes: 3,
           },
           {
               id: 2,
               src: 'http://media-cdn.incondicionales.com.mx/media/galeria/325/7/8/7/3/n_chivas_guadalajara_la_aficion-3093787.jpg',
               likes: 13,
           },
           {
               id: 3,
               src: 'http://k42.kn3.net/taringa/3/4/7/2/3/2/7/djheistechs/457.jpg?7101',
               likes: 0,
           },
           {
               id: 4,
               src: 'http://k42.kn3.net/taringa/3/4/7/2/3/2/7/djheistechs/457.jpg?7101',
               likes: 53,
           },
           {
               id: 5,
               src: 'http://3.bp.blogspot.com/-tCueNnvcZV0/VhLWaZBBzHI/AAAAAAAABFE/PI60P7H96zU/s1600/emo_adictamente.blogspot%2B%252818%2529.jpg',
               likes: 53,
           },
           {
               id: 6,
               src: 'http://k42.kn3.net/taringa/3/4/7/2/3/2/7/djheistechs/457.jpg?7101',
               likes: 53,
           },
       ]
   }
   res.send(user);
})

//Se define a lo ultimo
app.get('/:username', function(req, res) {
    res.render('index', {title: `Platzigram - ${req.params.username}`});
})

app.get('/:username/:id', function(req, res) {
    res.render('index', {title: `Platzigram - ${req.params.username}`});
})
app.listen(3000, function(err){
   if(err){
       return console.log('Hubo un error');
       process.exit(1);
   }
    console.log('Platzigram escuchando en el puerto 3000');

});