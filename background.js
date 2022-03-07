// the magic
bhaiKyaKarRahaHaiTu = () => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        const url = tabs[0].url;
        chrome.storage.sync.get(null, (blockList) => {
            if (Object.keys(blockList).includes(url)) {
                chrome.tabs.create({
                    "url": "https://imgur.com/uNuKDAZ.jpg"
                });
            }
        });
    });
};

// listener for tab updates
chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tab) => {
        if (changeInfo.status === "complete") {
            bhaiKyaKarRahaHaiTu();
        }
    },
);
