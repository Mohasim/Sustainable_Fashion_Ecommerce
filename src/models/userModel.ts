import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export { userModel};

function userModel() {
    const UserSchema = new Schema({
        firstName:{type:String,},
        lastName:{type:String,},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        phone:{type:String,},
        address:{type:String,},
        Admin:{type:Boolean ,default:false}, 
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    UserSchema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.User || mongoose.model('User', UserSchema);
}