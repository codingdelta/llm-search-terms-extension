const constantMock = window.fetch;

// Function to process SSE data and extract search_queries
function processSSEData(eventData) {
  try {
    const data = JSON.parse(eventData);

    // Check if the data contains a 'v' (value) property, which holds the message
    if (data.v && data.v.message && data.v.message.metadata) {
      const metadata = data.v.message.metadata;

      // Check for the 'search_queries' property
      if (metadata.search_queries) {
        // console.log("Found search_queries:", metadata.search_queries);
        return metadata.search_queries;
      } else {
        // console.log("search_queries not found in this delta event's metadata.");
      }
    } else if (data.o === "patch" && Array.isArray(data.v)) {
      // This handles the specific 'patch' event where search_queries is appended
      for (const patch of data.v) {
        if (patch.p === "/message/metadata" && patch.o === "append" && patch.v && patch.v.search_queries) {
          // console.log("Found search_queries in patch operation:", patch.v.search_queries);
          return patch.v.search_queries;
        }
      }
    } else {
      // console.log("No message or metadata found in this delta event, or it's not a relevant patch operation.");
    }
  } catch (error) {
    console.error("Error parsing JSON from SSE data:", error, "Data:", eventData);
  }
  return null; // Return null if search_queries is not found
}

// Function to create or update the UI element
function createOrUpdateUI(searchQueries) {
  const queries = `<ul style="margin: 0; padding-left: 20px; list-style-type: disc;">${searchQueries.map(query => `<li style="margin-bottom: 4px;">${query.q}</li>`).join("")}</ul>`;
  
  // Create or get the div element
  let interceptedDataDiv = document.getElementById('__interceptedData');
  if (!interceptedDataDiv) {
    interceptedDataDiv = document.createElement('div');
    interceptedDataDiv.id = '__interceptedData';
    interceptedDataDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 300px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 12px 16px 12px 16px;
        padding-right: 40px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 13px;
        line-height: 1.4;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
        z-index: 10001;
    `;
    
    closeButton.addEventListener('mouseenter', () => {
        closeButton.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    });
    
    closeButton.addEventListener('mouseleave', () => {
        closeButton.style.backgroundColor = 'transparent';
    });
    
    closeButton.addEventListener('click', () => {
        interceptedDataDiv.style.opacity = '0';
        interceptedDataDiv.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (interceptedDataDiv.parentNode) {
                interceptedDataDiv.parentNode.removeChild(interceptedDataDiv);
            }
        }, 300);
    });
    
    interceptedDataDiv.appendChild(closeButton);
    document.body.appendChild(interceptedDataDiv);
    
    // Animate in
    setTimeout(() => {
        interceptedDataDiv.style.opacity = '1';
        interceptedDataDiv.style.transform = 'translateX(0)';
    }, 100);
  }
  
  // Update content
  const contentDiv = interceptedDataDiv.querySelector('.content') || document.createElement('div');
  contentDiv.className = 'content';
  contentDiv.innerHTML = queries;
  if (!interceptedDataDiv.querySelector('.content')) {
    interceptedDataDiv.insertBefore(contentDiv, interceptedDataDiv.firstChild);
  }
}

window.fetch = function() {
    // Check if the request is going to chatgpt.com
    const url = arguments[0];
    const isChatGPTRequest = typeof url === 'string' && url.includes('chatgpt.com');
    
    // If not a ChatGPT request, just pass through to original fetch
    if (!isChatGPTRequest) {
        return constantMock.apply(this, arguments);
    }
    
    return new Promise((resolve, reject) => {
        constantMock.apply(this, arguments)
            .then((response) => {
                if (response && response.body) {
                    // Create a new response with a transformed stream
                    const transformedStream = new ReadableStream({
                        start(controller) {
                            const reader = response.body.getReader();
                            const decoder = new TextDecoder();
                            let buffer = '';
                            const allSearchQueries = [];
                            
                            function pump() {
                                return reader.read().then(({ done, value }) => {
                                    if (done) {
                                        controller.close();
                                        return;
                                    }
                                    
                                    // Decode the chunk and add to buffer
                                    const chunk = decoder.decode(value, { stream: true });
                                    buffer += chunk;
                                    
                                    // Process complete lines from the buffer
                                    const lines = buffer.split('\n');
                                    buffer = lines.pop() || ''; // Keep incomplete line in buffer
                                    
                                    for (const line of lines) {
                                        if (line.startsWith('data: ')) {
                                            const data = line.substring(6); // Remove 'data: ' prefix
                                            if (data && data !== 'v1') { // Skip the 'v1' line
                                                const queries = processSSEData(data);
                                                if (queries) {
                                                    allSearchQueries.push(...queries);
                                                    // Update UI with all found queries
                                                    createOrUpdateUI(allSearchQueries);
                                                }
                                            }
                                        }
                                    }
                                    
                                    // Forward the chunk to the original stream
                                    controller.enqueue(value);
                                    
                                    // Continue reading
                                    return pump();
                                });
                            }
                            
                            return pump();
                        }
                    });
                    
                    // Create a new response with the transformed stream
                    const newResponse = new Response(transformedStream, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: response.headers
                    });
                    
                    resolve(newResponse);
                } else {
                    console.log('ChatGPT request arguments:', arguments);
                    console.log('Undefined Response or no body!');
                    resolve(response);
                }
            })
            .catch((error) => {
                console.log('ChatGPT fetch error:', error);
                reject(error);
            });
    });
}