define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var InlineFeedbackView = Backbone.View.extend({

        className: "inline-feedback",

        initialize: function () {
            this.listenTo(Adapt, 'remove', this.remove);
            this.listenTo(Adapt, 'questionView:disabledFeedback', this.showFeedback);
            this.preRender();
            this.render();
        },

        events: {},

        preRender: function() {},

        render: function () {

            var data = this.model.toJSON();
            var template = Handlebars.templates["inline-feedback"];

            $(this.el).html(template(data)).appendTo('.component-inner');

            // Show feedback if question has been answered
            if($('.'+this.model.get('_id')).find('.component-widget').hasClass('submitted')) {
                this.showFeedback();
            }

        },

        showFeedback: function() {

            // Hide default icon
            $('.'+this.model.get('_id')).find('.buttons-cluster > .buttons-marking-icon').css('display','none');

            // Set feedback
            $('.'+this.model.get('_id')).find('.feedback-title').html(this.model.get('feedbackTitle')).a11y_text();
            $('.'+this.model.get('_id')).find('.feedback-message').html(this.model.get('feedbackMessage')).a11y_text();

            // Set appropriate icon
            if (this.model.get('_isCorrect')) {
                $('.'+this.model.get('_id')).find('.buttons-marking-icon').addClass('icon-tick');
            } else if (this.model.get('_isAtLeastOneCorrectSelection') && this.model.get('_enhancedQuestion')._overidePartlyCorrect._isEnabled) {
                $('.'+this.model.get('_id')).find('.buttons-marking-icon').addClass('icon-tick');
            } else {
                $('.'+this.model.get('_id')).find('.buttons-marking-icon').addClass('icon-cross');
            }
            
            // Show icon
            $('.'+this.model.get('_id')).find('.buttons-marking-icon').removeClass('display-none');

            // Show text
            $('.'+this.model.get('_id')).find('.feedback-title').removeClass('display-none');
            $('.'+this.model.get('_id')).find('.feedback-message').removeClass('display-none');
        }

    });
    
    return InlineFeedbackView;

});