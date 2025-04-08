const express = require("express");
const app = express();
const port = 3000;

// JSONボディパーサーを有効化
app.use(express.json());

// メモリ内のユーザーデータ（実際のプロジェクトではデータベースを使用します）
let users = [
  { id: 1, name: "山田太郎", email: "yamada@example.com" },
  { id: 2, name: "鈴木花子", email: "suzuki@example.com" },
];

// 基本的なルート
app.get("/", (req, res) => {
  res.json({ message: "MCPサーバーへようこそ！" });
});

// ユーザー一覧を取得
app.get("/api/users", (req, res) => {
  res.json(users);
});

// 特定のユーザーを取得
app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: "ユーザーが見つかりません" });
  }
  res.json(user);
});

// 新しいユーザーを作成
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "名前とメールアドレスは必須です" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// ユーザー情報を更新
app.put("/api/users/:id", (req, res) => {
  const { name, email } = req.body;
  const user = users.find((u) => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ message: "ユーザーが見つかりません" });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  res.json(user);
});

// ユーザーを削除
app.delete("/api/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (userIndex === -1) {
    return res.status(404).json({ message: "ユーザーが見つかりません" });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

// サーバー起動
app.listen(port, () => {
  console.log(`サーバーが起動しました: http://localhost:${port}`);
});
