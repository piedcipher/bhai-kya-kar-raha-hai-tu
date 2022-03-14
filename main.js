// stores the url in the block-list
storeUrl = (url) => {
    if (!url || url.trim().length === 0 || url === "https://i.imgur.com/uNuKDAZ.jpg" || !url.startsWith("https://")) {
        return;
    }
    chrome.storage.sync.set({
        [url]: url
    }, () => {
        window.close();
    });  
};

// adds current tab's url in block-list
document.querySelector("#add-to-blocklist").onclick = () => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        storeUrl(tabs[0].url);
    });
}

// opens block-list
document.querySelector('#go-to-options').onclick = () => {
    if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
    } else {
        window.open(chrome.runtime.getURL('options.html'));
    }
}
