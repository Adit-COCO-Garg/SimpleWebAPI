const http = require("http");
const { listenerCount } = require("process");
const port = process.env.PORT || process.env.NODE_PORT || 3000;

const jokes = [
	{"q" : "Why did the chicken cross the road?", "a" : "To get to the other side!"},
	{"q" : "What do you call a very small valentine?","a":"A valen-tiny!"},
	{"q" : "What did the dog say when he rubbed his tail on the sandpaper?","a":"Ruff, Ruff!"},
	{"q" : "Why don't sharks like to eat clowns?","a":"Because they taste funny!"},
	{"q" : "What did the boy cat say to the girl cat?","a":"You're Purr-fect!"},
	{"q" : "What is a frog's favorite outdoor sport?","a":"Fly Fishing!"}
];

const indexPage = `<html>
    <h1>Welcome to Jokes</h1>
    <p>Standard Joke service is here ---> <a href="./stale-joke">stale-joke</a></p>
    <p>Random Joke service is here ---> <a href="./random-joke">random-joke</a></p>
    </html>`;

const getIndex = (request, response) => {
    response.writeHead(200, {"content-Type": "text/html", "Access-Control-Allow-Origin":"*"});
    response.write(indexPage);
    response.end();
}

const onRequest = (request, response) => {
    switch (request.url) {
        case "/stale-joke":
            getStaleJoke(request, response);
            break;
        case "/random-joke":
            getRandomJoke(request, response);
            break;
        default:
            getIndex(request, response);
    }
    
}

const getStaleJoke = ( request, response ) => {
    response.writeHead(200, {"content-Type": "application/json", "Access-Control-Allow-Origin":"*"});
    const json = JSON.stringify(jokes[0]);
    response.write(json);
    response.end();
}


const getRandomJoke = ( request, response ) => {
    response.writeHead(200, {"content-Type": "application/json", "Access-Control-Allow-Origin":"*"});
    const json = JSON.stringify(jokes[Math.floor(Math.random()*jokes.length)]);
    response.write(json);
    response.end();
}

http.createServer(onRequest).listen(port);
console.log("Server starting");
console.log(`Listening on 127.0.0.1 port`);