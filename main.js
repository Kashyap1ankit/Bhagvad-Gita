"use strict mode";

const bgVideoNav = document.querySelector(".navigation");
const wholeNav = document.querySelector(".nav-content");
const search = document.getElementById("search");
const headingChapter = document.querySelector(".chapter-num");
const contentContainer = document.querySelector(".content");
const hindiTrans = document.querySelector(".trans-btn-hindi");
const engTrans = document.querySelector(".trans-btn-english");
const cookies = document.querySelector(".cookies");
const topNav = document.querySelector(".top-nav");
const midNav = document.querySelector(".middle-nav");
const accept = document.querySelector(".accept");
const reject = document.querySelector(".reject");
const scrollSearch = document.querySelector(".scroll-search");
const modal = document.querySelector(".modal");
const crossBtn = document.querySelector(".cross");

let chapterNumber;

let responseSave;

const showSummary = function () {
  headingChapter.textContent = `Summary Chapter ${responseSave.chapter_number}`;
  const html = `<div class="introduction">
  <h2>CHAPTER NAME</h2>
  <h1>${responseSave.name_translated}</h1>
  <div class="animation">
    <div class="spinner1"></div>
    <div class="spinner2"></div>
  </div>
</div>

<div class="what">

  <h2>SUMMARY IN ENGLISH</h2>

  <iframe width="860" height="415" src="https://www.youtube.com/embed/w0hAAhtDUCk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="youtube"></iframe>

  <p>
  ${responseSave.chapter_summary}
 </p>

  
</div>`;

  contentContainer.innerHTML = "";
  contentContainer.insertAdjacentHTML("beforeend", html);
  hindiTrans.classList.remove("hidden");
  removeBlur();
  // engTrans.classList.add("hidden");
};

const hindSummary = function () {
  headingChapter.textContent = `Summary Chapter ${responseSave.chapter_number}`;
  const html = `<div class="introduction">
  <h2>CHAPTER NAME</h2>
  <h1>${responseSave.name}</h1>
  <div class="animation">
    <div class="spinner1"></div>
    <div class="spinner2"></div>
  </div>
</div>

<div class="what">

  <h2>SUMMARY IN HINDI</h2>

  <iframe
  width="860"
  height="415"
  src="https://www.youtube.com/embed/28sptQICKCk"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
  class="youtube"
></iframe>

  <p>
  ${responseSave.chapter_summary_hindi}
 </p>

</div>

`;

  contentContainer.innerHTML = "";
  contentContainer.insertAdjacentHTML("beforeend", html);
  engTrans.classList.remove("hidden");
  removeBlur();
  // hindiTrans.classList.add("hidden");
};

const getJokes = function () {
  const url = `https://bhagavad-gita3.p.rapidapi.com/v2/chapters/${chapterNumber}/`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "5dfd2d8664msh2224dd9eda56667p1e57bbjsn3da2ec844b0e",
      "X-RapidAPI-Host": "bhagavad-gita3.p.rapidapi.com",
    },
  };

  const getApi = async function () {
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      responseSave = result;

      if (responseSave.detail === "Chapter not found") return;

      showSummary();
      setTimeout(translate, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  getApi();
};

//Getting the response when the enter button is clicked

document.documentElement.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    chapterNumber = search.value;
    getJokes();
    search.value = "";
  }
});

//Getting the response when the enter button of scroll search button is clicked

scrollSearch.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    chapterNumber = scrollSearch.value;
    getJokes();
    scrollSearch.value = "";
    setTimeout(translate, 3000);
  }
});

hindiTrans.addEventListener("click", hindSummary);
engTrans.addEventListener("click", showSummary);

//Coookie Message apperance after 5second when the top nav is observed

const tick = function () {
  cookies.classList.remove("hidden");
  cookies.classList.add("sticky");
};

const call = function (entries) {
  const [entry] = entries;

  if (entry.isIntersecting) setTimeout(tick, 5000);

  //Unobserving so that it will not appear after one time

  observer.unobserve(topNav);
};

const opt = {
  root: null,
  threshold: 0,
};

const observer = new IntersectionObserver(call, opt);

observer.observe(topNav);

// //When the page loads then after 5 second the cookie page appears

// window.addEventListener("load", function () {
//   setTimeout(tick, 5000);
// });

//Accepting or rejecrting the cookies function

const acceptOrReject = function (e) {
  e.preventDefault();
  cookies.classList.add("hidden");
};

accept.addEventListener("click", acceptOrReject);
reject.addEventListener("click", acceptOrReject);

//Observing the mid navigation and sticking the top nav

const call2 = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    topNav.classList.add("navSticky");
    scrollSearch.classList.remove("scroll-search-hidden");
  } else {
    topNav.classList.remove("navSticky");
    scrollSearch.classList.add("scroll-search-hidden");
  }
};

const opt2 = {
  root: null,
  threshold: 0,
};

const observer2 = new IntersectionObserver(call2, opt2);

observer2.observe(midNav);

//Transalation function

const translate = function () {
  modal.classList.remove("modal-hidden");
  bgVideoNav.style.filter = "blur(10px)";
  contentContainer.style.filter = "blur(10px)";
  wholeNav.style.filter = "blur(10px)";
};

const removeBlur = function () {
  modal.classList.add("modal-hidden");
  bgVideoNav.style.filter = "blur(0px)";
  contentContainer.style.filter = "blur(0px)";
  wholeNav.style.filter = "blur(0px)";
};

crossBtn.addEventListener("click", removeBlur);
