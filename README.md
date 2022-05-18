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

>**close** (string): This text becomes the close button text.  

>**_overidePartlyCorrect** (object):  This `_overidePartlyCorrect` attributes group stores the properties for when a question's score is changed if it is partly correct. It contains values for **_isEnabled**, and **_questionWeight**.  

>>**_isEnabled** (boolean): If `enabled`, the partly correct score will be changed.  

>>**_questionWeight** (number): Defines the new question weight for a partly correct answer.  

>**_feedbackIcons** (object):  This `_feedbackIcons` attributes group stores the properties for when an image is added to the feedback. It contains values for **_isEnabled**, **_correctIcon**, **correctAlt**, **_partlyCorrectNotFinalIcon**, **partlyCorrectNotFinalAlt**, **_partlyCorrectIcon**, **partlyCorrectAlt**, **_incorrectNotFinalIcon**, **incorrectNotFinalAlt**, **_incorrectIcon**, and **incorrectAlt**.  

>>**_isEnabled** (boolean): If `enabled`, the specified image will be shown with the relevant feedback.  

>>**_correctIcon** (string): File name (including path) of the image for the correct feedback. Path should be relative to the *src* folder.  

>>**correctAlt** (string): This text becomes the correct feedback image’s `alt` attribute.  

>>**_partlyCorrectNotFinalIcon** (string): File name (including path) of the image for the partly correct feedback when there are attempts remaining. Path should be relative to the *src* folder.  

>>**partlyCorrectNotFinalAlt** (string): This text becomes the partly correct feedback image’s `alt` attribute when there are attempts remaining.  

>>**_partlyCorrectIcon** (string): File name (including path) of the image for the partly correct feedback. Path should be relative to the *src* folder.  

>>**partlyCorrectAlt** (string): This text becomes the partly correct feedback image’s `alt` attribute.  

>>**_incorrectNotFinalIcon** (string): File name (including path) of the image for the incorrect feedback when there are attempts remaining. Path should be relative to the *src* folder.  

>>**incorrectNotFinalAlt** (string): This text becomes the incorrect feedback image’s `alt` attribute when there are attempts remaining.  

>>**_incorrectIcon** (string): File name (including path) of the image for the incorrect feedback. Path should be relative to the *src* folder.  

>>**incorrectAlt** (string): This text becomes the incorrect feedback image’s `alt` attribute.  

>**_inlineFeedback** (object):  This `_inlineFeedback` attributes group stores the properties for when feedback is displayed inline instead of in the notify popup. It contains values for **_isEnabled**.  

>>**_isEnabled** (boolean): If `enabled`, the feedback will be displayed below the question.  

>**_feedbackTitle** (object):  This `_feedbackTitle` attributes group stores the properties for the titles in the feedback. It contains values for **_isEnabled**, **correct**, **partlyCorrectNotFinal**, **partlyCorrect**, **incorrectNotFinal**, and **incorrect**.  

>>**_isEnabled** (boolean): If `enabled`, the specified title will replace the default feedback title.  

>>**correct** (string): This text becomes the new title for correct feedback.  

>>**partlyCorrectNotFinal** (string):  This text becomes the title when the question is partly correct but there are attempts remaining.  

>>**partlyCorrect** (string): This text becomes the new title for partlyCorrect feedback.  

>>**incorrectNotFinal** (string):  This text becomes the title when the question is incorrect but there are attempts remaining.  

>>**incorrect** (string): This text becomes the new title for incorrect feedback.  

>**_graphic** (object):  This `_graphic` attributes group stores the properties for when an image is added to the feedback. It contains values for **_isEnabled**, **_correct**, **correctAlt**, **_partlyCorrectNotFinal**, **partlyCorrectNotFinalAlt**, **_partlyCorrect**, **partlyCorrectAlt**, **_incorrectNotFinal**, **incorrectNotFinalAlt**, **_incorrect**, and **incorrectAlt**.  

>>**_isEnabled** (boolean): If `enabled`, the specified image will be shown with the relevant feedback.  

>>**_correct** (string): File name (including path) of the image for the correct feedback. Path should be relative to the *src* folder.  

>>**correctAlt** (string): This text becomes the correct feedback image’s `alt` attribute.  

>>**_partlyCorrectNotFinal** (string): File name (including path) of the image for the partly correct feedback when there are attempts remaining. Path should be relative to the *src* folder.  

>>**partlyCorrectNotFinalAlt** (string): This text becomes the partly correct feedback image’s `alt` attribute when there are attempts remaining.  

>>**_partlyCorrect** (string): File name (including path) of the image for the partly correct feedback. Path should be relative to the *src* folder.  

>>**partlyCorrectAlt** (string): This text becomes the partly correct feedback image’s `alt` attribute.  

>>**_incorrectNotFinal** (string): File name (including path) of the image for the incorrect feedback when there are attempts remaining. Path should be relative to the *src* folder.  

>>**incorrectNotFinalAlt** (string): This text becomes the incorrect feedback image’s `alt` attribute when there are attempts remaining.  

>>**_incorrect** (string): File name (including path) of the image for the incorrect feedback. Path should be relative to the *src* folder.  

>>**incorrectAlt** (string): This text becomes the incorrect feedback image’s `alt` attribute.  

## Limitations

This cannot be used when adapt-contrib-tutor is installed, as there are issues with adapt-contrib-trickle events, and multiple feedback popups will open.  

----------------------------
**Version number:**  4.1.1    
**Framework versions supported:**  5+    
**Author / maintainer:** DeltaNet with [contributors](https://github.com/deltanet/adapt-enhanced-question/graphs/contributors)     
**Accessibility support:** Yes  
**RTL support:** Yes     
**Authoring tool support:** Yes
