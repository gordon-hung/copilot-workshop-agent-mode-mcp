# Copilot 專案指令

請以下列規則協助開發與維護此待辦清單 App。

## 技術限制

- 此專案是純前端專案，只使用 HTML、CSS 和原生 JavaScript。
- 禁止引入任何框架或套件。
- 不要建立 `package.json`。
- 不要執行 `npm install`。
- 不要引用外部 CDN，所有功能必須能離線運作。
- 檔案結構固定為根目錄的 `index.html`、`styles.css` 和 `app.js`。

## 程式風格

- 程式碼註解一律使用繁體中文。
- 變數與函式命名使用英文 camelCase。
- CSS 顏色一律使用 `:root` 定義的 CSS 變數，不要直接寫入色碼。
- JavaScript 一律使用 `const` 或 `let` 宣告變數，不要使用 `var`。
- 產生或更新 DOM 內容時使用 `textContent` 或 `createElement`，不要使用 `innerHTML` 組合字串。

## 協作方式

- 動手修改前，先條列說明預計修改哪些檔案，以及每個檔案要做的變動。
- 等使用者確認後，再開始實際修改。
- 一次只處理使用者明確要求的一件事，不要順手進行未要求的重構。
- 修改完成後，說明如何在瀏覽器中驗證功能。
