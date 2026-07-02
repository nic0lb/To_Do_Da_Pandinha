/*
==========================================================
🌸 To Do da Pandinha
Studies Module
==========================================================
*/

function renderStudies() {

    const main = document.querySelector("#main-content");

    if (!main) return;

    // Evita intervalos de pomodoro "órfãos" ao reentrar na página
    if (typeof pomodoroState !== "undefined" && pomodoroState.intervalId) {
        clearInterval(pomodoroState.intervalId);
        pomodoroState.running = false;
    }

    main.innerHTML = studiesTemplate();

    renderStudiesList();
    renderSubjectOptions();
    updatePomodoroDisplay();
    updatePomodoroModeLabel();

    studiesEvents();

}

// Expõe a função globalmente para ser usada pelo routes.js
window.renderStudies = renderStudies;
