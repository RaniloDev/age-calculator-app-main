const validateInput = (input) => {
  if (input.value !== "") {
    let min = parseInt(input.min);
    let max = parseInt(input.max);
    let value = parseInt(input.value);

    if (value < min) input.value = min;
    if (value > max) input.value = max;
  }
};

const calculateAge = () => {
  const day = document.querySelector(".day").value;
  const month = document.querySelector(".month").value;
  const year = document.querySelector(".year").value;
  const btn = document.querySelector(".btn");
  //   Fazer verificação em cada input
  if (!day || !month || !year) {
    document.getElementsByClassName("volumeCheck")[0].style.display = "flex";
    return;
  }

  btn.addEventListener("click", () => {});
};
