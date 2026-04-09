const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Simulação de Banco de Dados
const users = [
    { username: 'admin', password: '123', name: 'Administrador' },
    { username: 'aluno', password: '456', name: 'Estudante' }
];

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Sucesso: Status 200
        return res.status(200).json({ name: user.name });
    } else {
        // Erro: Status 401
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }
});

app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
