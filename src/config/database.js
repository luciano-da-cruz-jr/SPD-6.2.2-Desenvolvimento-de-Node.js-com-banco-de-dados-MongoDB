import mongoose from 'mongoose'

mongoose.Promise = global.Promise

//Objeto de configuração do BD (Linha: 7-13)
//Linha 8: Url do BD, se for remoto é só colocar a url
const config = {
  uri: 'mongodb://localhost:27017/node-mongoose',
  options: {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
}

//Listeners de dois eventos que informa se o bd foi conectado ou não(Linha: 16-22)
mongoose.connection.on('open', () => {
  console.log('Successfully connected to database.')
})

mongoose.connection.on('error', () => {
  throw new Error('Could not connect to MongoDB.')
})

//Exportando uma função que iniciará o BD usando as configs(Linha: 25-27)
export default {
  connect: () => mongoose.connect(config.uri, config.options)
}
