function handlePanicKey(event) {
    const panicKey = localStorage.getItem('panicKey') || '`'; 
    const panicUrl = localStorage.getItem('panicUrl') || 'https://www.google.com'; 
 
    if (event.key === panicKey) {
        event.preventDefault(); 
        window.location.href = panicUrl; 
    }
}
 
function displayCurrentPanicKey() {
    const panicKey = localStorage.getItem('panicKey') || '`';
    document.getElementById('currentPanicKey').textContent = `your key: '${panicKey}'`;
} 
function changePanicKey() {
    const instruction = document.getElementById('instruction');
    instruction.textContent = 'click any key to change:';
 
    function captureKeyPress(event) {
        const newPanicKey = event.key; 
        localStorage.setItem('panicKey', newPanicKey); 
        alert(`Panic key set to: '${newPanicKey}'`); 
 
        window.removeEventListener('keydown', captureKeyPress);
 
        instruction.textContent = `(updated, should be the key you applied it to)`;
        displayCurrentPanicKey(); 
    }
 
    window.addEventListener('keydown', captureKeyPress);
}
function displayCurrentPanicUrl() {
    const panicUrl = localStorage.getItem('panicUrl') || 'https://www.google.com'; 
    document.getElementById('currentPanicUrl').textContent = `your key: ${panicUrl}`;
    document.getElementById('panicUrlInput').value = panicUrl; 
}
function savePanicUrl() {
    const inputElement = document.getElementById('panicUrlInput');
    let newUrl = inputElement.value.trim();
    if (!newUrl) {
        alert('enter the link right');
        return;
    }
    if (!newUrl.startsWith('http://') && !newUrl.startsWith('https://')) {
        newUrl = 'https://' + newUrl;
    }
    localStorage.setItem('panicUrl', newUrl);
    alert(`url is: ${newUrl}`);
    displayCurrentPanicUrl(); 
}
window.addEventListener('keydown', handlePanicKey);

window.onload = function () {
    displayCurrentPanicKey();
    displayCurrentPanicUrl(); 
};