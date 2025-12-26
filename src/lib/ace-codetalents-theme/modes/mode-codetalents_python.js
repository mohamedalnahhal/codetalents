import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-python"; // base C/C++ mode

ace.define("ace/mode/codetalents_python", [
    "require",
    "exports",
    "module",
    "ace/mode/python"
], function(require, exports, module) {
    "use strict";

    const BasePythonMode = require("ace/mode/python").Mode;

    exports.Mode = BasePythonMode;
});
