/*
==========================================================
🌸 To Do da Pandinha
Bottom Navigation
==========================================================
*/

function renderBottomNavigation() {

    const nav = document.querySelector("#bottom-navigation");

    if (!nav) return;

    nav.innerHTML = `

        <button class="bottom-nav__item active" data-route="home">
            🏠
        </button>

        <button class="bottom-nav__item" data-route="tasks">
            ✅
        </button>

        <button class="bottom-nav__item" data-route="planner">
            📅
        </button>

        <button class="bottom-nav__item" data-route="habits">
            🌱
        </button>

        <button class="bottom-nav__item" data-route="studies">
            📚
        </button>

    `;
}