import page from 'page'
import header from '../header'
import title from 'title';
import empty from 'empty-element';
import template from './template';

page('/:username', header, loadUser, function (ctx, next) {
    title(`Platzigram - ${ctx.params.username}`);
    var main = document.getElementById('main-container');
    empty(main).appendChild(template(ctx.user));
});

async function loadUser(ctx, next) {
    try {
        ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json());
        next();
    }
    catch(err){
        console.log(err);
    }
}