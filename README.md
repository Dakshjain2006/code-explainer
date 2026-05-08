# 🔍 CodeLens — AI-Powered Code Explainer

<div align="center">

**Paste any code snippet and get instant AI-powered explanations, bug detection, and optimization suggestions.**

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)
![Claude AI](https://img.shields.io/badge/Claude_AI-Powered-D97706?style=for-the-badge&logo=anthropic&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</div>

---

## ✨ Features

| Mode | Description |
|------|-------------|
| 📖 **Explain** | Step-by-step code walkthrough, complexity analysis, and key concept identification |
| 🐛 **Debug** | AI-powered bug detection, fix suggestions, and best-practice recommendations |
| ⚡ **Optimize** | Performance bottleneck analysis, optimization strategies, and improved code snippets |

### Additional Highlights

- 🌐 **17+ Languages** — Python, JavaScript, TypeScript, Java, C++, Go, Rust, and more
- 🎨 **Premium Dark UI** — Glassmorphism design with ambient animations
- ⌨️ **Code Editor** — Built-in editor with line numbers, tab support, and syntax-aware input
- 📦 **Snippet Library** — Quick-load examples (Binary Search, Fibonacci, Bubble Sort, Linked List)
- ⚡ **Keyboard Shortcut** — `Ctrl + Enter` to instantly analyze
- 🔒 **Secure** — API key stays on the server, never exposed to the client

---

## 📁 Project Structure

```
code-explainer/
├── public/
│   ├── index.html          # Main HTML page
│   ├── style.css           # Complete CSS design system
│   └── script.js           # Client-side JavaScript
├── server.js               # Express.js API proxy server
├── package.json            # Dependencies and scripts
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- An [Anthropic API key](https://console.anthropic.com/) (for Claude AI)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/code-explainer.git
cd code-explainer
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env
```

Open `.env` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
PORT=3000
```

### 4. Run the App

```bash
# Production
npm start

# Development (auto-restarts on file changes)
npm run dev
```

### 5. Open in Browser

Navigate to **[http://localhost:3000](http://localhost:3000)** 🎉

---

## 🖥️ Usage

1. **Paste your code** into the editor (or click a snippet button to load an example)
2. **Select the language** from the dropdown (or leave on "Auto Detect")
3. **Choose a mode**: Explain, Debug, or Optimize
4. **Click "Analyze Code"** (or press `Ctrl + Enter`)
5. View your **structured AI-generated results** in the output panel

---

## 🔧 Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key (required) | — |
| `PORT` | Server port number | `3000` |

---

## 🛡️ Security

- The Anthropic API key is stored **server-side only** in the `.env` file
- The `.env` file is excluded from Git via `.gitignore`
- The client never has direct access to the API key
- All API requests are proxied through the Express server

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **AI Engine** | Anthropic Claude API |
| **Fonts** | Inter, JetBrains Mono (Google Fonts) |
| **Design** | Dark Glassmorphism, CSS Animations |

---

## 📸 Screenshots

### Main Interface
> Dark-themed code editor with glass-morphism panels, line numbers, and ambient background orbs.

### Analysis Results
> Structured output with color-coded complexity badges, step-by-step walkthroughs, and tagged concepts.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Daksh Jain**

---

<div align="center">
  <sub>Built with ❤️ and Claude AI</sub>
</div>
