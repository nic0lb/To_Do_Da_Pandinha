// js/app.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inicializa os componentes estruturais da interface
    if (typeof renderSidebar === "function") renderSidebar();
    if (typeof renderBottomNavigation === "function") renderBottomNavigation();
    if (typeof renderHeader === "function") renderHeader();

    // 2. Garante o registro global do módulo de tarefas, se disponível
    if (typeof renderTasks === "function") {
        window.renderTasks = renderTasks;
    }

    // 3. Ativa o ouvinte de cliques para navegação global
    setupNavigationListeners();

    // 4. Carrega a rota inicial (Home)
    if (typeof navigateTo === "function") {
        navigateTo('home');
    } else {
        console.warn("Função navigateTo não encontrada. Verifique se o roteador (router.js) foi carregado.");
    }
});

/**
 * Gerencia os cliques de navegação usando delegação de eventos no elemento raiz (#app).
 * Evita que os botões percam o clique quando o HTML é re-renderizado.
 */
function setupNavigationListeners() {
    const appContainer = document.querySelector('#app') || document.body;
    
    appContainer.addEventListener('click', (e) => {
        // Captura o clique mesmo se o usuário clicar no ícone/texto dentro do botão
        const navItem = e.target.closest('.sidebar__item, .bottom-nav__item');
        
        if (navItem) {
            const route = navItem.getAttribute('data-route');
            if (route && typeof navigateTo === "function") {
                navigateTo(route);
            }
        }
    });
}

if ("serviceWorker" in navigator) {

    window.addEventListener("load", async () => {

        try {

            await navigator.serviceWorker.register("./service-worker.js");

            console.log("✅ Service Worker registrado.");

        } catch (error) {

            console.error(error);

        }

    });

}
