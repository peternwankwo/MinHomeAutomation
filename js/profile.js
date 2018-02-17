var pubnub = new PubNub({
				subscribeKey: 'sub-c-76e55540-4157-11e7-bc55-0619f8945a4f', // always required
				publishKey: 'pub-c-470fba28-bad4-46d5-9ae9-d3ac2828025b' // only required if publishing
			});

			pubnub.addListener({
				message: function(message) {
					 console.log(message);
				}
			})
			 
			pubnub.subscribe({ 
				channels: ['device-notify'] 
			});