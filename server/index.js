import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
// import path from 'path'
// import { fileURLToPath } from 'url';

import connectDB from './mongodb/connect.js'
import postRoutes from './routes/post.routes.js'
import dalleRoutes from './routes/dalle.routes.js'

dotenv.config()
const PORT = process.env.PORT || 8080
const app = express()
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename)
// console.log(__dirname)

app.use(cors())
app.use(express.json({ limit: '50mb' }))

app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/dalle', dalleRoutes)
app.get('/', (req, res) => res.send('Welcome to Dall-E Backend!'))

// app.use(express.static('dist'))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/dist/index.html'))
// })

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL)
        app.listen(PORT, () => console.log(`Server has started on port http://localhost:${PORT}`))
    } catch (error) {
        console.log(error)
    }     
}

startServer()