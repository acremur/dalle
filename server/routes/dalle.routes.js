import express from 'express'
import { createImage, test } from '../controllers/dalle.controllers.js'

const router = express.Router()

router.route('/').get(test).post(createImage)

export default router