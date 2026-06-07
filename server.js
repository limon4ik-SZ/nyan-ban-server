const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <h1>🌈 NYAN CAT ONLINE! 🌈</h1>
        <p>Нажми <strong>пробел</strong> чтобы прыгать!</p>
        <canvas id="gameCanvas" width="800" height="250"></canvas>
        <script>
            // Твой код игры здесь
            console.log("Nyan Cat готов!");
        </script>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(\`Сервер работает на порту ${PORT}\`);
});
