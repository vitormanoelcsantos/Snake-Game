let list = document.querySelector('.list');

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

async function result() {
    await fetch("", requestOptions).then(function (response) {
        return response.json();
    }).then(function (data) {
        alert(data);
    })
}


async function resultC() {
    await fetch("https://swapi.dev/api/people/", requestOptions).then(function (response) {
        return response.json();
    }).then(function (data) {
        for (const index in data.results) {
            var li = document.createElement('li');
            li.textContent = `${data.results[index].name} - ${data.results[index].height}`;
            list.appendChild(li);
        }
    })
}


async function show() {
    resultC();
    showRanking();
}


