const router = require('express').Router();

const rethinkDB = require('../lib');

router.get('/authors',(req,res) => {
    rethinkDB.find('authors')
        .then(authors => {
            res.json(authors);
        })
        .catch(error => {
            res.status(500).json({
                error: error.message
            })
        })
})

router.post('/authors',async (req,res) => {
    const { name, tv_show, posts } = req.body;

    try {
        let response = await rethinkDB.create('authors',{
            name,
            tv_show,
            posts
        });
        res.status(201).json(response);
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
})

module.exports = router;