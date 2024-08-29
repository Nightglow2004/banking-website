window.onload = function () {
    displayProfile();
    displayTransactionHistory();
};

/*Forgot Password*/
function forgot() {
    const email = prompt("Enter your email");
    let useremail = localStorage.getItem('usermail');
    let userpass = localStorage.getItem('userpassword');

    if (email !== useremail) {
        alert("Email not found!");
    } else {
        alert("Your password is: " + userpass);
    }
}

/*Sign Up*/

function signup() {
    let name1 = document.getElementById('name');
    let name2 = document.getElementById('namel');
    let email = document.getElementById('mail');
    let passw = document.getElementById('password');



    if (name1.value === "") {
        name1.classList.add('border-red-500');
        name1.placeholder = "First name is required";

    }
    else if (name2.value === "") {
        name2.classList.add('border-red-500');
        name2.placeholder = "Last name is required";

    }
    else if (email.value === "") {
        email.classList.add('border-red-500');
        email.placeholder = "Email is required";

    }
    else if (passw.value === "") {
        passw.classList.add('border-red-500');
        passw.placeholder = "Password is required";

    }
    else {
        localStorage.setItem("usernamefirst", name1.value);
        localStorage.setItem("usernamelast", name2.value);
        localStorage.setItem("usermail", email.value);
        localStorage.setItem("userpassword", passw.value);
        alert("You have successfully registered!");
        window.location.href = "login.html";
    }
}
/* Password Toggle */
const eye = document.getElementById('show');
eye.addEventListener('click', function () {
    const passwo = document.getElementById('password');
    if (passwo.type === 'password') {
        passwo.type = 'text';
    } else {
        passwo.type = 'password';
    }
}
);

function icon() {
    document.getElementById('eyeicon').src = "./images/cross.jpg"
}

/* Login */
function login() {
    const email = document.getElementById('mail').value;
    const password = document.getElementById('password').value;

    const useremail = localStorage.getItem('usermail');
    const userpass = localStorage.getItem('userpassword');
    const emailInput = document.getElementById('mail');
    const passwordInput = document.getElementById('password');

    if (email !== useremail) {
        emailInput.style.borderColor = 'red';
        emailInput.placeholder = "Mail is incorrect";
        emailInput.value = '';
    } else if (password !== userpass) {
        passwordInput.style.borderColor = 'red';
        passwordInput.placeholder = "Password is incorrect";
        passwordInput.value = '';
    } else {

        localStorage.setItem("loginEmail", email);
        localStorage.setItem("password", password);
        alert("Logged in successfully!");
        window.location.href = "index.html";
    }
}

function toggleSection(sectionId) {
    document.getElementById('transaction').style.display = 'none';
    document.getElementById('withdraw').style.display = 'none';
    document.getElementById('deposit').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}

let balance = 0;
function deposit() {
    const email = localStorage.getItem('usermail'); // Get current user's email
    const depositAmount = document.getElementById('depo').value;

    // Initialize currentBalance to 0 if it's null
    let currentBalance = parseInt(localStorage.getItem(`${email}_balance`)) || 0;

    if (depositAmount !== "" && !isNaN(depositAmount) && parseInt(depositAmount) > 0) {
        let newBalance = currentBalance + parseInt(depositAmount);
        localStorage.setItem(`${email}_balance`, newBalance);
        alert("Rs." + depositAmount + " deposited successfully.");
        alert("Your balance is " + newBalance);
        history("DEPOSIT", 1, depositAmount,"SELF");
        displayProfile(); // Update profile display with new balance
    } else {
        alert("Please enter a valid amount.");
    }
}

