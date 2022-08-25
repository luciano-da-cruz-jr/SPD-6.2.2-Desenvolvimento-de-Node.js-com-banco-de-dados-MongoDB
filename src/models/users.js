import Mongoose from 'mongoose'

/*
Definindo o Schema do usuário
Linhas 12-15 criação os campos firstName, lastName e email
Linha 17 require true é igual a campo obrigatório, caso não passar mostrará a msg de erro (pode deixar em branco)
Linha 18 unique = cada usuário terá um e-mail distinto
Linha 19 match é a validação do campo usando uma expressão regular
Linha 22 timestamps é uma opção configurada, neste caso quando for criado um registro ele criará mais dois campos (createdAt e updatedAt)
Linha 25-28 , na função transforme, apenas cria um novo id e deleta o antigo
*/
const schema = new Mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
}, {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: { 
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
          }
    },
    versionKey: false,
})

//Linha 34, responsável por registrar o usuário no bd, o schema será a collection utilizada pelo bd
const UsersModel = Mongoose.model('Users', schema)

//Linha 37, por fim, exportamos o model para ser utilizado na aplicação
export default UsersModel