const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const URLSchema = new Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('URL', URLSchema);

