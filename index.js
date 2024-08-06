const account1 = {
  // owner: 'Jonas Schmedtmann',
  owner: 'vishalsingh',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  // owner: 'Jessica Davis',
  owner: 'jd',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  // owner: 'Steven Thomas Williams',
  owner: 'stw',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  // owner: 'Sarah Smith',
  owner: 'ss',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];


////element selector
const login_btn = document.querySelector('.login_btn');
const welcombox = document.querySelector('.welcombox');
const center = document.querySelector('.center');
const username = document.querySelector('.username');
const pin = document.querySelector('.pin');
const history = document.querySelector('.history');
const main_balance = document.querySelector('.main_balance');
const transfer_to = document.querySelector('.transfer_to');
const transfer_amount = document.querySelector('.transfer_amount');
const btn_transfer = document.querySelector('.btn_transfer');
const request_amount = document.querySelector('.request_amount');
const btn_request = document.querySelector('.btn_request');
const total_in = document.querySelector('.total_in');
const total_out = document.querySelector('.total_out');
const total_interest = document.querySelector('.total_interest');
const confirm_user = document.querySelector('.confirm_user');
const confirm_pin = document.querySelector('.confirm_pin');
const btn_close = document.querySelector('.btn_close');
const short = document.querySelector('.short');
const t_date = document.querySelector('.t_date');
const m_body = document.querySelector('.m_body');
const inputloginbox = document.querySelector('.inputloginbox');
const input_pin = document.querySelector('.input_pin');
const box2 = document.querySelector('.box2');
const box = document.querySelector('.box');
const login_btn1 = document.querySelector('.login_btn1');
const logout = document.querySelector('.logout');

const updateTimer=function (){
  let timer= 0;
  let minute=10;
  const countTime=function(){
    if(timer==0){
     timer=60;
     minute--;
    }
   
    
     timer--;
     logout.textContent=`you will be logged out in ${String(minute).padStart(2,0)}:${String(timer).padStart(2,0)}`;
     if(minute==0&&timer==0){
       center.classList.add('opacity');
       box2.classList.add('opacity');
       box.classList.remove('opacity');
       welcombox.textContent = `Login to see your A/C `;
       clearInterval(time);
     }
   }
   countTime();//since wewant to start timer in login if we do not do this then timer start after login at the delay of 1 sec.
   const time=setInterval(countTime,1000);
   return time;
}



console.log(navigator.language)

const updateUi = function () {
  historyupdate(currentAccount);
  inAmount(currentAccount.movements);
  outAmount(currentAccount.movements);
  interest(currentAccount);
}


const historyupdate = function (acc, sort_b = false) {

  const date = new Date();
  const login_date = new Intl.DateTimeFormat(acc.locale).format(date);
  t_date.textContent = `as of ${login_date}`;

  const mov = sort_b ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

  history.innerHTML = '';
  mov.forEach((value, i) => {
    let type_tr = value < 0 ? 'withdrawal' : 'deposit';

    const defaul = '2/3/2002';
    history.innerHTML = `<div class="his">
    <div class="typeoftransaction">
        <div class="${type_tr}">${i + 1} ${type_tr.toUpperCase()}</div>
        <div class="date">${acc.movementsDates ? new Intl.DateTimeFormat(acc.locale).format(new Date(acc.movementsDates[i])) : defaul}</div>
    </div>
    <div class="his_balance">₹${Math.abs(value)}<span class="aerrow_${type_tr}">${value < 0 ? '↓' : '↑'}</span></div>
 </div>`+ history.innerHTML;

    //  ${acc.movementsDates?acc.movementsDates[i]:defaul}
  })

  mainBalance(mov);

}
//
const mainBalance = function (mov) {
  const sum_of_movements = mov.reduce((acc, cur) => {
    return acc + cur;
  }, 0).toFixed(2);
  console.log(sum_of_movements);
  main_balance.textContent = `₹${sum_of_movements}`;
  return sum_of_movements;
}




