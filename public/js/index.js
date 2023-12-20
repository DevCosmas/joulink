const hamburgerIcon= document.querySelector('.harmbuger')
const body= document.getElementsByTagName('body')
const stickIcon=document.querySelector('#sticky--icon')
const stickCancel=document.querySelector('#stick-cancel')
const cancelIcon=document.querySelector('.cancel')
const landingNavigation=document.querySelector('.landing-nav')
const mobileViewNavigation=document.querySelector('.fixed-nav')
const tutorNavigation=document.querySelector('.tutor--nav')
const answerEl= document.querySelector('.answer')
const activeElements= document.querySelectorAll('.Q-wrapper')



activeElements.forEach(el=>{
  el.addEventListener('click', event=>{
    el.classList.toggle("active")
    

  })
})






const changeNavState=  function(disNone, disBlock){
    disBlock.style.display='block'
    disNone.style.display='none'
   
   }

   const defaulltNavState= (disFlex, disNone)=>{
    disFlex.style.display='flex'
    disNone.style.display='none'
   
   }



hamburgerIcon.addEventListener('click', function(){
 changeNavState(landingNavigation,mobileViewNavigation)
  })
  cancelIcon.addEventListener('click', function(){
    defaulltNavState(landingNavigation,mobileViewNavigation)
        
        
    })
  stickIcon.addEventListener('click', function(){
    changeNavState(tutorNavigation,mobileViewNavigation)
  })

stickCancel.addEventListener('click', function(){
    defaulltNavState(tutorNavigation,mobileViewNavigation)
        
        
    })