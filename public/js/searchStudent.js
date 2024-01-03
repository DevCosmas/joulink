

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

async function filterStudents() {
  try {
    const searchValue = document
      .getElementById('searchInput')
      .value.toLowerCase();
    const response = await fetch(`/api/allStudent?firstname=${searchValue}`);
    const data = await response.json();
    if (response.ok) {
      displayStudentProfiles(data.students);
    } else {
      const data = await response.json();
      console.log(data)
      showAlert('fail', data.message);
    }
  } catch (error) {
    showAlert('fail', 'Something went really wrong!');
    console.log(error);
  }
}

function displayStudentProfiles(students) {
  const studentProfiles = document.getElementById('overview--container');
  studentProfiles.innerHTML = null;

  students.forEach((student) => {
    const profileContainer = document.createElement('div');
    profileContainer.classList.add('student--profile--container');

    const img = document.createElement('img');
    img.src = `/img/users/${student.photo}`;
    img.alt = 'Student Photo';
    img.classList.add('student--profile');

    const link = document.createElement('a');
    link.href = `/studentProfile/${student._id}`;
    link.classList.add('student--name');
    link.textContent = `${student.firstname} ${student.lastname}`;

    profileContainer.appendChild(img);
    profileContainer.appendChild(link);
    studentProfiles.appendChild(profileContainer);
  });
}
document.querySelector('.filter--btn').addEventListener('click', (e) => {
  e.preventDefault();
  filterStudents();
});
