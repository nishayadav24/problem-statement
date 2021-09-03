const mongoose            = require('mongoose');
const Schema              = mongoose.Schema;

const dataSchema = new Schema({
    name: String,
    minimum: Number,
    delFee: Number,
    location: {
        type: {
            type: String,
            enum: ["Point", "Polygon"]
        },
        coordinates: [{ type: Number }], // long, lat
    },
    status: { type: Boolean, default: true }
},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    })

dataSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("problem", dataSchema);