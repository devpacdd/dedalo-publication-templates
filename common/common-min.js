"use strict";var common={get_json_data:function(e,t,n){const r=e+"?d="+Date.now(),o=JSON.stringify(t);var i=-1!=navigator.userAgent.indexOf("MSIE"),a=/rv:11.0/i.test(navigator.userAgent);if(i||a){var s=tstring.incompatible_browser||"Warning: Internet explorer is not supported. Please use a modern browser like Chrome, Firefox, Safari, Opera, Edje..";return alert(s),!1}return void 0===n&&(n=!0),new Promise((function(e,t){var i=new XMLHttpRequest;i.open("POST",r,n),i.setRequestHeader("Content-type","application/json"),i.responseType="json",i.onload=function(n){200===i.status?e(i.response):t(Error("Reject error. Data don't load. error code: "+i.statusText+" - url: "+r))},i.onerror=function(e){t(Error("There was a network error. data_send: "+r+"?"+o+"statusText: "+i.statusText))},i.send(o)}))},create_dom_element:function(e){const t=e.element_type,n=e.parent,r=e.class_name,o=e.style,i=e.data_set||e.dataset,a=e.custom_function_events,s=e.title_label||e.title,c=e.text_node,l=e.text_content,d=e.inner_html,u=e.href,m=e.id,p=e.draggable,_=e.value,f=e.download,g=e.src,h=e.placeholder,v=e.type,b=e.target,y=document.createElement(t);if(m&&(y.id=m),"a"===t&&(y.href=u||"javascript:;",b&&(y.target=b)),r&&(y.className=r),o)for(w in o)y.style[w]=o[w];if(s&&(y.title=s),i)for(var w in i)y.dataset[w]=i[w];if(_&&(y.value=_),v&&y.setAttribute("type",v),a){const e=a.length;for(let t=0;t<e;t++){const e=a[t].name,n=a[t].type,r=a[t].function_arguments;this.create_custom_events(y,n,e,r)}}if(c)if("span"===t)y.textContent=c;else{const e=document.createElement("span");e.insertAdjacentHTML("afterbegin"," "+c),y.appendChild(e)}else l?y.textContent=l:d&&y.insertAdjacentHTML("afterbegin",d);return n&&n.appendChild(y),p&&(y.draggable=p),f&&y.setAttribute("download",f),g&&(y.src=g),h&&(y.placeholder=h),y},build_player:function(e){!0===SHOW_DEBUG&&console.log("[common.build_player] options",e);const t=this;var n=e.type||["video/mp4"],r=e.src||[""];Array.isArray(r)||(r=[r]);const o=document.createElement("video");o.id=e.id||"video_player",o.controls=e.controls||!0,o.poster=e.poster||common.get_posterframe_from_video(r),o.className=e.class||"video-js video_hidden hide",o.preload=e.preload||"auto",o.dataset.setup="{}",e.height&&(o.height=e.height),e.width&&(o.width=e.width);for(let e=0;e<r.length;e++){const t=document.createElement("source");t.src=r[e],t.type=n[e],o.appendChild(t)}const i=e.ar_subtitles||null;if(i)for(let t=0;t<i.length;t++){const n=i[t],r=document.createElement("track");r.kind="subtitles",r.src=n.src,r.srclang=n.srclang,r.label=n.label,n.srclang===e.default&&(r.default=!0),o.appendChild(r)}const a=document.createElement("p");a.className="vjs-no-js";const s=document.createTextNode("To view this video please enable JavaScript, and consider upgrading to a web browser that supports HTML5 video");return a.appendChild(s),o.appendChild(a),setTimeout((function(){window.ready((function(n){const i=videojs(o);i.ready((function(){if(this.addClass("video_show"),this.removeClass("hide"),void 0!==e.ar_restricted_fragments&&e.ar_restricted_fragments.length>0){const n=r[0],o=parseInt(t.get_query_variable(n,"vbegin"));this.on("timeupdate",(function(n){t.skip_restricted(this,e.ar_restricted_fragments,o)}))}})),!0===e.play&&i.play()}))}),1),o},skip_restricted:function(e,t,n){const r=parseInt(e.currentTime()),o=r+parseInt(n);SHOW_DEBUG;const i=t.length;for(let a=0;a<i;a++){const i=t[a],s=i.tcin_secs,c=i.tcout_secs;if(o>s&&o<c){const t=c-n;e.currentTime(t),!0===SHOW_DEBUG&&(console.log("+++ Jumped to end time :",o,c),console.log("item:",i,"tcin_secs",n,"player_current_time",r,"time_to_jump_secs",t))}}return!0},timestamp_to_fecha:function(e){if(!e||e.length<4)return null;if(10===e.length){var t=e.substring(0,4),n=e.substring(5,7);const i=[];(o=e.substring(8,10))&&"00"!=o&&i.push(o),n&&"00"!=n&&i.push(n),t&&"00"!=t&&i.push(t);var r=i.join("-")}else{var o,i=new Date(e);t=i.getFullYear(),n=i.getMonth();function a(e){return e<10?"0"+e:e}r=a(o=i.getDate())+"-"+a(n+1)+"-"+t}return r},local_to_remote_path:function(e){if(!e)return null;if(-1===e.indexOf("http://")&&-1===e.indexOf("https://")){const t=page_globals.WEB_ENTITY;"/"!==(e=(e=e.replace("/dedalo4/","/dedalo/")).replace("/media_test/media_"+t,"/media")).charAt(0)&&(e="/"+e),e=page_globals.__WEB_MEDIA_BASE_URL__+e}return e},get_posterframe_from_video:function(e){let t=e;t=t.replace(/\/404\//g,"/posterframe/"),t=t.replace(/\.mp4/g,".jpg");const n=t.split("?");return void 0!==n[0]&&(t=n[0]),t},get_media_engine_url:function(e,t,n,r){if(!e)return null;const o=r||"av"===t?e:/^.{3,}_.{3,}_(\d{1,})\.[\S]{3,4}$/.exec(e)[1];return __WEB_MEDIA_ENGINE_URL__+"/"+t+"/"+o+(n?"/"+n:"")},open_note:function(e,t){for(var n=t.length-1;n>=0;n--){var r=t[n];if(e.dataset.tag_id===r.id)return $.colorbox({html:r.label,transition:"none"}),!0}return!1},set_background_color:function(e,t){e.setAttribute("crossOrigin","");const n=(new BackgroundColorTheif).getBackGroundColor(e);return t.style.backgroundColor="rgb("+n[0]+","+n[1]+","+n[2]+")",n},build_slider:function(e){const t=e.container;return new Promise((function(n){var r=common.create_dom_element({element_type:"ul",class_name:"slides",parent:t});const o=e.ar_elements.length;for(let t=0;t<o;t++){const o=e.ar_elements[t],l=o.image,d=o.title||null,u=o.text||null;if(!(l.length<4)){var i=common.create_dom_element({element_type:"li",class_name:"row_image",parent:r});common.create_dom_element({element_type:"div",class_name:"image_bg",parent:i}).style.backgroundImage="url("+l+")";var a=common.create_dom_element({element_type:"div",class_name:"image_text",parent:i}),s=common.create_dom_element({element_type:"h1",text_content:d,parent:a});common.create_dom_element({element_type:"a",parent:s}),common.create_dom_element({element_type:"span",text_content:u,parent:a});if(0===t){var c=new Image;c.addEventListener("load",(function(){n(r)}),!1),c.src=l}}}}))},get_scrollbar_width:function(){var e=document.createElement("div");e.style.visibility="hidden",e.style.width="100px",e.style.msOverflowStyle="scrollbar",document.body.appendChild(e);var t=e.offsetWidth;e.style.overflow="scroll";var n=document.createElement("div");n.style.width="100%",e.appendChild(n);var r=n.offsetWidth;return e.parentNode.removeChild(e),t-r},has_scrollbar:function(){if("number"==typeof window.innerWidth){return window.innerWidth>=document.documentElement.clientWidth}const e=document.documentElement||document.body;var t,n;void 0!==e.currentStyle&&(t=e.currentStyle.overflow),t=t||window.getComputedStyle(e,"").overflow,void 0!==e.currentStyle&&(n=e.currentStyle.overflowY),n=n||window.getComputedStyle(e,"").overflowY;var r=e.scrollHeight>e.clientHeight,o=/^(visible|auto)$/.test(t)||/^(visible|auto)$/.test(n);return r&&o||("scroll"===t||"scroll"===n)},clone_deep:function(e){const t=this;let n,r;if("object"!=typeof e)return e;if(!e)return e;if("[object Array]"===Object.prototype.toString.apply(e)){for(n=[],r=0;r<e.length;r+=1)n[r]=t.clone_deep(e[r]);return n}for(r in n={},e)e.hasOwnProperty(r)&&(n[r]=t.clone_deep(e[r]));return n},get_query_variable:function(e,t){const n=e.split("?")[1].split("&");for(var r=0;r<n.length;r++){const e=n[r].split("=");if(e[0]==t)return e[1]}return!1},register_events:function(e,t){for(let n in t){const r=t[n];e.addEventListener(n,(function(e){for(let t in r)r[t](e)}))}return!0},clean_gaps:function(e,t=" | ",n=", "){if(!e)return"";return(e=(e=(e=e.trim()).replace(/^\| |\| {1,2}\|| \|+$/g,"")).trim()).split(t).filter(e=>e.length>0).join(n)},when_in_dom:function(e,t){if(document.contains(e))return t();const n=new MutationObserver((function(r){document.contains(e)&&(n.disconnect(),t())}));return n.observe(document,{attributes:!1,childList:!0,characterData:!1,subtree:!0}),n},remove_gaps:function(e,t){if(!e)return null;return e.split(t).filter(Boolean).join(t)},split_data:function(e,t){return e&&("string"==typeof e||e instanceof String)?e.split(t):Array.isArray(e)?e:[]},clean_date:function(e,t){const n=e?e.split(t):[],r=[];for(let e=0;e<n.length;e++){const t=n[e].split("-"),o=[];if(t[2]&&"00 00:00:00"!==t[2]){const e=t[2].split(" ")[0];o.push(e)}t[1]&&"00"!==t[1]&&o.push(t[1]),t[0]&&"0000"!==t[0]&&o.push(t[0]);const i=o.join("-");r.push(i)}return r},download_item:function(e,t){return fetch(e).then((function(e){return e.blob()})).then((function(e){const n=URL.createObjectURL(e),r=common.create_dom_element({element_type:"a",href:n,download:t||"image.jpg"});r.click(),r.remove()})),!0},is_node:function(e){return!(void 0===e||!(e instanceof HTMLElement||e.nodeType))},is_element_in_viewport:function(e){const t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)},is_element_top_in_viewport:function(e){return e.getBoundingClientRect().top<=(window.innerHeight||document.documentElement.clientHeight)},lang_code_to_tld2:function(e){let t;switch(e){case"lg-spa":t="es";break;case"lg-eng":t="en";break;case"lg-cat":t="ca";break;case"lg-fra":t="fr";break;case"lg-ell":t="el";break;case"lg-deu":t="de";break;case"lg-por":t="pt";break;case"lg-eus":t="eu";break;case"lg-ara":t="ar";break;default:t="lang_code",console.warn("Impossible to convert lang_code to tld2 ISO 639-1 :",e)}return t},is_object:function(e){return"object"==typeof e&&null!==e},is_array:function(e){return Array.isArray(e)},get_today_date:function(){const e=new Date;return`${e.getDate().toString().padStart(2,"0")}/${(e.getMonth()+1).toString().padStart(2,"0")}/${e.getFullYear().toString().padStart(4,"0")} ${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}:${e.getSeconds().toString().padStart(2,"0")}`},load_style:function(e){return new Promise((function(t,n){const r=document.createElement("link");r.rel="stylesheet",r.onload=function(){t(e)},r.onerror=function(){n(e)},r.href=e,document.getElementsByTagName("head")[0].appendChild(r)}))},load_script:async function(e){return new Promise((function(t,n){const r=document.createElement("script");r.setAttribute("defer","defer"),r.onload=function(){t(e)},r.onerror=function(){n(e)},r.src=e,document.body.appendChild(r)}))}};function ready(e){"loading"!==document.readyState?e():document.addEventListener("DOMContentLoaded",e)}!function(e,t,n){n=n||window;var r=!1;n.addEventListener(e,(function(){r||(r=!0,requestAnimationFrame((function(){n.dispatchEvent(new CustomEvent(t)),r=!1})))}))}("resize","optimizedResize");