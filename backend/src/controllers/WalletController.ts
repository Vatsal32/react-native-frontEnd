import express from 'express';
import WalletModel from "../models/Wallets";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import Data_uri from 'datauri/parser';
import path from 'path';

dotenv.config();

cloudinary.config({ 
    cloud_name: process.env.CLOUDNAME, 
    api_key: process.env.APIKEY, 
    api_secret: process.env.APISECRET,
    secure: true
  });


const checkData = (data: { name: string, walletID: string }) => {
    let errors = {};

    if (data.name === "") {
        errors = {
            ...errors,
            "name": "Cannot be empty",
        };
    }

    if (data.walletID === "") {
        errors = {
            ...errors,
            "walletID": "Cannot be empty",
        }
    }

    return errors;
};

const getAll = async (_req: express.Request, _res: express.Response) => {
    WalletModel.find({}).then((res) => {
        let data = res.map((item) => {
            return ({
                name: item.name,
                img: item.img,
                _id: item._id
            });
        });
        _res.send({message: 'success', data});
    }).catch((er) => {
        console.log(er);
        _res.send({message: er, error: true});
    });
};

const getOne = async (_req: express.Request, _res: express.Response) => {
    if (_req.body._id === '') {
        _res.send({ message: {_id: "Cannot be empty"}, error: true });
    } else {
        WalletModel.find({ _id: _req.body._id }).then(res => {
            _res.send({message: 'success', data: res});
        }).catch((er) => {
            console.log(er.message);
            _res.send({message: er.message, error: true});
        });
    }
};

const addWallet = async (_req: express.Request, _res: express.Response) => {
    let error = checkData({ name: _req.body.name, walletID: _req.body.walletID });
    if (Object.keys(error).length === 0 && _req.file !== undefined) {
        cloudinary.config({
            cloud_name: process.env.CLOUDNAME, 
            api_key: process.env.APIKEY, 
            api_secret: process.env.APISECRET,
            secure: true
        });
        let data_uri_parser = new Data_uri();
        data_uri_parser.format(path.extname(_req.file.originalname).toString(), _req.file.buffer);
        const file = data_uri_parser.content;
        try {
            await cloudinary.uploader.upload(file as string, {
                resource_type: 'image',
                public_id: `${_req.body.walletID}/images/${_req.body.name}`,
                overwrite: true
            }, (err, result: any) => {
                const newWallet = new WalletModel({
                    name: _req.body.name,
                    walletID: _req.body.walletID,
                    img: result.secure_url,
                });
        
                newWallet.save().then((res) => {
                    if (Boolean(res)) {
                        _res.send({message: "success", data: res});
                    } else {
                        _res.send({message: "Something went wrong", error: true});
                    }
        
                }).catch((er) => {
                    console.log(er.message);
                    _res.send({message: er.message, error: true});
                });
            }).catch(console.log);
        } catch (err) {
            console.log(err);
            _res.send({message: err, error: true});
        }
    } else {
        _res.send({ message: error, error: true });
    }
};

export {getAll, addWallet, getOne};
