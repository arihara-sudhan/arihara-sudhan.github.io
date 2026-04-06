(function () {
    if (window.pageLoader || !document.body) {
        return;
    }

    const overlay = document.createElement("div");
    overlay.className = "page-loader-overlay";
    overlay.innerHTML = `
        <div class="page-loader-content">
            <div class="page-loader-spinner" aria-hidden="true"></div>
            <p class="page-loader-text">Loading...</p>
        </div>
    `;

    const body = document.body;
    body.classList.add("page-loader-open");
    body.appendChild(overlay);

    let pageReady = false;
    let windowLoaded = document.readyState === "complete";
    let hidden = false;

    function hide() {
        if (hidden || !pageReady || !windowLoaded) {
            return;
        }

        hidden = true;
        overlay.classList.add("is-hidden");
        body.classList.remove("page-loader-open");
        window.setTimeout(() => overlay.remove(), 300);
    }

    window.pageLoader = {
        markReady() {
            pageReady = true;
            hide();
        },
        forceHide() {
            pageReady = true;
            windowLoaded = true;
            hide();
        }
    };

    window.addEventListener("load", () => {
        windowLoaded = true;
        hide();
    });

    window.setTimeout(() => {
        window.pageLoader.forceHide();
    }, 10000);
})();
