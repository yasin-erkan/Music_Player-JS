/* Reaching the objects using DOM*/
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playListButton = document.getElementById("playlist");

const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");

const progressBar = document.getElementById("progress-bar");
const playListContainer = document.getElementById("playlist-container");
const closeButton = document.getElementById("close-button");
const playListSongs = document.getElementById("playlist-songs");

const currentProgress = document.getElementById("current-progress");

let index;

let loop = true;

const songsList = [
  {
    name: "Bu Gece",
    link: "songs/Tarkan-Bu-Gece.mp3",
    artist: "Tarkan",
    image: "images/tarkan.jpeg",
  },
  {
    name: "Bir ihtimal Biliyorum",
    link: "songs/Gulsen-Bir-Ihtimal-Biliyorum.mp3",
    artist: "Gulsen",
    image: "images/gulsen.png",
  },
  {
    name: "I'm Blue",
    link: "songs/Eiffel-65-Blue-Da-Ba-Dee.mp3",
    artist: "Eiffel-65",
    image: "images/eiffel-65.jpg",
  },
  {
    name: "La Isla Bonita",
    link: "songs/Madonna-La-Isla-Bonita.mp3",
    artist: "Madonna",
    image: "images/la isla bonita.jpg",
  },
  {
    name: "My immortal",
    link: "songs/Evanescence-Bring-Me-To-Life.mp3",
    artist: "Evanescence",
    image: "images/evanescence-photo.jpg",
  },
  {
    name: "Larger than life",
    link: "songs/dinle.mp3",
    artist: "Backstreet-Boys",
    image: "images/larger_than_life.jpg",
  },
];

//attaining a song
const setSong = (arrayIndex) => {
  console.log(arrayIndex);
  let { name, link, artist, image } = songsList[arrayIndex];
  audio.src = link;
  songName.innerHTML = name;
  songArtist.innerHTML = artist;
  songImage.src = image;

  audio.onloadedmetadata = () => {
    //duration
    maxDuration.innerText = timeFormatter(audio.duration);
  };
  playAudio();
  playListContainer.classList.add("hide");
};

//playin song
const playAudio = () => {
  audio.play();
  pauseButton.classList.remove("hide");
  playButton.classList.add("hide");
};

//pausing
const puaseAudio = () => {
  audio.pause();
  pauseButton.classList.add("hide");
  playButton.classList.remove("hide");
};

//play the previous one
const previousSong = () => {
  puaseAudio();
  if (index > 0) {
    index -= 1;
  } else {
    index = songsList.length - 1;
  }
  setSong(index);
  playAudio();
};

//jouer la prochaine
const nextSong = () => {
  if (loop) {
    if (index == songsList.length - 1) {
      index = 0;
    } else {
      index += 1;
    }
    setSong(index);
  } else {
    let randIndex = Math.floor(Math.random() * songsList.length);
    setSong(randIndex);
  }
  playAudio();
};

// when you reach the last of the list
audio.onended = () => {
  nextSong();
};

//shuffle
shuffleButton.addEventListener("click", () => {
  if (shuffleButton.classList.contains("active")) {
    shuffleButton.classList.remove("active");
    loop = true;
  } else {
    shuffleButton.classList.add("active");
    loop = false;
  }
});

//repeating
repeatButton.addEventListener("click", () => {
  if (repeatButton.classList.contains("active")) {
    repeatButton.classList.remove("active");
    loop = false;
  } else {
    repeatButton.classList.add("active");
    loop = true;
  }
});

//setting the  timer
const timeFormatter = (timeInput) => {
  let minute = Math.floor(timeInput / 60);
  minute = minute < 10 ? "0" + minute : minute;
  let second = Math.floor(timeInput % 60);
  second = second < 10 ? "0" + second : second;
  return `${minute}:${second}`;
};

//total time in the song
audio.addEventListener("timeupdate", () => {
  currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

//calculating the process on the song
progressBar.addEventListener("click", (event) => {
  let coordStart = progressBar.getBoundingClientRect().left;
  console.log(coordStart);

  let coordEnd = event.clientX;
  console.log(coordEnd);

  let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

  currentProgress.style.width = progress * 100 + "%";

  audio.currentTime = progress * audio.duration;

  playAudio();
});

//Timer
setInterval(() => {
  console.log(audio.duration.toFixed(3));
  currentProgress.style.width =
    (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
}, 1000);

//creating a list
const initializePlaylist = () => {
  for (let i in songsList) {
    playListSongs.innerHTML += `<li class="playlistSong"
        onclick="setSong(${i})">
        <div class="playlist-image-container">
            <img src="${songsList[i].image}" />
        </div>
        <div class="playlist-song-details">
            <span id="playlist-song-name">
                ${songsList[i].name}
            </span>
            <span id="playlist-song-artist-album">
                ${songsList[i].artist}
            </span>
        </li>`;
  }
};

//closing the song-list
closeButton.addEventListener("click", () => {
  playListContainer.classList.add("hide");
});

//opening song list
playListButton.addEventListener("click", () => {
  playListContainer.classList.remove("hide");
});

// when you touch the play button
playButton.addEventListener("click", playAudio);

// when you touch the pause button
pauseButton.addEventListener("click", puaseAudio);

// when you touch the next button
nextButton.addEventListener("click", nextSong);

// when you touch the previous button
prevButton.addEventListener("click", previousSong);

//on the first moment
window.onload = () => {
  index = 0;
  setSong(index);
  puaseAudio();
  initializePlaylist();
};
