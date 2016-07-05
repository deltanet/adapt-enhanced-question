define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var FeedbackHeaderView = Backbone.View.extend({

        className: "feedback-header",

        initialize: function () {
            this.listenTo(Adapt, 'remove', this.remove);
            this.preRender();
            this.render();
        },

        events: {},

        preRender: function() {},

        render: function () {

            var data = this.model.toJSON();
            var template = Handlebars.templates["feedback-header"];

            $(this.el).html(template(data)).prependTo('.notify-popup-content-inner');

            this.feedbackIcon = "";

            this.checkQuestion();

        },

        checkQuestion: function() {

            if (this.model.get('_isCorrect')) {
                this.feedbackIcon = this.model.get('_enhancedQuestion')._feedbackIcons._correctIcon;
            } else if (this.model.get('_isAtLeastOneCorrectSelection')) {
                this.feedbackIcon = this.model.get('_enhancedQuestion')._feedbackIcons._partlyCorrectIcon;
            } else {
                this.feedbackIcon = this.model.get('_enhancedQuestion')._feedbackIcons._incorrectIcon;
            }
            
            this.$('.feedback-icon img').attr('src', this.feedbackIcon);

            _.defer(function() {
                Adapt.trigger('device:resize');
            });

        }

    });
    
    return FeedbackHeaderView;

});