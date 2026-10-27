// removes garbage
function removeGarbage(classes) {
    document.querySelectorAll(classes).forEach(el => el.remove());
}

function cleanAll() {
    const path = window.location.pathname

    if (path === "/") {
        // removes all videos, shorts, and ads
        removeGarbage("ytd-rich-grid-renderer");
    }
    else if (path === "/watch") {
        // removes recommended section
        removeGarbage(".ytd-item-section-renderer, .ytd-player-legacy-desktop-watch-ads-renderer");
    }
    else if (path === "/results") {
        // removes ads and shorts from results
        removeGarbage(".style-scope ytd-ad-slot-renderer, .ytGridShelfViewModelHost");
    }
}

cleanAll();

// removes upon observing a page change
const observer = new MutationObserver(() => {
    cleanAll();
});

// watches for changes to any DOM elements
observer.observe(
    document.documentElement,
    {
        childList: true,
        subtree: true
    }
);

// YouTube can navigate between pages without a full reload, recheck periodically to catch URL changes as well
let lastUrl = location.href;

setInterval(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    cleanAll();
  }
}, 1000);