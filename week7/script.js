const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

//const event1 = document.querySelector(".event1");
let boxes = document.getElementsByClassName("box");
let color_changed = false;

//footer 
const small_txt = document.querySelector('#small-text');
const med_txt = document.querySelector('#med-text');
const large_txt = document.querySelector('#large-text');
const clear_txt_pref = document.querySelector('#clear-preferences');

const default_font = document.querySelector('#default-font');
const read_easy = document.querySelector('#read-easy');
const clear_fnt_pref = document.querySelector('#clear-pref');

function showMenu() {
  const shown = navMenu.classList.toggle("show");

  if (shown) {
    navToggle.style.transform = "rotate(90deg)";
    navToggle.style.transition = "transform 0.3s ease";
  } else {
    navToggle.style.transform = "rotate(0deg)";
  }
}

navToggle.addEventListener('click', showMenu);


function changeBgCol(event){
  if (event.key == "c") {
    for (let i = 0; i < boxes.length; i++) {
      if (!color_changed) {
        boxes[i].style.backgroundColor = "#260101";
        boxes[i].style.color = "#F2D3D0";
      } else {
        boxes[i].style.backgroundColor = "#F2D3D0";
        boxes[i].style.color = "#260101";
      }
    }
    color_changed = !color_changed;
  }
}

addEventListener("keydown", (event) => {changeBgCol(event)});

//playlist page
  const filterButtons = document.querySelectorAll('.playlist-nav .filter-btn');
  const playlistItems = document.querySelectorAll('.playlist-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      filterButtons.forEach(btn => btn.classList.remove('active'));

      event.target.classList.add('active');

      const filterValue = event.target.textContent.toLowerCase();
      filterPlaylist(filterValue);
    });
  });

  function filterPlaylist(type) {
    playlistItems.forEach(item => {
      if (type === 'all' || item.dataset.type === type) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }

// backstage css
const recForm = document.querySelector("#recForm");
const input = document.querySelector("#recommendInput");
const feedback = document.querySelector("#feedback");

if (recForm) {
  recForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const value = input.value.trim();
    if (value.length === 0) {
      feedback.textContent = "Please enter a song or album.";
      feedback.style.color = "red";
    } else {
      feedback.textContent = `Thanks! We’ll check out: ${value}`;
      feedback.style.color = "green";
      recForm.reset();
    }
  });
}

function change_text_size(size) {
  let temp_size = size * 16;

  document.querySelector('html').style.fontSize = String(temp_size) + "px";
  localStorage.setItem("fontSize", temp_size);

}

function clear_loacl_storage(size) {
  let temp_size = size * 16;
  
  localStorage.clear();
  document.querySelector('html').style.fontSize = String(temp_size) + "px";
}

function set_text_size() {
  if (localStorage.getItem("fontSize") !== null) {
    let temp_size = localStorage.getItem("fontSize");
    document.querySelector("html").style.fontSize = String(temp_size) + "px";
  }
}

function change_font(font){
  document.querySelector('html').style.fontFamily = font;
  localStorage.setItem("fontFamily", font);
  console.log("works")
}

function clear_font_storage() {
  localStorage.clear();
  document.querySelector('html').style.fontFamily = "Courier New";
}

function set_font_style() {
  if (localStorage.getItem("fontFamily") !== null) {
    let saved_font = localStorage.getItem("fontFamily");
    document.querySelector('html').style.fontFamily = saved_font;
  }
}



small_txt.addEventListener('click', () => {change_text_size(0.8)});
med_txt.addEventListener('click', () => {change_text_size(1)});
large_txt.addEventListener('click', () => {change_text_size(1.5)});
clear_txt_pref.addEventListener('click', () => {clear_loacl_storage(1)});

default_font.addEventListener('click', () => {change_font("Courier New")});
read_easy.addEventListener('click', () => {change_font("Verdana")});
clear_fnt_pref.addEventListener('click', () => {clear_font_storage()});
