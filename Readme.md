# ABNK Assistant Node.js Client

The ABNK Assistant Node.js Client is a library that provides a simple way to interact with the ABNK Assistant API. It allows you to send questions to the API and receive text responses.

## Installation

You will can install the ABNK Assistant Node.js Client using npm:

```
npm install abnk-assistant-client
```
but for now this package is local only, so you need to provide absolute or relative path to it. The cli command will look like this:
```
npm install --save path/to/abnk-assistant-client
```
or
```
npm link --save path/to/abnk-assistant-client
```

## Usage

### CommonJS (CJS) Modules

```javascript
const { AIClient } = require("abnk-assistant-client");

// Create a new instance of AIClient
const client = new AIClient({
	url: "http://api.example.com",
	method: "GET",
});
/*  
You can replace "http://api.example.com" 
with "http://localhost:3001/api/v1/faq" for testing 
*/

// Send a question to the API and receive a response
client
	.invoke("How does this work?")
	.then((response) => {
		console.log("Response:", response);
	})
	.catch((error) => {
		console.error("Error:", error);
	});
```

### ECMAScript Modules (ESM)

```javascript
import { AIClient } from "abnk-assistant-client";

// Create a new instance of AIClient
const client = new AIClient({ url: "http://api.example.com", method: "GET" });

// Send a question to the API and receive a response using typical Promise
client
	.invoke("How does this work?")
	.then((response) => {
		console.log("Response:", response);
	})
	.catch((error) => {
		console.error("Error:", error);
	});
```

or

```javascript
const { AIClient } = require("abnk-assistant-client");

// Create a new instance of AIClient
const client = new AIClient({ url: "http://api.example.com", method: "GET" });

// Send a question to the API and receive a response using async/await
async function someFunction() {
	try {
		const response = await client.invoke("How does this work?");
		console.log("Response: ", response);
	} catch (error) {
		throw new Error(error);
	}
}
// Don't forget to invoke your own function
someFunction();
```

## API

### `AIClient`

The main class representing the ABNK Assistant Node.js Client.

#### Constructor

```javascript
const client = new AIClient(config);
```

- `config`: An object containing configuration options for the client.
  - `url`: The URL of the API server.
  - `method`: The HTTP method to use for requests ('GET' or 'POST').

#### Methods

##### `invoke(payload: string): Promise<any>`

Sends a question to the API and returns the response.

- `payload`: The question to send to the API.

Returns a Promise that resolves with the API response.

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on the [BitBucket repository](https://bitbucket.org/abnk/abnk-assistant-nodejs-client).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
