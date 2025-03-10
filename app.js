// Função para validar e corrigir o valor do ano
document.querySelector(".year input").addEventListener("blur", function () {
  let value = parseInt(this.value);

  if (isNaN(value) || value < 1900 || value > 2025) {
    this.value = ""; // Se o valor for inválido, limpa o campo
  }
});

// Adiciona zero à esquerda para dia e mês ao sair do campo
document.querySelectorAll(".day input, .month input").forEach((input) => {
  input.addEventListener("blur", function () {
    if (this.value.length === 1) {
      this.value = "0" + this.value;
    }
  });
});

// Função para calcular a idade
const calculateAge = () => {
  const dayInput = document.querySelector(".day input");
  const monthInput = document.querySelector(".month input");
  const yearInput = document.querySelector(".year input");
  const errorMessage = document.querySelector(".volumeCheck");

  let day = parseInt(dayInput.value);
  let month = parseInt(monthInput.value);
  let year = parseInt(yearInput.value);

  if (!day || !month || !year) {
    errorMessage.style.display = "flex";
    return;
  } else {
    errorMessage.style.display = "none";
  }

  let birthDate = new Date(year, month - 1, day);
  let today = new Date();
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  document.querySelector(".resultInYears").innerText = `${ageYears}`;
  document.querySelector(".resultInMonths").innerText = `${ageMonths}`;
  document.querySelector(".resultInDays").innerText = `${ageDays}`;
};

// Função para limpar todos os campos
const clearInputs = () => {
  document.querySelectorAll("input").forEach((input) => {
    input.value = ""; // Limpa o valor de todos os inputs
  });
};

// Adiciona um evento de clique ao botão de limpeza
document.querySelector(".clearButton").addEventListener("click", function () {
  clearInputs(); // Limpa os campos quando o botão for clicado
});

// Evita que valores não numéricos sejam digitados no campo de ano
document.querySelector(".year input").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, ''); // Remove qualquer caractere não numérico
});
