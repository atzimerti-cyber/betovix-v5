import { useEffect, useRef } from "react";

function ScriptInjector({ scriptStrings }) {
  useEffect(() => {
    function injectScripts() {
      scriptStrings.forEach((scriptString) => {
        // Create a temporary div to parse the script string
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = scriptString;
       // document.body.appendChild(tempDiv);

        // Extract the script tag from the tempDiv
        const divTag = tempDiv.querySelector("div");
        if(divTag) {
          document.body.appendChild(divTag);
        }
        const scriptTag = tempDiv.querySelector("script");

        if (scriptTag) {
          // Create a new script element
          const newScript = document.createElement("script");

          // Copy the src attribute if present
          if (scriptTag.src) {
            newScript.src = scriptTag.src;
          }

          // Copy the inline script content if present using textContent
          if (scriptTag.textContent) {
            newScript.textContent = scriptTag.textContent;
          }

          // Append the script to the targetRef (which points to the TawkTo div)
          // if (targetRef.current) {
          //   targetRef.current.appendChild(newScript);
          // }

          document.body.appendChild(scriptTag);
        }
      });
    }

    injectScripts();
  }, []);

  return null;
}

export default ScriptInjector;
