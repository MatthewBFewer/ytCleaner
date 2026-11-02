
let extensionEnabled = false;

let observer = null;
let navigationInterval = null;
let lastUrl = location.href;

/* ---- Extension Control ---- */

// Start the extension
function enableFeature() {
    if (extensionEnabled) return;

    extensionEnabled = true;

    console.log("ytCleaner enabled");

    // Initial cleaning
    cleanAll();

    // Observe DOM changes
    observer = new MutationObserver(() => {
        if (extensionEnabled) {
            cleanAll();
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    // Detect YouTube SPA navigation
    lastUrl = location.href;

    navigationInterval = setInterval(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            cleanAll();
        }
    }, 1000);
}

// Stop the extension
function disableFeature() {
    if (!extensionEnabled) return;

    extensionEnabled = false;

    console.log("ytCleaner disabled");

    // Stop observing DOM changes
    if (observer) {
        observer.disconnect();
        observer = null;
    }

    // Stop checking navigation
    if (navigationInterval) {
        clearInterval(navigationInterval);
        navigationInterval = null;
    }
}

/* ---- Settings ---- */

// Listen for popup changes
chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local" || !changes.enabled) return;

    if (changes.enabled.newValue) {
        enableFeature();
    } else {
        disableFeature();
    }
});

// Load saved setting
async function initialize() {
    try {
        const settings = await chrome.storage.local.get({
            enabled: true
        });

        if (settings.enabled) {
            enableFeature();
        }
    } catch (error) {
        console.error("ytCleaner settings error:", error);
    }
}

initialize();

/* ---- Webpage modification ---- */

// Removes garbage
function removeGarbage(classes) {
    document.querySelectorAll(classes).forEach(el => el.remove());
}

function cleanAll() {
    if (!extensionEnabled) return;

    const path = window.location.pathname;

    if (path === "/") {
        // Removes all videos, shorts, and ads
        removeGarbage("ytd-rich-grid-renderer");
    }
    else if (path === "/watch") {
        // Removes recommended section
        removeGarbage(
            ".ytd-item-section-renderer, .ytd-player-legacy-desktop-watch-ads-renderer"
        );
    }
    else if (path === "/results") {
        // Removes ads and shorts from results
        removeGarbage(
            ".style-scope ytd-ad-slot-renderer, .ytGridShelfViewModelHost"
        );
    }
}
