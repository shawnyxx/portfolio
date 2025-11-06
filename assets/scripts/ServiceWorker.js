if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(function (reg) {
            // Registration successful
            console.log('ServiceWorker registration successful with scope: ', reg.scope);
        }).catch(function (err) {
            console.warn('ServiceWorker registration failed: ', err);
        });
    });
}