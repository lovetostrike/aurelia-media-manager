const http = require('http')
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const UPLOADS_DIR = path.resolve(__dirname, 'uploads')
const PORT = 3000

http.createServer((req, res) => {
  console.log(`Server running at http://localhost:${PORT}`)
  if (req.url === '/upload') {
    const form = new formidable.IncomingForm()
    form.multiples = true
    form.parse(req, (err, fields, files) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      if (err) {
        console.error(err)
        res.write('Parsing error')
        return res.end()
      }
      if (!Object.keys(files).length) {
        console.error('No file was uploaded')
        res.write('No file was uploaded')
        return res.end()
      }
      if (!fs.existsSync(UPLOADS_DIR)) {
        fs.mkdirSync(UPLOADS_DIR)
      }
      Object.values(files).forEach(file => {
        const oldpath = file.path
        const newpath = path.resolve(__dirname, UPLOADS_DIR, file.name)
        fs.rename(oldpath, newpath, err => {
          if (err) {
            console.error(err)
            res.write(err)
            return res.end()
          }
          res.write('File uploaded and moved!')
          res.end()
        })
      })
    })
  } else {
    console.error('Wrong url')
    res.write('Correct url is /upload')
    return res.end()
  }
}).listen(PORT)
