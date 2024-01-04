
const showAlert = (type, msg) => {
    hideAlert();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.body.insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(hideAlert, 2000);
  };
  
  const hideAlert = () => {
    const alertElement = document.querySelector('.alert');
    if (alertElement) {
      alertElement.parentElement.removeChild(alertElement);
    }
  };

const confirmEmail = async () => {
  const url = window.location.href;
  const id = url.split('/')[4];
  console.log(id);
  try {
    
    const res = await fetch(`/api/confirmEmail/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      const data = await res.json();
      showAlert('success', data.message);
    } else {
      const errorResponse = await res.json();
      console.log(errorResponse);
      showAlert('fail', errorResponse.message);
    }
  } catch (err) {
    showAlert('fail', 'Something went really wrong');
    console.log(err);
  }
};

confirmEmail();

