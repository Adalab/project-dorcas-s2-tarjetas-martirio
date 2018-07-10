'use strict';

/// CODIGO SKILLS //

var button = document.querySelector('.button');
var divMadre = document.getElementById('mama');
var arraySkills = ['html', 'sass', 'css', 'JS'];
var selectSkills;
var contadorClases = 1;
var container;
var buttonRemove;

function eliminaUltimoDiv() {

  if (contadorClases > 2) {
    var k = event.currentTarget.parentElement;
    k.parentElement.removeChild(k);
    button.classList.remove('button-empty'); //Quita la clase Hidden si hay menos de 3 opciones para que aparezca el +
    contadorClases--;
  } else {
    alert('Tiene que introducir alguna habilidad');
  }
}

function createRemoveButton() {
  buttonRemove = document.createElement('button');
  buttonRemove.setAttribute('type', 'button');
  var insertMinus = document.createTextNode('-');
  buttonRemove.appendChild(insertMinus);
  container.appendChild(buttonRemove);
  buttonRemove.classList.add('buttonRemove');
  buttonRemove.addEventListener('click', eliminaUltimoDiv);

}

function changeSkills() {
  //creo una etiqueta select//
  selectSkills = document.createElement('select');
  selectSkills.classList.add('form__select');
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
    button.classList.add('button-empty');

    container = document.createElement('div');
    container.classList.add('container');
    divMadre.appendChild(container);
    changeSkills();
    createRemoveButton();
    contadorClases++;
  } else {
    alert('Tiene que introducir al menos una habilidad');
  }
}

createDiv();
button.addEventListener('click', createDiv);