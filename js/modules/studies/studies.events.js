/*
==========================================================
🌸 To Do da Pandinha
Studies Events
==========================================================
*/

// Estado do pomodoro (vive apenas em memória durante a sessão)
let pomodoroState = {
    mode: "focus",              // "focus" | "break"
    secondsLeft: studiesData.pomodoro.focusMinutes * 60,
    intervalId: null,
    running: false
};

function studiesEvents() {

    const form = document.querySelector("#studies-form");
    const input = document.querySelector("#studies-input");
    const listEl = document.querySelector("#studies-list");

    const startBtn = document.querySelector("#pomodoro-start");
    const pauseBtn = document.querySelector("#pomodoro-pause");
    const resetBtn = document.querySelector("#pomodoro-reset");

    if (form && input) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const title = input.value.trim();
            if (!title) {
                if (typeof showToast === "function") {
                    showToast("Escreve o nome da matéria, Pandinha! 🌸", "warning");
                } else {
                    alert("Escreve o nome da matéria, Pandinha! 🌸");
                }
                return;
            }

            window.Storage.createStudySubject(title);
            input.value = "";
            input.focus();

            renderStudiesList();
            renderSubjectOptions();
        });
    }

    if (listEl) {
        listEl.addEventListener("click", (event) => {
            const item = event.target.closest(".subject");
            if (!item) return;

            const id = Number(item.dataset.id);

            if (event.target.closest(".subject__check")) {
                window.Storage.toggleStudySubject(id);
                renderStudiesList();
                return;
            }

            if (event.target.closest(".subject__delete")) {
                item.classList.add("subject--removing");
                setTimeout(() => {
                    window.Storage.deleteStudySubject(id);
                    renderStudiesList();
                    renderSubjectOptions();
                }, 180);
            }
        });
    }

    if (startBtn) startBtn.addEventListener("click", startPomodoro);
    if (pauseBtn) pauseBtn.addEventListener("click", pausePomodoro);
    if (resetBtn) resetBtn.addEventListener("click", resetPomodoro);
}

/* ----------------------------------------------------------
   Renderização
---------------------------------------------------------- */

function renderStudiesList() {
    const listEl = document.querySelector("#studies-list");
    if (!listEl) return;

    const subjects = window.Storage.getStudySubjects();
    listEl.innerHTML = studiesListTemplate(subjects);

    renderStudiesTotal();
}

function renderSubjectOptions() {
    const select = document.querySelector("#pomodoro-subject-select");
    if (!select) return;

    const subjects = window.Storage.getStudySubjects();
    const previousValue = select.value;
    select.innerHTML = subjectOptionsTemplate(subjects);

    if (previousValue && subjects.some(s => String(s.id) === previousValue)) {
        select.value = previousValue;
    }
}

function renderStudiesTotal() {
    const totalEl = document.querySelector("#studies-total-minutes");
    if (!totalEl) return;

    const total = window.Storage.getTotalStudyMinutes();
    totalEl.textContent = `${total} min`;
}

/* ----------------------------------------------------------
   Pomodoro
---------------------------------------------------------- */

function startPomodoro() {
    if (pomodoroState.running) return;

    pomodoroState.running = true;
    toggleTimerButtons();

    pomodoroState.intervalId = setInterval(() => {
        pomodoroState.secondsLeft--;

        if (pomodoroState.secondsLeft <= 0) {
            handlePomodoroCycleEnd();
            return;
        }

        updatePomodoroDisplay();
    }, 1000);
}

function pausePomodoro() {
    if (!pomodoroState.running) return;

    clearInterval(pomodoroState.intervalId);
    pomodoroState.running = false;
    toggleTimerButtons();
}

function resetPomodoro() {
    clearInterval(pomodoroState.intervalId);
    pomodoroState.running = false;
    pomodoroState.mode = "focus";
    pomodoroState.secondsLeft = studiesData.pomodoro.focusMinutes * 60;

    toggleTimerButtons();
    updatePomodoroDisplay();
    updatePomodoroModeLabel();
}

function handlePomodoroCycleEnd() {
    clearInterval(pomodoroState.intervalId);
    pomodoroState.running = false;

    if (pomodoroState.mode === "focus") {
        // Registra os minutos de foco concluídos na matéria selecionada
        const select = document.querySelector("#pomodoro-subject-select");
        const subjectId = select && select.value ? Number(select.value) : null;
        const minutes = studiesData.pomodoro.focusMinutes;

        if (subjectId) {
            window.Storage.addStudyMinutes(subjectId, minutes);
            window.Storage.logStudySession(subjectId, minutes);
            renderStudiesList();
        }

        if (typeof showToast === "function") {
            showToast("Pomodoro concluído! Hora da pausa 🌸", "success");
        }

        pomodoroState.mode = "break";
        pomodoroState.secondsLeft = studiesData.pomodoro.breakMinutes * 60;
    } else {
        if (typeof showToast === "function") {
            showToast("Pausa concluída! Vamos focar de novo? 🌸", "success");
        }
        pomodoroState.mode = "focus";
        pomodoroState.secondsLeft = studiesData.pomodoro.focusMinutes * 60;
    }

    toggleTimerButtons();
    updatePomodoroDisplay();
    updatePomodoroModeLabel();
}

function updatePomodoroDisplay() {
    const timerEl = document.querySelector("#pomodoro-timer");
    if (!timerEl) return;

    const minutes = Math.floor(pomodoroState.secondsLeft / 60).toString().padStart(2, "0");
    const seconds = (pomodoroState.secondsLeft % 60).toString().padStart(2, "0");
    timerEl.textContent = `${minutes}:${seconds}`;
}

function updatePomodoroModeLabel() {
    const modeEl = document.querySelector("#pomodoro-mode");
    if (!modeEl) return;

    modeEl.textContent = pomodoroState.mode === "focus" ? "Foco" : "Pausa";
    modeEl.classList.toggle("pomodoro-mode--break", pomodoroState.mode === "break");
}

function toggleTimerButtons() {
    const startBtn = document.querySelector("#pomodoro-start");
    const pauseBtn = document.querySelector("#pomodoro-pause");

    if (startBtn) startBtn.disabled = pomodoroState.running;
    if (pauseBtn) pauseBtn.disabled = !pomodoroState.running;
}
