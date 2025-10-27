const newJokeBtn = document.querySelector("#js-new-joke");
const showPunchlineBtn = document.querySelector("#js-show-punchline");
const jokeSetup = document.querySelector("#js-joke-setup");
const jokePunchline = document.querySelector("#js-joke-punchline");
const loader = document.querySelector("#loader");

const endpoint = "https://official-joke-api.appspot.com/random_joke";

let currentJoke = { setup: "", punchline: "" };

async function getJoke() {
  showLoader();
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(response.statusText);
    const data = await response.json();
    currentJoke.setup = data.setup;
    currentJoke.punchline = data.punchline;
    displaySetup(currentJoke.setup);
  } catch (err) {
    jokeSetup.textContent = "Oops! Failed to fetch a joke.";
    jokePunchline.textContent = "";
  } finally {
    hideLoader();
  }
}

function displaySetup(setup) {
  jokeSetup.textContent = setup;
  jokePunchline.textContent = "";
}

function showPunchline() {
  jokePunchline.textContent = currentJoke.punchline;
}

function showLoader() {
  loader.style.display = "flex";
  jokeSetup.textContent = "";
  jokePunchline.textContent = "";
}

function hideLoader() {
  loader.style.display = "none";
}

newJokeBtn.addEventListener("click", getJoke);
showPunchlineBtn.addEventListener("click", showPunchline);

// Load a joke on page start
getJoke();
