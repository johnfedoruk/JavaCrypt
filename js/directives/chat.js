app.directive(
	"chatArea",
  [
    "$timeout",
    "SessionService",
		"CryptoService",
    function(
      $timeout,
      SessionService,
			CryptoService
		) {
      return {
        restrict:'E',
        templateUrl:"./templates/chat.html",
        link: function(scope, element, attrs) {
					scope.focus = function() {
						$timeout(
							function() {
								var raw=document.getElementById('messageArea');
								if(raw.scrollTop+raw.offsetHeight>raw.scrollHeight-200) {
									setTimeout(
										function() {
											raw.scrollTop=raw.scrollHeight;
										},
										55
									);
									setTimeout(
										function() {
											raw.scrollTop=raw.scrollHeight;
										},
										111
									);
									setTimeout(
										function() {
											raw.scrollTop=raw.scrollHeight;
										},
										222
									);
									setTimeout(
										function() {
											raw.scrollTop=raw.scrollHeight;
										},
										444
									);
									setTimeout(
										function() {
											raw.scrollTop=raw.scrollHeight;
										},
										666
									);
								}
								$timeout(
									function(){
										var x=document.getElementById('chatInput');
										x.blur();
										x.focus();
									},
									10
								);/*just some magic for the android browser when focusing on the message area...*/
							},
							0
						);
					};
					scope.blur = function() {
						$timeout(
							function() {
								var x=document.getElementById('chatInput');
								var raw=document.getElementById('messageArea');
								if(x===document.activeElement&&raw.scrollTop+raw.offsetHeight>raw.scrollHeight-200) {
									setTimeout(
										function() {
											raw.scrollTop=raw.scrollHeight;
										},
										55
									);
									setTimeout(
										function() {
											raw.scrollTop=raw.scrollHeight;
										},
										111
									);
									setTimeout(
										function() {
											raw.scrollTop=raw.scrollHeight;
										},
										222
									);
									setTimeout(
										function() {
											raw.scrollTop=raw.scrollHeight;
										},
										444
									);
									setTimeout(
										function() {
											raw.scrollTop=raw.scrollHeight;
										},
										666
									);
								}
								$timeout(
									function(){
										x.blur();
									},
									10
								);
							},
							0
						);
					};
					SessionService.registerCallback(
						function() {
							var e = document.getElementById("chatInput");
							var f = function() {
								e.focus();
								if(e!==document.activeElement) {
									$timeout(
										f(),
										100
									);
								}
								else alert("it is!");
							};
							//alert("hello? anybody?");
							//console.log("chat room loaded");
	          	scope.me = SessionService.getUsername();
		          scope.chatroom = SessionService.getChatroom();
							if(!scope.mobile) {
								for(var i=0;i<=2000;i+=200) {
									$timeout(
										function() {
											document.getElementById("chatInput").focus();
										},
										i
									);
								}
							}
						}
					);

  			}
      };
    }
  ]
);
