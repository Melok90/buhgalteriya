/**
 * Приложение Бухгалтерия — Персональный учет трат
 * Архитектура: Модульный Vanilla JavaScript по стандартам Apple HIG
 */

// --- 1. Конфигурация и начальные данные со скриншота ---
const STORAGE_KEY = 'accounting_app_data_v2';

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
    hex: '#ffd60a', 
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`
  }, 
  { 
    id: 'shopping', 
    name: 'Покупки', 
    hex: '#ff453a', 
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`
  }, 
  { 
    id: 'home', 
    name: 'Дом', 
    hex: '#64d2ff', 
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`
  }, 
  { 
    id: 'health', 
    name: 'Здоровье', 
    hex: '#30d158', 
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`
  }, 
  { 
    id: 'sport', 
    name: 'Спорт', 
    hex: '#32ade6', 
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1Z"/><path d="M22 4v16a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1Z"/><path d="M6 12h12"/><path d="M6 8h2v8H6z"/><path d="M16 8h2v8h-2z"/></svg>`
  }, 
  { 
    id: 'coffee', 
    name: 'Кафе', 
    hex: '#ff9f0a', 
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>`
  },
  { 
    id: 'entertainment', 
    name: 'Развлечения', 
    hex: '#ff375f', 
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>`
  },
  {
    id: 'other',
    name: 'Другое',
    hex: '#8e8e93',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>`
  }
];

const INCOME_CATEGORIES = [
  {
    id: 'salary',
    name: 'Зарплата',
    hex: '#30d158',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>`
  },
  {
    id: 'transfer',
    name: 'Перевод',
    hex: '#0a84ff',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></svg>`
  },
  {
    id: 'cashback',
    name: 'Кэшбэк',
    hex: '#ffd60a',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="5" y1="5" y2="19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></svg>`
  },
  {
    id: 'invest',
    name: 'Инвест',
    hex: '#bf5af2',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`
  },
  {
    id: 'business',
    name: 'Бизнес',
    hex: '#64d2ff',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`
  },
  {
    id: 'gift',
    name: 'Подарок',
    hex: '#ff375f',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect width="20" height="5" x="2" y="7"/><line x1="12" x2="12" y1="22" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>`
  },
  {
    id: 'freelance',
    name: 'Фриланс',
    hex: '#ff9f0a',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="12" x="3" y="4" rx="2"/><line x1="2" x2="22" y1="20" y2="20"/></svg>`
  },
  {
    id: 'income_other',
    name: 'Другое',
    hex: '#8e8e93',
    icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/><circle cx="5" cy="12" r="1.5"/></svg>`
  }
];

const INITIAL_BALANCE = 45716;

const INITIAL_TRANSACTIONS = [
  // Вчера
  { id: 1, categoryId: 'food', amount: 25555, comment: 'Еда', place: '', date: new Date(Date.now() - 86400000).toISOString() },
  // 19 сентября
  { id: 2, categoryId: 'transport', amount: 345, comment: 'Транспорт', place: '', date: new Date(Date.now() - 172800000).toISOString() },
  { id: 3, categoryId: 'food', amount: 4334, comment: 'Еда', place: '', date: new Date(Date.now() - 172800000 - 3600000).toISOString() },
  { id: 4, categoryId: 'food', amount: 53, comment: 'dyeryeryeeyeryer', place: '', date: new Date(Date.now() - 172800000 - 7200000).toISOString() },
  { id: 5, categoryId: 'shopping', amount: 500, comment: 'Покупки', place: '', date: new Date(Date.now() - 172800000 - 10800000).toISOString() },
  { id: 6, categoryId: 'food', amount: 34534, comment: 'Еда', place: '', date: new Date(Date.now() - 172800000 - 14400000).toISOString() },
  { id: 7, categoryId: 'shopping', amount: 4545, comment: 'Расход', place: 'Wildberries', date: new Date(Date.now() - 172800000 - 18000000).toISOString() },
  // Ранее в сентябре
  { id: 8, categoryId: 'shopping', amount: 6998, comment: 'Маркетплейс', place: 'Ozon', date: new Date(Date.now() - 250000000).toISOString() },
  { id: 9, categoryId: 'transport', amount: 5600, comment: 'Бензин', place: 'Лукойл', date: new Date(Date.now() - 320000000).toISOString() },
  { id: 10, categoryId: 'coffee', amount: 1820, comment: 'Кафе', place: 'Surf Coffee', date: new Date(Date.now() - 400000000).toISOString() },
  { id: 11, categoryId: 'entertainment', amount: 1534, comment: 'Развлечения', place: 'Кино', date: new Date(Date.now() - 480000000).toISOString() },
  { id: 12, categoryId: 'home', amount: 2221, comment: 'ЖКХ', place: 'Мосэнерго', date: new Date(Date.now() - 550000000).toISOString() },
  { id: 13, categoryId: 'health', amount: 500, comment: 'Аптека', place: 'Ригла', date: new Date(Date.now() - 620000000).toISOString() }
];

const PRIVACY_KEY = 'accounting_privacy_mode';

// --- 2. Управление состоянием ---
let state = {
  balance: INITIAL_BALANCE,
  transactions: [...INITIAL_TRANSACTIONS],
  selectedFilter: 'all',
  searchQuery: '',
  selectedCatForNew: 'food',
  selectedIncomeCatForNew: 'salary',
  isPrivate: localStorage.getItem(PRIVACY_KEY) === 'true',
  sheetType: 'expense',
  numpadBuffer: '0',
  editingTxId: null,
  recentTxId: null
};

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (typeof parsed.balance === 'number') {
        state.balance = parsed.balance;
        // Если был сохранен старый отрицательный демо-баланс (-45716), делаем его положительным
        if (state.balance === -45716) {
          state.balance = INITIAL_BALANCE;
        }
      }
      if (Array.isArray(parsed.transactions)) state.transactions = parsed.transactions;
    }
    const priv = localStorage.getItem(PRIVACY_KEY);
    if (priv !== null) {
      state.isPrivate = priv === 'true';
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
    localStorage.setItem(PRIVACY_KEY, String(state.isPrivate));
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
const searchWrapperEl = document.querySelector('.search-wrapper');
const searchTagsContainerEl = document.getElementById('search-tags-container');
const categoriesFilterEl = document.getElementById('categories-filter');
const transactionsListEl = document.getElementById('transactions-list');
const balanceCardEl = document.getElementById('balance-card');
const balanceValueEl = document.getElementById('balance-value');
const balanceAmountTriggerEl = document.getElementById('balance-amount-trigger');
const privacyToggleBtnEl = document.getElementById('privacy-toggle-btn');
const spendingPeriodLabelEl = document.getElementById('spending-period-label');
const totalSpentBadgeEl = document.getElementById('total-spent-amount');
const dailyAvgAmountEl = document.getElementById('daily-avg-amount');
const quickAnalyticsBtnEl = document.getElementById('quick-analytics-btn');
const expenseStructureCardEl = document.getElementById('expense-structure-card');
const expenseStackedBarEl = document.getElementById('expense-stacked-bar');
const expenseCategoriesGridEl = document.getElementById('expense-categories-grid');
const txCountBadgeEl = document.getElementById('tx-count-badge');
const searchInputEl = document.getElementById('search-input');
const searchClearBtnEl = document.getElementById('search-clear-btn');
const emptyStateEl = document.getElementById('empty-state');
const fabBtnEl = document.getElementById('fab-add-btn');

// Bottom Sheet (Расход / Пополнение)
const sheetBackdropEl = document.getElementById('sheet-backdrop');
const bottomSheetEl = document.getElementById('bottom-sheet');
const sheetCloseBtnEl = document.getElementById('sheet-close-btn');
const sheetHandleWrapperEl = document.getElementById('sheet-handle-wrapper');
const typeExpenseBtnEl = document.getElementById('type-expense-btn');
const typeIncomeBtnEl = document.getElementById('type-income-btn');
const addFormEl = document.getElementById('add-form');
const numpadAmountValEl = document.getElementById('numpad-amount-value');
const quickChipsRowEl = document.querySelector('.quick-chips-row');
const selectedCategoryBtnEl = document.getElementById('selected-category-btn');
const selectedCatIconBadgeEl = document.getElementById('selected-cat-icon-badge');
const selectedCatNameEl = document.getElementById('selected-cat-name');
const selectedCatSubtitleEl = document.getElementById('selected-cat-subtitle');
const sheetCommentInputEl = document.getElementById('sheet-comment-input');
const sheetCommentClearBtnEl = document.getElementById('sheet-comment-clear-btn');
const calculatorKeypadEl = document.querySelector('.calculator-keypad');
const submitBtnEl = document.getElementById('submit-btn');
const sheetDeleteTxBtnEl = document.getElementById('sheet-delete-tx-btn');

// Top Header 3-Dots Menu
const menuBtnEl = document.getElementById('menu-btn');
const headerMenuPopoverEl = document.getElementById('header-menu-popover');
const menuAccountBtnEl = document.getElementById('menu-account-btn');
const menuSaveBtnEl = document.getElementById('menu-save-btn');
const menuRestoreBtnEl = document.getElementById('menu-restore-btn');
const menuResetBtnEl = document.getElementById('menu-reset-btn');
const backupFileInputEl = document.getElementById('backup-file-input');

// Account Settings & Reset Sheet
const accountSettingsBtnEl = document.getElementById('account-settings-btn');
const accountBackdropEl = document.getElementById('account-backdrop');
const accountSheetEl = document.getElementById('account-sheet');
const accountCloseBtnEl = document.getElementById('account-close-btn');
const accountHandleWrapperEl = document.getElementById('account-handle-wrapper');
const accountBalanceInputEl = document.getElementById('account-balance-input');
const accountClearTxsToggleEl = document.getElementById('account-clear-txs-toggle');
const accountSaveBtnEl = document.getElementById('account-save-btn');
const accountRestoreDemoBtnEl = document.getElementById('account-restore-demo-btn');

// Action Toast (Отмена / Редактирование последней операции)
const actionToastEl = document.getElementById('action-toast');
const toastTextEl = document.getElementById('toast-text');
const toastEditBtnEl = document.getElementById('toast-edit-btn');
const toastUndoBtnEl = document.getElementById('toast-undo-btn');
const toastCloseBtnEl = document.getElementById('toast-close-btn');

// Category Picker Modal Sheet
const categoryPickerBackdropEl = document.getElementById('category-picker-backdrop');
const categoryPickerSheetEl = document.getElementById('category-picker-sheet');
const categoryPickerCloseBtnEl = document.getElementById('cat-picker-close-btn');
const categoryPickerHandleWrapperEl = document.getElementById('cat-picker-handle-wrapper');
const categoryPickerListEl = document.getElementById('cat-picker-list');

// Analytics Sheet
const analyticsBackdropEl = document.getElementById('analytics-backdrop');
const analyticsSheetEl = document.getElementById('analytics-sheet');
const analyticsCloseBtnEl = document.getElementById('analytics-close-btn');
const analyticsHandleWrapperEl = document.getElementById('analytics-handle-wrapper');
const analyticsBodyEl = document.getElementById('analytics-body');

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

function getNumpadAmountNumber() {
  return parseFloat(state.numpadBuffer) || 0;
}

function updateNumpadDisplay() {
  if (!numpadAmountValEl) return;
  const parts = state.numpadBuffer.split('.');
  const intPart = parseInt(parts[0], 10) || 0;
  let formatted = intPart.toLocaleString('ru-RU');
  if (parts.length > 1) {
    formatted += '.' + parts[1];
  }
  numpadAmountValEl.textContent = formatted;

  const amountNum = getNumpadAmountNumber();
  const isIncome = state.sheetType === 'income';

  if (submitBtnEl) {
    submitBtnEl.disabled = amountNum <= 0;
    if (state.editingTxId) {
      submitBtnEl.textContent = amountNum > 0
        ? `Сохранить изменения · ${formatRub(amountNum)}`
        : 'Сохранить изменения';
    } else {
      if (amountNum > 0) {
        submitBtnEl.textContent = isIncome
          ? `Пополнить · ${formatRub(amountNum)}`
          : `Добавить расход · ${formatRub(amountNum)}`;
      } else {
        submitBtnEl.textContent = isIncome ? 'Пополнить баланс' : 'Добавить расход';
      }
    }
  }
}

function handleNumpadKey(key) {
  if (key === 'del') {
    if (state.numpadBuffer.length <= 1) {
      state.numpadBuffer = '0';
    } else {
      state.numpadBuffer = state.numpadBuffer.slice(0, -1);
      if (state.numpadBuffer === '') {
        state.numpadBuffer = '0';
      }
    }
  } else if (key === '.') {
    if (!state.numpadBuffer.includes('.')) {
      state.numpadBuffer += '.';
    }
  } else if (key >= '0' && key <= '9') {
    if (state.numpadBuffer === '0') {
      state.numpadBuffer = key;
    } else {
      const parts = state.numpadBuffer.split('.');
      if (parts.length === 2 && parts[1].length >= 2) {
        return; // максимум 2 знака после запятой
      }
      if (state.numpadBuffer.replace('.', '').length < 9) {
        state.numpadBuffer += key;
      }
    }
  }
  triggerHaptic('light');
  updateNumpadDisplay();
}

function handleQuickChip(amountToAdd) {
  triggerHaptic('selection');
  const current = getNumpadAmountNumber();
  const next = current + amountToAdd;
  state.numpadBuffer = String(next);
  updateNumpadDisplay();
}

function getCategoryTodayTotal(catId, isIncome) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = now.getDate();

  return state.transactions
    .filter(tx => {
      const isTxIncome = tx.type === 'income';
      if (isTxIncome !== isIncome) return false;
      if (tx.categoryId !== catId) return false;
      if (!tx.date) return false;
      const d = new Date(tx.date);
      return d.getFullYear() === currentYear &&
             d.getMonth() === currentMonth &&
             d.getDate() === currentDay;
    })
    .reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
}

function renderSelectedCategoryCard() {
  if (!selectedCategoryBtnEl) return;
  const isIncome = state.sheetType === 'income';
  const cats = isIncome ? INCOME_CATEGORIES : CATEGORIES.filter(c => c.id !== 'all');
  const currentCatId = isIncome ? state.selectedIncomeCatForNew : state.selectedCatForNew;

  let activeCat = cats.find(c => c.id === currentCatId);
  if (!activeCat) {
    activeCat = cats[0];
    if (isIncome) state.selectedIncomeCatForNew = activeCat.id;
    else state.selectedCatForNew = activeCat.id;
  }

  if (selectedCatIconBadgeEl) {
    selectedCatIconBadgeEl.innerHTML = activeCat.icon;
    selectedCatIconBadgeEl.style.setProperty('--cat-bg', activeCat.hex || '#30d158');
  }
  if (selectedCatNameEl) {
    selectedCatNameEl.textContent = activeCat.name;
  }
  if (selectedCatSubtitleEl) {
    const todayTotal = getCategoryTodayTotal(activeCat.id, isIncome);
    selectedCatSubtitleEl.textContent = `Сегодня · ${formatRub(todayTotal)}`;
  }
}

function renderCategoryPickerList() {
  if (!categoryPickerListEl) return;
  const isIncome = state.sheetType === 'income';
  const cats = isIncome ? INCOME_CATEGORIES : CATEGORIES.filter(c => c.id !== 'all');
  const currentCatId = isIncome ? state.selectedIncomeCatForNew : state.selectedCatForNew;

  categoryPickerListEl.innerHTML = cats.map(cat => {
    const isSelected = cat.id === currentCatId;
    const todayTotal = getCategoryTodayTotal(cat.id, isIncome);
    return `
      <div 
        class="cat-picker-item ${isSelected ? 'selected' : ''}" 
        data-cat-id="${cat.id}"
        role="button"
        tabindex="0"
      >
        <div class="cat-picker-left">
          <div class="cat-picker-badge" style="--cat-color: ${cat.hex || '#6366f1'}">
            ${cat.icon}
          </div>
          <div class="cat-picker-info">
            <div class="cat-picker-name">${escapeHtml(cat.name)}</div>
            <div class="cat-picker-today">Сегодня · ${formatRub(todayTotal)}</div>
          </div>
        </div>
        ${isSelected ? `
          <svg class="cat-picker-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        ` : ''}
      </div>
    `;
  }).join('');
}

function openCategoryPicker() {
  triggerHaptic('medium');
  renderCategoryPickerList();
  if (categoryPickerBackdropEl && categoryPickerSheetEl) {
    categoryPickerBackdropEl.classList.remove('hidden');
    categoryPickerSheetEl.classList.remove('hidden');
    categoryPickerSheetEl.style.transform = '';
  }
}

function closeCategoryPicker() {
  triggerHaptic('light');
  if (!categoryPickerSheetEl || !categoryPickerBackdropEl) return;
  categoryPickerSheetEl.style.transition = 'transform 0.25s var(--ios-spring)';
  categoryPickerSheetEl.style.transform = 'translateY(100%)';
  categoryPickerBackdropEl.style.opacity = '0';

  setTimeout(() => {
    categoryPickerBackdropEl.classList.add('hidden');
    categoryPickerSheetEl.classList.add('hidden');
    categoryPickerSheetEl.style.transform = '';
    categoryPickerBackdropEl.style.opacity = '';
  }, 250);
}

function initCategoryPickerDrag() {
  if (!categoryPickerHandleWrapperEl || !categoryPickerSheetEl) return;
  let startY = 0;
  let isDragging = false;

  categoryPickerHandleWrapperEl.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
    isDragging = true;
    categoryPickerSheetEl.style.transition = 'none';
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - startY;
    if (diffY > 0) {
      categoryPickerSheetEl.style.transform = `translateY(${diffY}px)`;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const currentY = e.changedTouches[0].clientY;
    const diffY = currentY - startY;

    if (diffY > 80) {
      closeCategoryPicker();
    } else {
      categoryPickerSheetEl.style.transition = 'transform 0.25s var(--ios-spring)';
      categoryPickerSheetEl.style.transform = 'translateY(0)';
    }
  });
}

function renderPrivacyIcon() {
  const privacyIconEl = document.getElementById('privacy-icon');
  if (!privacyIconEl) return;
  if (state.isPrivate) {
    privacyIconEl.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
    `;
    privacyToggleBtnEl.setAttribute('aria-label', 'Показать баланс');
    privacyToggleBtnEl.setAttribute('title', 'Показать баланс');
  } else {
    privacyIconEl.innerHTML = `
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    `;
    privacyToggleBtnEl.setAttribute('aria-label', 'Скрыть баланс');
    privacyToggleBtnEl.setAttribute('title', 'Скрыть баланс');
  }
}

