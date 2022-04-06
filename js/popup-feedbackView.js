import Adapt from 'core/js/adapt';

export default class PopupFeedbackView extends Backbone.View {

  className() {
    return 'enhancedQuestion__popup';
  }

  events() {
    return {
      'click .js-enhancedQuestion-close-btn-click': 'closePopup'
    };
  }

  initialize() {
    this.render();
  }

  render() {
    const data = this.model.toJSON();
    const template = Handlebars.templates["popup-feedback"];
    this.$el.html(template(data));
  }

  closePopup(event) {
    Adapt.trigger('notify:close');
  }
}
