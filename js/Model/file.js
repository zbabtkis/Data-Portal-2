/**
 * ==========================================
 *       Data Portal - Files Model
 * ==========================================
 */

var app = window.app || (window.app = {});

app.Collection = app.Collection || (app.Collection = {}),
app.Model      = app.Model || (app.Model = {});

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
 		var pid = response.pid;
 		this.pid = response.pid['$id'];
 		this.path = response.path;
 		response = response.results;
 		if(pid != -1) {
 			console.log(app.Model.Page.get('dir'));
 			return response.concat(this.models);
 		} else {
 			return response;
 		}
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