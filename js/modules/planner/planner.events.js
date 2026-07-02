/*
==========================================================
🌸 To Do da Pandinha
Planner Events
==========================================================
*/

function plannerEvents() {

    const form = document.querySelector("#planner-form");
    const input = document.querySelector("#planner-input");
    const daySelect = document.querySelector("#planner-day-select");
    const blockSelect = document.querySelector("#planner-block-select");
    const timeInput = document.querySelector("#planner-time-input");
    const daysContainer = document.querySelector("#planner-days");

    if (form && input) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const title = input.value.trim();

            if (!title) {
                if (typeof showToast === "function") {
                    showToast("Escreve o que vamos planejar, Pandinha! 🌸", "warning");
                } else {
                    alert("Escreve o que vamos planejar, Pandinha! 🌸");
                }
                return;
            }

            createPlan({
                title,
                day: daySelect?.value || "seg",
                block: blockSelect?.value || "manha",
                time: timeInput?.value || ""
            });

            input.value = "";
            if (timeInput) timeInput.value = "";
            input.focus();

            renderPlannerDays();
        });
    }

    if (daysContainer) {
        daysContainer.addEventListener("click", (event) => {
            const item = event.target.closest(".planner-item");
            if (!item) return;

            const id = Number(item.dataset.id);

            if (event.target.closest(".planner-item__check")) {
                togglePlan(id);
                renderPlannerDays();
                return;
            }

            if (event.target.closest(".planner-item__delete")) {
                item.classList.add("planner-item--removing");
                setTimeout(() => {
                    deletePlan(id);
                    renderPlannerDays();
                }, 180);
            }
        });
    }
}

/**
 * Re-renderiza apenas a grade dos dias (sem recriar o formulário).
 */
function renderPlannerDays() {
    const daysContainer = document.querySelector("#planner-days");
    if (!daysContainer) return;

    daysContainer.innerHTML = plannerWeekTemplate();
}
