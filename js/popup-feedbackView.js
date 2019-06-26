define([
    'core/js/adapt'
], function(Adapt) {

    var PopupFeedbackView = Backbone.View.extend({

        className: "enhancedQuestion-popup",

        events: {
          'click .enhancedQuestion-popup-close': 'closePopup'
        },

        initialize: function() {
          this.render();
        },

        render: function() {
          var data = this.model.toJSON();
          var template = Handlebars.templates["popup-feedback"];
          this.$el.html(template(data));
        },

        closePopup: function (event) {
          Adapt.trigger('notify:close');
        }

    });

    return PopupFeedbackView;

});
