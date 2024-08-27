const urlBackend = "https://back-lynx.vercel.app";

function timeSince(cdate) {
  let result = "";

  let now = Date.now();
  let creationdate = new Date(cdate);
  let time = Math.floor((now - creationdate) / 1000); // durée en secondes

  if (time >= 60 * 60 * 24 * 365) {
    // 365 jours soit 1 an
    let years = Math.floor(time / (60 * 60 * 24 * 365));
    result = years === 1 ? `${years} an` : `${years} ans`;
  } else if (time >= 60 * 60 * 24 * 30) {
    // 30 jours soit 1 mois
    let months = Math.floor(time / (60 * 60 * 24 * 30));
    result = months === 1 ? `${months} mois` : `${months} mois`;
  } else if (time >= 60 * 60 * 24) {
    // 24 heures soit 1 jour
    let days = Math.floor(time / (60 * 60 * 24));
    result = days === 1 ? `${days} jour` : `${days} jours`;
  } else if (time >= 60 * 60) {
    // 1 heure
    let hours = Math.floor(time / (60 * 60));
    result = hours === 1 ? `${hours} heure` : `${hours} heures`;
  } else {
    // moins d'une heure
    let minutes = Math.floor(time / 60);
    result = minutes === 1 ? `${minutes} minute` : `${minutes} minutes`;
  }

  return result;
}

function sortArrRand(arr) {
  let randomInteger = 0;
  let result = [];

  let i = arr.length;
  while (i) {
    randomInteger = Math.floor(Math.random() * arr.length);
    result.push(arr[randomInteger]);
    arr.splice(randomInteger, 1);
    i--;
  }
  return result;
}

export { urlBackend, timeSince, sortArrRand };
