# Pocketframe Tools for VS Code

[![VS Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/WilliamAsaba.pocketframe-tools?color=blue&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=WilliamAsaba.pocketframe-tools)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/WilliamAsaba.pocketframe-tools?color=violet)](https://marketplace.visualstudio.com/items?itemName=WilliamAsaba.pocketframe-tools)

![Pocketframe Tools Banner](/images/banner.png)

## ⚡ Features

| Feature                       | Description                                                         |
| ----------------------------- | ------------------------------------------------------------------- |
| 🎨 Syntax Highlighting         | Colorized templates, PHP blocks, and custom directives              |
| 💡 Intelligent Code Completion | Context-aware suggestions for routes, blocks, and framework helpers |
| 🚀 Snippets                    | `route`, `extends`, `yield`, `block`, `if` templates with tab stops            |
| 🔗 Go to Definition            | Jump to route definitions and template blocks (Ctrl+Click/ alt+Click)          |
| ✨ Formatting                  | Professional code formatting with customizable rules                |
| ⚙️ Commands                    | Integrated server control and framework utilities                   |

## 📦 Installation

### Visual Studio Code Marketplace
[![Install Now](https://img.shields.io/badge/VS_Marketplace-Install_Now-blue?logo=visual-studio-code&style=for-the-badge)](https://marketplace.visualstudio.com/items?itemName=WilliamAsaba.pocketframe-tools)

1. Open **Extensions** view (`Ctrl+Shift+X`)
2. Search for "Pocketframe Tools"
3. Click **Install**
4. Reload VS Code

## 🛠️ Usage

### Basic Template Example
```html
<%-- posts.view.php --%>
<% extends "layouts/app" %>

<% block title %>
  <%= $pageTitle %>
<% endblock %>

<% block content %>
  <div class="container">
    <% foreach ($posts as $post) %>
      <article class="post">
        <h2><%= $post->title %></h2>
        <a href="<%= route('posts.edit', ['id' => $post->id]) %>">Edit</a>
      </article>
    <% endforeach %>
  </div>
<% endblock %>
```

## ⌨️ Keyboard Shortcuts

| Command             | Shortcut       | Description                    |
| ------------------- | -------------- | ------------------------------ |
| Format Document     | `Shift+Alt+F`  | Reformat current file          |
| Show Commands       | `Ctrl+Shift+P` | Access Pocketframe commands    |
| Go to Definition    | `Ctrl+Click`   | Navigate to symbol definition  |
| Trigger Suggestions | `Ctrl+Space`   | Show context-aware completions |

## ⚙️ Configuration

Add to your VS Code settings (settings.json):

```json
{
  "pocketframe.format": {
    "indentSize": 4,
    "maxLineLength": 120,
    "wrapAttributes": true
  },
  "pocketframe.analysis": {
    "validateRoutes": true,
    "checkCSRFTokens": true
  }
}
```

## 🚧 Development

### Prerequisites
- Node.js 16+
- TypeScript 4.9+
- VS Code Extension Development Tools

### Build from Source
```bash
git clone https://github.com/Pocketframe/pocketframe-tools.git
cd pocketframe-tools
npm install
npm run compile
```

### Test in Development Host

- Press F5 to launch the extension debugger.
- Open a `.view.php` file in the test workspace.
- Test extension features.

## 🤝 Contributing

We welcome contributions! Follow these steps:

1. Fork the repository
2. Create a feature branch: git checkout -b feature/amazing-feature
3. Commit changes: git commit -m 'Add amazing feature'
4. Push to branch: git push origin feature/amazing-feature
5. Open a Pull Request

<!-- See our Contribution Guidelines for details. -->

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Maintained with ❤️ by the Pocketframe Team.

<!-- Documentation | Report Issue | Changelog -->
