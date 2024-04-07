let loadButton = document.getElementById('loadButton')
loadButton.onclick = () => {
    
    async function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log('Широта:'+ latitude);
      console.log('Долгота:' + longitude);

      let APIkey = '5367563de9b5521ff271126982a35fe3'

      let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&lang=ru`)
      let resJson = await res.json()
      console.log(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}`);

      let nameElement = document.getElementById('name')
      nameElement.innerText = 'Город: ' + resJson.name
       
      let tempElement = document.getElementById('temp')
      //tempElement.innerText = 'Температура :' + Math.round(resJson['main']['temp'] - 273) + ' C'
      tempElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-thermometer"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>` + Math.round(resJson['main']['temp'] - 273) + ' C'
      console.log(resJson);

      let cloudElement = document.getElementById('description')
      cloudElement.innerText = 'На улице:' + resJson['weather']['0']['description']

      let iconElement = document.getElementById('icon')
      iconElement.innerText = resJson['weather']['0']['icon']
      //https://openweathermap.org/img/wn/10d@2x.png
      iconElement.innerHTML = `<img  src="https://openweathermap.org/img/wn/${iconElement.innerText}@2x.png" alt=""></img>`

      let feelsLikeElement = document.getElementById('feelslike')
      feelsLikeElement.innerText = 'Ощущается как:' + Math.round(resJson['main']['feels_like']-273) + ' C'
    }
  
    function error() {
      status.textContent = "Невозможно получить ваше местоположение";
    }
  
    if (!navigator.geolocation) {
      status.textContent = "Geolocation не поддерживается вашим браузером";
    } else {
      status.textContent = "Определение местоположения…";
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }


