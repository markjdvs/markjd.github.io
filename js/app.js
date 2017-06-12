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

  $navButtonsSwitch.on('click', toggleNavButtons);

  function refreshDisplayContent() {
    $('div.skills').hide();
    $('div.projects').hide();
    $('div.about').hide();
  }

  function toggleNavButtons() {

    if($navButtonsSwitch.hasClass('bounceOutUp')) {
      console.log('nothing displayed');
      $navButtonsSwitch.children().attr('src', './images/down.png');
      $navButtonsSwitch.toggleClass('bounceOutUp').toggleClass('slideInDown');
      refreshDisplayContent();
      $introButtons.removeClass().show().addClass('animated flipInX');
    } else {
      console.log('need to display something');
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
    $introButtons.addClass('animated flipOutX').fadeOut(700, () => {
      $('main').append(`<div class='skills'><ul></ul></div>`);
      $.each(skills, (i, skill) => {
        $('div.skills ul').append(`<li><img src='${skill}'></li>`).children().addClass('animated pulse');
      });
    });
  }

  function toggleInfo(e) {
    console.log('running toggleInfo');
    console.log($(e.target).parent().parent().parent());
    $(e.target).parent().parent().parent().flip();



    // if(infoDisplayed) {
    //   const className = $(this).data('proj');
    //   $(`.${className} p`).slideUp();
    //   $(`.${className} img.infoUp`).hide();
    //   $(`.${className} img.infoDown`).show();
    // } else {
    //   const className = $(this).data('proj');
    //   $(`.${className} p`).slideDown(1000);
    //   $(`.${className} img.infoDown`).hide();
    //   $(`.${className} img.infoUp`).show();
    //
    // }
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
            <p>${about.content1} ${about.content2}</p>
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
              <div class='${project.class} card'>
                <div class='front'>
                  <h1>${project.appName}</h1>
                  <p>${project.content}</p>
                  <a href='${project.github}' target='_blank'><img src='images/githubWhite.png'></a>
                  <span><img class='plus' src='images/plus.png'></span>
                </div>
                <div class='back'>${project.content}</div>
              </div>`).fadeIn();
            console.log();
          }, i*100);
        });
        setTimeout(() => {
          $('img.plus').on('click', toggleInfo);
        }, 1000);
      });
    }
    projectsDisplayed = !projectsDisplayed;
  }

  // function resizeSquare(e) {
  //   console.log('clicked');
  //   const grandparentOfTarget = $(e.target).parent().parent();
  //   // grandparentOfTarget.index();
  //   grandparentOfTarget.css({ position: 'relative' });
  //   const heightOfParent = $(e.target).parents('div.projects').height();
  //   const widthOfParent = $(e.target).parents('div.projects').width();
  //   grandparentOfTarget.animate({width: widthOfParent, height: heightOfParent}, 1000);
  // }

  createPage();
});
