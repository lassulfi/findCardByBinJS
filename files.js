const fs = require('fs')

const read = filename => 
    fs.readFileSync(`${__dirname}/originais/${filename}`, { encoding: 'utf-8' })

const write = (filename, content) => {
    const dirname = `${__dirname}/modificados`
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname)
    }

    const stream = fs.createWriteStream(`${dirname}/${filename}`, { encoding: "utf-8", flags: 'a' })
    stream.write(`${content}\n`)
    stream.close();
}

module.exports = { read, write }