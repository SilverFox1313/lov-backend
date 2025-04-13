const express = require('express')
const {
  getVendors, 
  getVendor, 
  createVendor, 
  deleteVendor, 
  updateVendor
} = require('../controllers/vendorController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// GET all vendors
router.get('/', getVendors)

// GET a single vendor
router.get('/:id', getVendor)

// POST a new vendor
router.post('/', createVendor)

// DELETE a vendor
router.delete('/:id', deleteVendor)

// UPDATE a vendor
router.patch('/:id', updateVendor)

module.exports = router