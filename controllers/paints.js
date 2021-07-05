var validator = require('validator');

var Pintura = require('../models/paints');

var cloudinary = require("cloudinary").v2;

cloudinary.config({ cloud_name: '******', api_key: '*********', api_secret: '*******************' });


var controller = {

    save: (req, res) => {
        // recoger parametros por post
        var params = req.body;
        try {
            var validate_titulo = !validator.isEmpty(params.titulo);
            var validate_descripcion = !validator.isEmpty(params.descripcion);
            var validate_dimension = !validator.isEmpty(params.dimension);
            var validate_characteristics = !validator.isEmpty(params.characteristics);
            var validate_link = !validator.isEmpty(params.link);

        } catch (err) {
            return res.status(200).send({
                status: "Error",
                message: "Faltan datos por enviar"
            });
        }
        if (validate_titulo && validate_descripcion && validate_dimension && validate_characteristics && validate_link) {
            var paints = new Pintura();
            paints.titulo = params.titulo;
            paints.subtitulo = params.subtitulo;
            paints.descripcion = params.descripcion;
            paints.descripcion2 = params.descripcion2;
            paints.descripcion3 = params.descripcion3;
            paints.descripcion4 = params.descripcion4;
            paints.descripcion5 = params.descripcion5;
            paints.dimension = params.dimension;
            paints.characteristics = params.characteristics;
            paints.link = params.link;
            paints.link2 = params.link2;

            if (params.image0) {
                paints.image0 = params.image0;
            } else {
                paints.image0 = null;
            }

            paints.image0url = params.image0url;

            if (params.image1) {
                paints.image1 = params.image1;
            } else {
                paints.image1 = null;
            }

            paints.image1url = params.image1url;

            if (params.image2) {
                paints.image2 = params.image2;
            } else {
                paints.image2 = null;
            }

            paints.image2url = params.image2url;

            if (params.image3) {
                paints.image3 = params.image3;
            } else {
                paints.image3 = null;
            }

            paints.image3url = params.image3url;

            if (params.image4) {
                paints.image4 = params.image4;
            } else {
                paints.image4 = null;
            }

            paints.image4url = params.image4url;

            if (params.image5) {
                paints.image5 = params.image5;
            } else {
                paints.image5 = null;
            }

            paints.image5url = params.image5url;


            paints.save((err, paintStored) => {
                if (err || !paintStored) {
                    return res.status(404).send({
                        status: "Error",
                        message: "No se ha guardado"
                    });
                }


                return res.status(200).send({
                    status: "Success",
                    paints: paintStored
                });
            });

        } else {

            return res.status(200).send({
                status: "Error",
                message: "Los datos no son validos"
            });
        }
    },

    getPinturas: (req, res) => {

        var query = Pintura.find({});

        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(30);
        }

        // Find
        query.sort("-_id").exec((err, paints) => {

            if (err) {
                return res.status(500).send({
                    status: "Error",
                    message: "Error al devolver las pinturas"
                });
            }

            if (!paints) {
                return res.status(404).send({
                    status: "Error",
                    message: "No hay pinturas para mostrar"
                });
            }

            return res.status(200).send({
                status: "Success",
                paints
            });

        });
    },

    getPintura: (req, res) => {

        var pinturaId = req.params.id;

        if (!pinturaId || pinturaId == null) {
            return res.status(404).send({
                status: "Error",
                message: "No existe la pintura"
            });
        }

        Pintura.findById(pinturaId, (err, paints) => {
            if (err || !paints) {
                return res.status(404).send({
                    status: "Error",
                    Message: "No existe la pintura"
                });
            }
            return res.status(200).send({
                status: "Success",
                paints
            });
        });
    },

    update: (req, res) => {
        var pinturaId = req.params.id;
        var params = req.body;

        try {
            var validate_titulo = !validator.isEmpty(params.titulo);
            var validate_descripcion = !validator.isEmpty(params.descripcion);
            var validate_dimension = !validator.isEmpty(params.dimension);
            var validate_characteristics = !validator.isEmpty(params.characteristics);
            var validate_link = !validator.isEmpty(params.link);

        } catch (err) {
            return res.status(200).send({
                status: "Error",
                Message: "Faltan datos por enviar"
            });
        }

        if (validate_titulo && validate_descripcion && validate_dimension && validate_characteristics && validate_link) {
            Pintura.findOneAndUpdate({ _id: pinturaId }, params, { new: true }, (err, pinturaUpdate) => {
                if (err) {
                    return res.status(500).send({
                        status: "Error",
                        Message: "Error al actualizar"
                    })
                }
                if (!pinturaUpdate) {
                    return res.status(404).send({
                        status: "Error",
                        Message: "No existe la pintura"
                    })
                }
                return res.status(200).send({
                    status: "Success",
                    paints: pinturaUpdate
                });
            });

        } else {
            return res.status(200).send({
                status: "Error",
                Message: "La validacion no es correcta"
            });
        }
    },

    delete: (req, res) => {

        var pinturaId = req.params.id;

        Pintura.findOneAndDelete({ _id: pinturaId }, (err, pinturaRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: "Error",
                    message: "Error al borrar"
                });
            }

            if (!pinturaRemoved) {
                return res.status(404).send({
                    status: "Error",
                    message: "No se ha borrado la pintura, posiblemente no exista"
                });
            }

            return res.status(200).send({
                status: "Success",
                paints: pinturaRemoved
            });

        });
    },

    create: async (req, res) => {

        var pinturaId = req.params.id;

        var imageloop = [];

        if (req.files) {
            // loops over req.files
            Object.keys(req.files).map(key => {
                // check if the key name includes the substring "file"
                if (req.files[key] !== undefined && key.includes('file')) {
                    imageloop.push(req.files[key]);
                }
            });
        }

        var array = [];

        for (let i = 0; i < imageloop.length; i++) {
            await cloudinary.uploader.upload(imageloop[i].path, (err, result) => {
                array.push(result);
            });
        }

        if (pinturaId) {
            // you forgot the "await" here
            await Pintura.findOneAndUpdate({ _id: pinturaId }, { new: true }, (err, paintUpdated) => {

                if (err || !paintUpdated) {
                    return res.status(200).send({
                        status: "Error",
                        message: "Error al guardar la imagen"
                    });
                }

                return res.status(200).send({
                    status: "Success",
                    paints: paintUpdated
                });

            });
        } else {
            const obj = {
                status: 'Success',
            }
            array.map((_n, index) => {
                obj[`image${index}`] = `${array[index].public_id}.${array[index].format}`
                obj[`image${index}url`] = array[index].secure_url
            })
            return res.status(200).send(obj);
        }
    }

}

module.exports = controller;
