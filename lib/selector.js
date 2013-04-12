"use strict";

/**
 * selector.js
 *
 */

var
  glob = require("glob"),
  _ = require("underscore"),

  platform = process.platform;

var selector_options = {

}

module.exports = Selector;
function Selector(query) {
  this.query = query;

  this.globs = _.map(query.split(";"), function(b) {
    var res = parse_sub_selector(b);
    //opt = _.extend(glob_options, opt);
    //console.log("== ", res.glob);
    //console.dir(res.options);

    return res;
  });
}
Selector.prototype = {

  run: function(wd, options) {
    var gf = _.partial(run_glob, wd);
    var glob_results = _.map(this.globs, gf);
  }

}


var default_glob_options = {
  nocase: process.platform == "win32"
}

function run_glob(wd, glob) {
  var options = _.extend(default_glob_options, glob.options);

  return _.map(glob(glob.glob, options), function(filename) {
    return path.resolve(filename);
  });
}


function parse_sub_selector(selector) {
  var glob = selector, options = {};

  if (platform == "win32") {
    glob = glob.replace(/\\/g, "/");
    glob = glob.replace(/^([a-z]):\//i, function(all, drive) {
      options.root = drive.toUpperCase() + ":\\";
      return "/";
    });
  }

  return { glob: glob, options: options};
}

