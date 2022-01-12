const popupBtn = document.getElementById("btn-open-popup");
const modal = document.querySelector(".modal");

popupBtn.addEventListener('click', (e) => {
    modal.classList.add('show');
});

closeModal = () => {
    modal.classList.remove('show');
}