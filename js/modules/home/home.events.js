/*
==========================================================
🌸 To Do da Pandinha
Home Events
==========================================================
*/

function homeEvents() {

    const form = document.querySelector("#home-task-form");
    const input = document.querySelector("#home-task-input");
    const errorEl = document.querySelector("#home-task-error");
    const listEl = document.querySelector("#home-task-list");

    if (form && input) {

        form.addEventListener("submit", (event) => {

            event.preventDefault();

            const title = input.value.trim();

            if (!title) {
                showTaskError(input, errorEl);
                return;
            }

            hideTaskError(input, errorEl);

            window.Storage.createTask(title);

            input.value = "";
            input.focus();

            renderTaskList();

        });

        input.addEventListener("input", () => hideTaskError(input, errorEl));

    }

    if (listEl) {

        listEl.addEventListener("click", (event) => {

            const item = event.target.closest(".task");

            if (!item) return;

            const id = Number(item.dataset.id);

            if (event.target.closest(".task__check")) {
                window.Storage.toggleTask(id);
                renderTaskList();
                return;
            }

            if (event.target.closest(".task__delete")) {
                item.classList.add("task--removing");

                window.setTimeout(() => {
                    window.Storage.deleteTask(id);
                    renderTaskList();
                }, 180);
            }

        });

    }

    const goalEditBtn = document.querySelector("#home-goal-edit-btn");
    const goalTitleRow = document.querySelector("#home-goal-title-row");
    const goalForm = document.querySelector("#home-goal-form");
    const goalInput = document.querySelector("#home-goal-input");
    const goalCancelBtn = document.querySelector("#home-goal-cancel-btn");

    if (goalEditBtn && goalForm && goalInput) {

        goalEditBtn.addEventListener("click", () => {
            goalInput.value = window.Storage.getGoalTitle(homeData.goal.defaultTitle);
            goalForm.hidden = false;
            if (goalTitleRow) goalTitleRow.hidden = true;
            goalInput.focus();
        });

        goalForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const title = goalInput.value.trim();
            if (!title) return;

            window.Storage.saveGoalTitle(title);

            goalForm.hidden = true;
            if (goalTitleRow) goalTitleRow.hidden = false;

            renderHomeGoal();
        });

        if (goalCancelBtn) {
            goalCancelBtn.addEventListener("click", () => {
                goalForm.hidden = true;
                if (goalTitleRow) goalTitleRow.hidden = false;
            });
        }

    }

}

function showTaskError(input, errorEl) {

    if (errorEl) errorEl.hidden = false;

    if (input) input.classList.add("home__task-input--error");

}

function hideTaskError(input, errorEl) {

    if (errorEl) errorEl.hidden = true;

    if (input) input.classList.remove("home__task-input--error");

}
