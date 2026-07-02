/*
==========================================================
🌸 To Do da Pandinha - Sistema de Rotas
==========================================================
*/

let currentRoute = 'home';

const routeHandlers = {
    home: typeof renderHome !== 'undefined' ? renderHome : () => console.warn('renderHome not loaded'),
    tasks: () => { 
        if (typeof renderTasks !== 'undefined') renderTasks(); 
        else console.error('renderTasks not loaded'); 
    },
    planner: () => {
        if (typeof renderPlanner !== 'undefined') renderPlanner();
        else console.error('renderPlanner not loaded');
    },
    studies: () => {
        if (typeof renderStudies !== 'undefined') renderStudies();
        else console.error('renderStudies not loaded');
    },
    habits: typeof renderHabits !== 'undefined' ? renderHabits : () => console.warn('renderHabits not loaded'),
    goals: () => showComingSoon("Metas"),
    notes: () => showComingSoon("Notas"),
    settings: () => showComingSoon("Configurações")
};

/**
 * Navega para uma rota específica de forma segura.
 * @param {string} route - Nome da rota de destino.
 */
function navigateTo(route) {
    if (!route) return;

    // Converte para minúsculas para evitar erros caso o HTML use "Habits" ou "Planner"
    const safeRoute = route.toLowerCase().trim();
    
    const handler = routeHandlers[safeRoute];
    if (handler) {
        currentRoute = safeRoute;
        updateActiveNav(safeRoute);
        handler();
    } else {
        console.warn(`Rota não encontrada: "${route}". Verifique se o data-route no HTML está correto.`);
    }
}

/**
 * Atualiza a classe visual 'active' nos menus lateral e inferior.
 * @param {string} route - A rota ativa atual.
 */
function updateActiveNav(route) {
    document.querySelectorAll('.sidebar__item, .bottom-nav__item').forEach(item => {
        const itemRoute = item.getAttribute('data-route');
        if (itemRoute) {
            // Compara os dois lados em minúsculo para garantir a ativação visual
            const isMatch = itemRoute.toLowerCase().trim() === route;
            item.classList.toggle('active', isMatch);
        }
    });
}

/**
 * Renderiza uma tela temporária amigável para recursos em desenvolvimento.
 * @param {string} title - Título da página.
 */
function showComingSoon(title) {
    const main = document.querySelector("#main-content");
    if (!main) return;

    main.innerHTML = `
        <div style="text-align:center; padding:100px 20px; color:var(--coffee)">
            <h1 style="font-size:2.8rem; margin: 0;">${title}</h1>
            <p style="margin-top:20px; font-size:1.2rem;">Em breve, Pandinha 🌸</p>
        </div>
    `;
}

// Expõe a função globalmente para ser usada pelo app.js e outros módulos
window.navigateTo = navigateTo;