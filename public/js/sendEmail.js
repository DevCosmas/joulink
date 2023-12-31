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

const resultInput = document.querySelector('.email--placeholder');
const sendEmailForm = document.querySelector('.sendEmail');
let searchData = {};

const loginForm = document.querySelector('.filter--email');

const getRecipientMail = async (searchParams) => {
  try {
    const url = new URL('/api/studentEmail', window.location.origin);
    url.search = new URLSearchParams(searchParams).toString();

    const res = await fetch(url.href, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      const response = await res.json();
      return response.data;
    } else {
      const response = await res.json();
      showAlert('fail', response.message);
    }
  } catch (err) {
    showAlert('fail', 'Something went really wrong!');
    console.log(err);
  }
};

const sendEmail = async (emailBody, emailHead, emails) => {
  try {
    const emailDetails = {
      emailBody,
      emailHead,
      emails,
    };

    console.log(emailDetails);
    const res = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailDetails),
    });

    if (res.ok) {
      const data = await res.json();
      showAlert('success', data.message);
    } else {
      const response = await res.json();
      showAlert('fail', response.message);
    }
  } catch (err) {
    showAlert('fail', 'Something went really wrong!');
    console.log(err);
  }
};

loginForm.addEventListener('click', async () => {
  const searchInput = document
    .querySelector('.course')
    .value.trim()
    .toLowerCase();
  const isAllSelected = searchInput === 'all';
  searchData = isAllSelected ? {} : { course: searchInput };

  const data = await getRecipientMail(searchData);
  resultInput.value = JSON.stringify(data);
});

document.querySelector('.emailBtn').addEventListener('click', (e) => {
  e.preventDefault();
  const emails = resultInput.value;
  const emailHead = document.querySelector('.emailHead').value;
  const emailBody = document.querySelector('.emailbody').value;

  sendEmail(emailBody, emailHead, emails);
  sendEmailForm.reset();
});
