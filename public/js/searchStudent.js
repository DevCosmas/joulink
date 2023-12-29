async function filterStudents() {
    try {
        const searchValue = document.getElementById('searchInput').value.toLowerCase();
        const response = await fetch(`/api/allStudent?firstname=${searchValue}`);
        const data = await response.json();
        if (response.ok) {
            displayStudentProfiles(data.students);
        } else {
            console.log('Error:', data.message);
        }
    } catch (error) {
        console.log('Error:', error);
    }
}

function displayStudentProfiles(students) {
    const studentProfiles = document.getElementById('overview--container');
    studentProfiles.innerHTML = null;

    students.forEach(student => {
        const profileContainer = document.createElement('div');
        profileContainer.classList.add('student--profile--container');

        const img = document.createElement('img');
        img.src = student.photo;
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
document.querySelector('.filter--btn').addEventListener('click',(e)=>{
    e.preventDefault()
    filterStudents()
})