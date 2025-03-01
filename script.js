document.addEventListener('DOMContentLoaded', function () {

    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {

            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));


            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });


    const monsterCanvas = document.getElementById('monsterCanvas');
    const monsterCtx = monsterCanvas.getContext('2d');

    const idlePreview = document.getElementById('idlePreview');
    const idleCtx = idlePreview.getContext('2d');

    const runPreview = document.getElementById('runPreview');
    const runCtx = runPreview.getContext('2d');

    const jumpPreview = document.getElementById('jumpPreview');
    const jumpCtx = jumpPreview.getContext('2d');

    const monsterExportPreview = document.getElementById('monsterExportPreview');
    const monsterExportCtx = monsterExportPreview.getContext('2d');

    const platformCanvas = document.getElementById('platformCanvas');
    const platformCtx = platformCanvas.getContext('2d');

    const platformExportPreview = document.getElementById('platformExportPreview');
    const platformExportCtx = platformExportPreview.getContext('2d');


    const colorSchemes = [
        { name: "Bright", colors: ['#FF6B6B', '#4ECDC4', '#FFD166', '#6A5ACD', '#50D890', '#FF9A76'] },
        { name: "Pastel", colors: ['#A8D8EA', '#AA96DA', '#FCBAD3', '#FFFFD2', '#C5FAD5', '#F4F9F9'] },
        { name: "Dark", colors: ['#2C3E50', '#E74C3C', '#3498DB', '#F1C40F', '#1ABC9C', '#9B59B6'] },
        { name: "Earthy", colors: ['#D9B08C', '#FFCB9A', '#D5C7BC', '#116466', '#2C3A47', '#7A9E7E'] },
        { name: "Vibrant", colors: ['#FC5185', '#3FC1C9', '#F5F5F5', '#364F6B', '#F0134D', '#40BFC1'] }
    ];

    let currentColorScheme = 0;


    const heads = [];
    const torsos = [];
    const legs = [];


    let currentHead = 0;
    let currentTorso = 0;
    let currentLegs = 0;


    const numHeads = 6;
    const numTorsos = 6;
    const numLegs = 6;


    const platformTypes = ['normal', 'bounce', 'crumble', 'moving'];
    let currentPlatform = 'normal';
    let currentPlatformColor = 0;


    let animationFrame = 0;
    const runAnimationFrames = 4;
    let animationTimer;


    function generateMonsterParts() {

        heads.length = 0;
        torsos.length = 0;
        legs.length = 0;


        for (let i = 0; i < numHeads; i++) {
            heads.push({
                draw: function (ctx, state = 'idle') {
                    const colorScheme = colorSchemes[currentColorScheme].colors;
                    ctx.fillStyle = colorScheme[i % colorScheme.length];
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

                    if (state === 'idle') {

                        ctx.beginPath();
                        ctx.arc(170 + ((i % 3) - 1) * 5, 110, 7, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(230 + ((i % 3) - 1) * 5, 110, 7, 0, Math.PI * 2);
                        ctx.fill();
                    } else if (state === 'run') {

                        const bounceOffset = Math.sin(animationFrame * 0.5) * 3;
                        ctx.beginPath();
                        ctx.arc(170 + ((i % 3) - 1) * 5, 110 + bounceOffset, 7, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(230 + ((i % 3) - 1) * 5, 110 + bounceOffset, 7, 0, Math.PI * 2);
                        ctx.fill();
                    } else if (state === 'jump') {

                        ctx.beginPath();
                        ctx.arc(170 + ((i % 3) - 1) * 5, 108, 8, 0, Math.PI * 2);
                        ctx.fill();
                        ctx.beginPath();
                        ctx.arc(230 + ((i % 3) - 1) * 5, 108, 8, 0, Math.PI * 2);
                        ctx.fill();
                    }


                    if (state === 'idle') {
                        if (i % 2 === 0) {

                            ctx.beginPath();
                            ctx.arc(200, 140, 30, 0.1 * Math.PI, 0.9 * Math.PI);
                            ctx.lineWidth = 3;
                            ctx.stroke();
                        } else {

                            ctx.beginPath();
                            ctx.arc(200, 150, 15, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.fillStyle = colorScheme[i % colorScheme.length];
                            ctx.beginPath();
                            ctx.arc(200, 150, 8, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    } else if (state === 'run') {

                        ctx.beginPath();
                        ctx.arc(200, 150, 15 + Math.sin(animationFrame * 0.5) * 5, 0, Math.PI * 2);
                        ctx.fill();
                    } else if (state === 'jump') {

                        ctx.beginPath();
                        ctx.arc(200, 145, 35, 0, Math.PI);
                        ctx.lineWidth = 3;
                        ctx.stroke();
                    }
                }
            });
        }


        for (let i = 0; i < numTorsos; i++) {
            torsos.push({
                draw: function (ctx, state = 'idle') {
                    const colorScheme = colorSchemes[currentColorScheme].colors;
                    ctx.fillStyle = colorScheme[(i + 2) % colorScheme.length];


                    let offsetY = 0;
                    if (state === 'run') {
                        offsetY = Math.sin(animationFrame * 0.5) * 5;
                    } else if (state === 'jump') {
                        offsetY = -10;
                    }


                    switch (i % 6) {
                        case 0:
                            ctx.fillRect(150, 180 + offsetY, 100, 110);
                            break;
                        case 1:
                            ctx.beginPath();
                            ctx.ellipse(200, 230 + offsetY, 60, 70, 0, 0, Math.PI * 2);
                            ctx.fill();
                            break;
                        case 2:
                            ctx.beginPath();
                            ctx.moveTo(140, 180 + offsetY);
                            ctx.lineTo(260, 180 + offsetY);
                            ctx.lineTo(240, 290 + offsetY);
                            ctx.lineTo(160, 290 + offsetY);
                            ctx.closePath();
                            ctx.fill();
                            break;
                        case 3:
                            ctx.beginPath();
                            ctx.moveTo(150, 180 + offsetY);
                            ctx.lineTo(250, 180 + offsetY);
                            ctx.lineTo(220, 230 + offsetY);
                            ctx.lineTo(250, 290 + offsetY);
                            ctx.lineTo(150, 290 + offsetY);
                            ctx.lineTo(180, 230 + offsetY);
                            ctx.closePath();
                            ctx.fill();
                            break;
                        case 4:
                            ctx.beginPath();
                            ctx.ellipse(200, 230 + offsetY, 50, 60, 0, 0, Math.PI * 2);
                            ctx.fill();
                            break;
                        case 5:
                            ctx.beginPath();
                            ctx.moveTo(200, 180 + offsetY);
                            ctx.lineTo(250, 200 + offsetY);
                            ctx.lineTo(230, 290 + offsetY);
                            ctx.lineTo(170, 290 + offsetY);
                            ctx.lineTo(150, 200 + offsetY);
                            ctx.closePath();
                            ctx.fill();
                            break;
                    }


                    if (i % 3 === 0) {

                        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
                        ctx.lineWidth = 8;
                        for (let j = 0; j < 3; j++) {
                            ctx.beginPath();
                            ctx.moveTo(160, 200 + j * 30 + offsetY);
                            ctx.lineTo(240, 200 + j * 30 + offsetY);
                            ctx.stroke();
                        }
                    } else if (i % 3 === 1) {

                        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
                        for (let j = 0; j < 5; j++) {
                            ctx.beginPath();
                            ctx.arc(170 + j * 15, 210 + (j % 3) * 20 + offsetY, 8, 0, Math.PI * 2);
                            ctx.fill();
                        }
                    } else {

                        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                        ctx.beginPath();
                        ctx.arc(200, 230 + offsetY, 15, 0, Math.PI * 2);
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
                draw: function (ctx, state = 'idle') {
                    const colorScheme = colorSchemes[currentColorScheme].colors;
                    ctx.fillStyle = colorScheme[(i + 4) % colorScheme.length];


                    let leftLegOffset = 0;
                    let rightLegOffset = 0;

                    if (state === 'run') {

                        leftLegOffset = Math.sin(animationFrame * 0.5) * 15;
                        rightLegOffset = Math.sin(animationFrame * 0.5 + Math.PI) * 15;
                    } else if (state === 'jump') {

                        leftLegOffset = -15;
                        rightLegOffset = -15;
                    }


                    switch (i % 6) {
                        case 0:
                            ctx.fillRect(160, 290 + leftLegOffset, 25, 80);
                            ctx.fillRect(215, 290 + rightLegOffset, 25, 80);
                            break;
                        case 1:
                            ctx.fillRect(150, 290 + leftLegOffset, 15, 90);
                            ctx.fillRect(190, 290, 15, 90);
                            ctx.fillRect(230, 290 + rightLegOffset, 15, 90);
                            break;
                        case 2:
                            ctx.beginPath();
                            ctx.roundRect(160, 290 + leftLegOffset, 25, 80, 10);
                            ctx.fill();
                            ctx.beginPath();
                            ctx.roundRect(215, 290 + rightLegOffset, 25, 80, 10);
                            ctx.fill();
                            break;
                        case 3:
                            for (let j = 0; j < 4; j++) {
                                const tentacleOffset = j % 2 === 0 ? leftLegOffset : rightLegOffset;
                                ctx.beginPath();
                                ctx.moveTo(160 + j * 25, 290);

                                for (let k = 0; k < 8; k++) {
                                    ctx.quadraticCurveTo(
                                        150 + j * 25 + (k % 2) * 20,
                                        310 + k * 10 + tentacleOffset * (k / 8),
                                        160 + j * 25,
                                        330 + k * 10 + tentacleOffset * (k / 8)
                                    );
                                }
                                ctx.lineTo(160 + j * 25, 290);
                                ctx.closePath();
                                ctx.fill();
                            }
                            break;
                        case 4:
                            const legBottom = state === 'jump' ? 350 : 370;
                            ctx.beginPath();
                            ctx.moveTo(150, 290);
                            ctx.lineTo(250, 290);
                            ctx.lineTo(270, legBottom);
                            ctx.lineTo(130, legBottom);
                            ctx.closePath();
                            ctx.fill();
                            break;
                        case 5:
                            ctx.beginPath();
                            ctx.moveTo(170, 290);
                            ctx.quadraticCurveTo(120, 330 + leftLegOffset, 150, 370 + leftLegOffset);
                            ctx.lineTo(170, 370 + leftLegOffset);
                            ctx.lineTo(170, 290);
                            ctx.fill();

                            ctx.beginPath();
                            ctx.moveTo(230, 290);
                            ctx.quadraticCurveTo(280, 330 + rightLegOffset, 250, 370 + rightLegOffset);
                            ctx.lineTo(230, 370 + rightLegOffset);
                            ctx.lineTo(230, 290);
                            ctx.fill();
                            break;
                    }


                    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';


                    if (i % 6 === 0 || i % 6 === 2) {

                        ctx.beginPath();
                        ctx.ellipse(172, 370 + leftLegOffset, 20, 10, 0, 0, Math.PI * 2);
                        ctx.fill();

                        ctx.beginPath();
                        ctx.ellipse(227, 370 + rightLegOffset, 20, 10, 0, 0, Math.PI * 2);
                        ctx.fill();
                    } else if (i % 6 === 1) {

                        ctx.beginPath();
                        ctx.ellipse(157, 380 + leftLegOffset, 15, 8, 0, 0, Math.PI * 2);
                        ctx.fill();

                        ctx.beginPath();
                        ctx.ellipse(197, 380, 15, 8, 0, 0, Math.PI * 2);
                        ctx.fill();

                        ctx.beginPath();
                        ctx.ellipse(237, 380 + rightLegOffset, 15, 8, 0, 0, Math.PI * 2);
                        ctx.fill();
                    } else if (i % 6 === 4) {

                        const footY = state === 'jump' ? 350 : 370;
                        ctx.beginPath();
                        ctx.ellipse(200, footY, 60, 10, 0, 0, Math.PI);
                        ctx.fill();
                    }
                }
            });
        }
    }


    function drawMonster(ctx, state = 'idle', scale = 1, offsetX = 0, offsetY = 0) {
        if (!ctx) return;


        ctx.save();


        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


        if (scale !== 1 || offsetX !== 0 || offsetY !== 0) {
            ctx.translate(offsetX, offsetY);
            ctx.scale(scale, scale);
        }


        legs[currentLegs].draw(ctx, state);
        torsos[currentTorso].draw(ctx, state);
        heads[currentHead].draw(ctx, state);


        ctx.restore();


        if (ctx === monsterCtx) {
            const headIndexEl = document.getElementById('headIndex');
            const torsoIndexEl = document.getElementById('torsoIndex');
            const legsIndexEl = document.getElementById('legsIndex');

            if (headIndexEl) headIndexEl.textContent = (currentHead + 1) + '/' + numHeads;
            if (torsoIndexEl) torsoIndexEl.textContent = (currentTorso + 1) + '/' + numTorsos;
            if (legsIndexEl) legsIndexEl.textContent = (currentLegs + 1) + '/' + numLegs;
        }
    }


    function drawPlatform(ctx, type = 'normal', color = 0, scale = 1, offsetX = 0, offsetY = 0) {
        if (!ctx) return;

        ctx.save();


        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


        if (scale !== 1 || offsetX !== 0 || offsetY !== 0) {
            ctx.translate(offsetX, offsetY);
            ctx.scale(scale, scale);
        }

        const colorScheme = colorSchemes[currentColorScheme].colors;
        const platformColor = colorScheme[color % colorScheme.length];


        const width = ctx.canvas.width * 0.8;
        const height = 30;
        const x = (ctx.canvas.width - width) / 2;
        const y = (ctx.canvas.height - height) / 2;


        ctx.fillStyle = platformColor;
        ctx.beginPath();


        if (ctx.roundRect) {
            ctx.roundRect(x, y, width, height, 10);
        } else {

            const radius = 10;
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
        }

        ctx.fill();


        switch (type) {
            case 'normal':

                ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
                for (let i = 0; i < width; i += 30) {
                    ctx.fillRect(x + i, y + 5, 20, 2);
                }
                break;
            case 'bounce':

                ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.lineWidth = 3;
                for (let i = 0; i < 3; i++) {
                    const springX = x + width * (i + 1) / 4;
                    ctx.beginPath();
                    ctx.moveTo(springX, y);
                    ctx.lineTo(springX, y - 15);
                    ctx.stroke();


                    ctx.beginPath();
                    for (let j = 0; j < 5; j++) {
                        ctx.arc(springX + (j % 2 ? 5 : -5), y - 15 - j * 3, 5, 0, Math.PI);
                    }
                    ctx.stroke();
                }
                break;
            case 'crumble':

                ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(x + width * 0.3, y);
                ctx.lineTo(x + width * 0.3, y + height);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(x + width * 0.6, y);
                ctx.lineTo(x + width * 0.7, y + height);
                ctx.stroke();


                ctx.fillStyle = platformColor;
                ctx.beginPath();
                if (ctx.roundRect) {
                    ctx.roundRect(x + width * 0.1, y + height + 5, width * 0.15, 10, 5);
                } else {
                    ctx.rect(x + width * 0.1, y + height + 5, width * 0.15, 10);
                }
                ctx.fill();

                ctx.beginPath();
                if (ctx.roundRect) {
                    ctx.roundRect(x + width * 0.75, y + height + 8, width * 0.1, 8, 5);
                } else {
                    ctx.rect(x + width * 0.75, y + height + 8, width * 0.1, 8);
                }
                ctx.fill();
                break;
            case 'moving':

                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';


                ctx.beginPath();
                ctx.moveTo(x + 20, y + height / 2);
                ctx.lineTo(x + 40, y + height * 0.3);
                ctx.lineTo(x + 40, y + height * 0.7);
                ctx.closePath();
                ctx.fill();


                ctx.beginPath();
                ctx.moveTo(x + width - 20, y + height / 2);
                ctx.lineTo(x + width - 40, y + height * 0.3);
                ctx.lineTo(x + width - 40, y + height * 0.7);
                ctx.closePath();
                ctx.fill();
                break;
        }

        ctx.restore();
    }


    function startAnimation() {

        if (animationTimer) {
            clearInterval(animationTimer);
        }

        animationTimer = setInterval(() => {
            animationFrame = (animationFrame + 1) % runAnimationFrames;


            drawMonster(runCtx, 'run', 0.25, 0, 0);


            if (document.querySelector('.tab.active').getAttribute('data-tab') === 'monster-creator') {
                drawMonster(monsterCtx);
            }
        }, 150);
    }


    function updateMonsterPreviews() {
        drawMonster(idleCtx, 'idle', 0.25, 0, 0);
        drawMonster(runCtx, 'run', 0.25, 0, 0);
        drawMonster(jumpCtx, 'jump', 0.25, 0, 0);
        drawMonster(monsterExportCtx, 'idle', 0.25, 0, 0);
    }


    function updatePlatformPreviews() {

        const container = document.getElementById('platformPreviews');
        if (!container) return;

        container.innerHTML = '';


        platformTypes.forEach(type => {
            const previewBox = document.createElement('div');
            previewBox.className = 'preview-box';

            const canvas = document.createElement('canvas');
            canvas.width = 200;
            canvas.height = 60;
            previewBox.appendChild(canvas);

            const label = document.createElement('p');
            label.textContent = type.charAt(0).toUpperCase() + type.slice(1);
            previewBox.appendChild(label);

            container.appendChild(previewBox);

            const ctx = canvas.getContext('2d');
            drawPlatform(ctx, type, currentPlatformColor, 0.33, 0, 0);
        });


        drawPlatform(platformExportCtx, currentPlatform, currentPlatformColor, 0.33, 0, 0);
    }


    function randomizeMonster() {
        currentHead = Math.floor(Math.random() * numHeads);
        currentTorso = Math.floor(Math.random() * numTorsos);
        currentLegs = Math.floor(Math.random() * numLegs);
        drawMonster(monsterCtx);
        updateMonsterPreviews();
    }


    function randomizePlatform() {
        currentPlatform = platformTypes[Math.floor(Math.random() * platformTypes.length)];
        currentPlatformColor = Math.floor(Math.random() * colorSchemes[currentColorScheme].colors.length);


        document.querySelectorAll('.platform-type').forEach(el => {
            el.classList.remove('selected');
            if (el.getAttribute('data-type') === currentPlatform) {
                el.classList.add('selected');
            }
        });

        drawPlatform(platformCtx, currentPlatform, currentPlatformColor);
        updatePlatformPreviews();
    }


    function populateColorSchemes() {
        const container = document.getElementById('colorSchemes');
        if (!container) return;

        container.innerHTML = '';

        colorSchemes.forEach((scheme, index) => {
            const schemeEl = document.createElement('div');
            schemeEl.className = 'color-scheme';

            const title = document.createElement('h4');
            title.textContent = scheme.name;
            title.style.margin = '5px 0';
            schemeEl.appendChild(title);


            const swatchesContainer = document.createElement('div');
            scheme.colors.forEach(color => {
                const swatch = document.createElement('span');
                swatch.className = 'color-option';
                swatch.style.backgroundColor = color;
                swatchesContainer.appendChild(swatch);
            });
            schemeEl.appendChild(swatchesContainer);


            const selectBtn = document.createElement('button');
            selectBtn.textContent = 'Use Scheme';
            selectBtn.addEventListener('click', () => {
                currentColorScheme = index;


                document.querySelectorAll('.color-scheme button').forEach(btn => {
                    btn.classList.remove('selected');
                });
                selectBtn.classList.add('selected');


                drawMonster(monsterCtx);
                updateMonsterPreviews();
                populatePlatformColors();
                drawPlatform(platformCtx, currentPlatform, currentPlatformColor);
                updatePlatformPreviews();
            });

            if (index === currentColorScheme) {
                selectBtn.classList.add('selected');
            }

            schemeEl.appendChild(selectBtn);
            container.appendChild(schemeEl);
        });
    }


    function populatePlatformColors() {
        const container = document.getElementById('platformColors');
        if (!container) return;

        container.innerHTML = '';

        const colorScheme = colorSchemes[currentColorScheme].colors;
        colorScheme.forEach((color, index) => {
            const colorOption = document.createElement('div');
            colorOption.className = 'color-option';
            if (index === currentPlatformColor) {
                colorOption.classList.add('selected');
            }
            colorOption.style.backgroundColor = color;

            colorOption.addEventListener('click', () => {
                currentPlatformColor = index;


                document.querySelectorAll('#platformColors .color-option').forEach(el => {
                    el.classList.remove('selected');
                });
                colorOption.classList.add('selected');

                drawPlatform(platformCtx, currentPlatform, currentPlatformColor);
                updatePlatformPreviews();
            });

            container.appendChild(colorOption);
        });
    }


    function downloadAssets() {
        alert("Asset Pack Download\n\nThis would normally create a ZIP file with all your monster animations and platform types.\n\nIn a real implementation, we would generate separate PNGs for each animation frame and include a README.md with instructions for GDevelop.");


        const link = document.createElement('a');
        link.download = 'my-monster.png';
        link.href = monsterCanvas.toDataURL();
        link.click();
    }


    function init() {

        generateMonsterParts();


        populateColorSchemes();
        populatePlatformColors();


        drawMonster(monsterCtx);
        drawPlatform(platformCtx, currentPlatform, currentPlatformColor);


        updateMonsterPreviews();
        updatePlatformPreviews();


        startAnimation();


        const prevHeadBtn = document.getElementById('prevHead');
        const nextHeadBtn = document.getElementById('nextHead');
        const prevTorsoBtn = document.getElementById('prevTorso');
        const nextTorsoBtn = document.getElementById('nextTorso');
        const prevLegsBtn = document.getElementById('prevLegs');
        const nextLegsBtn = document.getElementById('nextLegs');
        const randomizeMonsterBtn = document.getElementById('randomizeMonster');
        const randomizePlatformBtn = document.getElementById('randomizePlatform');
        const downloadBtn = document.getElementById('downloadAssets');

        if (prevHeadBtn) {
            prevHeadBtn.addEventListener('click', function () {
                currentHead = (currentHead - 1 + numHeads) % numHeads;
                drawMonster(monsterCtx);
                updateMonsterPreviews();
            });
        }

        if (nextHeadBtn) {
            nextHeadBtn.addEventListener('click', function () {
                currentHead = (currentHead + 1) % numHeads;
                drawMonster(monsterCtx);
                updateMonsterPreviews();
            });
        }

        if (prevTorsoBtn) {
            prevTorsoBtn.addEventListener('click', function () {
                currentTorso = (currentTorso - 1 + numTorsos) % numTorsos;
                drawMonster(monsterCtx);
                updateMonsterPreviews();
            });
        }

        if (nextTorsoBtn) {
            nextTorsoBtn.addEventListener('click', function () {
                currentTorso = (currentTorso + 1) % numTorsos;
                drawMonster(monsterCtx);
                updateMonsterPreviews();
            });
        }

        if (prevLegsBtn) {
            prevLegsBtn.addEventListener('click', function () {
                currentLegs = (currentLegs - 1 + numLegs) % numLegs;
                drawMonster(monsterCtx);
                updateMonsterPreviews();
            });
        }

        if (nextLegsBtn) {
            nextLegsBtn.addEventListener('click', function () {
                currentLegs = (currentLegs + 1) % numLegs;
                drawMonster(monsterCtx);
                updateMonsterPreviews();
            });
        }

        if (randomizeMonsterBtn) {
            randomizeMonsterBtn.addEventListener('click', randomizeMonster);
        }

        if (randomizePlatformBtn) {
            randomizePlatformBtn.addEventListener('click', randomizePlatform);
        }

        if (downloadBtn) {
            downloadBtn.addEventListener('click', downloadAssets);
        }


        document.querySelectorAll('.platform-type').forEach(el => {
            el.addEventListener('click', () => {
                currentPlatform = el.getAttribute('data-type');


                document.querySelectorAll('.platform-type').forEach(el => {
                    el.classList.remove('selected');
                });
                el.classList.add('selected');

                drawPlatform(platformCtx, currentPlatform, currentPlatformColor);
                updatePlatformPreviews();
            });
        });
    }


    init();
});