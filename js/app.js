var app = window.app || (window.app = {});

(function() {
	var Router = Backbone.Router.extend({
		routes: {
			''        : 'index',
			'file/:f' : 'file'
		},
		index: function() {
			app.Collection.Files.fetch();
		},
		file: function(f) {
			app.Model.Page.set('dir', f);
		}
	});

	app.Router = new Router();

	Backbone.history.start();
}());