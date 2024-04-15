document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('taxForm');
  const modal = document.getElementById('modal');
  const closeButton = document.querySelector('.close');
  
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const taxAmount = calculateTax();
    displayTaxResult(taxAmount);
  });

  closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  function calculateTax() {
    const grossIncome = parseFloat(document.getElementById('grossIncome').value);
    const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
    const age = document.getElementById('age').value;
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;

    let taxRate = 0;
    let taxAmount = 0;

    // Check if overall income (after deductions) is over 8 Lakhs
    if (grossIncome + extraIncome - deductions > 800000) {
      // Apply tax rate based on age group
      if (age === '<40') {
        taxRate = 0.3;
      } else if (age === '40-59') {
        taxRate = 0.4;
      } else if (age === '≥60') {
        taxRate = 0.1;
      }
      
      // Calculate tax amount on the income exceeding 8 Lakhs
      taxAmount = (grossIncome + extraIncome - deductions - 8) * taxRate;
    }

    return taxAmount;
  }

  function displayTaxResult(taxAmount) {
    // Calculate overall income
    const grossIncome = parseFloat(document.getElementById('grossIncome').value);
    const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;
    const overallIncome = grossIncome + extraIncome - deductions;

    // Calculate final income after tax deductions
    const finalIncome = overallIncome - taxAmount;

    // Display tax result in the modal
    const taxResultElement = document.getElementById('taxResult');
    taxResultElement.textContent = `Your overall income will be\n${finalIncome.toFixed(2)}\nafter tax deductions`;
    modal.style.display = 'block';
  }
});
