const logoLink = document.querySelector('.logo-link');
const navLink = document.querySelectorAll('.nav-link');
const footerLinkNav = document.querySelectorAll('.footer-link-nav');

logoLink.addEventListener('click', event => {
    localStorage.setItem("titleName", JSON.stringify('Организация угодий и севооборотов'))
    document.title = JSON.parse(localStorage.getItem("titleName"));
})

const changeTitleName = (links) => {
    links.forEach(link => {
        link.addEventListener('click', event => {
            localStorage.setItem("titleName", JSON.stringify(event.target.textContent))
        })
    })
}


changeTitleName(navLink);
changeTitleName(footerLinkNav);

document.title = JSON.parse(localStorage.getItem("titleName"));