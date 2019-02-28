var express = require('express');
var router = express.Router();
var userCtrl = require('../controllers/user')

/* GET users listing. */
router.get('/collection', userCtrl.show)
router.delete('/collection/:id/', userCtrl.deleteFromCollection)


module.exports = router;
