const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

//simulação de banco de dados
const users = [
    { username: 'admin', password: '123', name: 'Administrador'},
    { username: 'aluno', password: '456', name: 'Estudante'}
];

//requisitos para fazer o login no site
app.post('/login', (req, res) => {
    const { username, password, } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    //verificando se o usuário consta no banco de dados
    if (user){
        //sucesso ao entrar: status 200
        return res.status(200).json({
            message: 'Sucesso',
            name: user.name
        });
    } else {
        //Erro ao logar
        return res.status(401).json({ error: 'Credenciais invalidas' });
    }
});

const PORT = 3000;
app.listen(3000, () => console.log (`'Servidor rodando na porta ${PORT}`));
