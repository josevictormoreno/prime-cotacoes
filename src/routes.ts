import express from 'express'
import controller from './controller'

const router = express.Router()
// router.get('/info', controller.getInfo)
router.get('/test', controller.getCoffeTv)

export = router