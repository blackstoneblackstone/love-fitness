const server = require('../server/main')
const debug = require('debug')('app:bin:server')
const port = 3000

server.listen(port)
debug(`Server is now running at http://localhost:${port}.`)
