var execJQueryVersion, filter, getLocalJsFile, handler, localJqueryVersion, notInWhiteList, whiteLists;

var __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
};

localJqueryVersion = ["1.2.1", "1.2.2", "1.2.3", "1.2.4", "1.2.5", "1.2.6", "1.3.1", "1.3.2", "1.4.1", "1.4.2", "1.4.3", "1.4.4", "1.5.1", "1.5.2", "1.6.1", "1.6.2", "1.6.3", "1.6.4", "1.7.0", "1.7.1", "1.7.2", "1.8.0", "1.8.1", "1.8.2", "1.8.3", "1.9.0", "1.9.1", "1.10.0", "1.10.1", "1.10.2", "1.11.0", "1.11.1", "2.0.0", "2.0.1", "2.0.2", "2.0.3", "2.1.0", "2.1.1", "2.2.1", "2.2.2", "2.2.3", "2.2.4", "3.0.0", "3.1.0", "3.1.1", "3.2.0", "3.2.1"];

localBootstrapVersion = ["3.3.6", "3.3.7", "4.0.0-alpha-6", "4.0.0-beta", "4.0.0-beta-2"];

localFontawesomeVersion = ["3.1.1", "3.2.0", "3.2.1", "4.0.0", "4.0.1", "4.0.2", "4.0.3", "4.1.0", "4.2.0", "4.3.0", "4.4.0", "4.5.0", "4.6.0", "4.6.1", "4.6.2", "4.6.3", "4.7.0"]

filter = {
  urls: ["http://*/*.js", "https://*/*.js", "http://*/*.css", "https://*/*.css"]
};

whiteLists = ['g.alicdn.com'];

notInWhiteList = function(url) {
  var item, _i, _len;
  for (_i = 0, _len = whiteLists.length; _i < _len; _i++) {
    item = whiteLists[_i];
    if (url.indexOf(item) !== -1) {
      return false;
    }
  }
  return true;
};
handler = function(details) {
  var jQueryVersion, localCache;
  jQueryVersion = execJQueryVersion(details.url);
  if (jQueryVersion) {
    localCache = getLocalJsFile(jQueryVersion);
    if (localCache && notInWhiteList(details.url)) {
      return {
        redirectUrl: localCache
      };
    }
  }
};
/*
    get jquery version if url is a valid jquery
    @return {String} jquery version, empty if is not a valid jquery
*/
execJQueryVersion = function(originalURL) {
  var jQueryVersionRegex, matches;
  if (originalURL.toLowerCase().indexOf('jquery') > -1) {
    jQueryVersionRegex = /\d\.\d*\.\d/;
    matches = originalURL.match(jQueryVersionRegex);
    if ((matches != null ? matches.length : void 0) === 1) {
      return matches[0];
    }
  }
  return "";
};

/*
    get local jquery file by version
    @return {String} local js file, empty if not have one
*/


getLocalJsFile = function(version) {
  if (__indexOf.call(localJqueryVersion, version) >= 0) {
    return chrome.extension.getURL("files/jquery/jquery-" + version + ".min.js");
  }
  return "";
};

chrome.webRequest.onBeforeRequest.addListener(handler, filter, ["blocking"]);
