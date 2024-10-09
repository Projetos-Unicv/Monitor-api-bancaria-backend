let contador = 1; // Começa em 1

export function gerarNumeroSeisDigitosSequencial() {
  if (contador > 10000000000) {
    throw new Error('O contador ultrapassou o limite de 6 dígitos.');
  }

  // Converte o número para string e preenche com zeros à esquerda até ter 6 dígitos
  const numeroSeisDigitos = String(contador).padStart(6, '0');

  contador++; // Incrementa o contador para o próximo número
  return numeroSeisDigitos; // Retorna o número formatado
}

// Exemplo de uso
console.log(gerarNumeroSeisDigitosSequencial()); // Exibe 000001
console.log(gerarNumeroSeisDigitosSequencial()); // Exibe 000002
console.log(gerarNumeroSeisDigitosSequencial()); // Exibe 000003
