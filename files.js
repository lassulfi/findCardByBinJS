const fs = require('fs');

const read = filename => 
    fs.readFileSync(`${__dirname}/originais/${filename}`, { encoding: 'utf-8' });

const write = (filename, content) => {
    const dirname = `${__dirname}/alterados`;
    if (!fs.existsSync(dirname)) {
        fs.mkdir(dirname);
    }

    fs.writeFileSync(`${dirname}/${filename}`, content, { encoding: 'utf-8' });
}

module.exports = { read, write }