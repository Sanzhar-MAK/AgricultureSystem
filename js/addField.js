const addLayerToMap = () => {

    const showButton = document.querySelector('.show-button');
    const buttonUsed = document.querySelector('.button-used');
    const buttonNotUsed = document.querySelector('.button-not-used');
    const generateButton = document.querySelector('.generate-report');
    const contentShow = document.querySelector('.content-show');
    const contentDescription = document.querySelector('.content-description');
    const clearButton = document.querySelector('.clear-button');
    const fieldRightUseButton = document.querySelector('.field-right-use-button');
    const addContent = document.querySelector('.add-content');
    const accountingButton = document.querySelector('.accounting-button');

    const addInfoToLayer = document.querySelector('.add-info-to-layer');

    const saveLayerButton = document.querySelector('.save-layer-button');
    const addLayer = document.querySelector('.add-layer-button');

    const numberOfField = document.querySelector('.number-of-field'),
        squareOfField = document.querySelector('.square-of-field'),
        cadastralOfField = document.querySelector('.cadastral-of-field');

    const addInfo = document.querySelector('.add-info'),
        removeInfo = document.querySelector('.remove-info'),
        infoFieldMain = document.querySelector('.info-field');

    removeInfo.style.display = 'none';

    let result; //object for show maps in left side
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

    let infoField;

    function sentObj(objInfo) {
        $.ajax({
            url: 'insertMapInfo.php',
            type: 'POST',
            async: false,
            data: {
                fieldInfo: (objInfo)
            },
            success: function (data) {
                data = JSON.parse(data);
                infoField = data;
            },
            error: function () {
                infoField = 'Not connected';
            }
        });
        return infoField
    }

    let cultureList;

    function getCultureList(state) {
        $.ajax({
            url: 'getCulture.php',
            data: {
                "state": state
            },
            type: 'GET',
            async: false,
            success: function (data) {
                data = JSON.parse(data);
                cultureList = data;
            },
            error: function () {
                cultureList = 'Not connected';
            }
        });
        return cultureList;
    }
    let sortList;

    function getSortList(culture) {
        $.ajax({
            url: 'getSorts.php',
            type: 'POST',
            async: false,
            data: {
                sorts: (culture)
            },
            success: function (data) {
                data = JSON.parse(data);
                sortList = data;
            },
            error: function () {
                sortList = 'Not connected';
            }
        });
        return sortList
    }

    let objectGet

    function sentFieldInfo(object) {
        $.ajax({
            url: 'createFieldInfo.php',
            type: 'POST',
            async: false,
            data: {
                fieldInfoAbout: (object)
            },
            success: function (data) {
                data = JSON.parse(data);
                objectGet = data;
                alert(objectGet);
            },
            error: function () {
                objectGet = 'Not connected';
            }
        });
        return objectGet
    }


    addLayer.addEventListener('click', e => {
        showButton.style.display = 'none';
        buttonUsed.style.display = 'none';
        buttonNotUsed.style.display = 'none';
        generateButton.style.display = 'none';
        addLayer.style.display = 'none';
        contentShow.style.display = 'none';
        clearButton.style.display = 'none';
        fieldRightUseButton.style.display = 'none';
        addContent.style.display = 'none';
        accountingButton.style.display = 'none';
        contentDescription.innerHTML = '';

        saveLayerButton.style.display = 'block';

        addInfoToLayer.style.display = 'block';


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

                map.on('click', `${info.idFill}`, (e) => {
                    if (typeof (array) === 'string') {
                        alert(`Поле ${info.numberOfFields} не используется, нету не единой культуры`);

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

        const draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                polygon: true,
                trash: true
            },
            defaultMode: 'draw_polygon'
        });
        map.addControl(draw);

        map.on('draw.create', updateArea);
        map.on('draw.update', updateArea);
        map.on('draw.delete', deleteArea);

        let sentCoord;

        function updateArea(e) {
            const data = draw.getAll();
            if (data.features.length > 0) {
                sentCoord = data['features'][0]['geometry']['coordinates'][0];
            }
            return sentCoord
        }

        function deleteArea(e) {
            updateArea()
            sentCoord = 0;
        }

        saveLayerButton.addEventListener('click', e => {
            let number = numberOfField.value;
            let square = squareOfField.value;
            let cadastral = cadastralOfField.value;
            if (sentCoord === [null] || sentCoord === 0 || sentCoord === [] || sentCoord === undefined) {
                alert('Начертите поле');
                e.preventDefault();
            } else if (number === '' || square === 0 || cadastral === '') {
                alert('Пожалуйста заполните все данные');
                e.preventDefault();
            } else {
                saveLayerButton.style.display = 'none';
                addInfoToLayer.style.display = 'none';

                objSent = {
                    "number": '' + number,
                    "square": +square,
                    "cadastral": '' + cadastral,
                    "coord": sentCoord
                }
                sentObj(JSON.stringify(objSent));
                // console.log(infoField);
            }

        })
    })

    getCultureList();
    let cultureForAdd = ``;
    for (let item in cultureList) {
        let option = `
        <option>${cultureList[item]}</option>
        `
        cultureForAdd += option;
    }

    infoFieldMain.insertAdjacentHTML('beforeend',
        `<div class="info-field-fill">
                <div class="input-value-field">
                    <select name="input-culture" class="input-field-input input-culture">
                        <option>Выберите культуру</option>
                        ${cultureForAdd}
                    </select>
                </div>
                <div class="input-value-field">
                    <select name="input-culture" class="input-field-input input-sort">
                        <option>Выберите сорт</option>
                    </select>
                </div>
                <div class="input-value-field">
                    <input type="text" class="input-field-input input-year">
                </div>
        </div>`)

    const inputCultureFirst = document.querySelector('.input-culture');
    const optionFirst = document.querySelector('.input-sort');
    const inputYear = document.querySelector('.input-year');
    inputCultureFirst.addEventListener('change', e => {
        const target = e.target;
        getSortList(target.value);
        optionFirst.innerHTML = '';
        sortList.forEach(item => {
            let optionSort = `
                    <option>${item.nameSort}</option>
                    `
            optionFirst.insertAdjacentHTML('beforeend', optionSort);
        })
    })
    inputCultureFirst.addEventListener('change', e => {
        const target = e.target;
        console.log(target.value);
        if (optionFirst.length === 1) {
            // console.log(optionFirst.value);
        } else {
            let first = optionFirst[0].value
            optionFirst.addEventListener('change', e => {
                first = e.target.value;
            })
            // console.log(first);
        }
    })
    inputYear.addEventListener('input', e => {
        // console.log(e.target.value);
    })

    addInfo.addEventListener('click', e => {
        e.preventDefault();
        let addData = `
        <div class="info-field-fill">
                <div class="input-value-field">
                    <select name="input-culture" class="input-field-input input-culture">
                        <option>Выберите культуру</option>
                        ${cultureForAdd}
                    </select>
                </div>
                <div class="input-value-field">
                    <select name="input-culture" class="input-field-input input-sort">
                        <option>Выберите сорт</option>
                    </select>
                </div>
                <div class="input-value-field">
                    <input type="text" class="input-field-input input-year">
                </div>
        </div>
        `
        infoFieldMain.insertAdjacentHTML('beforeend', addData);

        let lastFill = document.querySelectorAll('.info-field-fill');
        if (lastFill.length === 1) {
            removeInfo.style.display = 'none';
        } else {
            removeInfo.style.display = 'inline-block';
        }
        const inputCultureAll = document.querySelectorAll('.input-culture');
        const inputSort = document.querySelectorAll('.input-sort');
        console.log(inputCultureAll);
        inputCultureAll.forEach((input, index) => {
            input.addEventListener('change', e => {
                const target = e.target;
                getSortList(target.value);
                inputSort[index].innerHTML = '';
                sortList.forEach(item => {
                    let optionSort = `
                    <option>${item.nameSort}</option>
                    `
                    inputSort[index].insertAdjacentHTML('beforeend', optionSort);
                })
            })
        })

        inputCultureAll.forEach((input, index) => {
            input.addEventListener('change', e => {
                const target = e.target;
                console.log(target.value);
                if (inputSort[index].length === 1) {
                    // console.log(inputSort[index].value);
                } else {
                    inputSort[index].addEventListener('change', e => {
                        // console.log(e.target.value)
                    })
                }
            })
        })
    })

    removeInfo.addEventListener('click', e => {
        e.preventDefault();
        let lastFill = document.querySelectorAll('.info-field-fill');
        let last = lastFill[lastFill.length - 1];
        console.log(lastFill.length);
        if ((lastFill.length) - 1 === 1) {
            last.remove();
            removeInfo.style.display = 'none';
        } else {
            removeInfo.style.display = 'inline-block';
            last.remove();
        }
    })

    saveLayerButton.addEventListener('click', e => {
        let number = numberOfField.value;
        let square = squareOfField.value;
        let cadastral = cadastralOfField.value;
        if (number === '' || square === 0 || cadastral === '') {
            alert('Пожалуйста заполните все данные');
            e.preventDefault();
        } else {
            const allCulture = document.querySelectorAll('.input-culture');
            const allSort = document.querySelectorAll('.input-sort');
            const allYear = document.querySelectorAll('.input-year');

            let fieldName = `Поле-№${number}`;
            let totalObject = []
            allCulture.forEach((item, index) => {
                getSortList(item.value);
                console.log(sortList);
                let i;
                sortList.forEach(item => {
                    if (item.nameSort === allSort[index].value) {
                        i = item.sortIndex;
                    }
                })
                console.log(item.value, ' ', allSort[index].value, ' ', allYear[index].value, i);
                const check = allSort[index].value === 'Пар' ? 'Пар' : '';
                const checkTwo = allSort[index].value !== 'Пар' ? allSort[index].value : '';
                const field = index >= 1 ? '' : fieldName;
                const squareField = index >= 1 ? '' : square;
                let objectFirst = {
                    "id": index,
                    "nameOfField": field,
                    "squareOfField": squareField,
                    "nameOfSortandSquare": checkTwo,
                    "notSownPartSquare": check,
                    "year": allYear[index].value,
                    "idSorts": i
                }
                totalObject.push(objectFirst);
            })
            totalObject.push({
                "numberOfField": number
            })
            sentFieldInfo(totalObject)
        }
    })

    getMapsInfo();
}

addLayerToMap();