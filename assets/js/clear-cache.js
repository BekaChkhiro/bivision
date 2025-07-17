// Add a cache clearer button
document.addEventListener('DOMContentLoaded', function() {
    // Create a button element
    const button = document.createElement('button');
    button.innerHTML = 'Clear Cache';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#6c62fd';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '9999';
    button.style.fontWeight = 'bold';
    
    // Add click event
    button.addEventListener('click', function() {
        // Force reload without cache
        window.location.reload(true);
        // Add a random parameter to the URL to bypass cache
        const timestamp = new Date().getTime();
        const url = new URL(window.location.href);
        url.searchParams.set('nocache', timestamp);
        window.location.href = url.toString();
    });
    
    // Append to body
    document.body.appendChild(button);
});
