import Adapt from 'core/js/adapt';
import InlineFeedbackView from './inline-feedbackView';
import PopupFeedbackView from './popup-feedbackView';

class EnhancedQuestion extends Backbone.Controller {

  initialize() {
    this.listenToOnce(Adapt, 'app:dataReady', this.onDataReady);

    this.popupView = null;
    this.isPopupOpen = false;
  }

  onDataReady() {
    this.setupListeners();
  }

  setupListeners() {
    this.listenTo(Adapt, 'componentView:postRender', this.onQuestionReady);
    this.listenTo(Adapt, 'questionView:showFeedback questionView:disabledFeedback', this.onShowFeedback);
  }

  onShowFeedback(view) {
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

    // Check for icons
    if (view.model.get('_enhancedQuestion')._feedbackIcons._isEnabled) {
      // Correct
      if (view.model.get('_isCorrect')) {
        view.model.set('image', view.model.get('_enhancedQuestion')._feedbackIcons._correctIcon);
        view.model.set('alt', view.model.get('_enhancedQuestion')._feedbackIcons.correctAlt);
      // Partly correct
      } else if (view.model.get('_isAtLeastOneCorrectSelection')) {
        // Check attempts
        if (view.model.get('_attemptsLeft') === 0) {
          view.model.set('image', view.model.get('_enhancedQuestion')._feedbackIcons._partlyCorrectIcon);
          view.model.set('alt', view.model.get('_enhancedQuestion')._feedbackIcons.partlyCorrectAlt);
        } else {
          view.model.set('image', view.model.get('_enhancedQuestion')._feedbackIcons._partlyCorrectNotFinalIcon);
          view.model.set('alt', view.model.get('_enhancedQuestion')._feedbackIcons.partlyCorrectNotFinalAlt);
        }
      // Incorrect
      } else {
        // Check attempts
        if (view.model.get('_attemptsLeft') === 0) {
          view.model.set('image', view.model.get('_enhancedQuestion')._feedbackIcons._incorrectIcon);
          view.model.set('alt', view.model.get('_enhancedQuestion')._feedbackIcons.incorrectAlt);
        } else {
          view.model.set('image', view.model.get('_enhancedQuestion')._feedbackIcons._incorrectNotFinalIcon);
          view.model.set('alt', view.model.get('_enhancedQuestion')._feedbackIcons.incorrectNotFinalAlt);
        }
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
      view.model.set('feedbackTitle', view.model.get('feedbackTitle'));
    }

    // Check for graphic
    if (view.model.get('_enhancedQuestion')._graphic && view.model.get('_enhancedQuestion')._graphic._isEnabled) {
      // Correct
      if (view.model.get('_isCorrect')) {
        view.model.set('graphic', view.model.get('_enhancedQuestion')._graphic._correct);
        view.model.set('graphicAlt', view.model.get('_enhancedQuestion')._graphic.correctAlt);
      // Partly correct
      } else if (view.model.get('_isAtLeastOneCorrectSelection')) {
        // Check attempts
        if (view.model.get('_attemptsLeft') === 0) {
          view.model.set('graphic', view.model.get('_enhancedQuestion')._graphic._partlyCorrect);
          view.model.set('graphicAlt', view.model.get('_enhancedQuestion')._graphic.partlyCorrectAlt);
        } else {
          view.model.set('graphic', view.model.get('_enhancedQuestion')._graphic._partlyCorrectNotFinal);
          view.model.set('graphicAlt', view.model.get('_enhancedQuestion')._graphic.partlyCorrectNotFinalAlt);
        }
      // Incorrect
      } else {
        // Check attempts
        if (view.model.get('_attemptsLeft') === 0) {
          view.model.set('graphic', view.model.get('_enhancedQuestion')._graphic._incorrect);
          view.model.set('graphicAlt', view.model.get('_enhancedQuestion')._graphic.incorrectAlt);
        } else {
          view.model.set('graphic', view.model.get('_enhancedQuestion')._graphic._incorrectNotFinal);
          view.model.set('graphicAlt', view.model.get('_enhancedQuestion')._graphic.incorrectNotFinalAlt);
        }
      }
    }

    // Ensure 'Show feedback' button is displayed
    if (view.model.get('feedbackMessage') == "") {
      view.model.set('feedbackMessage', " ");
    }

    // Ensure 'Show feedback' button is displayed
    if (view.model.get('feedbackMessage') == "") {
      view.model.set('feedbackMessage', " ");
    }

    Adapt.trigger('audio:stopAllChannels');

    let classes = ' enhancedQuestion__popup';

    // Attach specific classes so that feedback can be styled.
    if (view.model.get('_isCorrect')) {
      classes = ' enhancedQuestion__popup correct';
    } else {
      if (view.model.has('_isAtLeastOneCorrectSelection')) {
        // Partially correct feedback is an option.
        classes = view.model.get('_isAtLeastOneCorrectSelection')
          ? ' enhancedQuestion__popup partially-correct'
          : ' enhancedQuestion__popup incorrect';
      } else {
        classes = ' enhancedQuestion__popup incorrect';
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

      Adapt.notify.popup({
        _view: this.popupView,
        _isCancellable: true,
        _showCloseButton: false,
        _closeOnBackdrop: true,
        _classes: view.model.get('_classes') + classes
      });
      this.listenToOnce(Adapt, 'popup:closed', this.onPopupClosed);
    }
  }

  onPopupClosed() {
    this.isPopupOpen = false;
  }

  removeInlineFeedbackView(model) {
    this.inlineFeedbackView.remove();
    $('.'+model.get('_id')).find('.inlineFeedback').remove();
  }

  onQuestionReady(view) {
    if (view.model.get('_enhancedQuestion') && view.model.get('_enhancedQuestion')._isEnabled) {
      $('.'+view.model.get('_id')).addClass('enhancedQuestion-enabled');
    }
  }
}

export default new EnhancedQuestion();
