function ScriptHeadInjector(scriptString) {
  if (!scriptString) return; // Prevent running if scriptString is empty

  // Create a temporary div to parse the script
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = scriptString;

  // Select all script tags
  const scriptTags = tempDiv.querySelectorAll("script");

  scriptTags.forEach((scriptTag) => {
    const newScript = document.createElement("script");

    // Copy src if available
    if (scriptTag.src) {
      newScript.async = true;
      newScript.src = scriptTag.src;
    }

    // Copy inline script content if available
    if (scriptTag.textContent) {
      newScript.textContent = scriptTag.textContent;
    }

    // Append to <head>
    document.head.appendChild(newScript);
  });
}

export default ScriptHeadInjector;
