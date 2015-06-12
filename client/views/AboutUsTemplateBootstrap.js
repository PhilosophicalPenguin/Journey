window.AboutUsTemplateBootstrap = Backbone.View.extend({

  el: '#mainContent',

  initialize: function() {
    this.render()
  },

  render: function() {
    return this.$el.append('<div class="aboutUs"> \
      <div class="container"> \
        <div class="row no-pad"> \
        <h1 class="aboutUs"> Our Team </h1>  \
          <div class="col-md-3 profileCol text-center"> \
            <img class="memberpic" src="assets/yuriy.jpg"> \
            <p>Yuriy Bash</p> \
            <ul> \
              <li class="links"> \
                <a href="https://www.linkedin.com/in/yuriybash"> \
                 <img class="logo" src="assets/linkedinlogo.png"> \
                </a> \
              <li class="links"> \
                <a href="https://github.com/yuriybash"> \
                 <img class="logo" src="assets/githublogo.png"> \
                </a> \
              <li class="links"> \
                <a href="http://yuriybash.com/"> \
                 <img class="logo" src="assets/homepageicon.png"> \
                </a> \
            </ul> \
          </div> \
          <div class="col-md-3 profileCol text-center"> \
            <img class="memberpic" src="assets/derek.jpg"> \
              <p>Derek Boero</p> \
            <ul> \
              <li class="links"> \
                <a href="https://www.linkedin.com/in/derekboero"> \
                 <img class="logo" src="assets/linkedinlogo.png"> \
                </a> \
              <li class="links"> \
                <a href="https://github.com/db222"> \
                 <img class="logo" src="assets/githublogo.png"> \
                </a> \
              <li class="links"> \
                <a href="http://derekboero.com"> \
                 <img class="logo" src="assets/homepageicon.png"> \
                </a> \
            </ul> \
          </div> \
          <div class="col-md-3 profileCol text-center"> \
            <img class="memberpic" src="assets/edoe.jpg"> \
              <p>Edoe Cohen</p> \
            <ul> \
              <li class="links"> \
                <a href="https://www.linkedin.com/in/edoecohen"> \
                 <img class="logo" src="assets/linkedinlogo.png"> \
                </a> \
              <li class="links"> \
                <a href="https://github.com/edoecohen"> \
                 <img class="logo" src="assets/githublogo.png"> \
                </a> \
              <li class="links"> \
                <a href="http://edoecohen.com/"> \
                 <img class="logo" src="assets/homepageicon.png"> \
                </a> \
            </ul> \
          </div> \
          <div class="col-md-3 profileCol text-center"> \
            <img class="memberpic" src="assets/sunshine.jpg"> \
            <p>Sunshine Yin</p> \
            <ul> \
              <li class="links"> \
                <a href="https://www.linkedin.com/in/sunshineyin"> \
                 <img class="logo" src="assets/linkedinlogo.png"> \
                </a> \
              <li class="links"> \
                <a href="https://github.com/sunshinewyin"> \
                 <img class="logo" src="assets/githublogo.png"> \
                </a> \
              <li class="links"> \
                <a href="http://sunshineyin.com/"> \
                 <img class="logo" src="assets/homepageicon.png"> \
                </a> \
            </ul> \
          </div> \
        </div> \
        <div class="row no-pad"> \
          <div class="col-md-12"> \
            <h1 class="aboutUs"> Tech Stack </h1> \
            <ul class="techStack"> \
              <li class="backbone techstack"> \
                <a href="http://github.com"> \
                 <img class="techStackImg" src="assets/backbone.png"> \
                </a> \
              </li> \
              <li class="nodejs techStack"> \
                <a href="http://github.com"> \
                  <img class="techStackImg" src="assets/nodejs.png"> \
              </a> \
              </li> \
              <li class="express techStack"> \
                <a href="http://github.com"> \
                  <img class="techStackImg" src="assets/express.png"> \
              </a> \
              </li> \
              <li class="MySQL techStack"> \
                <a href="http://github.com"> \
                  <img class="techStackImg" src="assets/MySQL.png"> \
                </a> \
              </li> \
              <li class="knex techStack"> \
                <a href="http://github.com"> \
                  <img class="techStackImg" src="assets/knex.png"> \
              </a> \
              </li> \
              <li class="bookshelf techStack"> \
                <a href="http://github.com"> \
                  <img class="techStackImg" src="assets/bookshelf.png"> \
              </a> \
              </li> \
              <li class="highcharts techStack"> \
                <a href="http://github.com"> \
                  <img class="techStackImg" src="assets/highcharts.svg"> \
              </a> \
              </li> \
              <li class="d3 techStack"> \
                <a href="http://github.com"> \
                  <img class="techStackImg" src="assets/d3.png"> \
              </a> \
              </li> \
              <li class="python techStack"> \
                <a href="http://github.com"> \
                  <img class="techStackImg" src="assets/python.png"> \
              </a> \
              </li> \
              <li class="gulp techStack"> \
                <a href="http://github.com"> \
                  <img class="techStackImg" src="assets/gulp.png"> \
              </a> \
              </li> \
              <li class="gulp techStack"> \
                <a href="http://github.com"> \
                  <img class="techStackImg" src="assets/jasmine.svg"> \
              </a> \
              </li> \
              <li class="scrapy techStack"> \
                <a href="http://github.com"> \
                  <img class="techStackImg" src="assets/scrapy.png"> \
                </a> \
              </li> \
            </ul> \
          </div> \
        </div> \
    </div> \
  </div>')
}

})

