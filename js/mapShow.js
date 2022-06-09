const showMapMainFunction = () => {
    const showButton = document.querySelector('.show-button');
    const contentShow = document.querySelector('.content-show');
    const accountingButton = document.querySelector('.accounting-button');
    const clearButton = document.querySelector('.clear-button');
    const fieldRightUseButton = document.querySelector('.field-right-use-button');

    const buttonUsed = document.querySelector('.button-used');
    const buttonNotUsed = document.querySelector('.button-not-used');
    const buttonFull = document.querySelector('.button-full');
    const generateButton = document.querySelector('.generate-report');

    const addInfo = document.querySelector('.add-culture-to-field');
    const updateFieldButton = document.querySelector('.edit-button');

    generateButton.disabled = true;
    showButton.disabled = true;
    buttonFull.style.display = 'none';
    // window.location.reload(true)

    let result; //object for show maps in left side
    let array; //object for get info about clicked field
    let info; //object for get main information about field


    //Coordinates function
    const change = (data) => {
        let string = data[0].coordinates;
        let coordinates = string.substr(1, string.length - 2);
        coordinates = coordinates.replace(' ', '');
        coordinates = coordinates.split(',');
        return coordinates
    }

    //Conver Dots of Map function
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

    //Create right side description function
    const createDescription = (obj) => {
        const contentDescription = document.querySelector('.content-description');
        contentDescription.innerHTML = '';
        let description
        obj.forEach(item => {
            description = `
                <ul class="info-info">
                    <li class="info-field">Поле: ${item.numberOfFields}</li>
                    <li class="info-square">Площадь: ${item.squares} Га</li>
                    <li class="info-square">Кадастровый номер: ${item.cadNumber}</li>
                </ul>
        `
        })
        contentDescription.insertAdjacentHTML('beforeend', description);
    }

    //Ajax for get center of Map
    function getCoordinates(state) {
        let result;
        $.ajax({
            url: 'getMapCoordinates.php',
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
        return change(result);
    }

    //Ajax for get maps info for show left side
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

    //Ajax for get info about field
    function getTitle(obj) {
        $.ajax({
            url: "getArrayInfo.php",
            type: "POST",
            async: false,
            data: {
                field: encodeURIComponent(obj)
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

    //Ajax get main information about field 
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
                info = response;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
        return info
    }

    let notUsedField; // Ajax for show color of not used field
    function getUsedField(state) {
        $.ajax({
            url: 'getColorMaps.php',
            data: {
                "state": state
            },
            type: 'GET',
            async: false,
            success: function (data) {
                data = JSON.parse(data);
                notUsedField = data;
            },
            error: function () {
                notUsedField = 'Not connected';
            }
        });
        return notUsedField;
    }

    let usedField; // Ajax for show color of used field
    function getNotUsedField(state) {
        $.ajax({
            url: 'getNotUsedField.php',
            data: {
                "state": state
            },
            type: 'GET',
            async: false,
            success: function (data) {
                data = JSON.parse(data);
                usedField = data;
            },
            error: function () {
                usedField = 'Not connected';
            }
        });
        return usedField;
    }

    function sentUpdate(object) {
        $.ajax({
            url: "localForCoord.php",
            type: "POST",
            async: false,
            data: {
                sentInfo: object
            },
            success: function (response) {
                response = JSON.parse(response);
                info = response;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
        return info
    }

    const showMapWithChange = (object) => {
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

        map.on('load', () => {
            map.resize();
            object.forEach(info => {
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

                map.on('click', `${info.idFill}`, (e) => {

                    let obj = `${info.uniqueId}`;
                    let objInfo = `${info.id}`;
                    getTitle(obj);
                    createDescription(getInfo(objInfo))
                    accountingButton.classList.add('close-button');
                    clearButton.classList.add('close-button');
                    fieldRightUseButton.classList.add('close-button');
                    showButton.classList.remove('close-button');
                    buttonFull.style.display = 'none';
                    table.innerHTML = '';
                    contentShow.innerHTML = '';
                    showButton.disabled = false;
                    updateFieldButton.classList.add('edit-button-none');

                    let information = {
                        "dots": convertDots(info.coordinates),
                        "nameField": info.numberOfFields,
                        "square": info.squares,
                        "cadastral": info.cadastralNumber,
                        "id": info.id
                    }
                    sentUpdate(JSON.stringify(information));
                    console.log(info);


                    addInfo.classList.add('close-button');

                    if (typeof (array) === 'string') {
                        alert(`Поле ${info.numberOfFields} не используется, нету не единой культуры`);
                        showButton.disabled = true;
                        // addInfo.classList.remove('close-button');
                    }

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
    }


    // Accounting of field
    accountingButton.addEventListener('click', e => {
        let first, second;
        let message;
        let showButton;
        for (let i = array.length - 2; i > 0; i--) {
            year = array[i].year;
            infoYear = array[i].year - array[i - 1].year;
            if (infoYear > 2) {
                first = +array[i - 1].year + 1;
                second = +array[i].year - 1;
                message =
                    `Данный участок земли можно изъять из иcпользования.Так как в период с ${first} по ${second} земля не использовалась по назначению.`;
                showButton = false;
                break
            } else {
                message = `Поле не нуждается в изъятий государством`;
                showButton = true
            }
        }
        alert(message);
        if (showButton) {
            fieldRightUseButton.classList.remove('close-button');
        }
    });

    //Rotate field
    fieldRightUseButton.addEventListener('click', e => {
        let arrayYear = [];
        let condition;
        console.log(array);
        for (let i = array.length - 2; i >= 2; i--) {
            let firstYear = array[i].index;
            let secondYear = array[i - 1].index;
            let thirdYear = array[i - 2].index;
            firstYear.forEach((firstElem, fi) => {
                secondYear.forEach((secondElem, si) => {
                    thirdYear.forEach((thirdElem, ti) => {
                        if ((firstElem[fi] === secondElem[si] && secondElem[si] === thirdElem[ti])) {
                            arrayYear.push(array[i].year, array[i - 1].year, array[i - 2].year);
                            condition = false
                        } else if ((firstElem[fi] !== secondElem[si] === thirdElem[ti]) ||
                            (firstElem[fi] !== secondElem[si] !== thirdElem[ti]) ||
                            (firstElem[fi] === '' || secondElem[si] === '' || thirdElem[ti]) ||
                            (firstElem[fi] === secondElem[si] !== thirdElem[ti]) ||
                            (firstElem[fi] !== secondElem[si] === thirdElem[ti])) {
                            condition = true;
                        }
                    })
                })
            })
        }
        if (condition) {
            alert('На данном поле севооборот выполняется правильно!');
            buttonFull.style.display = 'inline-block';
        } else {
            alert(`На данном поле севооборот выполняется не правильно! Так как в ${arrayYear[0]},${arrayYear[1]},${arrayYear[2]} годах было посажена одна и та же культура.`);
        }
    })

    // Clear info
    clearButton.addEventListener('click', e => {
        table.innerHTML = '';
        contentShow.innerHTML = '';
        showButton.disabled = true;
        accountingButton.classList.add('close-button');
        clearButton.classList.add('close-button');
        fieldRightUseButton.classList.add('close-button');
        showButton.classList.remove('close-button');
        buttonFull.style.display = 'none';
    })

    let predictionArray; //Ajax for next culture of field
    function getPrediction(getArray) {
        $.ajax({
            url: "prediction.php",
            type: "POST",
            async: false,
            data: {
                pred: getArray
            },
            success: function (response) {
                response = JSON.parse(response);
                predictionArray = response;

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
        return predictionArray;
    }

    const addCultureType = (getArray) => {
        let textCulture = '';
        for (let key in getArray) {
            textCulture += getArray[key] + ';';
        }
        return textCulture;
    }

    const formatArray = (arr) => {
        let box = [];
        arr.forEach(elem => {
            box.push(elem);
        })
        return box;
    }

    //Show information about field and prediction
    buttonFull.addEventListener('click', e => {

        let sentArray = [];
        if (array[array.length - 2].index.length === 1 && array[array.length - 3].index.length === 1) {
            if (array[array.length - 2].index[0] === '' && array[array.length - 3].index[0] !== '') {
                sentArray.push(array[array.length - 3].index[0]);
                sentArray.push('700');
            } else if (array[array.length - 3].index[0] === '' && array[array.length - 2].index[0] !== '') {
                sentArray.push('700');
                sentArray.push(array[array.length - 2].index[0]);
            } else if (array[array.length - 2].index[0] === '' && array[array.length - 3].index[0] === '') {
                sentArray.push('700');
                sentArray.push('700');
            } else {
                sentArray.push(array[array.length - 3].index[0]);
                sentArray.push(array[array.length - 2].index[0]);
            }
        } else {
            if (array[array.length - 2].index[0] === '' && array[array.length - 3].index.length === 1) {
                sentArray.push(formatArray(array[array.length - 3].index));
                sentArray.push('700');
            } else if (array[array.length - 3].index[0] === '' && array[array.length - 2].index.length === 1) {
                sentArray.push('700');
                sentArray.push(formatArray(array[array.length - 2].index));
            } else {
                sentArray.push(formatArray(array[array.length - 3].index));
                sentArray.push(formatArray(array[array.length - 2].index));
            }
        }

        let predictionYear = +array[array.length - 2].year;

        // let textArray = '';
        // for (let key in predictionArray) {
        //     textArray += predictionArray[key] + ',';
        // }

        if ((array[array.length - 3].culture).length !== 1 && array[array.length - 2].culture[0] !== 1) {
            checkFieldSecond = array[array.length - 3].par[0] === '-' ? addCultureType(array[array.length - 3].culture) : array[array.length - 3].par[0];
            checkFieldFirst = array[array.length - 2].par[0] === '-' ? addCultureType(array[array.length - 2].culture) : array[array.length - 2].par[0];

        } else if ((array[array.length - 3].culture).length !== 1 && (array[array.length - 2].culture).length === 1) {
            checkFieldSecond = array[array.length - 3].par[0] === '-' ? addCultureType(array[array.length - 3].culture) : array[array.length - 3].par[0];
            checkFieldFirst = array[array.length - 2].culture[0] !== '-' ? array[array.length - 2].culture[0] : array[array.length - 2].par[0];

        } else if ((array[array.length - 2].culture).length !== 1 && (array[array.length - 3].culture).length === 1) {
            checkFieldFirst = array[array.length - 2].par[0] === '-' ? addCultureType(array[array.length - 2]) : array[array.length - 2].par[0];
            checkFieldSecond = array[array.length - 3].culture[0] !== '-' ? array[array.length - 3].culture[0] : array[array.length - 3].par[0];
        } else {
            checkFieldFirst = array[array.length - 2].culture[0] !== '-' ? array[array.length - 2].culture[0] : array[array.length - 2].par[0];
            checkFieldSecond = array[array.length - 3].culture[0] !== '-' ? array[array.length - 3].culture[0] : array[array.length - 3].par[0];
        }

        console.log(sentArray);


        alert(`Данные участка ${array[array.length-1].title} 
Площадь ${array[array.length-1].squareField} Га
Культуры:
${array[array.length-3].year} г.: ${checkFieldSecond}
${array[array.length-2].year} г.: ${checkFieldFirst}
===========================================
На ${predictionYear+1} г. можно посеять следующие культуры: ${getPrediction(JSON.stringify(sentArray))}`)
    })

    const downloadReport = (nameTable, filename) => {
        let downloadLink;
        let dataType = 'application/vnd.ms-excel';
        let tableHTML = nameTable.outerHTML.replace(/ /g, '%20');

        filename = filename ? filename + '.xls' : 'excel_data.xls';
        downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        if (navigator.msSaveOrOpenBlob) {
            let blob = new Blob(['\ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
            downloadLink.download = filename;
            downloadLink.click();
        }
    }

    // Show info in right side
    let table = document.createElement('table');
    table.setAttribute('id', 'uniqueId');
    showButton.addEventListener('click', e => {
        updateFieldButton.classList.remove('edit-button-none');
        contentShow.innerHTML = '';
        let lengthColspan = Object.keys(array[0]).length;
        let title = array[array.length - 1].title;
        let square = array[array.length - 1].squareField;
        let tableHtml = `
    <tr>
        <th colspan=${lengthColspan}>
        ${title}:${square} Га
        </th>
    </tr>
    <tr>
        <td><strong>Сорт</strong></td>
        <td><strong>Культура</strong></td>
        <td><strong>Год</strong></td>
        <td><strong>Площадь культуры(Га)</strong></td>
        <td><strong>Пар</strong></td>
        <td><strong>Площадь пар(Га)</strong></td>
        <td><strong>Индекс сорта</strong></td>
        <td><strong>Неиспользованная земля(Га)</strong></td>
    </tr>`;
        let html = '';
        let total = '';
        for (let i = array.length - 2; i >= 0; i--) {
            html = `
        <tr>
            <td>${array[i].sort}</td>
            <td>${array[i].culture}</td>
            <td>${array[i].year}</td>
            <td>${array[i].squareCulture}</td>
            <td>${array[i].par}</td>
            <td>${array[i].squarePar}</td>
            <td>${array[i].index}</td>
            <td>${array[i].notUsedGround}</td>
        </tr>
        `
            total += html;
        }
        tableHtml += total;
        table.insertAdjacentHTML('beforeend', tableHtml);
        contentShow.insertAdjacentElement('beforeend', table);
        showButton.disabled = false;
        clearButton.disabled = false;
        generateButton.disabled = false;
        accountingButton.classList.remove('close-button');
        clearButton.classList.remove('close-button');
        showButton.classList.add('close-button');
    });

    //Used field button
    buttonUsed.addEventListener('click', e => {
        showMapWithChange(getNotUsedField());
    })

    //Not used field button
    buttonNotUsed.addEventListener('click', e => {
        showMapWithChange(getUsedField());
    })

    showMapWithChange(getMapsInfo());
    // console.log(array);
    generateButton.addEventListener('click', e => {
        downloadReport(table, 'report');
    })
}

showMapMainFunction();