(function() {
    console.log('Custom colors script loaded');
    var DEFAULT_COLORS = {
        accent: '#87CEEB',
        text: '#FFFFFF',
        bg: '#121212'
    };

    function getCustomColors() {
        return {
            accent: localStorage.getItem('customAccentColor') || DEFAULT_COLORS.accent,
            text: localStorage.getItem('customTextColor') || DEFAULT_COLORS.text,
            bg: localStorage.getItem('customBgColor') || DEFAULT_COLORS.bg
        };
    }

    function hexToRgba(hex, alpha) {
        var r = parseInt(hex.slice(1, 3), 16);
        var g = parseInt(hex.slice(3, 5), 16);
        var b = parseInt(hex.slice(5, 7), 16);
        return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
    }

    function applyColors() {
        var colors = getCustomColors();
        console.log('Applying colors:', colors);
        
        var styleEl = document.getElementById('custom-colors-style');
        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = 'custom-colors-style';
            document.head.appendChild(styleEl);
        }

        styleEl.textContent = 
            'body { background: ' + colors.bg + ' !important; }' +
            'a { color: ' + colors.accent + ' !important; }' +
            'button { color: ' + colors.accent + ' !important; background: ' + hexToRgba(colors.accent, 0.15) + ' !important; border-color: ' + hexToRgba(colors.accent, 0.3) + ' !important; }' +
            'h1, h2, h3, h4, h5, h6, .card-title, .page-title { color: ' + colors.accent + ' !important; }' +
            '.navbar { background-color: rgba(0,0,0,0.95) !important; border-bottom-color: ' + hexToRgba(colors.accent, 0.3) + ' !important; }' +
            '.navbar a, .dropdown-toggle, .nav-icon, .logo-text { color: ' + colors.accent + ' !important; }' +
            '.navbar a:hover, .dropdown-toggle:hover { background: ' + hexToRgba(colors.accent, 0.15) + ' !important; }' +
            '.dropdown-menu { background: rgba(0,0,0,0.98) !important; border-color: ' + hexToRgba(colors.accent, 0.3) + ' !important; }' +
            '.settings-card, .card-icon { background: ' + hexToRgba(colors.accent, 0.05) + ' !important; border-color: ' + hexToRgba(colors.accent, 0.15) + ' !important; }' +
            '.setting-label, .card-desc { color: ' + hexToRgba(colors.text, 0.7) + ' !important; }' +
            'input, textarea, select { background: ' + hexToRgba(colors.accent, 0.05) + ' !important; color: ' + colors.accent + ' !important; border-color: ' + hexToRgba(colors.accent, 0.2) + ' !important; }' +
            '.setting-btn { background: ' + hexToRgba(colors.accent, 0.1) + ' !important; color: ' + colors.accent + ' !important; border-color: ' + hexToRgba(colors.accent, 0.3) + ' !important; }' +
            '.setting-btn:hover { background: ' + hexToRgba(colors.accent, 0.2) + ' !important; }' +
            '.toggle-slider { background: ' + hexToRgba(colors.accent, 0.1) + ' !important; border-color: ' + hexToRgba(colors.accent, 0.2) + ' !important; }' +
            '.toggle-switch input:checked + .toggle-slider { background: ' + hexToRgba(colors.accent, 0.3) + ' !important; }' +
            '.toggle-slider::before { background: ' + colors.accent + ' !important; }' +
            '.color-preset { border-color: transparent !important; }' +
            '.color-preset:hover { border-color: ' + colors.accent + ' !important; }' +
            '.color-preset.selected { border-color: ' + colors.text + ' !important; }' +
            '::placeholder { color: ' + hexToRgba(colors.accent, 0.4) + ' !important; }';
    }

    applyColors();

    window.applyCustomColors = function() {
        applyColors();
    };

    window.getCustomColors = getCustomColors;
})();
