const express = require('express');
const { v4: uuid4 } = require('uuid');
const { user, Domain, User } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: (req.user && req.user.id) || null },
      include: { model: Domain },
    });
    res.render('login', {
      user,
      domains: user && user.Domains,
    });
  } catch (err) {
    console.error('index router / err :', err);
    next(err);
  }
});

router.post('/domain', isLoggedIn, async (req, res, next) => {
  try {
    await Domain.create({
      UserId: req.user.id,
      host: req.body.host,
      type: req.body.type,
      clientSecret: uuid4(),
    });
    res.redirect('/');
  } catch (err) {
    console.error('index router /domain err :', err);
    next(err);
  }
});

module.exports = router;
