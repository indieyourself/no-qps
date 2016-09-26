'use strict'

const express = require('express');
const qps = require('no-qps');

const port = 8087;
const app = express();

const MongoClient = require('mongodb').MongoClient;
var mongoDB = null;

MongoClient.connect("mongodb://192.168.10.90:27017/blue_cat", function(err, db) {
	if ( err !== null ) {
		console.log("mongodb connection error");
		process.exit(-1);
	}

	console.log("mongodb connect success");
	mongoDB = db;
});

const REQUEST_NUM = 10000;
var QPS = new qps(REQUEST_NUM);

function writeToMongoDB( data ) {
	/*
		start the qps
	*/
	QPS.start();

	var data = JSON.parse(data);
	data["serverTime"] = Math.floor(Date.now()/1000);

	mongoDB.collection('user_log').insertOne(
			data,
			function(err, result) {
				/*
					count the qps
				*/
				QPS.count();
			}
		);
}

app.post("/bc/mongo", function (req, res) {
	req.setEncoding('utf-8');
	req.rawBody = "";
	req.on('data', function(chunk) {
		req.rawBody += chunk;
	});
	req.on('end', function() {
		writeToMongoDB( req.rawBody );
		res.json( {"status":true} );
	});
});


app.listen(port);
console.log(`service start, bind port: ${port}`);
