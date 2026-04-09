document.getElementById('login-form').addEventListener('submit', async (event) =>{
    event.preventDefault(); //aqui evita que a pagina recarregue sozinha

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value
    const resultMensagem = document.getElementById('result');
    const loginSection = document.getElementById('login-section');
    const container = document.getElementById('container-principal');

    try{
        const response = await fetch ('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ username: usernameInput, password: passwordInput})
        });

        const data = await response.json();

        if(response.status === 200){
            //sucesso ao entra na conta, esconde o formulario e cria o dashboard
            loginSection.style.display = 'none';
            resultMensagem.innerHTML = ''; //limpa os campos anteriores

            container.innerHTML = `
            <div class = "sucess-panel">
                <h2>Login bem sucedido!</h2>
                <p>Bem-vindo, <strong>${data.name}</strong>!</p>
            </div>
            `;
        }else{ //caso de o erro 401
            resultMensagem.innerHTML = `<span class="error">${data.error}</span>`;
        }
    } catch (error){
        resultMensagem.innerHTML = `<span class = "error"> Erro ao conectar com o servidor. </span>`;
    }
});
