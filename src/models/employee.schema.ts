import mongoose, {Schema } from "mongoose";

interface Iemployee {
    fullName: "",
    emailAddress: "",
    Resumptiondate: "",
    JobRole: "",
    Address: "",

}

const employeeSchema = new Schema<Iemployee>({
    fullName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    Resumptiondate: {
        type: String,
        required: true
    },
    JobRole: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    }
},

{timestamps: true}
)


const employeeModel = mongoose.model("employee", employeeSchema)
export default employeeModel