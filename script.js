window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let quote = document.querySelector('.quote');
  let author = document.querySelector('.author')

//Cors Error proxy
const proxy = 'https://cors-anywhere.herokuapp.com/';


//Get and Display daily Quote

  const quoteApi = `${proxy}http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`

  fetch(quoteApi)
    .then(response =>{
      return response.json();
    })
    .then(data =>{
      quote.textContent = data.quoteText;
      author.textContent = data.quoteAuthor;
    });

//Get and Display Weather based on lon and lat
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const weatherApi = `${proxy}https://api.darksky.net/forecast/0609b19441c8c0c15e3fa0fa7e0d1418/${lat},${long}`;

      fetch(weatherApi)
        .then(response =>{
          return response.json();
        })
        .then(data =>{
          const { temperature, summary } = data.currently;

          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
        });
  });

  }
});
