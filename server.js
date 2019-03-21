const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const port = process.argv[2] || 8080;

const mimeType = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
}

http.createServer((req,res)=> {

    const parsedUrl = url.parse(req.url);
    const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');

    let pathname = path.join(__dirname, sanitizePath);

    fs.exists(pathname, function(exist){
        if(!exist){
            res.statusCode = 404;
            res.end(`O arquivo ${pathname} nao foi encontrado!`);
            return;
        }

        if(fs.statSync(pathname).isDirectory()) {
            res.end('Acesso Negado!');
            //pathname += '/index.html';
        }
        
        fs.readFile(pathname,function(err,data){
            if(err){
                res.statusCode = 500;
                res.end(`Erro ao obter o arquivo: ${err}.`);
            } else {
                const ext = path.parse(pathname).ext;
                res.setHeader('Content-type', mimeType[ext] || 'text/plain');
                res.end(data);
            }
        });
    });
}).listen(parseInt(port));

console.log(`Server listening on port ${port}`);