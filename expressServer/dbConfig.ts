import { connect } from 'mongoose'

// const dbURI = 'mongodb://localhost:27017/dg-bag'

export default (): Promise<string> => {
  return new Promise((resolve, reject) => {
    const dbURI: string = process.env.DBURI || 'mongodb://localhost:27017/dg-bag'
    connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
      .then(() => {
        resolve('Connected to db...')
      })
      .catch((err) => {
        console.error(err)
        reject(err.message)
      })
  })
}