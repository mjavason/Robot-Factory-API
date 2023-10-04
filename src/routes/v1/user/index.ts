import express from 'express';
const router = express.Router();
import robotRouter from './robot.route';
import isAuth from '../../../middleware/is_auth.middleware';

router.use(isAuth);
router.use('/robot', robotRouter);

export default router;
