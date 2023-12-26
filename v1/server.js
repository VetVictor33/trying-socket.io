import express from 'express'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express()
const server = http.createServer(app)

app.use(express.static(path.join(__dirname, 'public')))

server.listen(3000, () => {
  console.log('Server running on port 3000')
})