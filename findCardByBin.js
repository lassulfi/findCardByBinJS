const files = require('./files');
const https = require('https');

const content = files.read('bins.txt');

const binRegex = /\b\d{6}\b/gm

const cards = [];
const bins = content.match(binRegex);
for(bin in bins) {
    const options = {
        host: 'https://lookup.binlist.net',
        path: `/${bin}`,
        method: 'GET',
        headers: { 'Accept-Version': '3' }, 
    }

    const req = https.get(`https://lookup.binlist.net/${bin}`, resp => {
        let data = ''

        resp.on('data', chunk => {
            data += chunk
        })

        resp.on('end', () => {
            console.log(JSON.parse(data))
            cards.push({bin, type: data.type, issuer: data.brand })
        })
    }).on('error', err => console.log(`Error: ${err.message}`))
    
    req.end();
}

console.log(cards)