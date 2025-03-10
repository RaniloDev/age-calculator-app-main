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
    // Adiciona zero à esquerda se o valor tiver apenas 1 dígito
    if (this.value.length === 1) {
      this.value = "0" + this.value; // Adiciona zero à esquerda
    }

    // Valida o mês
    if (this.classList.contains("month")) {
      let value = parseInt(this.value);
      if (value < 1 || value > 12) {
        this.value = "12"; // Ajusta para o valor máximo do mês
      }
    }

    // Valida o dia
    if (this.classList.contains("day")) {
      let value = parseInt(this.value);
      if (value < 1) {
        this.value = "01"; // Ajusta para o valor mínimo do dia
      } else {
        // Ajusta o valor do dia para o máximo do mês
        let monthValue = parseInt(document.querySelector(".month input").value);
        let yearValue = parseInt(document.querySelector(".year input").value);
        let maxDays = new Date(yearValue, monthValue, 0).getDate(); // Quantidade de dias do mês
        this.value = String(Math.min(value, maxDays)).padStart(2, '0'); // Formata o valor para o limite do mês
      }
    }
  });

  // Limita o número de caracteres no dia e mês enquanto digita
  input.addEventListener("input", function () {
    if (this.value.length > 2) {
      this.value = this.value.slice(0, 2); // Limita o número de dígitos a dois
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

  // Valida o mês, considerando o intervalo de 1 a 12
  if (month < 1 || month > 12) {
    monthInput.value = "12"; // Ajusta o mês para 12 caso seja inválido
    errorMessage.style.display = "flex";
    return;
  }

  // Valida o dia, considerando o mês e o ano
  let maxDays = new Date(year, month, 0).getDate(); // Quantidade de dias do mês
  if (day < 1 || day > maxDays) {
    dayInput.value = String(maxDays).padStart(2, '0'); // Ajusta o dia para o valor máximo do mês
    errorMessage.style.display = "flex";
    return;
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

// Validação de entrada de mês e dia enquanto digita
document.querySelector(".month input").addEventListener("input", function () {
  let value = parseInt(this.value);
  if (value < 1 || value > 12) {
    this.value = "12"; // Ajusta o valor para o mês máximo
  }
});

document.querySelector(".day input").addEventListener("input", function () {
  let value = parseInt(this.value);
  let monthValue = parseInt(document.querySelector(".month input").value);
  let yearValue = parseInt(document.querySelector(".year input").value);
  let maxDays = new Date(yearValue, monthValue, 0).getDate(); // Quantidade de dias do mês
  this.value = String(Math.min(value, maxDays)).padStart(2, '0'); // Ajusta o valor para o limite do mês
});
