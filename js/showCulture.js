const submenu = document.querySelector('.submenu');
const rotateSide = document.querySelector('.rotate-side');
const arrowLink = document.querySelector('.arrow-link');
const insideLinks = document.querySelectorAll('.inside-nav');
const submenuLink = document.querySelector('.submenu-link');

let height = submenu.offsetHeight;
let heightSide = document.querySelector('.show-kind-culture').offsetHeight;
let paddingRotate = rotateSide.currentStyle || window.getComputedStyle(rotateSide);
let paddingHeight = parseInt(paddingRotate.paddingBottom);


const showKindCulture = document.querySelector('.show-kind-culture');


let infoRotate;

function getInfo(dataId) {
    $.ajax({
        url: "infoRotate.php",
        type: "POST",
        async: false,
        data: {
            id: encodeURIComponent(dataId)
        },
        success: function (response) {
            response = JSON.parse(response);
            infoRotate = response;
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
    return infoRotate;
}
let showInfo
const showRightSide = (obj) => {
    showKindCulture.innerHTML = '';
    showInfo = `
        <div class='kind-culture-card'>
            <div class='culture-card-image'>
                <img src="${obj.photo}">
            </div>
            <div class="culture-card-description">
                <h3 class="culture-card-title">${obj.name}</h3>
                <p class="culture-card-text">${obj.description}</p>
            </div>
        </div>
        `
    showKindCulture.insertAdjacentHTML('beforeend', showInfo);
}


insideLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        let idCulture = e.target.dataset.id;
        showRightSide(getInfo(idCulture));
        showKindCulture.classList.add('active-side')
    })
})


submenuLink.addEventListener('click', e => {
    e.preventDefault();
    showKindCulture.classList.toggle('active-side');
    document.querySelector('.show-kind-culture').innerHTML = "";
    submenu.classList.toggle('active')
    if (submenu.classList.contains('active')) {
        arrowLink.classList.add('active-arrow');
        rotateSide.classList.add('transition');
        rotateSide.style.paddingBottom = `${height+50}px`;
    } else {
        arrowLink.classList.remove('active-arrow');
        rotateSide.classList.add('transition');
        rotateSide.style.paddingBottom = `${paddingHeight}px`;
    }

})