var express = require("express");
var PortraitController = require("../controllers/portraitcontroller");
var router = express.Router();
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart();
const jwt = require('jsonwebtoken');

let verifyToken = function verifyToken(req, res, next) {
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

router.get("/portraits/:last?", PortraitController.getPortraits);
router.get("/portrait/:id", PortraitController.getPortrait);
router.put("/portrait/:id", verifyToken, PortraitController.updatePortrait);
router.post("/portrait/upload", verifyToken, multipartMiddleware, PortraitController.uploadPortrait);


module.exports = router;