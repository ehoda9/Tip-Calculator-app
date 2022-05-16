const reset = document.querySelector('.reset');
const btns = document.querySelectorAll('.btn');
const customTip = document.querySelector('#number');
const bill = document.querySelector('#money');
const numOfPeople = document.querySelector('#people');
const tip = document.querySelector('.output.tip');
const total = document.querySelector('.output.total');

bill.value = 142.55; // default values
numOfPeople.value = 5;// default values

customTip.addEventListener('click', custom);
btns.forEach((e) => {
    e.addEventListener('click', () => {
        btns.forEach((e) => e.classList.remove('active'));
        e.classList.add('active');
        validate();
        calc(parseFloat(bill.value), numOfPeople.value, (e.dataset.tax));
    });
});

// Sample tax calculator function 
function calc(b, p, t) {
    let tipA = (Math.max((b * t / p) * 100) / 100).toFixed(2);
    let totalA = (Math.max(p / t)).toFixed(2);
    tip.innerHTML = `$${tipA}`;
    total.innerHTML = `$${totalA}`;
}

// auto reload for custom tip with setinterval
// but when click out the div stop clearinterval
function custom() {
    let check = setInterval(() => {
        calc(parseFloat(bill.value), numOfPeople.value, parseFloat(customTip.value / 100));
    }, 500);
    window.onclick = (event) => {
        if (!event.target.matches('#number')) {
            clearInterval(check);
        }
    }
}
// check inputs 
function validate() {
    // get errors spans to edit by dom
    const billE = document.querySelector('.billError');
    const peopleE = document.querySelector('.peopleError');
    if (isNaN(bill.value)) {
        billE.innerHTML = 'This not a number !';
        billE.style.display = 'block';
        bill.classList.add('error');
        setTimeout(() => {
            billE.style.display = 'none';
            bill.classList.remove('error');
        }, 2000);
    } else if (isNaN(numOfPeople.value)) {
        peopleE.innerHTML = 'This not a number !';
        peopleE.style.display = 'block';
        numOfPeople.classList.add('error');
        setTimeout(() => {
            peopleE.style.display = 'none';
            numOfPeople.classList.remove('error');
        }, 2000);
    } else if (bill.value == '') {
        billE.innerHTML = "Can't be empty !";
        billE.style.display = 'block';
        bill.classList.add('error');
        setTimeout(() => {
            billE.style.display = 'none';
            bill.classList.remove('error');
        }, 2000);
    } else if (numOfPeople.value == '') {
        peopleE.innerHTML = "Can't be empty !";
        peopleE.style.display = 'block';
        numOfPeople.classList.add('error');
        setTimeout(() => {
            peopleE.style.display = 'none';
            numOfPeople.classList.remove('error');
        }, 2000);
    }
}

reset.addEventListener('click', () => {
    btns.forEach(() => btns.forEach((e) => e.classList.remove('active')));
    tip.innerHTML = '$0.00';
    total.innerHTML = '$0.00';
});

// onload click on 15% button as default
window.onload = () => document.querySelector('.btn:nth-child(3)').click();