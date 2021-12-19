const express = require('express')
const entryRouter = express.Router()
const Entry = require('../models/entry.js')

// Get All //
entryRouter.get('/', (req, res, next) => {
    Entry.find((err, entries) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(entries)
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

// Post One //
entryRouter.post('/', (req, res, next) => {
    const newEntry = new Entry(req.body)
    newEntry.save((err, savedEntry) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedEntry)
    })
})

// Delete One //
entryRouter.delete('/:entryId', (req, res, next) => {
    Entry.findOneAndDelete({ _id: req.params.entryId }, (err, deletedItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(`Successfully deleted entry '${deletedItem.date}' from the database`)
    })
})

// Put One //
entryRouter.put('/:entryId', (req, res, next) => {
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