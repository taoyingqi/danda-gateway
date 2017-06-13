var express = require('express');
var router = express.Router();
var WXBizMsgCrypt = require('wechat-crypto');
var wxoauth = require('wechat-oauth');

router.get('/wxservice', function(req, res, next){
	var msg_signature = req.query.msg_signature;
	var timestamp = req.query.timestamp;
	var nonce = req.query.nonce;
	var echostr = req.query.echostr;
	var cryptor = new WXBizMsgCrypt(config.token, config.encodingAESKey, config.corpId)
	var s = cryptor.decrypt(echostr);
	res.send(s.message);
});


router.get('redirect', function(req, res, next) {

});

module.exports = router;
