import mongoose from "mongoose";
import Validator from "validatorjs";

Validator.registerAsync(
    "unique",
    async function (input, attribute, req, passes) {
        const Model = mongoose.model(attribute);

        let data = await Model.findOne({[req]: input});
        if (data) return passes(false, `The ${req} is already taken`);
        else return passes();
    }
    , "The :req is already taken ");

Validator.registerAsync(
    "exists",
    async function (value, attribute, req, passes) {
        const Model = mongoose.model(attribute);

        let data = await Model.findOne({[formatAttribute(req)]: value});
        if (!data) passes(false, `The  ${req} is not available`);
        else passes();
    }, "The :req is not available ");

Validator.register("object_id", function (value) {
    return mongoose.Types.ObjectId.isValid(value as string);
}, "The value is not a valid object id");

function formatAttribute(data: string) {
    if (data.includes("_id")) return "_id";
    else return data;
}

export default Validator;
