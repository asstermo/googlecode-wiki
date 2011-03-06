/* Copyright 2009 Google Inc. All Rights Reserved. */ (function(){var global=this;String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")};if(!Function.prototype.apply)Function.prototype.apply=function(a,b){var c=[];a||(a=global);for(var d=b||[],e=0;e<d.length;e++)c[e]="args["+e+"]";c="oScope.__applyTemp__.peek()("+c.join(",")+");";if(!a.__applyTemp__)a.__applyTemp__=[];a.__applyTemp__.push(this);c=eval(c);a.__applyTemp__.pop();return c};
if(!Array.prototype.push)Array.prototype.push=function(){for(var a=0;a<arguments.length;a++)this[this.length]=arguments[a];return this.length};if(!Array.prototype.pop)Array.prototype.pop=function(){if(this.length){var a=this[this.length-1];this.length--;return a}};if(!Array.prototype.shift)Array.prototype.shift=function(){if(this.length!=0){for(var a=this[0],b=0;b<this.length-1;b++)this[b]=this[b+1];this.length--;return a}};
if(!Array.prototype.unshift)Array.prototype.unshift=function(){for(var a=arguments.length,b=this.length-1;b>=0;b--)this[b+a]=this[b];for(b=0;b<a;b++)this[b]=arguments[b];return this.length};if(!Array.prototype.forEach)Array.prototype.forEach=function(a,b){for(var c=0;c<this.length;c++)a.call(b,this[c],c,this)};
function bind(a,b){var c=a.boundArgs_||[];c=c.concat(Array.prototype.slice.call(arguments,2));if(typeof a.boundSelf_!="undefined")b=a.boundSelf_;if(typeof a.boundFn_!="undefined")a=a.boundFn_;var d=function(){var e=c.concat(Array.prototype.slice.call(arguments));return a.apply(b,e)};d.boundArgs_=c;d.boundSelf_=b;d.boundFn_=a;return d}Function.prototype.bind=function(a){return bind.apply(null,[this,a].concat(Array.prototype.slice.call(arguments,1)))};var DB_mode=false;function DumpError(a){try{throw a;}catch(b){DumpException(b)}}
function DumpException(a,b){var c="Javascript exception: "+(b?b:"")+" "+a;if(BR_AgentContains_("msie")&&!window.opera)c+=" "+a.name+": "+a.message+" ("+a.number+")";var d="";if(typeof a=="string")d=a+"\n";else for(var e in a)try{d+=e+": "+a[e]+"\n"}catch(f){}d+=DB_GetStackTrace(DumpException.caller);c=c+"\n"+d;if(DB_mode){try{var h=(new Date).getTime()-DB_starttime,g="["+h+"] "+HtmlEscape(c).replace(/\n/g,"<br>")+"<br>";g="<font color=#ff0000><b>Error: "+g+"</b></font>";DB_win.focus()}catch(i){}DB_WriteDebugHtml(g)}else typeof log!=
"undefined"&&log(HtmlEscape(c))}var function_name_re_=/function (\w+)/;
function DB_GetStackTrace(a){try{if(!(BR_AgentContains_("msie")&&!window.opera)&&!(BR_AgentContains_("safari")||BR_AgentContains_("konqueror"))&&BR_AgentContains_("mozilla"))return Error().stack;if(!a)return"";var b;var c=function_name_re_.exec(String(a));b=c?c[1]:"";b="- "+b+"(";for(c=0;c<a.arguments.length;c++){if(c>0)b+=", ";var d=String(a.arguments[c]);if(d.length>40)d=d.substr(0,40)+"...";b+=d}b+=")\n";b+=DB_GetStackTrace(a.caller);return b}catch(e){return"[Cannot get stack trace]: "+e+"\n"}}
var DB_starttime,DB_win=null,DB_winopening=false;
function DB_WriteDebugHtml(a){if(DB_mode)try{if((DB_win==null||DB_win.closed)&&!DB_winopening)try{DB_winopening=true;DB_win=window.open("","debug","width=700,height=500,toolbar=no,resizable=yes,scrollbars=yes,left=16,top=16,screenx=16,screeny=16");DB_win.blur();DB_win.document.open();DB_winopening=false;var b="<font color=#ff0000><b>To turn off this debugging window,hit 'D' inside the main caribou window, then close this window.</b></font><br>";DB_WriteDebugHtml(b)}catch(c){}DB_win.document.write(a);DB_win.scrollTo(0,
1E6)}catch(d){}};function BR_AgentContains_(a){if(a in BR_AgentContains_cache_)return BR_AgentContains_cache_[a];return BR_AgentContains_cache_[a]=navigator.userAgent.toLowerCase().indexOf(a)!=-1}var BR_AgentContains_cache_={};function HasClass(a,b){if(a==null||a.className==null)return false;if(a.className==b)return true;for(var c=a.className.split(" "),d=0;d<c.length;d++)if(c[d]==b)return true;return false}
function RemoveClass(a,b){if(a.className!=null)if(a.className==b)a.className="";else{for(var c=a.className.split(" "),d=[],e=false,f=0;f<c.length;f++)if(c[f]!=b)c[f]&&d.push(c[f]);else e=true;if(e)a.className=d.join(" ")}}var amp_re_=/&/g,lt_re_=/</g,gt_re_=/>/g;function HtmlEscape(a){if(!a)return"";return a.replace(amp_re_,"&amp;").replace(lt_re_,"&lt;").replace(gt_re_,"&gt;").replace(quote_re_,"&quot;")}var quote_re_=/\"/g;function forid_1(a){return document.getElementById(a)}
function forid_2(a){return document.all[a]}var forid=document.getElementById?forid_1:forid_2;function log(a){try{if(window.parent!=window&&window.parent.log){window.parent.log(window.name+"::"+a);return}}catch(b){}var c=forid("log");if(c){a="<p class=logentry><span class=logdate>"+new Date+"</span><span class=logmsg>"+a+"</span></p>";c.innerHTML=a+c.innerHTML}else window.status=a};function AS_Assert(){}AS_Assert.raise=function(a){if(typeof Error!="undefined")throw Error(a||"Assertion Failed");else throw a;};AS_Assert.fail=function(a){a=a||"Assertion failed";typeof DumpError!="undefined"&&DumpError(a+"\n");AS_Assert.raise(a)};AS_Assert.isTrue=function(a,b){if(!a){if(b===undefined)b="Assertion failed";AS_Assert.fail(b)}};AS_Assert.equals=function(a,b,c){if(a!=b){if(c===undefined)c="AS_Assert.equals failed: <"+a+"> != <"+b+">";AS_Assert.fail(c)}};
AS_Assert.typeOf=function(a,b,c){if(typeof a!=b){if(a||a=="")try{if(b==AS_Assert.TYPE_MAP[typeof a]||a instanceof b)return}catch(d){}if(c===undefined){if(typeof b=="function")if(c=b.toString().match(/^\s*function\s+([^\s\{]+)/))b=c[1];c="AS_Assert.typeOf failed: <"+a+"> not typeof "+b}AS_Assert.fail(c)}};AS_Assert.TYPE_MAP={string:String,number:Number,"boolean":Boolean};
AS_Assert.numArgs=function(a,b){var c=AS_Assert.numArgs.caller;if(c&&c.arguments.length!=a){if(b===undefined)b=c.name+" expected "+a+" arguments  but received "+c.arguments.length;AS_Assert.fail(b)}};Function.prototype.bind=function(a){if(typeof this!="function")throw Error("Bind must be called as a method of a function object.");var b=this,c=Array.prototype.splice.call(arguments,1,arguments.length);return function(){for(var d=c.concat(),e=0;e<arguments.length;e++)d.push(arguments[e]);return b.apply(a,d)}};var XH_ieProgId_,XH_ACTIVE_X_IDENTS$$inline_27=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"];
if(typeof XMLHttpRequest=="undefined"&&typeof ActiveXObject!="undefined"){for(var i$$inline_28=0;i$$inline_28<XH_ACTIVE_X_IDENTS$$inline_27.length;i$$inline_28++){var candidate$$inline_29=XH_ACTIVE_X_IDENTS$$inline_27[i$$inline_28];try{new ActiveXObject(candidate$$inline_29);XH_ieProgId_=candidate$$inline_29;break}catch(e$$inline_30){}}if(!XH_ieProgId_)throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed.");}
function XH_XmlHttpPOST(a,b,c,d){a.open("POST",b,true);a.onreadystatechange=d;a.setRequestHeader("Content-Type","application/x-www-form-urlencoded");a.setRequestHeader("Content-Length",c.length);try{a.send(c)}catch(e){log("XMLHttpSend failed "+e.toString()+"<br>"+e.stack);throw e;}};if("undefined"==typeof log)log=function(){};var DW_sidebarXmlHttp=undefined;
function DW_toggleSidebar(a,b,c,d){a:{for(;c;){if(HasClass(c,"collapse")){RemoveClass(c,"collapse");var e="expand";HasClass(c,e)||(c.className+=" "+e);c=true;break a}if(HasClass(c,"expand")){RemoveClass(c,"expand");e="collapse";HasClass(c,e)||(c.className+=" "+e);c=false;break a}c=c.parentNode}c=void 0}if(d!="None"){c=c?1:0;DW_sidebarXmlHttp=XH_ieProgId_?new ActiveXObject(XH_ieProgId_):new XMLHttpRequest;a=a?"/a/"+a:"";b=a+"/p/"+b+"/w/setSidebarPref.do";d="expanded="+c+"&token="+d;XH_XmlHttpPOST(DW_sidebarXmlHttp,
b,d,DW_setSidebarCallback)}}function DW_setSidebarCallback(){if(DW_sidebarXmlHttp.readyState==4)if(DW_sidebarXmlHttp.status==200)try{var a;eval("_d="+DW_sidebarXmlHttp.responseText)}catch(b){alert("DW: error parsing response of wiki sidebar")}}var DW_cancelBubble=false;function DW_cancelBubbling(){DW_cancelBubble=true}
function DW_controlledUL(a){if(a!=null){for(var b=a.nextSibling;b&&b.tagName!="LI"&&b.tagName!="UL";)b=b.nextSibling;if(!b||b.tagName=="LI")for(b=a.firstChild;b&&b.tagName!="UL";)b=b.nextSibling;return b}}
function DW_toggleTree(a){if(!a)a=window.event;a.cancelBubble=true;a.stopPropagation&&a.stopPropagation();if(!DW_cancelBubble){var b;if(a.target)b=a.target;else if(a.srcElement)b=a.srcElement;if(a=DW_controlledUL(b))if(this.className=="treeopen"){b.className="";a.className=""}else{b.className="treeopen";a.className="treeleafcontainer"}}}var DW_currentlyViewedLink=undefined;
function DW_setUpTree(a){if(a)for(a=a.firstChild;a;){if(a.tagName=="LI"){for(var b=a.firstChild;b&&b.tagName!="A";)b=b.nextSibling;if(b&&b.tagName=="A"){b.onclick=DW_cancelBubbling;if(document.location.href.split("?")[0]==b.href||document.location.href.split("#")[0]==b.href)DW_currentlyViewedLink=b}if(b=DW_controlledUL(a)){a.onclick=DW_toggleTree;DW_setUpTree(b)}else a.className="treeleaf"}a=a.nextSibling}}DW_setUpTree(DW_controlledUL(document.getElementById("sidebarcontainer")));
if(DW_currentlyViewedLink){DW_currentlyViewedLink.className="currentpagelink";for(var parent$$inline_66=DW_currentlyViewedLink.parentNode.parentNode;parent$$inline_66&&parent$$inline_66.tagName=="UL";){parent$$inline_66.className="treeleafcontainer";for(var prevItem$$inline_67=parent$$inline_66.previousSibling;prevItem$$inline_67&&prevItem$$inline_67.tagName!="LI";)prevItem$$inline_67=prevItem$$inline_67.previousSibling;if(prevItem$$inline_67&&prevItem$$inline_67.tagName=="LI")prevItem$$inline_67.className=
"treeopen";parent$$inline_66=parent$$inline_66.parentNode}var parent$$inline_71=DW_currentlyViewedLink.parentNode;if(!parent$$inline_71.className){var nextUL$$inline_72=DW_controlledUL(parent$$inline_71);if(nextUL$$inline_72){parent$$inline_71.className="treeopen";nextUL$$inline_72.className="treeleafcontainer"}}}
  _DW_toggleSidebar = DW_toggleSidebar;
  _toggleTree = DW_toggleTree;
  _parsedWikiText="";_wikiText="";
  var DW_syncPreviewXmlHttp = undefined;
  function DW_syncPreview(a, b, c) {
    DW_syncPreviewXmlHttp = XH_ieProgId_ ? new ActiveXObject(XH_ieProgId_) : new XMLHttpRequest;
    b = a + "/p/" + b + "/w/syncWikiPreviewJSON";
    a = "";
    for (var d in c) a += d + "=" + encodeURIComponent(c[d]) + "&";
    XH_XmlHttpPOST(DW_syncPreviewXmlHttp, b, a, DW_syncPreviewCallback)
  }
  function DW_syncPreviewCallback() {
    if (DW_syncPreviewXmlHttp.readyState == 4) if (DW_syncPreviewXmlHttp.status == 200) {
      var a = eval("(" + DW_syncPreviewXmlHttp.responseText + ")");
      //document.getElementById("wikimaincol").innerHTML = a.preview_html
      _parsedWikiText=a.preview_html
    }
  }
  _DW_syncPreview = DW_syncPreview;
  var DW_getXmlHttp = undefined;
  function DW_getWikiPage(a, b, c) {
    DW_getXmlHttp = XH_ieProgId_ ? new ActiveXObject(XH_ieProgId_) : new XMLHttpRequest;
    b = a + b + c;
    a = "";
    document.write("posting request for wiki page...");
    XH_XmlHttpPOST(DW_getXmlHttp, b, a, DW_getXmlHttpCallback)
  }
  function DW_getXmlHttpCallback() {
    document.write("Ready:"+DW_getXmlHttp.readyState+"; status:"+DW_getXmlHttp.status+"; Response:"+DW_getXmlHttp.responseText);
    if (DW_getXmlHttp.readyState == 4) if (DW_getXmlHttp.status == 200) {
      var a = eval("(" + DW_getXmlHttp.responseText + ")");
      _wikiText=a.preview_html
    }
  }
  _DW_getWikiPage = DW_getWikiPage;
})()
