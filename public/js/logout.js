// const showAlert = (type, msg) => {
//     hideAlert();
//     const markup = `<div class="alert alert--${type}">${msg}</div>`;
//     document.body.insertAdjacentHTML('afterbegin', markup);
//     window.setTimeout(hideAlert, 2000);
//   };
  
//   const hideAlert = () => {
//     const alertElement = document.querySelector('.alert');
//     if (alertElement) {
//       alertElement.parentElement.removeChild(alertElement);
//     }
//   };

const logOutDoc = document.querySelector('.logout')


const logOutFn = async () => {
    try {
        const res = await fetch('/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
 });

        if (res.ok) {
            window.location.href = '/login';
        }

    } catch (error) {
        console.error(error.message);
    }
};

logOutDoc.addEventListener('click', ()=>{
    logOutFn()
})