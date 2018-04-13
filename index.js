const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

// app.get('/', (req, res) => {
// 	res.json({
// 		hello: 'hello'
// 	})
// });

// This is an example of a non-protected route
// app.post('/api/post', (req, res) => {
// 	res.json({
// 		message: 'Post created'
// 	})
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',express.static(__dirname + '/public'));



app.post('/api/login', (req, res) => {
	// Mock user
	const users = [
		{userName: 'andy', password:'pass'},
		{userName:'flipper', password:'pass'}
	];
	// jwt.sign(userInfo, secretkey, callback)
	jwt.sign(req.body, 'secret_key',{expiresIn: '30s'} ,(err,token) => {
		// console.log({token});
		return res.status(200).json({token}).redirect('/api/login')
	})
});

app.use('/api/post', express.static(__dirname + '/secpublic'),verifyToken, (req, res) => {
	console.log(req.token);
	// The req.token now has the value of the token because of the
	// verifyToken function;
	jwt.verify(req.token, 'secret_key', (err, authData) => {
		if(err) {
			res.sendStatus(403);
		} else {
			res.json({
				message: 'Protected Route',
				authData
			});
		}
	});
});

// Verifies users token
function verifyToken(req, res, next) {
	// Get auth header value
	// Formatted token
	// Authorization: Bearer <access_token>
	const bearerHeader = req.headers['authorization'];
	// Check of bearerHeader is undefined
	if(typeof bearerHeader !== 'undefined') {
		// In here we need to take out the access_token from the bearerHeader
		const bearerToken = bearerHeader.split(' ')[1];
		// Set the token
		req.token = bearerToken;
		// Set the next middleware
		console.log(req.token);
		next();

	} else {
		res.sendStatus(403)
	}
}

app.listen(5000, () => console.log(`Now listening on port 5000`));
