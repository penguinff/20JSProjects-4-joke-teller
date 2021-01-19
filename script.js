const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const jokeContent = document.getElementById('joke-content');

// Disable / Ennable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to VoiceRSS API (in voice.js)
function tellMe(joke) {
    VoiceRSS.speech({
        key: 'e549dc01cc29499cba3846f7710f2753',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Show Joke on Screen
function showJoke(joke) {
    jokeContent.textContent = joke;
}

// Get Jokes from Joke API
async function getJokes() {
    // Disable Button
    toggleButton();
    // getJokes()
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Show the joke on the screen
        showJoke(joke);
    } catch(error) {
        //Catch Errors Here
        console.log('whoops', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);