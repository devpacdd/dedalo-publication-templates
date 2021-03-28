"use strict";var free={row:null,view_mode:"list",form:null,list:null,pagination:null,init:function(e){const t=this;return t.row=e.row,t.pagination={limit:10,offset:0,total:null,n_nodes:10},new Promise((function(e){const n=["./common/factory/list_factory.js"],i=[];for(let e=0;e<n.length;e++)i.push(new Promise((function(t,i){const a=document.createElement("script");a.src=n[e]+"?"+environment.version,a.addEventListener("load",(function(){t(!0)})),document.head.appendChild(a)})));Promise.all(i).then((function(){e(!0)})),event_manager.subscribe("open_player",page.open_player),event_manager.subscribe("paginate",(function(e){t.pagination.offset=e,t.form_submit()}))}))},render:function(){const e=this.row,t=new DocumentFragment,n=page.render_lang_selector();t.appendChild(n);const i=page.render_menu();t.appendChild(i);const a=document.createElement("div");a.classList.add("wrapper"),t.appendChild(a);const r=document.createElement("h1");if(r.classList.add("title"),r.insertAdjacentHTML("afterbegin",e.title),a.appendChild(r),e.abstract){const t=document.createElement("div");t.classList.add("abstract"),t.insertAdjacentHTML("afterbegin",e.abstract),a.appendChild(t)}if(e.body){const t=document.createElement("div");t.classList.add("body"),t.insertAdjacentHTML("afterbegin",e.body),a.appendChild(t)}this.form=this.render_form(),t.appendChild(this.form);const s=document.createElement("div");return s.id="rows_list",s.classList.add("rows_list"),t.appendChild(s),t},render_form:function(){const e=this,t=document.createElement("form");t.type="form";const n=document.createElement("input");n.id="transcription_search",n.name="transcription_search",t.appendChild(n);const i=document.createElement("input");return i.type="submit",i.value="Search",i.classList.add("form-group","field"),i.addEventListener("click",(function(t){t.preventDefault(),e.form_submit()})),t.appendChild(i),t},form_submit:function(){const e=this,t=e.form.querySelector("#transcription_search"),n=document.querySelector("#rows_list");for(;n.hasChildNodes();)n.removeChild(n.lastChild);return e.search_rows({q:t.value,limit:e.pagination.limit,offset:e.pagination.offset,appearances_limit:2}).then(t=>{console.log("--\x3e free template form_submit API response:",t),e.pagination.total=t.total,e.render_data({target:n,ar_rows:t.result}).then((function(e){n.appendChild(e)}))})},search_rows:function(e){const t=e.q||null,n=e.limit,i=e.offset,a=e.appearances_limit||2;return new Promise((function(e){const r={dedalo_get:"free_search",q:t,appearances_limit:a,list_fragment:!0,video_fragment:!0,fragment_terms:!0,rows_per_page:n,count:!0,offset:i};data_manager.request({body:r}).then((function(t){e(t)}))}))},render_data:function(e){const t=this,n=e.target,i=e.ar_rows;return new Promise((function(e){const a=t.parse_list_data(i);t.list=t.list||new list_factory,t.list.init({target:n,data:a,fn_row_builder:t.render_row,pagination:t.pagination}),t.list.render_list().then((function(t){e(t)}))}))},parse_list_data:function(e){const t=[],n=e.length;for(let i=0;i<n;i++){const n=Object.assign({},e[i]),a=n.image&&n.image[0]&&n.image[0].image?environment.media_base_url+n.image[0].image:null,r={interview_section_id:parseInt(n.interview_section_id),av_section_id:parseInt(n.av_section_id),fragments:n.fragments,abstract:n.abstract,code:n.code,title:n.title,thumb_url:a,informant:n.informant&&n.informant.length>0?n.informant.map((function(e){return{name:e.name,surname:e.surname,birthplace:e.birthplace,birthdate:e.birthdate}})):null};t.push(r)}return t},render_row:function(e){const t=new DocumentFragment,n=document.createElement("div");n.classList.add("posterframe"),t.appendChild(n);const i=document.createElement("img");i.src=e.thumb_url,n.appendChild(i);const a=document.createElement("div");if(a.classList.add("row_info"),t.appendChild(a),e.informant&&e.informant.length>0&&e.informant[0].name.length>0){const t=document.createElement("h3");t.classList.add("informant_info"),t.innerHTML=function(e){if(!e||e.length<1)return"";const t=[];for(let n=0;n<e.length;n++){const i=e[n],a=[];i.name&&i.name.length>0&&a.push(i.name),i.surname&&i.surname.length>0&&a.push(i.surname),t.push(a.join(" "))}return t.join(", ")}(e.informant),a.appendChild(t)}if(e.abstract&&e.abstract.length>0){const t=document.createElement("input");t.type="button",t.value="Summary",t.classList.add("btn","btn-light","btn-block","primary"),a.appendChild(t),t.addEventListener("click",(function(){n.classList.toggle("hide")}));const n=document.createElement("div");n.innerHTML=e.abstract,n.classList.add("summary","hide"),a.appendChild(n)}const r=document.createElement("div");r.classList.add("group_fragment_info"),a.appendChild(r);for(let t=0;t<e.fragments.length;t++){const n=document.createElement("div");n.classList.add("fragment_info"),n.innerHTML=e.fragments[t].list_fragment,r.appendChild(n);const i=document.createElement("div");i.classList.add("buttons"),r.appendChild(i);const a=document.createElement("input");if(a.type="button",a.value="View video",a.classList.add("btn","btn-light","btn-block","primary"),i.appendChild(a),a.addEventListener("click",(function(){const n={section_id:e.interview_section_id,date:null,code:e.code,abstract:e.abstract},i=e.fragments.map((function(t){return{section_id:e.av_section_id,transcription:t.fragm,subtitles_url:t.subtitles_url,video_url:t.video_url}}));event_manager.publish("open_player",{data_video_items:i,data_interview:n,term:null,selected_key:t})})),e.terms_list){const t=document.createElement("div");t.classList.add("terms_list"),t.innerHTML=e.terms_list,r.appendChild(t)}}const s=document.createElement("div");return s.classList.add("row_node"),s.appendChild(t),s}};