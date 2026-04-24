document.addEventListener('DOMContentLoaded', function() 
    const loadingScreen = document.createElement('div');
    loadingScreen.id = 'loading-screen';
    loadingScreen.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(45deg, #000000 0%, #222525 25%, #000000 50%, #09a9d1 75%, #000000 100%); background-size: 400% 400%; animation: gradientShift 8s ease infinite; display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 10000; transition: opacity 0.5s;';

    const container = document.createElement('div');
    container.style.cssText = 'width: 80%; max-width: 400px; display: flex; flex-direction: column; align-items: center;';

    const logoImg = document.createElement('img');
    logoImg.id = 'loading-logo';
    logoImg.style.cssText = 'max-width: 180px; height: auto; margin-bottom: 20px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);';

    const loadingBar = document.createElement('div');
    loadingBar.id = 'loading-bar';
    loadingBar.style.cssText = 'position: fixed; bottom: 0; left: 0; height: 4px; width: 0%; background: linear-gradient(90deg, #050505, #09a9d1); animation: loadingAnimation 2s infinite; z-index: 10001;';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes loadingAnimation {
            0% { width: 10%; }
            50% { width: 80%; }
            100% { width: 100%; }
        }
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);

    container.appendChild(logoImg);
    loadingScreen.appendChild(container);
    loadingScreen.appendChild(loadingBar);
    document.body.appendChild(loadingScreen);

    const imageList = [
        '/images/enhanced_logo.png',
    ];

    const chosenIndex = Math.floor(Math.random() * imageList.length);
    logoImg.src = imageList[chosenIndex];

    const hideLoading = function(immediate) {
        loadingScreen.classList.add('fade-out');
        loadingScreen.style.opacity = '0';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
            document.body.classList.remove('loading');
        }, immediate ? 0 : 500);
    };

    if (loadingScreen) {
        document.body.classList.add('loading');
        window.addEventListener('load', function() {
            setTimeout(function() {
                hideLoading(false);
            }, 3000);
        });
    } else {
        alert("where the loading screen at (it's probably me just being dumb)");
    }
});
