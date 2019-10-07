var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Term = mongoose.model('Term');

/* GET terms page. */
router.get('/terms', async (req, res, next) => {
  try {
    var terms = await Term.find({});

    res.json({ terms });
  }
  catch (err) {
    next(err);
  }
});

router.post('/terms', async (req, res, next) => {
  try {
    var term = await new Term({ ...req.body, approved: false }).save();

    res.json({ term });
  }
  catch(err) {
    next(err);
  }
});

module.exports = router;
