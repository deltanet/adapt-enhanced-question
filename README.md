# adapt-enhanced-question

**Enhanced Question** is an *extension* for the [Adapt framework](https://github.com/adaptlearning/adapt_framework).   

This extension adds extra features to an adapt question. Features are inline feedback, hiding the Show feedback button if not required, adding icons for feedback and also the ability to overide the partlycorrect score with a new score.  

## Installation

This extension must be manually installed.

If **Enhanced Question** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).

## Settings Overview

**Enhanced Question** is configured at component (*components.json*) level.

The attributes listed below are properly formatted as JSON in [*example.json*](https://github.com/deltanet/adapt-enhanced-question/blob/master/example.json).  

### Attributes

The Enhanced Question attribute group contains values for **_isEnabled**, **_overidePartlyCorrect**, **_feedbackIcons**, **_inlineFeedback**, and **_feedbackTitle**.  

>**_isEnabled** (boolean):  Turns on and off the **Enhanced Question** extension. Can be set to disable **Enhanced Question** when not required.  

>**_overidePartlyCorrect** (object):  This `_overidePartlyCorrect` attributes group stores the properties for when a question's score is changed if it is partly correct. It contains values for **_isEnabled**, and **_questionWeight**.  

>>**_isEnabled** (boolean): If `enabled`, the partly correct score will be changed.  

>>**_questionWeight** (number): Defines the new question weight for a partly correct answer.  

>**_feedbackIcons** (object):  This `_feedbackIcons` attributes group stores the properties for when an image is added to the feedback. It contains values for **_isEnabled**, **_correctIcon**, **_partlyCorrectIcon**, and **_incorrectIcon**.  

>>**_isEnabled** (boolean): If `enabled`, the specified image will be shown with the relevant feedback.  

>>**_correctIcon** (string): File name (including path) of the image for the correct feedback. Path should be relative to the *src* folder.  

>>**_partlyCorrectIcon** (string): File name (including path) of the image for the partly correct feedback. Path should be relative to the *src* folder.  

>>**_incorrectIcon** (string): File name (including path) of the image for the incorrect feedback. Path should be relative to the *src* folder.  

>**_inlineFeedback** (object):  This `_inlineFeedback` attributes group stores the properties for when feedback is displayed inline instead of in the notify popup. It contains values for **_isEnabled**.  

>>**_isEnabled** (boolean): If `enabled`, the feedback will be displayed below the question.  

>**_feedbackTitle** (object):  This `_feedbackTitle` attributes group stores the properties for the titles in the feedback. It contains values for **_isEnabled**, **correct**, **incorrect**, and **partlyCorrect**.  

>>**_isEnabled** (boolean): If `enabled`, the specified title will replace the default feedback title.  

>>**correct** (string): This text becomes the new title for correct feedback.  

>>**incorrect** (string): This text becomes the new title for incorrect feedback.  

>>**partlyCorrect** (string): This text becomes the new title for partlyCorrect feedback.  

## Limitations

This cannot be used when adapt-contrib-tutor is installed, as there are issues with adapt-contrib-trickle events.  

----------------------------
**Version number:**  2.0.7     
**Framework versions supported:**  ^2.0.4    
**Author / maintainer:** DeltaNet with [contributors](https://github.com/deltanet/adapt-enhanced-question/graphs/contributors)     
**Accessibility support:** Yes  
**RTL support:** Yes     
**Authoring tool support:** Yes
