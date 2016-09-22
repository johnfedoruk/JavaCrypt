app.factory(
  "LinksService",
  [
    "$location",
    function($location) {
      var links = [
        /*
        {
          name:"About",
          url:"about",
          icon:"info",
          fill:"orange",
          blankTarget:false
        },*/
        {
          name:"Github",
          url:"https://github.com/johnfedoruk/JavaCrypt",
          icon:"github-box",
          fill:"darkGray",
          blankTarget:true
        },
        {
          name:"facebook",
          url:"https://facebook.com/javacrypt",
          icon:"facebook",
          fill:"#3b5998",
          blankTarget:true
        },
        {
          name:"Twitter",
          url:"https://twitter.com/javacrypt",
          icon:"twitter",
          fill:"#00aced",
          blankTarget:true
        },
        {
          name:"Google Plus",
          url:"https://googleplus.com/javacrypt",
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
