#!/usr/bin/env node

var express = require("express")
var bodyParser = require("body-parser")
var app = express()

app.use(bodyParser.urlencoded({extended:true}))

// use bodyParser-json
app.use(bodyParser.json())

//use bodyParser-text
app.use(bodyParser.text({type:"txt"}))

// you http reques path
app.post('/boqiu_pc', function(req, res) {
	var token = '0396C9A6FC9FCF38749F0C4735ABC931604';
	if (req.headers['x-gitlab-token'] === token) {
  		console.log('all good');
	} else {
	  	console.log('not good');
		console.log(req.headers);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Signature err!');
		return ;
	}
	//console.log(req.body)
	const { exec } = require('child_process');
	var command = 'cd /data/htdocs/deploy_boqiu_pc/ && git pull';
	exec(command, (err, stdout, stderr) => {
  	    if (err) {
  	    	console.log(`stderr: ${stderr}`);
            	res.statusCode = 500;
            	res.setHeader('Content-Type', 'text/plain');
            	res.end('Deploy  Failed!');
    	    	return;
 	    }
  	    console.log(`stdout: ${stdout}`);
	    res.statusCode = 200;
  	    res.setHeader('Content-Type', 'text/plain');
  	    res.end('Deploy OK!');
	});
});

app.post('/boqiu_wap', function(req, res) {
	var token = '6F33076B712CD322075DC34E2B17A5C2999E7';
	if (req.headers['x-gitlab-token'] === token) {
		console.log('all good');
	} else {
		console.log('not good');
		console.log(req.headers);
		res.statusCode = 500;
		res.setHeader('Content-Type', 'text/plain');
		res.end('Signature err!');
		return ;
	}
	//console.log(req.body)
	const { exec } = require('child_process');
	var command = 'cd /data/htdocs/deploy_boqiu_wap/ && git pull';
	exec(command, (err, stdout, stderr) => {
		if (err) {
			console.log(`stderr: ${stderr}`);
			res.statusCode = 500;
			res.setHeader('Content-Type', 'text/plain');
			res.end('Deploy  Failed!');
			return;
		}
		console.log(`stdout: ${stdout}`);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/plain');
		res.end('Deploy OK!');
	});
});


var server = app.listen(3030, function(){
	console.log("App listening at 3030...")
});
