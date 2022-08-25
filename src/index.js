import Express from 'express'
import bodyParser from 'body-parser'

import database from './config/database'
import userRoute from './routes/userRoute'

//Configuração da Aplicação (Linhas: 8-13)
const app = Express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.set('json spaces', 2);

//Rota utilizada neste projeto (Linha: 15-17)
userRoute(app)

app.get('/', (req, res) => res.send('Olá mundo pelo Express!'))

//Conexão com o banco de dados (Linha: 20-22)
database.connect().then(() => {
    app.listen(port, () => console.log('Api rodando na porta 3000'))
})