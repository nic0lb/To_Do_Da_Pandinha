/*
==========================================================
🌸 To Do da Pandinha
Sidebar Component
==========================================================
*/

function renderSidebar() {
    const sidebar = document.querySelector("#sidebar");
    if (!sidebar) return;

    sidebar.innerHTML = `
        <div class="sidebar">
            <div class="sidebar__brand">
                <div class="sidebar__logo">
                    🐼
                </div>
                <h2>
                    To Do da Pandinha
                </h2>
                <p>
                    Organize seus dias.<br>
                    Viva o resto.
                </p>
            </div>

            <nav class="sidebar__menu">
                <button class="sidebar__item active" data-route="home">
                    <span>🏠</span>
                    Início
                </button>

                <button class="sidebar__item" data-route="tasks">
                    <span>✅</span>
                    Tarefas
                </button>

                <button class="sidebar__item" data-route="planner">
                    <span>📅</span>
                    Planejamento
                </button>

                <button class="sidebar__item" data-route="studies">
                    <span>🎓</span>
                    Estudos
                </button>

                <button class="sidebar__item" data-route="habits">
                    <span>🌱</span>
                    Hábitos
                </button>

                <button class="sidebar__item" data-route="goals">
                    <span>🎯</span>
                    Metas
                </button>

                <button class="sidebar__item" data-route="notes">
                    <span>📝</span>
                    Notas
                </button>
            </nav>

            <div class="sidebar__footer">
                <button class="sidebar__item" data-route="settings">
                    <span>⚙️</span>
                    Configurações
                </button>

                <button class="sidebar__item" data-route="about">
                    <span>❤️</span>
                    Sobre
                </button>
            </div>
        </div>
    `;
}

// Garante o registro global do componente
window.renderSidebar = renderSidebar;