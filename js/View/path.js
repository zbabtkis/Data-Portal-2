var app = window.app || (window.app = {});

(function($) {
	app.View = app.View || {};
	
	$(function() {
		var Path = Backbone.View.extend({
			el: '#data-path',
			update: function() {
				this.$el.html(app.Collection.Files.path);
			}
		});
		app.View.Path = new Path();
	});
}(jQuery))