import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import {router as WalletRoutes} from "./routes/WalletRoutes";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (_req, _res) => {
    _res.send({data: "Hello World!!"});
});

mongoose.connect(process.env.MONGODB_URI || "").then(() => {
    console.log("Connection to database successful.");
}).catch(console.log);

app.use('/api/wallets/', WalletRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`🚀 Server running at port: ${PORT}`);
});