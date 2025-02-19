document.addEventListener("DOMContentLoaded", () => {
  const inputToAdd = document.getElementById("inputToAdd");
  const btnToAdd = document.getElementById("btnToAdd");
  const ulToAdd = document.getElementById("ulToAdd");

  function saveToLocalStorage() {
    const items = [];
    const listItems = ulToAdd.querySelectorAll("li");
    listItems.forEach((li) => {
      items.push({
        text: li.textContent.replace("Куплено", "").replace("x", "").trim(),
        bought: li.classList.contains("strike"),
      });
    });
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }

  // Функция для загрузки списка из localStorage
  function loadFromLocalStorage() {
    const savedItems = JSON.parse(localStorage.getItem("shoppingList"));
    if (savedItems) {
      savedItems.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item.text;

        // Добавляем кнопку "Куплено"
        const bought = document.createElement("button");
        bought.textContent = "Куплено";
        bought.addEventListener("click", () => {
          li.classList.toggle("strike");
          saveToLocalStorage(); // Сохраняем изменения
        });

        // Кнопка удаления
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "x";
        deleteBtn.addEventListener("click", () => {
          li.remove();
          saveToLocalStorage();
        });

        if (item.bought) {
          li.classList.add("strike");
        }

        li.appendChild(bought);
        li.appendChild(deleteBtn);
        ulToAdd.appendChild(li);
      });
    }
  }

  // Загружаем данные при старте
  loadFromLocalStorage();

  btnToAdd.addEventListener("click", () => {
    const toBuyText = inputToAdd.value.trim();
    if (toBuyText === "") return;

    const li = document.createElement("li");
    li.textContent = toBuyText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "x";
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });

    const bought = document.createElement("button");
    bought.textContent = "Куплено";
    bought.addEventListener("click", () => {
      li.classList.toggle("strike");
    });

    li.appendChild(bought);
    li.appendChild(deleteBtn);
    ulToAdd.appendChild(li);

    inputToAdd.value = "";

    saveToLocalStorage();
  });
});
