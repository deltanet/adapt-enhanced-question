define([
  'core/js/adapt'
],function (Adapt) {

  var InlineFeedbackView = Backbone.View.extend({

    className: "inlineFeedback",

    initialize: function () {
      this.listenTo(Adapt, 'remove', this.remove);

      this.render();
    },

    render: function () {
      var data = this.model.toJSON();
      var template = Handlebars.templates["inline-feedback"];

      $(this.el).html(template(data)).insertAfter('.'+this.model.get('_id')+" > .component__inner > .btn__container");

      $('.'+this.model.get('_id')).addClass('inlineFeedback-enabled');

      if (!this.model.get('_canShowMarking')) return;

      if (this.model.get('_isSubmitted')) {
        $('.'+this.model.get('_id')).find('.js-btn-feedback').addClass('is-disabled').attr("disabled", "disabled");
      }

      // Change icon for partlyCorrect if it is being overidden
      if (!this.model.get('_isCorrect') && this.model.get('_isAtLeastOneCorrectSelection') && this.model.get('_enhancedQuestion')._overidePartlyCorrect._isEnabled) {
        $('.'+this.model.get('_id')).find('.js-btn-marking').removeClass('is-incorrect').addClass('is-correct');
      }
    }
  });

  return InlineFeedbackView;

});
