/**
 * Приложение Бухгалтерия — Персональный учет трат
 * Архитектура: Модульный Vanilla JavaScript по стандартам Apple HIG
 */

// --- 1. Конфигурация и начальные данные со скриншота ---
const STORAGE_KEY = 'accounting_app_data_v1';

const CATEGORIES = [
  { 
    id: 'all', 
    name: 'Все', 
    hex: '#ffffff',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/></svg>`
  },
  { 
    id: 'food', 
    name: 'Еда', 
    hex: '#bf5af2', 
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`
  }, 
  { 
    id: 'transport', 
    name: 'Транспорт', 
    hex: '#0a84ff', 
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`
  }, 
  { 
    id: 'shopping', 
    name: 'Покупки', 
    hex: '#ff375f', 
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`
  }, 
  { 
    id: 'home', 
    name: 'Дом', 
    hex: '#ffd60a', 
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
  }, 
  { 
    id: 'health', 
    name: 'Здоровье', 
    hex: '#ff453a', 
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
  }, 
  { 
    id: 'sport', 
    name: 'Спорт', 
    hex: '#30d158', 
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1Z"/><path d="M22 4v16a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1Z"/><path d="M6 12h12"/><path d="M6 8h2v8H6z"/><path d="M16 8h2v8h-2z"/></svg>`
  }, 
  { 
    id: 'coffee', 
    name: 'Кафе', 
    hex: '#ff9f0a', 
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`
  },
];

const INITIAL_BALANCE = 19605;

const INITIAL_TRANSACTIONS = [
  { id: 101, categoryId: 'shopping', amount: 4545, comment: 'Расход', place: 'Wildberries', date: new Date().toISOString() },
  { id: 1, categoryId: 'food', amount: 6273, comment: 'Продукты', place: 'Ашан', date: new Date(Date.now() - 86400000).toISOString() },
  { id: 2, categoryId: 'shopping', amount: 4571, comment: 'Маркетплейс', place: 'Wildberries', date: new Date(Date.now() - 172800000).toISOString() },
  { id: 3, categoryId: 'health', amount: 4000, comment: 'Здоровье', place: 'Клиника', date: new Date(Date.now() - 250000000).toISOString() },
  { id: 4, categoryId: 'home', amount: 2234, comment: 'ЖКХ', place: 'Мосэнерго', date: new Date(Date.now() - 300000000).toISOString() },
  { id: 5, categoryId: 'health', amount: 597, comment: 'Аптека', place: 'Ригла', date: new Date(Date.now() - 400000000).toISOString() },
  { id: 6, categoryId: 'sport', amount: 499, comment: 'Спорт', place: 'Велопрокат', date: new Date(Date.now() - 500000000).toISOString() },
];

// --- 2. Управление состоянием ---
let state = {
  balance: INITIAL_BALANCE,
  transactions: [...INITIAL_TRANSACTIONS],
  selectedFilter: 'all',
  searchQuery: '',
  selectedCatForNew: 'food'
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (typeof parsed.balance === 'number') state.balance = parsed.balance;
      if (Array.isArray(parsed.transactions)) state.transactions = parsed.transactions;
    }
  } catch (err) {
    console.warn('Не удалось прочитать localStorage', err);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      balance: state.balance,
      transactions: state.transactions
    }));
  } catch (err) {
    console.warn('Не удалось записать в localStorage', err);
  }
}

// --- 3. Telegram WebApp & Haptic Feedback ---
const tg = window.Telegram?.WebApp;
if (tg) {
  try {
    tg.ready();
    tg.expand();
  } catch (e) {
    console.log('Telegram SDK init bypass', e);
  }
}

function triggerHaptic(type = 'light') {
  if (tg?.HapticFeedback) {
    try {
      if (type === 'selection') {
        tg.HapticFeedback.selectionChanged();
      } else if (type === 'success' || type === 'warning' || type === 'error') {
        tg.HapticFeedback.notificationOccurred(type);
      } else {
        tg.HapticFeedback.impactOccurred(type);
      }
    } catch (e) {
      // Игнорируем в обычном браузере
    }
  }
}

// --- 4. DOM элементы ---
const categoriesFilterEl = document.getElementById('categories-filter');
const transactionsListEl = document.getElementById('transactions-list');
const balanceCardEl = document.getElementById('balance-card');
const balanceValueEl = document.getElementById('balance-value');
const totalSpentBadgeEl = document.getElementById('total-spent-amount');
const txCountBadgeEl = document.getElementById('tx-count-badge');
const searchInputEl = document.getElementById('search-input');
const searchClearBtnEl = document.getElementById('search-clear-btn');
const emptyStateEl = document.getElementById('empty-state');
const fabBtnEl = document.getElementById('fab-add-btn');
const sheetBackdropEl = document.getElementById('sheet-backdrop');
const bottomSheetEl = document.getElementById('bottom-sheet');
const sheetCloseBtnEl = document.getElementById('sheet-close-btn');
const sheetHandleWrapperEl = document.getElementById('sheet-handle-wrapper');
const addFormEl = document.getElementById('add-form');
const amountInputEl = document.getElementById('amount-input');
const commentInputEl = document.getElementById('comment-input');
const placeInputEl = document.getElementById('place-input');
const catPickerContainerEl = document.getElementById('category-picker');
const resetBtnEl = document.getElementById('reset-btn');

// --- 5. Вспомогательные функции форматирования ---
function formatRub(num) {
  return `${Math.round(num).toLocaleString('ru-RU')} ₽`;
}

function getNounPlural(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) return five;
  n %= 10;
  if (n === 1) return one;
  if (n >= 2 && n <= 4) return two;
  return five;
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// --- 6. Рендеринг интерфейса ---
function renderCategoryChips() {
  categoriesFilterEl.innerHTML = CATEGORIES.map(cat => {
    const isActive = state.selectedFilter === cat.id;
    return `
      <button 
        type="button" 
        data-cat="${cat.id}" 
        class="chip ${isActive ? 'active' : ''}"
        role="tab"
        aria-selected="${isActive}"
      >
        #${cat.name}
      </button>
    `;
  }).join('');
}

function renderCategoryPicker() {
  const cats = CATEGORIES.filter(c => c.id !== 'all');
  catPickerContainerEl.innerHTML = cats.map(cat => {
    const isSelected = state.selectedCatForNew === cat.id;
    return `
      <button 
        type="button" 
        data-picker-id="${cat.id}" 
        class="cat-picker-item ${isSelected ? 'selected' : ''}"
        role="radio"
        aria-checked="${isSelected}"
      >
        <div class="cat-picker-icon-badge">
          ${cat.icon}
        </div>
        <span class="cat-picker-name">${cat.name}</span>
      </button>
    `;
  }).join('');
}

function renderApp() {
  const totalSpent = state.transactions.reduce((acc, curr) => acc + curr.amount, 0);

  balanceValueEl.textContent = formatRub(state.balance);
  totalSpentBadgeEl.textContent = formatRub(totalSpent);

  // Скрытие плашки баланса при активном поиске/фильтре
  const hasFilter = state.selectedFilter !== 'all';
  const hasSearch = Boolean(state.searchQuery.trim());
  if (hasFilter || hasSearch) {
    balanceCardEl.classList.add('hidden');
  } else {
    balanceCardEl.classList.remove('hidden');
  }

  // Фильтрация
  const q = state.searchQuery.toLowerCase().trim();
  const filtered = state.transactions.filter(tx => {
    const matchesCat = state.selectedFilter === 'all' || tx.categoryId === state.selectedFilter;
    const matchesText = !q || 
      (tx.comment && tx.comment.toLowerCase().includes(q)) ||
      (tx.place && tx.place.toLowerCase().includes(q));
    return matchesCat && matchesText;
  });

  txCountBadgeEl.textContent = `${filtered.length} ${getNounPlural(filtered.length, 'запись', 'записи', 'записей')}`;

  if (filtered.length === 0) {
    transactionsListEl.innerHTML = '';
    emptyStateEl.classList.remove('hidden');
  } else {
    emptyStateEl.classList.remove('hidden');
    emptyStateEl.classList.add('hidden');
    transactionsListEl.innerHTML = filtered.map(tx => {
      const cat = CATEGORIES.find(c => c.id === tx.categoryId) || CATEGORIES[1];
      const percent = totalSpent > 0 ? Math.round((tx.amount / totalSpent) * 100) : 0;
      const barWidth = percent < 4 ? 4 : percent;

      return `
        <div class="tx-swipe-wrapper" data-tx-wrapper="${tx.id}">
          <!-- Underlying Red Action Button for Swipe-to-Delete -->
          <button 
            type="button" 
            data-action="delete" 
            data-id="${tx.id}" 
            class="tx-delete-action"
            title="Удалить запись"
            aria-label="Удалить расход ${escapeHtml(tx.comment)}"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            <span>Удалить</span>
          </button>

          <!-- Front Swipe Row -->
          <div class="tx-item" data-tx-row="${tx.id}">
            <div class="tx-icon-badge">
              ${cat.icon}
            </div>
            
            <div class="tx-info">
              <div class="tx-row-top">
                <span class="tx-title">${escapeHtml(tx.comment)}</span>
                ${tx.place ? `<span class="tx-place-badge">${escapeHtml(tx.place)}</span>` : ''}
              </div>
              <div class="progress-track">
                <div 
                  class="progress-fill" 
                  style="width: ${barWidth}%; background-color: ${cat.hex};"
                ></div>
              </div>
            </div>

            <div class="tx-amount-col">
              <span class="tx-amount num-tabular">${formatRub(tx.amount)}</span>
              <span class="tx-percent num-tabular">${percent}%</span>
            </div>

            <div class="tx-chevron-indicator">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        </div>
      `;
    }).join('');

    attachSwipeListeners();
  }
}

// --- 7. Нативный iOS жест Swipe-to-delete ---
let activeSwipedRow = null;

function attachSwipeListeners() {
  const rows = transactionsListEl.querySelectorAll('[data-tx-row]');
  rows.forEach(row => {
    let startX = 0;
    let currentX = 0;
    let isSwiping = false;

    row.addEventListener('touchstart', (e) => {
      // Закрываем любую другую открытую строку
      if (activeSwipedRow && activeSwipedRow !== row) {
        closeSwipedRow(activeSwipedRow);
      }
      startX = e.touches[0].clientX;
      currentX = startX;
      isSwiping = true;
      row.style.transition = 'none';
    }, { passive: true });

    row.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      currentX = e.touches[0].clientX;
      const diffX = currentX - startX;

      // Свайп только влево (до 84px с легким сопротивлением)
      if (diffX < 0) {
        const translate = Math.max(diffX, -95);
        row.style.transform = `translateX(${translate}px)`;
      } else if (row.dataset.open === 'true') {
        // Если была открыта, тянем вправо
        const translate = Math.min(diffX - 84, 0);
        row.style.transform = `translateX(${translate}px)`;
      }
    }, { passive: true });

    row.addEventListener('touchend', () => {
      if (!isSwiping) return;
      isSwiping = false;
      const diffX = currentX - startX;
      row.style.transition = 'transform 0.25s var(--ios-spring)';

      if (diffX < -38) {
        // Раскрыть кнопку удаления
        row.style.transform = 'translateX(-84px)';
        row.dataset.open = 'true';
        activeSwipedRow = row;
        triggerHaptic('light');
      } else {
        // Закрыть
        row.style.transform = 'translateX(0px)';
        delete row.dataset.open;
        if (activeSwipedRow === row) activeSwipedRow = null;
      }
    });

    // Клик по строке: если открыта — закрываем
    row.addEventListener('click', (e) => {
      if (row.dataset.open === 'true') {
        e.stopPropagation();
        closeSwipedRow(row);
      }
    });
  });
}

function closeSwipedRow(row) {
  if (!row) return;
  row.style.transition = 'transform 0.25s var(--ios-spring)';
  row.style.transform = 'translateX(0px)';
  delete row.dataset.open;
  if (activeSwipedRow === row) activeSwipedRow = null;
}

// Закрытие открытого свайпа при клике вне списка
document.addEventListener('click', (e) => {
  if (!e.target.closest('[data-tx-wrapper]') && activeSwipedRow) {
    closeSwipedRow(activeSwipedRow);
  }
});

// --- 8. Нативная шторка (Modal Sheet) с Drag-to-dismiss ---
let sheetStartY = 0;
let isDraggingSheet = false;

function openBottomSheet() {
  triggerHaptic('medium');
  sheetBackdropEl.classList.remove('hidden');
  bottomSheetEl.classList.remove('hidden');
  bottomSheetEl.style.transform = '';
  renderCategoryPicker();
  setTimeout(() => amountInputEl.focus(), 200);
}

function closeBottomSheet() {
  triggerHaptic('light');
  bottomSheetEl.style.transition = 'transform 0.25s var(--ios-spring)';
  bottomSheetEl.style.transform = 'translateY(100%)';
  sheetBackdropEl.style.opacity = '0';

  setTimeout(() => {
    sheetBackdropEl.classList.add('hidden');
    bottomSheetEl.classList.add('hidden');
    bottomSheetEl.style.transform = '';
    sheetBackdropEl.style.opacity = '';
    amountInputEl.value = '';
    commentInputEl.value = '';
    placeInputEl.value = '';
  }, 250);
}

function initSheetDrag() {
  sheetHandleWrapperEl.addEventListener('touchstart', (e) => {
    sheetStartY = e.touches[0].clientY;
    isDraggingSheet = true;
    bottomSheetEl.style.transition = 'none';
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDraggingSheet) return;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - sheetStartY;
    if (diffY > 0) {
      bottomSheetEl.style.transform = `translateY(${diffY}px)`;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (!isDraggingSheet) return;
    isDraggingSheet = false;
    const currentY = e.changedTouches[0].clientY;
    const diffY = currentY - sheetStartY;

    if (diffY > 80) {
      closeBottomSheet();
    } else {
      bottomSheetEl.style.transition = 'transform 0.25s var(--ios-spring)';
      bottomSheetEl.style.transform = 'translateY(0)';
    }
  });
}

// --- 9. Слушатели событий ---
function setupEventListeners() {
  // Фильтры категорий
  categoriesFilterEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-cat]');
    if (!btn) return;
    triggerHaptic('selection');
    state.selectedFilter = btn.dataset.cat;
    renderCategoryChips();
    renderApp();
  });

  // Поиск
  searchInputEl.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    if (state.searchQuery) {
      searchClearBtnEl.classList.remove('hidden');
    } else {
      searchClearBtnEl.classList.add('hidden');
    }
    renderApp();
  });

  // Очистка поиска
  searchClearBtnEl.addEventListener('click', () => {
    triggerHaptic('light');
    state.searchQuery = '';
    searchInputEl.value = '';
    searchClearBtnEl.classList.add('hidden');
    renderApp();
  });

  // Модалка добавления
  fabBtnEl.addEventListener('click', openBottomSheet);
  sheetCloseBtnEl.addEventListener('click', closeBottomSheet);
  sheetBackdropEl.addEventListener('click', closeBottomSheet);

  // Выбор категории внутри шторки
  catPickerContainerEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-picker-id]');
    if (!btn) return;
    triggerHaptic('selection');
    state.selectedCatForNew = btn.dataset.pickerId;
    renderCategoryPicker();
  });

  // Отправка формы расхода
  addFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const amountNum = parseFloat(amountInputEl.value);
    if (!amountNum || isNaN(amountNum) || amountNum <= 0) {
      alert('Пожалуйста, введите корректную сумму');
      return;
    }

    const comment = commentInputEl.value.trim() || 'Расход';
    const place = placeInputEl.value.trim() || '';

    const newTx = {
      id: Date.now(),
      categoryId: state.selectedCatForNew,
      amount: amountNum,
      comment: comment,
      place: place,
      date: new Date().toISOString()
    };

    state.transactions.unshift(newTx);
    state.balance -= amountNum;
    saveState();
    triggerHaptic('success');

    closeBottomSheet();
    renderApp();
  });

  // Удаление расхода
  transactionsListEl.addEventListener('click', (e) => {
    const delBtn = e.target.closest('button[data-action="delete"]');
    if (!delBtn) return;
    e.stopPropagation();

    const id = Number(delBtn.dataset.id);
    const tx = state.transactions.find(t => t.id === id);
    if (!tx) return;

    if (confirm(`Удалить расход "${tx.comment}" (${formatRub(tx.amount)})?`)) {
      triggerHaptic('warning');
      state.balance += tx.amount;
      state.transactions = state.transactions.filter(t => t.id !== id);
      saveState();
      renderApp();
    }
  });

  // Сброс к исходным данным со скриншота
  resetBtnEl.addEventListener('click', () => {
    if (confirm('Сбросить данные к начальным значениям со скриншота (19 605 ₽)?')) {
      triggerHaptic('heavy');
      localStorage.removeItem(STORAGE_KEY);
      state.balance = INITIAL_BALANCE;
      state.transactions = [...INITIAL_TRANSACTIONS];
      state.selectedFilter = 'all';
      state.searchQuery = '';
      searchInputEl.value = '';
      searchClearBtnEl.classList.add('hidden');
      saveState();
      renderCategoryChips();
      renderApp();
    }
  });

  // Закрытие шторки по клавише Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !bottomSheetEl.classList.contains('hidden')) {
      closeBottomSheet();
    }
  });

  initSheetDrag();
}

// --- 10. Инициализация ---
function init() {
  loadState();
  renderCategoryChips();
  renderCategoryPicker();
  renderApp();
  setupEventListeners();
}

document.addEventListener('DOMContentLoaded', init);
