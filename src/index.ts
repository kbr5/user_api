import App from './app'

const port = process.env.PORT || 3333

App.listen(port, (err: Error) => {
    if (err) {
      return console.log(err)
    }
  
    return console.log(`server is listening on ${port}`)
  })

  