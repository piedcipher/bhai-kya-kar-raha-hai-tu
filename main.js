const blockList = document.getElementById("block-list");

clearBlockList = () => {

};

removeUrl = (url) => {
    console.log(url);
    chrome.storage.sync.remove(url.toString(), () => {
        displayBlockList();
    });
};

storeUrl = (url) => {
    chrome.storage.sync.set({
        [url]: url
    }, () => {
        displayBlockList();
    });  
};

document.getElementById("add-to-blocklist").onclick = (e) => {
    storeUrl(document.getElementById("url-value").value);
}

document.getElementById("remove-from-blocklist").onclick = (e) => {
    removeUrl(document.getElementById("url-value").value);
}

displayBlockList = () => {
    blockList.innerHTML = '';
    chrome.storage.sync.get(null, function(items) {
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