function togglePrivacy() {
  triggerHaptic('light');
  state.isPrivate = !state.isPrivate;
  saveState();
  renderApp();
}

// --- 5.1 Вспомогательные функции для дат и группировки ---
function getDateKey(dateInput) {
  if (!dateInput) return 'unknown';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return 'unknown';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatGroupDateTitle(dateKey) {
  if (dateKey === 'unknown') return 'Ранее';
  const [y, m, d] = dateKey.split('-').map(Number);
  const txDate = new Date(y, m - 1, d);
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = Math.round((today - txDate) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Сегодня';
  if (diffDays === 1) return 'Вчера';

  const options = { day: 'numeric', month: 'long' };
  if (y !== now.getFullYear()) {
    options.year = 'numeric';
  }
  return txDate.toLocaleDateString('ru-RU', options);
}

function groupTransactionsByDate(txList) {
  const groups = new Map();

  txList.forEach(tx => {
    const key = getDateKey(tx.date);
    if (!groups.has(key)) {
      groups.set(key, {
        dateKey: key,
        title: formatGroupDateTitle(key),
        total: 0,
        items: []
      });
    }
    const group = groups.get(key);
    group.items.push(tx);
    if (tx.type !== 'income') {
      group.total += Number(tx.amount) || 0;
    }
  });

  return Array.from(groups.values()).sort((a, b) => b.dateKey.localeCompare(a.dateKey));
}

// --- 5.2 Расчет и рендеринг блока «Структура расходов» ---
function renderExpenseStructure() {
  if (!expenseStackedBarEl || !expenseCategoriesGridEl) return;

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // Все расходы (исключая доходы)
  const allExpenseTxs = state.transactions.filter(tx => tx.type !== 'income');
  // Расходы текущего месяца
  const monthExpenseTxs = allExpenseTxs.filter(tx => {
    if (!tx.date) return false;
    const d = new Date(tx.date);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
  });

  const expenseTxs = monthExpenseTxs.length > 0 ? monthExpenseTxs : allExpenseTxs;
  const totalExpense = expenseTxs.reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);

  // Группировка расходов по категориям
  const catSums = {};
  expenseTxs.forEach(tx => {
    const catId = tx.categoryId || 'other';
    catSums[catId] = (catSums[catId] || 0) + (Number(tx.amount) || 0);
  });

  // Активные категории с расходами
  const activeCats = Object.keys(catSums)
    .map(catId => {
      const catDef = CATEGORIES.find(c => c.id === catId) || {
        id: catId,
        name: catId === 'other' ? 'Другое' : catId,
        hex: '#8e8e93'
      };
      const amount = catSums[catId];
      const percent = totalExpense > 0 ? (amount / totalExpense) * 100 : 0;
      return {
        id: catId,
        name: catDef.name,
        hex: catDef.hex || '#8e8e93',
        amount,
        percent
      };
    })
    .sort((a, b) => b.amount - a.amount);

  if (activeCats.length === 0 || totalExpense === 0) {
    expenseStackedBarEl.innerHTML = '<div class="stacked-bar-empty"></div>';
    expenseCategoriesGridEl.innerHTML = '<div style="grid-column: 1 / -1; color: var(--ios-label-tertiary); font-size: 13px; text-align: center; padding: 12px 0;">Нет расходов за выбранный период</div>';
    return;
  }

  // Ограничение: максимум 6 категорий в блоке структуры расходов
  let displayCats = activeCats;
  if (activeCats.length > 6) {
    const top5 = activeCats.slice(0, 5);
    const others = activeCats.slice(5);
    const otherAmount = others.reduce((sum, c) => sum + c.amount, 0);
    const otherPercent = totalExpense > 0 ? (otherAmount / totalExpense) * 100 : 0;
    top5.push({
      id: 'other',
      name: 'Другое',
      hex: '#8e8e93',
      amount: otherAmount,
      percent: otherPercent
    });
    displayCats = top5;
  }

  const hasFilter = state.selectedFilter !== 'all';

  // 1. Stacked Bar Сегменты
  expenseStackedBarEl.innerHTML = displayCats.map(cat => {
    const isSelected = state.selectedFilter === cat.id;
    const isDimmed = hasFilter && !isSelected;
    const flexWeight = Math.max(cat.percent, 2);
    const formattedPct = cat.percent < 1 ? '<1%' : `${cat.percent.toFixed(1)}%`;
    return `
      <div 
        class="stacked-bar-segment ${isSelected ? 'is-selected' : ''} ${isDimmed ? 'is-dimmed' : ''}"
        data-cat-id="${cat.id}"
        style="--cat-color: ${cat.hex}; flex: ${flexWeight} 1 0%;"
        title="${escapeHtml(cat.name)}: ${formatRub(cat.amount)} (${formattedPct})"
        role="button"
        tabindex="0"
        aria-label="${escapeHtml(cat.name)} ${formattedPct}"
      ></div>
    `;
  }).join('');

  // 2. Список категорий: Все категории отображаются как полноразмерные строки со стрелкой
  expenseCategoriesGridEl.innerHTML = displayCats.map(cat => {
    const isSelected = state.selectedFilter === cat.id;
    const isDimmed = hasFilter && !isSelected;
    const formattedPct = cat.percent < 0.5 ? '<1%' : `${cat.percent.toFixed(1)}%`;
    return `
      <div 
        class="cat-breakdown-row ${isSelected ? 'is-selected' : ''} ${isDimmed ? 'is-dimmed' : ''}"
        data-cat-id="${cat.id}"
        role="button"
        tabindex="0"
        aria-pressed="${isSelected}"
      >
        <div class="cat-row-left">
          <div class="cat-dot" style="--cat-color: ${cat.hex};"></div>
          <span class="cat-row-name">${escapeHtml(cat.name)}</span>
        </div>
        <span class="cat-row-amount num-tabular">${formatRub(cat.amount)}</span>
        <span class="cat-row-percent num-tabular">${formattedPct}</span>
        <div class="cat-row-chevron" aria-hidden="true">
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
    `;
  }).join('');

  // Интерактивный клик по категориям для фильтрации
  const catElements = [
    ...expenseStackedBarEl.querySelectorAll('[data-cat-id]'),
    ...expenseCategoriesGridEl.querySelectorAll('[data-cat-id]')
  ];

  catElements.forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetCatId = el.getAttribute('data-cat-id');
      triggerHaptic('selection');
      if (state.selectedFilter === targetCatId) {
        state.selectedFilter = 'all';
      } else {
        state.selectedFilter = targetCatId;
      }
      renderCategoryChips();
      renderApp();
    });
  });
}

