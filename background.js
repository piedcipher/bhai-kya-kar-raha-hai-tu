bhaiKyaKarRahaHaiTu = () => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        const url = tabs[0].url;
        chrome.storage.sync.get(null, function(blockList) {
            if (Object.keys(blockList).includes(url)) {
                chrome.windows.create({
                    "url": "https://imgur.com/uNuKDAZ.jpg"
                });
            }
        });
    });
};

chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tab) => {
        if (changeInfo.status === "complete") {
            bhaiKyaKarRahaHaiTu();
        }
    },
);
