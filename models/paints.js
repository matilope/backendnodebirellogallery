var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PinturasSchema = Schema({
    titulo: String,
    subtitulo: String,
    image0: String,
    image0url: String,
    image1: String,
    image1url: String,
    image2: String,
    image2url: String,
    image3: String,
    image3url: String,
    image4: String,
    image4url: String,
    image5: String,
    image5url: String,
    descripcion: String,
    descripcion2: String,
    descripcion3: String,
    descripcion4: String,
    descripcion5: String,
    dimension: String,
    characteristics: String,
    link: String,
    link2: String,
    date: { type: Date, default: Date.now }

});

module.exports = mongoose.model("Pintura", PinturasSchema);
