(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{402:function(e,n){var t={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"query",name:{kind:"Name",value:"Articles"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"tag"}},type:{kind:"NamedType",name:{kind:"Name",value:"String"}},directives:[]}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"articles"},arguments:[{kind:"Argument",name:{kind:"Name",value:"where"},value:{kind:"ObjectValue",fields:[{kind:"ObjectField",name:{kind:"Name",value:"tags_contains"},value:{kind:"Variable",name:{kind:"Name",value:"tag"}}}]}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"title"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"slug"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"tags"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"lang"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"excerpt"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"image"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"url"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"caption"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"alternativeText"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"gallery"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"url"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"caption"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"alternativeText"},arguments:[],directives:[]}]}},{kind:"Field",name:{kind:"Name",value:"user"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"firstname"},arguments:[],directives:[]},{kind:"Field",name:{kind:"Name",value:"lastname"},arguments:[],directives:[]}]}}]}}]}}],loc:{start:0,end:335}};t.loc.source={body:"query Articles ( $tag: String ) {\r\n  articles ( where:{ tags_contains : $tag } ){\r\n    title\r\n    slug\r\n    tags\r\n    lang\r\n    excerpt\r\n    image {\r\n      url\r\n      caption\r\n      alternativeText\r\n    }\r\n    gallery {\r\n      url\r\n      caption\r\n      alternativeText\r\n    }\r\n    user {\r\n      firstname\r\n      lastname\r\n    }\r\n  }\r\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};var r={};function l(e,n){for(var i=0;i<e.definitions.length;i++){var element=e.definitions[i];if(element.name&&element.name.value==n)return element}}t.definitions.forEach((function(e){if(e.name){var n=new Set;!function e(n,t){if("FragmentSpread"===n.kind)t.add(n.name.value);else if("VariableDefinition"===n.kind){var r=n.type;"NamedType"===r.kind&&t.add(r.name.value)}n.selectionSet&&n.selectionSet.selections.forEach((function(n){e(n,t)})),n.variableDefinitions&&n.variableDefinitions.forEach((function(n){e(n,t)})),n.definitions&&n.definitions.forEach((function(n){e(n,t)}))}(e,n),r[e.name.value]=n}})),e.exports=t,e.exports.Articles=function(e,n){var t={kind:e.kind,definitions:[l(e,n)]};e.hasOwnProperty("loc")&&(t.loc=e.loc);var c=r[n]||new Set,d=new Set,o=new Set;for(c.forEach((function(e){o.add(e)}));o.size>0;){var m=o;o=new Set,m.forEach((function(e){d.has(e)||(d.add(e),(r[e]||new Set).forEach((function(e){o.add(e)})))}))}return d.forEach((function(n){var r=l(e,n);r&&t.definitions.push(r)})),t}(t,"Articles")},421:function(e,n,t){"use strict";t.r(n);var r=t(402),l=t.n(r),c=t(32),d=t(8);function o(object,e){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(object);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),n.push.apply(n,t)}return n}function m(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var v={name:"NuxpArticlesTags",components:{Loop:c.default},computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?o(Object(source),!0).forEach((function(n){m(e,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):o(Object(source)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(source,n))}))}return e}({},Object(d.b)(["settings"])),head:function(){if(this.articles)return{title:this.articles.SEO.title||this.article.title,meta:[{hid:"description",name:"description",content:this.articles.SEO.description||this.settings.seo.description||""}]}},apollo:{articles:{prefetch:!0,query:l.a,variables:function(){return{tag:this.$route.params.tag}}}}},f=t(4),component=Object(f.a)(v,(function(){var e=this.$createElement,n=this._self._c||e;return n("section",[this.articles?n("Loop",{attrs:{articles:this.articles}}):this._e()],1)}),[],!1,null,null,null);n.default=component.exports}}]);