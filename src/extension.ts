import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

let currentDoc: vscode.TextDocument;

export function activate(context: vscode.ExtensionContext) {
  const openSideTab = vscode.commands.registerCommand(
    "watchemmetcheatsheet.openToSide",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "emmetCheatSheet",
        "Emmet Cheat Sheet",
        vscode.ViewColumn.Beside,
        {}
      );
      const reset_path = panel.webview.asWebviewUri(vscode.Uri.file(
        path.join(context.extensionPath, "src", "normalize.css")
      ));
      const skeleton_css = panel.webview.asWebviewUri(vscode.Uri.file(
        path.join(context.extensionPath, "src", "skeleton.css")
      ));
      const style_css = panel.webview.asWebviewUri(
        vscode.Uri.file(
          path.join(context.extensionPath, "src", "style.css")
        )
      );
      const html = fs.readFileSync(
        path.join(context.extensionPath, "src", "emmetCheatsheet.html"),
        { encoding: "utf8" }
      ).split('\n')
      html.splice(5, 0, `<link rel="stylesheet" href="${reset_path}" />`);
      html.splice(6, 0, `<link rel="stylesheet" href="${skeleton_css}" />`);
      html.splice(6, 0, `<link rel="stylesheet" href="${style_css}" />`);      
      panel.webview.html = html.join('\n');
    }
  );
  context.subscriptions.push(openSideTab);
}

export function deactivate() {}