const inAmount = function (mov) {
  const positiveMovements = mov.filter((acc) => {
    return acc > 0;
  }).reduce((acc, cur) => {
    return acc + cur;
  }, 0).toFixed(2);
  total_in.textContent = `₹${positiveMovements}`

}
const outAmount = function (mov) {
  const negativeMovements = mov.filter((acc) => {
    return acc < 0;
  }).reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  total_out.textContent = `₹${Math.abs(negativeMovements).toFixed(2)}`;

}

const interest = function (acc) {
  const inteValue = acc.movements.filter(mov => mov > 0)
  .map(deposit => (deposit * acc.interestRate) / 100)
  .filter((int) => {
   
    return int >= 1;
  })
  .reduce((acc, int) => acc + int, 0).toFixed(2);
  // .map(cacc => cacc * acc.interestRate)
    // .reduce((acu, cur) => {
    //   return acu + cur;
    // });
  
  total_interest.textContent = `₹${inteValue}`;

}


let currentAccount,time;
login_btn.addEventListener('click', function (e) {
  e.preventDefault();
 
  accounts.forEach(acc => {
    if ((acc.owner == username.value && acc.pin == pin.value)||(acc.owner==inputloginbox.value&&acc.pin==input_pin.value)) {
      center.classList.remove('opacity');
      box.classList.add('opacity');
      welcombox.textContent = `Welcome, ${acc.owner}`;
      currentAccount = acc;
      if(time)clearInterval(time);
     time= updateTimer();
      updateUi();
     
    }
  })

  username.value = '';
  pin.value = '';
  // console.log(currentAccount);
  interest(currentAccount);
})



login_btn1.addEventListener('click', function (e) {
  e.preventDefault();
  accounts.forEach(acc => {
    if ((acc.owner == username.value && acc.pin == pin.value)||(acc.owner==inputloginbox.value && acc.pin==input_pin.value)) {
      center.classList.remove('opacity');
      box2.classList.remove('opacity');
      box.classList.add('opacity');
      welcombox.textContent = `Welcome, ${acc.owner}`;
      currentAccount = acc;
      if(time)clearInterval(time);
      time= updateTimer();
      updateUi();
    }
  })

  username.value = '';
  pin.value = '';
  inputloginbox.value ='';
  input_pin.value='';
  // console.log(currentAccount);
  interest(currentAccount);
})



btn_transfer.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(currentAccount);
  const balance = mainBalance(currentAccount.movements)
  accounts.forEach((acc, i) => {
    if (balance >= Number(transfer_amount.value) && acc.owner == transfer_to.value && currentAccount.owner != transfer_to.value) {

      currentAccount.movements.push(-Number(transfer_amount.value));
      if (currentAccount.movementsDates) {
        currentAccount.movementsDates.push(new Date().toISOString());
      } else {
      
      }

      if (acc.movementsDates) {
        acc.movementsDates.push(new Date().toISOString())
      }
      else {
      
      }
      acc.movements.push(Number(transfer_amount.value))
   

      updateUi();
    }

  })
  if(time)clearInterval(time);
  time= updateTimer();

  transfer_to.value = '';
  transfer_amount.value = '';
})


btn_request.addEventListener('click', function (e) {
  e.preventDefault();
  const inMovements = currentAccount.movements.filter((acc) => {
    return acc > 0;
  });
  if (inMovements.some(value => value > Number(request_amount.value) * 0.1)&&request_amount.value!=0) {
    currentAccount.movements.push(Number(request_amount.value));

    if (currentAccount.movementsDates) {
      currentAccount.movementsDates.push(new Date().toISOString());
    } else {
    
    }
  
    updateUi();
  }
  if(time)clearInterval(time);
  time= updateTimer();
  request_amount.value = '';
})

btn_close.addEventListener('click', function (e) {
  e.preventDefault();
  if (currentAccount.owner == confirm_user.value && currentAccount.pin == Number(confirm_pin.value)) {
    center.classList.add('opacity');
    box2.classList.add('opacity');
    box.classList.remove('opacity');
    welcombox.textContent = `Login to see your A/C `;
    clearInterval(time);
    
  }
  
  confirm_user.value = '';
  confirm_pin.value = '';
})
let sorted = false;
short.addEventListener('click', function (e) {
  e.preventDefault();
  historyupdate(currentAccount, !sorted);
  sorted = !sorted;
})