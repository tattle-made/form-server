const mongoose = require('mongoose');

const RequestAccessSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    creationTime:{
        type: Date,
        default: Date.now
    },
    affiliation:{
        type: String,
    },
    emailAddress:{
        type: String,
        required: true
    },
    source:{
        type: String,
    },
    additionalInfo:{
        type: String,
    },
    subscribeToUpdate:{
        type:Boolean,
        default: false
    }
});

const RequestAccessItem = mongoose.model('request-access', RequestAccessSchema)

module.exports = {
    RequestAccessItem
}