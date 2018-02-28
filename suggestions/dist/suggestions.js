!function t(e,i,n){function s(o,h){if(!i[o]){if(!e[o]){var a="function"==typeof require&&require;if(!h&&a)return a(o,!0);if(r)return r(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var l=i[o]={exports:{}};e[o][0].call(l.exports,function(t){var i=e[o][1][t];return s(i?i:t)},l,l.exports,t,e,i,n)}return i[o].exports}for(var r="function"==typeof require&&require,o=0;o<n.length;o++)s(n[o]);return s}({1:[function(t,e,i){"use strict";var n=t("./src/suggestions");window.Suggestions=e.exports=n},{"./src/suggestions":5}],2:[function(t,e,i){!function(){var t=this,n={};"undefined"!=typeof i?e.exports=n:t.fuzzy=n,n.simpleFilter=function(t,e){return e.filter(function(e){return n.test(t,e)})},n.test=function(t,e){return null!==n.match(t,e)},n.match=function(t,e,i){i=i||{};var n,s=0,r=[],o=e.length,h=0,a=0,u=i.pre||"",l=i.post||"",c=i.caseSensitive&&e||e.toLowerCase();t=i.caseSensitive&&t||t.toLowerCase();for(var d=0;o>d;d++)n=e[d],c[d]===t[s]?(n=u+n+l,s+=1,a+=1+a):a=0,h+=a,r[r.length]=n;return s===t.length?{rendered:r.join(""),score:h}:null},n.filter=function(t,e,i){return i=i||{},e.reduce(function(e,s,r,o){var h=s;i.extract&&(h=i.extract(s));var a=n.match(t,h,i);return null!=a&&(e[e.length]={string:a.rendered,score:a.score,index:r,original:s}),e},[]).sort(function(t,e){var i=e.score-t.score;return i?i:t.index-e.index})}}()},{}],3:[function(t,e,i){function n(){for(var t={},e=0;e<arguments.length;e++){var i=arguments[e];for(var n in i)i.hasOwnProperty(n)&&(t[n]=i[n])}return t}e.exports=n},{}],4:[function(t,e,i){"Use strict";var n=function(t){return this.component=t,this.items=[],this.active=0,this.element=document.createElement("ul"),this.element.className="suggestions",t.el.parentNode.insertBefore(this.element,t.el.nextSibling),this};n.prototype.show=function(){this.element.style.display="block"},n.prototype.hide=function(){this.element.style.display="none"},n.prototype.add=function(t){this.items.push(t)},n.prototype.clear=function(){this.items=[],this.active=0},n.prototype.isEmpty=function(){return!this.items.length},n.prototype.draw=function(){if(this.element.innerHTML="",0===this.items.length)return void this.hide();for(var t=0;t<this.items.length;t++)this.drawItem(this.items[t],this.active===t);this.show()},n.prototype.drawItem=function(t,e){var i=document.createElement("li"),n=document.createElement("a");e&&(i.className+=" active"),n.innerHTML=t.string,i.appendChild(n),this.element.appendChild(i),i.addEventListener("mousedown",function(){this.handleMouseDown.call(this,t)}.bind(this))},n.prototype.handleMouseDown=function(t){this.component.value(t.original),this.clear(),this.draw()},n.prototype.move=function(t){this.active=t,this.draw()},n.prototype.previous=function(){this.move(0===this.active?this.items.length-1:this.active-1)},n.prototype.next=function(){this.move(this.active===this.items.length-1?0:this.active+1)},e.exports=n},{}],5:[function(t,e,i){"use strict";var n=t("xtend"),s=t("fuzzy"),r=t("./list"),o=function(t,e,i){return i=i||{},this.options=n({minLength:2,limit:5,filter:!0},i),this.el=t,this.data=e||[],this.list=new r(this),this.query="",this.selected=null,this.list.draw(),this.el.addEventListener("keyup",function(t){this.handleKeyUp(t.keyCode)}.bind(this),!1),this.el.addEventListener("keydown",function(t){this.handleKeyDown(t)}.bind(this)),this.el.addEventListener("focus",function(){this.handleFocus()}.bind(this)),this.el.addEventListener("blur",function(){this.handleBlur()}.bind(this)),this};o.prototype.handleKeyUp=function(t){return 40!==t&&38!==t&&27!==t&&13!==t&&9!==t?(this.query=this.normalize(this.el.value),this.list.clear(),this.query.length<this.options.minLength?void this.list.draw():void this.getCandidates(function(t){for(var e=0;e<t.length&&(this.list.add(t[e]),e!==this.options.limit-1);e++);this.list.draw()}.bind(this))):void 0},o.prototype.handleKeyDown=function(t){switch(t.keyCode){case 13:case 9:this.list.isEmpty()||(this.value(this.list.items[this.list.active].original),this.list.hide());break;case 27:this.list.isEmpty()||this.list.hide();break;case 38:this.list.previous();break;case 40:this.list.next()}},o.prototype.handleBlur=function(){this.list.hide()},o.prototype.handleFocus=function(){this.list.isEmpty()||this.list.show()},o.prototype.update=function(t){this.data=t,this.list.draw()},o.prototype.clear=function(){this.data=[],this.list.clear()},o.prototype.normalize=function(t){return t=t.toLowerCase()},o.prototype.match=function(t,e){return t.indexOf(e)>-1},o.prototype.value=function(t){if(this.selected=t,this.el.value=this.getItemValue(t),document.createEvent){var e=document.createEvent("HTMLEvents");e.initEvent("change",!0,!1),this.el.dispatchEvent(e)}else this.el.fireEvent("onchange")},o.prototype.getCandidates=function(t){var e={pre:"<strong>",post:"</strong>",extract:function(t){return this.getItemValue(t)}.bind(this)},i=this.options.filter?s.filter(this.query,this.data,e):this.data.map(function(t){return{original:t,string:this.getItemValue(t).replace(new RegExp("("+this.query+")","ig"),function(t,e){return"<strong>"+e+"</strong>"})}}.bind(this));t(i)},o.prototype.getItemValue=function(t){return t},e.exports=o},{"./list":4,fuzzy:2,xtend:3}]},{},[1]);
