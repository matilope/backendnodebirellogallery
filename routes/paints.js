var express = require("express");
var PaintsController = require("../controllers/paints");
var router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
const jwt = require('jsonwebtoken');

// Admin section

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized request')
  }
  let token = req.headers.authorization.split(' ')[1]
  if (token === 'null') {
    return res.status(401).send('Unauthorized request')
  }
  let payload = jwt.verify(token, 'secretKey')
  if (!payload) {
    return res.status(401).send('Unauthorized request')
  }
  req.userId = payload.subject
  next()
}

// Rutas para pinturas
router.post("/save", verifyToken, PaintsController.save);
router.get("/paintings/:last?", PaintsController.getPinturas);
router.get("/painting/:id", PaintsController.getPintura);
router.put("/painting/:id", verifyToken, PaintsController.update);
router.delete("/painting/:id", verifyToken, PaintsController.delete);
router.post("/create", verifyToken, multipartMiddleware, PaintsController.create);


module.exports = router;