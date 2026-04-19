
/* <!--
========================================
  Wedding Invitation Digital
  © 2026 Anugrah PrintWorks

  Dilarang menyalin / menjual ulang tanpa izin
========================================
--> */

const musik = document.getElementById("musik");
const opening = document.getElementById("opening");

function playMusik() {
  if (musik.paused) {
    musik.play().catch(() => {});
  }
}

// klik di mana saja
document.addEventListener("click", function () {
  playMusik();
}, { once: true });

// khusus HP
document.addEventListener("touchstart", function () {
  playMusik();
}, { once: true });


// ===============================
// FUNCTION BUKA UNDANGAN
// ===============================
function bukaUndangan(){
  opening.style.display = "none";
  playMusik();
}


// ===============================
// AUTO SCROLL (INI YANG LU CARI)
// ===============================
let autoScroll = false;
let scrollInterval;

document.getElementById("autoBtn").onclick = () => {
  autoScroll = !autoScroll;

  const icon = document.getElementById("autoIcon");

  if(autoScroll){
    icon.classList.remove("fa-play");
    icon.classList.add("fa-pause");

    scrollInterval = setInterval(() => {
      window.scrollBy({
        top: 1,
        behavior: "smooth"
      });
    }, 20);

  }else{
    icon.classList.remove("fa-pause");
    icon.classList.add("fa-play");

    clearInterval(scrollInterval);
  }
};


// ===============================
// SLIDER
// ===============================
let slides = document.querySelectorAll(".slide");
let i = 0;

setInterval(()=>{
  slides[i].classList.remove("active");
  i = (i + 1) % slides.length;
  slides[i].classList.add("active");
}, 5000);


// ===============================
// COUNTDOWN
// ===============================
let target = new Date("2026-12-10T10:00:00").getTime();

setInterval(()=>{
  let now = new Date().getTime();
  let s = target - now;

  document.getElementById("hari").innerText = Math.floor(s/86400000);
  document.getElementById("jam").innerText = Math.floor((s%86400000)/3600000);
  document.getElementById("menit").innerText = Math.floor((s%3600000)/60000);
  document.getElementById("detik").innerText = Math.floor((s%60000)/1000);
},1000);


// ===============================
// BUTTON MUSIK
// ===============================
document.getElementById("musicBtn").onclick = ()=>{
  if(musik.paused){
    musik.play();
  }else{
    musik.pause();
  }
};

window.addEventListener("DOMContentLoaded", function(){

  let params = new URLSearchParams(window.location.search);
  let nama = params.get("to");

  if(nama){
    nama = decodeURIComponent(nama);

    document.getElementById("namaTamu").innerText = nama;
  }

});

const items = document.querySelectorAll('.gallery .item');

function reveal(){
  let trigger = window.innerHeight * 0.85;

  items.forEach(item=>{
    let top = item.getBoundingClientRect().top;

    if(top < trigger){
      item.classList.add('show');
    }else{
      item.classList.remove('show');
    }
  });
}

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

function copyRek(){
  const rek = document.getElementById("noRek").innerText;

  navigator.clipboard.writeText(rek)
    .then(() => {
      alert("Nomor rekening berhasil disalin ✅");
    });
}

const url = "https://script.google.com/macros/s/AKfycbzHJ7XzqL1Tp2u50_kfCRKEb4CTev60A1NxrXV-Asd4sWBmS0FR0UJ3RiEITg0KY1t_/exec";

/* KIRIM DATA */
document.getElementById("rsvpForm").addEventListener("submit", function(e){
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const kehadiran = document.getElementById("kehadiran").value;
  const pesan = document.getElementById("pesan").value;

  const data = { nama, kehadiran, pesan };

  // 🔥 LANGSUNG TAMPIL DI UI (TANPA NUNGGU)
  tampilkanLangsung(data);

  // reset form langsung
  document.getElementById("rsvpForm").reset();

  // kirim ke server (background)
  fetch(url, {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify(data)
  });
  showToast("Ucapan berhasil dikirim ✅");
});

function tampilkanLangsung(item){
  const html = `
    <div class="ucapan-item">
      <div class="ucapan-header">
        <b>${item.nama}</b>
        <span class="status">${item.kehadiran}</span>
      </div>

      <div class="ucapan-text">
        ${item.pesan}
      </div>

      <small>Baru saja</small>
    </div>
  `;

  document.getElementById("listUcapan").innerHTML =
    html + document.getElementById("listUcapan").innerHTML;
}

/* AMBIL & TAMPILKAN UCAPAN */
function loadUcapan(){
  fetch(url)
    .then(res => res.json())
    .then(data => {

      let html = "";

      data.reverse().forEach(function(item){
        html += `
  <div class="ucapan-item">
    <div class="ucapan-header">
      <b>${item.nama}</b>
      <span class="status">${item.kehadiran}</span>
    </div>

    <div class="ucapan-text">
      ${item.pesan}
    </div>

    <small>${formatTanggal(item.waktu)}</small>
  </div>
`;
      });

      document.getElementById("listUcapan").innerHTML = html;

    });
}

/* LOAD AWAL */
loadUcapan();

/* AUTO UPDATE */
setInterval(loadUcapan, 5000);

function formatTanggal(waktu){
  const date = new Date(waktu);

  const hari = date.toLocaleDateString("id-ID", { weekday: "long" });
  const tanggal = date.getDate();
  const bulan = date.toLocaleDateString("id-ID", { month: "long" });
  const tahun = date.getFullYear();
  const jam = date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });

  return `${hari}, ${tanggal} ${bulan} ${tahun} • ${jam}`;
}

function showToast(pesan){
  const toast = document.getElementById("toast");

  toast.innerText = pesan;
  toast.classList.add("show");
  document.body.classList.add("toast-active");

  setTimeout(()=>{
    toast.classList.remove("show");
    document.body.classList.remove("toast-active");
  }, 2000);
}

const footer = document.querySelector(".footer");

function revealFooter(){
  const trigger = window.innerHeight * 0.9;
  const top = footer.getBoundingClientRect().top;

  if(top < trigger){
    footer.classList.add("show");
  }
}

window.addEventListener("scroll", revealFooter);
window.addEventListener("load", revealFooter);

const nav = document.querySelector(".bottom-nav");

window.addEventListener("scroll", () => {
  const scrollPos = window.scrollY + window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  // kalau sudah mendekati bawah
  if(scrollPos >= docHeight - 50){
    nav.style.opacity = "0";
    nav.style.pointerEvents = "none";
  } else {
    nav.style.opacity = "1";
    nav.style.pointerEvents = "auto";
  }
});