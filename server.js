const dotEnv = require('dotenv')
dotEnv.config()

const cors = require('cors')
const db = require('./database')
const express = require('express')
const PORT = process.env.PORT || 3000
const { Sequelize } = require('sequelize')
const { ApolloServer } = require('apollo-server-express')

//? Express Server
const app = express()
app.use(cors())
app.use(express.json())

//? Apollo Server
const resolvers = require('./resolvers')
const typeDefs = require('./typeDefs')
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers
})
apolloServer.applyMiddleware({ app, path: '/graphql' })

//? Dummy route
app.use('/', (req, res, next) => res.send('Hello Puzzle'))

//? SERVER
const server = async () => {
  try {
    await db.authenticate()
    console.log(`Postgres: http://${db.config.host}:${db.config.port}`)
    await app.listen(PORT)
    console.log(`Express: http://localhost:${PORT}`)
    console.log(`Apollo: http://localhost:${PORT}${apolloServer.graphqlPath}`)
  } catch (error) {
    console.log(error)
  }
}
server()
