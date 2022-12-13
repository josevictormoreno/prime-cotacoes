import express from 'express'
import controller from './controller'

const router = express.Router()
router.get('/coins', controller.getCoin)
router.get('/coffe', controller.getCoffeTv)
router.get('/coffeC', controller.getCoffeCooabriel)

export = router