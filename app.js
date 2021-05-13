const express = require('express')
const client = require('prom-client')
const app = express()

const port = process.env.PORT ? parseInt(process.env.PORT) : 5000
const env = process.env

const collectDefaultMetrics = client.collectDefaultMetrics

const Registry = client.Registry
const register = new Registry()
collectDefaultMetrics({ register })

app.get('/', ( req, res ) => {
  res.send("It works!")
})

app.get('/metrics', async ( req, res ) => {
  const metrics = await register.metrics()

  res.set("Content-Type", "text/plain")
  res.send( metrics )
})

app.get('/env', ( req, res ) => {
  res.json(env)
})

app.listen( port, () => {
  console.log( `metrics gateway started on port ${port}` )
})
