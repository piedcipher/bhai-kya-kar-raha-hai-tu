const blockList = document.getElementById("block-list");

// clear all the urls in the block-list
clearBlockList = () => {

};

// removes the url in the block-list
removeUrl = (url) => {
    console.log(url);
    chrome.storage.sync.remove(url.toString(), () => {
        displayBlockList();
    });
};

// stores the url in the block-list
storeUrl = (url) => {
    if (!url && url.trim().length === 0) {
        return;
    }
    chrome.storage.sync.set({
        [url]: url
    }, () => {
        displayBlockList();
    });  
};

// gets the current tab's url and executes the supplied function
getCurrentTabThenExecute = (functionToExecute) => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        functionToExecute(tabs[0].url);
    });
}

document.getElementById("add-to-blocklist").onclick = (e) => {
    getCurrentTabThenExecute(storeUrl);
}

document.getElementById("remove-from-blocklist").onclick = (e) => {
    getCurrentTabThenExecute(removeUrl);
}

// renders block-list on popup (UI)
displayBlockList = () => {
    blockList.innerHTML = '';
    chrome.storage.sync.get(null, (items) => {
        var allKeys = Object.keys(items);
        allKeys.forEach(e => {
            blockList.innerHTML += `<li>${e}</li>`;
        });
        const blockListTags = blockList.getElementsByTagName("li");
        for (let i = 0; i < blockListTags.length; i++) {
            blockListTags[i].onclick = (f) => {
                removeUrl(blockListTags[i].innerHTML);
            };
        }
    });
};

displayBlockList();