function renderApp() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = Math.max(now.getDate(), 1);
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  const monthName = monthNames[currentMonth];

  // Расходы текущего месяца (исключая пополнения)
  const monthExpenseTxs = state.transactions.filter(tx => {
    if (tx.type === 'income') return false;
    if (!tx.date) return false;
    const d = new Date(tx.date);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
  });

  const allExpenseTxs = state.transactions.filter(tx => tx.type !== 'income');
  const monthSpent = monthExpenseTxs.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  const totalSpent = allExpenseTxs.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  const displaySpent = monthSpent > 0 ? monthSpent : totalSpent;
  const periodTitle = monthSpent > 0 ? monthName : 'Всего трат';
  const dailyAvg = Math.round(displaySpent / currentDay);

  if (spendingPeriodLabelEl) {
    spendingPeriodLabelEl.textContent = periodTitle;
  }

  // Режим приватности (маскировка сумм)
  if (state.isPrivate) {
    balanceValueEl.textContent = '•••••• ₽';
    totalSpentBadgeEl.textContent = '•••••• ₽';
    if (dailyAvgAmountEl) dailyAvgAmountEl.textContent = '~ ••• ₽';
  } else {
    balanceValueEl.textContent = formatRub(state.balance);
    totalSpentBadgeEl.textContent = formatRub(displaySpent);
    if (dailyAvgAmountEl) dailyAvgAmountEl.textContent = `~ ${formatRub(dailyAvg)}`;
  }
  renderPrivacyIcon();

  // Рендеринг аналитического блока «Структура расходов»
  renderExpenseStructure();

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
    const dateGroups = groupTransactionsByDate(filtered);

    transactionsListEl.innerHTML = dateGroups.map(group => {
      const itemsHtml = group.items.map(tx => {
        const isIncome = tx.type === 'income';
        const cat = isIncome
          ? (INCOME_CATEGORIES.find(c => c.id === tx.categoryId) || INCOME_CATEGORIES[0])
          : (CATEGORIES.find(c => c.id === tx.categoryId) || CATEGORIES[1]);
        const metaParts = [];
        if (tx.place) metaParts.push(escapeHtml(tx.place));
        const catName = cat ? cat.name : (isIncome ? 'Пополнение' : '');
        if (catName && cat.id !== 'all') {
          if (tx.comment !== catName || tx.place) {
            metaParts.push(catName);
          }
        }
        const subtitle = metaParts.join(' · ');

        const catColor = cat ? (cat.hex || '#8e8e93') : (isIncome ? '#30d158' : '#8e8e93');
        const incomeDefaultIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4.5v15m7.5-7.5h-15"/></svg>`;
        const iconSvg = cat ? cat.icon : (isIncome ? incomeDefaultIcon : CATEGORIES[1].icon);
        const amountDisplay = isIncome ? `+${formatRub(tx.amount)}` : formatRub(tx.amount);
        const amountClass = isIncome ? 'tx-amount num-tabular is-income' : 'tx-amount num-tabular';

        return `
          <div class="tx-item" data-tx-row="${tx.id}" role="button" tabindex="0" aria-label="${escapeHtml(tx.comment)}, ${amountDisplay}">
            <div class="tx-icon-badge" style="--cat-color: ${catColor};">
              ${iconSvg}
            </div>
            
            <div class="tx-info">
              <span class="tx-title">${escapeHtml(tx.comment)}</span>
              ${subtitle ? `<span class="tx-subtitle">${subtitle}</span>` : ''}
            </div>

            <div class="tx-amount-col">
              <span class="${amountClass}">${amountDisplay}</span>
            </div>

            <div class="tx-chevron-indicator" aria-hidden="true">
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>
        `;
      }).join('');

      return `
        <section class="date-group-section" aria-label="${group.title}">
          <div class="date-group-header">
            <span class="date-group-title">${group.title}</span>
            <span class="date-group-total num-tabular">−${formatRub(group.total)}</span>
          </div>
          <div class="date-group-card">
            ${itemsHtml}
          </div>
        </section>
      `;
    }).join('');

    // Клик по строке операции открывает модальное окно редактирования
    const rows = transactionsListEl.querySelectorAll('[data-tx-row]');
    rows.forEach(row => {
      row.addEventListener('click', () => {
        const txId = row.dataset.txRow;
        if (txId) {
          openEditSheet(txId);
        }
      });
      row.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const txId = row.dataset.txRow;
          if (txId) {
            openEditSheet(txId);
          }
        }
      });
    });
  }
}

