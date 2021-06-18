let list = document.querySelector('.list');

var getOptions = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
};

async function getRanking() {
    await fetch("https://api-rpg-game.herokuapp.com/tempscore", getOptions).then((response) => {
        return response.json();
    }).then((data) => {
        const resultSort = data.sort(compare);
        for (const index in resultSort) {
            var li = document.createElement('li');
            li.textContent = `${resultSort[index].nick} - ${resultSort[index].score}`;
            list.appendChild(li);
        }
    }).catch((error) => {
        console.log(error);
    })
}

function compare(a, b) {
    return b.score - a.score;
}

async function show() {
    getRanking();
    showRanking();
}


