var app = window.app || (window.app = {});

app.Model = app.Model || (app.Model = {});

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
