// src/ace-theme-custom.js
import ace from "ace-builds/src-noconflict/ace";

ace.define("ace/theme/codetalents", ["require", "exports", "module", "ace/lib/dom"], function(require, exports, module) {
  exports.isDark = true; // set to false for light theme
  exports.cssClass = "ace-codetalents";
  exports.cssText = `.ace-codetalents .ace_content {
  border-top: 0.5em solid var(--color-code-surface-1);
}
.ace-codetalents .ace_gutter .ace_gutter-layer {
  border-top: 0.5em solid var(--color-code-surface-2);
}
.ace-codetalents .ace_gutter {
  background: var(--color-code-surface-2);
  color: var(--color-code-gutter-text);
}
.ace-codetalents .ace_gutter {
  background: var(--color-code-surface-2);
  color: var(--color-code-gutter-text);
}
.ace-codetalents {
  background-color: var(--color-code-surface-1);
  color: #ddf8db;
}
.ace-codetalents .ace_entity.ace_other.ace_attribute-name {
  color: #ddf8db;
}
/*.ace-codetalents .ace_keyword,
.ace-codetalents .ace_identifier {
  color: #86dd4c;
  color: #9dd184;
  color: #b0a3d1;
}*/
.ace-codetalents .ace_punctuation,
.ace-codetalents .ace_string.ace_regexp {
  color: #59d0ac;
}
.ace-codetalents .ace_cursor {
  color: var(--color-primary);
}
.ace-codetalents .ace_marker-layer .ace_selection {
  background: color-mix(in oklab, var(--color-primary-s1) /* #acddb8 */ 20%, transparent);
}
.ace-codetalents .ace_string {
  color: #dbf084;
}
.ace-codetalents .ace_type,
.ace-codetalents .ace_modifier {
  /* color: #9dd184; */
  color: #77e891;
}
.ace-codetalents .ace_keyword  {
  /* color: #8fcf9f; */
  color: #77e891;
}
.ace-codetalents .ace_numeric {
  color: #d3b068;
}
.ace-codetalents .ace_comment {
  color: #5a7765;
}
.ace-codetalents .ace_function {
  /* color: #7bc1e7; */
  color: #6bbeeb;
}
.ace-codetalents .ace_variable {
  color: #b0a3d1;
}
.ace-codetalents .ace_marker-layer .ace_bracket {
  margin: -1px 0 0 -1px;
  border: 1px solid #6da76d;
}
/*.ace-codetalents .ace_control {
  color: #8fcdff;
}*/
.ace-codetalents .ace_scrollbar-v,
.ace-codetalents .ace_scrollbar-h {
  scrollbar-color: var(--color-primary-trans) transparent;
}
.ace_dark.ace_editor.ace_autocomplete {
  border: 1px #274b31 solid !important;
  box-shadow: 0px 0px 4px 4px rgb(0 30 2 / 51%) !important;
  background: var(--color-code-surface-1) !important;
  color: #76b083 !important;
  border-radius: 0.25rem;
}
.ace_dark.ace_editor.ace_autocomplete .ace_completion-highlight {
  color: #b7e7c2 !important;
  font-weight: bold;
}
.ace_line-hover {
  border-color: var(--color-primary) !important;
}
`;

  const dom = require("ace/lib/dom");
  dom.importCssString(exports.cssText, exports.cssClass);
});
