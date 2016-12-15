function loadHandler(){
  var element = document.querySelector('trix-editor');

  if(localStorage.getItem('editorState')){
    element.editor.loadJSON(JSON.parse(localStorage.getItem('editorState')))
  }

  function save() {
    localStorage.setItem('editorState', JSON.stringify(element.editor));
  }
  element.addEventListener('trix-change', save);
}
window.addEventListener('load', loadHandler);
