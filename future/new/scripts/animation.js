document.addEventListener('DOMContentLoaded', () => {
    // 1. Central Node Breathing Animation (JS-powered alternative to CSS)
    const centerNode = document.querySelector('.center-node');
    if (centerNode) {
        let scale = 1;
        let growing = true;
        
        function breathe() {
            if (!centerNode) return;
            if (growing) {
                scale += 0.001;
                if (scale >= 1.03) growing = false;
            } else {
                scale -= 0.001;
                if (scale <= 0.97) growing = true;
            }
            centerNode.style.transform = `translate(-50%, -50%) scale(${scale})`;
            requestAnimationFrame(breathe);
        }
        // requestAnimationFrame(breathe); // Uncomment for JS-driven floating animation
    }

    // 2. Intersection Observer for Fade-in effect
    const cards = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });

    // 3. Glowing Node Mouse Tracker (Interactive Component)
    const nodes = document.querySelectorAll('.service-card, .center-node');
    nodes.forEach(node => {
        node.addEventListener('mousemove', (e) => {
            const rect = node.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            node.style.setProperty('--mouse-x', x + 'px');
            node.style.setProperty('--mouse-y', y + 'px');
            
            // Add dynamic spotlight effect via CSS variable
            node.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 242, 254, 0.1), rgba(255, 255, 255, 0.02) 50%)`;
        });
        node.addEventListener('mouseleave', () => {
            node.style.background = 'rgba(15, 23, 42, 0.7)';
        });
    });
});