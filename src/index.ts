import express, { urlencoded } from "express"
import cors from "cors"
import signupRoute from "./signup/index.js"
import usersRoute from "./vigilants/index.js"
import signinRoute from "./signin/index.js"
import messagesRoute from "./mensagens/index.js"

const server = express()
 
server.use(express.json())
server.use(cors())
server.use(urlencoded({extended: true}))



server.use(signupRoute)
server.use(usersRoute)
server.use(signinRoute)
server.use(messagesRoute)

const port = process.env.PORT || 4000

server.listen(port, () => console.log(`Server Running ${port}`))