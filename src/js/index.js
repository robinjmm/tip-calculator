const inputs = document.querySelectorAll(".input");
const tipAmount = document.querySelector(".js-tip-amount");
const totalAmount = document.querySelector(".js-total");
const buttons = document.querySelectorAll(".js-btn-percent");
const customPercent = document.querySelector(".js-percent--custom");

const splitter = {
    bill: 0,
    numberOfPeople: 0,
    percent: 0,
    tipPerPerson: 0,
    totalPerPerson: 0,
    calculateTip: function () {
        if (this.bill !== 0 && this.numberOfPeople !== 0 && this.percent !== 0) {
            this.tipPerPerson = (this.bill * this.percent) / this.numberOfPeople;
            return parseFloat(this.tipPerPerson).toFixed(2);
        } else {
            return "0.00";
        }
    },
    calculateTotal: function () {
        if (this.tipPerPerson !== 0 && this.bill !== 0 && this.numberOfPeople !== 0 && this.percent !== 0) {
            this.totalPerPerson = (this.bill / this.numberOfPeople) + this.tipPerPerson;
            return parseFloat(this.totalPerPerson).toFixed(2);
        } else {
            return "0.00";
        }
    },
    updateTotals: function() {
        tipAmount.textContent = `$${this.calculateTip()}`;
        totalAmount.textContent = `$${this.calculateTotal()}`;
    }
}

inputs.forEach(input => {
    // Check each input for valid input type
    input.addEventListener("keydown", function (event) {
        const numbers = "0123456789";
        const {key} = event;
        const eventKeys = ["Backspace", "Delete", ".", "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"];

        if (!numbers.includes(key) && !eventKeys.includes(key)) {
            event.preventDefault();
        }
    });

    input.addEventListener("keyup", function (event) {
        if (this.id === "bill") {
            splitter.bill = Number(this.value);
        } else if (this.id === "number") {
            splitter.numberOfPeople = Number(this.value);
        } else {
            splitter.percent = Number(this.value) / 100;
        }

        splitter.updateTotals();
    });
});

buttons.forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        splitter.percent = parseFloat(this.textContent) / 100;

        // add active styles for clicked button and remove active styles from previously click button
        buttons.forEach(btn => {
            if (btn === event.currentTarget) {
                btn.classList.add("btn--active");
            } else {
                btn.classList.remove("btn--active");
            }
        });

        // remove custom percentage when a percentage button is selected
        customPercent.value = "";

        splitter.updateTotals();
    });
});

customPercent.addEventListener("click", function (event) {
    buttons.forEach(btn => {
        btn.classList.remove("btn--active");
    })
});