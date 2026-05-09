document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const body = document.body;
  
  // Header / Logo
  const logoUpload = document.getElementById('logoUpload');
  const logoImg = document.getElementById('logoImg');
  const logoUploadLabel = document.getElementById('logoUploadLabel');
  const removeLogoBtn = document.getElementById('removeLogoBtn');
  const invoiceDate = document.getElementById('invoiceDate');
  const dueDate = document.getElementById('dueDate');
  
  // Settings
  const currencySymbolInput = document.getElementById('currencySymbol');
  
  // Items Table
  const itemsBody = document.getElementById('itemsBody');
  const addItemBtn = document.getElementById('addItemBtn');
  
  // Totals
  const subtotalDisplay = document.getElementById('subtotalDisplay');
  const taxRateInput = document.getElementById('taxRate');
  const taxAmountDisplay = document.getElementById('taxAmountDisplay');
  const taxAmountDisplayPreview = document.getElementById('taxAmountDisplayPreview');
  const amountPaidInput = document.getElementById('amountPaid');
  const amountPaidPreview = document.getElementById('amountPaidPreview');
  const balanceDueDisplay = document.getElementById('balanceDueDisplay');
  
  // Actions
  const floatingActionBar = document.getElementById('floatingActionBar');
  const previewActions = document.getElementById('previewActions');
  const previewBtn = document.getElementById('previewBtn');
  const saveDraftBtn = document.getElementById('saveDraftBtn');
  const resetFormBtn = document.getElementById('resetFormBtn');
  const printDocBtn = document.getElementById('printDocBtn');
  const backToEditBtn = document.getElementById('backToEditBtn');
  
  // Notification / Validation
  const notificationBanner = document.getElementById('notificationBanner');
  const validationError = document.getElementById('validationError');
  const clientNameInput = document.getElementById('clientName');

  // --- State ---
  let items = [
    { id: generateId(), description: '', quantity: 1, rate: 0.00 }
  ];
  let isPreviewMode = false;
  let logoBase64 = null;

  // --- Initialization ---
  function init() {
    const today = new Date();
    invoiceDate.value = formatDate(today);
    
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 14);
    dueDate.value = formatDate(futureDate);

    // Fetch memory from Node.js server
    loadInvoiceFromMemory();
  }

  // --- Utility Functions ---
  function generateId() {
    return Math.random().toString(36).substring(2, 9);
  }

  function formatDate(dateObj) {
    return dateObj.toISOString().split('T')[0];
  }

  function getCurrencySymbol() {
    return currencySymbolInput.value || '$';
  }

  function formatMoney(amount) {
    const symbol = getCurrencySymbol();
    return `${symbol}${parseFloat(amount).toFixed(2).replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",")}`;
  }

  function showNotification(message, isError = false) {
    const el = isError ? validationError : notificationBanner;
    el.textContent = message;
    el.classList.remove('hidden');
    setTimeout(() => {
      el.classList.add('hidden');
    }, 4000);
  }

  // --- Core Logic ---

  // Logo Upload Logic
  logoUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        logoBase64 = event.target.result;
        displayLogo();
      };
      reader.readAsDataURL(file);
    }
  });

  removeLogoBtn.addEventListener('click', () => {
    logoBase64 = null;
    logoUpload.value = '';
    logoImg.src = '';
    logoImg.classList.add('hidden');
    removeLogoBtn.classList.add('hidden');
    logoUploadLabel.classList.remove('hidden');
  });

  function displayLogo() {
    if (logoBase64) {
      logoImg.src = logoBase64;
      logoImg.classList.remove('hidden');
      removeLogoBtn.classList.remove('hidden');
      logoUploadLabel.classList.add('hidden');
    }
  }

  function calculateTotals() {
    let subtotal = 0;
    
    items.forEach(item => {
      subtotal += (item.quantity * item.rate);
    });

    const taxRate = parseFloat(taxRateInput.value) || 0;
    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount;
    
    const amountPaid = parseFloat(amountPaidInput.value) || 0;
    const balanceDue = total - amountPaid;

    subtotalDisplay.textContent = formatMoney(subtotal);
    const formattedTax = formatMoney(taxAmount);
    taxAmountDisplay.textContent = formattedTax;
    taxAmountDisplayPreview.textContent = formattedTax;
    
    const formattedPaid = formatMoney(amountPaid);
    amountPaidPreview.textContent = formattedPaid;

    balanceDueDisplay.textContent = formatMoney(balanceDue);
    
    document.querySelector('.currency-label').textContent = getCurrencySymbol();
  }

  function renderItems() {
    itemsBody.innerHTML = '';
    
    items.forEach((item) => {
      const tr = document.createElement('tr');
      tr.className = 'item-row';
      tr.dataset.id = item.id;

      const lineTotal = item.quantity * item.rate;

      tr.innerHTML = `
        <td style="padding-right: 8px;">
          <input type="text" class="prominent-input item-desc strong-text" placeholder="Item description" value="${item.description}">
        </td>
        <td style="padding-right: 8px;">
          <input type="number" class="prominent-input item-qty text-right" min="0" step="1" value="${item.quantity}">
        </td>
        <td style="padding-right: 8px;">
          <input type="number" class="prominent-input item-rate text-right" min="0" step="0.01" value="${item.rate}">
        </td>
        <td class="text-right" style="position: relative;">
          <span class="line-total">${formatMoney(lineTotal)}</span>
          <button type="button" class="delete-row-btn no-print" title="Remove" ${items.length === 1 ? 'disabled' : ''}>✕</button>
        </td>
      `;

      const descInput = tr.querySelector('.item-desc');
      const qtyInput = tr.querySelector('.item-qty');
      const rateInput = tr.querySelector('.item-rate');
      const removeBtn = tr.querySelector('.delete-row-btn');

      descInput.addEventListener('input', (e) => { item.description = e.target.value; });
      
      qtyInput.addEventListener('input', (e) => {
        item.quantity = parseFloat(e.target.value) || 0;
        tr.querySelector('.line-total').textContent = formatMoney(item.quantity * item.rate);
        calculateTotals();
      });

      rateInput.addEventListener('input', (e) => {
        item.rate = parseFloat(e.target.value) || 0;
        tr.querySelector('.line-total').textContent = formatMoney(item.quantity * item.rate);
        calculateTotals();
      });

      removeBtn.addEventListener('click', () => {
        if (items.length > 1) {
          items = items.filter(i => i.id !== item.id);
          renderItems();
          calculateTotals();
        }
      });

      itemsBody.appendChild(tr);
    });
  }

  currencySymbolInput.addEventListener('input', () => {
    renderItems();
    calculateTotals();
  });
  taxRateInput.addEventListener('input', calculateTotals);
  amountPaidInput.addEventListener('input', calculateTotals);

  addItemBtn.addEventListener('click', () => {
    items.push({ id: generateId(), description: '', quantity: 1, rate: 0.00 });
    renderItems();
    calculateTotals();
  });

  // --- Validation & Modes ---
  function validateForm() {
    let isValid = true;
    clientNameInput.classList.remove('invalid');
    
    if (!clientNameInput.value.trim()) {
      clientNameInput.classList.add('invalid');
      isValid = false;
    }

    if (!isValid) {
      showNotification('Please fill in Billed To details before previewing.', true);
    }

    return isValid;
  }

  function togglePreviewMode(enable) {
    isPreviewMode = enable;
    if (enable) {
      if (!validateForm()) return;
      body.classList.add('preview-mode');
      floatingActionBar.classList.add('hidden');
      previewActions.classList.remove('hidden');
    } else {
      body.classList.remove('preview-mode');
      floatingActionBar.classList.remove('hidden');
      previewActions.classList.add('hidden');
    }
  }

  previewBtn.addEventListener('click', () => togglePreviewMode(true));
  backToEditBtn.addEventListener('click', () => togglePreviewMode(false));
  printDocBtn.addEventListener('click', () => window.print());

  // Auto-resize textareas
  document.querySelectorAll('textarea').forEach(el => {
    el.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  });

  // --- Node.js Memory API Interaction ---
  async function saveInvoiceToMemory() {
    try {
      const draft = {
        logoBase64: logoBase64,
        invoiceNumber: document.getElementById('invoiceNumber').value,
        invoiceDate: invoiceDate.value,
        dueDate: dueDate.value,
        clientName: clientNameInput.value,
        clientAddress: document.getElementById('clientAddress').value,
        currencySymbol: currencySymbolInput.value,
        notes: document.getElementById('notesInput').value,
        terms: document.getElementById('termsInput').value,
        taxRate: taxRateInput.value,
        amountPaid: amountPaidInput.value,
        items: items
      };

      const response = await fetch('http://localhost:3000/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft)
      });

      if (!response.ok) throw new Error('Network response was not ok');
      showNotification('Invoice successfully saved to Node.js memory.');
    } catch (error) {
      console.error("Failed to save to server", error);
      showNotification('Failed to save to Node server. Ensure it is running.', true);
    }
  }

  async function loadInvoiceFromMemory() {
    try {
      const response = await fetch('http://localhost:3000/api/invoice');
      if (!response.ok) return; // Server might be empty or down, just use defaults
      
      const draft = await response.json();
      
      if (Object.keys(draft).length === 0) return; // Empty JSON file

      if (draft.logoBase64) {
        logoBase64 = draft.logoBase64;
        displayLogo();
      }

      document.getElementById('invoiceNumber').value = draft.invoiceNumber || '1';
      invoiceDate.value = draft.invoiceDate || '';
      dueDate.value = draft.dueDate || '';
      
      clientNameInput.value = draft.clientName || '';
      document.getElementById('clientAddress').value = draft.clientAddress || '';
      
      currencySymbolInput.value = draft.currencySymbol || '$';
      document.getElementById('notesInput').value = draft.notes || '';
      document.getElementById('termsInput').value = draft.terms || '';
      
      taxRateInput.value = draft.taxRate !== undefined ? draft.taxRate : 0;
      amountPaidInput.value = draft.amountPaid !== undefined ? draft.amountPaid : 0;
      
      if (draft.items && draft.items.length > 0) {
        items = draft.items;
      }

      renderItems();
      calculateTotals();
      showNotification('Invoice loaded from memory.');
    } catch (error) {
      console.log("No backend connection found or file is empty. Proceeding with defaults.");
    }
  }

  saveDraftBtn.addEventListener('click', saveInvoiceToMemory);

  resetFormBtn.addEventListener('click', () => {
    if (confirm("Reset the form? Unsaved data will be lost.")) {
      location.reload();
    }
  });

  // Run init
  init();
});
