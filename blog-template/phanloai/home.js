const listicon = document.getElementById('listicon');
const navlist = document.getElementById('navlist');
const breakpoint = 664.35;

function toggleMenu() {
  if (window.innerWidth <= breakpoint) {
    navlist.classList.toggle('show-menu');
  }
}
;
const navi = document.querySelector('.navi'); // Chọn thẻ header có class navi
let lastScrollY = window.scrollY; // Lưu trữ vị trí cuộn trước đó
const threshold = 50; // Ngưỡng cuộn (sau 50px cuộn thì bắt đầu ẩn/hiện)
function handleScroll() {
    if (window.innerWidth > breakpoint) {
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastScrollY) > threshold) {
            if (currentScrollY < lastScrollY) {
                navi.classList.remove('nav-hidden');
            } 
            else {
                navi.classList.add('nav-hidden');
            }
            lastScrollY = currentScrollY;
        }
    } else {
        navi.classList.remove('nav-hidden');
    }
}
window.addEventListener('scroll', handleScroll);