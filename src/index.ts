import express, { urlencoded } from "express"
import cors from "cors"
import usersRoute from "./routes/vigilants/index.js"
import signinRoute from "./routes/signin/index.js"
import messagesRoute from "./routes/messages/index.js"
import checkpointsRoute from "./routes/checkpoints/index.js"
import statusRoute from "./routes/status/index.js"
import alertRoute from "./routes/alert/index.js"
import contigencyRoute from "./routes/contingency/index.js"
import agencyRoute from "./routes/agency/index.js"

const server = express()
 
server.use(express.json())
server.use(cors())
server.use(urlencoded({extended: true}))



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