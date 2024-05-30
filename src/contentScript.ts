'use strict';

// ToDO: modify the title of the html to be a marquee and say VISITED-{title of website}
// If I get the message from the background script, I need to make the change to the pages title

(function () {
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    const { event } = obj;

    if (event === 'VISITED') {
      document.title = `VISITED-${document.title}`;
      // console.log('Title changed', `VISITED-${document.title}`);
    }
  });
})();
