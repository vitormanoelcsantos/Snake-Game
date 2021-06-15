let list = document.querySelector('.list');

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

async function resultC() {
    await fetch("https://swapi.dev/api/people/", requestOptions).then(function (response) {
        return response.json();
    }).then(function (data) {
        const resultSort = data.results.sort(compare);
        for (const index in resultSort) {
            var li = document.createElement('li');
            li.textContent = `${resultSort[index].name} - ${resultSort[index].mass}`;
            list.appendChild(li);
        }
    })
}

function compare(a, b) {
    return b.mass - a.mass;
}

async function show() {
    resultC();
    showRanking();
}


