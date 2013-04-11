/**
 * ==========================================
 *         Data Portal - Files View
 * ==========================================
 */
var app = window.app || (window.app = {});

(function($) {
	app.View = app.View || {};
	$(function() {
		var Files = Backbone.View.extend({
		 	el: "#cec-data-list",
		 	initialize: function() {
		 		_.bindAll(this);

		 		this.listenTo(app.Collection.Files, 'reset', this.render);
		 	},
		 	render: function() {
		 		var that = this;

		 		this.$el.html('');

		 		app.View.Path.update();

		 		app.Collection.Files.forEach(function(el) {
		 			var i, item = new FileEl({
		 				attributes: {
		 					'data-id': el.get('_id'),
		 					'data-path': el.get('path'),
		 				},
		 				value: el.get('fileName')
		 			});
		 			that.$el.append(item.$el);
		 		});
		 	},
		 	renderMore: function(e) {
		 		console.log()
				if($(e.target).scrollTop() + $(e.target).innerHeight()>=$(e.target)[0].scrollHeight) {
				    app.Model.Page.next();
				}
		 	},
		 	events: {
		 		'scroll' : 'renderMore'
		 	}
		});

		var FileEl = Backbone.View.extend({
			tagName: 'li',
			initialize: function(el) {
				_.bindAll(this);
				this.render(el.value);
			},
			render: function(v) {
				this.$el.html(v);
			},
			events: {
				'click' : 'navigate'
			},
			navigate: function() {
				app.Router.navigate('file/' + this.$el.data('id'), {trigger: true});
			}
		});
		app.View.Files = new Files();
	});
}(jQuery));