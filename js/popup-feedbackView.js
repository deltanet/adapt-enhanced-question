define([
  'core/js/adapt'
], function (Adapt) {

  var PopupFeedbackView = Backbone.View.extend({

    className: "enhancedQuestion__popup",

    events: {
      'click .js-enhancedQuestion-close-btn-click': 'closePopup'
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
