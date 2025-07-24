document.getElementById("generate").addEventListener("click", () => {
  const length = parseInt(document.getElementById("length").value);
  const useSpecial = document.getElementById("specialChars").checked;
  const passwordField = document.getElementById("password");
  const message = document.getElementById("message");

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const special = "!@#$%^&*()-_=+[]{}<>?/";

  let chars = lower + upper + digits;
  if (useSpecial) chars += special;

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  passwordField.value = password;

  navigator.clipboard.writeText(password).then(() => {
    message.textContent = "Пароль скопирован в буфер!";
    setTimeout(() => {
      message.textContent = "";
    }, 3000);
  });
});
