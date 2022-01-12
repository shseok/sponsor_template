const popupBtn = document.getElementById("btn-open-popup");
const modal = document.querySelector(".modal");

// const form = document.getElementById("myForm");
// const pageMoveBtn = document.querySelector(".moveBtn");

popupBtn.addEventListener('click', (e) => {
    // form.submit();
    modal.classList.add('show');
});

function newPage() {
    window.location.href = '../main/index.html';
}