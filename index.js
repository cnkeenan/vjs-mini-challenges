const apps = ['bin2dec', 'brp', 'calculator'];

const ul = document.getElementById('apps');
apps.forEach(app => {
    const el = document.createElement('li');

    el.innerHTML = `<a href=/${app}/${app}.html>${app}</a>`;

    ul.appendChild(el);
});