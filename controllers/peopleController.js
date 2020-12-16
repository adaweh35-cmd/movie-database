const express = require('express');

const Person = require('./../models/personModel');

exports.getPersonById = async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      person,
    },
  });
};
exports.getPersons = async (req, res) => {
  // 1) Building Query
  const queryObj = { ...req.query };
  const includedFields = ['Name', 'Role', 'MovieName', 'MovieId'];
  const keyArray = Object.keys(queryObj);
  keyArray.forEach((el) => {
    if (!includedFields.includes(el)) {
      delete queryObj[el];
    }
  });
  // 2) Searching Database for query
  
  const persons = await Person.find(queryObj);

  // 3) Send search result to client
  res.status(200).json({
    status: 'success',
    data: persons,
  });
};
