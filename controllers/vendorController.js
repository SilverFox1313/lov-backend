const Vendor = require('../models/vendorModel')
const mongoose = require('mongoose')

// get all vendors
const getVendors = async (req, res) => {
  const vendors = await Vendor.find({}).sort({name: 1})

  res.status(200).json(vendors)
}

// get a single vendor
const getVendor = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such vendor'})
  }

  const vendor = await Vendor.findById(id)

  if (!vendor) {
    return res.status(404).json({error: 'No such vendor'})
  }

  res.status(200).json(vendor)
}

// create a new vendor
const createVendor = async (req, res) => {
  const {name, info, charge, document, confirmation} = req.body

  let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Name is required', emptyFields })
  }

  // add to the database
  try {
    const vendor = await Vendor.create({ name, info, charge, document, confirmation })
    res.status(200).json(vendor)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a vendor
const deleteVendor = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such vendor'})
  }

  const vendor = await Vendor.findOneAndDelete({_id: id})

  if(!vendor) {
    return res.status(400).json({error: 'No such vendor'})
  }

  res.status(200).json(vendor)
}

// update a vendor
const updateVendor = async (req, res) => {
  const { id } = req.params
  const { name } = req.body

  let emptyFields = []

  if (!name) {
    emptyFields.push('name')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Name is required', emptyFields })
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such vendor'})
  }

  const vendor = await Vendor.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!vendor) {
    return res.status(400).json({error: 'No such vendor'})
  }

  res.status(200).json(vendor)
}

module.exports = {
  getVendors,
  getVendor,
  createVendor,
  deleteVendor,
  updateVendor
}