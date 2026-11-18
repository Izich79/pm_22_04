const person = { firstName: 'Brian R.', lastName: 'Baxter' };

const jobs = [
    { title: 'Senior Web Designer', company: 'Creative Agency / Chicago', years: '2020 - Present' },
    { title: 'Graphic Designer', company: 'Creative Market / Chicago', years: '2015 - 2020' },
    { title: 'Marketing Manager', company: 'Manufacturing Agency / NJ', years: '2013 - 2015' }
];

const skills = [
    { name: 'Adobe Photoshop', level: 85 },
    { name: 'Adobe Illustrator', level: 80 },
    { name: 'Microsoft Word', level: 90 },
    { name: 'Microsoft Powerpoint', level: 75 },
    { name: 'HTML-5/CSS-3', level: 70 }
];

const jobText = "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type.";

function setPersonName(id, p) {
    document.getElementById(id).textContent = p.firstName + ' ' + p.lastName;
}

function initToggles() {
    document.querySelectorAll('.toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const hidden = document.getElementById(btn.dataset.target).classList.toggle('is-hidden');
            btn.classList.toggle('rotated');
            btn.setAttribute('aria-expanded', String(!hidden));
        });
    });
}

function renderJobs(list, containerId) {
    const box = document.getElementById(containerId);
    box.innerHTML = '';
    list.forEach(function (j) {
        box.insertAdjacentHTML('beforeend',
            '<li class="card job">' +
            '<div class="d-flex justify-content-between">' +
            '<h3 class="item-title">' + j.title + '</h3>' +
            '<span class="job__years">' + j.years + '</span></div>' +
            '<em>' + j.company + '</em><p>' + jobText + '</p></li>');
    });
}

function renderSkills(list, containerId) {
    const box = document.getElementById(containerId);
    box.innerHTML = '';
    list.forEach(function (s) {
        box.insertAdjacentHTML('beforeend',
            '<div class="col-6"><span class="skill__name">' + s.name + '</span>' +
            '<div class="progress" role="progressbar" aria-valuenow="' + s.level + '" aria-valuemin="0" aria-valuemax="100">' +
            '<div class="progress-bar" style="width: ' + s.level + '%"></div></div></div>');
    });
}

document.addEventListener('DOMContentLoaded', function () {
    setPersonName('personName', person);
    renderJobs(jobs, 'jobsList');
    renderSkills(skills, 'skillsList');
    initToggles();
});
