const db = require('./server/db')
const app = require('./server')
const PORT = process.env.PORT || 8080;


app.listen(PORT, async () =>
  await db.sync(),
  console.log(`Starting server on ${PORT}`)
)
