function t(t,e,i,s){var a,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(a=t[n])&&(o=(r<3?a(o):r>3?a(e,i,o):a(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,i=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),a=new WeakMap;let r=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&a.set(e,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new r(i,t,s)},n=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,s))(e)})(t):t,{is:l,defineProperty:d,getOwnPropertyDescriptor:c,getOwnPropertyNames:p,getOwnPropertySymbols:h,getPrototypeOf:u}=Object,b=globalThis,g=b.trustedTypes,v=g?g.emptyScript:"",m=b.reactiveElementPolyfillSupport,_=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},w=(t,e)=>!l(t,e),f={attribute:!0,type:String,converter:y,reflect:!1,useDefault:!1,hasChanged:w};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),b.litPropertyMetadata??=new WeakMap;let $=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=f){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&d(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:a}=c(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const r=s?.call(this);a?.call(this,e),this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??f}static _$Ei(){if(this.hasOwnProperty(_("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(_("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(_("properties"))){const t=this.properties,e=[...p(t),...h(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(n(t))}else void 0!==t&&e.push(n(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,s)=>{if(i)t.adoptedStyleSheets=s.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of s){const s=document.createElement("style"),a=e.litNonce;void 0!==a&&s.setAttribute("nonce",a),s.textContent=i.cssText,t.appendChild(s)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const a=(void 0!==i.converter?.toAttribute?i.converter:y).toAttribute(e,i.type);this._$Em=t,null==a?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=s;const r=a.fromAttribute(e,t.type);this[s]=r??this._$Ej?.get(s)??r,this._$Em=null}}requestUpdate(t,e,i,s=!1,a){if(void 0!==t){const r=this.constructor;if(!1===s&&(a=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??w)(a,e)||i.useDefault&&i.reflect&&a===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:a},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),!0!==a||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[_("elementProperties")]=new Map,$[_("finalized")]=new Map,m?.({ReactiveElement:$}),(b.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,A=t=>t,k=x.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:t=>t}):void 0,C="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,D="?"+E,z=`<${D}>`,P=document,R=()=>P.createComment(""),T=t=>null===t||"object"!=typeof t&&"function"!=typeof t,W=Array.isArray,U="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,N=/-->/g,M=/>/g,F=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),H=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,L=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),V=new WeakMap,Z=P.createTreeWalker(P,129);function Y(t,e){if(!W(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(e):e}const Q=(t,e)=>{const i=t.length-1,s=[];let a,r=2===e?"<svg>":3===e?"<math>":"",o=O;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,c=0;for(;c<i.length&&(o.lastIndex=c,l=o.exec(i),null!==l);)c=o.lastIndex,o===O?"!--"===l[1]?o=N:void 0!==l[1]?o=M:void 0!==l[2]?(B.test(l[2])&&(a=RegExp("</"+l[2],"g")),o=F):void 0!==l[3]&&(o=F):o===F?">"===l[0]?(o=a??O,d=-1):void 0===l[1]?d=-2:(d=o.lastIndex-l[2].length,n=l[1],o=void 0===l[3]?F:'"'===l[3]?j:H):o===j||o===H?o=F:o===N||o===M?o=O:(o=F,a=void 0);const p=o===F&&t[e+1].startsWith("/>")?" ":"";r+=o===O?i+z:d>=0?(s.push(n),i.slice(0,d)+C+i.slice(d)+E+p):i+E+(-2===d?e:p)}return[Y(t,r+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class G{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let a=0,r=0;const o=t.length-1,n=this.parts,[l,d]=Q(t,e);if(this.el=G.createElement(l,i),Z.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Z.nextNode())&&n.length<o;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(C)){const e=d[r++],i=s.getAttribute(t).split(E),o=/([.?@])?(.*)/.exec(e);n.push({type:1,index:a,name:o[2],strings:i,ctor:"."===o[1]?et:"?"===o[1]?it:"@"===o[1]?st:tt}),s.removeAttribute(t)}else t.startsWith(E)&&(n.push({type:6,index:a}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(E),e=t.length-1;if(e>0){s.textContent=k?k.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],R()),Z.nextNode(),n.push({type:2,index:++a});s.append(t[e],R())}}}else if(8===s.nodeType)if(s.data===D)n.push({type:2,index:a});else{let t=-1;for(;-1!==(t=s.data.indexOf(E,t+1));)n.push({type:7,index:a}),t+=E.length-1}a++}}static createElement(t,e){const i=P.createElement("template");return i.innerHTML=t,i}}function J(t,e,i=t,s){if(e===I)return e;let a=void 0!==s?i._$Co?.[s]:i._$Cl;const r=T(e)?void 0:e._$litDirective$;return a?.constructor!==r&&(a?._$AO?.(!1),void 0===r?a=void 0:(a=new r(t),a._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=a:i._$Cl=a),void 0!==a&&(e=J(t,a._$AS(t,e.values),a,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??P).importNode(e,!0);Z.currentNode=s;let a=Z.nextNode(),r=0,o=0,n=i[0];for(;void 0!==n;){if(r===n.index){let e;2===n.type?e=new X(a,a.nextSibling,this,t):1===n.type?e=new n.ctor(a,n.name,n.strings,this,t):6===n.type&&(e=new at(a,this,t)),this._$AV.push(e),n=i[++o]}r!==n?.index&&(a=Z.nextNode(),r++)}return Z.currentNode=P,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=J(this,t,e),T(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>W(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&T(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=G.createElement(Y(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new K(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=V.get(t.strings);return void 0===e&&V.set(t.strings,e=new G(t)),e}k(t){W(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const a of t)s===e.length?e.push(i=new X(this.O(R()),this.O(R()),this,this.options)):i=e[s],i._$AI(a),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class tt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,a){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const a=this.strings;let r=!1;if(void 0===a)t=J(this,t,e,0),r=!T(t)||t!==this._$AH&&t!==I,r&&(this._$AH=t);else{const s=t;let o,n;for(t=a[0],o=0;o<a.length-1;o++)n=J(this,s[i+o],e,o),n===I&&(n=this._$AH[o]),r||=!T(n)||n!==this._$AH[o],n===q?t=q:t!==q&&(t+=(n??"")+a[o+1]),this._$AH[o]=n}r&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends tt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends tt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class st extends tt{constructor(t,e,i,s,a){super(t,e,i,s,a),this.type=5}_$AI(t,e=this){if((t=J(this,t,e,0)??q)===I)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,a=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class at{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){J(this,t)}}const rt=x.litHtmlPolyfillSupport;rt?.(G,X),(x.litHtmlVersions??=[]).push("3.3.2");const ot=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class nt extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let a=s._$litPart$;if(void 0===a){const t=i?.renderBefore??null;s._$litPart$=a=new X(e.insertBefore(R(),t),t,void 0,i??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}nt._$litElement$=!0,nt.finalized=!0,ot.litElementHydrateSupport?.({LitElement:nt});const lt=ot.litElementPolyfillSupport;lt?.({LitElement:nt}),(ot.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const dt=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ct={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:w},pt=(t=ct,e,i)=>{const{kind:s,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),r.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const a=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,a,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];e.call(this,i),this.requestUpdate(s,a,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ht(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ut(t){return ht({...t,state:!0,attribute:!1})}const bt=o`
  :host {
    --wc-primary: #722f37;
    --wc-primary-light: #9a4a54;
    --wc-bg: var(--ha-card-background, var(--card-background-color, #fff));
    --wc-text: var(--primary-text-color, #212121);
    --wc-text-secondary: var(--secondary-text-color, #727272);
    --wc-border: var(--divider-color, #e0e0e0);
    --wc-shadow: var(--ha-card-box-shadow, 0 2px 6px rgba(0, 0, 0, 0.1));
    font-family: var(--paper-font-body1_-_font-family, "Roboto", sans-serif);
  }

  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 16px 0;
    font-size: 1.2em;
    font-weight: 500;
    color: var(--wc-text);
  }

  .card-content {
    padding: 16px;
  }

  .stats-bar {
    display: flex;
    gap: 16px;
    padding: 8px 16px;
    font-size: 0.85em;
    color: var(--wc-text-secondary);
  }

  .stats-bar .stat {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .stats-bar .stat-value {
    font-weight: 600;
    color: var(--wc-text);
  }

  .tab-bar {
    display: flex;
    gap: 4px;
    padding: 8px 16px;
    overflow-x: auto;
    border-bottom: 1px solid var(--wc-border);
  }

  .tab {
    padding: 6px 16px;
    border-radius: 20px;
    border: 1px solid var(--wc-border);
    background: transparent;
    color: var(--wc-text-secondary);
    cursor: pointer;
    white-space: nowrap;
    font-size: 0.85em;
    transition: all 0.2s;
  }

  .tab:hover {
    background: rgba(114, 47, 55, 0.08);
  }

  .tab.active {
    background: var(--wc-primary);
    color: #fff;
    border-color: var(--wc-primary);
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 500;
    transition: all 0.2s;
  }

  .btn-primary {
    background: var(--wc-primary);
    color: #fff;
  }

  .btn-primary:hover {
    background: var(--wc-primary-light);
  }

  .btn-outline {
    background: transparent;
    color: var(--wc-primary);
    border: 1px solid var(--wc-primary);
  }

  .btn-outline:hover {
    background: rgba(114, 47, 55, 0.08);
  }

  .btn-icon {
    background: transparent;
    border: none;
    color: var(--wc-text-secondary);
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .btn-icon:hover {
    background: rgba(0, 0, 0, 0.06);
  }

  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    animation: fadeIn 0.2s ease;
  }

  .dialog {
    background: var(--wc-bg);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.24);
    max-width: 500px;
    width: 90%;
    max-height: 85vh;
    overflow-y: auto;
    animation: slideUp 0.3s ease;
  }

  .dialog-header {
    padding: 20px 20px 12px;
    font-size: 1.2em;
    font-weight: 500;
    border-bottom: 1px solid var(--wc-border);
  }

  .dialog-body {
    padding: 16px 20px;
  }

  .dialog-footer {
    padding: 12px 20px 20px;
    display: flex;
    gap: 8px;
    justify-content: flex-end;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-group label {
    display: block;
    font-size: 0.85em;
    font-weight: 500;
    color: var(--wc-text-secondary);
    margin-bottom: 4px;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--wc-border);
    border-radius: 8px;
    font-size: 0.95em;
    background: var(--wc-bg);
    color: var(--wc-text);
    box-sizing: border-box;
  }

  .form-group textarea {
    min-height: 60px;
    resize: vertical;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`,gt={red:"#722F37",white:"#F5E6CA","rosé":"#E8A0BF",sparkling:"#D4E09B",dessert:"#DAA520"},vt={red:"Red",white:"White","rosé":"Rosé",sparkling:"Sparkling",dessert:"Dessert"};let mt=class extends nt{constructor(){super(...arguments),this.wines=[]}_getWineAt(t,e){return this.wines.find(i=>i.cabinet_id===this.cabinet.id&&i.row===t&&i.col===e)}_getBottomZoneWines(){return this.wines.filter(t=>t.cabinet_id===this.cabinet.id&&"bottom"===t.zone)}_onCellClick(t,e,i){this.dispatchEvent(new CustomEvent("cell-click",{detail:{cabinet:this.cabinet,row:t,col:e,wine:i},bubbles:!0,composed:!0}))}_onZoneClick(t){this.dispatchEvent(new CustomEvent("zone-click",{detail:{cabinet:this.cabinet,zone:"bottom",wine:t},bubbles:!0,composed:!0}))}render(){const{rows:t,cols:e}=this.cabinet;return L`
      <div class="cabinet">
        <div class="cabinet-name">${this.cabinet.name}</div>
        <div class="grid-inner">
          ${Array.from({length:t},(t,i)=>L`
            <div class="row">
              ${Array.from({length:e},(t,e)=>{const s=this._getWineAt(i,e),a=s?gt[s.type]||gt.red:"transparent";return L`
                  <div
                    class="cell ${s?"filled":"empty"}"
                    style=${s?`background: ${a}`:""}
                    @click=${()=>this._onCellClick(i,e,s)}
                    title=${s?`${s.name} (${s.vintage||"NV"})`:`Empty - Row ${i+1}, Col ${e+1}`}
                  >
                    ${s?L`<span class="bottle-label">${s.vintage||"NV"}</span>`:q}
                  </div>
                `})}
            </div>
          `)}
        </div>
        ${this.cabinet.has_bottom_zone?L`
              <div class="bottom-zone" @click=${()=>this._onZoneClick()}>
                <div class="bottom-zone-label">
                  ${this.cabinet.bottom_zone_name}
                </div>
                ${this._getBottomZoneWines().map(t=>L`
                    <div
                      class="zone-bottle"
                      style="background: ${gt[t.type]||gt.red}"
                      @click=${e=>{e.stopPropagation(),this._onZoneClick(t)}}
                      title="${t.name}"
                    >
                      ${(t.vintage||"NV").toString().slice(-2)}
                    </div>
                  `)}
              </div>
            `:q}
      </div>
    `}};mt.styles=[bt,o`
      :host {
        display: block;
      }

      .cabinet {
        background: linear-gradient(135deg, #8b6914 0%, #c4973b 50%, #8b6914 100%);
        border-radius: 12px;
        padding: 8px;
        box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3),
          0 4px 12px rgba(0, 0, 0, 0.2);
      }

      .cabinet-name {
        text-align: center;
        color: #f5e6ca;
        font-size: 0.8em;
        font-weight: 600;
        padding: 4px 0;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      }

      .grid-inner {
        background: linear-gradient(180deg, #1a1a3a 0%, #0d0d2b 100%);
        border-radius: 8px;
        padding: 6px;
        position: relative;
        overflow: hidden;
      }

      /* Blue LED glow effect */
      .grid-inner::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
          ellipse at center,
          rgba(50, 100, 255, 0.15) 0%,
          transparent 70%
        );
        pointer-events: none;
      }

      .row {
        display: flex;
        gap: 2px;
        margin-bottom: 2px;
        position: relative;
      }

      /* Scalloped shelf appearance */
      .row::after {
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, #6b5010 0%, #a07828 50%, #6b5010 100%);
        border-radius: 0 0 2px 2px;
      }

      .cell {
        flex: 1;
        aspect-ratio: 1;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
        min-width: 0;
        z-index: 1;
      }

      .cell.empty {
        background: rgba(255, 255, 255, 0.05);
        border: 1px dashed rgba(255, 255, 255, 0.15);
      }

      .cell.empty:hover {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.3);
      }

      .cell.filled {
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4),
          inset 0 -2px 4px rgba(0, 0, 0, 0.3),
          0 0 8px rgba(50, 100, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }

      .cell.filled:hover {
        transform: scale(1.15);
        z-index: 10;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5),
          0 0 16px rgba(50, 100, 255, 0.3);
      }

      .cell .bottle-label {
        position: absolute;
        bottom: -14px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 6px;
        color: rgba(255, 255, 255, 0.6);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 40px;
        display: none;
        pointer-events: none;
      }

      .cell.filled:hover .bottle-label {
        display: block;
      }

      .bottom-zone {
        margin-top: 8px;
        background: linear-gradient(135deg, #6b5010 0%, #8b6914 100%);
        border-radius: 6px;
        padding: 8px;
        min-height: 40px;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        align-items: center;
        cursor: pointer;
        position: relative;
        z-index: 1;
      }

      .bottom-zone-label {
        font-size: 0.65em;
        color: rgba(255, 255, 255, 0.6);
        width: 100%;
        text-align: center;
      }

      .zone-bottle {
        width: 28px;
        height: 28px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 8px;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
        transition: transform 0.2s;
      }

      .zone-bottle:hover {
        transform: scale(1.1);
      }
    `],t([ht({attribute:!1})],mt.prototype,"cabinet",void 0),t([ht({attribute:!1})],mt.prototype,"wines",void 0),mt=t([dt("cabinet-grid")],mt);let _t=class extends nt{constructor(){super(...arguments),this.wine=null,this.open=!1}_close(){this.open=!1,this.dispatchEvent(new CustomEvent("close"))}_onRemove(){this.wine&&(this.dispatchEvent(new CustomEvent("remove-wine",{detail:{wine_id:this.wine.id},bubbles:!0,composed:!0})),this._close())}_onMove(){this.wine&&(this.dispatchEvent(new CustomEvent("move-wine",{detail:{wine:this.wine},bubbles:!0,composed:!0})),this._close())}render(){if(!this.open||!this.wine)return q;const t=this.wine,e=gt[t.type]||gt.red,i=vt[t.type]||t.type;return L`
      <div class="dialog-overlay" @click=${this._close}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="wine-header">
            ${t.image_url?L`<img class="wine-image" src="${t.image_url}" alt="${t.name}" />`:L`
                  <div
                    class="wine-image-placeholder"
                    style="background: ${e}"
                  >
                    🍷
                  </div>
                `}
            <div class="wine-title">
              <div class="wine-name">${t.name}</div>
              <div class="wine-winery">${t.winery}</div>
              <span
                class="wine-type-badge"
                style="background: ${e}"
              >
                ${i}
              </span>
              ${t.rating?L`
                    <div class="wine-rating">
                      <span class="rating-star">★</span>
                      ${t.rating.toFixed(1)}
                    </div>
                  `:q}
            </div>
          </div>

          <div class="details-grid">
            ${t.vintage?L`
                  <div class="detail-item">
                    <span class="detail-label">Vintage</span>
                    <span class="detail-value">${t.vintage}</span>
                  </div>
                `:q}
            ${t.region?L`
                  <div class="detail-item">
                    <span class="detail-label">Region</span>
                    <span class="detail-value">${t.region}</span>
                  </div>
                `:q}
            ${t.country?L`
                  <div class="detail-item">
                    <span class="detail-label">Country</span>
                    <span class="detail-value">${t.country}</span>
                  </div>
                `:q}
            ${t.grape_variety?L`
                  <div class="detail-item">
                    <span class="detail-label">Grape</span>
                    <span class="detail-value">${t.grape_variety}</span>
                  </div>
                `:q}
            ${t.price?L`
                  <div class="detail-item">
                    <span class="detail-label">Price</span>
                    <span class="detail-value">$${t.price.toFixed(2)}</span>
                  </div>
                `:q}
            ${t.purchase_date?L`
                  <div class="detail-item">
                    <span class="detail-label">Purchased</span>
                    <span class="detail-value">${t.purchase_date}</span>
                  </div>
                `:q}
            ${t.drink_by?L`
                  <div class="detail-item">
                    <span class="detail-label">Drink By</span>
                    <span class="detail-value">${t.drink_by}</span>
                  </div>
                `:q}
            ${t.barcode?L`
                  <div class="detail-item">
                    <span class="detail-label">Barcode</span>
                    <span class="detail-value">${t.barcode}</span>
                  </div>
                `:q}
          </div>

          ${t.notes?L`
                <div class="wine-notes">
                  <div class="detail-label" style="margin-bottom: 4px">
                    Notes
                  </div>
                  <div class="wine-notes-text">${t.notes}</div>
                </div>
              `:q}

          <div class="actions">
            <button class="btn btn-outline" @click=${this._onMove}>
              ↔ Move
            </button>
            <button
              class="btn btn-outline"
              style="color: #c62828; border-color: #c62828"
              @click=${this._onRemove}
            >
              ✕ Remove
            </button>
            <span style="flex:1"></span>
            <button class="btn btn-primary" @click=${this._close}>
              Close
            </button>
          </div>
        </div>
      </div>
    `}};_t.styles=[bt,o`
      .wine-header {
        display: flex;
        gap: 16px;
        padding: 20px;
      }

      .wine-image {
        width: 80px;
        height: 120px;
        border-radius: 8px;
        object-fit: cover;
        background: #f0f0f0;
        flex-shrink: 0;
      }

      .wine-image-placeholder {
        width: 80px;
        height: 120px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2em;
        flex-shrink: 0;
        color: #fff;
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      }

      .wine-title {
        flex: 1;
        min-width: 0;
      }

      .wine-name {
        font-size: 1.2em;
        font-weight: 600;
        color: var(--wc-text);
        margin-bottom: 4px;
      }

      .wine-winery {
        font-size: 0.9em;
        color: var(--wc-text-secondary);
        margin-bottom: 8px;
      }

      .wine-type-badge {
        display: inline-block;
        padding: 2px 10px;
        border-radius: 12px;
        font-size: 0.75em;
        font-weight: 600;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .wine-rating {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-top: 8px;
        font-size: 0.9em;
      }

      .rating-star {
        color: #f5a623;
      }

      .details-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        padding: 0 20px 16px;
      }

      .detail-item {
        display: flex;
        flex-direction: column;
      }

      .detail-label {
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 2px;
      }

      .detail-value {
        font-size: 0.95em;
        color: var(--wc-text);
        font-weight: 500;
      }

      .wine-notes {
        padding: 0 20px 16px;
      }

      .wine-notes-text {
        font-size: 0.9em;
        color: var(--wc-text-secondary);
        font-style: italic;
        background: rgba(0, 0, 0, 0.03);
        padding: 10px;
        border-radius: 8px;
      }

      .actions {
        display: flex;
        gap: 8px;
        padding: 12px 20px 20px;
        border-top: 1px solid var(--wc-border);
      }
    `],t([ht({attribute:!1})],_t.prototype,"wine",void 0),t([ht({type:Boolean})],_t.prototype,"open",void 0),_t=t([dt("wine-detail-dialog")],_t);let yt=class extends nt{constructor(){super(...arguments),this.open=!1,this.cabinets=[],this.preselectedCabinet="",this.preselectedRow=null,this.preselectedCol=null,this._step="scan",this._barcode="",this._loading=!1,this._lookupResult=null,this._wineData={},this._error="",this._steps=["scan","details","location","confirm"]}updated(t){t.has("open")&&this.open&&(this._step="scan",this._barcode="",this._lookupResult=null,this._error="",this._loading=!1,this._wineData={name:"",winery:"",type:"red",vintage:null,region:"",country:"",grape_variety:"",price:null,notes:"",cabinet_id:this.preselectedCabinet||"",row:this.preselectedRow,col:this.preselectedCol})}_close(){this.open=!1,this.dispatchEvent(new CustomEvent("close"))}async _lookupBarcode(){if(this._barcode.trim()){this._loading=!0,this._error="";try{const t=await this.hass.callWS({type:"wine_cellar/lookup_barcode",barcode:this._barcode.trim()});t.result?(this._lookupResult=t.result,this._wineData={...this._wineData,barcode:this._barcode.trim(),name:t.result.name||"",winery:t.result.winery||"",type:t.result.type||"red",vintage:t.result.vintage,region:t.result.region||"",country:t.result.country||"",grape_variety:t.result.grape_variety||"",rating:t.result.rating,image_url:t.result.image_url||""},this._step="details"):(this._error="No results found. You can enter details manually.",this._wineData={...this._wineData,barcode:this._barcode.trim()})}catch(t){this._error="Lookup failed. You can enter details manually."}this._loading=!1}}async _searchWine(){const t=this.shadowRoot?.querySelector(".search-input");if(t?.value.trim()){this._loading=!0,this._error="";try{const e=await this.hass.callWS({type:"wine_cellar/search_wine",query:t.value.trim()});if(e.results&&e.results.length>0){const t=e.results[0];this._lookupResult=t,this._wineData={...this._wineData,name:t.name||"",winery:t.winery||"",type:t.type||"red",vintage:t.vintage,region:t.region||"",country:t.country||"",grape_variety:t.grape_variety||"",rating:t.rating,image_url:t.image_url||""},this._step="details"}else this._error="No results found. You can enter details manually."}catch{this._error="Search failed. You can enter details manually."}this._loading=!1}}_goToStep(t){this._step=t}_updateField(t,e){this._wineData={...this._wineData,[t]:e}}async _addWine(){this._loading=!0;try{await this.hass.callWS({type:"wine_cellar/add_wine",wine:this._wineData}),this.dispatchEvent(new CustomEvent("wine-added",{bubbles:!0,composed:!0})),this._close()}catch(t){this._error="Failed to add wine."}this._loading=!1}_renderStepIndicator(){const t=this._steps.indexOf(this._step);return L`
      <div class="step-indicator">
        ${this._steps.map((e,i)=>L`
            <div
              class="step-dot ${i===t?"active":""} ${i<t?"done":""}"
            ></div>
          `)}
      </div>
    `}_renderScanStep(){return L`
      <div class="scan-section">
        <div style="font-size: 2.5em; margin-bottom: 8px">📷</div>
        <div style="font-weight: 500; margin-bottom: 4px">Scan or Enter Barcode</div>
        <div style="font-size: 0.85em; color: var(--wc-text-secondary)">
          Enter a barcode number to look up wine details
        </div>

        <div class="barcode-input-row">
          <input
            type="text"
            placeholder="Enter barcode..."
            .value=${this._barcode}
            @input=${t=>this._barcode=t.target.value}
            @keypress=${t=>"Enter"===t.key&&this._lookupBarcode()}
          />
          <button class="btn btn-primary" @click=${this._lookupBarcode}>
            ${this._loading?L`<span class="loading-spinner"></span>`:"Look Up"}
          </button>
        </div>

        ${this._lookupResult?L`
              <div class="lookup-result">
                <div class="result-name">${this._lookupResult.name}</div>
                <div class="result-detail">
                  ${this._lookupResult.winery}
                  ${this._lookupResult.vintage?` · ${this._lookupResult.vintage}`:""}
                </div>
              </div>
            `:q}

        <div class="or-divider">or search by name</div>

        <div class="barcode-input-row">
          <input
            class="search-input"
            type="text"
            placeholder="Search wine name..."
            @keypress=${t=>"Enter"===t.key&&this._searchWine()}
          />
          <button class="btn btn-outline" @click=${this._searchWine}>
            Search
          </button>
        </div>

        ${this._error?L`<div class="error-msg">${this._error}</div>`:q}
      </div>

      <div class="dialog-footer">
        <button class="btn btn-outline" @click=${this._close}>Cancel</button>
        <button
          class="btn btn-outline"
          @click=${()=>this._goToStep("details")}
        >
          Skip → Manual Entry
        </button>
      </div>
    `}_renderDetailsStep(){return L`
      <div class="dialog-body">
        <div class="form-group">
          <label>Wine Name *</label>
          <input
            type="text"
            .value=${this._wineData.name||""}
            @input=${t=>this._updateField("name",t.target.value)}
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Winery</label>
            <input
              type="text"
              .value=${this._wineData.winery||""}
              @input=${t=>this._updateField("winery",t.target.value)}
            />
          </div>
          <div class="form-group">
            <label>Vintage</label>
            <input
              type="number"
              .value=${this._wineData.vintage?.toString()||""}
              @input=${t=>this._updateField("vintage",parseInt(t.target.value)||null)}
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Type</label>
            <select
              .value=${this._wineData.type||"red"}
              @change=${t=>this._updateField("type",t.target.value)}
            >
              ${Object.entries(vt).map(([t,e])=>L`<option value=${t}>${e}</option>`)}
            </select>
          </div>
          <div class="form-group">
            <label>Price</label>
            <input
              type="number"
              step="0.01"
              .value=${this._wineData.price?.toString()||""}
              @input=${t=>this._updateField("price",parseFloat(t.target.value)||null)}
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Region</label>
            <input
              type="text"
              .value=${this._wineData.region||""}
              @input=${t=>this._updateField("region",t.target.value)}
            />
          </div>
          <div class="form-group">
            <label>Country</label>
            <input
              type="text"
              .value=${this._wineData.country||""}
              @input=${t=>this._updateField("country",t.target.value)}
            />
          </div>
        </div>

        <div class="form-group">
          <label>Grape Variety</label>
          <input
            type="text"
            .value=${this._wineData.grape_variety||""}
            @input=${t=>this._updateField("grape_variety",t.target.value)}
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Purchase Date</label>
            <input
              type="date"
              .value=${this._wineData.purchase_date||""}
              @input=${t=>this._updateField("purchase_date",t.target.value)}
            />
          </div>
          <div class="form-group">
            <label>Drink By</label>
            <input
              type="text"
              placeholder="e.g. 2030"
              .value=${this._wineData.drink_by||""}
              @input=${t=>this._updateField("drink_by",t.target.value)}
            />
          </div>
        </div>

        <div class="form-group">
          <label>Notes</label>
          <textarea
            .value=${this._wineData.notes||""}
            @input=${t=>this._updateField("notes",t.target.value)}
          ></textarea>
        </div>
      </div>

      <div class="dialog-footer">
        <button class="btn btn-outline" @click=${()=>this._goToStep("scan")}>
          ← Back
        </button>
        <button
          class="btn btn-primary"
          @click=${()=>this._goToStep("location")}
          ?disabled=${!this._wineData.name}
        >
          Next →
        </button>
      </div>
    `}_renderLocationStep(){return L`
      <div class="dialog-body">
        <div style="font-weight: 500; margin-bottom: 8px">Choose Location</div>
        <div
          style="font-size: 0.85em; color: var(--wc-text-secondary); margin-bottom: 12px"
        >
          Select a cabinet and position for this bottle
        </div>

        <div class="location-grid">
          ${this.cabinets.map(t=>L`
              <div
                class="location-cabinet ${this._wineData.cabinet_id===t.id?"selected":""}"
                @click=${()=>this._updateField("cabinet_id",t.id)}
              >
                <div class="cab-name">${t.name}</div>
                <div class="cab-info">${t.rows}×${t.cols} slots</div>
              </div>
            `)}
        </div>

        ${this._wineData.cabinet_id?L`
              <div class="pos-inputs">
                <div class="form-group">
                  <label>Row (1-based)</label>
                  <input
                    type="number"
                    min="1"
                    .value=${null!=this._wineData.row?(this._wineData.row+1).toString():""}
                    @input=${t=>this._updateField("row",parseInt(t.target.value)-1)}
                  />
                </div>
                <div class="form-group">
                  <label>Column (1-based)</label>
                  <input
                    type="number"
                    min="1"
                    .value=${null!=this._wineData.col?(this._wineData.col+1).toString():""}
                    @input=${t=>this._updateField("col",parseInt(t.target.value)-1)}
                  />
                </div>
              </div>
            `:q}
      </div>

      <div class="dialog-footer">
        <button
          class="btn btn-outline"
          @click=${()=>this._goToStep("details")}
        >
          ← Back
        </button>
        <button
          class="btn btn-primary"
          @click=${()=>this._goToStep("confirm")}
        >
          Next →
        </button>
      </div>
    `}_renderConfirmStep(){const t=this.cabinets.find(t=>t.id===this._wineData.cabinet_id)?.name||"Unassigned",e=null!=this._wineData.row&&null!=this._wineData.col?`Row ${(this._wineData.row??0)+1}, Col ${(this._wineData.col??0)+1}`:"Not specified";return L`
      <div class="dialog-body">
        <div style="font-weight: 500; margin-bottom: 12px">Confirm & Add</div>

        <div class="confirm-summary">
          <div class="summary-row">
            <span class="summary-label">Name</span>
            <span class="summary-value">${this._wineData.name}</span>
          </div>
          ${this._wineData.winery?L`
                <div class="summary-row">
                  <span class="summary-label">Winery</span>
                  <span class="summary-value">${this._wineData.winery}</span>
                </div>
              `:q}
          ${this._wineData.vintage?L`
                <div class="summary-row">
                  <span class="summary-label">Vintage</span>
                  <span class="summary-value">${this._wineData.vintage}</span>
                </div>
              `:q}
          <div class="summary-row">
            <span class="summary-label">Type</span>
            <span class="summary-value">
              ${vt[this._wineData.type||"red"]}
            </span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Cabinet</span>
            <span class="summary-value">${t}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Position</span>
            <span class="summary-value">${e}</span>
          </div>
        </div>

        ${this._error?L`<div class="error-msg">${this._error}</div>`:q}
      </div>

      <div class="dialog-footer">
        <button
          class="btn btn-outline"
          @click=${()=>this._goToStep("location")}
        >
          ← Back
        </button>
        <button class="btn btn-primary" @click=${this._addWine}>
          ${this._loading?L`<span class="loading-spinner"></span>`:"Add Wine"}
        </button>
      </div>
    `}render(){return this.open?L`
      <div class="dialog-overlay" @click=${this._close}>
        <div class="dialog" @click=${t=>t.stopPropagation()}>
          <div class="dialog-header">Add Wine</div>
          ${this._renderStepIndicator()}
          ${"scan"===this._step?this._renderScanStep():q}
          ${"details"===this._step?this._renderDetailsStep():q}
          ${"location"===this._step?this._renderLocationStep():q}
          ${"confirm"===this._step?this._renderConfirmStep():q}
        </div>
      </div>
    `:q}};yt.styles=[bt,o`
      .step-indicator {
        display: flex;
        justify-content: center;
        gap: 8px;
        padding: 12px 20px;
      }

      .step-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--wc-border);
        transition: all 0.2s;
      }

      .step-dot.active {
        background: var(--wc-primary);
        width: 24px;
        border-radius: 4px;
      }

      .step-dot.done {
        background: var(--wc-primary);
      }

      .scan-section {
        text-align: center;
        padding: 20px;
      }

      .barcode-input-row {
        display: flex;
        gap: 8px;
        margin-top: 16px;
      }

      .barcode-input-row input {
        flex: 1;
        padding: 10px 14px;
        border: 2px solid var(--wc-border);
        border-radius: 10px;
        font-size: 1em;
        text-align: center;
        letter-spacing: 2px;
      }

      .barcode-input-row input:focus {
        border-color: var(--wc-primary);
        outline: none;
      }

      .or-divider {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 16px 0;
        color: var(--wc-text-secondary);
        font-size: 0.85em;
      }

      .or-divider::before,
      .or-divider::after {
        content: "";
        flex: 1;
        height: 1px;
        background: var(--wc-border);
      }

      .search-input {
        width: 100%;
        padding: 10px 14px;
        border: 2px solid var(--wc-border);
        border-radius: 10px;
        font-size: 1em;
        box-sizing: border-box;
      }

      .search-input:focus {
        border-color: var(--wc-primary);
        outline: none;
      }

      .lookup-result {
        background: rgba(114, 47, 55, 0.05);
        border: 1px solid rgba(114, 47, 55, 0.2);
        border-radius: 10px;
        padding: 12px;
        margin-top: 12px;
        text-align: left;
      }

      .lookup-result .result-name {
        font-weight: 600;
        font-size: 1em;
      }

      .lookup-result .result-detail {
        font-size: 0.85em;
        color: var(--wc-text-secondary);
        margin-top: 2px;
      }

      .location-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 8px;
        margin-top: 12px;
      }

      .location-cabinet {
        border: 2px solid var(--wc-border);
        border-radius: 10px;
        padding: 12px;
        text-align: center;
        cursor: pointer;
        transition: all 0.2s;
      }

      .location-cabinet:hover {
        border-color: var(--wc-primary);
        background: rgba(114, 47, 55, 0.05);
      }

      .location-cabinet.selected {
        border-color: var(--wc-primary);
        background: rgba(114, 47, 55, 0.1);
      }

      .location-cabinet .cab-name {
        font-weight: 600;
        font-size: 0.9em;
      }

      .location-cabinet .cab-info {
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        margin-top: 4px;
      }

      .pos-inputs {
        display: flex;
        gap: 12px;
        margin-top: 12px;
      }

      .pos-inputs .form-group {
        flex: 1;
      }

      .error-msg {
        color: #c62828;
        font-size: 0.85em;
        margin-top: 8px;
      }

      .loading-spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 2px solid var(--wc-border);
        border-top-color: var(--wc-primary);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .confirm-summary {
        background: rgba(0, 0, 0, 0.03);
        border-radius: 10px;
        padding: 16px;
      }

      .confirm-summary .summary-row {
        display: flex;
        justify-content: space-between;
        padding: 4px 0;
        font-size: 0.9em;
      }

      .confirm-summary .summary-label {
        color: var(--wc-text-secondary);
      }

      .confirm-summary .summary-value {
        font-weight: 500;
      }
    `],t([ht({type:Boolean})],yt.prototype,"open",void 0),t([ht({attribute:!1})],yt.prototype,"hass",void 0),t([ht({attribute:!1})],yt.prototype,"cabinets",void 0),t([ht({attribute:!1})],yt.prototype,"preselectedCabinet",void 0),t([ht({attribute:!1})],yt.prototype,"preselectedRow",void 0),t([ht({attribute:!1})],yt.prototype,"preselectedCol",void 0),t([ut()],yt.prototype,"_step",void 0),t([ut()],yt.prototype,"_barcode",void 0),t([ut()],yt.prototype,"_loading",void 0),t([ut()],yt.prototype,"_lookupResult",void 0),t([ut()],yt.prototype,"_wineData",void 0),t([ut()],yt.prototype,"_error",void 0),yt=t([dt("add-wine-dialog")],yt);let wt=class extends nt{constructor(){super(...arguments),this.value="",this._filter="all"}_onInput(t){const e=t.target.value;this.dispatchEvent(new CustomEvent("search-change",{detail:{query:e,filter:this._filter},bubbles:!0,composed:!0}))}_onFilterChange(t){this._filter=t;const e=this.shadowRoot?.querySelector("input");this.dispatchEvent(new CustomEvent("search-change",{detail:{query:e?.value||"",filter:t},bubbles:!0,composed:!0}))}render(){return L`
      <div class="search-container">
        <div class="search-input-wrapper">
          <span class="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search wines..."
            .value=${this.value}
            @input=${this._onInput}
          />
        </div>
        <div class="filter-chips">
          ${[{id:"all",label:"All"},{id:"red",label:"Red"},{id:"white",label:"White"},{id:"rosé",label:"Rosé"},{id:"sparkling",label:"Sparkling"},{id:"dessert",label:"Dessert"}].map(t=>L`
              <button
                class="chip ${this._filter===t.id?"active":""}"
                @click=${()=>this._onFilterChange(t.id)}
              >
                ${t.label}
              </button>
            `)}
        </div>
      </div>
    `}};wt.styles=[bt,o`
      :host {
        display: block;
      }

      .search-container {
        display: flex;
        gap: 8px;
        padding: 0 16px 8px;
        align-items: center;
      }

      .search-input-wrapper {
        flex: 1;
        position: relative;
      }

      .search-icon {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--wc-text-secondary);
        font-size: 0.9em;
        pointer-events: none;
      }

      input {
        width: 100%;
        padding: 8px 12px 8px 32px;
        border: 1px solid var(--wc-border);
        border-radius: 20px;
        font-size: 0.9em;
        background: var(--wc-bg);
        color: var(--wc-text);
        box-sizing: border-box;
        transition: border-color 0.2s;
      }

      input:focus {
        border-color: var(--wc-primary);
        outline: none;
      }

      .filter-chips {
        display: flex;
        gap: 4px;
      }

      .chip {
        padding: 4px 10px;
        border-radius: 14px;
        border: 1px solid var(--wc-border);
        background: transparent;
        color: var(--wc-text-secondary);
        cursor: pointer;
        font-size: 0.75em;
        transition: all 0.2s;
        white-space: nowrap;
      }

      .chip:hover {
        background: rgba(114, 47, 55, 0.08);
      }

      .chip.active {
        background: var(--wc-primary);
        color: #fff;
        border-color: var(--wc-primary);
      }
    `],t([ht({type:String})],wt.prototype,"value",void 0),t([ut()],wt.prototype,"_filter",void 0),wt=t([dt("wine-search-bar")],wt);let ft=class extends nt{constructor(){super(...arguments),this._wines=[],this._cabinets=[],this._stats=null,this._activeTab="all",this._searchQuery="",this._searchFilter="all",this._selectedWine=null,this._showDetail=!1,this._showAddDialog=!1,this._addPreselect={cabinet:"",row:null,col:null},this._loading=!0}setConfig(t){this._config=t}static getConfigElement(){return document.createElement("wine-cellar-card-editor")}static getStubConfig(){return{type:"custom:wine-cellar-card"}}connectedCallback(){super.connectedCallback(),this._loadData()}updated(t){t.has("hass")&&this.hass}async _loadData(){if(this.hass){this._loading=!0;try{const[t,e,i]=await Promise.all([this.hass.callWS({type:"wine_cellar/get_wines"}),this.hass.callWS({type:"wine_cellar/get_cabinets"}),this.hass.callWS({type:"wine_cellar/get_stats"})]);this._wines=t.wines||[],this._cabinets=(e.cabinets||[]).sort((t,e)=>t.order-e.order),this._stats=i}catch(t){console.error("Wine Cellar: Failed to load data",t)}this._loading=!1}else setTimeout(()=>this._loadData(),500)}_getFilteredWines(){let t=[...this._wines];if("all"!==this._activeTab&&(t=t.filter(t=>t.cabinet_id===this._activeTab)),"all"!==this._searchFilter&&(t=t.filter(t=>t.type===this._searchFilter)),this._searchQuery){const e=this._searchQuery.toLowerCase();t=t.filter(t=>t.name.toLowerCase().includes(e)||t.winery.toLowerCase().includes(e)||t.region.toLowerCase().includes(e)||t.grape_variety.toLowerCase().includes(e))}return t}_onCellClick(t){const{wine:e,cabinet:i,row:s,col:a}=t.detail;e?(this._selectedWine=e,this._showDetail=!0):(this._addPreselect={cabinet:i.id,row:s,col:a},this._showAddDialog=!0)}_onZoneClick(t){const{wine:e,cabinet:i}=t.detail;e?(this._selectedWine=e,this._showDetail=!0):(this._addPreselect={cabinet:i.id,row:null,col:null},this._showAddDialog=!0)}async _onRemoveWine(t){try{await this.hass.callWS({type:"wine_cellar/remove_wine",wine_id:t.detail.wine_id}),await this._loadData()}catch(t){console.error("Failed to remove wine",t)}}async _onWineAdded(){await this._loadData()}_onSearch(t){this._searchQuery=t.detail.query,this._searchFilter=t.detail.filter}_getCabinetWines(t){return this._wines.filter(e=>e.cabinet_id===t)}render(){if(this._loading)return L`
        <ha-card>
          <div class="loading">Loading wine cellar...</div>
        </ha-card>
      `;const t=this._config?.title||"Wine Cellar",e=this._getFilteredWines(),i="all"===this._activeTab||this._cabinets.some(t=>t.id===this._activeTab);return L`
      <ha-card>
        <div class="header-row">
          <div class="title">
            <span class="title-icon">🍷</span>
            ${t}
          </div>
          <div class="header-actions">
            <button
              class="btn btn-primary"
              @click=${()=>{this._addPreselect={cabinet:"",row:null,col:null},this._showAddDialog=!0}}
            >
              + Add Wine
            </button>
          </div>
        </div>

        <!-- Stats bar -->
        ${this._stats?L`
              <div class="stats-bar">
                <div class="stat">
                  <span class="stat-value">${this._stats.total_bottles}</span>
                  bottles
                </div>
                <div class="stat">
                  <span class="stat-value">${this._stats.total_capacity}</span>
                  capacity
                </div>
                <div class="stat">
                  <span class="stat-value">${this._stats.available_slots}</span>
                  available
                </div>
              </div>
            `:q}

        <!-- Tab bar -->
        <div class="tab-bar">
          <button
            class="tab ${"all"===this._activeTab?"active":""}"
            @click=${()=>this._activeTab="all"}
          >
            All Sections
          </button>
          ${this._cabinets.map(t=>L`
              <button
                class="tab ${this._activeTab===t.id?"active":""}"
                @click=${()=>this._activeTab=t.id}
              >
                ${t.name}
                (${this._getCabinetWines(t.id).length})
              </button>
            `)}
        </div>

        <!-- Search bar -->
        <wine-search-bar @search-change=${this._onSearch}></wine-search-bar>

        <!-- Cabinet grids -->
        ${i?L`
              <div class="cabinets-row">
                ${"all"===this._activeTab?this._cabinets.map(t=>L`
                        <cabinet-grid
                          .cabinet=${t}
                          .wines=${this._getCabinetWines(t.id)}
                          @cell-click=${this._onCellClick}
                          @zone-click=${this._onZoneClick}
                        ></cabinet-grid>
                      `):this._cabinets.filter(t=>t.id===this._activeTab).map(t=>L`
                          <cabinet-grid
                            .cabinet=${t}
                            .wines=${this._getCabinetWines(t.id)}
                            @cell-click=${this._onCellClick}
                            @zone-click=${this._onZoneClick}
                          ></cabinet-grid>
                        `)}
              </div>
            `:q}

        <!-- Filtered wine list (shown when searching) -->
        ${this._searchQuery||"all"!==this._searchFilter?L`
              <div class="wine-list">
                ${0===e.length?L`
                      <div class="empty-state">
                        <div>No wines match your search</div>
                      </div>
                    `:e.map(t=>{const e=this._cabinets.find(e=>e.id===t.cabinet_id)?.name||"Unassigned";return L`
                        <div
                          class="wine-list-item"
                          @click=${()=>{this._selectedWine=t,this._showDetail=!0}}
                        >
                          <div
                            class="wine-list-dot"
                            style="background: ${"red"===t.type?"#722F37":"white"===t.type?"#F5E6CA":"rosé"===t.type?"#E8A0BF":"sparkling"===t.type?"#D4E09B":"#DAA520"}"
                          ></div>
                          <div class="wine-list-info">
                            <div class="wine-list-name">${t.name}</div>
                            <div class="wine-list-meta">
                              ${t.winery}${t.vintage?` · ${t.vintage}`:""}
                            </div>
                          </div>
                          <div class="wine-list-location">${e}</div>
                        </div>
                      `})}
              </div>
            `:q}

        <!-- Empty state -->
        ${0===this._wines.length?L`
              <div class="empty-state">
                <div class="empty-state-icon">🍾</div>
                <div style="font-weight: 500; margin-bottom: 4px">
                  Your cellar is empty
                </div>
                <div style="font-size: 0.9em">
                  Tap "Add Wine" to start building your collection
                </div>
              </div>
            `:q}

        <!-- Wine Detail Dialog -->
        <wine-detail-dialog
          .wine=${this._selectedWine}
          .open=${this._showDetail}
          @close=${()=>this._showDetail=!1}
          @remove-wine=${this._onRemoveWine}
          @move-wine=${t=>{this._showDetail=!1,this._addPreselect={cabinet:"",row:null,col:null}}}
        ></wine-detail-dialog>

        <!-- Add Wine Dialog -->
        <add-wine-dialog
          .open=${this._showAddDialog}
          .hass=${this.hass}
          .cabinets=${this._cabinets}
          .preselectedCabinet=${this._addPreselect.cabinet}
          .preselectedRow=${this._addPreselect.row}
          .preselectedCol=${this._addPreselect.col}
          @close=${()=>this._showAddDialog=!1}
          @wine-added=${this._onWineAdded}
        ></add-wine-dialog>
      </ha-card>
    `}getCardSize(){return 6}};ft.styles=[bt,o`
      :host {
        display: block;
      }

      ha-card {
        overflow: hidden;
      }

      .header-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 16px 8px;
      }

      .title {
        font-size: 1.3em;
        font-weight: 600;
        color: var(--wc-text);
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .title-icon {
        font-size: 1.2em;
      }

      .header-actions {
        display: flex;
        gap: 4px;
      }

      .cabinets-row {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 12px;
        padding: 12px 16px 16px;
      }

      .wine-list {
        padding: 0 16px 16px;
      }

      .wine-list-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px;
        border-radius: 10px;
        cursor: pointer;
        transition: background 0.2s;
      }

      .wine-list-item:hover {
        background: rgba(0, 0, 0, 0.04);
      }

      .wine-list-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .wine-list-info {
        flex: 1;
        min-width: 0;
      }

      .wine-list-name {
        font-weight: 500;
        font-size: 0.95em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .wine-list-meta {
        font-size: 0.8em;
        color: var(--wc-text-secondary);
      }

      .wine-list-location {
        font-size: 0.75em;
        color: var(--wc-text-secondary);
        text-align: right;
      }

      .empty-state {
        text-align: center;
        padding: 40px 20px;
        color: var(--wc-text-secondary);
      }

      .empty-state-icon {
        font-size: 3em;
        margin-bottom: 8px;
      }

      .loading {
        text-align: center;
        padding: 40px;
        color: var(--wc-text-secondary);
      }
    `],t([ht({attribute:!1})],ft.prototype,"hass",void 0),t([ut()],ft.prototype,"_config",void 0),t([ut()],ft.prototype,"_wines",void 0),t([ut()],ft.prototype,"_cabinets",void 0),t([ut()],ft.prototype,"_stats",void 0),t([ut()],ft.prototype,"_activeTab",void 0),t([ut()],ft.prototype,"_searchQuery",void 0),t([ut()],ft.prototype,"_searchFilter",void 0),t([ut()],ft.prototype,"_selectedWine",void 0),t([ut()],ft.prototype,"_showDetail",void 0),t([ut()],ft.prototype,"_showAddDialog",void 0),t([ut()],ft.prototype,"_addPreselect",void 0),t([ut()],ft.prototype,"_loading",void 0),ft=t([dt("wine-cellar-card")],ft),window.customCards=window.customCards||[],window.customCards.push({type:"wine-cellar-card",name:"Wine Cellar",description:"Track your wine collection with visual cabinet layout",preview:!0});export{ft as WineCellarCard};
