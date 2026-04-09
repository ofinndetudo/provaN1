document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const resultMsg = document.getElementById('result');
    const loginSection = document.getElementById('login-section');
    const container = document.getElementById('container-principal');

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: usernameInput, password: passwordInput })
        });

        const data = await response.json();

        if (response.status === 200) {
            // Sucesso: Esconde o formulário e cria o Dashboard
            loginSection.style.display = 'none';
            resultMsg.innerHTML = ''; // Limpa mensagens de erro anteriores
            
            container.innerHTML = `
                <div class="success-panel">
                    <h2>Login bem-sucedido!</h2>
                    <p>Bem-vindo, <strong>${data.name}</strong>!</p>
                </div>
            `;
        } else {
            // Erro: Exibe mensagem na classe .error
            resultMsg.innerHTML = `<span class="error">${data.error}</span>`;
        }
    } catch (err) {
        resultMsg.innerHTML = `<span class="error">Erro ao conectar com o servidor.</span>`;
    }
});
