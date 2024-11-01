import mongoose, {Schema } from "mongoose";

interface Iemployee {
    fullName: "",
    emailAddress: "",
    Resumptiondate: "",
    JobRole: "",
    Address: "",
    DOB: "",
    Gender: "",
    Nationality: "",
    phoneNo:"",
    employmentType: "",
    emergencyContact: ""
    Relationship: ""
    emergencyContactPhone: "",


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
    },
    DOB: {
        required: true,
        type: String
    },
    Gender: {
        required: true,
        type: String
    },
    Nationality: {
        required: true,
        type: String
    },
    phoneNo: {
        required: true,
        type: String
    },
    employmentType: {
        required: true,
        type: String
    },
    emergencyContact: {
        required: true,
        type: String
    },
    emergencyContactPhone: {
        required: true,
        type: String
    },
    Relationship: {
        required: true,
        type: String
    }
},

{timestamps: true}
)


const employeeModel = mongoose.model("employee", employeeSchema)
export default employeeModel