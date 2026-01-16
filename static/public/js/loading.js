document.addEventListener('DOMContentLoaded', function() {
    // Check for a forced video override via a custom key
    const forcedVideo = localStorage.getItem('forceVideoOverride');
    if (forcedVideo) {
        if (forcedVideo === 'tripleT.mp4') {
            localStorage.setItem('forcetripleT', 'true');
        }
        localStorage.removeItem('forceVideoOverride');
        location.reload();
        return;
    }

    // Create loading screen elements dynamically
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 10000; transition: opacity 0.5s;';

    const container = document.createElement('div');
    container.style.cssText = 'width: 80%; max-width: 400px; display: flex; flex-direction: column; align-items: center;';

    const messageforyou = document.createElement('div');
    messageforyou.id = 'messageforyou';
    messageforyou.style.cssText = 'color: #FF8C00; text-align: center; margin-bottom: 20px; font-size: 18px;';

    const ninentyeightyone = document.createElement('video');
    ninentyeightyone.id = 'special-video';
    ninentyeightyone.style.cssText = 'display: none; max-width: 90%; max-height: 60vh; margin-bottom: 20px; border: 2px solid #FF8C00; border-radius: 10px;';
    ninentyeightyone.controls = true;
    ninentyeightyone.autoplay = true;

    const loadingSpinner = document.createElement('div');
    loadingSpinner.id = 'loading-spinner';
    loadingSpinner.style.cssText = 'width: 50px; height: 50px; border: 5px solid rgba(255, 140, 0, 0.2); border-top: 5px solid #FF8C00; border-radius: 50%; animation: spin 1s linear infinite;';

    const dabottom = document.createElement('div');
    dabottom.id = 'dabottom';
    dabottom.style.cssText = 'display: none; margin-top: 20px; color: #FF3B3B;';
    dabottom.textContent = 'this is TAKING TOO LONG.';

    // Skip button (hidden initially)
    const skipBtn = document.createElement('button');
    skipBtn.id = 'loading-skip-btn';
    skipBtn.textContent = 'Skip';
    skipBtn.style.cssText = 'display: none; margin-top: 16px; padding: 6px 18px; font-size: 15px; background: #000000; border: 2px solid #ff7b00; border-radius: 6px; color: #ff7b00; font-family: Quicksand, sans-serif; cursor: pointer;';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    container.appendChild(messageforyou);
    container.appendChild(ninentyeightyone);
    container.appendChild(loadingSpinner);
    container.appendChild(skipBtn);
    loadingScreen.appendChild(container);
    loadingScreen.appendChild(dabottom);
    document.body.appendChild(loadingScreen);

    const randomtextstuff = [
        "wat 4 lunch teach",
        "ANYTHING but the work",
        "The F students are inventors.",
        "ContentKeeper is probably the worst filter EVER made.",
        "'i would CRACK frogiee, anything for those links' - oofer",
        "5/13 is my birthday",
        "if you think your friends are doing way too much for your liking, always remember to take a break. (i'm being serious)",
        "why is it always at night when i write these dumb messages",
        "DOI DOI DOI",
        "🟨🟦🟥 remind you vocaloid fans of anything?",
        "TV girl on top - [previous dev that i will not name]",
        "We live in a simulation. Wake up.",
        "freakbob!",
        "what do you know bout ultrakill? - root",
        "GET OFF THE GAME AND TAKE A SHOWER.",
        "hi brochacho",
        "hi",
        "also try ultrakill",
        "did you know?",
        "WE (as in ME and YOU yes YOU brotein shake) love kernel's arcade",
        "sybau",
        "this is the most useless message you will read today.",
        "miku get off my wifi for fuck sake 'no :3 - miku' GET OUT MY WIFI DASHDIASHDISUHIDSAH",
        "ka v3 when?",
        "meow",
        "caddy, you take care of the https. node? you handle hosting ultraviolet and the website. cloudflare? make sure ts doesnt get taken down. and debian? you just be you. together, we are kernel's arcade!!!!!!",
        "'money money green green money is all i need need' real shit",
        "this website goated twin",
        "won't turn your chromebook into a pile of dust",
        "fuckass blockers 💔💔💔💔💔💔",
        "*Akita Neru giving YOU (yes i'm talking to YOU) BACKSHOTS* YOU: \"w-wait!... n-not in front of other people~...\" Akita Neru: \"it's okay, let them watch... let them know you're mine.\" gurt: \"wtf 💔💔💔\"",
        "meow :3",
        "doing ANYTHING but fixing the proxy atp - kernel",
        "stay hydrated brotato",
        "fuckass high school STILL has chromebooks for each class 💔💔💔💔💔",
        "linewize kinda sucks ngl",
        "the cake is a lie",
        "please dont destroy the viral testing apparatus. - glados",
        "whatu is very cool :3",
        "trans rights are human rights!!!!!!!!!!!!!!!! - aubree",
        "reminder to glaze frogiee1 for being very cool",
        "Lets take a look... 👀 👀 👀 👀 👀 👀",
        "shh, they dont know about this trick... I HAVE A GUN :D",
        "I love my bf so MUUUCHHH AHHH <3 - aubree",
        "endis",
        "son you do not know triple t like dat",
        "if you leak ANY of my links i will find you. you won't wake up the next day. - kernel (corny ass)",
        "if you have 4 or more filters, just go ahead and wrap it up for me. IM TALKING ABOUT YOU OOFER.",
        "son",
        "reminder that solo (roman easton) is a 13 year old who thinks hes god having my address as blackmail when hes just a larp skid loser with no life and has cp on his drive. (BARS 🗣️🔥)"
    ];
    const didYouKnow = randomtextstuff.findIndex(msg => msg.includes("son"));

    let chosenIndex;
    let videoSrc = null;
    if (localStorage.getItem('forcetripleT') === 'true') {
        chosenIndex = didYouKnow;
        videoSrc = "images/tripleT.mp4";
        localStorage.removeItem('forcetripleT');
    } else {
        chosenIndex = Math.floor(Math.random() * randomtextstuff.length);
        // If random is didYouKnow, set videoSrc accordingly
        if (chosenIndex === didYouKnow) videoSrc = "images/tripleT.mp4";
    }

    let videoPlaying = false;

    function hideLoading(immediate) {
        loadingScreen.classList.add('fade-out');
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            document.body.classList.remove('loading');
            // stop and unload video if playing
            try {
                if (!ninentyeightyone.paused) ninentyeightyone.pause();
                ninentyeightyone.src = '';
            } catch (e) {}
        }, immediate ? 0 : 500);
    }

    if (loadingScreen) {
        messageforyou.innerText = randomtextstuff[chosenIndex];

        if (videoSrc) {
            videoPlaying = true;
            ninentyeightyone.src = videoSrc;
            ninentyeightyone.style.display = "block";
            ninentyeightyone.play().catch(err => {
                console.log("Autoplay blocked, user interaction required");
            });
            ninentyeightyone.addEventListener('ended', function() {
                hideLoading(false);
            });
            // show skip button while video is available
            skipBtn.style.display = 'inline-block';
        }

        // If loading takes too long, reveal the warning and skip button
        const slowTimeout = setTimeout(function() {
            dabottom.style.display = null;
            skipBtn.style.display = 'inline-block';
        }, 7000);

        skipBtn.addEventListener('click', function() {
            clearTimeout(slowTimeout);
            hideLoading(false);
        });

        document.body.classList.add('loading');
        window.addEventListener('load', function() {
            if (!videoPlaying) {
                setTimeout(function() {
                    hideLoading(false);
                }, 100);
            }
        });
    } else {
        alert("where the loading screen at (it's probably me just being dumb)");
    }
});
            videoPlaying = true;
