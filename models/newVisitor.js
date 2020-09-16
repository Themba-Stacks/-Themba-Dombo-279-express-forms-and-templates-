const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const newVisitorSchema = new Schema({
    name: String,
    assistedBy: String,
    age: String,
    dateOfVisit: {
        type: String,
        default: Date.now()
    },
    timeOfVisit: String,
    comments: String
})

const newVisitor = mongoose.model('newVisitor', newVisitorSchema);

module.exports = newVisitor;