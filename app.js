// Mani uzdevumi — uzdevumu saraksts, kas darbojas pārlūkā bez servera.
// Dati tiek glabāti pārlūka localStorage.

const STORAGE_KEY = 'mani-uzdevumi';
const MAX_LENGTH = 200;

const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const errorEl = document.getElementById('error');
const listEl = document.getElementById('task-list');
const emptyEl = document.getElementById('empty');
const counterEl = document.getElementById('counter');
const clearDoneBtn = document.getElementById('clear-done');
const filterButtons = document.querySelectorAll('.filter');

let tasks = loadTasks();
let currentFilter = 'all';

// --- Datu glabāšana ---

function loadTasks() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(data) ? data : [];
  } catch (e) {
    return []; // bojāti dati vai localStorage nav pieejams
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    showError('Neizdevās saglabāt datus pārlūkā.');
  }
}

// --- Darbības ar uzdevumiem ---

function createId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

// Pārbauda tekstu; atgriež kļūdas paziņojumu vai tukšu virkni.
function validate(text) {
  if (text.length === 0) return 'Uzdevuma teksts nevar būt tukšs.';
  if (text.length > MAX_LENGTH) return `Uzdevums nevar būt garāks par ${MAX_LENGTH} rakstzīmēm.`;
  return '';
}

function addTask(rawText) {
  const text = rawText.trim();
  const error = validate(text);
  if (error) {
    showError(error);
    return false;
  }
  tasks.push({ id: createId(), text: text, done: false });
  saveTasks();
  showError('');
  render();
  return true;
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  task.done = !task.done;
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

// Papildfunkcija A: uzdevuma teksta labošana.
function editTask(id, rawText) {
  const task = tasks.find(t => t.id === id);
  if (!task) return false;
  const text = rawText.trim();
  const error = validate(text);
  if (error) {
    showError(error);
    return false;
  }
  task.text = text;
  saveTasks();
  showError('');
  render();
  return true;
}

function clearDone() {
  tasks = tasks.filter(t => !t.done);
  saveTasks();
  render();
}

function setFilter(filter) {
  currentFilter = filter;
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === filter);
  });
  render();
}

// --- Attēlošana ---

function showError(message) {
  errorEl.textContent = message;
}

function visibleTasks() {
  if (currentFilter === 'active') return tasks.filter(t => !t.done);
  if (currentFilter === 'done') return tasks.filter(t => t.done);
  return tasks;
}

function render() {
  listEl.innerHTML = '';
  const shown = visibleTasks();

  shown.forEach(task => listEl.appendChild(createTaskElement(task)));

  emptyEl.style.display = shown.length === 0 ? 'block' : 'none';
  const remaining = tasks.filter(t => !t.done).length;
  counterEl.textContent = `Atlikuši: ${remaining}`;
  clearDoneBtn.style.visibility = tasks.some(t => t.done) ? 'visible' : 'hidden';
}

function createTaskElement(task) {
  const li = document.createElement('li');
  li.className = 'task' + (task.done ? ' done' : '');
  li.dataset.id = task.id;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.done;
  checkbox.setAttribute('aria-label', 'Atzīmēt kā izpildītu');
  checkbox.addEventListener('change', () => toggleTask(task.id));

  const span = document.createElement('span');
  span.className = 'text';
  span.textContent = task.text; // textContent, nevis innerHTML — aizsardzība pret HTML ievadi
  span.title = 'Dubultklikšķis, lai labotu';
  span.addEventListener('dblclick', () => startEditing(li, task));

  const actions = document.createElement('span');
  actions.className = 'actions';

  const editBtn = document.createElement('button');
  editBtn.type = 'button';
  editBtn.className = 'edit-btn';
  editBtn.textContent = 'Labot';
  editBtn.addEventListener('click', () => startEditing(li, task));

  const deleteBtn = document.createElement('button');
  deleteBtn.type = 'button';
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'Dzēst';
  deleteBtn.addEventListener('click', () => deleteTask(task.id));

  actions.append(editBtn, deleteBtn);
  li.append(checkbox, span, actions);
  return li;
}

// Aizstāj uzdevuma tekstu ar ievades lauku.
// Enter vai fokusa zaudēšana — saglabā, Escape — atceļ.
function startEditing(li, task) {
  const span = li.querySelector('.text');
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'edit-input';
  editInput.maxLength = MAX_LENGTH;
  editInput.value = task.text;

  let finished = false;
  function finish(save) {
    if (finished) return;
    finished = true;
    if (save && editTask(task.id, editInput.value)) return;
    render(); // atcelts vai nederīgs teksts — atjauno sākotnējo skatu
  }

  editInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') finish(true);
    if (e.key === 'Escape') finish(false);
  });
  editInput.addEventListener('blur', () => finish(true));

  li.replaceChild(editInput, span);
  editInput.focus();
  editInput.select();
}

// --- Notikumi ---

form.addEventListener('submit', e => {
  e.preventDefault();
  if (addTask(input.value)) {
    input.value = '';
  }
  input.focus();
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});

clearDoneBtn.addEventListener('click', clearDone);

render();
