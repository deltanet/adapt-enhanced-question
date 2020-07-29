define([
    'core/js/adapt',
    './inline-feedbackView',
    './popup-feedbackView'
],function(Adapt, InlineFeedbackView, PopupFeedbackView) {

  var EnhancedQuestion = _.extend({

    initialize: function() {
      this.listenToOnce(Adapt, "app:dataReady", this.onDataReady);

      this.popupView = null;
      this.isPopupOpen = false;
    },

    onDataReady: function() {
      this.setupListeners();
    },

    setupListeners: function() {
      this.listenTo(Adapt, "componentView:postRender", this.onQuestionReady);
      this.listenTo(Adapt, "questionView:showFeedback questionView:disabledFeedback", this.onShowFeedback);
    },

    onShowFeedback: function(view) {
      if (!view.model.get('_enhancedQuestion') || !view.model.get('_enhancedQuestion')._isEnabled) return;

      if (view.model.get('_isCorrect')) {
        if (!view.model.get('_feedback').correct && !view.model.get('_enhancedQuestion')._feedbackTitle.correct) return;
      } else if (view.model.get('_isAtLeastOneCorrectSelection')) {
        // Check attempts
        if (view.model.get('_attemptsLeft') === 0) {
          if (!view.model.get('_feedback')._partlyCorrect.final && !view.model.get('_enhancedQuestion')._feedbackTitle.partlyCorrect) return;
        } else {
          if (!view.model.get('_feedback')._partlyCorrect.notFinal && !view.model.get('_enhancedQuestion')._feedbackTitle.partlyCorrectNotFinal) return;
        }
      } else {
        // Check attempts
        if (view.model.get('_attemptsLeft') === 0) {
          if (!view.model.get('_feedback')._incorrect.final && !view.model.get('_enhancedQuestion')._feedbackTitle.incorrect) return;
        } else {
          if (!view.model.get('_feedback')._incorrect.notFinal && !view.model.get('_enhancedQuestion')._feedbackTitle.incorrectNotFinal) return;
        }
      }

      // Partly correct score change
      if (view.model.get('_enhancedQuestion')._overidePartlyCorrect._isEnabled && view.model.get('_isAtLeastOneCorrectSelection') && !view.model.get('_isCorrect')) {
        view.model.set('_score', view.model.get('_enhancedQuestion')._overidePartlyCorrect._questionWeight);
        view.model.set('_isCorrect', true);

        $('.'+view.model.get('_id')).find('.buttons-marking-icon').removeClass('icon-cross');
        $('.'+view.model.get('_id')).find('.buttons-marking-icon').addClass('icon-tick');
      }

      if (!view.model.get('_canShowFeedback') || this.isPopupOpen) return;

      // Check for image
      if (view.model.get('_enhancedQuestion')._feedbackIcons._isEnabled) {
        if (view.model.get('_isCorrect')) {
          view.model.set('image', view.model.get('_enhancedQuestion')._feedbackIcons._correctIcon);
          view.model.set('alt', view.model.get('_enhancedQuestion')._feedbackIcons.correctAlt);

        } else if (view.model.get('_isAtLeastOneCorrectSelection')) {
          view.model.set('image', view.model.get('_enhancedQuestion')._feedbackIcons._partlyCorrectIcon);
          view.model.set('alt', view.model.get('_enhancedQuestion')._feedbackIcons.partlyCorrectAlt);

        } else {
          view.model.set('image', view.model.get('_enhancedQuestion')._feedbackIcons._incorrectIcon);
          view.model.set('alt', view.model.get('_enhancedQuestion')._feedbackIcons.incorrectAlt);
        }
      }

      // Check for title
      if (view.model.get('_enhancedQuestion')._feedbackTitle._isEnabled) {
        // Correct
        if (view.model.get('_isCorrect')) {
          view.model.set('feedbackTitle', view.model.get('_enhancedQuestion')._feedbackTitle.correct);
        // Partly correct
        } else if (view.model.get('_isAtLeastOneCorrectSelection')) {
          // Check attempts
          if (view.model.get('_attemptsLeft') === 0) {
            view.model.set('feedbackTitle', view.model.get('_enhancedQuestion')._feedbackTitle.partlyCorrect);
          } else {
            view.model.set('feedbackTitle', view.model.get('_enhancedQuestion')._feedbackTitle.partlyCorrectNotFinal);
          }
        // Incorrect
        } else {
          // Check attempts
          if (view.model.get('_attemptsLeft') === 0) {
            view.model.set('feedbackTitle', view.model.get('_enhancedQuestion')._feedbackTitle.incorrect);
          } else {
            view.model.set('feedbackTitle', view.model.get('_enhancedQuestion')._feedbackTitle.incorrectNotFinal);
          }
        }
      } else {
        view.model.set('feedbackTitle', view.model.get("feedbackTitle"));
      }

      Adapt.trigger('audio:stopAllChannels');

      var classes = ' enhancedQuestion-popup';

      // Attach specific classes so that feedback can be styled.
      if (view.model.get('_isCorrect')) {
        classes = ' enhancedQuestion-popup correct';
      } else {
        if (view.model.has('_isAtLeastOneCorrectSelection')) {
          // Partially correct feedback is an option.
          classes = view.model.get('_isAtLeastOneCorrectSelection')
            ? ' enhancedQuestion-popup partially-correct'
            : ' enhancedQuestion-popup incorrect';
        } else {
          classes = ' enhancedQuestion-popup incorrect';
        }
      }

      if (view.model.get('_enhancedQuestion')._inlineFeedback._isEnabled) {
        this.inlineFeedbackView = new InlineFeedbackView({model:view.model});
        this.listenToOnce(view.model, 'change:_isSubmitted', this.removeInlineFeedbackView, this);

      } else {
        this.isPopupOpen = true;

        this.popupView = new PopupFeedbackView({
            model: view.model
        });

        Adapt.trigger("notify:popup", {
            _view: this.popupView,
            _isCancellable: true,
            _showCloseButton: false,
            _closeOnBackdrop: true,
            _classes: classes
        });
        this.listenToOnce(Adapt, 'popup:closed', this.onPopupClosed);
      }
    },

    onPopupClosed: function() {
      this.isPopupOpen = false;
    },

    removeInlineFeedbackView: function(model) {
      this.inlineFeedbackView.remove();
      $('.'+model.get('_id')).find('.inline-feedback').remove();
    },

    onQuestionReady: function(view) {
      if (view.model.get('_enhancedQuestion') && view.model.get('_enhancedQuestion')._isEnabled) {
        // Add class to component
        $('.'+view.model.get('_id')).addClass('enhanced-question-enabled');
      }
    }

  }, Backbone.Events);

    EnhancedQuestion.initialize();

    return EnhancedQuestion;

});
