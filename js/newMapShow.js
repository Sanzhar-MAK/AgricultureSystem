// const showButton = document.querySelector('.show-button');
// const contentShow = document.querySelector('.content-show');
// const accountingButton = document.querySelector('.accounting-button');
// const clearButton = document.querySelector('.clear-button');
// const fieldRightUseButton = document.querySelector('.field-right-use-button');
// showButton.disabled = true;
// // window.location.reload(true)

// // alert('Сперва слева выберите поле');
let result;
let array;

const change = (data) => {
    let string = data[0].coordinates;
    let coordinates = string.substr(1, string.length - 2);
    coordinates = coordinates.replace(' ', '');
    coordinates = coordinates.split(',');
    return coordinates
}

const convertDots = (array) => {
    array = array.substr(1, array.length - 1)
    array = array.split(',');
    let dots = []
    for (let i = 0; i < array.length; i++) {
        array[i] = array[i].replace('[', '');
        array[i] = array[i].replace(']', '');
        dots.push(parseFloat(array[i]));
    }

    let total = [];
    for (let i = 0; i < dots.length; i += 2) {
        let dot = [];
        dot.push(dots[i]);
        dot.push(dots[i + 1])
        total.push(dot);
    }
    return total;
}

const createDescription = (obj) => {
    const contentInformation = document.querySelector('.content-information');
    const contentDescription = document.querySelector('.content-description');
    contentDescription.innerHTML = '';
    let description
    obj.forEach(item => {
        description = `
                <ul class="info-info">
                    <li class="info-field">Поле: ${item.numberOfFields}</li>
                    <li class="info-ndvi">NDVI: ${item.ndvi}</li>
                    <li class="info-culture">Культура: ${item.culture}</li>
                    <li class="info-square">Площадь: ${item.squares} Га</li>
                    <li class="info-square">Кадастровый номер: ${item.cadNumber}</li>
                </ul>
        `
    })
    contentDescription.insertAdjacentHTML('beforeend', description);
}

// function getCoordinates(state) {
//     let result;
//     $.ajax({
//         url: 'getMapCoordinates.php',
//         data: {
//             "state": state
//         },
//         type: 'GET',
//         async: false,
//         success: function (data) {
//             data = JSON.parse(data);
//             result = data;
//         },
//         error: function () {
//             result = 'Not connected';
//         }
//     });
//     return change(result);
// }

function getMapsInfo(state) {
    $.ajax({
        url: 'getNewArray.php',
        data: {
            "state": state
        },
        type: 'GET',
        async: false,
        success: function (data) {
            data = JSON.parse(data);
            result = data;
        },
        error: function () {
            result = 'Not connected';
        }
    });
    return result;
}

// function getTitle(obj) {
//     $.ajax({
//         url: "getArrayInfo.php",
//         type: "POST",
//         async: false,
//         data: {
//             field: encodeURIComponent(obj)
//         },
//         success: function (response) {
//             response = JSON.parse(response);
//             array = response;
//         },
//         error: function (jqXHR, textStatus, errorThrown) {
//             console.log(textStatus, errorThrown);
//         }
//     });
//     return array
// }

function getInfo(obj) {
    $.ajax({
        url: "getInfoGround.php",
        type: "POST",
        async: false,
        data: {
            info: encodeURIComponent(obj)
        },
        success: function (response) {
            response = JSON.parse(response);
            array = response;

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(textStatus, errorThrown);
        }
    });
    return array
}

mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fuemhhcm1hayIsImEiOiJjbDI4amh3Z3IwOXRjM2VsM2xseGo5c3c2In0.Uxf_QmJVPgKnXOiTccFFuA';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/satellite-streets-v11', // style URL
    center: [
        70.39215087890625,
        51.251601468176545
    ], // starting position [lng, lat]
    zoom: 10,
    attributionControl: false
});
const dotMarker = new mapboxgl.Marker()
    .setLngLat([
        70.39215087890625,
        51.251601468176545
    ])
    .addTo(map);

// let table = document.createElement('table');

// // Учет поля
// accountingButton.addEventListener('click', e => {
//     let first, second;
//     let message;
//     let showButton;
//     for (let i = array.length - 2; i > 0; i--) {
//         year = array[i].year;
//         infoYear = array[i].year - array[i - 1].year;
//         if (infoYear > 2) {
//             first = +array[i - 1].year + 1;
//             second = +array[i].year - 1;
//             message =
//                 `Данный участок земли можно изъять из иcпользования. 
//             Так как в период с ${first} по ${second} земля не использовалась по назначению.`;
//             showButton = false;
//             break
//         } else {
//             message = `Поле не нуждается в изъятий`;
//             showButton = true
//         }
//     }
//     alert(message);
//     if (showButton) {
//         fieldRightUseButton.classList.remove('close-button');
//     }
// });

