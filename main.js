const apiKey = 'd9cb3e0619a54641941194737231107';


const form = document.querySelector('.form');
const input = document.querySelector('.input');
const header = document.querySelector('.header');
let city;

form.onsubmit = function (event) {
    event.preventDefault(); //отмена отпрвки формы
    city = input.value.trim();

    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);

        if (data.error) {//если есть ошибка
            const prevCard = document.querySelector('.card');//удаление предидущей карточки
            if (prevCard) {
                prevCard.remove();
            }

            const html = `<div class="card">${data.error.message}</div>`;
            header.insertAdjacentHTML('afterend', html);
        } else {
            const prevCard = document.querySelector('.card');//удаление предидущей карточки
            if (prevCard) {
                prevCard.remove();
            }

            let html = `<div class="card">
                        <h2 class="card-citi">${data.location.name}<span>${data.location.country}</span></h2>
                        <div class="card-weather">
                            <div class="card-temperature">${data.current.temp_c}<sup>°C</sup></div>
                            <img src="cloudy_1146869.png" alt="weather" class="card-image">
                        </div>
                        <div class="card-descrition">${data.current.condition.text}</div>
                    </div>`;

            header.insertAdjacentHTML('afterend', html);
        }
    });
}