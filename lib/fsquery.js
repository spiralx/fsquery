/*jshint node: true */
"use strict";


var
  path = require("path"),
  _ = require("underscore"),

  Selector = require("./selector");



var fsquery = module.exports = function(selector, options) {
  if (!options) options = {};

  return new FSQuery(selector, options);
};

var default_options = {

}

fsquery.FSQuery = FSQuery;
function FSQuery(query, options) {
  if (!(this instanceof FSQuery)) {
    return new FSQuery(query, options);
  }

  this.options = _.extend(default_options, options || {});

  this._stack = [];
  this.context = process.cwd();

  this.selector = Selector(query);
}



FSQuery.fn = FSQuery.prototype = {

  update_context: function(items) {
    var ml = this.length,
      il = items.length;

    for (var i = 0; i < il; i++) {
      this[i] = items[i];
    }
    for (i = il; i < ml; i++) {
      delete this[i];
    }
  },

  push: function(items) {

  }

}

