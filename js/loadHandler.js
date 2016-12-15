// Load content to the editor from chrome local storage
function loadEditor() {
  var element = document.querySelector('trix-editor');
  // Get the data from chrome local storage
  chrome.storage.local.get({
    editorState:''
  }, function(items) {
    // If the data is not empty,load the JSON data after parsing
    if(items.editorState.length) element.editor.loadJSON(JSON.parse(items.editorState));
  });

  // Saves the data to chrome storage
  function save() {
    // Set chrome storage with data
    chrome.storage.local.set({
      editorState:JSON.stringify(element.editor)
    });
  }

  // Add an event listener for any change of content in the editor
  element.addEventListener('trix-change', save);
}


// Load site list from chrome sync storage, set in extension options
function loadSites() {
  // Get the list of sites
  chrome.storage.sync.get({
    sitesArray: []
  }, function(items) {
    var ul = document.getElementById('site-list');
    // Loop throw sites and create li element and append to ul
    items.sitesArray.forEach(function(site) {
      if(site.url!=='' && site.title !== '') {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = site.url;
        a.title = site.title;
        a.appendChild(document.createTextNode(site.title));
        li.appendChild(a);
        ul.appendChild(li);
      }
    });
  })
}

// Handler function which calls other sub functions
function loadHandler() {
  loadSites();
  loadEditor();
}

// Content load event listener
document.addEventListener('DOMContentLoaded', loadHandler);
