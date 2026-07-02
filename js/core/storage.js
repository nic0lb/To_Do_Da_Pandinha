/*
==========================================================
🌸 To Do da Pandinha
Core Storage System (Atualizado com Criação de Hábitos)
==========================================================
*/

const STORAGE_KEYS = {
    TASKS: "panda_tasks",
    HABITS: "panda_habits",
    GOALS: "panda_goals",
    SETTINGS: "panda_settings",
    STUDY_SUBJECTS: "panda_study_subjects",
    STUDY_SESSIONS: "panda_study_sessions",
    HOME_GOAL_TITLE: "panda_home_goal_title"
};

// --- Funções Auxiliares de Base ---
function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

function setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// --- Gerenciamento de TAREFAS ---
function getTasks() {
    return getData(STORAGE_KEYS.TASKS) || [];
}

function saveTasks(tasks) {
    setData(STORAGE_KEYS.TASKS, tasks);
}

function createTask(title, category = 'pessoal') {
    const tasks = getTasks();
    const newTask = {
        id: Date.now(),
        title,
        category,
        completed: false,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
}

function toggleTask(id) {
    const tasks = getTasks();
    const updated = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks(updated);
}

function deleteTask(id) {
    const tasks = getTasks().filter(task => task.id !== id);
    saveTasks(tasks);
}

// --- Gerenciamento de HÁBITOS ---
function getHabits() {
    let habits = getData(STORAGE_KEYS.HABITS);
    
    // Se não houver hábitos salvos ainda, popula com os padrões fofos da Pandinha
    if (!habits) {
        habits = [
            { id: 1, title: "Beber 2L de água", icon: "💧", streak: 5, completedToday: false },
            { id: 2, title: "Ler 10 páginas", icon: "📖", streak: 3, completedToday: true },
            { id: 3, title: "Alongamento matinal", icon: "🧘", streak: 7, completedToday: false }
        ];
        setData(STORAGE_KEYS.HABITS, habits);
    }
    return habits;
}

function saveHabits(habits) {
    setData(STORAGE_KEYS.HABITS, habits);
}

function createHabit(title, icon = "✨") {
    const habits = getHabits();
    const newHabit = {
        id: Date.now(),
        title,
        icon: icon || "✨",
        streak: 0,
        completedToday: false
    };
    habits.push(newHabit);
    saveHabits(habits);
    return newHabit;
}

function toggleHabit(id) {
    const habits = getHabits();
    const updated = habits.map(habit => {
        if (habit.id === id) {
            const completedToday = !habit.completedToday;
            const streak = completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1);
            return { ...habit, completedToday, streak };
        }
        return habit;
    });
    saveHabits(updated);
    return updated.find(h => h.id === id);
}


// --- Gerenciamento de ESTUDOS ---
function getStudySubjects() {
    let subjects = getData(STORAGE_KEYS.STUDY_SUBJECTS);

    // Popula com matérias padrão na primeira execução
    if (!subjects) {
        subjects = [
            { id: 1, title: "Matemática", icon: "🧮", studiedToday: false, minutes: 0 },
            { id: 2, title: "Português", icon: "📝", studiedToday: false, minutes: 0 },
            { id: 3, title: "Inglês", icon: "🌍", studiedToday: false, minutes: 0 }
        ];
        setData(STORAGE_KEYS.STUDY_SUBJECTS, subjects);
    }
    return subjects;
}

function saveStudySubjects(subjects) {
    setData(STORAGE_KEYS.STUDY_SUBJECTS, subjects);
}

function createStudySubject(title, icon = "📚") {
    const subjects = getStudySubjects();
    const newSubject = {
        id: Date.now(),
        title,
        icon: icon || "📚",
        studiedToday: false,
        minutes: 0
    };
    subjects.push(newSubject);
    saveStudySubjects(subjects);
    return newSubject;
}

function toggleStudySubject(id) {
    const subjects = getStudySubjects();
    const updated = subjects.map(subject =>
        subject.id === id ? { ...subject, studiedToday: !subject.studiedToday } : subject
    );
    saveStudySubjects(updated);
    return updated.find(s => s.id === id);
}

function deleteStudySubject(id) {
    const subjects = getStudySubjects().filter(subject => subject.id !== id);
    saveStudySubjects(subjects);
}

/**
 * Adiciona minutos estudados a uma matéria (usado pelo pomodoro).
 */
function addStudyMinutes(id, minutes) {
    const subjects = getStudySubjects();
    const updated = subjects.map(subject =>
        subject.id === id ? { ...subject, minutes: (subject.minutes || 0) + minutes } : subject
    );
    saveStudySubjects(updated);
    return updated.find(s => s.id === id);
}

/**
 * Registra uma sessão de estudo concluída (histórico simples de pomodoros).
 */
function logStudySession(subjectId, minutes) {
    const sessions = getData(STORAGE_KEYS.STUDY_SESSIONS) || [];
    sessions.push({
        id: Date.now(),
        subjectId,
        minutes,
        completedAt: new Date().toISOString()
    });
    setData(STORAGE_KEYS.STUDY_SESSIONS, sessions);
    return sessions;
}

function getStudySessions() {
    return getData(STORAGE_KEYS.STUDY_SESSIONS) || [];
}

/**
 * Soma total de minutos estudados (todas as matérias, todas as sessões).
 */
function getTotalStudyMinutes() {
    return getStudySessions().reduce((total, session) => total + (session.minutes || 0), 0);
}

// --- Gerenciamento do FOCO DA SEMANA (Home) ---
function getGoalTitle(defaultTitle = "") {
    const stored = getData(STORAGE_KEYS.HOME_GOAL_TITLE);
    return stored || defaultTitle;
}

function saveGoalTitle(title) {
    setData(STORAGE_KEYS.HOME_GOAL_TITLE, title);
}

// --- Exportação Global para o Sistema ---
window.Storage = {
    // Tarefas
    getTasks,
    createTask,
    toggleTask,
    deleteTask,
    // Hábitos
    getHabits,
    saveHabits,
    createHabit,
    toggleHabit,
    // Estudos
    getStudySubjects,
    saveStudySubjects,
    createStudySubject,
    toggleStudySubject,
    deleteStudySubject,
    addStudyMinutes,
    logStudySession,
    getStudySessions,
    getTotalStudyMinutes,
    // Foco da semana (Home)
    getGoalTitle,
    saveGoalTitle
};