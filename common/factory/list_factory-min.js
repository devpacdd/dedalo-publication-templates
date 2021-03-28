"use strict";var tstring=tstring||{};function list_factory(){this.data=null,this.fn_row_builder=null,this.pagination=null,this.caller,this.init=function(t){return this.data=t.data||[],this.fn_row_builder=t.fn_row_builder,this.pagination=void 0===t.pagination||null===t.pagination?{total:null,limit:10,offset:0,n_nodes:10}:t.pagination,this.caller=t.caller,this.status="initied",!0},this.render_list=function(){const t=this;return new Promise((function(e){const n=new DocumentFragment,a=t.data.length;let i;if(t.pagination){i=t.pagination,i.count=a,i.class_name="top";const e=t.render_pagination(i);e&&n.appendChild(e)}const s=t.create_dom_element({element_type:"div",class_name:"rows_container",parent:n});t.caller&&t.caller.view_mode&&"list_images"===t.caller.view_mode&&t.create_dom_element({element_type:"div",class_name:"grid-sizer",parent:s});for(let e=0;e<a;e++){const n=t.fn_row_builder(t.data[e]);n&&s.appendChild(n)}t.pagination&&(i.class_name="bottom",n.appendChild(t.render_pagination(i))),e(n)}))},this.render_pagination=function(t){t.class_name;const e=this.create_dom_element({element_type:"div",class_name:"pagination"+(t.class_name?" "+t.class_name:"")}),n=this.paginator.get_full_paginator(t);n&&e.appendChild(n);this.create_dom_element({element_type:"div",class_name:"spacer",parent:e});return e.appendChild(this.paginator.get_totals_node(t)),e},this.paginator={list_factory:this,_string:{to:tstring.to||"to",of:tstring.of||"of",first:tstring.first||"<<",prev:tstring.prev||"Prev",next:tstring.next||"Next",last:tstring.last||">>",showed:tstring.showed||"Showed"},get_full_paginator:function(t){const e=parseInt(t.total),n=parseInt(t.limit),a=parseInt(t.offset),i=t.n_nodes?parseInt(t.n_nodes):0,s=this.build_page_nodes(e,n,a,i);return this.build_paginator_html(s,!1)},build_page_nodes:function(t,e,n,a){const i=[];if(t<e)return i;a&&0!==a||(a=6),i.push({label:this._string.first,offset_value:0,type:"navigator",active:n>=e,id:"first"}),i.push({label:this._string.prev,offset_value:n-e>0?n-e:0,type:"navigator",active:n>=e,id:"previous"});const s=e>0?Math.ceil(t/e):0,l=e>0?Math.ceil(n/e)+1:1;let o=Math.ceil(a/2);if(l<=o&&(o=2*o-l+1),s>0)for(let t=1;t<=s;t++){const a=t-1==n/e,s=!a,r=(t-1)*e;(t>=l-o&&t<=l||t>=l-o&&t<=l+o)&&i.push({label:t,offset_value:r,type:"page",selected:a,active:s,id:t})}i.push({label:this._string.next,offset_value:n+e,type:"navigator",active:n<t-e,id:"next"}),i.push({label:this._string.last||">>",offset_value:(s-1)*e,type:"navigator",active:n<t-e,id:"last"});return{total:t,limit:e,offset:n,nodes:a,n_pages:s,n_pages_group:o,current_page:l,ar_nodes:i}},build_paginator_html:function(t){const e=this,n=new DocumentFragment,a=t.ar_nodes||[],i=a.length;for(let t=0;t<i;t++){const i=a[t];let s="navigator"===i.type?i.type+" "+i.id:i.type;!0===i.selected&&(s+=" selected");const l=e.create_dom_element({element_type:"a",class_name:s+(i.active?"":" unactive"),text_content:i.label,parent:n});!0===i.active&&l.addEventListener("click",(function(){event_manager.publish("paginate",i.offset_value)}))}const s=e.list_factory.create_dom_element({element_type:"div",class_name:"paginator_wrapper navigator"});return s.appendChild(n),s},get_totals_node:function(t){const e=t.total,n=(t.limit,t.offset),a=t.count,i=0==e?0:Math.ceil(1*n)||1,s=n+a,l=0===e?this._string.showed+" "+e:this._string.showed+" "+i+" "+this._string.to+" "+s+" "+this._string.of+" "+e;return this.list_factory.create_dom_element({element_type:"div",class_name:"totals",text_content:l})}},this.create_dom_element=function(t){const e=t.element_type,n=t.parent,a=t.class_name,i=t.style,s=t.data_set||t.dataset,l=t.custom_function_events,o=t.title_label||t.title,r=t.text_node,_=t.text_content,c=t.inner_html,d=t.href,p=t.id,g=t.draggable,f=t.value,u=t.download,h=t.src,m=t.placeholder,v=t.type,y=t.target,b=document.createElement(e);if(p&&(b.id=p),"a"===e&&(b.href=d||"javascript:;",y&&(b.target=y)),a&&(b.className=a),i)for(w in i)b.style[w]=i[w];if(o&&(b.title=o),s)for(var w in s)b.dataset[w]=s[w];if(f&&(b.value=f),v&&b.setAttribute("type",v),l){const t=l.length;for(let e=0;e<t;e++){const t=l[e].name,n=l[e].type,a=l[e].function_arguments;this.create_custom_events(b,n,t,a)}}if(r)if("span"===e)b.textContent=r;else{const t=document.createElement("span");t.insertAdjacentHTML("afterbegin"," "+r),b.appendChild(t)}else _?b.textContent=_:c&&b.insertAdjacentHTML("afterbegin",c);return n&&n.appendChild(b),g&&(b.draggable=g),u&&b.setAttribute("download",u),h&&(b.src=h),m&&(b.placeholder=m),b}}