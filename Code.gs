function onOpen() {
  DocumentApp.getUi().createAddonMenu().addItem('Rajouter les liens', 'replaceLink').addToUi();
}

function replaceLink(){
  var list = JSON.parse(UrlFetchApp.fetch('https://ww1.requirementyogi.cloud/nuitdelinfo/search').getContentText());
  var tab = [];
  for (var i = 0;i<list.results.length;++i){
    replaceText(list.results[i].key, list.results[i].canonicalUrl);
    tab.push(list.results[i].key);
  }
  DocumentApp.getActiveDocument().getBody().appendTable([tab]);
}

function replaceText(text, url) {
    var body = DocumentApp.getActiveDocument().getBody();
    var foundElement = body.findText(text);

    while (foundElement != null) {
      var foundText = foundElement.getElement().asText();
      foundText.setLinkUrl(foundElement.getStartOffset(), foundElement.getEndOffsetInclusive(), url);
      foundElement = body.findText(text, foundElement);
    }
}
