"use strict";

function initEmbed() {
  let destination = "";
  
  // Try to get URL from hash
  const hash = window.location.hash.slice(1);
  
  if (!hash) {
    console.error("No URL found in hash. Expected format: embed.html#https://example.com");
    document.getElementById('theh1').innerText = "No URL provided";
    document.getElementById('thep').innerText = "Expected format: embed.html#https://example.com";
    return;
  }
  
  try {
    // Decode the hash in case it's URL encoded
    const decodedHash = decodeURIComponent(hash);
    destination = new URL(decodedHash).toString();
  } catch (err) {
    console.error(`Bad # string or bad URL. Got error: ${err}`);
    document.getElementById('theh1').innerText = "Invalid URL";
    document.getElementById('thep').innerText = `Error: ${err.message}`;
    return;
  }

  registerSW()
    .then(() => {        
        window.open(
          __uv$config.prefix + __uv$config.encodeUrl(destination),
          "_self"
        );
    })
    .catch((err) => {
      console.error(`Encountered error: ${err}`);
      document.getElementById('theh1').innerText = "Proxy Error";
      document.getElementById('thep').innerText = `Error: ${err.message}`;
    });
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEmbed);
} else {
  initEmbed();
}
