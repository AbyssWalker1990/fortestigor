import { AIClient } from "./client/AIClient";


const app = new AIClient({
	url: "http://localhost:3001/api/v1/faq",
	method: "GET",
});
(async () => {
    const {response} = await app.invoke("Gbc.y");
    console.log("response: ", response)
})()
const app2 = new AIClient({
	url: "localhost:3001/api/v1/faq",
	method: "POST",
});
(async () => {
    const {response} = await app2.invoke("Gbc.y");
    console.log("response: ", response)
})()

export default AIClient;
