const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.post('/api/login', (req,res) => {
	// auth user
	const userId = { id: 1};
	const token = jwt.sign({ user }, 'mysecretkey');
	res.json({
		token
	})
})


app.get('/api/protected', (req, res) => {
	jwt.verify(req.token, 'mysecretkey', (err, data) => {
		if(err)  {
			res.sendStatus(403);
		} else {
			res.json({text:'this is protected', data});
		}
	})
})

function ensureToken(req, res, next) {
	const bearrerHeader = req.headers("authorization");
	if(typeof bearrerHeader !== undefined) {
		const bearer = bearrerHeader.split(' ');
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} else {
		res.status(403)
	}
}
