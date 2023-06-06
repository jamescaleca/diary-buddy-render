const express = require('express')
const entryRouter = express.Router()
const Entry = require('../models/entry.js')

entryRouter.route('/')
// Get All //
  .get((req, res, next) => {
    Entry.find({ user: req.user._id }, (err, entries) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(entries)
    })
  })
// Post One //
  .post((req, res, next) => {
    req.body.user = req.user._id
    const newEntry = new Entry(req.body)
    newEntry.save((err, savedEntry) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedEntry)
    })
  })

// Get entries by search term //
entryRouter.get('/search', (req, res, next) => {
  const { entry } = req.query
  const pattern = new RegExp(entry)
  Entry.find(
    { entry: { $regex: pattern, $options: 'i' } }, 
    (err, entries) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(entries)
  })
})

// Get entries by user id //
entryRouter.get('/user', (req, res, next) => {
  Entry.find({ user: req.user._id }, (err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(entries)
  })
})

entryRouter.route('/:entryId')
// Delete One //
  .delete((req, res, next) => {
    Entry.findOneAndDelete({ _id: req.params.entryId }, (err, deletedItem) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully deleted entry '${deletedItem.date}' from the database`)
    })
  })
// Put One //
  .put((req, res, next) => {
    Entry.findOneAndUpdate(
      { _id: req.params.entryId },
      req.body,
      { new: true },
      (err, updatedEntry) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedEntry)
      }
    )
  })

module.exports = entryRouter