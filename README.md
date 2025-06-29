# LLM Search Terms Extension 🔍

**LLM Search Terms Plugin** is a _free browser extension_ that captures and displays the search terms from ChatGPT conversations as they stream in.

**LLMs are starting to take market share from traditional search engines.** Next to ranking in traditional search engines, it becomes important to rank well in LLMs, like **ChatGPT**, **Perplexity**, **Gemini**, etc.

Therefore, it is important to know what search terms LLMs use to find information. This extension captures the search terms from ChatGPT conversations and displays them in a popup. This allows you to better understand the way **ChatGPT searches the web** and adjust your content accordingly.

A small popup will appear in the top right corner of the screen with the search terms ChatGPT used:
![Example](/assets/search-terms.png)

---

[![Built with Plasmo](https://img.shields.io/badge/Built%20with-Plasmo-6C47FF)](https://www.plasmo.com/)
[![Vue 3](https://img.shields.io/badge/Vue-3-4FC08D)](https://vuejs.org/)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- Chrome/Chromium-based browser

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/llm-search-terms-plugin.git
   cd llm-search-terms-plugin
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Build the extension**

   ```bash
   pnpm build
   ```

4. **Load in Chrome**
   - Navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `build/chrome-mv3-prod` directory

## 🛠️ Development

### Development Mode

Start the development server with hot reload:

```bash
pnpm dev
```

This creates a development build that automatically reloads when you make changes.

**Note:** When making changes to the Content Script, you need to remove the extension from Chrome, and then reload it.

### Building for Production

```bash
# Create production build
pnpm build

# Package for distribution
pnpm package
```

## 📖 Usage Guide

1. **Install the Extension**: Follow the installation steps above
2. **Visit ChatGPT**: Navigate to [chatgpt.com](https://chatgpt.com)
3. **Start a Conversation**: Begin chatting with ChatGPT as usual
4. **Access Captured Data**: As soon as the search terms are captured, they will be displayed in a popup
