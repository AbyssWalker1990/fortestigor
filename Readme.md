# ABNK Assistant Node.js Client

The ABNK Assistant Node.js Client is a library that provides a simple way to interact with the ABNK Assistant API. It allows you to send questions to the API and receive text responses.

## Installation

For now this **package is local** only, so you need to make **some preparing steps** to use it:

**1. Clone**
Clone this package from repository to your local directory

```
git clone https://your_username@bitbucket.org/abnk/abnk-assistant-nodejs-client.git
```

**2. Build**
Move inside the cloned directory (ex. _/abnk-assistant-client_ ) and build the package using next **npm** command:

```
npm run build
```

**3. Install**
Move in the directory of your own project and install the package to your project using one of the following **npm** commands:

```
npm install path/to/abnk-assistant-client
```

or

```
npm link --save path/to/abnk-assistant-client
```

> _In the future it will be much more simple and you will can install the ABNK Assistant Client using npm_:
> ```
> npm install abnk-assistant-client
> ```

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
