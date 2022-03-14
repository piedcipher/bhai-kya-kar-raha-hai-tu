chrome.storage.onChanged.addListener((changes, namespace) => {
    // for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    //     console.log(
    //     `Storage key "${key}" in namespace "${namespace}" changed.`,
    //     `Old value was "${oldValue}", new value is "${newValue}".`
    //     );
    // }
    displayBlockList();
});

// clear all the urls in the block-list
document.querySelector("#clear-all").onclick = (e) => {
    chrome.storage.sync.get(null, (blockList) => {
        Object.keys(blockList).forEach(e => removeUrl(e));
    });
};

// removes the url in the block-list
removeUrl = (url) => {
    chrome.storage.sync.remove(url.toString(), () => {
    });
};

// renders block-list on popup (UI)
displayBlockList = () => {
    // clears the block-list
    const blockList = document.querySelector("#block-list");
    blockList.innerHTML = '';

    // get all block-listed urls from this extension's storage
    chrome.storage.sync.get(null, (items) => {
        var allKeys = Object.keys(items);

        // display all block-listed urls in UI
        allKeys.forEach(e => {
            blockList.innerHTML += `<button class="remove-button" value="${e}">Remove</button>&emsp;<a target="_blank" href=${e}>${e}</a><br><br>`;
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
