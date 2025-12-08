// LOGIN PAGE
const loginBtn = document.getElementById("login-btn");
const loginMessage = document.getElementById("login-message");

if (loginBtn && loginMessage) {
    const loginEmail = document.querySelector('input[name="email"]');
    const loginPassword = document.querySelector('input[name="password"]');

    loginBtn.addEventListener("click", function () {
        if (loginEmail.value === "" || loginPassword.value === "") {
            loginMessage.textContent = "Please provide all credentials.";
        } else {
            loginMessage.textContent = "Logged in successfully.";
        }
    });
}

// REGISTER PAGE
const registerBtn = document.getElementById("register-btn");
const registerMessage = document.getElementById("register-message");

if (registerBtn && registerMessage) {
    const regName = document.querySelector('input[name="name"]');
    const regEmail = document.querySelector('input[name="email"]');
    const regPassword = document.querySelector('input[name="password"]');

    registerBtn.addEventListener("click", function () {
        if (
            regName.value === "" ||
            regEmail.value === "" ||
            regPassword.value === ""
        ) {
            registerMessage.textContent = "Please fill all the fields.";
        } else {
            registerMessage.textContent =
                "Account created. You can now go to Login.";
        }
    });
}

// DASHBOARD – LINK BANK TOGGLE
const linkBankBtn = document.getElementById("link-bank-btn");
const bankStatusText = document.getElementById("bank-status-text");
const bankStatusBadge = document.getElementById("bank-status-badge");

let bankConnected = false; // flag to remember status

if (linkBankBtn && bankStatusText && bankStatusBadge) {
    linkBankBtn.addEventListener("click", function () {
        bankConnected = !bankConnected; // flip between true/false

        if (bankConnected) {
            bankStatusText.textContent = "Connected";
            bankStatusBadge.textContent = "Connected";
            bankStatusBadge.classList.remove("badge-warning");
            bankStatusBadge.classList.add("badge-success");
            linkBankBtn.textContent = "Unlink bank";
        } else {
            bankStatusText.textContent = "Not connected";
            bankStatusBadge.textContent = "Not connected";
            bankStatusBadge.classList.remove("badge-success");
            bankStatusBadge.classList.add("badge-warning");
            linkBankBtn.textContent = "Link bank";
        }
    });
}

// DASHBOARD – CURRENCY CONVERSION + RECENT TRANSFER LOG
const transferBtn = document.getElementById("transfer-btn");
const amountInput = document.getElementById("amount-input");
const countrySelect = document.getElementById("country-select");
const receiverInput = document.getElementById("receiver-input");

const convertedSpan = document.getElementById("converted-amount");
const taxSpan = document.getElementById("tax-amount");
const totalSpan = document.getElementById("total-amount");
const transferMessage = document.getElementById("transfer-message");
const transferList = document.getElementById("transfer-list");

// Simple dummy conversion rates: INR -> foreign currency
const rates = {
    us: 0.012,   // INR to USD
    uk: 0.0095,  // INR to GBP
    eu: 0.011    // INR to EUR
};

if (
    transferBtn &&
    amountInput &&
    countrySelect &&
    receiverInput &&
    convertedSpan &&
    taxSpan &&
    totalSpan &&
    transferMessage &&
    transferList
) {
    transferBtn.addEventListener("click", function () {
        const amountValue = Number(amountInput.value);
        const countryValue = countrySelect.value;
        const receiverValue = receiverInput.value.trim();

        // Basic validation
        if (!amountValue || amountValue <= 0) {
            transferMessage.textContent = "Please enter a valid amount in INR.";
            return;
        }

        if (countryValue === "") {
            transferMessage.textContent = "Please select a receiver country.";
            return;
        }

        if (receiverValue === "") {
            transferMessage.textContent = "Please enter receiver account.";
            return;
        }

        const rate = rates[countryValue];

        if (!rate) {
            transferMessage.textContent = "Unknown country selected.";
            return;
        }

        // Calculations
        const convertedAmount = amountValue * rate;
        const taxAmount = Math.round(amountValue * 0.025); // 2.5% fee
        const totalAmount = amountValue + taxAmount;

        // Show result in summary box
        convertedSpan.textContent = convertedAmount.toFixed(2);
        taxSpan.textContent = taxAmount;
        totalSpan.textContent = totalAmount;

        transferMessage.textContent =
            "Transfer calculated and added to recent history.";

        // Add new item to Recent transfers list
        const li = document.createElement("li");

        const firstLine = document.createElement("span");
        firstLine.textContent =
            "₹" + amountValue + " → " + countryValue.toUpperCase();

        const secondLine = document.createElement("span");
        secondLine.className = "muted small";
        secondLine.textContent = "To " + receiverValue + " · Completed";

        li.appendChild(firstLine);
        li.appendChild(secondLine);

        // Add at the end of the list (simple)
        transferList.appendChild(li);

        // Clear inputs for next entry
        amountInput.value = "";
        countrySelect.value = "";
        receiverInput.value = "";
    });
}
