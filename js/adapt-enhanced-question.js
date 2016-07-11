define([
    'coreJS/adapt',
    './inline-feedbackView',
    './feedback-headerView'
],function(Adapt, InlineFeedbackView, FeedbackHeaderView) {

  var EnhancedQuestion = _.extend({

    initialize: function() {
        this.listenToOnce(Adapt, "app:dataReady", this.onDataReady);
    },

    onDataReady: function() {
        this.setupEventListeners();
    },

    setupEventListeners: function() {
        this.listenTo(Adapt, "componentView:postRender", this.onQuestionReady);
        this.listenTo(Adapt, "questionView:showFeedback", this.onShowFeedback);
        this.listenTo(Adapt, "questionView:disabledFeedback", this.onShowFeedback);
    },

    onShowFeedback: function(view) {

        if (view.model.get('_enhancedQuestion') && view.model.get('_enhancedQuestion')._isEnabled) {

            // Partly correct feature
            if (view.model.get('_enhancedQuestion')._overidePartlyCorrect._isEnabled && view.model.get('_isAtLeastOneCorrectSelection') && !view.model.get('_isCorrect')) {
                view.model.set('_score', view.model.get('_enhancedQuestion')._overidePartlyCorrect._questionWeight);
            }

            /// Feedback icon
            if (view.model.get('_enhancedQuestion')._feedbackIcons._isEnabled) {
                new FeedbackHeaderView({model:view.model});
            }

            /// Feedback title
            if (view.model.get('_enhancedQuestion')._feedbackTitle._isEnabled) {
                // Correct
                if (view.model.get('_isCorrect')) {
                    $('.notify').find('.notify-popup-title-inner').html(view.model.get('_enhancedQuestion')._feedbackTitle.correct);
                // Partly correct
                } else if (view.model.get('_isAtLeastOneCorrectSelection')) {
                    $('.notify').find('.notify-popup-title-inner').html(view.model.get('_enhancedQuestion')._feedbackTitle.partlyCorrect);
                    // Incorrect
                } else {
                    $('.notify').find('.notify-popup-title-inner').html(view.model.get('_enhancedQuestion')._feedbackTitle.incorrect);
                }
            }
        }
    },

    onQuestionReady: function(view) {

        if (view.model.get('_enhancedQuestion') && view.model.get('_enhancedQuestion')._isEnabled) {

            // Add class to component
            $('.'+view.model.get('_id')).addClass('enhanced-question-enabled');

            // Hide feedback button
            if (view.model.get('_enhancedQuestion')._hideFeedbackButton._isEnabled) {
                $('.'+view.model.get('_id')).find('.buttons').addClass('feedback-button-removed');
            }

            /// Inline feedback
            if (view.model.get('_enhancedQuestion')._inlineFeedback._isEnabled) {
                new InlineFeedbackView({model:view.model});
            }

        }

    }

  }, Backbone.Events);

    EnhancedQuestion.initialize();

    return EnhancedQuestion;

})