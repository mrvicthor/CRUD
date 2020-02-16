const form = document.querySelector("#form");
const input = form.querySelector("input");
const list = document.querySelector("#list");
let items = [];
let updating;

const handleSubmit = e => {
  e.preventDefault();
  if (!input.value.trim()) return;
  if (updating) updateItem(updating, input.value);
  else addItem(input.value);
  input.value = "";
  updating = undefined;
  render();
};

const addItem = text => {
  items.push({ id: items.length + 1, text, completed: false });
  console.log(items);
};

const deleteItem = id => {
  items = items.filter(item => item.id !== parseInt(id, 10));
};

const updateItem = (id, text) => {
  items = items.map(item => {
    if (item.id === id) return { ...item, text };
    return item;
  });
};

const render = () => {
  const html = items
    .map(
      item =>
        ` <li>
        ${item.text}
        <span>
          <button class="update-item" data-id="${item.id}">
            Update
          </button>
          <button class="delete-item" data-id="${item.id}">
            Delete
          </button>
        </span>
      </li>`
    )
    .join("");
  list.innerHTML = html;
};

form.addEventListener("submit", handleSubmit);

window.addEventListener("click", e => {
  if (e.target.className === "delete-item") {
    deleteItem(e.target.dataset.id);
    render();
  }
  if (e.target.className === "update-item") {
    const id = parseInt(e.target.dataset.id, 10);
    const item = items.find(item => item.id === id);
    updating = id;
    input.value = item.text;
  }
});
