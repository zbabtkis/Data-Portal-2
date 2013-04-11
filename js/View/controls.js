var app = window.app || (window.app = {});

(function($) {
	$(function() {
		app.View = app.View || {};
		
		var FullScreen = Backbone.View.extend({
			el: '#toggle-screen',
			events: {
				'click': 'toggle'
			},
			toggle: function() {
				this.$el.toggleClass('full-screen');
				$('#cec-data').toggleClass('data-portal-overlay');
			}
		});
		app.View.FullScreen = new FullScreen();

		var ControlBack = Backbone.View.extend({
			el: '.cec-button.back',
			events: {
				'click' : 'goBack'
			},
			goBack: function() {
				var pid = app.Collection.Files.pid;
				if(pid) {
					app.Router.navigate('file/' + pid, {trigger: true})
				} else {
					app.Router.navigate('', {trigger: true});
				}
			}
		});
		app.View.ControlBack = new ControlBack();
	});
}(jQuery));