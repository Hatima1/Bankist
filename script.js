'use strict';


// BANKIST APP

/////////////////////////////////////////////////
// Data



const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
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
    '2022-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'en-us', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
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
  owner: 'hatim alkhalifa',
  movements: [5000, 3400, -150,-30],
  interestRate: 1.5,
  pin: 1234,

  movementsDates: [
   
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};


const accounts = [account1, account2, account3];




/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const wrong = document.querySelector('.wrong');

const containerApp = document.querySelector('.app');
const fake = document.querySelector('.fakeUser');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions
//time

const timer=function(){
  let time=300
 const tim= setInterval(function(){
    let min=String( Math.floor( time/60)).padStart(2,0)
    let sec=String( Math.floor( time%60)).padStart(2,0)
labelTimer.textContent=`${min}:${sec} `
time--;
if(time===0){
  clearInterval(tim)
  containerApp.style.opacity=0
  
  labelWelcome.textContent=`please log in`
}


  },1000)
  return tim
 
  }
 
/////////////////////////////////////////////////
// add movements
let disblay=function(mov,sort=false){
 
  fake.innerHTML=""
  fake.classList.remove("fakeUser")
  console.log(mov)
  let newmov=sort?mov.movements.slice().sort((a,b)=>a-b):mov.movements
  
  
  newmov.forEach(function(mpv,i) {
    let ty=mpv>0?'deposit':'withdrawal'
   
    
    let x=new Date(mov.movementsDates[i])

let year=x.getFullYear()
let day=x.getDate()
let month=x.getMonth()
const displaydate=`${year}/${month}/${day}`
 


   let html=`
    
          
        <div class="movements__row">
        <div class="movements__type movements__type--${ty}" >${i +1} 
        ${ty}  </div>
        
        <div class="movements__date"> ${displaydate} </div>
        <div class="movements__value"> ${mpv.toFixed(2)} </div>
        </div>
        
    
    `
    
    
        containerMovements.insertAdjacentHTML('afterbegin', html);
      });
     
}



///// create user name
let us=function(acc){
  acc.forEach(function(c){ 
    c.username=c.owner.split(" ").map(function(v){
      return v[0]
    }).join("").toLocaleLowerCase()
  })
}
us(accounts)

//blace
let displaybalnc=function(ar){
  const sum=ar.movements.reduce(function(a,b){
    return a+b
  },0)
 labelBalance.textContent=`${sum} €`
 ar.blace=sum
 
 
   
}

////summary

const summary=function(ar){
  
  let tot=ar.movements.filter(a=>a>0).reduce((a,b)=>a+b,0)
  labelSumIn.textContent=`${tot.toFixed(2)}€ `


  let out=ar.movements.filter(a=>a<0).reduce((a,b)=>a+b,0)
  labelSumOut.textContent=`${Math.abs(out).toFixed(2)} € `

  let ins=ar.movements.filter(a=>a>0).map((a,b)=>(a*ar.interestRate)/100).reduce((a,b)=>a+b,0)
  labelSumInterest.textContent=`${ins.toFixed(2)}€ `

    
    
  }
    
  



let de=function(acounts){
  displaybalnc(acounts)
///
disblay(acounts)
    ///
    summary(acounts)
}
////dispaly all
// let timee=new date()
//   labelDate.textContent= new Intl.DateTimeFormat('en.us').format(timee)

let currentAccount;
let timm;
let wrongpassword=false;

btnLogin.addEventListener("click",function(e){
  

  e.preventDefault()
  
   currentAccount=accounts.find(a=>a.username===inputLoginUsername.value)
   if(!currentAccount) wrong.textContent="wrong user try again:("
   if(currentAccount.pin!==Number( inputLoginPin.value)) wrong.textContent="wrong password try again:("
   if(currentAccount.pin===Number( inputLoginPin.value)){
  wrong.textContent=" "
    labelWelcome.textContent=`good afternoon , ${currentAccount.owner.split(" ").at(0)} `
    
   

    containerApp.style.opacity=100
    

    inputLoginUsername.value=inputLoginPin.value=""
    inputLoginPin.blur()
    ///
    if(timm)clearInterval(timm)
    timm=timer()
    de(currentAccount)
      }
      ///date
     const Options={
        hour:"numeric",
        minute:"numeric",
        day:"numeric",
        month:"numeric",
        year:"numeric"
      } 
      const now=new Date()
labelDate.textContent=new Intl.DateTimeFormat(currentAccount.locale,Options).format(now)
  

  
})
//// tran
btnTransfer.addEventListener("click",function(d){

  d.preventDefault()
  
  


  let rec=accounts.find(a=>a.username===inputTransferTo.value)
  let amount=Number( inputTransferAmount.value)
  console.log(rec,amount);
  console.log(currentAccount);
  if(amount>0  && currentAccount.blace>amount && currentAccount.username!==rec.username){
    inputTransferAmount.value=inputTransferTo.value=""
    
    currentAccount.movements.push(-amount)
    rec.movements.push(amount)
    //disp
    currentAccount.movementsDates.push(new Date())
    //date
  rec.movementsDates.push(new Date())
    de(currentAccount)
    //
    clearInterval(timm)
    timm=timer()
  }

})
///close
btnClose.addEventListener("click",function(e){
  e.preventDefault()
  if(inputCloseUsername.value===currentAccount.username&&Number( inputClosePin.value)===currentAccount.pin){
    let ind=accounts.findIndex(a=>a.username===currentAccount.username)
    accounts.splice(ind,1)
    console.log(accounts);
    containerApp.style.opacity=0
    

  }

})
btnLoan.addEventListener("click",function(x){
  x.preventDefault()

  setTimeout(function(){
    let am=Number( inputLoanAmount.value)
  let an =currentAccount.movements.some(a=>a>am*0.1)
  if(an){
    inputLoanAmount.value=" "
    currentAccount.movementsDates.push(new Date().toISOString())
currentAccount.movements.push(am)
clearInterval(timm)
timm=timer()
currentAccount.movementsDates.push(new Date())

de(currentAccount)
  }


},1000)


  })
  


let swit=false;
btnSort.addEventListener("click",function(e){

  e.preventDefault();
  console.log(currentAccount)
    disblay(currentAccount,!swit);

   
    swit=!swit;
    

 
  
})
