var os = require('os'),
    fs = require('fs');

var ChromeBrowser = function(baseBrowserDecorator, args) {
  baseBrowserDecorator(this);

  var flags = args.flags || [];

  this._getOptions = function(url) {
    // Chrome CLI options
    // http://peter.sh/experiments/chromium-command-line-switches/
    return [
      '--user-data-dir=' + this._tempDir,
      '--no-default-browser-check',
      '--no-first-run',
      '--disable-default-apps',
      '--start-maximized'
    ].concat(flags, [url]);
  };
};

ChromeBrowser.prototype = {
  name: 'Chrome',

  DEFAULT_CMD: {
    linux: 'google-chrome',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    win32: windowsChromePath('\\Google\\Chrome\\Application\\chrome.exe')
  },
  ENV_CMD: 'CHROME_BIN'
};

ChromeBrowser.$inject = ['baseBrowserDecorator', 'args'];


var ChromeCanaryBrowser = function(baseBrowserDecorator, args) {
  ChromeBrowser.call(this, baseBrowserDecorator, args);

  var parentOptions = this._getOptions;
  this._getOptions = function(url) {
    // disable crankshaft optimizations, as it causes lot of memory leaks (as of Chrome 23.0)
    return parentOptions.call(this, url).concat(['--js-flags="--nocrankshaft --noopt"']);
  };
};

ChromeCanaryBrowser.prototype = {
  name: 'ChromeCanary',

  DEFAULT_CMD: {
    linux: 'google-chrome-canary',
    darwin: '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    win32: windowsChromePath('\\Google\\Chrome SxS\\Application\\chrome.exe')
  },
  ENV_CMD: 'CHROME_CANARY_BIN'
};

ChromeCanaryBrowser.$inject = ['baseBrowserDecorator', 'args'];

var windowsChromePath = function(chromeExe) {
	if (os.platform() !== 'win32') {
		return '';
  }

	var globalInstall = os.arch() === 'x64' ? process.env['ProgramFiles(x86)'] : process.env.ProgramFiles;

	if (fs.existsSync(globalInstall + chromeExe)) {
		return globalInstall + chromeExe;
  }

	return process.env.LOCALAPPDATA + chromeExe;
}

// PUBLISH DI MODULE
module.exports = {
  'launcher:Chrome': ['type', ChromeBrowser],
  'launcher:ChromeCanary': ['type', ChromeCanaryBrowser]
};
