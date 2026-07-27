// Enregistrement du Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
        try {
            const registration = await navigator.serviceWorker.register("./service-worker.js");

            console.log("✅ Service Worker enregistré :", registration.scope);

        } catch (error) {
            console.error("❌ Erreur Service Worker :", error);
        }
    });
}
