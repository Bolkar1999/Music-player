const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

const songs = [
    {
      name: 'jacinto-1',
      displayName: 'Electric Chill Machine',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-2',
      displayName: 'Seven Nation Army (Remix)',
      artist: 'Jacinto Design',
    },
    {
      name: 'jacinto-3',
      displayName: 'Goodnight, Disco Queen',
      artist: 'Jacinto Design',
    },
    {
      name: 'metric-1',
      displayName: 'Front Row (Remix)',
      artist: 'Metric/Jacinto Design',
    },
  ];

//Check if playing 
let isPlaying = false;


//Play

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

// Play or Pause Event Listener 
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current Song 
let songIndex = 0;

//Previos song 
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Next song 
function nextSong() {
    songIndex++;
    if (songIndex > songs.length -1) {
        songIndex = 0;
    } 
    loadSong(songs[songIndex]);
    playSong();
}

// On load - select first Song
loadSong(songs[songIndex]);

//Update progress bar & time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        //Update progress bar width 
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // Calculate display for duratin 
        const durationMinutes = Math.floor(duration / 60);
        console.log('minutes' , durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
          durationSeconds = `0${durationSeconds}`;}
        console.log('seconds' , durationSeconds);
        // Delay switching duration Element to avoid Nan
        if (durationSeconds) {
          durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
         // Calculate display current
         const currentMinutes = Math.floor(currentTime / 60);
         console.log('minutes' , currentMinutes);
         let currentSeconds = Math.floor(currentTime % 60);
         if (currentSeconds < 10) {
           currentSeconds = `0${currentSeconds}`;}
         console.log('seconds' , currentSeconds);
         currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar 
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const {duration} = music;
  music.currentTime = (clickX / width) * duration;
}

// Event Listener 
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click' , setProgressBar);
music.addEventListener('ended', nextSong);