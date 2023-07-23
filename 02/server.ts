import http, { Server, IncomingMessage, ServerResponse } from 'http'

const hostnamme: string = '127.0.0.1';
const port: number = 8080;
const server: Server = http.createServer((request: IncomingMessage, response: ServerResponse) => {
    response.statusCode = 200;
    response.setHeader("Content-type", 'text/html');
    response.end(`<h1>welcome to my world < /h1>`);

});
server.listen(port, hostnamme, () => {
    console.log(`Node Js server is started at http://${hostnamme}:${port}`)
})