// Initialize the variables
let songIndex = 0;
let audioElement = document.getElementById('audioPlayer');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Espresso", filePath: "1.mp3", coverPath: "1.jpg"},
    {songName: "Please", filePath: "2.mp3", coverPath: "2.jpg"},
    {songName: "Nonesense", filePath: "3.mp3", coverPath: "3.jpg"},
    {songName: "Chk chk boom", filePath: "4.mp3", coverPath: "4.jpg"},
    {songName: "Pocketlocket", filePath: "5.mp3", coverPath: "5.jpg"},
    {songName: "Butterfly", filePath: "6.mp3", coverPath: "6.jpg"},
    {songName: "Love me like that", filePath: "7.mp3", coverPath: "7.jpg"},
    {songName: "Maniac", filePath: "8.mp3", coverPath: "8.jpg"},
    {songName: "Loveshot", filePath: "9.mp3", coverPath: "9.jpg"},
    {songName: "MMH", filePath: "10.mp3", coverPath: "10.jpg"}
];

// Function to play the selected song
function playSong(index) {
    audioElement.src = songs[index].filePath;
    masterSongName.innerText = songs[index].songName;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    gif.style.opacity = 1;
}

// Add event listeners to all play buttons
document.querySelectorAll('.play-button').forEach((element) => {
    element.addEventListener('click', (e) => {
        songIndex = parseInt(e.target.id); // Get the index of the song clicked
        playSong(songIndex); // Play the song
    });
});

// Handle play/pause click for master play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});

// Listen to audio element's timeupdate event to update the progress bar
audioElement.addEventListener('timeupdate', () => {
    let progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;
});

// Update the audio element's current time when progress bar is changed
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Add event listeners for next and previous buttons
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    playSong(songIndex);
});

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }
    playSong(songIndex);
});
