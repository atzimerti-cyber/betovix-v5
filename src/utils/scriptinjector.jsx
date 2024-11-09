// import React, { useEffect } from "react";

// function ScriptInjector({ scriptStrings }) {
//   useEffect(() => {
//     // Function to inject the scripts
//     function injectScripts() {
//       scriptStrings.forEach((scriptString) => {
//         // Create a temporary div to parse the script string
//         const tempDiv = document.createElement("div");
//         tempDiv.innerHTML = scriptString;

//         // Extract the script element from the tempDiv
//         const scriptTag = tempDiv.querySelector("script");

//         if (scriptTag) {
//           // Create a new script element
//           const newScript = document.createElement("script");

//           // Copy the src attribute if present
//           if (scriptTag.src) {
//             newScript.src = scriptTag.src;
//           }

//           // Copy the inline script content if present
//           if (scriptTag.innerHTML) {
//             newScript.innerHTML = scriptTag.innerHTML;
//           }

//           // Append the script to the body
//           document.body.appendChild(newScript);
//         }
//       });
//     }

//     injectScripts();
//   }, [scriptStrings]); // Dependency array to run effect when scriptStrings changes

//   return null;
// }

// export default ScriptInjector;

import React, { useEffect } from "react";

function ScriptInjector({ scriptStrings }) {
  useEffect(() => {
    function injectScripts() {
      scriptStrings.forEach((scriptString) => {
        // Create a temporary div to parse the script string
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = scriptString;

        // Extract the script element from the tempDiv
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

          // Append the script to the body
          document.body.appendChild(newScript);
        }
      });
    }

    injectScripts();
  }, [scriptStrings]);

  return null;
}

export default ScriptInjector;
