const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${msg}</div>`;
  document.body.insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 5000);
};

const hideAlert = () => {
  const alertElement = document.querySelector('.alert');
  if (alertElement) {
    alertElement.parentElement.removeChild(alertElement);
  }
};

document.getElementById('studentForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const studentForm = new FormData();

  studentForm.append('firstname', document.getElementById('firstname').value);
  studentForm.append('lastname', document.getElementById('lastname').value);
  studentForm.append('password', document.getElementById('password').value);
  studentForm.append(
    'confirmPassword',
    document.getElementById('confirmPassword').value
  );
  studentForm.append('photo', document.getElementById('photo').files[0]);
  studentForm.append('email', document.querySelector('#email').value);

  try {
    const res = await fetch('/api/sign_Up', {
      method: 'POST',
      body: studentForm,
    });

    if (res.ok) {
      const data = await res.json();
      showAlert('success', data.message);
      window.setTimeout(() => {
        location.assign('/login');
      }, 1000);
      console.log(data);
    } else {
      const response = await res.json();
      console.log(response);
      showAlert('fail', response.message);
    }
  } catch (err) {
    showAlert('fail', 'Something went really wrong!');
    console.log(err);
  }

  document.getElementById('studentForm').reset();
});
