//Este arquivo de rotas está sendo utilizado pelo index
import UserModel from '../models/users'

//Aqui teremos os principais métodos utilizado pelo http (get, post, put e delete)
const userRoute = (app) => {
    
/*GET
Linha 14 o id é opcinal, permitindo buscar todos ou algum especifico (pelo id)
Linha 16 recupera os dados indicados na url no parametro da linha x
Linha 17 monta a consulta
Linha 19-21, se for passado o id será utilizado na consulta, senão buscará todos
Linha 23-28, o try busca os resultados e retorna, o método find localiza!
Linha 28-30, o catch retorna o erro se houver*/
    app.route('/users/:id?')
        .get(async (req, res) => {
            const { id } = req.params
            const query = {};

            if (id) {
                query._id = id
            }

            try {

                const users = await UserModel.find(query)
                res.send({ users })
                
            } catch (error) {
                res.status(400).send({ error: 'Failed to find user' })
            }
        })

/*POST
Linha 39 utilizamos req.body (corpo) para pegar a requisição do usuário, neste caso não está havendo tratamento/validação pq é apenas aula
Linha 42-44 envia status ok ou error se houver problema para salvar*/
        .post(async (req, res) => {

            try {
                const user = new UserModel(req.body)
                await user.save()

                res.status(201).send('OK')
            } catch (error) {
                res.send(error)   
            }
        })

/*PUT
Linha 51 precisa do id para atuaizar, tanto é que na linha 53-55 ele é obrigatório!*/
        .put(async (req, res) => {
            const { id } = req.params

            if (!id) {
                return res.status(400).send({ error: 'User ID is missing.' })
            }

//Na linha 58 o findOneAndUpdate busca o usuáiro no mongo; req.body não esta sendo tratada, em produção verifica a validação, o updatedUser retorna o usuário buscado
            try {
                const updatedUser = await UserModel.findOneAndUpdate({ _id: id }, req.body, {
                    new: true,
                });

                console.log(updatedUser)

                if (updatedUser) {
                    return res.status(200).send('OK')
                }


                res.status(400).send({ error: 'Could not update the user' })

                
            } catch (error) {
                res.send(error)
            }
        })

//DELETE
        .delete(async (req, res) => {

            const { id } = req.params

//Linha 84 Id obrigatório 
            if (!id) {
                return res.status(400).send({ error: 'User ID is missing.' })
            }

//Na linha 90 temos o deleteOne recebe o id e deleta o usuário
            try {
                const deletedUser = await UserModel.deleteOne({ _id: id })

                if (deletedUser.deletedCount) {
                    return res.send('OK')
                }

                res.status(400).send({ error: 'Could not delete the user' })

            } catch (error) {
                res.send(error)
            }
        })
}

module.exports = userRoute