// Save list of sites to be shown on the new tab page
function save_sites() {
  // Get value from textarea
  var sites = document.getElementById('sites').value.split('\n');
  var sitesArray=[];
  // Loop and push site title and url to array
  sites.forEach(function(siteString) {
    var index = siteString.indexOf(' [');
    var title = siteString.substr(0, index);
    var url = siteString.substr(index+2, siteString.length-2);
    sitesArray.push({title:title, url:url});
  });
  // Save the array to chrome storage
  chrome.storage.sync.set({
    sitesArray: sitesArray
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1250);
  });
}

// Read and restore the site list from storage
function restore_options() {
  // Get the array of sites from chrome storage
  chrome.storage.sync.get({
    sitesArray:[]
  }, function(items) {
    // Loop and create a string out of the entries
    var content = '';
    items.sitesArray.forEach(function(site) {
      if(site.url!=='' && site.title !== '') {
        content += site.title + ' [' + site.url + ']\n';
      }
    });
    // Show list of sites
    document.getElementById('sites').value = content;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_sites);
