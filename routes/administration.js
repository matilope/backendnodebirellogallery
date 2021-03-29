var express = require("express");
var AdminController = require("../controllers/admincontroller");
var router = express.Router();
var User = require('../models/admin');
const jwt = require('jsonwebtoken');

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

// Rutas para usuarios
router.get("/admin/users/:last?", verifyToken, AdminController.getUsers);
router.delete("/admin/user/:id", verifyToken, AdminController.deleteUser);

module.exports = router;