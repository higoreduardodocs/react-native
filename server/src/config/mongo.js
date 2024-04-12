import mongoose from 'mongoose'

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }

export default function connectWithRetry() {
  mongoose.set('strictQuery', true)
  mongoose
    .connect(process.env.MONGO_URI, mongoOptions)
    .then(() => console.log(`✅ conneted to mongo`))
    .catch((err) => {
      console.log(`${err} ❌ did not connect`)
      setTimeout(connectWithRetry, 5000)
    })
}
