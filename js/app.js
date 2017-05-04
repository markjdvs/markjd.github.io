console.log('Wagwan');

$(() => {

  const projects = [
    {
      appName: 'Between Many Ferns'

    },{
      appName: 'Last.drank'

    },{
      appName: 'Ritemove'

    }, {
      appName: 'GuideBlog'

    }
  ];


  function logClick() {
    console.log('click');
  }

  function createProjects() {
    $('body').append('<ul></ul>');

    $.each(projects, (i, project) => {
      $('ul').append(`<li><h1>${project.appName}</h1><p>Lorem</p></li>`);
    });

    $('ul').on('click', 'li', logClick);

  }

  createProjects();

});
