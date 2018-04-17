const username = document.getElementById("username");
const password = document.getElementById("password");
const onSubmit = document.getElementById("onSubmit");

onSubmit.addEventListener("submit", (e) => {
	e.preventDefault();
	fetch('/api/login', {
		method: "POST",
		headers: {
			"Content-type": "application/json",
			"Accept": "application/json, text/plain, */*"
		},
		body: JSON.stringify({id: 1,username:username.value, password:password.value})
	}).then( () => {
		console.log('hi')
	})
});
