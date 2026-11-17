function startVisualizerLoop() {
    const canvas = document.getElementById('piano-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.offsetHeight;
        canvas.height = canvas.offsetWidth;
    }

    resize();

    window.addEventListener('resize', resize);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        activeRibbons.forEach(r => {
            r.y -= 3.5;
            r.height += 3.5;
            drawRibbon(ctx, r);
        });

        for (let i = finishedRibbons.length - 1; i >= 0; i--) {
            const r = finishedRibbons[i];
            r.y -= 3.5;
            r.alpha -= 0.025;

            if (r.alpha <= 0 || r.y + r.height < 0) {
                finishedRibbons.splice(i, 1);
                continue;
            }
            drawRibbon(ctx, r);
        }

        for (let i = shockwaves.length - 1; i >= 0; i--) {
            const s = shockwaves[i];
            s.radius += 2.6;
            s.alpha -= 0.035;

            if (s.alpha <= 0) {
                shockwaves.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.radius, Math.PI, 0);
            ctx.strokeStyle = s.color;
            ctx.globalAlpha = s.alpha;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.restore();
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.vy = p.gravity;
            p.x += p.vy;
            p.y += p.vy;
            p.alpha -= 0.016;

            if (p.y >= canvas.height - 2 && p.vy > 0) {
                p.y = canvas.height - 2;
                p.vy *= -0.45;
            }

            if (p.alpha <= 0) {
                particles.splice(i, 1);
                continue;
            }

            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        animationFrameId = requestAnimationFrame(animate);
    }
    animationFrameId = requestAnimationFrame(animate);
}

function drawRibbon(ctx, r) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, r.alpha ?? 1);

    const grad = ctx.createLinearGradient(0, r.y, 0, r.y + r.height);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(0.25, r.color);
    grad.addColorStop(1, '#ffffff');

    ctx.fillStyle = grad;
    ctx.shadowBlur = 16;
    ctx.shadowColor = r.color;
    ctx.beginPath();
    ctx.roundRect(r.x - r.width / 2, r.y, r.width, r.height, 6);
    ctx.fill();
    ctx.restore();
}


