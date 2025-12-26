import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-c_cpp"; // base C/C++ mode

ace.define("ace/mode/codetalents_cpp", [
    "require",
    "exports",
    "module",
    "ace/mode/c_cpp_highlight_rules",
    "ace/mode/c_cpp",
    "ace/lib/oop"
], function(require, exports, module) {
    "use strict";

    const CppHighlightRules = require("ace/mode/c_cpp_highlight_rules").c_cppHighlightRules;
    const BaseCppMode = require("ace/mode/c_cpp").Mode;
    const oop = require("ace/lib/oop");

    // ---- Custom Highlight Rules ----
    class CustomCppHighlightRules extends CppHighlightRules {
        constructor() {
            super();

            // Add a rule to match function calls
            // This regex matches identifiers followed by '(' but not keywords
            this.$rules.start.unshift({
                token: "function",        // token name to style
                regex: "\\b(?!if|for|while|switch|return)\\w+(?=\\s*\\()"
            });
        }
    }

    // ---- Custom Mode ----
    const CustomCppMode = function() {
        BaseCppMode.call(this);
        this.HighlightRules = CustomCppHighlightRules;
    };
    oop.inherits(CustomCppMode, BaseCppMode);

    exports.Mode = CustomCppMode;
});
