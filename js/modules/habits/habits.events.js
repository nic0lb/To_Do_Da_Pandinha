/*
==========================================================
🌸 To Do da Pandinha
Habits Events
==========================================================
*/

function habitsEvents() {

    const listEl = document.querySelector("#habits-list");

    if (listEl) {
        listEl.addEventListener("click", (event) => {
            const item = event.target.closest(".habit");
            if (!item) return;

            const id = Number(item.dataset.id);

            if (event.target.closest(".habit__check")) {
                item.classList.toggle("habit--done");
                updateHabitStreak(id);
            }

            if (event.target.closest(".habit__delete")) {
                item.classList.add("habit--removing");
                setTimeout(() => {
                    removeHabit(id);
                    renderHabitsList();
                }, 180);
            }
        });
    }

}

function renderHabitsList() {
    const listEl = document.querySelector("#habits-list");
    if (!listEl) return;

    const habits = getHabits();
    listEl.innerHTML = habits.map(habitItemTemplate).join("") || `
        <li class="habits-empty">Nenhum hábito ainda. Que tal adicionar um? 🌸</li>
    `;
}

function habitItemTemplate(habit) {
    return `
        <li class="habit ${habit.completed ? "habit--done" : ""}" data-id="${habit.id}">
            <button type="button" class="habit__check" aria-label="Toggle habit"></button>
            <div class="habit__content">
                <span class="habit__emoji">${habit.emoji}</span>
                <div>
                    <span class="habit__title">${habit.title}</span>
                    <span class="habit__streak">🔥 ${habit.streak} dias</span>
                </div>
            </div>
            <button type="button" class="habit__delete" aria-label="Delete habit">✕</button>
        </li>
    `;
}

function getHabits() {
    const stored = localStorage.getItem('habits');
    return stored ? JSON.parse(stored) : habitsData.defaultHabits;
}

function saveHabits(habits) {
    localStorage.setItem('habits', JSON.stringify(habits));
}

function updateHabitStreak(id) {
    const habits = getHabits();
    const habit = habits.find(h => h.id === id);
    if (habit) {
        habit.streak = (habit.streak || 0) + 1;
        saveHabits(habits);
    }
}

function removeHabit(id) {
    const habits = getHabits().filter(h => h.id !== id);
    saveHabits(habits);
}
