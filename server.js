const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Nyan Cat Online</title>
            <style>
                body { text-align: center; font-family: monospace; background: linear-gradient(45deg, #1a1a2e, #16213e); color: white; }
                canvas { border: 3px solid #ff66cc; border-radius: 10px; background: #87CEEB; }
                .badge { background: #00ff88; color: black; padding: 5px 15px; border-radius: 20px; display: inline-block; margin: 10px; }
            </style>
        </head>
        <body>
            <h1>🌈 NYAN CAT ONLINE! 🌈</h1>
            <div class="badge">🟢 Сервер работает | Бесплатный хостинг</div>
            <canvas id="gameCanvas" width="800" height="250"></canvas>
            <div><p>🐱 ПРОБЕЛ/КЛИК — ПРЫЖОК</p></div>
            
            <script>
                const canvas = document.getElementById('gameCanvas');
                const ctx = canvas.getContext('2d');
                let playerY = 170;
                let velocity = 0;
                let score = 0;
                let gameRunning = true;
                
                document.addEventListener('keydown', (e) => {
                    if(e.code === 'Space') {
                        e.preventDefault();
                        if(playerY >= 170) velocity = -8;
                    }
                });
                
                canvas.addEventListener('click', () => {
                    if(playerY >= 170) velocity = -8;
                });
                
                function gameLoop() {
                    if(!gameRunning) return;
                    
                    velocity += 0.5;
                    playerY += velocity;
                    
                    if(playerY >= 170) { 
                        playerY = 170; 
                        velocity = 0; 
                    }
                    if(playerY < 0) playerY = 0;
                    
                    // Рисуем фон
                    ctx.fillStyle = '#87CEEB';
                    ctx.fillRect(0, 0, 800, 250);
                    ctx.fillStyle = '#8B4513';
                    ctx.fillRect(0, 200, 800, 50);
                    
                    // Рисуем Nyan Cat (упрощённая версия)
                    ctx.fillStyle = '#f9e2d0';
                    ctx.fillRect(70, playerY, 34, 28);
                    ctx.fillStyle = '#fcd5b0';
                    ctx.fillRect(90, playerY, 12, 12);
                    ctx.fillStyle = '#2e241f';
                    ctx.fillRect(93, playerY+4, 3, 3);
                    ctx.fillRect(100, playerY+4, 3, 3);
                    
                    // Радужный хвост
                    for(let i=0; i<3; i++) {
                        ctx.fillStyle = 'hsl(' + (Date.now()*5 + i*60) + ', 100%, 60%)';
                        ctx.fillRect(65 - i*3, playerY+10, 3, 8);
                    }
                    
                    // Счёт
                    score += 0.1;
                    ctx.fillStyle = 'black';
                    ctx.font = '20px monospace';
                    ctx.fillText('SCORE: ' + Math.floor(score), 20, 40);
                    
                    requestAnimationFrame(gameLoop);
                }
                
                gameLoop();
            </script>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Сервер работает на порту ' + PORT);
});
