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