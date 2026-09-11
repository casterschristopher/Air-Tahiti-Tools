/* Air Tahiti Tools — Home interactions */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".is-coming").forEach(card => {
        card.addEventListener("click", event => {
            event.preventDefault();
        });
    });
});
