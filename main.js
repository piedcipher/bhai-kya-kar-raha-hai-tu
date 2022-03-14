// stores the url in the block-list
storeUrl = (url) => {
    if (!url || url.trim().length === 0 || url === "https://i.imgur.com/uNuKDAZ.jpg" || !url.startsWith("https://")) {
        return;
    }
    chrome.storage.sync.set({
        [url]: url
    }, () => {
    });  
};

// gets the current tab's url and executes the supplied function
getCurrentTabThenExecute = (functionToExecute) => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        functionToExecute(tabs[0].url);
    });
}

// adds current tab's url in block-list
document.getElementById("add-to-blocklist").onclick = (e) => {
    getCurrentTabThenExecute(storeUrl);
}

// opens block-list
document.querySelector('#go-to-options').addEventListener('click', function() {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
});
