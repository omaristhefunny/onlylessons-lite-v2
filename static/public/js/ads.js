(function () {
  const partnerScript = document.createElement("script");
  partnerScript.async = true;
  document.head.appendChild(partnerScript);
  
  const adsEnabled = localStorage.getItem("adsEnabled");
  const isAdsOn = adsEnabled === null ? true : adsEnabled === "true";
  
  if (isAdsOn) {
    const appendAdScripts = () => {
      // First ad source disabled for now.
      // const adScript1 = document.createElement("script");
      // adScript1.type = "text/javascript";
      // adScript1.src = "https://pl28535093.effectivegatecpm.com/aa/03/cb/aa03cb5003372c000be360e36afdb58b.js";
      // adScript1.async = true;
      // document.body.appendChild(adScript1);
      
      // Second ad source with configuration
      // window.atOptions = {
      //   'key': 'c7dfed4b3c08c7aecf16d463f4357a7b',
      //   'format': 'iframe',
      //   'height': 300,
      //   'width': 160,
      //   'params': {}
      // };
      
      const adScript2 = document.createElement("script");
      adScript2.src = "https://pl28535093.effectivegatecpm.com/aa/03/cb/aa03cb5003372c000be360e36afdb58b.js";
      adScript2.async = true;
      document.body.appendChild(adScript2);
    };
    
    if (document.body) {
      appendAdScripts();
    } else {
      document.addEventListener("DOMContentLoaded", appendAdScripts);
    }
  } else {
    console.log("Ads disabled.");
  }
})();