// //Севооборот
// fieldRightUseButton.addEventListener('click', e => {
//     let firstCondition;
//     let secondCondition;
//     let arrayYear = [];
//     let flag = 0;
//     let nextFlag = 0;
//     for (let i = array.length - 2; i > 2; i--) {
//         let firstYear = array[i].index;
//         let secondYear = array[i - 1].index;
//         let thirdYear = array[i - 2].index;
//         firstYear.forEach(firstElem => {
//             secondYear.forEach(secondElem => {
//                 if (firstElem[0] === secondElem[0] || firstElem[0] === '' || secondElem[0] === '') {
//                     flag++;
//                     firstCondition = true;
//                 }
//                 thirdYear.forEach(thirdElem => {
//                     if (secondElem[0] === thirdElem[0] || thirdElem[0] === '' || secondElem[0] === '') {
//                         arrayYear.push(array[i].year, array[i - 1].year, array[i - 2].year);
//                         nextFlag++;
//                         secondCondition = true;
//                     }
//                 })
//             })
//         })
//         if (flag !== 0 && nextFlag !== 0) {
//             console.log(arrayYear);
//             alert(`На данном поле севооборот выполняется не правильно! 
//             Так как в ${arrayYear[0]},${arrayYear[1]},${arrayYear[2]} было посажена одна и та же кульура.`);
//             break
//         } else {
//             alert('На данном поле севооборот выполняется правильно!');
//             break
//         }
//     }

// })

// // Кнопка для очистки
// clearButton.addEventListener('click', e => {
//     table.innerHTML = '';
//     contentShow.innerHTML = '';
//     showButton.disabled = true;
//     accountingButton.classList.add('close-button');
//     clearButton.classList.add('close-button');
//     fieldRightUseButton.classList.add('close-button');
//     showButton.classList.remove('close-button');
// })

// // Показ информации о поле
// showButton.addEventListener('click', e => {
//     contentShow.innerHTML = '';
//     let table = document.createElement('table');
//     let lengthColspan = Object.keys(array[0]).length;
//     let title = array[array.length - 1].title;
//     let square = array[array.length - 1].squareField;
//     let tableHtml = `
//     <tr>
//         <th colspan=${lengthColspan}>
//         ${title}:${square} Га
//         </th>
//     </tr>
//     <tr>
//         <td>Сорт</td>
//         <td>Культура</td>
//         <td>Год</td>
//         <td>Площадь культуры(Га)</td>
//         <td>Пар</td>
//         <td>Площадь пар(Га)</td>
//         <td>Индекс сорта</td>
//         <td>Неиспользованная земля(Га)</td>
//     </tr>`;
//     let html = '';
//     let total = '';
//     for (let i = array.length - 2; i > 0; i--) {
//         html = `
//         <tr>
//             <td>${array[i].sort}</td>
//             <td>${array[i].culture}</td>
//             <td>${array[i].year}</td>
//             <td>${array[i].squareCulture}</td>
//             <td>${array[i].par}</td>
//             <td>${array[i].squarePar}</td>
//             <td>${array[i].index}</td>
//             <td>${array[i].notUsedGround}</td>
//         </tr>
//         `
//         total += html;
//     }
//     tableHtml += total;
//     table.insertAdjacentHTML('beforeend', tableHtml);
//     contentShow.insertAdjacentElement('beforeend', table);
//     showButton.disabled = false;
//     clearButton.disabled = false;
//     accountingButton.classList.remove('close-button');
//     clearButton.classList.remove('close-button');
//     showButton.classList.add('close-button');
// });

// Показ карты

map.on('load', () => {
    map.resize();
    result.forEach(info => {
        map.addSource(`${info.id}`, {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [convertDots(`${info.coordinates}`)]
                }
            },
            'generateId': true
        });

        map.addLayer({
            'id': `${info.idFill}`,
            'type': 'fill',
            'source': `${info.id}`,
            'paint': {
                'fill-color': [
                    'case',
                    ['boolean', ['feature-state', 'click'], false],
                    '#ff0000',
                    `${info.fillColor}`
                ],
                "fill-opacity": parseFloat(`${info.fillOpacity}`)
            }
        });

        map.addLayer({
            'id': `${info.idOutline}`,
            'type': 'line',
            'source': `${info.id}`,
            'paint': {
                'line-color': `${info.lineColor}`,
                'line-width': parseInt(`${info.lineWidth}`)
            }
        });
        let clickId = null;
        map.on('click', `${info.idFill}`, (e) => {
            // if (e.features.length > 0) {
            //     if (clickId) {
            //         console.log(clickId);
            //         map.setFeatureState({
            //             source: `${info.id}`,
            //             id: clickId
            //         }, {
            //             click: false
            //         });

            //     }
            //     console.log(e.features)
            //     clickId = e.features[0].id;

            //     map.setFeatureState({
            //         source: `${info.id}`,
            //         id: clickId
            //     }, {
            //         click: true
            //     });
            //     console.log(clickId);
            // }
            let obj = `${info.id}`;
            createDescription(getInfo(obj))
            new mapboxgl.Popup()
                .setLngLat(e.lngLat)
                .setHTML('Поле' + '<span> </span>' + `${info.numberOfFields}`)
                .addTo(map);
        });

        map.on('mouseenter', `${info.idFill}`, () => {
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', `${info.idFill}`, () => {
            map.getCanvas().style.cursor = '';
        });
    });
});


getMapsInfo();