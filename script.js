// 滚动渐入动画
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// 平滑滚动
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 动态背景增强
function enhanceBackground() {
    const background = document.querySelector('.background');
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        background.style.backgroundPosition = `${x * 100}% ${y * 100}%, ${(1 - x) * 100}% ${(1 - y) * 100}%, ${x * 100}% ${(1 - y) * 100}%`;
    });
}

// 鼠标悬停效果
function addHoverEffects() {
    const cards = document.querySelectorAll('.project-card, .paper-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// 响应式导航菜单
function setupResponsiveNav() {
    // 这里可以添加移动端导航菜单的逻辑
    // 例如汉堡菜单的点击事件处理
}

// 初始化所有功能
function init() {
    // 为所有需要动画的元素添加fade-in类
    const sections = document.querySelectorAll('.section > .container');
    const cards = document.querySelectorAll('.project-card, .paper-item, .document-category');
    
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    cards.forEach(card => {
        card.classList.add('fade-in');
    });
    
    // 执行滚动动画
    window.addEventListener('scroll', handleScrollAnimation);
    
    // 执行平滑滚动
    smoothScroll();
    
    // 增强背景效果
    enhanceBackground();
    
    // 添加悬停效果
    addHoverEffects();
    
    // 设置响应式导航
    setupResponsiveNav();
    
    // 初始执行一次滚动动画，确保页面加载时可见元素正确显示
    handleScrollAnimation();
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);