// --- 7. Настройка счёта и ввод своих данных (Account Sheet) ---
let accountSheetStartY = 0;
let isDraggingAccountSheet = false;

function openAccountSheet() {
  triggerHaptic('medium');
  if (accountBalanceInputEl) {
    accountBalanceInputEl.value = state.balance > 0 ? String(state.balance) : '0';
  }
  if (accountClearTxsToggleEl) {
    // Предлагаем очистить операции, если есть что очищать
    accountClearTxsToggleEl.checked = state.transactions.length > 0;
  }
  if (accountBackdropEl && accountSheetEl) {
    accountBackdropEl.classList.remove('hidden');
    accountSheetEl.classList.remove('hidden');
    accountSheetEl.style.transform = '';
  }
  setTimeout(() => {
    if (accountBalanceInputEl) {
      accountBalanceInputEl.focus();
      accountBalanceInputEl.select();
    }
  }, 120);
}

function closeAccountSheet() {
  triggerHaptic('light');
  if (!accountSheetEl || !accountBackdropEl) return;
  accountSheetEl.style.transition = 'transform 0.25s var(--ios-spring)';
  accountSheetEl.style.transform = 'translateY(100%)';
  accountBackdropEl.style.opacity = '0';

  setTimeout(() => {
    accountBackdropEl.classList.add('hidden');
    accountSheetEl.classList.add('hidden');
    accountSheetEl.style.transform = '';
    accountBackdropEl.style.opacity = '';
  }, 250);
}

