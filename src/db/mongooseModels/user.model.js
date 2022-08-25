import mongoose from 'mongoose';

const userCollection = 'user';

export const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: Number, required: true },
    urlAvatarImage: { type: String },
    admin:  { type: Boolean }
});

export const UserModel = mongoose.model(userCollection, userSchema);

