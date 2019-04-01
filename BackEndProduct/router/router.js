var express = require('express');
var router = express.Router();

const product = require('../model/product');

const user = require('../model/user');

router.get('/', (req, res) => {
    res.send('Router Path..');
});



router.post('/product', (req, res, next) => {
    const newproduct = new product({
        prdname: req.body.prdname,
        prdqty: req.body.prdqty,
        prdbought: req.body.prdbought
    });

    newproduct.save((err, product) => {
        if (err)
            res.json(err);
        else
            res.json({ msg: 'Inserted..' });
    });
});

router.post('/user', (req, res, next) => {
    const newuser = new user({
        id: req.body.id,
        email: req.body.email,
        password: req.body.password
    });

    newuser.save((err, product) => {
        if (err)
            res.json(err);
        else
            res.json({ msg: 'Inserted..' });
    });
});

router.get('/product', (req, res, next) => {

    product.find((err, data) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(data);
    });
});

router.get('/user', (req, res, next) => {

    user.find((err, data) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send(data);
    });
});

router.delete('/product/:name', (req, res, next) => {

    var namereq = req.params.name.toString();
    product.deleteMany({ prdname: namereq }, (err, data) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send('Deleted..');
    });
});

router.delete('/user/:email', (req, res, next) => {

    var emailreq = req.params.email.toString();
    user.deleteMany({ email: emailreq }, (err, data) => {
        if (err)
            res.status(500).send(err);
        else
            res.status(200).send('Deleted..');
    });
});

router.put('/product/:name', (req, res, next) => {

    var namereq = req.params.name.toString();
    product.update({ prdname: namereq }, { prdname: req.body.prdname, prdqty: req.body.prdqty, prdbought: req.body.prdbought }, function (err, data) {
        if (err) {
            res.json({
                error: err
            })
        }
        res.json({
            message: "Updated.."
        })
    })
});

module.exports = router;

