// listener for block-list
chrome.storage.onChanged.addListener((changes, namespace) => {
    displayBlockList();
});

// clear all the urls in the block-list
document.querySelector("#clear-all").onclick = (e) => {
    chrome.storage.sync.get(null, (blockList) => {
        Object.keys(blockList).forEach(e => e !== "block-image" && removeUrl(e));
    });
};

// removes the url in the block-list
removeUrl = (url) => {
    chrome.storage.sync.remove(url.toString());
};

// renders current block image
renderCurrentBlockImage = () => {
    chrome.storage.local.get(["block-image"], (result) => {
        document.querySelector("#block-image-view").src = result["block-image"] ?? "https://i.imgur.com/uNuKDAZ.jpg";
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
        delete allKeys["block-image"];
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

    // renders current block image
    renderCurrentBlockImage();
};

// initial render
displayBlockList();

// handles custom image input from the user
document.querySelector("#block-image").onchange = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (_) => {
        document.querySelector("#block-image-view").src = reader.result;
        if (e.target.files[0].size <= 1000000 &&
            (e.target.files[0].type === "image/jpeg"
            || e.target.files[0].type === "image/png")) {
            document.querySelector("#save-block-image").removeAttribute("disabled");
        } else {
            document.querySelector("#save-block-image").disabled = "true";
        }
    };
};

// saves custom (block) image to chrome's local storage (not localStorage)
document.querySelector("#save-block-image").onclick = (e) => {
    chrome.storage.local.set({
        "block-image": document.querySelector("#block-image-view").src
    }, () => {
        document.querySelector("#save-block-image").disabled = "true";
        chrome.storage.local.get(["block-image"], (result) => {
            document.querySelector("#block-image-view").src = result["block-image"];
        });
    });
};

// reset the block image to "Bhai Kya Kar Raha Hai Tu"
document.querySelector("#reset-block-image").onclick = () => {
    const response = confirm("Are you sure? It will set 'Bhai kya kar raha hai tu?' as the image.");
    if (!response) return;
    chrome.storage.local.set({
        "block-image": null
    }, () => {
        renderCurrentBlockImage();
        document.querySelector("#save-block-image").disabled = "true";
    });
};
