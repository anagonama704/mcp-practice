const express = require("express");
const app = express();
const port = 3000;

// JSONボディパーサーを有効化
app.use(express.json());

// 基本的なルート
app.get("/", (req, res) => {
  res.json({ message: "MCPサーバーへようこそ！" });
});

// サーバー起動
app.listen(port, () => {
  console.log(`サーバーが起動しました: http://localhost:${port}`);
});
