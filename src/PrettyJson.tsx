/* eslint react/self-closing-comp: 0 */
import React from "react";

// http://stackoverflow.com/a/7220510
function jsonToHtml(json: any, colorize = true) {
  if (typeof json !== "string") {
    json = JSON.stringify(json, undefined, 2);
  }

  if (!json) {
    return "";
  }

  if (!colorize) {
    return json;
  }

  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\\-]?\d+)?)/g,
    function(match: any) {
      let cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

interface IPrettyJsonProps {
  data: any;
}

export const PrettyJson: React.FC<IPrettyJsonProps> = ({ data }) => {
  const html = { __html: jsonToHtml(data) };

  return <pre dangerouslySetInnerHTML={html}></pre>;
};