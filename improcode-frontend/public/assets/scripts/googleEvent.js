let gapiInited = false;
let gisInited = false;
let token = '';

window.gapiLoaded = gapiLoaded;
window.gisLoaded = gisLoaded;


gapi.client.calendar.events.list({
  calendarId: 'primary'
}).then(response => {
  if (response && response.result && response.result.items) {
    console.log('API Response:', response);
    const events = response.result.items;
    console.log('Upcoming events:', events);
  } else {
    console.error('Respuesta vacía o incompleta de la API');
  }
}).catch(error => {
  console.error('Error fetching events from Google Calendar:', error);
});

function initGapiClient() {
  gapi.client.init({
    apiKey: 'AIzaSyA6u0yN3fc5pTvJp_bTWBwsVNsr6XJegaw', 
    clientId: '842510604963-pc10r1b204dbnqu2g87qd0niu03gg704.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    scope: 'https://www.googleapis.com/auth/calendar'
  }).then(() => {
    console.log('GAPI client initialized');
    gapiInited = true;
    maybeEnableButtons();
  }).catch((error) => {
    console.error('Error initializing GAPI client:', error);
  });
}

function gapiLoaded() {
  console.log('GAPI loaded successfully');
  gapi.load('client:auth2', initGapiClient);
}

function gisLoaded() {
  gisInited = true;
  maybeEnableButtons();
}


function maybeEnableButtons() {
  if (gapiInited && gisInited) {
    document.getElementById('create-event-btn').disabled = false;
  }
}


async function authenticateAndSaveToken() {
  try {
    const googleUser = await gapi.auth2.getAuthInstance().signIn();
    token = googleUser.getAuthResponse().google_access_token;

    await fetch('http://localhost:4000/api/save-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });

    console.log('Token enviado al backend y autenticado');
  } catch (error) {
    console.error('Error durante la autenticación:', error);
  }
}

function handleCredentialResponse(response) {
  console.log("ID Token: " + response.credential);
  
  // Enviar el token al backend para su validación
  fetch('http://localhost:4000/api/validate-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${response.credential}`
    },
    body: JSON.stringify({ token: response.credential })  // El ID token se envía para validar
  }).then(res => res.json())
    .then(data => {
      console.log("Respuesta del backend:", data);
      if (data.success) {
        // Token validado exitosamente
        console.log("Token validado correctamente");
        localStorage.setItem('google_access_token', response.credential);  // Almacena el ID token en localStorage
      } else {
        console.error("Error al validar el token en el backend");
      }
    })
    .catch(error => {
      console.error('Error al enviar el token al backend:', error);
    });
}

function createGoogleEvent(eventData) {
  gapi.client.calendar.events.insert({
    calendarId: 'primary',
    resource: eventData,
  }).then(response => {
    console.log('Event created in Google Calendar: ', response);
  }).catch(error => {
    console.error('Error creating event in Google Calendar:', error);
  });
}
