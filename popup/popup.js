
const toggle = document.getElementById("enabled");
const statusText = document.getElementById("status");

async function initialize() {
    try {
        const settings = await chrome.storage.local.get({
            enabled: true
        });

        toggle.checked = settings.enabled;
        updateStatus(settings.enabled);
    } catch (error) {
        console.error("Failed to load settings:", error);
        statusText.textContent = "Failed to load settings";
    }
}

toggle.addEventListener("change", async () => {
    const enabled = toggle.checked;

    try {
        await chrome.storage.local.set({ enabled });
        updateStatus(enabled);
    } catch (error) {
        console.error("Failed to save settings:", error);

        // Revert the switch if saving fails
        toggle.checked = !enabled;
        updateStatus(!enabled);
    }
});

function updateStatus(enabled) {
    statusText.textContent = enabled
        ? "Currently active"
        : "Currently disabled";
}

initialize();