import { timeStamp } from "console";
import mongoose, {Schema } from "mongoose";


interface IUser {
    emailAddress: string;
    organisationName: string;
    password: string;
    Cpassword: string;
  }

const userSchema = new Schema<IUser>({
   emailAddress :{
    type: String,
    Required: true
   },
   organisationName : {
    type: String,
    Required: true
   },
   password : {
    type: String,
    Required: true
   }


},
{
    timestamps : true
})


const UserModel = mongoose.model("User", userSchema)

export default UserModel;