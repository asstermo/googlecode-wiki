  _parsedWikiText="";_wikiText="";
  function _DW_getWikiPage(a,b,c){
        var params = {};
        params[gadgets.io.RequestParameters.CONTENT_TYPE] = gadgets.io.ContentType.TEXT;
        var url = a+b+c;
        gadgets.io.makeRequest(url, DW_getXmlHttpCallback, params);

  }
  function DW_getXmlHttpCallback(DW_getXmlHttp) {
      _appendText("Object: "+DW_getXmlHttp);
      _appendText("Text: "+DW_getXmlHttp.text);
      _wikiText=DW_getXmlHttp.text;
  }
  _appendText=function(text2append){
    var d=document.createElement("div");
    d.innerHTML=text2append;
    document.body.appendChild(d);
  }

if(!document.getElementsByClassName)
{
  document.getElementsByClassName = function(cl) {
    var retnode = [];
    var myclass = new RegExp('\\b'+cl+'\\b');
    var elem = this.getElementsByTagName('*');
    for (var i = 0; i < elem.length; i++)
    {
      var classes = elem[i].className;
      if (myclass.test(classes)) retnode.push(elem[i]);
    }
    return retnode;
  };
}

var baseURL='http://wiki.asstermo.googlecode.com/hg/';
var fileExt='.wiki';
function loadWikis() {

  var noTextLoaded = _parsedWikiText.length==0 && _wikiText.length==0;
  var smartloads=document.getElementsByClassName("smartload");

  for(var j=0;j<smartloads.length;j++)
  {
    var pageTitle=smartloads[j].getAttribute('title');
    if(smartloads[j].innerHTML.length==0 && pageTitle.length>0)
    {
      smartloads[j].setAttribute('title','');
      _DW_getWikiPage(baseURL,pageTitle,fileExt);
      _appendText("sending request for wiki page...");
      break;
    }
    else if(smartloads[j].innerHTML.length==0 && pageTitle.length==0 && !noTextLoaded)
    {
      _appendText("waiting for request for wiki page...");
      break;
    }
    else if(smartloads[j].innerHTML.length==0 && pageTitle.length==0)
    {
      if(_wikiText.length>10)
      {
        smartloads[j].innerHTML=_wikiText;
        _DW_syncPreview('http://code.google.com', 'asstermo', {'content': _wikiText, 'token': ''});
        _wikiText="";
        _appendText("sending request for wiki convertion...");
      }
      break;
    }
    else if(smartloads[j].innerHTML.length>0 && pageTitle.length==0 && !noTextLoaded)
    {
      _appendText("waiting for request for wiki convertion...");
      break;
    }
    else if(smartloads[j].innerHTML.length>0 && pageTitle.length==0)
    {
      smartloads[j].innerHTML=_parsedWikiText;
      smartloads[j].setAttribute('class','');
      smartloads[j].setAttribute('style','');
      _parsedWikiText="";
    }
  }
  setTimeout(loadWikis, 100);
}
setTimeout(loadWikis, 300);
