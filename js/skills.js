'use strict';

/// CODIGO SKILLS //
var tagsContainer = document.querySelector('.etiquetas-habilidades-container');
var button = document.querySelector('.button');
var divMadre = document.getElementById('mama');
var arraySkills = [];
var selectSkills;
var contadorClases = 1;
var container;
var buttonRemove;
var optionAsPlaceholderText = 'Elige habilidad';
/////////////// FETCH PARA RECOGER LOS SKILLS DEL SERVIDOR /////////////////////////////

function searchArray() {
  fetch('https://raw.githubusercontent.com/Adalab/dorcas-s2-proyecto-data/master/skills.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {

      arraySkills = json.skills;
      arraySkills.push(optionAsPlaceholderText);
      arraySkills.reverse();
      console.log(arraySkills);
    });
}


/////////////// FIN FETCH PARA RECOGER LOS SKILLS DEL SERVIDOR /////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////
//// CODIGO SKILLS //

function eliminaUltimoDiv() {

  if (contadorClases > 2) {
    var k = event.currentTarget.parentElement;
    k.parentElement.removeChild(k);
    button.classList.remove('hidden'); //Quita la clase Hidden si hay menos de 3 opciones para que aparezca el +
    contadorClases--;

    updateTagList();
  } else {
    alert("Tiene que introducir alguna habilidad");
  }
}

function createRemoveButton() {
  buttonRemove = document.createElement('button');
  buttonRemove.setAttribute("type", "button");
  var insertMinus = document.createElement("div");
  insertMinus.classList.add("content-button-habilities");
  var minus = document.createTextNode("-");
  insertMinus.appendChild(minus);
  buttonRemove.appendChild(insertMinus);
  container.appendChild(buttonRemove);
  buttonRemove.classList.add('buttonRemove');
  buttonRemove.addEventListener('click', eliminaUltimoDiv);
}

function changeSkills() {
  //creo una etiqueta select//
  selectSkills = document.createElement('select');
  selectSkills.classList.add("form__select");
  container.appendChild(selectSkills);

  //bucle para rellenar el select con tantos options como colores haya en el arrayColors//
  for (var i = 0; i < arraySkills.length; i++) {
    //creamos el elemento option//
    var option = document.createElement('option');
    //creamos el texto de dentro del option, en este caso lo rellenamos con los strings que hay en arraySkills//
    var insertSkillToOption = document.createTextNode(arraySkills[i]);
    //Metemos los Strings dentro de los options//
    option.appendChild(insertSkillToOption);
    // metemoslos options dentro de los select//
    selectSkills.appendChild(option);
    selectSkills.addEventListener('change', updateTagList);
  }
}

function createDiv() {

  if (contadorClases < 3) {
    //creo un div//
    container = document.createElement('div');
    container.classList.add('container');
    divMadre.appendChild(container);
    changeSkills();
    createRemoveButton();
    contadorClases++;
  } else if (contadorClases === 3) {
    button.classList.add('hidden');

    container = document.createElement('div');
    container.classList.add('container');
    divMadre.appendChild(container);

    changeSkills();
    createRemoveButton();

    contadorClases++;
  } else {
    alert("Tiene que introducir alguna habilidad");
  }
}

searchArray();
button.addEventListener('click', createDiv);

////////////// AÑADIR A LA TARJETA ///////////////////

function updateTagList() {
  var currentListOfSelects = document.querySelectorAll('.form__select');

  tagsContainer.innerHTML = ''; //limpio los skills del preview

  for (var i = 0; i < currentListOfSelects.length; i++) {
    var currentSelect = currentListOfSelects[i];
    if (currentSelect.value !== optionAsPlaceholderText) {
      tagsContainer.innerHTML += '<li class="etiqueta-habilidad">' + currentSelect.value + '</li>';
    }
  }
}
