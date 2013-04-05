/**
 * ==========================================
 *         Data Portal - Files View
 * ==========================================
 */
var app = window.app || (window.app = {});

(function($) {
	$(function() {
		app.View = app.View || {};

		/** HEADER */
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

		var Path = Backbone.View.extend({
			el: '#data-path',
			update: function() {
				this.$el.html(app.Collection.Files.path);
			}
		});
		app.View.Path = new Path();

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
		 			var i, item = new FileEl(el);
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
				this.id = el.get('_id');
				this.render(el);
			},
			render: function(el) {
				this.$el.html(el.get('fileName'));
			},
			events: {
				'click' : 'navigate'
			},
			navigate: function() {
				app.Router.navigate('file/' + this.id, {trigger: true});
			}
		});

		app.View.Files = new Files();
	});
}(jQuery));