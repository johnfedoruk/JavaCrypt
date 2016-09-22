app.directive(
	"loginArea",
  [
		"SocketService",
    "SessionService",
    "MessagesService",
		'UserlistService',
		"$mdDialog",
    function(
			SocketService,
      SessionService,
      MessagesService,
			UserlistService,
			$mdDialog) {
      return {
        restrict:'E',
        templateUrl:"./templates/login.html",
        link: function(scope, element, attrs) {
					function error(title,message,label,el,ev) {
						$mdDialog.show(
							$mdDialog.alert()
							.parent(
								angular.element(
									document.querySelector('#body')
								)
							)
							.clickOutsideToClose(true)
							.title(title)
							.textContent(message)
							.ariaLabel(label)
							.ok('Okay!')
							.targetEvent(ev)
						).then(
							function() {
								setTimeout(
									function() {
										if(el!=null)
											el.focus();
									},100
								);
							}
						);
					}
					scope.useEncryption = true;
					scope.cipher = "AES256";
					scope.input_username = "";
					scope.input_chatroom = "";
					scope.input_key="";
					var registered = false;
					scope.login = function(ev) {
						var username = scope.input_username;
						var chatroom = scope.input_chatroom;
						var key = scope.input_key;
						var useEnc = scope.useEncryption;
						SessionService.setUsername(username);
						if(!SessionService.isConnected()) {
							error(
								"Connection Error!",
								"A connection could not be made to the server. If you are using"
								+" an old browser, try using Chrome or Firefox. If you have a bad"
								+" internet connection, try again later. Otherwise, our servers"
								+"may be down temporarily.",
								+"connection error",
								null,
								ev
							);
						}
						else if(username.length<1) {
							error(
								"Login Error!",
								"You must enter a uesername.",
								"username error",
								document.getElementById("input_username"),
								ev
							);
						}
						else if(chatroom.length<1) {
							error(
								"Login Error!",
								"You must enter a chatroom.",
								"chatroom error",
								document.getElementById("input_chatroom"),
								ev
							);
						}
						else if(useEnc==true&&key.length<1) {
							error(
								"Key Error!",
								"You must enter an encryption key if you want to use encryption.",
								"key error",
								document.getElementById("input_key"),
								ev
							);
						}
						else {
							if(!registered) {
								registered = true;
								SocketService.registerCallback(
									function(e) {
										var json = JSON.parse(e.data);
										if(!("event" in json)||json.event!="authenication")
											return;
										if("error" in json) {
											error(
												"Error From Server!",
												json.error.message,
												"server error",
												null,
												ev
											);
											return;
										}
										if("username" in json&&json.username==SessionService.getUsername()) {
											SessionService.login(
												chatroom,
												json.username,
												json.datetime,
												json.userlist,
												key
											);
											return;
										}
										else {
											error(
												"Error From Server!",
												"Unknown response from server.",
												"server error",
												null,
												ev
											);
										}
									},
									"onmessage"
								);
							}
							SocketService.send(
								{
									event:"login",
									username:username,
									chatroom:chatroom,
									greeting:SessionService.getGreeting()
								}
							);
						}
					};
  			}
      };
    }
  ]
);
