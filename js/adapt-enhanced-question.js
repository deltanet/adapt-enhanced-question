define([
    'coreJS/adapt',
    './inline-feedbackView'
],function(Adapt, InlineFeedbackView) {

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

        if (view.model.get('_enhancedQuestion') && view.model.get('_enhancedQuestion')._isEnabled && view.model.get('_canShowFeedback')) {

            // Partly correct feature
            if (view.model.get('_enhancedQuestion')._overidePartlyCorrect._isEnabled && view.model.get('_isAtLeastOneCorrectSelection') && !view.model.get('_isCorrect')) {
                view.model.set('_score', view.model.get('_enhancedQuestion')._overidePartlyCorrect._questionWeight);
            }

            // Set alert title
            var feedbackTitle = "";

            /// Feedback title
            if (view.model.get('_enhancedQuestion')._feedbackTitle._isEnabled) {
                // Correct
                if (view.model.get('_isCorrect')) {
                    feedbackTitle = view.model.get('_enhancedQuestion')._feedbackTitle.correct;
                // Partly correct
                } else if (view.model.get('_isAtLeastOneCorrectSelection')) {
                    feedbackTitle = view.model.get('_enhancedQuestion')._feedbackTitle.partlyCorrect;
                    // Incorrect
                } else {
                    feedbackTitle = view.model.get('_enhancedQuestion')._feedbackTitle.incorrect;
                }

            } else {
                feedbackTitle = view.model.get("feedbackTitle");
            }

            // Check for feedback icon
            if (view.model.get('_enhancedQuestion')._feedbackIcons._isEnabled) {

                var feedbackIconTitle = "";

                if (view.model.get('_isCorrect')) {
                    feedbackIconTitle = "<div class=feedback-icon><img src='"+view.model.get('_enhancedQuestion')._feedbackIcons._correctIcon+"'/></div>"+feedbackTitle;
                } else if (view.model.get('_isAtLeastOneCorrectSelection')) {
                    feedbackIconTitle = "<div class=feedback-icon><img src='"+view.model.get('_enhancedQuestion')._feedbackIcons._partlyCorrectIcon+"'/></div>"+feedbackTitle;
                } else {
                    feedbackIconTitle = "<div class=feedback-icon><img src='"+view.model.get('_enhancedQuestion')._feedbackIcons._incorrectIcon+"'/></div>"+feedbackTitle;
                }

                feedbackTitle = feedbackIconTitle;
            }

            // Set up new notify object
            var alertObject = {
                title: feedbackTitle,
                body: view.model.get("feedbackMessage")
            };

            if (view.model.has('_isCorrect')) {
                // Attach specific classes so that feedback can be styled.
                if (view.model.get('_isCorrect')) {
                    alertObject._classes = 'correct';
                } else {
                    if (view.model.has('_isAtLeastOneCorrectSelection')) {
                        // Partially correct feedback is an option.
                        alertObject._classes = view.model.get('_isAtLeastOneCorrectSelection')
                            ? 'partially-correct'
                            : 'incorrect';
                    } else {
                        alertObject._classes = 'incorrect';
                    }
                }
            }

            Adapt.trigger('notify:popup', alertObject);

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
