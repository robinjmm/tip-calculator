const inputs = document.querySelectorAll(".input");
const tipAmount = document.querySelector(".js-tip-amount");
const totalAmount = document.querySelector(".js-total");
const buttons = document.querySelectorAll(".js-btn-percent");
const customPercent = document.querySelector(".js-percent--custom");
const resetBtn = document.querySelector(".js-reset-btn");

const splitter = {
    bill: 0,
    numberOfPeople: 0,
    percent: 0,
    tipPerPerson: 0,
    totalPerPerson: 0,
    calculate: function () {
        if (this.bill !== 0 && this.numberOfPeople !== 0 && this.percent !== 0) {
            this.tipPerPerson = (this.bill * this.percent) / this.numberOfPeople;
            tipAmount.textContent = `$${parseFloat(this.tipPerPerson).toFixed(2)}`;

            this.totalPerPerson = (this.bill / this.numberOfPeople) + this.tipPerPerson;
            totalAmount.textContent = `$${parseFloat(this.totalPerPerson).toFixed(2)}`;

            resetBtn.classList.add("reset--active");
            resetBtn.disabled = false;
        }
    }
}

inputs.forEach(input => {
    // Check each input for invalid input type
    input.addEventListener("keydown", function (event) {
        const numbers = "0123456789";
        const {key} = event;
        const eventKeys = ["Backspace", "Delete", ".", "ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Alt", "Control", "CapsLock", "Tab"];

        if (!numbers.includes(key) && !eventKeys.includes(key)) {
            event.preventDefault();
            let previousElement = this.previousElementSibling;

            this.classList.add("input--error");

            // Allow the shake animation to complete before removing it.
            // This allows the input--error class animation to run again when another invalid input type is pressed.
            setTimeout(() => {
                this.classList.remove("input--error");
            }, 300)

            // Check if the previous element of the input has a label element
            if (previousElement.children.length > 0) {
                previousElement.children[1].style.display = "block";

                setTimeout(() => {
                    previousElement.children[1].style.display = "none";
                }, 300)
            }
        }
    });

    // Check for valid input type
    input.addEventListener("keyup", function () {

        if (this.id === "bill") {
            splitter.bill = Number(this.value);
        } else if (this.id === "number") {
            splitter.numberOfPeople = Number(this.value);
        } else {
            splitter.percent = Number(this.value) / 100;
        }

        splitter.calculate();
    });
});

buttons.forEach(button => {
    button.addEventListener("click", function (event) {
        event.preventDefault();
        splitter.percent = parseFloat(this.textContent) / 100;

        // Add active styles for clicked button and remove active styles from previously clicked button.
        buttons.forEach(btn => {
            if (btn === event.currentTarget) {
                btn.classList.add("btn--active");
            } else {
                btn.classList.remove("btn--active");
            }
        });

        // Remove custom percentage when a percentage button is selected.
        customPercent.value = "";

        splitter.calculate();
    });
});

customPercent.addEventListener("click", function () {
    buttons.forEach(btn => {
        btn.classList.remove("btn--active");
    })
});

resetBtn.addEventListener("click", function (event) {
    event.preventDefault();

    inputs.forEach(input => {
        input.value = "";
    });

    buttons.forEach(btn => {
        btn.classList.remove("btn--active");
    });

    splitter.bill = 0;
    splitter.numberOfPeople = 0;
    splitter.percent = 0;
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
    resetBtn.classList.remove("reset--active");
    resetBtn.disabled = true;
});