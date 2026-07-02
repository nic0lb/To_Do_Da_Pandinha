/*
==========================================================
🌸 To Do da Pandinha
Home Data
==========================================================
*/

const homeData = {

    greetings: [
        "Bom dia, Pandinha 🌸",
        "Oi, Pandinha 💛",
        "Que bom te ver hoje 🌿",
        "Olá, Pandinha 🐼",
        "Pronta para um dia leve? 🌸"
    ],

    messages: [
        "Que bom te ver por aqui. Vamos com calma hoje?",
        "Hoje pode ser leve. Sem pressa.",
        "Um passo de cada vez já é suficiente.",
        "Você não precisa fazer tudo hoje.",
        "Vamos organizar sem cobrança?"
    ],

    thoughts: [
        "Até os pandas descansam bastante durante o dia.",
        "Uma página lida já é progresso.",
        "Respirar também faz parte do caminho.",
        "Você não precisa correr.",
        "Hoje também conta."
    ],

    goal: {
        // Usado apenas na primeira visita, antes do usuário definir o próprio foco
        defaultTitle: "Aproveitar as férias com equilíbrio"
    }
};

/**
 * Calcula o progresso do "foco da semana" combinando:
 * - % de tarefas concluídas criadas nos últimos 7 dias
 * - % de hábitos concluídos hoje
 *
 * Quando uma das fontes não tem dados, usa apenas a outra.
 * Quando nenhuma tem dados, retorna 0.
 */
function computeWeeklyFocusProgress() {
    const tasks = window.Storage.getTasks();
    const habits = window.Storage.getHabits();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentTasks = tasks.filter(task => {
        if (!task.createdAt) return false;
        return new Date(task.createdAt) >= sevenDaysAgo;
    });

    const tasksProgress = recentTasks.length > 0
        ? Math.round((recentTasks.filter(t => t.completed).length / recentTasks.length) * 100)
        : null;

    const habitsProgress = habits.length > 0
        ? Math.round((habits.filter(h => h.completedToday).length / habits.length) * 100)
        : null;

    if (tasksProgress === null && habitsProgress === null) return 0;
    if (tasksProgress === null) return habitsProgress;
    if (habitsProgress === null) return tasksProgress;

    return Math.round((tasksProgress + habitsProgress) / 2);
}