/**
 * ==========================================
 *       Data Portal - Files Model
 * ==========================================
 */

var app = window.app || (window.app = {});

(function() {
	app.Collection = {};
	app.Model      = {};

	var Page = Backbone.Model.extend({
		defaults: {
			page  : 0,
			count : 30,
			dir   : 0,
		},
		initialize: function() {
			this.on('change:dir', this.reset);
		},
		reset: function() {
			this.attributes.page = 0;
		},
		next: function() {
			var limit = this.get('page') + this.get('count');

			this.set('page', limit);
		}
	});
	app.Model.Page = new Page();

	var File = Backbone.Model.extend({
		url: '/data/portal/files',
		idAttribute: '_id',
		parse: function(response) {
		    response._id = response._id['$id'];

		    return response;
		}
	});

	var Files = Backbone.Collection.extend({
		model: File,
	 	url: '/data/portal/files',
	 	initialize: function() {
	 		this.listenTo(app.Model.Page, 'change:dir', this.reset)
	 		this.listenTo(app.Model.Page, 'change', this.load);
	 	},
	 	parse: function(response) {
	 		this.pid = response.pid['$id'];
	 		this.path = response.path;
	 		response = response.results;

	 		return response.concat(this.models);
	 	},
		load: function() {
			this.fetch({
		 		data: {
		 			'id'    : app.Model.Page.get('dir'),
		 			'page'  : app.Model.Page.get('page'),
		 			'count' : app.Model.Page.get('count')
		 		},
		 	});
		}
	});
	app.Collection.Files = new Files();
}());