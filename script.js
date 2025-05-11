const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const inputWord = document.getElementById("inp-word");
// const example = document.querySelectorAll("h3")[1];
let word = "";
let searchWord = async () => {
    // if(inputWord.value === "word"){
    //     alert("True")
    // }else{
    //     alert("False");
    // }
    btn.disabled = true;
    setTimeout(() => {
        btn.disabled = false;
    }, 800);
    inputWord.disabled = true;
    setTimeout(() => {
        inputWord.disabled = false;
    }, 800);
    try {
        word = inputWord.value.trim();
        if (!word) {
            alert("Please type the word!");
            return;
        }

        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const response = await fetch(url);
        const data = await response.json();
        //     console.log(data[0].meanings[0].definitions[0].definition);

        // example.innerHTML = data[0].meanings[0].definitions[0].definition;

        sound.src = "";
        if (data.title === "No Definitions Found") {
            result.innerHTML = `<p class="loading">Loading...</p>`;
            setTimeout(() => {
                result.innerHTML = `<h3 id="error">Result Not Found</h3>`;
            }, 500);
        }
        else {
            result.innerHTML = `<p class="loading">Loading...</p>`;

            setTimeout(() => {
                result.innerHTML = `<div class="word">
                <h3>${word}</h3>
                <button onclick="playSound()">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic}</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>`;

                // sound.src = `${data[0].phonetics[0].audio}`;

                for (let phonetic of data[0].phonetics) {
                    if (phonetic.audio) {
                        sound.src = phonetic.audio;
                        break;
                    }
                }
            }, 500);
        }


    }
    catch (err) {
        result.innerHTML = `<p class="loading">Loading...</p>`
        setTimeout(() => {
            result.innerHTML = `<h3 id="error" style="color: red;">Result Not Found</h3>`;
        }, 500)

        console.log(err);

    }
    // console.log(data);
    // console.log(sound);

}

btn.addEventListener('click', searchWord);
inputWord.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        searchWord();
    }
});
function playSound() {

    if (sound.src && sound.src !== window.location.href) {
        sound.play().catch(() => {
            alert("Unable to play the sound.");
        });
    } else {
        alert(`Voice is not available for ${inputWord.value.toUpperCase()}.`);
    }
}


