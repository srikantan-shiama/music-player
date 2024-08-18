const grid = document.querySelector('.grid');
let modal = document.querySelector(".modal");
let closeBtn = document.querySelector(".close-btn");
let playPrev = document.querySelector(".prev-play");
let audio = document.querySelector("audio");
let audioState = false;

grid.addEventListener("click", function(e) {

    var nft = e.target.closest('.nft');
    var price = nft.querySelector('.price').innerText;
    var image = nft.querySelector(".image").src;
    var song = nft.querySelector(".song").src;
    var title = nft.querySelector(".title").innerText;
    var artist = nft.querySelector(".artist").innerText;
    var description = nft.querySelector(".description").innerText;

    modal.style.display = "block"

    document.getElementsByClassName('modal-price').item(0).innerText = price;
    document.getElementsByClassName('modal-image').item(0).src = image;
    document.getElementsByClassName('modal-audio').item(0).src = song;
    audio = song;
    document.getElementsByClassName('modal-title').item(0).innerText = title;
    document.getElementsByClassName('modal-artist').item(0).innerText = artist;
    document.getElementsByClassName('modal-description').item(0).innerText = description;

    // console.log(modalImage);

}, false);

closeBtn.onclick = function(){
  modal.style.display = "none"
  audio.pause();
  audioState = false;
  playPrev.classList = 'fa fa-play fa-3x';
}

window.onclick = function(e){
  if(e.target == modal){
    modal.style.display = "none"
    audio.pause();
    audioState = false;
    playPrev.classList = 'fa fa-play fa-3x';
  }
}

function playPreview() {
  if (audioState == false) {
    document.querySelector('audio').play();
    audioState = true;
    playPrev.classList = 'fa fa-pause fa-3x';
  }
  else {
    document.querySelector('audio').pause();
    audioState = false;
    playPrev.classList = 'fa fa-play fa-3x';
  }
}

function mint() { 
  if (!localStorage.metamaskAccount) { 
    alert("Connect MetaMask to load NFTs!");
  } 
  else { 
    alert("Minting temporarily disabled due to high gas fees.");
  }
}
