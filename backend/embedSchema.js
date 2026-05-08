import mongoose from "mongoose";
const embedSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    embedding: {
        type: [Number],
        required: true,
    }
})

const Embed = mongoose.model("Embed", embedSchema);

export default Embed;