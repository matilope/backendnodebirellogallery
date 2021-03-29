var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PortadaSchema = Schema({
    titulo: String,
    image0: String,
    image0url: String,
    date: { type: Date, default: Date.now }

});

module.exports = mongoose.model("Portada", PortadaSchema);
