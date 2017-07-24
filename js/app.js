/* global skills:ignore projects:ignore about:ignore */

$(() => {
  let projectsDisplayed = false;
  let infoDisplayed = false;
  let aboutDisplayed = false;
  const $introButtons = $('div.introButtons');
  const $projectsBtn = $('button.projects');
  const $aboutBtn = $('button.about');
  const $skillsBtn = $('button.skills');
  const $navButtonsSwitch = $('li.navButtons');

  function refreshDisplayContent() {
    $navButtonsSwitch.off('click', toggleNavButtons);
    $('div.skills').hide();
    $('div.projects').remove();
    projectsDisplayed = false;
    $('div.about').hide();
    aboutDisplayed = false;
  }

  function toggleNavButtons() {
    $('main').removeClass();

    if($navButtonsSwitch.hasClass('bounceOutUp')) {
      $navButtonsSwitch.children().attr('src', './images/down.png');
      $navButtonsSwitch.toggleClass('bounceOutUp').toggleClass('slideInDown');
      refreshDisplayContent();
      $introButtons.removeClass().show().addClass('animated flipInX');
    } else {
      $navButtonsSwitch.toggleClass('slideInDown').toggleClass('bounceOutUp');
      setTimeout(function() {
        $navButtonsSwitch.children().attr('src', './images/up.png');
      }, 500);
    }
  }

  function createPage() {
    $navButtonsSwitch.addClass('animated slideInDown');
    $introButtons.addClass('animated flipInX');
    $projectsBtn.fadeIn().on('click', toggleProjects);
    $aboutBtn.fadeIn().on('click', toggleAbout);
    $skillsBtn.fadeIn().on('click', toggleSkills);
  }

  function toggleSkills() {
    toggleNavButtons();
    $navButtonsSwitch.on('click', toggleNavButtons);

    $introButtons.addClass('animated flipOutX').fadeOut(700, () => {
      $('main').append(`<div class='skills'><ul></ul></div>`);
      $.each(skills, (i, skill) => {
        $('div.skills ul').append(`<li><img src='${skill}'></li>`).addClass('animated pulse');
      });
      // $('div skills ul').children().addClass('animated pulse');

    });
  }

  function toggleInfo(e) {
    $(e.target).parent().parent().parent().flip();
    infoDisplayed = !infoDisplayed;
  }

  function toggleAbout() {
    toggleNavButtons();
    $navButtonsSwitch.on('click', toggleNavButtons);
    if(aboutDisplayed) {
      $introButtons.addClass('animated flipOutX').fadeOut(700, () => {
        $('div.about').fadeOut();
      });
    } else {
      $introButtons.addClass('animated flipOutX').fadeOut(700, () => {
        $('div.projects').remove();
        $('main').append(`
          <div class='about'>
            <p>${about.content1} ${about.content2}</p>
            <p><a href="${about.github}" target="_blank"><img src="./images/githubWhite.png"></a><a href="mailto:markjdvs@gmail.com" target="_blank"><img src="./images/mail.png"></a><a href="${about.linkedIn}" target="_blank"><img src="./images/linkedIn.png"></a></p>
          </div>
        `).show().addClass('animated flipInX');
      });
    }
    aboutDisplayed = !aboutDisplayed;
  }

  function toggleProjects() {
    toggleNavButtons();
    $navButtonsSwitch.on('click', toggleNavButtons);
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
              <div class='${project.class} card'>
                <div class='front'>
                  <h1>${project.appName}</h1>
                  <p>${project.content}</p>
                  <a href='${project.github}' target='_blank'><img src='images/githubWhite.png'></a>
                  <span><img class='plus' src='images/plus.png'></span>
                </div>
                <div class='back'>${project.content}</div>
              </div>
              `).fadeIn();
          }, i*100);
        });
        setTimeout(() => {
          $('img.plus').on('click', toggleInfo);
        }, 1000);
      });
    }
    projectsDisplayed = !projectsDisplayed;
  }

  createPage();
});
