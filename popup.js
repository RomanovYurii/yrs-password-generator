const lengthInput = document.getElementById("length");
const specialCharsInput = document.getElementById("specialChars");
const passwordField = document.getElementById("password");
const message = document.getElementById("message");

// Загрузка сохранённых настроек при открытии расширения
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["length", "specialChars"], (data) => {
    if (data.length) {
      lengthInput.value = data.length;
    }
    if (typeof data.specialChars === "boolean") {
      specialCharsInput.checked = data.specialChars;
    }
  });
});

document.getElementById("generate").addEventListener("click", () => {
  const length = parseInt(lengthInput.value);
  const useSpecial = specialCharsInput.checked;

  // Сохраняем выбор пользователя
  chrome.storage.local.set({
    length: length,
    specialChars: useSpecial
  });

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const special = "!@#$%^&*()-_=+[]{}<>?/";

  let chars = lower + upper + digits;
  if (useSpecial) chars += special;

  let password = "";

  const generatePassword = () => {
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    // Проверка на наличие хотя бы одной буквы, цифры и специального символа
    if (useSpecial) {
      const hasLower = /[a-z]/.test(password);
      const hasUpper = /[A-Z]/.test(password);
      const hasDigit = /\d/.test(password);
      const hasSpecial = /[!@#$%^&*()\-_=+[\]{}<>?\/]/.test(password);

      if (!hasLower || !hasUpper || !hasDigit || !hasSpecial) {
        password = ""; // Сброс пароля, если не выполнены условия
        generatePassword(); // Рекурсивный вызов для генерации нового пароля
      }
    }
  }

  passwordField.value = password;

  navigator.clipboard.writeText(password).then(() => {
    message.textContent = "Пароль скопирован в буфер!";
    setTimeout(() => {
      message.textContent = "";
    }, 3000);
  });
});