function withdraw() {
    const email = localStorage.getItem('usermail'); // Get current user's email
    const withdrawAmount = document.getElementById('draw').value;

    // Initialize currentBalance to 0 if it's null
    let currentBalance = parseInt(localStorage.getItem(`${email}_balance`)) || 0;

    if (withdrawAmount !== "" && !isNaN(withdrawAmount) && parseInt(withdrawAmount) > 0) {
        let newBalance = currentBalance - parseInt(withdrawAmount);

        if (newBalance < 2000) {
            alert("Insufficient balance to send this amount.Minimum balance Rs.2000 needed");
            history("WITHDRAW", 0, withdrawAmount);
        } else {
            localStorage.setItem(`${email}_balance`, newBalance);
            alert("Rs." + withdrawAmount + " withdrawn successfully.");
            alert("Your balance is " + newBalance);
            history("WITHDRAW", 1, withdrawAmount,"SELF");
            displayProfile(); // Update profile display with new balance
        }
    } else {
        alert("Please enter a valid amount.");
    }
}

function transac() {
    const email = localStorage.getItem('usermail'); // Get current user's email
    const receiverAccount = document.getElementById('accountrec').value;
    const amount = document.getElementById('amount').value;

    // Initialize currentBalance to 0 if it's null
    let currentBalance = parseInt(localStorage.getItem(`${email}_balance`)) || 0;

    if (amount !== "" && !isNaN(amount) && parseInt(amount) > 0) {
        let newBalance = currentBalance - parseInt(amount);

        if (newBalance < 2000) {
            alert("Insufficient balance to send this amount. Minimum balance Rs.2000 needed");
            history("TRANSFER", 0, amount);
        } else {
            localStorage.setItem(`${email}_balance`, newBalance);
            alert(`Rs.${amount} sent successfully.`);
            alert("Your balance is " + newBalance);
            history("TRANSFER", 1, amount,receiverAccount);
            displayProfile(); // Update profile display with new balance
        }
    } else {
        alert("Please enter a valid amount.");
    }
}

function history(transactionType, result, transactionAmount,receiverAccount) {
    const email = localStorage.getItem('usermail'); // Get current user's email
    let amount = localStorage.getItem(`${email}_balance`);
    let transactionHistory = JSON.parse(localStorage.getItem(`${email}_transactionHistory`)) || [];

    let transaction = {
        type: transactionType,
        amount: transactionAmount,
        balance: amount,
        accountNumber: result === 1 ? receiverAccount : "FAILED"
    };

    // Add the new transaction to the history array
    transactionHistory.push(transaction);

    // Store the updated transaction history back in local storage
    localStorage.setItem(`${email}_transactionHistory`, JSON.stringify(transactionHistory));

    // Display the transaction in the grid format
    displayTransactionHistory();
}

function displayProfile() {
    const email = localStorage.getItem('usermail');
    const name = localStorage.getItem('usernamefirst');
    const nam = localStorage.getItem('usernamelast');
    let amount = localStorage.getItem(`${email}_balance`);

    if (amount === null || amount === "") {
        amount = "0";
    }

    document.getElementById('row1').innerHTML = 'Name: ' + name + " " + nam;
    document.getElementById('row2').innerHTML = 'Email id: ' + email;
    document.getElementById('row3').innerHTML = "Balance: " + amount;
}

function displayTransactionHistory() {
    const email = localStorage.getItem('usermail'); // Get current user's email
    let transactionHistory = JSON.parse(localStorage.getItem(`${email}_transactionHistory`)) || [];

    // Get the container where transactions will be displayed
    let historyContainer = document.getElementById('history-container');
    historyContainer.innerHTML = '';  // Clear the container before adding new transactions

    // Iterate through each transaction and display it in the grid
    transactionHistory.forEach(transaction => {
        let transactionDiv = document.createElement('div');
        transactionDiv.className = 'transaction-item bg-gray-100 p-4 rounded-lg shadow-md';
        transactionDiv.innerHTML = `
            <div class="font-semibold">Type: ${transaction.type}</div>
            <div>Amount: Rs.${transaction.amount}</div>
            <div>Balance: Rs.${transaction.balance}</div>
            <div>Account: ${transaction.accountNumber}</div>
        `;

        historyContainer.appendChild(transactionDiv);
    });
}
