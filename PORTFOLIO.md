![工作坊完成徽章](https://img.shields.io/badge/GitHub_Copilot_實戰工作坊-已完成-1F883D?style=for-the-badge&logo=githubcopilot&logoColor=white)


# 待辦清單 Web App

這是在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案以簡潔、可離線使用的純前端介面實作待辦事項的新增、完成、篩選與清除，並記錄使用者的待辦資料與介面偏好。

## 線上展示

- [開啟線上版本](https://<你的帳號>.github.io/<你的repo名稱>/)

## 功能

- 新增待辦事項；輸入空白內容時不建立項目。
- 勾選待辦事項，完成項目會顯示刪除線並降低透明度。
- 個別刪除待辦事項。
- 顯示目前未完成的待辦數量。
- 清單為空或篩選沒有結果時顯示對應提示文字。
- 支援「全部」「未完成」「已完成」三種篩選。
- 支援淺色與深色模式切換。
- 未手動設定主題時，依作業系統的 `prefers-color-scheme` 設定顯示主題。
- 記住深淺色偏好與待辦資料，重新整理後仍可保留。
- 一次清除所有已完成的待辦事項，執行前會顯示確認對話框。
- 介面支援桌面與手機螢幕尺寸。

## 技術

- 使用 HTML、CSS 與原生 JavaScript。
- 不使用框架、套件或外部 CDN，網頁可離線開啟。
- 使用 CSS 變數管理淺色與深色配色。
- 使用瀏覽器 `localStorage` 保存待辦事項與深淺色偏好。
- 根目錄主要由 `index.html`、`styles.css` 與 `app.js` 組成。

## 開發方式

本專案透過 GitHub Copilot 實戰工作坊進行開發與維護：

- 使用 GitHub Copilot Agent Mode 將需求分解為頁面結構、樣式與互動邏輯。
- 使用 MCP 工具讀取專案相關的 GitHub issue，以及 Microsoft Learn 官方文件。
- 使用 `.github/prompts/fix-issue.prompt.md` 建立依 issue 編號修正問題的 Agentic workflow。
- 修正 issue 時先建立分支、修改必要檔案、驗證結果，再提交、推送並建立 Pull Request。

## 我學到什麼

- 如何使用原生 HTML、CSS 與 JavaScript 建立完整的前端互動。
- 如何設計與維護淺色、深色主題及響應式介面。
- 如何使用 `localStorage` 保存瀏覽器端資料。
- 如何透過篩選與狀態判斷處理清單的顯示邏輯。
- 如何使用 GitHub Copilot、MCP 與自訂 Agent prompt 協助閱讀需求、修正問題並建立 Pull Request。
