
const backimg = document.getElementById("back_img"),
      img = document.getElementById("img"),
      title = document.getElementById("song_title"),
      artist = document.getElementById("song_artist"),
      song = document.getElementById("audio"),
      play = document.getElementById("play"),
      playi = document.getElementById("play_icon"),
      next = document.getElementById("next"),
      prev = document.getElementById("prev"),
      loopsong = document.getElementById("loop_song"),
      imgBox = document.getElementById("imgBox"),
      slider = document.getElementById("slider"),
      vSlider = document.getElementById("vSlider"),
      vIcon = document.getElementById("vIcon"),
      metronome = document.getElementById("metronome"),
      loopstatus = document.getElementById("loopstatus");
      

let loopStatus = false;

window.addEventListener("load", function () {
  let randSong=Math.floor(Math.random()* Songs.length);

  backimg.src = "Images/" + Songs[randSong].bimg;
  song.src = "music/" + Songs[randSong].name + ".mp3";
  img.src = "Images/" + Songs[randSong].name + ".webp";
  title.textContent = Songs[randSong].title;
  artist.textContent = Songs[randSong].artist;
  song.volume = 0.3;
  vSlider.value = 30; 
  slider.value = 0;
});

// song.addEventListener("load", function () {
//   slider.value = 0;
// });

vSlider.addEventListener("input", function () {
  song.volume = this.value / 100;
  if (song.volume == 0) {
    vIcon.classList.replace("fa-volume-low", "fa-volume-xmark");
  } else {
    vIcon.classList.replace("fa-volume-xmark", "fa-volume-low");
  }
});

function loadSongs(Songs) {
  backimg.src = "Images/" + Songs.bimg;
  song.src = "music/" + Songs.name + ".mp3";
  img.src = "Images/" + Songs.name + ".webp";
  title.textContent = Songs.title;   
  artist.textContent = Songs.artist;

  if (song.paused) {
    imgBox.classList.add("anime1");
    playi.classList.replace("fa-circle-play", "fa-circle-pause");
    song.play();
    metronome.classList.add("active");
  }
}
play.addEventListener("click", function () {
  if (song.paused) {
    imgBox.classList.add("anime1");
    playi.classList.replace("fa-circle-play", "fa-circle-pause");
    song.play();
    metronome.classList.add("active");
  } else {
    imgBox.classList.remove("anime1");
    playi.classList.replace("fa-circle-pause", "fa-circle-play");
    song.pause();
    metronome.classList.remove("active");
  }
});

let songIndex = 0;
function nextSong() {
  songIndex = (songIndex + 1) % Songs.length;
  loadSongs(Songs[songIndex]);
}

function prevSong() {
  songIndex = (songIndex - 1 + Songs.length) % Songs.length;
  loadSongs(Songs[songIndex]);
}

 if(!loopStatus){
  song.addEventListener("ended", ()=> {
    nextSong();
  });
 }

loopsong.addEventListener("click", function () {
  this.classList.toggle("active");

  if (!loopStatus) {
    loopStatus = true;
    song.loop = true;
    loopstatus.classList.add("active");
    loopstatus.innerText="Loop On";

    setTimeout(()=>{
     loopstatus.classList.remove("active");
    }, 2000);

    console.log("Current song on loop.");

  } else {
    loopStatus = false;
    song.loop = false;
    loopstatus.classList.add("active");
    loopstatus.innerText="Loop Off";

    setTimeout(()=>{
      loopstatus.classList.remove("active");
      }, 2000);
      
    console.log("Current song remove from loop.");
  }
});

slider.value = 0;

song.addEventListener("timeupdate", function () {
  var getDur = song.duration.toFixed(0);
  var currentD = song.currentTime.toFixed(0);
  var sliderVal = (currentD / getDur) * 1000; 
  if (getDur) {
    slider.value = sliderVal;
  }
  var cTime = document.getElementById("current");
  var sDuration = document.getElementById("duration");
  var currDuration = Math.floor(song.currentTime);
  var duration = Math.floor(song.duration);
  if (currDuration && duration) {
    var minTime = Math.floor(currDuration / 60);
    var secTime = currDuration % 60;
    if (secTime < 10) {
      secTime = "0" + secTime;
    }
    cTime.textContent = minTime + ":" + secTime;
  }
  if (duration) {
    var min_Time = Math.floor(duration / 60);
    var sec_Time = duration % 60;
    if (sec_Time < 10) {
      sec_Time = "0" + sec_Time;
    }
    sDuration.textContent = min_Time + ":" + sec_Time;
  }
});

slider.addEventListener("input", function () {
  song.play();
  metronome.classList.add("active");
  imgBox.classList.add("anime1"); 
  playi.classList.replace("fa-circle-play", "fa-circle-pause");
  var getValue = this.value;
  var maxValue = 1000;
  var songDur = song.duration.toFixed(0);
  var currentDur = (getValue / maxValue) * songDur;
  song.currentTime = currentDur;
});

next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);
