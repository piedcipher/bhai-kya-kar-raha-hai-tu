// opens the meme if you're on block-listed site
chrome.storage.sync.get(null, (blockList) => {
    if (Object.keys(blockList).includes(window.location.origin)) {
        chrome.storage.local.get(["block-image"], (result) => {
            document.getElementsByTagName("body")[0].innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%;"><img src=${result["block-image"] ?? "https://i.imgur.com/uNuKDAZ.jpg"}></div>`;
        });
    }
});
