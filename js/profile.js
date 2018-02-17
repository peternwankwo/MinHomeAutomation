var pubnub = new PubNub({
	subscribeKey: 'sub-c-76e55540-4157-11e7-bc55-0619f8945a4f', // always required
	publishKey: 'pub-c-470fba28-bad4-46d5-9ae9-d3ac2828025b' // only required if publishing
});

pubnub.addListener({
	message: function (message) {
		if (message && message.message.uuid == 'b9407f30-f5f8-466e-aff9-25556b57fe6a') {
			var apiUrl = switchConstants.apiBaseUrl + "/MinHomeAutomation/phpapi/user.php/v1/beacon";
			$.ajax({
				url: apiUrl,
				type: "GET",
				sendStatus: status,
				success: function (result, xhr, settings) {
					result = JSON.parse(result)[0];
					if (document.getElementById('alertProfile').classList.contains("d-none")) {
						document.getElementById('alertProfile').classList.remove("d-none");
						var greetUser = '<span> Welcome :: ' + result.shadow.name + '</span>';
						$('#profileInfo').html(greetUser);
						document.getElementById('alertLight').classList.add("alert-warning");
						$('#profileLight').html('<span>Your lighting preferences is set to Red</span>')

					}
					if (document.getElementById('alertAdd').classList.contains("d-none")) {
						document.getElementById('alertAdd').classList.remove("d-none");
						var userAdd = '<span> Current Address:: ' + result.shadow.location.formatted_address + '</span>';
						$('#profileAdd').html(userAdd);
					}
				},
				error: function (error) {
					console.log("Peters mobile network is not available, so also the API is not available!");
				}
			}, this);
		}
	}
})

pubnub.subscribe({
	channels: ['device-notify']
});