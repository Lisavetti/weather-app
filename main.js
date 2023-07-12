const apiKey = 'd9cb3e0619a54641941194737231107';


const form = document.querySelector('.form');
const input = document.querySelector('.input');
const header = document.querySelector('.header');
let city;

function removeCard() {
    const prevCard = document.querySelector('.card');//удаление предидущей карточки
    if (prevCard) {
        prevCard.remove();
    }
}

function showError(errorMessage) {
    const html = `<div class="card">${data.error.message}</div>`;
    header.insertAdjacentHTML('afterend', html);
}

function showCard(name, country, temp_c, condition, png) {
    let html = `<div class="card">
    <h2 class="card-citi">${name}<span>${country}</span></h2>
    <div class="card-weather">
        <div class="card-temperature">${temp_c}<sup>°C</sup></div>
        <img src="${png}" alt="weather" class="card-image">
    </div>
    <div class="card-descrition">${condition}</div>
</div>`;

    header.insertAdjacentHTML('afterend', html);
}

form.onsubmit = function (event) {
    event.preventDefault(); //отмена отпрвки формы
    city = input.value.trim();

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);

        if (data.error) {//если есть ошибка
            removeCard();
            showError(data.error.message);
        } else {
            removeCard();

        showCard(data.location.name, data.location.country, data.current.temp_c, data.current.condition.text, data.current.condition.icon);
        }
    });
}