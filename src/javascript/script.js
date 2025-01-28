// Código separado sem funções

// Descobrindo checkbox marcados
function getChartTypes() {
    const uppercase = document.querySelector("#include-uppercase").checked;
    const lowercase = document.querySelector("#include-lowercase").checked;
    const number = document.querySelector("#include-number").checked;
    const special = document.querySelector("#include-special").checked;

    // Passar aqui dentro o que a senha terá
    const charTypes = [];

    // Se estiver marcado, incluir (push) dentro da lista de charTypes
    if(uppercase){
        charTypes.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
    }

    // Inserindo na lista letras minúsculas
    if(lowercase){
        charTypes.push('abcdefghijklmnopqrstuvwxyz');
    }

    // Inserindo na lista números
    if(number){
        charTypes.push('0123456789');
    }

    // Inserindo na lista caracteres especiais
    if(special){
        charTypes.push('!@#$%&*_/?');
    }
    
    // Retorna o Tipo de Caracteres que foram selecionados
    return charTypes;
}

// Função que vai pegar o tamanho da senha escolhida pelo usuário no input
function getPasswordSize() {
    const size = document.querySelector('#size').value; 
    // Validação para não inserir valores errados na quantidade de caracteres
    if (isNaN(size) || size < 4 || size > 50) {
        message('Tamanho inválido! Digite um número entre 4 e 50!', 'warning');
        return null; // Retorna null se o tamanho for inválido
    }

    return size;
}

// Essa função passa pelos ifs, e pela quantidade que foi selecionada
function randomCharType(charTypes) {
    // Gerando um número aleatório
    const randomIndex = Math.floor(Math.random() * charTypes.length);
    
    return charTypes[randomIndex][Math.floor(Math.random() * charTypes[randomIndex].length)];
}

// Função que realmente vai gerar a senha
function generatePassword(size, charTypes) {
    let passwordGenerated = '';

    // Para atingir o valor desejado do usuário
    while (passwordGenerated.length < size){
        passwordGenerated += randomCharType(charTypes); // Repetir mais de uma vez
    }

    return passwordGenerated;
}

// Função da Mensagem
function message(text, status = 'success') {
    Toastify({
        text: text, 
        duration: 2000,
        style: {
            background: status === 'success' ? '#49C659': '#dc2323',
            boxShadow: 'none'
        }
    }).showToast();
}

document.querySelector('#generate').addEventListener('click', function () {
    const size = getPasswordSize();
    // Verifica se o tamanho é inválido
    if (size === null) {
        return; // Se o tamanho for inválido, não continua
    }

    // Verifica se o tamanho é maior que 50
    if (size > 50) {
        message('Tamanho inválido! O número não pode ser maior que 50!', 'warning');
        return; // Se o tamanho for maior que 50, não continua
    }

    const charTypes = getChartTypes();

    // Esse bloco de código faz com que não trave a aplicação, nem apareça o bloco de senha
    if (!charTypes.length){
        message('Selecione pelo menos um tipo de caracter!', 'warning');
        return; // Return para parar a função
    }

    // Gerar a senha após a verificação
    const passwordGenerated = generatePassword(size, charTypes);

    // Mostrar na tela a senha gerada
    document.querySelector('#password-container').classList.add('show'); // Adicionando aqui a classe show para o display aparecer
    document.querySelector('#password').textContent = passwordGenerated;
});

// Botão para copiar a senha
document.querySelector('#copy').addEventListener('click', function() {
    navigator.clipboard.writeText(document.querySelector('#password').textContent);
    message('Senha copiada com sucesso!', 'success');
});