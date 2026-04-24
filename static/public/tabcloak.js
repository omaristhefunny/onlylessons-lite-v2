(function () {
    const CLOAK_OPTIONS = {
        quizlet:            { title: "Your Sets | Quizlet",          favicon: "https://quizlet.com/favicon.ico" },
        google:             { title: "Google",                        favicon: "https://www.google.com/favicon.ico" },
        "google-classroom": { title: "Home | Google Classroom",      favicon: "https://ssl.gstatic.com/classroom/favicon.png" },
        "google-docs":      { title: "Google Docs",                   favicon: "https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico" },
        "khan-academy":     { title: "Khan Academy",                  favicon: "https://www.khanacademy.org/favicon.ico" },
        wikipedia:          { title: "Wikipedia",                     favicon: "https://en.wikipedia.org/favicon.ico" },
        youtube:            { title: "YouTube",                       favicon: "https://www.youtube.com/favicon.ico" },
        outlook:            { title: "Inbox - Outlook",               favicon: "https://outlook.live.com/favicon.ico" },
        "ixl":              { title: "IXL | Math, Language Arts, Science, Social Studies, and Spanish", favicon: "https://www.ixl.com/favicon.ico" }    
    };

    const key = localStorage.getItem("tabCloak") || "quizlet";
    const opt = CLOAK_OPTIONS[key] || CLOAK_OPTIONS["quizlet"];

    document.title = opt.title;

    function setFavicon(href) {
        document.querySelectorAll("link[rel~='icon'], link[rel~='shortcut']").forEach(el => el.remove());
        const link = document.createElement("link");
        link.rel  = "icon";
        link.type = "image/x-icon";
        link.href = href;
        document.head.appendChild(link);
    }

    if (document.head) {
        setFavicon(opt.favicon);
    } else {
        document.addEventListener("DOMContentLoaded", () => setFavicon(opt.favicon));
    }
})();