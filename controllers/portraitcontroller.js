var Portrait = require('../models/portrait');
var cloudinary = require("cloudinary").v2;

cloudinary.config({ cloud_name: '******', api_key: '************', api_secret: '*****************' });


var Header = {

    getPortraits: (req, res) => {

        var query = Portrait.find({});

        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(10);
        }

        // Find
        query.sort("-_id").exec((err, portrait) => {

            if (err) {
                return res.status(500).send({
                    status: "Error",
                    message: "Error al devolver las pinturas"
                });
            }

            if (!portrait) {
                return res.status(404).send({
                    status: "Error",
                    message: "No hay pinturas para mostrar"
                });
            }

            return res.status(200).send({
                status: "Success",
                portrait
            });

        });
    },

    getPortrait: (req, res) => {

        var portraitId = req.params.id;

        if (!portraitId || portraitId == null) {
            return res.status(404).send({
                status: "Error",
                message: "No existe la portada"
            });
        }

        Portrait.findById(portraitId, (err, portrait) => {
            if (err || !portrait) {
                return res.status(404).send({
                    status: "Error",
                    Message: "No existe la portada"
                });
            }
            return res.status(200).send({
                status: "Success",
                portrait
            });
        });
    },

    updatePortrait: (req, res) => {

        var portraitId = req.params.id;
        var params = req.body;
      
         Portrait.findOneAndUpdate({ _id: portraitId }, params, { new: true }, (err, portraitUpdate) => {
                if (err) {
                    return res.status(500).send({
                        status: "Error",
                        Message: "Error al actualizar"
                    })
                }
                if (!portraitUpdate) {
                    return res.status(404).send({
                        status: "Error",
                        Message: "No existe el header"
                    })
                }
                return res.status(200).send({
                    status: "Success",
                    portrait: portraitUpdate
                });
            });
    },

    uploadPortrait: async (req, res) => {

        var portraitId = req.params.id;

        var array = [];

            await cloudinary.uploader.upload(req.files.file0.path, (err, result) => {
                array.push(result);
            });

        if (portraitId) {
            // you forgot the "await" here
            await Portrait.findOneAndUpdate({ _id: portraitId }, { new: true }, (err, portraitUpdated) => {

                if (err || !portraitUpdated) {
                    return res.status(200).send({
                        status: "Error",
                        message: "Error al guardar la portada"
                    });
                }

                return res.status(200).send({
                    status: "Success",
                    portrait: portraitUpdated
                });

            });
        } else {
            const obj = {
                status: 'Success',
                titulo: 'Header image',
            }
            array.map((_n, index) => {
                obj[`image${index}`] = `${array[index].public_id}.${array[index].format}`
                obj[`image${index}url`] = array[index].secure_url
            })
            return res.status(200).send(obj);
        }
    }
}

module.exports = Header;
