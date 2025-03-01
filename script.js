document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('monsterCanvas');
    const ctx = canvas.getContext('2d');
    const heads = [];
    const torsos = [];
    const legs = [];
    let currentHead = 0;
    let currentTorso = 0;
    let currentLegs = 0;
    const numHeads = 6;
    const numTorsos = 6;
    const numLegs = 6;

    const colors = [
        '#FF6B6B',
        '#4ECDC4',
        '#FFD166',
        '#6A5ACD',
        '#50D890',
        '#FF9A76'
    ];

    function generateMonsterParts() {
        for (let i = 0; i < numHeads; i++) {
            heads.push({
                color: colors[i % colors.length],
                draw: function (ctx) {
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    switch (i % 6) {
                        case 0:
                            ctx.arc(200, 120, 70, 0, Math.PI * 2);
                            break;
                        case 1:
                            ctx.rect(140, 50, 120, 120);
                            break;
                        case 2:
                            ctx.moveTo(200, 50);
                            ctx.lineTo(270, 170);
                            ctx.lineTo(130, 170);
                            ctx.closePath();
                            break;
                        case 3:
                            ctx.ellipse(200, 120, 50, 80, 0, 0, Math.PI * 2);
                            break;
                        case 4:
                            ctx.moveTo(200, 50);
                            ctx.lineTo(260, 120);
                            ctx.lineTo(200, 190);
                            ctx.lineTo(140, 120);
                            ctx.closePath();
                            break;
                        case 5:
                            const x = 200;
                            const y = 120;
                            const width = 120;
                            ctx.moveTo(x, y + 25);
                            ctx.bezierCurveTo(x, y, x - width / 2, y - width / 2, x - width / 2, y);
                            ctx.bezierCurveTo(x - width / 2, y + width / 3, x, y + width / 2, x, y + width / 2);
                            ctx.bezierCurveTo(x, y + width / 2, x + width / 2, y + width / 3, x + width / 2, y);
                            ctx.bezierCurveTo(x + width / 2, y - width / 2, x, y, x, y + 25);
                            break;
                    }

                    ctx.fill();
                    ctx.fillStyle = 'white';
                    ctx.beginPath();
                    ctx.arc(170, 110, 15, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(230, 110, 15, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.fillStyle = 'black';
                    ctx.beginPath();
                    ctx.arc(170 + ((i % 3) - 1) * 5, 110, 7, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.arc(230 + ((i % 3) - 1) * 5, 110, 7, 0, Math.PI * 2);
                    ctx.fill();
                    if (i % 2 === 0) {
                        ctx.beginPath();
                        ctx.arc(200, 140, 30, 0.1 * Math.PI, 0.9 * Math.PI);
                        ctx.lineWidth = 3;
                        ctx.stroke();
                    } else {
                        ctx.beginPath();
                        ctx.arc(200, 150, 15, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.fillStyle = this.color;
                        ctx.beginPath();
                        ctx.arc(200, 150, 8, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            });
        }
        for (let i = 0; i < numTorsos; i++) {
            torsos.push({
                color: colors[(i + 2) % colors.length],
                draw: function (ctx) {
                    ctx.fillStyle = this.color;
                    switch (i % 6) {
                        case 0:
                            ctx.fillRect(150, 180, 100, 110);
                            break;
                        case 1:
                            ctx.beginPath();
                            ctx.ellipse(200, 230, 60, 70, 0, 0, Math.PI * 2);
                            ctx.fill();
                            break;
                        case 2:
                            ctx.beginPath();
                            ctx.moveTo(140, 180);
                            ctx.lineTo(260, 180);
                            ctx.lineTo(240, 290);
                            ctx.lineTo(160, 290);
                            ctx.closePath();
                            ctx.fill();
                            break;
                        case 3:
                            ctx.beginPath();
                            ctx.moveTo(150, 180);
                            ctx.lineTo(250, 180);
                            ctx.lineTo(220, 230);
                            ctx.lineTo(250, 290);
                            ctx.lineTo(150, 290);
                            ctx.lineTo(180, 230);
                            ctx.closePath();
                            ctx.fill();
                            break;
                        case 4:
                            ctx.beginPath();
                            ctx.ellipse(200, 230, 50, 60, 0, 0, Math.PI * 2);
                            ctx.fill();
                            break;
                        case 5:
                            ctx.beginPath();
                            ctx.moveTo(200, 180);
                            ctx.lineTo(250, 200);
                            ctx.lineTo(230, 290);
                            ctx.lineTo(170, 290);
                            ctx.lineTo(150, 200);
                            ctx.closePath();
                            ctx.fill();
                            break;
                    }
                    if (i % 3 === 0) {
                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                        ctx.lineWidth = 8;
                        for (let j = 0; j < 3; j++) {
                            ctx.beginPath();
                            ctx.moveTo(160, 200 + j * 30);
                            ctx.lineTo(240, 200 + j * 30);
                            ctx.stroke();
                        }
                    } else if (i % 3 === 1) {
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                        for (let j = 0; j < 5; j++) {
                            ctx.beginPath();
                            ctx.arc(170 + j * 15, 210 + (j % 3) * 20, 8, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    } else {
                        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                        ctx.beginPath();
                        ctx.arc(200, 230, 15, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }
                }
            });
        }

        for (let i = 0; i < numLegs; i++) {
            legs.push({
                color: colors[(i + 4) % colors.length],
                draw: function (ctx) {
                    ctx.fillStyle = this.color;
                    switch (i % 6) {
                        case 0:
                            ctx.fillRect(160, 290, 25, 80);
                            ctx.fillRect(215, 290, 25, 80);
                            break;
                        case 1:
                            ctx.fillRect(150, 290, 15, 90);
                            ctx.fillRect(190, 290, 15, 90);
                            ctx.fillRect(230, 290, 15, 90);
                            break;
                        case 2:
                            ctx.beginPath();
                            ctx.roundRect(160, 290, 25, 80, 10);
                            ctx.fill();
                            ctx.beginPath();
                            ctx.roundRect(215, 290, 25, 80, 10);
                            ctx.fill();
                            break;
                        case 3:
                            for (let j = 0; j < 4; j++) {
                                ctx.beginPath();
                                ctx.moveTo(160 + j * 25, 290);
                                for (let k = 0; k < 8; k++) {
                                    ctx.quadraticCurveTo(
                                        150 + j * 25 + (k % 2) * 20,
                                        310 + k * 10,
                                        160 + j * 25,
                                        330 + k * 10
                                    );
                                }
                                ctx.lineTo(160 + j * 25, 290);
                                ctx.closePath();
                                ctx.fill();
                            }
                            break;
                        case 4:
                            ctx.beginPath();
                            ctx.moveTo(150, 290);
                            ctx.lineTo(250, 290);
                            ctx.lineTo(270, 370);
                            ctx.lineTo(130, 370);
                            ctx.closePath();
                            ctx.fill();
                            break;
                        case 5:
                            ctx.beginPath();
                            ctx.moveTo(170, 290);
                            ctx.quadraticCurveTo(120, 330, 150, 370);
                            ctx.lineTo(170, 370);
                            ctx.lineTo(170, 290);
                            ctx.fill();

                            ctx.beginPath();
                            ctx.moveTo(230, 290);
                            ctx.quadraticCurveTo(280, 330, 250, 370);
                            ctx.lineTo(230, 370);
                            ctx.lineTo(230, 290);
                            ctx.fill();
                            break;
                    }

                    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';

                    if (i % 6 === 0 || i % 6 === 2) {
                        ctx.beginPath();
                        ctx.ellipse(172, 370, 20, 10, 0, 0, Math.PI * 2);
                        ctx.fill();

                        ctx.beginPath();
                        ctx.ellipse(227, 370, 20, 10, 0, 0, Math.PI * 2);
                        ctx.fill();
                    } else if (i % 6 === 1) {
                        ctx.beginPath();
                        ctx.ellipse(157, 380, 15, 8, 0, 0, Math.PI * 2);
                        ctx.fill();

                        ctx.beginPath();
                        ctx.ellipse(197, 380, 15, 8, 0, 0, Math.PI * 2);
                        ctx.fill();

                        ctx.beginPath();
                        ctx.ellipse(237, 380, 15, 8, 0, 0, Math.PI * 2);
                        ctx.fill();
                    } else if (i % 6 === 4) {
                        ctx.beginPath();
                        ctx.ellipse(200, 370, 60, 10, 0, 0, Math.PI);
                        ctx.fill();
                    }
                }
            });
        }
    }

    generateMonsterParts();

    function drawMonster() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        legs[currentLegs].draw(ctx);
        torsos[currentTorso].draw(ctx);
        heads[currentHead].draw(ctx);
        document.getElementById('headIndex').textContent = (currentHead + 1) + '/' + numHeads;
        document.getElementById('torsoIndex').textContent = (currentTorso + 1) + '/' + numTorsos;
        document.getElementById('legsIndex').textContent = (currentLegs + 1) + '/' + numLegs;
    }
    randomizeMonster();
    document.getElementById('prevHead').addEventListener('click', function () {
        currentHead = (currentHead - 1 + numHeads) % numHeads;
        drawMonster();
    });

    document.getElementById('nextHead').addEventListener('click', function () {
        currentHead = (currentHead + 1) % numHeads;
        drawMonster();
    });

    document.getElementById('prevTorso').addEventListener('click', function () {
        currentTorso = (currentTorso - 1 + numTorsos) % numTorsos;
        drawMonster();
    });

    document.getElementById('nextTorso').addEventListener('click', function () {
        currentTorso = (currentTorso + 1) % numTorsos;
        drawMonster();
    });

    document.getElementById('prevLegs').addEventListener('click', function () {
        currentLegs = (currentLegs - 1 + numLegs) % numLegs;
        drawMonster();
    });

    document.getElementById('nextLegs').addEventListener('click', function () {
        currentLegs = (currentLegs + 1) % numLegs;
        drawMonster();
    });

    // Randomize monster
    function randomizeMonster() {
        currentHead = Math.floor(Math.random() * numHeads);
        currentTorso = Math.floor(Math.random() * numTorsos);
        currentLegs = Math.floor(Math.random() * numLegs);
        drawMonster();
    }

    document.getElementById('randomize').addEventListener('click', randomizeMonster);

    // Download monster as PNG
    document.getElementById('download').addEventListener('click', function () {
        const link = document.createElement('a');
        link.download = 'my-monster.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});