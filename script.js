// Data de início do namoro
const startDate = new Date("2025-01-06");

// Elemento onde o contador será exibido
const contadorElement = document.getElementById("contador-dias");

// Função para calcular e atualizar o contador
function atualizarContador() {
    const agora = new Date();
    const diferencaMs = agora - startDate; // Diferença em milissegundos

    // Conversão para dias, horas, minutos e segundos
    const segundosTotais = Math.floor(diferencaMs / 1000);
    const dias = Math.floor(segundosTotais / (24 * 60 * 60));
    const horas = Math.floor((segundosTotais % (24 * 60 * 60)) / (60 * 60));
    const minutos = Math.floor((segundosTotais % (60 * 60)) / 60);
    const segundos = segundosTotais % 60;

    // Atualizar o elemento do contador
    contadorElement.textContent = `${dias}d:${horas}h:${minutos}m:${segundos}s`;
}

// Atualizar o contador a cada segundo
setInterval(atualizarContador, 1000);

// Chamar a função imediatamente para exibir o contador sem esperar 1 segundo
atualizarContador();
