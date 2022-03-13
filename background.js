chrome.storage.sync.get(null, (blockList) => {
    if (Object.keys(blockList).includes(window.location.href)) {
        window.location = "https://i.imgur.com/uNuKDAZ.jpeg";
    }
});
