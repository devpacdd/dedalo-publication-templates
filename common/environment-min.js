var environment={version:null,langs:[],lang:null,api_code:null,api_db_name:null,api_server_url:null,table_menu:null,table_menu_filter:null,menu_global_page:null,tstring:null,local_user_config:null,base_path:null,setup:function(n){this.version=n,this.base_path="./";return this.load_config()},load_config:function(){const n=this;return new Promise((function(e){n.set_local_user_config();const l=new Promise((function(e){const l=n.base_path+"/config/config.json";fetch(l).then(n=>n.json()).then((function(l){console.log("json:",l),n.lang=n.local_user_config.lang?n.local_user_config.lang:(console.warn("fixing lang lang_default:",l.lang_default),n.set_local_user_config({lang:l.lang_default}),l.lang_default),n.langs=l.langs,n.api_code=l.api_code,n.api_db_name=l.api_db_name,n.api_server_url=l.api_server_url,n.table_menu=l.table_menu,n.table_menu_filter=l.table_menu_filter,n.menu_global_page=l.menu_global_page,n.thesaurus_tables=l.thesaurus_tables,n.thesaurus_root_terms=l.thesaurus_root_terms,e(!0)}))})),o=new Promise((function(e){n.local_user_config.lang&&(n.lang=n.local_user_config.lang);(n.lang?(console.warn("lang is already fixed :",n.lang),new Promise((function(n){n(!0)}))):l).then((function(l){const o=n.base_path+"/lang/"+n.lang+".json";try{fetch(o).then(n=>n.json()).then((function(l){l?n.tstring=tstring=l:console.log("Error. File "+o+" is not a valid json file",l),e(!0)}))}catch(n){console.error("error:",n),e(!1)}}))}));Promise.all([l,o]).then(n=>{e(!0)})}))},set_local_user_config:function(n){const e=this,l=localStorage.getItem("local_user_config");if(l)e.local_user_config=JSON.parse(l),console.log("--\x3e self.local_user_config 1 (already exists):",e.local_user_config);else{const n={};localStorage.setItem("local_user_config",JSON.stringify(n)),e.local_user_config=n,console.log("--\x3e self.local_user_config 2 (create new one):",e.local_user_config)}if(n){for(const l in n)e.local_user_config[l]=n[l];localStorage.setItem("local_user_config",JSON.stringify(e.local_user_config))}return e.local_user_config}};function dom_ready(n){"loading"!==document.readyState?n():document.addEventListener("DOMContentLoaded",n)}