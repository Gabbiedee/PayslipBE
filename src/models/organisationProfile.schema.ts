import mongoose, {Schema } from "mongoose";

interface IOrganisation {
    companyAddress: string,
    staffStrength: number,

}

const OprofileSchema = new Schema<IOrganisation>({
    companyAddress: {
        type: String,
        required: true
    },
    staffStrength: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
}
)

const CompanyModel = mongoose.model("Company", OprofileSchema)
export default CompanyModel;