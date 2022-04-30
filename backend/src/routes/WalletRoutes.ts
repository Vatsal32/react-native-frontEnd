import express from 'express';
import * as WalletController from '../controllers/WalletController';
import dotenv from 'dotenv';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({storage});

dotenv.config();

const router = express.Router();

router.get('/', WalletController.getAll);

router.post('/add', upload.single('file'), WalletController.addWallet);

router.post('/one', WalletController.getOne);

export { router };
