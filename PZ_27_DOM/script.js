'use strict';
console.log('ПЗ 27: стартовый проект подключён');
const pageTitle = document.querySelector('#page-title');
const taskForm = document.querySelector('#task-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');
const stats = document.querySelector('#stats');
const errorMsg = document.querySelector('#error');
pageTitle.textContent = 'Список задач';
const initialCards = taskList.querySelectorAll('.task-item');
initialCards.forEach((card, index) => {
  card.dataset.id = index + 1;
});

function updateStats() {
  const items = taskList.querySelectorAll('.task-item');
  const total = items.length;
  const completed = taskList.querySelectorAll('.task-item.completed').length;
  const remaining = total - completed;

  stats.textContent = `Всего: ${total} | Выполнено: ${completed} | Осталось: ${remaining}`;
}
function createTask(text) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.dataset.id = Date.now();
  const span = document.createElement('span');
  span.textContent = text;
  span.className = 'task-text';
  const btnUp = document.createElement('button');
  btnUp.textContent = '↑';
  btnUp.className = 'btn-up';
  const btnToggle = document.createElement('button');
  btnToggle.textContent = '✔';
  btnToggle.className = 'btn-toggle';
  const btnRemove = document.createElement('button');
  btnRemove.textContent = '✕';
  btnRemove.className = 'btn-remove';
  li.append(span, btnUp, btnToggle, btnRemove);
  taskList.append(li);
}

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = taskInput.value.trim();

  if (!value) {
    if (errorMsg) errorMsg.textContent = 'Введите текст задачи!';
    return;
  }
  if (errorMsg) errorMsg.textContent = '';
  createTask(value);
  taskInput.value = '';
  updateStats();
});
taskList.addEventListener('click', (e) => {
  const target = e.target;
  const taskItem = target.closest('.task-item');
  if (!taskItem) return;
  if (target.classList.contains('btn-toggle')) {
    taskItem.classList.toggle('completed');
    updateStats();
  }
  if (target.classList.contains('btn-up')) {
    const prevItem = taskItem.previousElementSibling;
    if (prevItem) {
      taskList.insertBefore(taskItem, prevItem);
      updateStats();
    }
  }
  if (target.classList.contains('btn-remove')) {
    taskItem.remove();
    updateStats();
  }
});
updateStats();
