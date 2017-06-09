/* global ignore:skills ignore:projects ignore:about */

$(() => {

  // const about = $.getScript('./js/about.js');
  // const projects = $.getScript('./js/projects.js');

  let projectsDisplayed = false;
  let infoDisplayed = false;
  let aboutDisplayed = false;
  const $introButtons = $('div.introButtons');
  const $projectsBtn = $('button.projects');
  const $aboutBtn = $('button.about');
  const $skillsBtn = $('button.skills');
  const $navButtonsSwitch = $('li.navButtons');

  // $navButtonsSwitch.on('click', toggleNavButtons);

  function toggleNavButtons() {
    $navButtonsSwitch.addClass('animated bounceOutUp');
    setTimeout(function() {
      $navButtonsSwitch.children().attr('src', './images/up.png');
    }, 500);
  }

  function createPage() {
    $introButtons.addClass('animated flipInX');
    $projectsBtn.fadeIn().on('click', toggleProjects);
    $aboutBtn.fadeIn().on('click', toggleAbout);
    $skillsBtn.fadeIn().on('click', toggleSkills);
  }

  function toggleSkills() {
    toggleNavButtons();
    $introButtons.addClass('animated flipOutX').fadeOut(700, () => {
      $('main').append(`<div class='skills'><ul></ul></div>`);
      $.each(skills, (i, skill) => {
        $('div.skills ul').append(`<li><img src='${skill}'></li>`).children().addClass('animated pulse');
      });
    });
  }

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

  function toggleAbout() {
    toggleNavButtons();
    if(aboutDisplayed) {
      $introButtons.addClass('animated flipOutX').fadeOut(700, () => {
        $('div.about').fadeOut();
      });
    } else {
      $introButtons.addClass('animated flipOutX').fadeOut(700, () => {
        $('div.projects').remove();
        $('main').append(`
          <div class='about'>
            <p>${about.content1}</p>
            <p>${about.content2}</p>
          </div>
        `).hide().slideDown();
      });
    }
    aboutDisplayed = !aboutDisplayed;
  }

  function toggleProjects() {
    toggleNavButtons();
    if(projectsDisplayed) {
      $introButtons.addClass('animated flipOutX').fadeOut(700, () => {
        $('div.projects').fadeOut(400, () => {
          $('div.projects').remove();
        });
      });
    } else {
      $introButtons.addClass('animated flipOutX').fadeOut(700, () => {
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
                <span><img class='plus' src='images/plus.png' data-proj='${project.class}'></span>
              </div>`).fadeIn();
          }, i*100);
        });
      });
      $('div.projects').on('click', 'img.plus', resizeSquare);
    }
    projectsDisplayed = !projectsDisplayed;
  }

  function resizeSquare(e) {
    const grandparentOfTarget = $(e.target).parent().parent();
    // grandparentOfTarget.index();
    grandparentOfTarget.css({ position: 'relative' });
    const heightOfParent = $(e.target).parents('div.projects').height();
    const widthOfParent = $(e.target).parents('div.projects').width();
    grandparentOfTarget.animate({width: widthOfParent, height: heightOfParent}, 1000);
  }

  createPage();
});
