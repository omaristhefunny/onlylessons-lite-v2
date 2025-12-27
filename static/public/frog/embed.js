"use strict";

function initEmbed() {
  let destination = "";
  
 
  const hash = window.location.hash.slice(1);
  
  if (!hash) {
    console.error("hey twin, sum went wrong here. heres how to do the thing embed.html#https://example.com");
    document.getElementById('theh1').innerText = "no url found. if this is unexpected, report to @suntree.network on discord.";
    document.getElementById('thep').innerText = "expected format: embed.html#https://example.com";
    return;
  }
  
  try {
    const decodedHash = decodeURIComponent(hash);
    destination = new URL(decodedHash).toString();
  } catch (err) {
    console.error(`Bad # string or bad URL. Got error: ${err}`);
    document.getElementById('theh1').innerText = "invalid url, unable to load. if this is unexpected, report to @suntree.network on discord.";
    document.getElementById('thep').innerText = `error: ${err.message}`;
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


if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initEmbed);
} else {
  initEmbed();
}
