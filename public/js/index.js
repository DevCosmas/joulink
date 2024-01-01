// import { signUpFn } from "./studentSignup"
const hamburgerIcon = document.querySelector('.harmbuger');
const body = document.getElementsByTagName('body');
const stickIcon = document.querySelector('#sticky--icon');
const stickCancel = document.querySelector('#stick-cancel');
const cancelIcon = document.querySelector('.cancel');
const landingNavigation = document.querySelector('.landing-nav');
const mobileViewNavigation = document.querySelector('.fixed-nav');
const tutorNavigation = document.querySelector('.tutor--nav');
const answerEl = document.querySelector('.answer');
const activeElements = document.querySelectorAll('.Q-wrapper');

// const studentForm= document.querySelector('.studentForm')

activeElements.forEach((el) => {
  el.addEventListener('click', (event) => {
    el.classList.toggle('active');
  });
});

const changeNavState = function (disNone, disBlock) {
  disBlock.style.display = 'block';
  disNone.style.display = 'none';
};

const defaulltNavState = (disFlex, disNone) => {
  disFlex.style.display = 'flex';
  disNone.style.display = 'none';
};

hamburgerIcon.addEventListener('click', function () {
  changeNavState(landingNavigation, mobileViewNavigation);
});
cancelIcon.addEventListener('click', function () {
  defaulltNavState(landingNavigation, mobileViewNavigation);
});
stickIcon.addEventListener('click', function () {
  changeNavState(tutorNavigation, mobileViewNavigation);
});

stickCancel.addEventListener('click', function () {
  defaulltNavState(tutorNavigation, mobileViewNavigation);
});

//     studentForm.addEventListener('submit',(e)=>{
//       e.preventDefault()

//       const firstName= document.querySelector('.firstname')
//       const lastName= document.querySelector('.lastname')
//       const gender= document.querySelector('.gender')
//       const DOB= document.querySelector('.DOB ')
//       const  stateOfOrigin= document.querySelector('.stateOfOrigin')
//       const  homeAddress= document.querySelector('.homeAdress')
//       const  course= document.querySelector('.course')
//       const  lessonTime= document.querySelector('.lessonTime')
//       const  paymentMethod= document.querySelector('.paymentMethod')
//       const  photo= document.querySelector('.photo')
//       const  email= document.querySelector('.email')

// signUpFn(firstName,lastName,gender,DOB, stateOfOrigin,homeAddress,course,lessonTime, paymentMethod,
//   photo,email)

//   studentForm.reset()
//  })
