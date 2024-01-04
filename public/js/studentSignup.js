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
  studentForm.append('DOB', document.getElementById('DOB').value);
  studentForm.append('gender', document.getElementById('gender').value);
  studentForm.append(
    'stateOfOrigin',
    document.getElementById('stateOfOrigin').value
  );
  studentForm.append(
    'homeAddress',
    document.getElementById('homeAddress').value
  );
  studentForm.append('course', document.getElementById('course').value);
  studentForm.append('lessonTime', document.getElementById('lessonTime').value);
  studentForm.append(
    'paymentMethod',
    document.getElementById('paymentMethod').value
  );
  studentForm.append('photo', document.getElementById('photo').files[0]);
  studentForm.append('email', document.querySelector('.email').value);

  try {
    const res = await fetch('/api/student_form', {
      method: 'POST',
      body: studentForm,
    });

    if (res.ok) {
      const data = await res.json();
      showAlert('success', data.message);
      window.setTimeout(() => {
        location.assign('/checkEmail');
      }, 1000);
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
