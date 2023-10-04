import express from 'express';
import { notificationController } from '../../../controllers';

const router = express.Router();

//subscribe
router.post('/subscribe', notificationController.create);

export default router;
