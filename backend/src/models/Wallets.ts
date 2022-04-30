import { Schema, model } from 'mongoose';

interface Wallet {
    name: string;
    img: string;
    walletID: string;
    createdAt: number;
}

const walletSchema = new Schema<Wallet>({
    name: { type: String, required: true },
    img: { type: String },
    walletID: { type: String, unique: true, required: true },
    createdAt: { type: Number, default: Date.now() },
});

const WalletModel = model<Wallet>('wallets', walletSchema);

export default WalletModel;