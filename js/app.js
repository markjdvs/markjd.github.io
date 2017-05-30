console.log('Wagwan');

$(() => {

  let projectsDisplayed = false;
  let infoDisplayed = false;
  let aboutDisplayed = false;

  function toggleInfo() {
    if(infoDisplayed) {
      const className = $(this).data('proj');
      $(`.${className} p`).slideUp();
      $(`.${className} img.infoUp`).hide();
      $(`.${className} img.infoDown`).show();
    } else {
      const className = $(this).data('proj');
      $(`.${className} p`).slideDown(1000);
      $(`.${className} img.infoDown`).hide();
      $(`.${className} img.infoUp`).show();

    }
    infoDisplayed = !infoDisplayed;
  }

  function createPage() {
    $('main').append(`<div class='title'><h1>Mark J Davis</h1><p></p></div><button class='about'>About</button><button class='projects'>Projects</button>`);
    $('button.projects').on('click', toggleProjects);
    $('button.about').on('click', toggleAbout);
  }

  function toggleAbout() {
    if(aboutDisplayed) {
      $('div.about').remove();
    } else {
      $('div.projects').remove();
      $('main').append(`<div class='about'><p>${about.content1}</p><p>${about.content2}</p></div>`);
    }
    aboutDisplayed = !aboutDisplayed;
  }

  function toggleProjects() {
    if(projectsDisplayed) {
      $('div.projects').fadeOut(400, () => {
        $('div.projects').remove();
      });
    } else {
      $('div.about').remove();
      $('main').append(`<div class='projects'></div>`);
      $.each(projects, (i, project) => {
        setTimeout(() => {
          $('div.projects').append(`
            <div class='${project.class}'>
              <h1>${project.appName}</h1>
              <p>${project.content}</p>
              <a href='${project.github}' target='_blank'><img src='images/github.png'></a>
              <a href='${project.link}' target='_blank'><img src='images/playIcon.png'></a>
              <span><img class='infoDown' src='images/infoDown.png' data-proj='${project.class}'></span>
              <span><img class='infoUp' src='images/infoUp.png' data-proj='${project.class}'></span>
            </div>`).fadeIn();
        }, i*100);
      });
      $('div.projects').on('click', 'img.infoDown', toggleInfo);
      $('div.projects').on('click', 'img.infoUp', toggleInfo);
    }
    projectsDisplayed = !projectsDisplayed;
  }

  createPage();
});
