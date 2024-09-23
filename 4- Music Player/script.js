const audio = new Audio();
const playPauseBtn = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const currentTimeDisplay = document.getElementById('current-time');
const durationDisplay = document.getElementById('duration');
const playlistElement = document.getElementById('playlist');
const volumeSlider = document.getElementById('volume-slider');
const muteButton = document.getElementById('mute-button');
const muteIcon = document.getElementById('mute-icon');
let isPlaying = false;
let currentTrackIndex = 0;
let isMuted = false;
let savedVolume = 1; // Variable to save the current volume

// Track information
const tracks = [
    { title: 'Song 1', src: '/assets/Bruno Mars & Lady Gaga - Die With A Smile.mp3', cover: '/assets/cover1.webp' },
    { title: 'Song 2', src: '/assets/John Legend - All of Me.mp3', cover: '/assets/cover2.jpg' },
    { title: 'Song 3', src: '/assets/Calum Scott - You Are The Reason.mp3', cover: '/assets/cover3.jpg' },
    // Add more tracks here...
];

// Load the track
function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;

    const trackName = track.src.split('/').pop().split('.')[0];
    document.querySelector('.track-title').textContent = trackName;

    document.querySelector('.album-cover').src = track.cover;

    const player = document.querySelector('.player');
    player.style.setProperty('--background-image', `url(${track.cover})`);

    progressBar.value = 0;
    currentTimeDisplay.textContent = '0:00';
    durationDisplay.textContent = '0:00';

    audio.addEventListener('loadedmetadata', () => {
        durationDisplay.textContent = formatTime(audio.duration);
        progressBar.max = audio.duration;
    });
}

// Format time
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Populate the playlist
tracks.forEach((track, index) => {
    const li = document.createElement('li');
    const trackName = track.src.split('/').pop().split('.')[0];
    li.textContent = trackName;

    li.addEventListener('click', () => {
        currentTrackIndex = index;
        loadTrack(currentTrackIndex);
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
    });

    playlistElement.appendChild(li);
});

// Play/Pause button
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isPlaying = !isPlaying;
});

// Update progress bar and time
audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime;
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
});

// Change track on progress bar input
progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
});

// Move to the next track when the current track ends
audio.addEventListener('ended', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
});

// Mute/Unmute functionality
muteButton.addEventListener('click', () => {
    if (isMuted) {
        audio.volume = savedVolume; // Restore volume from saved value
        muteIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
    } else {
        savedVolume = audio.volume; // Save current volume before muting
        audio.volume = 0; // Mute
        muteIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    }
    isMuted = !isMuted;
});

// Volume control
volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value; // Update audio volume
    if (audio.volume > 0) {
        isMuted = false; // Unmute if volume is adjusted
        muteIcon.classList.replace('fa-volume-mute', 'fa-volume-up');
    } else {
        isMuted = true; // If volume is 0, mark as muted
        muteIcon.classList.replace('fa-volume-up', 'fa-volume-mute');
    }
});

// Load the first track on startup
loadTrack(currentTrackIndex);

// Set initial volume to max
volumeSlider.value = 1;
audio.volume = volumeSlider.value; // Set initial audio volume
