let list = document.querySelector('.list');

var requestOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    mode: 'cors',
    cache: 'default'
};

async function resultC() {
    await fetch("https://api-rpg-game.herokuapp.com/tempscore", requestOptions).then((response) => {
        return response.json();
    }).then((data) => {
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


