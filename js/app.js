/* global skills:ignore projects:ignore about:ignore */

const possibleStates = {
  about : 'about',
  projects: 'projects',
  skills: 'skills'
}

function initialise() {
  let state = '';
  
  document.addEventListener('DOMContentLoaded', () => {
    const navButtons = Array.from(document.getElementsByClassName('navbar__item'));
    console.log(navButtons);

    for (let button of navButtons) button.addEventListener('click', toggleActive);
    
  })
}

function toggleActive() {
  const activeButton = document.getElementById('active');
  if (!activeButton) {
    this.setAttribute('id', 'active');
    return toggleSection(this.innerHTML);
  }
  
  if (this === activeButton) {
    activeButton.removeAttribute('id', 'active');
    return toggleSection();
  }
  
  activeButton.removeAttribute('id', 'active');
  this.setAttribute('id', 'active');
  toggleSection(this.innerHTML);
}

function toggleSection(state) {
  console.log('state', state);

  if (!state) {
    // hide others

  }

  const sectionToDisplay = document.getElementById(state)
  console.log('sectionToDisplay', sectionToDisplay);

  if (!sectionToDisplay) {  
    hideContentItems();
    return document.getElementById('landing')[0].removeAttribute('class', '_hide');
  }

  hideContentItems();
  sectionToDisplay.removeAttribute('class', '_hide');
}

function getContentItems() {
  return Array.from(document.getElementsByClassName('content__item'));
}

function hideContentItems() {
  for (let item of getContentItems()) item.setAttribute('class', '_hide');
}

initialise();