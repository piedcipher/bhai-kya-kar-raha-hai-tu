document.getElementById("clear-all").onclick = (e) => {
    clearBlockList();
};

// clear all the urls in the block-list
clearBlockList = () => {
    chrome.storage.sync.get(null, (blockList) => {
        Object.keys(blockList).forEach(e => removeUrl(e));
    });
};

// removes the url in the block-list
removeUrl = (url) => {
    chrome.storage.sync.remove(url.toString(), () => {
        displayBlockList();
    });
};

// stores the url in the block-list
storeUrl = (url) => {
    if (!url && url.trim().length === 0 && url === "https://imgur.com/uNuKDAZ.jpg") {
        return;
    }
    chrome.storage.sync.set({
        [url]: url
    }, () => {
        displayBlockList();
        chrome.tabs.create({
            "url": "https://imgur.com/uNuKDAZ.jpg"
        });
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

// renders block-list on popup (UI)
displayBlockList = () => {
    // clears the block-list
    const blockList = document.getElementById("block-list");
    blockList.innerHTML = '';

    // get all block-listed urls from this extension's storage
    chrome.storage.sync.get(null, (items) => {
        var allKeys = Object.keys(items);

        // display all block-listed urls in UI
        allKeys.forEach(e => {
            blockList.innerHTML += `<li><a href=${e}>${e}</a><br><br><button class="remove-button" value="${e}">Remove</button></li><br><br><hr><br><br>`;
        });
        
        const removeButtonTags = blockList.getElementsByClassName("remove-button");
        for (let i = 0; i < removeButtonTags.length; i++) {
            // adds onclick event to remove that url from block-list
            removeButtonTags[i].onclick = (f) => {
                removeUrl(removeButtonTags[i].value);
            };
        }
    });
};

displayBlockList();
