// Not yet created
const express = require('express');

const User = require('./../models/userModel');

exports.pushFollowedPerson = async (req, res) => {
  const user_two  = await User.findById(req.body.userId);
  if (!user_two.followedPeople.includes(req.body.personName)) {
    const user = await User.findOneAndUpdate(
      {
        id: req.body.userid
      }, 
      {
        $push: {
          followedPeople: req.body.personName,
      },
    });
  }
 
  // console.log(user);



  
  res.status(200).json({
    data: user.followedPeople
  });
}

exports.removeFollowedPerson = async (req, res) => {
  const user = await User.findOneAndUpdate(
    {
      id: req.body.userid
    }, 
    {
      $pull: {
        followedPeople: req.body.personName,
    },
  });
  // console.log("in delete person");
  res.status(200).json({
    data: user.followedPeople
  });
}

