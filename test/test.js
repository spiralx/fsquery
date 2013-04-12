
var nodeunit = require('nodeunit'),
  fsquery = require("../lib/fsquery.js"),
  Selector = require("../lib/selector.js");


process.chdir("test/test_fs");

exports.selectors = nodeunit.testCase({

  "should convert backslashes on Windows": function(test) {
    test.deepEqual(new Selector("*.js").globs, [{ glob: "*.js", options: {} }]);
    test.deepEqual(new Selector(".\\*.js").globs, [{ glob: "./*.js", options: {} }]);
    test.done();
  },

  "should work with paths": function(test) {
    test.deepEqual(new Selector("./*.js").globs, [{ glob: "./*.js", options: {} }]);
    test.deepEqual(new Selector("/*.js").globs, [{ glob: "/*.js", options: {} }]);
    test.deepEqual(new Selector("foo/*.js").globs, [{ glob: "foo/*.js", options: {} }]);
    test.deepEqual(new Selector("../*.js").globs, [{ glob: "../*.js", options: {} }]);
    test.done();
  },

  "should find drive identifiers on Windows": function(test) {
    test.deepEqual(new Selector("c:\\*.js").globs, [
      { glob: "/*.js", options: { root: "C:\\" } }
    ]);
    test.deepEqual(new Selector("E:\\*.*").globs, [
      { glob: "/*.*", options: { root: "E:\\" } }
    ]);
    test.done();
  },

  "should work with multiple selectors": function(test) {
    test.deepEqual(new Selector("c:\\*.js;c:\\*.txt").globs, [
      { glob: "/*.js", options: { root: "C:\\" } },
      { glob: "/*.txt", options: { root: "C:\\" } }
    ]);
    test.deepEqual(new Selector("*.js;*.md;*.json").globs, [
      { glob: "*.js", options: {} },
      { glob: "*.md", options: {} },
      { glob: "*.json", options: {} }
    ]);
    test.done();
  }

});

/*
describe("parse_sub_selector", function() {
  it("should convert backslashes on Windows", function() {
    fsquery.parse_sub_selector("*.js").should.equal(["*.js", {}]);
    fsquery.parse_sub_selector(".\\*.js").should.equal(["./*.js", {}]);
  });
  it("should find drive identifiers on Windows", function() {
    fsquery.parse_sub_selector("c:\\*.js").should.equal(["/*.js", { root: "C:\\" }]);
  });
});
*/
