console.log('Wagwan');

$(() => {

  const projects = [
    {
      appName: 'Between Many Ferns',
      content: `A moving puzzle game with similar logic to that of Candy Crush. During the build, the first short sprint to a 3 by 3 grid meant that I could see a scaleable solution early on during the project. I began again from scratch as major functions required near complete redefinition.

      Calculating the particular geometric patterns required to make these scaleable functions was the biggest issue I encountered. By nesting a loop within a loop I could pass through the index from the first to the second, which allowed these functions to check and remove matching chains of symbols across two axes. The board size now depends on one variable at the beginning of the code, and fully functional regardless of its value.`,
      github: `https://github.com/markjdvs/project-game`,
      link: `https://secure-dawn-20517.herokuapp.com/`,
      class: 'fern'

    },{
      appName: 'Last.drank',
      content: `A fun, user-driven app for finding recommendations to preferred cocktails. Built with an Express back-end, using session-type authentication and OAuth Github & Facebook authorisations, and a jQuery front-end, this was very much an app after my own heart. It is an app that helps you to try something new and different, but still to your taste.

      The first problem I came to was normalising the recommendations’ or “twists”’ main ingredient of new entries. I did this using the Tesco API, which makes a request based on the user’s input. The vast data response from the API needed thorough filtering and the necessary attributes of the product passed through to the database using hidden inputs.

      A personal favourite of this project, although simple, involved a dynamic creation of the tastes of each cocktail. I employed a binary ratings system in the database that is checked by the front-end, and in turn renders icons on the page to reflect these tastes.`,
      github: `https://github.com/markjdvs/project-full-stack-app`,
      link: `https://afternoon-earth-16892.herokuapp.com/`,
      class: 'drank'
    },{
      appName: 'Ritemove',
      content: `A group project that provides a platform for finding rental properties as a group. This is an Express app with an Angular front-end.

      An enjoyable challenge I found during this build was finding a way of adding users to groups and rendering this live addition on the page. Using resource promises, I filtered through the users based on the user’s input and on a click the specified user was added to the group and rendered inside the “added” section of the group.

      Another issue required population of two models in both directions. Referenced models didn’t allow such relationships, as I needed the id of a model’s instance before it was created. I solved this issue using a pre-save lifecycle hook to attach a virtual to the new instance and then populated this using Mongoose’s built-in feature.`,
      github: `https://github.com/markjdvs/project-3`,
      link: 'https://pnc-app.herokuapp.com/',
      class: 'rite'
    }, {
      appName: 'GuideBlog',
      content: `A voluntarily pair-coded project built with a Ruby on Rails back-end API, with an Angular front-end and JWT authentication. This mobile-first app is driven by users’ blog posts from visiting areas around the world to create clusters of interest across the globe that new users can tap into in order to plan future trips.

      I used custom serializers to attach attributes to “stops” along a user’s trip. I wanted to ensure that the ratings were reflective of people who had visited these places, so the average rating attributes that I attached to these stops were an average across all associated posts. These ratings are then rendered on click of a specific marker in our “WorldBlog”. Another aspect that we wanted to employ was user-driven voting of posts that were deemed truthful and/or useful to users.

      By integrating the Acts As Votable gem into our back-end I was able to write custom methods for these upvote and downvote functions. By then serializing this data once again, an overall vote tally was provided for each post to the Angular app out front, lightening the load and ensuring the speed of our app was not diminished.`,
      github: `https://github.com/markjdvs/project-4-frontend`,
      link: 'https://secure-plateau-23163.herokuapp.com/',
      class: 'guide'
    }
  ];

  const about = {
    content1: `A love for connecting moving parts is why I chose to do Economics and Spanish at university. Knowing that I didn’t want to work in finance but not knowing my definitive career path, I fell into managing cocktail bars and an eye for detail and continual want to learn put me in good stead.`,
    content2: `I wanted a change from the antisocial hours. For me coding is just another language; create a foundation from which I could expand on in my own time. An aspect of self-education and desire to continue in a dynamic industry lead me to code in my spare time and the course at GA seemed the perfect fit to kickstart that change.`
  }

  let projectsDisplayed = false;
  let infoDisplayed = false;
  let aboutDisplayed = false;

  function toggleInfo() {
    if(infoDisplayed) {
      const className = $(this).data('proj');
      $(`.${className} p`).slideUp();
      $(`.${className} img.infoUp`).hide();
      $(`.${className} img.infoDown`).show();
    }
    else {
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
    }
    else {
      $('main').append(`<div class='about'><p>${about.content1}</p><p>${about.content2}</p></div>`);
    }
    aboutDisplayed = !aboutDisplayed;
  }

  function toggleProjects() {
    if(projectsDisplayed) {
      $('div.projects').fadeOut(400, () => {
        $('div.projects').remove();
      });
    }
    else {
      $('main').append(`<div><div><div class='projects'></div></div></div>`);
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
            </div>`);
       }, i*100);
      });
      $('div.projects').on('click', 'img.infoDown', toggleInfo);
      $('div.projects').on('click', 'img.infoUp', toggleInfo);
    }
    projectsDisplayed = !projectsDisplayed;
  }

  createPage();
});
