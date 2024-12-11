const mongoose = require('mongoose')

let cmsSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

module.exports = mongoose.model('cms', cmsSchema)
