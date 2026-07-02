/*
==========================================================
🌸 To Do da Pandinha
Header Component
==========================================================
*/

function renderHeader() {

    const header = document.querySelector("#header");

    if (!header) return;

    const today = new Date();

    const formattedDate = today.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });

    header.innerHTML = `
    
        <div class="header">

            <div class="header__info">

                <span class="header__welcome">
                    🌸 Bem-vinda, Pandinha
                </span>

                <h1 class="header__title">
                    Organize seu dia.
                </h1>

                <p class="header__date">
                    ${formattedDate}
                </p>

            </div>

            <div class="header__profile">

                <div class="avatar">

                    🐼

                </div>

            </div>

        </div>

    `;

}