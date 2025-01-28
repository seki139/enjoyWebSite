document
  .getElementById("contact-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // フォームのデフォルト動作をキャンセル

    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
      // サーバーへのPOSTリクエスト
      const response = await fetch("http://localhost:3000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });

      // サーバーからのレスポンス処理
      if (response.ok) {
        alert("お問い合わせが送信されました！");
      } else {
        alert("送信に失敗しました。再試行してください。");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
      alert("サーバーとの通信に失敗しました。");
    }
  });
