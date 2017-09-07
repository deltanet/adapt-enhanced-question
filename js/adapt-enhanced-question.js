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
      // Partly correct score change
      if (view.model.get('_enhancedQuestion') && view.model.get('_enhancedQuestion')._isEnabled && view.model.get('_enhancedQuestion')._overidePartlyCorrect._isEnabled && view.model.get('_isAtLeastOneCorrectSelection') && !view.model.get('_isCorrect')) {

          view.model.set('_score', view.model.get('_enhancedQuestion')._overidePartlyCorrect._questionWeight);
          view.model.set('_isCorrect', true);

          $('.'+view.model.get('_id')).find('.buttons-marking-icon').removeClass('icon-cross');
          $('.'+view.model.get('_id')).find('.buttons-marking-icon').addClass('icon-tick');

      }
      // Custom notify elements
        if (view.model.get('_enhancedQuestion') && view.model.get('_enhancedQuestion')._isEnabled && view.model.get('_canShowFeedback')) {
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
                  // Check for image alt tag
                  if(view.model.get('_enhancedQuestion')._feedbackIcons.correctAlt && !view.model.get('_enhancedQuestion')._feedbackIcons.correctAlt == "") {
                    feedbackIconTitle = "<div class=feedback-icon><img aria-label='"+view.model.get('_enhancedQuestion')._feedbackIcons.correctAlt+"' tabindex='0' src='"+view.model.get('_enhancedQuestion')._feedbackIcons._correctIcon+"'/></div>"+feedbackTitle;
                  } else {
                    feedbackIconTitle = "<div class=feedback-icon><img class='a11y-ignore' aria-hidden='true' tabindex='-1' src='"+view.model.get('_enhancedQuestion')._feedbackIcons._correctIcon+"'/></div>"+feedbackTitle;
                  }
                } else if (view.model.get('_isAtLeastOneCorrectSelection')) {
                  // Check for image alt tag
                  if(view.model.get('_enhancedQuestion')._feedbackIcons.partlyCorrectAlt && !view.model.get('_enhancedQuestion')._feedbackIcons.partlyCorrectAlt == "") {
                    feedbackIconTitle = "<div class=feedback-icon><img aria-label='"+view.model.get('_enhancedQuestion')._feedbackIcons.partlyCorrectAlt+"' tabindex='0' src='"+view.model.get('_enhancedQuestion')._feedbackIcons._partlyCorrectIcon+"'/></div>"+feedbackTitle;
                  } else {
                    feedbackIconTitle = "<div class=feedback-icon><img class='a11y-ignore' aria-hidden='true' tabindex='-1' src='"+view.model.get('_enhancedQuestion')._feedbackIcons._partlyCorrectIcon+"'/></div>"+feedbackTitle;
                  }
                } else {
                  // Check for image alt tag
                  if(view.model.get('_enhancedQuestion')._feedbackIcons.incorrectAlt && !view.model.get('_enhancedQuestion')._feedbackIcons.incorrectAlt == "") {
                    feedbackIconTitle = "<div class=feedback-icon><img aria-label='"+view.model.get('_enhancedQuestion')._feedbackIcons.incorrectAlt+"' tabindex='0' src='"+view.model.get('_enhancedQuestion')._feedbackIcons._incorrectIcon+"'/></div>"+feedbackTitle;
                  } else {
                    feedbackIconTitle = "<div class=feedback-icon><img class='a11y-ignore' aria-hidden='true' tabindex='-1' src='"+view.model.get('_enhancedQuestion')._feedbackIcons._incorrectIcon+"'/></div>"+feedbackTitle;
                  }
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
