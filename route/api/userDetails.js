const express = require('express');

// Schedule Model
const UserDetails = require('../../models/userDetails');

const router = express.Router();

/**
 * @route   GET api/user/getAll
 * @desc    Get details of all users
 * @access  Public
 */

router.get('/getAll', async (req, res) => {
  try {
    const users = await UserDetails.find();
    if (!users) throw Error('No User Available.');

    res.status(200).json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   GET api/user/:id
 * @desc    Get user by id
 * @access  Public
 */

 router.get('/:id', async (req, res) => {
    try {
      const user = await UserDetails.findOne({id: req.params.id});
      if (!user) throw Error('No such user exists.');
      res.status(200).json(user);
    } catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
  });

/**
 * @route   POST api/user
 * @desc    Create a new user
 * @access  Private
 */

router.post('/', async (req, res) => {
  const newUser = new UserDetails({
    id: req.body.id ||  "",
    name: req.body.name || "",
    Image: req.body.Image || ""
  });

  try {
    const user = await newUser.save();
    if (!user) throw Error('Something went wrong while adding new user.');

    res.status(200).json(user);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   DELETE api/user/:id
 * @desc    Delete a user
 * @access  Private
 */

router.delete('/:id', async (req, res) => {
  try {
    const user = await UserDetails.findOne({id: req.params.id});
    if (!user) throw Error('No such user exists.');

    const removed = await user.deleteOne();
    if (!removed)
      throw Error('Something went wrong while deleting the user.');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

/**
 * @route   PUT api/user/:id
 * @desc    Update a user
 * @access  Private
 */

 router.put('/:id', async (req, res) => {
    const updatedUser = {
        "id": req.body.id ||  "",
        "name": req.body.name || "",
        "Image": req.body.Image || "",
        "address": req.body.address || ""
    };
    try {
      const user = await UserDetails.findOne({id: req.params.id});
      if (!user) throw Error('No such user exists.');
  
        await UserDetails.updateOne({id: req.params.id}, updatedUser, function(err) {
            if(err) {
                throw Error('Something went wrong while updating the user details.');
            }
        });
        res.status(200).json({ success: true, message: "Successfully updated user to DB", "user": updatedUser });
    } catch (e) {
      res.status(400).json({ msg: e.message, success: false });
    }
  });

module.exports = router;