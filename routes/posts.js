const express = require('express');
const knex = require('../db/client');
const router = express.Router();

router.get('/', (req, res) => {
    knex('posts')
    .orderBy('created_at', 'desc')
    .then(posts => {
        res.render('posts/index', {posts: posts})
    });
});

router.get('/new', (req, res) => {
    res.render('posts/new', {posts: false})
})

router.post('/', (req, res) => {
    knex('posts')
    .insert({
        image_url: req.body.image_url,
        content: req.body.content
    })
    .returning('*')
    .then(posts => {
        const post = posts[0];
        res.redirect(`/posts/${post.id}`)
    })
})

module.exports = router;