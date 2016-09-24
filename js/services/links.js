app.factory(
  "LinksService",
  [
    "$location",
    function($location) {
      var links = [
        {
          name:"Github",
          url:"https://github.com/johnfedoruk/JavaCrypt",
          icon:"github-box",
          fill:"darkGray",
          blankTarget:true
        },
        {
          name:"facebook",
          url:"https://facebook.com/javacrypt.net",
          icon:"facebook",
          fill:"#3b5998",
          blankTarget:true
        },
        {
          name:"Twitter",
          url:"https://twitter.com/javacrypt256",
          icon:"twitter",
          fill:"#00aced",
          blankTarget:true
        },
        {
          name:"Google Plus",
          url:"https://plus.google.com/u/0/b/113820666640024502614/113820666640024502614/",
          icon:"google-plus",
          fill:"#db4437",
          blankTarget:true
        },

        {
          name:"SSL LABS",
          url:"https://www.ssllabs.com/ssltest/analyze.html?d=javacrypt.net",
          icon:"./images/ssllabs.svg",
          fill:"",
          blankTarget:true
        },
        {
          name:"WPG I.T.",
          url:"https://wpgit.ca",
          icon:"./images/wpgit.svg",
          fill:"DeepSkyBlue ",
          blankTarget:true
        },
      ];
      var callbacks = [];
      var path = $location.path();
      return {
        getLinks:function() {
          return links;
        },
        getPath: function() {
          return path;
        },
        setPath: function(p) {
          path = p;
          for(var i=0;i<callbacks.length;i++) {
            try {
              callbacks[i]();
            }
            catch(e) {
              console.log(e);
            }
          }
        },
        registerCallback: function(callback) {
          callbacks.push(callback);
        }
      };
    }
  ]
);
