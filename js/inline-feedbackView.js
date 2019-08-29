define([
    'core/js/adapt'
],function(Adapt) {

    var InlineFeedbackView = Backbone.View.extend({

        className: "inline-feedback",

        initialize: function () {
          this.listenTo(Adapt, 'remove', this.remove);

          this.render();
        },

        render: function () {
          var data = this.model.toJSON();
          var template = Handlebars.templates["inline-feedback"];
          $(this.el).html(template(data)).appendTo('.'+this.model.get('_id')+">.component-inner");

          $('.'+this.model.get('_id')).addClass('inline-feedback-enabled');

          // Hide default icon
          $('.'+this.model.get('_id')).find('.buttons-cluster > .buttons-marking-icon').css('display','none');

          // Set appropriate icon
          if (this.model.get('_isCorrect')) {
            $('.'+this.model.get('_id')).find('.buttons-marking-icon').addClass('icon-tick');
          } else if (this.model.get('_isAtLeastOneCorrectSelection') && this.model.get('_enhancedQuestion')._overidePartlyCorrect._isEnabled) {
            $('.'+this.model.get('_id')).find('.buttons-marking-icon').addClass('icon-tick');
          } else {
            $('.'+this.model.get('_id')).find('.buttons-marking-icon').addClass('icon-cross');
          }
        }
    });

    return InlineFeedbackView;

});
