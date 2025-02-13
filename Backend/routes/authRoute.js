import express from 'express';
import { registerController} from '../controllers/registerController.js'
import { loginController,testController } from '../controllers/login Controller.js';
import { userMe } from '../controllers/userme.js';
const router=express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.get('/me', userMe)

export default router