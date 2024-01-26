import express, { urlencoded } from "express"
import cors from "cors"
import signupRoute from "./signup/index.js"
import usersRoute from "./vigilants/index.js"
import signinRoute from "./signin/index.js"
import messagesRoute from "./messages/index.js"
import checkpointsRoute from "./checkpoints/index.js"
import statusRoute from "./status/index.js"
import alertRoute from "./alert/index.js"
import contigencyRoute from "./contingency/index.js"
import agencyRoute from "./agency/index.js"

const server = express()
 
server.use(express.json())
server.use(cors())
server.use(urlencoded({extended: true}))



server.use(signupRoute)
server.use(usersRoute)
server.use(signinRoute)
server.use(messagesRoute)
server.use(checkpointsRoute)
server.use(statusRoute)
server.use(alertRoute)
server.use(contigencyRoute)
server.use(agencyRoute)


const port = process.env.PORT || 4000

server.listen(port, () => console.log(`Server Running ${port}`))