function initAccountDrag() {
  if (!accountHandleWrapperEl || !accountSheetEl) return;

  accountHandleWrapperEl.addEventListener('touchstart', (e) => {
    accountSheetStartY = e.touches[0].clientY;
    isDraggingAccountSheet = true;
    accountSheetEl.style.transition = 'none';
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDraggingAccountSheet) return;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - accountSheetStartY;
    if (diffY > 0) {
      accountSheetEl.style.transform = `translateY(${diffY}px)`;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (!isDraggingAccountSheet) return;
    isDraggingAccountSheet = false;
    const currentY = e.changedTouches[0].clientY;
    const diffY = currentY - accountSheetStartY;

    if (diffY > 80) {
      closeAccountSheet();
    } else {
      accountSheetEl.style.transition = 'transform 0.25s var(--ios-spring)';
      accountSheetEl.style.transform = 'translateY(0)';
    }
  });
}


// --- 8. Нативная шторка (Modal Sheet) с Drag-to-dismiss ---
let sheetStartY = 0;
let isDraggingSheet = false;

function setSheetType(type) {
  state.sheetType = type;
  const isIncome = type === 'income';

  if (isIncome) {
    typeIncomeBtnEl.classList.add('active');
    typeExpenseBtnEl.classList.remove('active');
    typeIncomeBtnEl.setAttribute('aria-selected', 'true');
    typeExpenseBtnEl.setAttribute('aria-selected', 'false');
  } else {
    typeExpenseBtnEl.classList.add('active');
    typeIncomeBtnEl.classList.remove('active');
    typeExpenseBtnEl.setAttribute('aria-selected', 'true');
    typeIncomeBtnEl.setAttribute('aria-selected', 'false');
  }

  if (sheetCommentInputEl) {
    sheetCommentInputEl.placeholder = 'Комментарий (необязательно)';
  }

  renderSelectedCategoryCard();
  updateNumpadDisplay();
}

function openBottomSheet(type = 'expense') {
  triggerHaptic('medium');
  state.editingTxId = null;
  if (sheetDeleteTxBtnEl) sheetDeleteTxBtnEl.classList.add('hidden');
  state.numpadBuffer = '0';
  if (sheetCommentInputEl) {
    sheetCommentInputEl.value = '';
    if (sheetCommentClearBtnEl) sheetCommentClearBtnEl.classList.add('hidden');
  }
  setSheetType(type);
  sheetBackdropEl.classList.remove('hidden');
  bottomSheetEl.classList.remove('hidden');
  bottomSheetEl.style.transform = '';
  updateNumpadDisplay();
}

function openEditSheet(txId) {
  const idNum = Number(txId);
  const tx = state.transactions.find(t => t.id === idNum || t.id === txId);
  if (!tx) return;

  triggerHaptic('medium');
  state.editingTxId = tx.id;
  state.numpadBuffer = String(tx.amount);

  if (tx.type === 'income') {
    state.selectedIncomeCatForNew = tx.categoryId || 'salary';
  } else {
    state.selectedCatForNew = tx.categoryId || 'food';
  }

  setSheetType(tx.type);

  if (sheetCommentInputEl) {
    const catList = tx.type === 'income' ? INCOME_CATEGORIES : CATEGORIES;
    const cat = catList.find(c => c.id === tx.categoryId);
    sheetCommentInputEl.value = (tx.comment && (!cat || tx.comment !== cat.name)) ? tx.comment : '';
    if (sheetCommentClearBtnEl) {
      if (sheetCommentInputEl.value) sheetCommentClearBtnEl.classList.remove('hidden');
      else sheetCommentClearBtnEl.classList.add('hidden');
    }
  }

  if (sheetDeleteTxBtnEl) {
    sheetDeleteTxBtnEl.classList.remove('hidden');
  }

  sheetBackdropEl.classList.remove('hidden');
  bottomSheetEl.classList.remove('hidden');
  bottomSheetEl.style.transform = '';
  updateNumpadDisplay();
}

function closeBottomSheet() {
  triggerHaptic('light');
  closeCategoryPicker();
  bottomSheetEl.style.transition = 'transform 0.25s var(--ios-spring)';
  bottomSheetEl.style.transform = 'translateY(100%)';
  sheetBackdropEl.style.opacity = '0';

  setTimeout(() => {
    sheetBackdropEl.classList.add('hidden');
    bottomSheetEl.classList.add('hidden');
    bottomSheetEl.style.transform = '';
    sheetBackdropEl.style.opacity = '';
    state.editingTxId = null;
    if (sheetDeleteTxBtnEl) sheetDeleteTxBtnEl.classList.add('hidden');
    state.numpadBuffer = '0';
    if (sheetCommentInputEl) {
      sheetCommentInputEl.value = '';
      if (sheetCommentClearBtnEl) sheetCommentClearBtnEl.classList.add('hidden');
      sheetCommentInputEl.blur();
    }
    updateNumpadDisplay();
  }, 250);
}

// --- Уведомление о действии (Action Toast: Отменить / Изменить) ---
let toastTimeout = null;

function showActionToast(txOrMessage, mode = 'created') {
  if (!actionToastEl) return;
  clearTimeout(toastTimeout);

  if (typeof txOrMessage === 'string') {
    state.recentTxId = null;
    if (toastTextEl) toastTextEl.textContent = txOrMessage;
    if (toastEditBtnEl) toastEditBtnEl.classList.add('hidden');
    if (toastUndoBtnEl) toastUndoBtnEl.classList.add('hidden');
  } else {
    const tx = txOrMessage;
    state.recentTxId = tx.id;
    const isIncome = tx.type === 'income';
    const typeText = isIncome ? 'Пополнение' : 'Расход';
    const amountFormatted = formatRub(tx.amount);

    if (toastTextEl) {
      toastTextEl.textContent = mode === 'edited'
        ? `Изменения сохранены · ${amountFormatted}`
        : `${typeText} ${amountFormatted} добавлен`;
    }
    if (toastEditBtnEl) toastEditBtnEl.classList.remove('hidden');
    if (toastUndoBtnEl) toastUndoBtnEl.classList.remove('hidden');
  }

  actionToastEl.classList.remove('hiding');
  actionToastEl.classList.remove('hidden');

  toastTimeout = setTimeout(() => {
    hideActionToast();
  }, 4500);
}

