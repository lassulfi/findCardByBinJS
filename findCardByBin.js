const files = require('./files')
const https = require('https');

const content = files.read('bins.txt');

const binRegex = /\b\d{6}\b/gm
const bins = content.match(binRegex);

bins.forEach(bin => {
    const options = {
        host: 'lookup.binlist.net',
        path: `/${bin}`,
        method: 'GET',
        headers: { 'Accept-Version': '3' }, 
    }

    const req = https.get(options, resp => {
        let data = ''

        resp.on('data', chunk => {
            data += chunk
        })

        resp.on('end', () => {
            const card = JSON.parse(data)
            const text = generateCompleteBin(bin, card)
            files.write('bin.txt', text)
        })
        
    }).on('error', err => console.log(`Error: ${err.message}`))
    
    req.end();
})


const generateCompleteBin = (bin, card) =>
    `bin:"${bin}" - type: ${card.type} - issuer: ${card.brand}`;