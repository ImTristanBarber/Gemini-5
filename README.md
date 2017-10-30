# Gemini-5
A (very incomplete) Chrome extension that loads common versioned resources from the local disk to speed up page load.

On slower internet connections (dialup-like speeds) an initial pageload can take several seconds longer when it requests resources that haven't been cached yet. Some resources have several different versions (for instance, we support 47 versions of jQuery) which means slower page loads any time a website requests a version that isn't in the cache.

Even if a dialup customer had the highest speed theoretically possible, 56kbps/7KBps, visiting a site using jQuery would add 6 to 12 seconds to page load. Since it is completely unheard of for a dialup customer to get those speeds, you can assume it would take plenty longer.

## Supported Resources:
- jQuery (1.2.1 to 3.2.1)

### In the works:
- AngularJS
- Bootstrap
- FontAwesome
- Google Fonts
