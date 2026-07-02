/*
==========================================================
🌸 To Do da Pandinha
Planner Data (CRUD + localStorage)
==========================================================
*/

const PLANNER_STORAGE_KEY = "panda_planner";

/**
 * Dias da semana usados para agrupar os planos.
 */
const plannerData = {
    days: [
        { id: "seg", label: "Segunda-feira" },
        { id: "ter", label: "Terça-feira" },
        { id: "qua", label: "Quarta-feira" },
        { id: "qui", label: "Quinta-feira" },
        { id: "sex", label: "Sexta-feira" },
        { id: "sab", label: "Sábado" },
        { id: "dom", label: "Domingo" }
    ],

    // Blocos de horário sugeridos (usados como atalho no formulário)
    timeBlocks: [
        { id: "manha", label: "🌅 Manhã" },
        { id: "tarde", label: "☀️ Tarde" },
        { id: "noite", label: "🌙 Noite" }
    ]
};

/* ----------------------------------------------------------
   Funções de Base (localStorage)
---------------------------------------------------------- */

function getPlans() {
    const stored = localStorage.getItem(PLANNER_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

function savePlans(plans) {
    localStorage.setItem(PLANNER_STORAGE_KEY, JSON.stringify(plans));
}

/**
 * Cria um novo plano/compromisso associado a um dia da semana.
 * @param {{title:string, day:string, block:string, time:string}} plan
 */
function createPlan({ title, day, block = "manha", time = "" }) {
    const plans = getPlans();

    const newPlan = {
        id: Date.now(),
        title,
        day,
        block,
        time,
        done: false,
        createdAt: new Date().toISOString()
    };

    plans.push(newPlan);
    savePlans(plans);
    return newPlan;
}

function togglePlan(id) {
    const plans = getPlans();
    const updated = plans.map(plan =>
        plan.id === id ? { ...plan, done: !plan.done } : plan
    );
    savePlans(updated);
    return updated.find(p => p.id === id);
}

function deletePlan(id) {
    const plans = getPlans().filter(plan => plan.id !== id);
    savePlans(plans);
}

/**
 * Retorna os planos de um dia específico, ordenados por bloco de horário.
 */
function getPlansByDay(dayId) {
    const order = { manha: 0, tarde: 1, noite: 2 };
    return getPlans()
        .filter(plan => plan.day === dayId)
        .sort((a, b) => (order[a.block] ?? 99) - (order[b.block] ?? 99));
}

// Vincula ao escopo global para os demais arquivos do módulo
window.plannerData = plannerData;
window.getPlans = getPlans;
window.savePlans = savePlans;
window.createPlan = createPlan;
window.togglePlan = togglePlan;
window.deletePlan = deletePlan;
window.getPlansByDay = getPlansByDay;
