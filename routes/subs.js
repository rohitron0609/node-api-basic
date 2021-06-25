const express = require('express');
const router = express.Router();
const Sub = require('../models/sub');

//GET ALL
router.get('/', async (req, res) => {
  try {
    const subs = await Sub.find();
    res.json(subs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
//GETTING one
router.get('/:id', getSub, (req, res) => {
  res.json(res.sub);
});
//CREATING one
router.post('/', async (req, res) => {
  const subs = new Sub({
    name: req.body.name,
    subToChannel: req.body.subToChannel,
  });
  try {
    const newSub = await subs.save();
    res.status(201).json(newSub);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});
//Updating one
router.patch('/:id', getSub, async (req, res) => {
  if (req.body.name != null) {
    res.sub.name = req.body.name;
  }
  if (req.body.subToChannel != null) {
    res.sub.subToChannel = req.body.subToChannel;
  }
  try {
    const updatedSub = await res.sub.save();
    res.json(updatedSub);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});
//Deleting one
router.delete('/:id', getSub, async (req, res) => {
  try {
    await res.sub.remove();
    res.json({ msg: 'Deleted Sub' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

async function getSub(req, res, next) {
  let sub;
  try {
    sub = await Sub.findById(req.params.id);
    if (sub == null) {
      return res.status(404).json({ msg: 'Cannot find sub' });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }

  res.sub = sub;
  next();
}

module.exports = router;