function hideActionToast() {
  if (!actionToastEl || actionToastEl.classList.contains('hidden')) return;
  clearTimeout(toastTimeout);
  actionToastEl.classList.add('hiding');
  setTimeout(() => {
    actionToastEl.classList.add('hidden');
    actionToastEl.classList.remove('hiding');
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

// --- 8.1 Экран Аналитики (Modal Sheet) ---
function openAnalyticsSheet() {
  triggerHaptic('medium');
  renderAnalytics();
  analyticsBackdropEl.classList.remove('hidden');
  analyticsSheetEl.classList.remove('hidden');
  analyticsSheetEl.style.transform = '';
}

function closeAnalyticsSheet() {
  triggerHaptic('light');
  analyticsSheetEl.style.transition = 'transform 0.25s var(--ios-spring)';
  analyticsSheetEl.style.transform = 'translateY(100%)';
  analyticsBackdropEl.style.opacity = '0';

  setTimeout(() => {
    analyticsBackdropEl.classList.add('hidden');
    analyticsSheetEl.classList.add('hidden');
    analyticsSheetEl.style.transform = '';
    analyticsBackdropEl.style.opacity = '';
  }, 250);
}

function renderAnalytics() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const currentDay = Math.max(now.getDate(), 1);
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];
  const monthName = monthNames[currentMonth];

  const monthExpenses = state.transactions.filter(tx => {
    if (tx.type === 'income') return false;
    if (!tx.date) return false;
    const d = new Date(tx.date);
    return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
  });

  const txs = monthExpenses.length > 0 ? monthExpenses : state.transactions.filter(tx => tx.type !== 'income');
  const total = txs.reduce((sum, tx) => sum + (Number(tx.amount) || 0), 0);
  const avgDay = Math.round(total / currentDay);

  // Группировка расходов по категориям
  const catMap = {};
  txs.forEach(tx => {
    const cId = tx.categoryId || 'food';
    catMap[cId] = (catMap[cId] || 0) + Number(tx.amount);
  });

  const sortedCats = Object.entries(catMap)
    .map(([cId, amount]) => {
      const catObj = CATEGORIES.find(c => c.id === cId) || { name: 'Другое', icon: '•' };
      const pct = total > 0 ? Math.round((amount / total) * 100) : 0;
      return { id: cId, name: catObj.name, icon: catObj.icon, amount, pct };
    })
    .sort((a, b) => b.amount - a.amount);

  analyticsBodyEl.innerHTML = `
    <div class="analytics-stat-grid">
      <div class="analytics-stat-card">
        <span class="analytics-stat-label">Траты в ${monthName.toLowerCase()}е</span>
        <span class="analytics-stat-val num-tabular">${formatRub(total)}</span>
      </div>
      <div class="analytics-stat-card">
        <span class="analytics-stat-label">В день в среднем</span>
        <span class="analytics-stat-val num-tabular">${formatRub(avgDay)}</span>
      </div>
    </div>

    <div>
      <div class="analytics-section-title">Распределение по категориям</div>
      <div class="analytics-categories-list">
        ${sortedCats.length === 0 ? '<p style="color: var(--ios-label-secondary); font-size: 13px;">Нет расходов за этот период</p>' : sortedCats.map(cat => `
          <div class="analytics-cat-item">
            <div class="analytics-cat-header">
              <div class="analytics-cat-left">
                <div class="analytics-cat-icon">${cat.icon}</div>
                <span class="analytics-cat-name">${escapeHtml(cat.name)}</span>
                <span class="analytics-cat-pct">${cat.pct}%</span>
              </div>
              <span class="analytics-cat-amount num-tabular">${formatRub(cat.amount)}</span>
            </div>
            <div class="analytics-cat-bar-bg">
              <div class="analytics-cat-bar-fill" style="width: ${cat.pct}%;"></div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function initAnalyticsDrag() {
  if (!analyticsHandleWrapperEl) return;
  let startY = 0;
  let isDragging = false;

  analyticsHandleWrapperEl.addEventListener('touchstart', (e) => {
    startY = e.touches[0].clientY;
    isDragging = true;
    analyticsSheetEl.style.transition = 'none';
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - startY;
    if (diffY > 0) {
      analyticsSheetEl.style.transform = `translateY(${diffY}px)`;
    }
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const currentY = e.changedTouches[0].clientY;
    const diffY = currentY - startY;

    if (diffY > 80) {
      closeAnalyticsSheet();
    } else {
      analyticsSheetEl.style.transition = 'transform 0.25s var(--ios-spring)';
      analyticsSheetEl.style.transform = 'translateY(0)';
    }
  });
}

// --- 9. Слушатели событий ---
function setupEventListeners() {
  // Переключение режима приватности
  if (privacyToggleBtnEl) {
    privacyToggleBtnEl.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePrivacy();
    });
  }

  if (balanceAmountTriggerEl) {
    balanceAmountTriggerEl.addEventListener('click', togglePrivacy);
    balanceAmountTriggerEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePrivacy();
      }
    });
  }

  // Кнопка аналитики на карточке баланса
  if (quickAnalyticsBtnEl) {
    quickAnalyticsBtnEl.addEventListener('click', () => {
      openAnalyticsSheet();
    });
  }

  // Переключение Расход / Пополнение в шторке
  if (typeExpenseBtnEl) {
    typeExpenseBtnEl.addEventListener('click', () => {
      triggerHaptic('selection');
      setSheetType('expense');
    });
  }

  if (typeIncomeBtnEl) {
    typeIncomeBtnEl.addEventListener('click', () => {
      triggerHaptic('selection');
      setSheetType('income');
    });
  }

  function openSearchMode() {
    if (searchWrapperEl) searchWrapperEl.classList.add('is-active');
    if (searchTagsContainerEl) {
      searchTagsContainerEl.classList.add('is-open');
      searchTagsContainerEl.setAttribute('aria-hidden', 'false');
    }
    if (searchClearBtnEl) {
      searchClearBtnEl.classList.remove('hidden');
    }
  }

  function closeSearchMode(force = false) {
    if (!force && (state.searchQuery || state.selectedFilter !== 'all')) {
      return;
    }
    if (searchWrapperEl) searchWrapperEl.classList.remove('is-active');
    if (searchTagsContainerEl) {
      searchTagsContainerEl.classList.remove('is-open');
      searchTagsContainerEl.setAttribute('aria-hidden', 'true');
    }
    if (searchClearBtnEl && !state.searchQuery) {
      searchClearBtnEl.classList.add('hidden');
    }
  }

  // Фильтры категорий
  categoriesFilterEl.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-cat]');
    if (!btn) return;
    triggerHaptic('selection');
    const cat = btn.dataset.cat;
    if (state.selectedFilter === cat && cat !== 'all') {
      state.selectedFilter = 'all';
    } else {
      state.selectedFilter = cat;
    }
    renderCategoryChips();
    renderApp();
  });

  // Поиск — фокус и клик открывают теги
  searchInputEl.addEventListener('focus', () => {
    openSearchMode();
  });
  searchInputEl.addEventListener('click', () => {
    openSearchMode();
  });

  searchInputEl.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    openSearchMode();
    if (state.searchQuery) {
      searchClearBtnEl.classList.remove('hidden');
    }
    renderApp();
  });

  // Очистка поиска
  searchClearBtnEl.addEventListener('click', () => {
    triggerHaptic('light');
    const wasEmpty = !state.searchQuery;
    state.searchQuery = '';
    searchInputEl.value = '';
    state.selectedFilter = 'all';
    renderCategoryChips();
    renderApp();
    if (wasEmpty) {
      closeSearchMode(true);
      searchInputEl.blur();
    } else {
      searchInputEl.focus();
    }
  });

  // Закрытие режима поиска при тапе вне шапки
  document.addEventListener('click', (e) => {
    if (!searchWrapperEl || !searchTagsContainerEl) return;
    const clickedInside = searchWrapperEl.contains(e.target) || searchTagsContainerEl.contains(e.target);
    if (!clickedInside) {
      if (!state.searchQuery && state.selectedFilter === 'all') {
        closeSearchMode(true);
      }
    }
  });

  // Модалка добавления
  fabBtnEl.addEventListener('click', () => openBottomSheet('expense'));
  sheetCloseBtnEl.addEventListener('click', closeBottomSheet);
  sheetBackdropEl.addEventListener('click', closeBottomSheet);

  // Модалка аналитики
  if (analyticsCloseBtnEl) {
    analyticsCloseBtnEl.addEventListener('click', closeAnalyticsSheet);
  }
  // Открытие модалки выбора категории
  if (selectedCategoryBtnEl) {
    selectedCategoryBtnEl.addEventListener('click', () => {
      openCategoryPicker();
    });
  }

  // Модалка выбора категории
  if (categoryPickerCloseBtnEl) {
    categoryPickerCloseBtnEl.addEventListener('click', closeCategoryPicker);
  }
  if (categoryPickerBackdropEl) {
    categoryPickerBackdropEl.addEventListener('click', closeCategoryPicker);
  }
  if (categoryPickerListEl) {
    categoryPickerListEl.addEventListener('click', (e) => {
      const item = e.target.closest('.cat-picker-item[data-cat-id]');
      if (!item) return;
      triggerHaptic('selection');
      const catId = item.dataset.catId;
      if (state.sheetType === 'income') {
        state.selectedIncomeCatForNew = catId;
      } else {
        state.selectedCatForNew = catId;
      }
      renderSelectedCategoryCard();
      closeCategoryPicker();
    });
  }

  // Быстрые чипы добавления сумм
  if (quickChipsRowEl) {
    quickChipsRowEl.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-add]');
      if (!btn) return;
      const addVal = parseFloat(btn.dataset.add) || 0;
      if (addVal > 0) {
        handleQuickChip(addVal);
      }
    });
  }

  // Поле комментария к операции
  if (sheetCommentInputEl && sheetCommentClearBtnEl) {
    sheetCommentInputEl.addEventListener('input', () => {
      if (sheetCommentInputEl.value.trim().length > 0) {
        sheetCommentClearBtnEl.classList.remove('hidden');
      } else {
        sheetCommentClearBtnEl.classList.add('hidden');
      }
    });

    sheetCommentClearBtnEl.addEventListener('click', () => {
      sheetCommentInputEl.value = '';
      sheetCommentClearBtnEl.classList.add('hidden');
      sheetCommentInputEl.focus();
    });
  }

  // Нажатия клавиш калькуляторной клавиатуры (3x4)
  if (calculatorKeypadEl) {
    calculatorKeypadEl.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-key]');
      if (!btn) return;
      handleNumpadKey(btn.dataset.key);
    });
  }

  // Поддержка физической клавиатуры с ПК
  window.addEventListener('keydown', (e) => {
    if (bottomSheetEl.classList.contains('hidden')) return;

    // Если открыт выбор категории — Escape закрывает только его
    if (categoryPickerSheetEl && !categoryPickerSheetEl.classList.contains('hidden')) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        closeCategoryPicker();
        return;
      }
    }

    // Если фокус в текстовом поле комментария — позволяем вводить текст и цифры без перехвата
    if (document.activeElement === sheetCommentInputEl || e.target === sheetCommentInputEl) {
      if (e.key === 'Escape') {
        sheetCommentInputEl.blur();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (getNumpadAmountNumber() > 0) {
          addFormEl.dispatchEvent(new Event('submit'));
        }
      }
      return;
    }

    if (e.key >= '0' && e.key <= '9') {
      handleNumpadKey(e.key);
    } else if (e.key === '.' || e.key === ',') {
      handleNumpadKey('.');
    } else if (e.key === 'Backspace') {
      handleNumpadKey('del');
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (getNumpadAmountNumber() > 0) {
        addFormEl.dispatchEvent(new Event('submit'));
      }
    } else if (e.key === 'Escape') {
      closeBottomSheet();
    }
  });

  // Отправка формы (Добавление или Сохранение изменений)
  addFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const amountNum = getNumpadAmountNumber();
    if (!amountNum || isNaN(amountNum) || amountNum <= 0) {
      triggerHaptic('warning');
      return;
    }

    const isIncome = state.sheetType === 'income';
    const catList = isIncome ? INCOME_CATEGORIES : CATEGORIES.filter(c => c.id !== 'all');
    const catId = isIncome ? state.selectedIncomeCatForNew : state.selectedCatForNew;
    const selectedCat = catList.find(c => c.id === catId) || catList[0];
    const commentVal = sheetCommentInputEl ? sheetCommentInputEl.value.trim() : '';

    // Режим редактирования существующей операции
    if (state.editingTxId) {
      const idNum = Number(state.editingTxId);
      const existingTx = state.transactions.find(t => t.id === idNum || t.id === state.editingTxId);
      if (existingTx) {
        // Откатываем старое влияние на баланс
        if (existingTx.type === 'income') {
          state.balance -= existingTx.amount;
        } else {
          state.balance += existingTx.amount;
        }

        // Применяем новые данные
        existingTx.type = isIncome ? 'income' : 'expense';
        existingTx.categoryId = selectedCat.id;
        existingTx.amount = amountNum;
        existingTx.comment = commentVal || selectedCat.name;

        // Применяем новое влияние на баланс
        if (isIncome) {
          state.balance += amountNum;
        } else {
          state.balance -= amountNum;
        }

        saveState();
        triggerHaptic('success');
        closeBottomSheet();
        renderApp();
        showActionToast(existingTx, 'edited');
        return;
      }
    }

    // Режим добавления новой операции
    const newTx = {
      id: Date.now(),
      type: isIncome ? 'income' : 'expense',
      categoryId: selectedCat.id,
      amount: amountNum,
      comment: commentVal || selectedCat.name,
      place: '',
      date: new Date().toISOString()
    };

    state.transactions.unshift(newTx);
    if (isIncome) {
      state.balance += amountNum;
    } else {
      state.balance -= amountNum;
    }
    saveState();
    triggerHaptic('success');

    closeBottomSheet();
    renderApp();
    showActionToast(newTx, 'created');
  });

  // Удаление операции прямо из шторки редактирования
  if (sheetDeleteTxBtnEl) {
    sheetDeleteTxBtnEl.addEventListener('click', () => {
      if (!state.editingTxId) return;
      const idNum = Number(state.editingTxId);
      const tx = state.transactions.find(t => t.id === idNum || t.id === state.editingTxId);
      if (!tx) return;

      const opName = tx.type === 'income' ? 'пополнение' : 'расход';
      if (confirm(`Удалить ${opName} "${tx.comment}" (${formatRub(tx.amount)})?`)) {
        triggerHaptic('warning');
        if (tx.type === 'income') {
          state.balance -= tx.amount;
        } else {
          state.balance += tx.amount;
        }
        state.transactions = state.transactions.filter(t => t.id !== tx.id);
        saveState();
        closeBottomSheet();
        renderApp();
      }
    });
  }

  // Toast Action: Отменить последнюю операцию
  if (toastUndoBtnEl) {
    toastUndoBtnEl.addEventListener('click', () => {
      if (!state.recentTxId) return;
      const idNum = Number(state.recentTxId);
      const tx = state.transactions.find(t => t.id === idNum || t.id === state.recentTxId);
      if (tx) {
        triggerHaptic('warning');
        if (tx.type === 'income') {
          state.balance -= tx.amount;
        } else {
          state.balance += tx.amount;
        }
        state.transactions = state.transactions.filter(t => t.id !== tx.id);
        saveState();
        renderApp();
      }
      hideActionToast();
    });
  }

  // Toast Action: Изменить последнюю операцию
  if (toastEditBtnEl) {
    toastEditBtnEl.addEventListener('click', () => {
      if (!state.recentTxId) return;
      const txId = state.recentTxId;
      hideActionToast();
      openEditSheet(txId);
    });
  }

  // Toast Action: Закрыть тост
  if (toastCloseBtnEl) {
    toastCloseBtnEl.addEventListener('click', () => {
      hideActionToast();
    });
  }



  // Меню в шапке (3 точки) — локальное сохранение и резервное копирование
  function openHeaderMenu() {
    triggerHaptic('light');
    if (headerMenuPopoverEl) {
      headerMenuPopoverEl.classList.remove('hidden');
    }
    if (menuBtnEl) {
      menuBtnEl.setAttribute('aria-expanded', 'true');
    }
  }

  function closeHeaderMenu() {
    if (headerMenuPopoverEl) {
      headerMenuPopoverEl.classList.add('hidden');
    }
    if (menuBtnEl) {
      menuBtnEl.setAttribute('aria-expanded', 'false');
    }
  }

  if (menuBtnEl) {
    menuBtnEl.addEventListener('click', (e) => {
      e.stopPropagation();
      if (headerMenuPopoverEl && headerMenuPopoverEl.classList.contains('hidden')) {
        openHeaderMenu();
      } else {
        closeHeaderMenu();
      }
    });
  }

  // Клик вне меню закрывает его
  document.addEventListener('click', (e) => {
    if (headerMenuPopoverEl && !headerMenuPopoverEl.classList.contains('hidden')) {
      if (!headerMenuPopoverEl.contains(e.target) && e.target !== menuBtnEl) {
        closeHeaderMenu();
      }
    }
  });

  // 1. Сохранить прогресс локально / Экспорт в JSON файл
  if (menuSaveBtnEl) {
    menuSaveBtnEl.addEventListener('click', () => {
      triggerHaptic('success');
      closeHeaderMenu();
      saveState();

      try {
        const backupData = {
          app: 'buhgalteriya',
          version: '1.2.0',
          exportedAt: new Date().toISOString(),
          balance: state.balance,
          transactions: state.transactions,
          isPrivate: state.isPrivate
        };
        const jsonStr = JSON.stringify(backupData, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const now = new Date();
        const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        link.href = url;
        link.download = `buhgalteriya_backup_${dateStr}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        showActionToast('Прогресс сохранен в файл');
      } catch (err) {
        console.error('Ошибка создания файла бэкапа', err);
        showActionToast('Прогресс сохранен локально');
      }
    });
  }

  // 2. Восстановить из файла
  if (menuRestoreBtnEl) {
    menuRestoreBtnEl.addEventListener('click', () => {
      triggerHaptic('light');
      closeHeaderMenu();
      if (backupFileInputEl) {
        backupFileInputEl.value = '';
        backupFileInputEl.click();
      }
    });
  }

  if (backupFileInputEl) {
    backupFileInputEl.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target.result);
          if (typeof parsed.balance !== 'number' || !Array.isArray(parsed.transactions)) {
            throw new Error('Некорректный формат файла');
          }
          triggerHaptic('success');
          state.balance = parsed.balance;
          state.transactions = parsed.transactions;
          if (typeof parsed.isPrivate === 'boolean') {
            state.isPrivate = parsed.isPrivate;
          }
          saveState();
          renderCategoryChips();
          renderApp();
          showActionToast(`Восстановлено ${parsed.transactions.length} операций`);
        } catch (err) {
          triggerHaptic('error');
          alert('Ошибка чтения файла: выберите корректный JSON-файл резервной копии.');
        }
      };
      reader.readAsText(file);
    });
  }

  // 3. Сброс данных к начальным
  if (menuResetBtnEl) {
    menuResetBtnEl.addEventListener('click', () => {
      closeHeaderMenu();
      if (confirm('Сбросить все данные к исходным демо-данным?')) {
        triggerHaptic('heavy');
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(PRIVACY_KEY);
        state.balance = INITIAL_BALANCE;
        state.transactions = [...INITIAL_TRANSACTIONS];
        state.selectedFilter = 'all';
        state.searchQuery = '';
        state.isPrivate = false;
        if (searchInputEl) searchInputEl.value = '';
        if (searchClearBtnEl) searchClearBtnEl.classList.add('hidden');
        saveState();
        renderCategoryChips();
        renderApp();
        showActionToast('Данные сброшены к исходным');
      }
    });
  }

  // 4. Настройка счёта и баланса
  if (accountSettingsBtnEl) {
    accountSettingsBtnEl.addEventListener('click', openAccountSheet);
  }

  if (menuAccountBtnEl) {
    menuAccountBtnEl.addEventListener('click', () => {
      closeHeaderMenu();
      openAccountSheet();
    });
  }

  if (accountCloseBtnEl) {
    accountCloseBtnEl.addEventListener('click', closeAccountSheet);
  }

  if (accountBackdropEl) {
    accountBackdropEl.addEventListener('click', closeAccountSheet);
  }

  // Быстрые пресеты баланса
  const presetChips = document.querySelectorAll('.account-preset-chip');
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      triggerHaptic('selection');
      const val = chip.dataset.preset;
      if (accountBalanceInputEl) {
        accountBalanceInputEl.value = val;
        accountBalanceInputEl.focus();
        accountBalanceInputEl.select();
      }
    });
  });

  // Сохранить новый баланс и опционально очистить операции
  if (accountSaveBtnEl) {
    accountSaveBtnEl.addEventListener('click', () => {
      triggerHaptic('success');
      const rawVal = accountBalanceInputEl ? accountBalanceInputEl.value.replace(/\s+/g, '').replace(',', '.') : '0';
      const num = parseFloat(rawVal) || 0;
      const cleanNum = Math.max(0, Math.round(num));

      const shouldClearTxs = accountClearTxsToggleEl && accountClearTxsToggleEl.checked;

      state.balance = cleanNum;
      if (shouldClearTxs) {
        state.transactions = [];
        state.selectedFilter = 'all';
        state.searchQuery = '';
      }
      saveState();
      renderCategoryChips();
      renderApp();
      closeAccountSheet();

      if (shouldClearTxs) {
        showActionToast(`Счёт настроен: ${formatRub(cleanNum)} (операции очищены)`);
      } else {
        showActionToast(`Баланс обновлен: ${formatRub(cleanNum)}`);
      }
    });
  }

  // Восстановить демо-данные из окна счёта
  if (accountRestoreDemoBtnEl) {
    accountRestoreDemoBtnEl.addEventListener('click', () => {
      if (confirm('Восстановить демо-данные (баланс 45 716 ₽ и исходные операции)?')) {
        triggerHaptic('heavy');
        state.balance = INITIAL_BALANCE;
        state.transactions = [...INITIAL_TRANSACTIONS];
        state.selectedFilter = 'all';
        state.searchQuery = '';
        state.isPrivate = false;
        saveState();
        renderCategoryChips();
        renderApp();
        closeAccountSheet();
        showActionToast('Демо-данные восстановлены');
      }
    });
  }

  // Закрытие шторок по клавише Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (accountSheetEl && !accountSheetEl.classList.contains('hidden')) {
        closeAccountSheet();
      } else if (categoryPickerSheetEl && !categoryPickerSheetEl.classList.contains('hidden')) {
        closeCategoryPicker();
      } else if (!bottomSheetEl.classList.contains('hidden')) {
        closeBottomSheet();
      } else if (analyticsSheetEl && !analyticsSheetEl.classList.contains('hidden')) {
        closeAnalyticsSheet();
      }
    }
  });

  initSheetDrag();
  initAnalyticsDrag();
  initCategoryPickerDrag();
  initAccountDrag();
}

// --- 10. Инициализация ---
function init() {
  loadState();
  renderCategoryChips();
  renderSelectedCategoryCard();
  renderApp();
  setupEventListeners();

  // Поддержка быстрых ссылок (deep links / PWA shortcuts)
  if (typeof window !== 'undefined' && window.location && window.location.hash) {
    if (window.location.hash === '#add') {
      openBottomSheet('expense');
    } else if (window.location.hash === '#income') {
      openBottomSheet('income');
    } else if (window.location.hash === '#analytics') {
      openAnalyticsSheet();
    } else if (window.location.hash === '#account') {
      openAccountSheet();
    } else if (window.location.hash === '#menu') {
      openHeaderMenu();
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
