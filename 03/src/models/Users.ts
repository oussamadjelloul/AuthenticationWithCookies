import mongoose from "mongoose";
import { Schema } from "mongoose";
import { Model } from "mongoose";


const UserSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    authentification: {
        password: {
            type: String,
            required: true,
            minlength: 3,
            select: false
        },
        salt: {
            type: String,
            select: false,
        },
        sessionToken: {
            type: String,
            select: false
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});


export const UserModel: Model<any> = mongoose.model('User', UserSchema);





