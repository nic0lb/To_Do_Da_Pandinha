// js/ui/toast.js
function showToast(message, type = "success") {
    // Procura ou cria o container de toasts
    let container = document.querySelector(".toast-container");
    if (!container) {
        container = document.createElement("div");
        container.className = "toast-container";
        document.body.appendChild(container);
    }

    // Cria o elemento do toast
    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    // Remove o toast após a animação terminar (ex: 3 segundos)
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(-20px)";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Expõe globalmente para os módulos usarem
window.showToast = showToast;