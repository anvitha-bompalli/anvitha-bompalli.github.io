const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

//const event1 = document.querySelector(".event1");
let boxes = document.getElementsByClassName("box");
let color_changed = false;

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