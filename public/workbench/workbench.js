"use strict";(()=>{function Nl(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ts=Nl();function eu(n){ts=n}var ji={exec:()=>null};function Ji(n){let t=[];return e=>{let i=Math.max(0,Math.min(3,e-1)),s=t[i];return s||(s=n(i),t[i]=s),s}}function Zt(n,t=""){let e=typeof n=="string"?n:n.source,i={replace:(s,r)=>{let a=typeof r=="string"?r:r.source;return a=a.replace(ze.caret,"$1"),e=e.replace(s,a),i},getRegex:()=>new RegExp(e,t)};return i}var nu=((n="")=>{try{return!!new RegExp("(?<=1)(?<!1)"+n)}catch{return!1}})(),ze={codeRemoveIndent:/^(?: {0,3}\t| {1,4})/gm,listInterruptsParagraph:/^ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,endingSpaceTabChar:/[ \t]$/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,leadingSpaceTab:/^[ \t]+/,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+)[ \t]*)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,blockquoteMarkerWhitespace:/^( {0,3}>)([ \t]+)/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\][ \t]+\S/,listReplaceTask:/^\[[ xX]\][ \t]+/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,numericCharacterReference:/&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/,numericCharacterReferenceOrAmpersand:/&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:n=>new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:Ji(n=>new RegExp(`^ {0,${n}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:Ji(n=>new RegExp(`^ {0,${n}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),fencesBeginRegex:Ji(n=>new RegExp(`^ {0,${n}}(?:\`\`\`|~~~)`)),headingBeginRegex:Ji(n=>new RegExp(`^ {0,${n}}#{1,6}(?:\\s|$)`)),pedanticHeadingBeginRegex:Ji(n=>new RegExp(`^ {0,${n}}#`)),htmlBeginRegex:Ji(n=>new RegExp(`^ {0,${n}}(?:</?(?:${pr})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`,"i")),blockquoteBeginRegex:Ji(n=>new RegExp(`^ {0,${n}}>`)),nestedContainerMarkers:/^(?: {0,3}(?:(?:[*+-]|\d{1,9}[.)])[ \t]+|>[ \t]?))+/},Bp=/^(?:[ \t]*(?:\n|$))+/,zp=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Gp=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}(?:(?=`)\1`*|(?=~)\1~*) *(?=\n|$)|$)/,fr=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Hp=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Ul=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,iu=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+)[ \t]*(?:\n+|$)/,su=Zt(iu).replace(/bull/g,Ul).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Vp=Zt(iu).replace(/bull/g,Ul).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),Ol=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,Wp=/^[^\n]+/,Fl=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\\n]|\n(?![ \t]*\n))+/,Xp=Zt(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Fl).replace("title",/(?:"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\\n]|\n(?!\n))*'|\((?:\\[\s\S]|[^()\\])*\))/).getRegex(),qp=Zt(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,Ul).getRegex(),pr="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",kl=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Yp=Zt("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?:[ \\t]+|\\n|/?>|$)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",kl).replace("tag",pr).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ru=n=>Zt(Ol).replace("hr",fr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list",n).replace("html"," {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag",pr).getRegex(),$p=ru(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),Zp=ru(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),Kp=Zt(/^( {0,3}> ?(?:(?![ \t]*(?:\n|$))(paragraph)|[^\n]*)(?:\n|$))+/).replace("paragraph",Zp).getRegex(),Bl={blockquote:Kp,code:zp,def:Xp,fences:Gp,heading:Hp,hr:fr,html:Yp,lheading:su,list:qp,newline:Bp,paragraph:$p,table:ji,text:Wp},Xh=Zt("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",fr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html"," {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag",pr).getRegex(),Jp={...Bl,lheading:Vp,table:Xh,paragraph:Zt(Ol).replace("hr",fr).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",Xh).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html"," {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)").replace("tag",pr).getRegex()},jp={...Bl,html:Zt(`^ *(?:comment(?: *\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1>(?: *\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?>(?: *\\n{2,}|\\s*$))`).replace("comment",kl).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ji,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:Zt(Ol).replace("hr",fr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",su).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Qp=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,tm=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,au=/^( {2,}|\\)\n(?!\s*$)[ \t]*/,em=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,ii=/[\p{P}\p{S}]/u,ws=/[\s\p{P}\p{S}]/u,mr=/[^\s\p{P}\p{S}]/u,nm=Zt(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,ws).getRegex(),im=/[\p{Pi}\p{Ps}"']/u,ou=/(?!~)[\p{P}\p{S}]/u,sm=/(?!~)[\s\p{P}\p{S}]/u,rm=/(?:[^\s\p{P}\p{S}]|~)/u,am=Zt(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",nu?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),lu=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,om=Zt(lu,"u").replace(/punct/g,ii).getRegex(),lm=Zt(lu,"u").replace(/punct/g,ou).getRegex(),cm=/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/,hm=Zt(cm,"u").replace(/openQuote/g,im).replace(/punct/g,ii).getRegex(),cu="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",um=Zt(cu,"gu").replace(/notPunctSpace/g,mr).replace(/punctSpace/g,ws).replace(/punct/g,ii).getRegex(),dm=Zt(cu,"gu").replace(/notPunctSpace/g,rm).replace(/punctSpace/g,sm).replace(/punct/g,ou).getRegex(),fm="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)",pm=Zt(fm,"gu").replace(/notPunctSpace/g,mr).replace(/punctSpace/g,ws).replace(/punct/g,ii).getRegex(),mm=Zt("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,mr).replace(/punctSpace/g,ws).replace(/punct/g,ii).getRegex(),gm="^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)",_m=Zt(gm,"gu").replace(/notPunctSpace/g,mr).replace(/punctSpace/g,ws).replace(/punct/g,ii).getRegex(),xm=Zt(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,ii).getRegex(),ym="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",vm=Zt(ym,"gu").replace(/notPunctSpace/g,mr).replace(/punctSpace/g,ws).replace(/punct/g,ii).getRegex(),Sm=Zt(/\\(punct)/,"gu").replace(/punct/g,ii).getRegex(),bm=Zt(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/,"gu").replace(/punct/g,ii).getRegex(),Mm=Zt(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),wm=Zt(kl).replace("(?:-->|$)","-->").getRegex(),Tm=Zt("^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",wm).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),hu=/\[(?:\\[\s\S]|[^\[\]\\])*\]/,_a=Zt(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace("brackets",hu).getRegex(),Am=Zt(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace("label",_a).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title",/"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|\((?:\\[\s\S]|[^)\\])*\)/).getRegex(),Em=Zt(/^!?\[(label)\]\[(ref)\]/).replace("label",_a).replace("ref",Fl).getRegex(),Rm=Zt(/^!?\[(ref)\](?:\[\])?/).replace("ref",Fl).getRegex(),qh=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/,Cm=Zt(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace("brackets",hu).getRegex(),Im=Zt("reflink|nolink(?!\\()","g").replace("reflink",Zt(/^!?\[(label)\]\[(ref)\]/).replace("label",Cm).replace("ref",qh).getRegex()).replace("nolink",Zt(/^!?\[(ref)\](?:\[\])?/).replace("ref",qh).getRegex()).getRegex(),Yh=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Pm=/[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/,Lm=Zt(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g,Pm).getRegex(),zl={_backpedal:ji,anyPunctuation:Sm,anyPunctuationOutsideCode:bm,autolink:Mm,blockSkip:am,br:au,code:tm,del:ji,delLDelim:ji,delRDelim:ji,emStrongLDelim:om,emStrongRDelimAst:um,emStrongRDelimUnd:mm,escape:Qp,link:Am,nolink:Rm,punctuation:nm,reflink:Em,reflinkSearch:Im,tag:Tm,text:em,url:ji},Dm={...zl,emStrongLDelim:hm,emStrongRDelimAst:pm,emStrongRDelimUnd:_m,link:Zt(/^!?\[(label)\]\((.*?)\)/).replace("label",_a).getRegex(),reflink:Zt(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",_a).getRegex()},Pl={...zl,emStrongRDelimAst:dm,emStrongLDelim:lm,delLDelim:xm,delRDelim:vm,url:Zt(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("emailProtocol",Lm).replace("protocol",Yh).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:Zt(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|wwwStart|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace("protocol",Yh).replace(/emailProtocol/g,/(?:mailto|xmpp):/).replace("wwwStart",nu?"(?<![^\\s*_~(])www\\.":"www\\.").getRegex()},Nm={...Pl,br:Zt(au).replace("{2,}","*").getRegex(),text:Zt(Pl.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},ma={normal:Bl,gfm:Jp,pedantic:jp},ur={normal:zl,gfm:Pl,breaks:Nm,pedantic:Dm},Um={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},$h=n=>Um[n];function bn(n,t){if(t){if(ze.escapeTest.test(n))return n.replace(ze.escapeReplace,$h)}else if(ze.escapeTestNoEncode.test(n))return n.replace(ze.escapeReplaceNoEncode,$h);return n}function Om(n){return ze.numericCharacterReference.test(n)?n.replace(ze.numericCharacterReferenceOrAmpersand,(t,e,i)=>{if(e===void 0&&i===void 0)return"&amp;";let s=e===void 0?Number.parseInt(i,16):Number.parseInt(e,10);return s===0||s>1114111||s>=55296&&s<=57343?"\uFFFD":s===38?"&amp;":String.fromCodePoint(s)}):n}function Zh(n){try{n=encodeURI(n).replace(ze.percentDecode,"%")}catch{return null}return n}function Kh(n,t){let e=n.replace(ze.findPipe,(r,a,o)=>{let l=!1,c=a;for(;--c>=0&&o[c]==="\\";)l=!l;return l?"|":" |"}),i=e.split(ze.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!i.at(-1)?.trim()&&i.pop(),t)if(i.length>t)i.splice(t);else for(;i.length<t;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(ze.slashPipe,"|");return i}function yi(n,t,e){let i=n.length;if(i===0)return"";let s=0;for(;s<i;){let r=n.charAt(i-s-1);if(r===t&&!e)s++;else if(r!==t&&e)s++;else break}return n.slice(0,i-s)}function Jh(n){let t=n.split(`
`),e=t.length-1;for(;e>=0&&ze.blankLine.test(t[e]);)e--;return t.length-e<=2?n:t.slice(0,e+1).join(`
`)}function xa(n){return n.trim().replace(ze.multipleSpaceGlobal," ").toLowerCase().toUpperCase().toLowerCase()}function jh(n,t){if(n.indexOf(t[0])===-1&&n.indexOf(t[1])===-1)return-1;let e=0;for(let i=0;i<n.length;i++)if(n[i]==="\\")i++;else if(n[i]===t[0])e++;else if(n[i]===t[1]&&(e--,e<0))return i;return e>0?-2:-1}var Ms=new WeakMap;function Gl(n){let t={"*":-1,_:-1},e=-1,i=n.length;for(let s=0;s<i;s++){let r=n[s];if(r!=="*"&&r!=="_"&&r!=="~")continue;let a=s===0?`
`:n[s-1],o=s+1;for(;o<i&&n[o]===r;)o++;a!==" "&&a!=="	"&&a!==`
`&&a!=="\r"&&a!=="\f"&&(r==="~"?e=s:t[r]=s),s=o-1}return{maskedSrc:n,lastPossibleEmStrongCloserIndex:t,lastPossibleDelCloserIndex:e}}function Fm(n,t){let e=Gl(t),i=Ms.get(n);i?i.push(e):Ms.set(n,[e])}function km(n){let t=Ms.get(n);t&&(t.pop(),t.length===0&&Ms.delete(n))}function Bm(n,t,e){let i=Ms.get(n)?.at(-1);return i&&i.maskedSrc===t?i.lastPossibleEmStrongCloserIndex[e]:Gl(t).lastPossibleEmStrongCloserIndex[e]}function zm(n,t){let e=Ms.get(n)?.at(-1);return e&&e.maskedSrc===t?e.lastPossibleDelCloserIndex:Gl(t).lastPossibleDelCloserIndex}function ga(n,t=0){let e=t,i="";for(let s of n)if(s==="	"){let r=4-e%4;i+=" ".repeat(r),e+=r}else i+=s,e++;return i}function Qh(n,t,e,i,s){let r=t.href,a=t.title||null,o=n[1].replace(s.other.outputLinkReplace,"$1"),l=n[0].charAt(0)==="!",c=i.state.inLink,h=i.state.linkEmitted,u=i.state.inRawBlock;i.state.inLink=!0,i.state.linkEmitted=!1;let d=i.inlineTokens(o),p=i.state.linkEmitted;if(i.state.linkEmitted=h,i.state.inLink=c,!l){if(p){i.state.inRawBlock=u;return}i.state.linkEmitted=!0}return{type:l?"image":"link",raw:e,href:r,title:a,text:o,tokens:d}}function Gm(n,t,e){let i=n.match(e.other.indentCodeCompensation);if(i===null)return t;let s=i[1];return t.split(`
`).map(r=>{let a=r.match(e.other.beginningSpace);if(a===null)return r;let[o]=a;return r.slice(Math.min(o.length,s.length))}).join(`
`)}function tu(n,t,e,i){if(!t.includes("<"))return!1;for(let s=0;s<t.length;s++){if(t[s]==="\\"){s++;continue}if(t[s]==="`"){let o=i.inline.code.exec(t.slice(s));if(o){s+=o[0].length-1;continue}}if(t[s]!=="<")continue;let r=n.slice(e+s),a=i.inline.tag.exec(r)||i.inline.autolink.exec(r);if(a){if(a[0].length>t.length-s)return!0;s+=a[0].length-1}}return!1}var bs=class{options;rules;lexer;constructor(n){this.options=n||ts}space(n){let t=this.rules.block.newline.exec(n);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(n){let t=this.rules.block.code.exec(n);if(t){let e=this.options.pedantic?t[0]:Jh(t[0]),i=e.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e,codeBlockStyle:"indented",text:i}}}fences(n){let t=this.rules.block.fences.exec(n);if(t){let e=t[0],i=Gm(e,t[3]||"",this.rules);return{type:"code",raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(n){let t=this.rules.block.heading.exec(n);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let i=yi(e,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceTabChar.test(i))&&(e=i.trim())}return{type:"heading",raw:yi(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(n){let t=this.rules.block.hr.exec(n);if(t)return{type:"hr",raw:yi(t[0],`
`)}}blockquote(n){let t=this.rules.block.blockquote.exec(n);if(t){let e=yi(t[0],`
`).split(`
`),i="",s="",r=[];for(;e.length>0;){let a=!1,o=[],l;for(l=0;l<e.length;l++)if(this.rules.other.blockquoteStart.test(e[l]))o.push(e[l]),a=!0;else if(!a)o.push(e[l]);else break;e=e.slice(l);let c=o.join(`
`),h=c.replace(this.rules.other.blockquoteMarkerWhitespace,(p,g,x)=>g+ga(x,g.length)).replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${h}`:h;let u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(h,r,!0),this.lexer.state.top=u,e.length===0)break;let d=r.at(-1);if(d?.type==="code"||d?.type==="heading"||d?.type==="hr"||d?.type==="html"||d?.type==="table")break;if(d?.type==="blockquote"){let p=d,g=e.join(`
`),x=p.raw+`
`+g.replace(this.rules.other.blockquoteSetextReplace2,""),m=this.blockquote(x);r[r.length-1]=m;let f=x.substring(m.raw.length).replace(/^\n/,""),v=f?f.split(`
`).length:0,A=v?e.slice(0,-v):e;if(A.length>0&&(i=`${i}
${A.join(`
`)}`),s=s.substring(0,s.length-p.text.length)+m.text,e=e.slice(A.length),e.length>0&&this.rules.other.blockquoteStart.test(e[0]))continue;break}else if(d?.type==="list"){let p=d,g=p.raw+`
`+e.join(`
`),x=this.list(g);r[r.length-1]=x;let m=x.raw.length>p.raw.length?g.slice(p.raw.length+1,x.raw.length).split(`
`).length:0;if(m>0){let f=e.slice(0,m).join(`
`);i=`${i}
${f}`,s=`${s}
${f}`}e=e.slice(m);continue}}return{type:"blockquote",raw:i,tokens:r,text:s}}}list(n){let t=this.rules.block.list.exec(n);if(t){if(!this.options.pedantic&&this.lexer.state.lastToken?.type==="text"&&!this.rules.other.listInterruptsParagraph.test(n))return;let e=n,i=()=>e.length-n.length,s=t[1].trim(),r=s.length>1,a={type:"list",raw:"",ordered:r,start:r?+s.slice(0,-1):"",loose:!1,items:[]};s=r?`\\d{1,9}\\${s.slice(-1)}`:`\\${s}`,this.options.pedantic&&(s=r?s:"[*+-]");let o=this.rules.other.listItemRegex(s),l=!1;for(;n;){let h=!1,u="";if(!(t=o.exec(n))||this.rules.block.hr.test(n))break;let d=i();n=n.substring(t[0].length);let p=t[2].split(`
`,1)[0],g=t[1].length,x=this.options.pedantic?ga(p,g):p.replace(this.rules.other.leadingSpaceTab,b=>ga(b,g)),m=n.split(`
`,1)[0],f=!x.trim(),v=0;if(this.options.pedantic?(v=2,u=x.trimStart()):f?v=g+1:(v=x.search(this.rules.other.nonSpaceChar),v=v>4?1:v,u=x.slice(v),v+=g),f&&this.rules.other.blankLine.test(m)&&(n=n.substring(m.length+1),h=!0),!h){let b=this.rules.other.nextBulletRegex(v),T=this.rules.other.hrRegex(v),E=this.rules.other.fencesBeginRegex(v),_=this.options.pedantic?this.rules.other.pedanticHeadingBeginRegex(v):this.rules.other.headingBeginRegex(v),M=this.rules.other.htmlBeginRegex(v),z=this.rules.other.blockquoteBeginRegex(v),P=!1;for(;n;){let N=n.split(`
`,1)[0],B;if(m=N,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),B=m):B=m.replace(this.rules.other.leadingSpaceTab,Z=>ga(Z)),E.test(m)||_.test(m)||M.test(m)||z.test(m)||b.test(m)||T.test(m))break;if(B.search(this.rules.other.nonSpaceChar)>=v||!m.trim())u+=`
`+B.slice(v),P=!1;else{if(f||x.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||E.test(x)||_.test(x)||M.test(x)||T.test(x))break;if(!this.options.pedantic&&!P){let I=x.replace(this.rules.other.nestedContainerMarkers,"");if(this.rules.block.fences.test(I)||this.rules.block.heading.test(I)||this.rules.block.hr.test(I))break}let Z=!this.options.pedantic&&/^ {0,3}(?:=+|-+) *$/.test(m)&&this.rules.block.lheading.test(`${x}
${m}`)?`    ${B.replace(/^ {0,3}/,"")}`:m;u+=`
`+Z,P=!0}f=!m.trim(),n=n.substring(N.length+1),x=B.slice(v)}}let A=e.slice(d,i());a.loose||(l?a.loose=!0:this.rules.other.doubleBlankLine.test(A)&&(l=!0)),a.items.push({type:"list_item",raw:A,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]})}let c=a.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;a.raw=e.slice(0,i()).trimEnd();for(let h of a.items)if(this.lexer.state.top=!1,h.tokens=this.lexer.blockTokens(h.text,[]),!a.loose){let u=h.tokens.filter(p=>p.type==="space"),d=u.length>0&&u.some(p=>this.rules.other.anyLine.test(p.raw));a.loose=d}for(let h of a.items){let u=h.tokens[0];if(h.task&&(u?.type==="text"||u?.type==="paragraph")){h.text=h.text.replace(this.rules.other.listReplaceTask,""),u.raw=u.raw.replace(this.rules.other.listReplaceTask,""),u.text=u.text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}let d=this.rules.other.listTaskCheckbox.exec(h.raw);if(d){let p={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};h.checked=p.checked,a.loose?h.tokens[0]&&["paragraph","text"].includes(h.tokens[0].type)&&"tokens"in h.tokens[0]&&h.tokens[0].tokens?(h.tokens[0].raw=p.raw+h.tokens[0].raw,h.tokens[0].text=p.raw+h.tokens[0].text,h.tokens[0].tokens.unshift(p)):h.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):h.tokens.unshift(p)}}else h.task&&(h.task=!1)}if(a.loose)for(let h of a.items){h.loose=!0;for(let u of h.tokens)u.type==="text"&&(u.type="paragraph")}return a}}html(n){let t=this.rules.block.html.exec(n);if(t){let e=Jh(t[0]);return{type:"html",block:!0,raw:e,pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:e}}}def(n){let t=this.rules.block.def.exec(n);if(t){if(!this.rules.other.startAngleBracket.test(t[2])&&jh(t[2],"()")!==-1)return;let e=xa(t[1]),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:e,raw:yi(t[0],`
`),href:i,title:s}}}table(n){let t=this.rules.block.table.exec(n);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let e=Kh(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],r={type:"table",raw:yi(t[0],`
`),header:[],align:[],rows:[]};if(e.length===i.length){for(let a of i)this.rules.other.tableAlignRight.test(a)?r.align.push("right"):this.rules.other.tableAlignCenter.test(a)?r.align.push("center"):this.rules.other.tableAlignLeft.test(a)?r.align.push("left"):r.align.push(null);for(let a=0;a<e.length;a++)r.header.push({text:e[a],tokens:this.lexer.inline(e[a]),header:!0,align:r.align[a]});for(let a of s)r.rows.push(Kh(a,r.header.length).map((o,l)=>({text:o,tokens:this.lexer.inline(o),header:!1,align:r.align[l]})));return r}}lheading(n){let t=this.rules.block.lheading.exec(n);if(t){let e=t[1].trim();return{type:"heading",raw:yi(t[0],`
`),depth:t[2].charAt(0)==="="?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(n){let t=this.rules.block.paragraph.exec(n);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(n){let t=this.rules.block.text.exec(n);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(n){let t=this.rules.inline.escape.exec(n);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(n){let t=this.rules.inline.tag.exec(n);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(n){if(this.lexer.state.linkParenPossible===!1)return;let t=this.rules.inline.link.exec(n);if(t){let e=t[0].charAt(0)==="!"?2:1;if(!this.options.pedantic&&tu(n,t[1],e,this.rules))return;let i=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(i)){if(!this.rules.other.endAngleBracket.test(i))return;let o=yi(i.slice(0,-1),"\\");if((i.length-o.length)%2===0)return}else{let o=jh(t[2],"()");if(o===-2)return;if(o>-1){let l=(t[0].indexOf("!")===0?5:4)+t[1].length+o;t[2]=t[2].substring(0,o),t[0]=t[0].substring(0,l).trim(),t[3]=""}}let s=yi(t[0].slice(0,-1),"\\");if((t[0].length-s.length)%2===0)return;let r=t[2],a="";if(this.options.pedantic){let o=this.rules.other.pedanticHrefTitle.exec(r);o&&(r=o[1],a=o[3])}else a=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(i)?r=r.slice(1):r=r.slice(1,-1)),Qh(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:a&&a.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(n,t){let e;if((e=this.rules.inline.reflink.exec(n))||(e=this.rules.inline.nolink.exec(n))){let i=e[0].charAt(0)==="!"?2:1;if(!this.options.pedantic&&tu(n,e[1],i,this.rules))return;let s=t[xa(e[2]||e[1])];if(!s){let r=e[0].charAt(0);return{type:"text",raw:r,text:r}}return Qh(e,s,e[0],this.lexer,this.rules)}}emStrong(n,t,e=""){let i=this.rules.inline.emStrongLDelim.exec(n);if(!i||!i[1]&&!i[2]&&!i[3]&&!i[4])return;let s=i[0][0],r=e===s,a=t.length-n.length,o=a;for(;!this.options.pedantic&&o>0&&t[o-1]===s;)o--;let l=[...t.slice(Math.max(0,o-2),o)].at(-1)??"",c=l==="*"||l==="_"||!!this.rules.inline.punctuation.exec(l);o<a&&(e=l);let h=o<a?c:e==="*"||e==="_"||!!this.rules.inline.punctuation.exec(e);if(i[4]&&e.match(this.rules.other.unicodeAlphaNumeric))return;let u=i[1]||i[3]||"";if(!u||!e||h){let d=[...i[0]].length-1,p,g,x=d,m=0,f=a-o+d,v=!this.options.pedantic&&!!l.trim()&&(!!u||s==="*"&&!c);if(s!=="*"&&s!=="_")return;let A=s==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd,b=Bm(this,t,s),T=t.length-n.length+d;if(b<T)return;t=t.slice(-1*n.length+d);let E=b-T;for(A.lastIndex=0;(i=A.exec(t))!==null&&!(i.index>E);){if(p=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!p)continue;if(g=[...p].length,i[3]||i[4]){x+=g;continue}else if(i[5]||i[6]||v){if(r&&(i[5]||i[6]))break;if(f%3&&!((f+g)%3)){m+=g;continue}}if(x-=g,x>0)continue;g=Math.min(g,g+x+m);let _=[...i[0]][0].length,M=n.slice(0,d+i.index+_+g);if(Math.min(d,g)%2){let P=M.slice(1,-1);return{type:"em",raw:M,text:P,tokens:this.lexer.inlineTokens(P)}}let z=M.slice(2,-2);return{type:"strong",raw:M,text:z,tokens:this.lexer.inlineTokens(z)}}}}codespan(n){let t=this.rules.inline.code.exec(n);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(e),s=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return i&&s&&(e=e.substring(1,e.length-1)),{type:"codespan",raw:t[0],text:e}}}br(n){let t=this.rules.inline.br.exec(n);if(t)return{type:"br",raw:t[0]}}del(n,t,e=""){let i=this.rules.inline.delLDelim.exec(n);if(i&&(!i[1]||!e||this.rules.inline.punctuation.exec(e))){let s=[...i[0]].length-1,r,a,o=s,l=this.rules.inline.delRDelim,c=zm(this,t),h=t.length-n.length+s;if(c<h)return;t=t.slice(-1*n.length+s);let u=c-h;for(l.lastIndex=0;(i=l.exec(t))!==null&&!(i.index>u);){if(r=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!r||(a=[...r].length,a!==s))continue;if(i[3]||i[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let d=[...i[0]][0].length,p=n.slice(0,s+i.index+d+a),g=p.slice(s,-s);return{type:"del",raw:p,text:g,tokens:this.lexer.inlineTokens(g)}}}}autolink(n){let t=this.rules.inline.autolink.exec(n);if(t){let e,i;return t[2]==="@"?(e=t[1],i="mailto:"+e):(e=t[1],i=e),{type:"link",raw:t[0],text:e,href:i,autolink:!0,tokens:[{type:"text",raw:e,text:e}]}}}url(n){let t;if(t=this.rules.inline.url.exec(n)){let e,i;if(t[2]==="@")e=t[0],i="mailto:"+e;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);e=t[0],t[1]==="www."?i="http://"+t[0]:i=t[0]}return{type:"link",raw:t[0],text:e,href:i,autolink:!0,tokens:[{type:"text",raw:e,text:e}]}}}inlineText(n){let t=this.rules.inline.text.exec(n);if(t){let e=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:e?t[0]:Om(t[0]),escaped:e}}}},Hn=class Ll{tokens;options;state;inlineQueue;tokenizer;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ts,this.options.tokenizer=this.options.tokenizer||new bs,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,linkEmitted:!1,linkParenPossible:!0,top:!0};let e={other:ze,block:ma.normal,inline:ur.normal};this.options.pedantic?(e.block=ma.pedantic,e.inline=ur.pedantic):this.options.gfm&&(e.block=ma.gfm,this.options.breaks?e.inline=ur.breaks:e.inline=ur.gfm),this.tokenizer.rules=e}static get rules(){return{block:ma,inline:ur}}static lex(t,e){return new Ll(e).lex(t)}static lexInline(t,e){return new Ll(e).inlineTokens(t)}lex(t){t=t.replace(ze.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let i=this.inlineQueue[e];this.state.inRawBlock=!1,this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,e=[],i=!1){this.tokenizer.lexer=this;let s=this.state.lastToken;this.options.pedantic&&(t=t.replace(ze.tabCharGlobal,"    ").replace(ze.spaceLine,""));let r=1/0;for(;t;){if(t.length<r)r=t.length;else{this.infiniteLoopError(t.charCodeAt(0));break}this.state.lastToken=e.at(-1);let a;if(this.options.extensions?.block?.some(l=>(a=l.call({lexer:this},t,e))?(t=t.substring(a.raw.length),e.push(a),!0):!1))continue;if(a=this.tokenizer.space(t)){t=t.substring(a.raw.length);let l=e.at(-1);a.raw.length===1&&l!==void 0?l.raw+=`
`:e.push(a);continue}if(a=this.tokenizer.code(t)){t=t.substring(a.raw.length);let l=e.at(-1);l?.type==="paragraph"||l?.type==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+a.raw,l.text+=`
`+a.text,this.inlineQueue.at(-1).src=l.text):e.push(a);continue}if(a=this.tokenizer.fences(t)){t=t.substring(a.raw.length),e.push(a);continue}if(a=this.tokenizer.heading(t)){t=t.substring(a.raw.length),e.push(a);continue}if(a=this.tokenizer.hr(t)){t=t.substring(a.raw.length),e.push(a);continue}if(a=this.tokenizer.blockquote(t)){t=t.substring(a.raw.length),e.push(a);continue}if(a=this.tokenizer.list(t)){t=t.substring(a.raw.length),e.push(a);continue}if(a=this.tokenizer.html(t)){t=t.substring(a.raw.length),e.push(a);continue}if(a=this.tokenizer.def(t)){t=t.substring(a.raw.length);let l=e.at(-1);l?.type==="paragraph"||l?.type==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+a.raw,l.text+=`
`+a.raw,this.inlineQueue.at(-1).src=l.text):(this.tokens.links[a.tag]||(this.tokens.links[a.tag]={href:a.href,title:a.title}),e.push(a));continue}if(a=this.tokenizer.table(t)){t=t.substring(a.raw.length),e.push(a);continue}if(a=this.tokenizer.lheading(t)){t=t.substring(a.raw.length),e.push(a);continue}let o=t;if(this.options.extensions?.startBlock){let l=1/0,c=t.slice(1),h;this.options.extensions.startBlock.forEach(u=>{h=u.call({lexer:this},c),typeof h=="number"&&h>=0&&(l=Math.min(l,h))}),l<1/0&&l>=0&&(o=t.substring(0,l+1))}if(this.state.top&&(a=this.tokenizer.paragraph(o))){let l=e.at(-1);i&&l?.type==="paragraph"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+a.raw,l.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):e.push(a),i=o.length!==t.length,t=t.substring(a.raw.length);continue}if(a=this.tokenizer.text(t)){t=t.substring(a.raw.length);let l=e.at(-1);l?.type==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+a.raw,l.text+=`
`+a.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):e.push(a);continue}if(t){this.infiniteLoopError(t.charCodeAt(0));break}}return this.state.top=!0,this.state.lastToken=s,e}inline(t,e=[]){return this.inlineQueue.push({src:t,tokens:e}),e}linkInText(t){if(!t.includes("["))return!1;let e=this.tokenizer.rules.inline.link;for(let i of t.matchAll(this.tokenizer.rules.inline.blockSkip))if(e.test(i[0])&&t.charAt(i.index-1)!=="!")return!0;for(let i of t.matchAll(this.tokenizer.rules.inline.reflinkSearch)){let s=i[0],r=s.lastIndexOf("[");if(!(s.charAt(0)==="!"||!Object.hasOwn(this.tokens.links,xa(s.slice(r+1,-1))))&&!(r>1&&this.linkInText(s.slice(1,r-1))))return!0}return!1}inlineTokens(t,e=[]){this.tokenizer.lexer=this;let i=this.state.linkParenPossible;this.state.linkParenPossible=i&&t.includes(")");try{return this.#t(t,e)}finally{this.state.linkParenPossible=i}}#t(t,e){let i=t.includes("*")||t.includes("_")||t.includes("~")||this.options.hooks?.emStrongMask||this.tokenizer.emStrong!==bs.prototype.emStrong||this.tokenizer.del!==bs.prototype.del?this.#i(t):t;Fm(this.tokenizer,i);try{return this.#e(t,i,e)}finally{km(this.tokenizer)}}#e(t,e,i){let s=!1,r="",a=1/0;for(;t;){if(t.length<a)a=t.length;else{this.infiniteLoopError(t.charCodeAt(0));break}s||(r=""),s=!1;let o;if(this.options.extensions?.inline?.some(c=>(o=c.call({lexer:this},t,i))?(t=t.substring(o.raw.length),i.push(o),!0):!1))continue;if(o=this.tokenizer.escape(t)){t=t.substring(o.raw.length),i.push(o);continue}if(o=this.tokenizer.tag(t)){t=t.substring(o.raw.length),i.push(o);continue}if(o=this.tokenizer.link(t)){t=t.substring(o.raw.length),i.push(o);continue}if(o=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(o.raw.length);let c=i.at(-1);o.type==="text"&&c?.type==="text"?(c.raw+=o.raw,c.text+=o.text):i.push(o);continue}if(o=this.tokenizer.emStrong(t,e,r)){t=t.substring(o.raw.length),i.push(o);continue}if(o=this.tokenizer.codespan(t)){t=t.substring(o.raw.length),i.push(o);continue}if(o=this.tokenizer.br(t)){t=t.substring(o.raw.length),i.push(o);continue}if(o=this.tokenizer.del(t,e,r)){t=t.substring(o.raw.length),i.push(o);continue}if(o=this.tokenizer.autolink(t)){t=t.substring(o.raw.length),i.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(t))){t=t.substring(o.raw.length),i.push(o);continue}let l=t;if(this.options.extensions?.startInline){let c=1/0,h=t.slice(1),u;this.options.extensions.startInline.forEach(d=>{u=d.call({lexer:this},h),typeof u=="number"&&u>=0&&(c=Math.min(c,u))}),c<1/0&&c>=0&&(l=t.substring(0,c+1))}if(o=this.tokenizer.inlineText(l)){t=t.substring(o.raw.length),o.raw.slice(-1)!=="_"&&(r=o.raw.slice(-1)),s=!0;let c=i.at(-1);c?.type==="text"?(c.raw+=o.raw,c.text+=o.text):i.push(o);continue}if(t){this.infiniteLoopError(t.charCodeAt(0));break}}return i}#n(t){let{blockSkip:e,tag:i,autolink:s}=this.tokenizer.rules.inline,r="",a=0,o;for(e.lastIndex=0;o=e.exec(t);){let l=o.index+(o[2]?o[2].length:0),c=o.index+o[0].length;if(t.charAt(l)==="<"){let h=t.slice(l),u=i.exec(h)||s.exec(h);if(!u){e.lastIndex=l+1;continue}c=l+u[0].length,e.lastIndex=c}r+=t.slice(a,l)+"["+"a".repeat(c-l-2)+"]",a=c}return r+t.slice(a)}#i(t){let e=t;if(this.tokens.links&&t.includes("[")){let i=this.tokenizer.rules.inline.reflinkSearch,s=r=>{let a=r.lastIndexOf("[");if(!Object.hasOwn(this.tokens.links,xa(r.slice(a+1,-1))))return r;if(a>1&&r.charAt(0)!=="!"){let o=r.slice(1,a-1);if(this.linkInText(o))return"["+o.replace(i,s)+"]["+"a".repeat(r.length-a-2)+"]"}return"["+"a".repeat(r.length-2)+"]"};e=e.replace(i,s)}return e=e.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode,(i,s,r)=>r?"+".repeat(i.length):s?s+i.slice(s.length,-s.length).replace(/`/g,"+")+s:i),e=this.#n(e),e=this.options.hooks?.emStrongMask?.call({lexer:this},e)??e,e}infiniteLoopError(t){let e="Infinite loop on byte: "+t;if(this.options.silent)console.error(e);else throw new Error(e)}},ya=class{options;parser;constructor(n){this.options=n||ts}space(n){return""}code({text:n,lang:t,escaped:e}){let i=(t||"").match(ze.notSpaceStart)?.[0],s=n?n.replace(ze.endingNewline,"")+`
`:"";return i?'<pre><code class="language-'+bn(i)+'">'+(e?s:bn(s,!0))+`</code></pre>
`:"<pre><code>"+(e?s:bn(s,!0))+`</code></pre>
`}blockquote({tokens:n}){return`<blockquote>
${this.parser.parse(n)}</blockquote>
`}html({text:n}){return n}def(n){return""}heading({tokens:n,depth:t}){return`<h${t}>${this.parser.parseInline(n)}</h${t}>
`}hr(n){return`<hr>
`}list(n){let t=n.ordered,e=n.start,i="";for(let a=0;a<n.items.length;a++){let o=n.items[a];i+=this.listitem(o)}let s=t?"ol":"ul",r=t&&e!==1?' start="'+e+'"':"";return"<"+s+r+`>
`+i+"</"+s+`>
`}listitem(n){return`<li>${this.parser.parse(n.tokens)}</li>
`}checkbox({checked:n}){return"<input "+(n?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:n}){return`<p>${this.parser.parseInline(n)}</p>
`}table(n){let t="",e="";for(let s=0;s<n.header.length;s++)e+=this.tablecell(n.header[s]);t+=this.tablerow({text:e});let i="";for(let s=0;s<n.rows.length;s++){let r=n.rows[s];e="";for(let a=0;a<r.length;a++)e+=this.tablecell(r[a]);i+=this.tablerow({text:e})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:n}){return`<tr>
${n}</tr>
`}tablecell(n){let t=this.parser.parseInline(n.tokens),e=n.header?"th":"td";return(n.align?`<${e} align="${n.align}">`:`<${e}>`)+t+`</${e}>
`}strong({tokens:n}){return`<strong>${this.parser.parseInline(n)}</strong>`}em({tokens:n}){return`<em>${this.parser.parseInline(n)}</em>`}codespan({text:n}){return`<code>${bn(n,!0)}</code>`}br(n){return"<br>"}del({tokens:n}){return`<del>${this.parser.parseInline(n)}</del>`}link({href:n,title:t,text:e,tokens:i,autolink:s}){let r=s?bn(e,!0):this.parser.parseInline(i),a=Zh(n);if(a===null)return r;n=bn(a,s);let o='<a href="'+n+'"';return t&&(o+=' title="'+bn(t)+'"'),o+=">"+r+"</a>",o}image({href:n,title:t,text:e,tokens:i}){i&&(e=this.parser.parseInline(i,this.parser.textRenderer));let s=Zh(n);if(s===null)return bn(e);n=s;let r=`<img src="${bn(n)}" alt="${bn(e)}"`;return t&&(r+=` title="${bn(t)}"`),r+=">",r}text(n){return"tokens"in n&&n.tokens?this.parser.parseInline(n.tokens):"escaped"in n&&n.escaped?n.text:bn(n.text)}},Hl=class{parser;strong({text:n,tokens:t}){return t?this.parser.parseInline(t,this):n}em({text:n,tokens:t}){return t?this.parser.parseInline(t,this):n}codespan({text:n}){return n}del({text:n,tokens:t}){return t?this.parser.parseInline(t,this):n}html({text:n}){return n}text({text:n}){return n}link({text:n,tokens:t}){return t?this.parser.parseInline(t,this):n}image({text:n,tokens:t}){return t?this.parser.parseInline(t,this):n}br(){return`
`}checkbox({raw:n}){return n}},Vn=class Dl{options;renderer;textRenderer;constructor(t){this.options=t||ts,this.options.renderer=this.options.renderer||new ya,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Hl,this.textRenderer.parser=this}static parse(t,e){return new Dl(e).parse(t)}static parseInline(t,e){return new Dl(e).parseInline(t)}parse(t){this.renderer.parser=this;let e="";for(let i=0;i<t.length;i++){let s=t[i];if(this.options.extensions?.renderers?.[s.type]){let a=s,o=this.options.extensions.renderers[a.type].call({parser:this},a);if(o!==!1||!["space","hr","heading","code","table","blockquote","list","checkbox","html","def","paragraph","text"].includes(a.type)){e+=o===!1?"":o??"";continue}}let r=s;switch(r.type){case"space":{e+=this.renderer.space(r);break}case"hr":{e+=this.renderer.hr(r);break}case"heading":{e+=this.renderer.heading(r);break}case"code":{e+=this.renderer.code(r);break}case"table":{e+=this.renderer.table(r);break}case"blockquote":{e+=this.renderer.blockquote(r);break}case"list":{e+=this.renderer.list(r);break}case"checkbox":{e+=this.renderer.checkbox(r);break}case"html":{e+=this.renderer.html(r);break}case"def":{e+=this.renderer.def(r);break}case"paragraph":{e+=this.renderer.paragraph(r);break}case"text":{e+=this.renderer.text(r);break}default:{let a='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return e}parseInline(t,e=this.renderer){this.renderer.parser=this;let i="";for(let s=0;s<t.length;s++){let r=t[s];if(this.options.extensions?.renderers?.[r.type]){let o=this.options.extensions.renderers[r.type].call({parser:this},r);if(o!==!1||!["escape","html","link","image","checkbox","strong","em","codespan","br","del","text"].includes(r.type)){i+=o===!1?"":o??"";continue}}let a=r;switch(a.type){case"escape":{i+=e.text(a);break}case"html":{i+=e.html(a);break}case"link":{i+=e.link(a);break}case"image":{i+=e.image(a);break}case"checkbox":{i+=e.checkbox(a);break}case"strong":{i+=e.strong(a);break}case"em":{i+=e.em(a);break}case"codespan":{i+=e.codespan(a);break}case"br":{i+=e.br(a);break}case"del":{i+=e.del(a);break}case"text":{i+=e.text(a);break}default:{let o='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return i}},dr=class{options;block;constructor(n){this.options=n||ts}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(n){return n}postprocess(n){return n}processAllTokens(n){return n}emStrongMask(n){return n}provideLexer(n=this.block){return n?Hn.lex:Hn.lexInline}provideParser(n=this.block){return n?Vn.parse:Vn.parseInline}};function Ni(n,t){if(Array.isArray(t))for(let e=0;e<t.length;e++)n.push(t[e]);else n.push(t)}var Hm=class{defaults=Nl();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Vn;Renderer=ya;TextRenderer=Hl;Lexer=Hn;Tokenizer=bs;Hooks=dr;constructor(...n){this.use(...n)}walkTokens(n,t){let e=[];for(let i of n)switch(Ni(e,t.call(this,i)),i.type){case"table":{let s=i;for(let r of s.header)Ni(e,this.walkTokens(r.tokens,t));for(let r of s.rows)for(let a of r)Ni(e,this.walkTokens(a.tokens,t));break}case"list":{let s=i;Ni(e,this.walkTokens(s.items,t));break}default:{let s=i;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(r=>{let a=s[r].flat(1/0);Ni(e,this.walkTokens(a,t))}):s.tokens&&Ni(e,this.walkTokens(s.tokens,t))}}return e}use(...n){let t=this.defaults.extensions||{renderers:Object.create(null),childTokens:Object.create(null)};return n.forEach(e=>{let i={...e};if(i.async=this.defaults.async||i.async||!1,e.extensions&&(e.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let r=t.renderers[s.name];r?t.renderers[s.name]=function(...a){let o=s.renderer.apply(this,a);return o===!1&&(o=r.apply(this,a)),o}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let r=t[s.level];r?r.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),e.renderer){let s=this.defaults.renderer||new ya(this.defaults);for(let r in e.renderer){if(!(r in s))throw new Error(`renderer '${r}' does not exist`);if(["options","parser"].includes(r))continue;let a=r,o=e.renderer[a],l=s[a];s[a]=(...c)=>{let h=o.apply(s,c);return h===!1&&(h=l.apply(s,c)),h===!1?"":h??""}}i.renderer=s}if(e.tokenizer){let s=this.defaults.tokenizer||new bs(this.defaults);for(let r in e.tokenizer){if(!(r in s))throw new Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;let a=r,o=e.tokenizer[a],l=s[a];s[a]=(...c)=>{let h=o.apply(s,c);return h===!1&&(h=l.apply(s,c)),h}}i.tokenizer=s}if(e.hooks){let s=this.defaults.hooks||new dr;for(let r in e.hooks){if(!(r in s))throw new Error(`hook '${r}' does not exist`);if(["options","block"].includes(r))continue;let a=r,o=e.hooks[a],l=s[a];dr.passThroughHooks.has(r)?s[a]=c=>{if(s.options.async&&dr.passThroughHooksRespectAsync.has(r))return(async()=>{let u=await o.call(s,c);return l.call(s,u)})();let h=o.call(s,c);return l.call(s,h)}:s[a]=(...c)=>{if(s.options.async)return(async()=>{let u=await o.apply(s,c);return u===!1&&(u=await l.apply(s,c)),u})();let h=o.apply(s,c);return h===!1&&(h=l.apply(s,c)),h}}i.hooks=s}if(e.walkTokens){let s=this.defaults.walkTokens,r=e.walkTokens;i.walkTokens=function(a){let o=[];return Ni(o,r.call(this,a)),s&&Ni(o,s.call(this,a)),o}}this.defaults={...this.defaults,...i}}),this}setOptions(n){return this.defaults={...this.defaults,...n},this}lexer(n,t){return Hn.lex(n,t??this.defaults)}parser(n,t){return Vn.parse(n,t??this.defaults)}parseMarkdown(n){return(t,e)=>{let i={...e},s={...this.defaults,...i},r=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return r(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return r(new Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return r(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=n),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,o=await(s.hooks?await s.hooks.provideLexer(n):n?Hn.lex:Hn.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(o):o;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser(n):n?Vn.parse:Vn.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(r);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer(n):n?Hn.lex:Hn.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let o=(s.hooks?s.hooks.provideParser(n):n?Vn.parse:Vn.parseInline)(a,s);return s.hooks&&(o=s.hooks.postprocess(o)),o}catch(a){return r(a)}}}onError(n,t){return e=>{if(e.message+=`
Please report this to https://github.com/markedjs/marked.`,n){let i="<p>An error occurred:</p><pre>"+bn(e.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(e);throw e}}},Qi=new Hm;function fe(n,t){return Qi.parse(n,t)}fe.options=fe.setOptions=function(n){return Qi.setOptions(n),fe.defaults=Qi.defaults,eu(fe.defaults),fe};fe.getDefaults=Nl;fe.defaults=ts;function Vm(...n){return Qi.use(...n),fe.defaults=Qi.defaults,eu(fe.defaults),fe}fe.use=Vm;fe.walkTokens=function(n,t){return Qi.walkTokens(n,t)};fe.parseInline=Qi.parseInline;fe.Parser=Vn;fe.parser=Vn.parse;fe.Renderer=ya;fe.TextRenderer=Hl;fe.Lexer=Hn;fe.lexer=Hn.lex;fe.Tokenizer=bs;fe.Hooks=dr;fe.parse=fe;var tb=fe.options,eb=fe.setOptions,nb=fe.walkTokens,ib=fe.parseInline;var sb=Vn.parse,rb=Hn.lex;function Wm(n,t){this.v=n,this.k=t}function uu(n,t){(t==null||t>n.length)&&(t=n.length);for(var e=0,i=Array(t);e<t;e++)i[e]=n[e];return i}function Xm(n){if(Array.isArray(n))return n}function qm(n,t){var e=n==null?null:typeof Symbol<"u"&&n[Symbol.iterator]||n["@@iterator"];if(e!=null){var i,s,r,a,o=[],l=!0,c=!1;try{if(r=(e=e.call(n)).next,t===0){if(Object(e)!==e)return;l=!1}else for(;!(l=(i=r.call(e)).done)&&(o.push(i.value),o.length!==t);l=!0);}catch(h){c=!0,s=h}finally{try{if(!l&&e.return!=null&&(a=e.return(),Object(a)!==a))return}finally{if(c)throw s}}return o}}function Ym(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function $m(n,t){return Xm(n)||qm(n,t)||Zm(n,t)||Ym()}function Zm(n,t){if(n){if(typeof n=="string")return uu(n,t);var e={}.toString.call(n).slice(8,-1);return e==="Object"&&n.constructor&&(e=n.constructor.name),e==="Map"||e==="Set"?Array.from(n):e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?uu(n,t):void 0}}function va(n){var t,e;function i(r,a){try{var o=n[r](a),l=o.value,c=l instanceof Wm;Promise.resolve(c?l.v:l).then(function(h){if(c){var u=r==="return"&&l.k?r:"next";if(!l.k||h.done)return i(u,h);h=n[u](h).value}s(!!o.done,h)},function(h){i("throw",h)})}catch(h){s(2,h)}}function s(r,a){r===2?t.reject(a):t.resolve({value:a,done:r}),(t=t.next)?i(t.key,t.arg):e=null}this._invoke=function(r,a){return new Promise(function(o,l){var c={key:r,arg:a,resolve:o,reject:l,next:null};e?e=e.next=c:(t=e=c,i(r,a))})},typeof n.return!="function"&&(this.return=void 0)}va.prototype[typeof Symbol=="function"&&Symbol.asyncIterator||"@@asyncIterator"]=function(){return this},va.prototype.next=function(n){return this._invoke("next",n)},va.prototype.throw=function(n){return this._invoke("throw",n)},va.prototype.return=function(n){return this._invoke("return",n)};var Au=Object.entries,du=Object.setPrototypeOf,Km=Object.isFrozen,Eu=Object.getPrototypeOf,Ru=Object.getOwnPropertyDescriptor,qe=Object.freeze,Ke=Object.seal,Ts=Object.create,Cu=typeof Reflect<"u"&&Reflect,jl=Cu.apply,Ql=Cu.construct;qe||(qe=function(t){return t});Ke||(Ke=function(t){return t});jl||(jl=function(t,e){for(var i=arguments.length,s=new Array(i>2?i-2:0),r=2;r<i;r++)s[r-2]=arguments[r];return t.apply(e,s)});Ql||(Ql=function(t){for(var e=arguments.length,i=new Array(e>1?e-1:0),s=1;s<e;s++)i[s-1]=arguments[s];return new t(...i)});var vi=we(Array.prototype.forEach);Array.prototype.indexOf;var Jm=we(Array.prototype.lastIndexOf),fu=we(Array.prototype.pop),gr=we(Array.prototype.push),jm=we(Array.prototype.slice),Qm=we(Array.prototype.splice),As=Array.isArray,Vl=Iu(Set),Wl=we(Set.prototype.add),_r=we(Set.prototype.has),es=we(String.prototype.toLowerCase),Xl=we(String.prototype.toString),pu=we(String.prototype.match),xr=we(String.prototype.replace),mu=we(String.prototype.indexOf),tg=we(String.prototype.trim),eg=we(Number.prototype.toString),ng=we(Boolean.prototype.toString),gu=typeof BigInt>"u"?null:we(BigInt.prototype.toString),_u=typeof Symbol>"u"?null:we(Symbol.prototype.toString),xn=we(Object.prototype.hasOwnProperty),yr=we(Object.prototype.toString),Ze=we(RegExp.prototype.test),Si=Iu(TypeError);function we(n){return function(t){t instanceof RegExp&&(t.lastIndex=0);for(var e=arguments.length,i=new Array(e>1?e-1:0),s=1;s<e;s++)i[s-1]=arguments[s];return jl(n,t,i)}}function Iu(n){return function(){for(var t=arguments.length,e=new Array(t),i=0;i<t;i++)e[i]=arguments[i];return Ql(n,e)}}function oe(n,t){let e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:es;if(du&&du(n,null),!As(t))return n;let i=t.length;for(;i--;){let s=t[i];if(typeof s=="string"){let r=e(s);r!==s&&(Km(t)||(t[i]=r),s=r)}n[s]=!0}return n}function ig(n){for(let t=0;t<n.length;t++)xn(n,t)||(n[t]=null);return n}function Mn(n){let t=Ts(null);for(let i of Au(n)){var e=$m(i,2);let s=e[0],r=e[1];xn(n,s)&&(As(r)?t[s]=ig(r):r&&typeof r=="object"&&r.constructor===Object?t[s]=Mn(r):t[s]=r)}return t}function sg(n){switch(typeof n){case"string":return n;case"number":return eg(n);case"boolean":return ng(n);case"bigint":return gu?gu(n):"0";case"symbol":return _u?_u(n):"Symbol()";case"undefined":return yr(n);case"function":case"object":{if(n===null)return yr(n);let t=n,e=On(t,"toString");if(typeof e=="function"){let i=e(t);return typeof i=="string"?i:yr(i)}return yr(n)}default:return yr(n)}}function On(n,t){for(;n!==null;){let i=Ru(n,t);if(i){if(i.get)return we(i.get);if(typeof i.value=="function")return we(i.value)}n=Eu(n)}function e(){return null}return e}function rg(n,t){for(;n!==null;){let e=Ru(n,t);if(e)return e.get?we(e.get):null;n=Eu(n)}return null}function ag(n){try{return Ze(n,""),!0}catch{return!1}}var xu=qe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","search","section","select","shadow","slot","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),ql=qe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","enterkeyhint","exportparts","filter","font","g","glyph","glyphref","hkern","image","inputmode","line","lineargradient","marker","mask","metadata","mpath","part","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Yl=qe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),og=qe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),$l=qe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),lg=qe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),yu=qe(["#text"]),vu=qe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","command","commandfor","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","exportparts","face","for","headers","height","hidden","high","href","hreflang","id","inert","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","part","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","slot","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns"]),Zl=qe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dominant-baseline","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","mask-type","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","pointer-events","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-orientation","text-rendering","textlength","type","u1","u2","unicode","values","vector-effect","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Su=qe(["accent","accentunder","align","bevelled","close","columnalign","columnlines","columnspacing","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lquote","lspace","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Sa=qe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),cg=Ke(/{{[\w\W]*|^[\w\W]*}}/g),hg=Ke(/<%[\w\W]*|^[\w\W]*%>/g),ug=Ke(/\${[\w\W]*/g),dg=Ke(/^data-[\-\w.\u00B7-\uFFFF]+$/),fg=Ke(/^aria-[\-\w]+$/),bu=Ke(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),pg=Ke(/^(?:\w+script|data):/i),mg=Ke(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),gg=Ke(/^html$/i),_g=Ke(/^[a-z][.\w]*(-[.\w]+)+$/i),Kl=Ke(/<[/\w!]/g),Mu=Ke(/<[/\w]/g),xg=Ke(/<\/no(script|embed|frames)/i),wu=Ke(/\/>/i),Ue={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},yg=qe(oe({},["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])),vg=function(){return typeof window>"u"?null:window},Sg=function(t,e){if(typeof t!="object"||typeof t.createPolicy!="function")return null;let i=null,s="data-tt-policy-suffix";e&&e.hasAttribute(s)&&(i=e.getAttribute(s));let r="dompurify"+(i?"#"+i:"");try{return t.createPolicy(r,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+r+" could not be created."),null}},Tu=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},Ui=function(t,e,i,s){return xn(t,e)&&As(t[e])?oe(s.base?Mn(s.base):{},t[e],s.transform):i},Jl=function(t,e,i){let s=xn(t,e)?t[e]:void 0;return s&&typeof s=="object"?Mn(s):i()};function Pu(){let n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:vg(),t=at=>Pu(at);if(t.version="3.4.17",t.removed=[],!n||!n.document||n.document.nodeType!==Ue.document||!n.Element)return t.isSupported=!1,t;let e=n.document,i=e,s=i.currentScript;n.DocumentFragment;let r=n.HTMLTemplateElement,a=n.Node,o=n.Element,l=n.NodeFilter;n.NamedNodeMap===void 0&&(n.NamedNodeMap||n.MozNamedAttrMap),n.HTMLFormElement;let c=n.DOMParser,h=n.trustedTypes,u=o.prototype,d=On(u,"cloneNode"),p=On(u,"remove"),g=On(u,"removeAttributeNode"),x=On(u,"nextSibling"),m=On(u,"childNodes"),f=On(u,"parentNode"),v=On(u,"shadowRoot"),A=On(u,"attributes"),b=a&&a.prototype?On(a.prototype,"nodeType"):null,T=a&&a.prototype?On(a.prototype,"nodeName"):null,E=a&&a.prototype?On(a.prototype,"ownerDocument"):null,_=function(w){return b?b(w):w.nodeType},M=function(w){return T?T(w):w.nodeName},z=rg(u,"namespaceURI"),P=function(w){return z?z(w):w.namespaceURI};if(typeof r=="function"){let at=e.createElement("template");at.content&&at.content.ownerDocument&&(e=at.content.ownerDocument)}let N,B="",Z,I=!1,Y=0,et=function(){if(Y>0)throw Si('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.')},k=function(w){et(),Y++;try{return N.createHTML(w)}finally{Y--}},j=function(w){et(),Y++;try{return N.createScriptURL(w)}finally{Y--}},D=function(){return I||(Z=Sg(h,s),I=!0),Z},$=e,W=$.implementation,ot=$.createNodeIterator,At=$.createDocumentFragment,K=$.getElementsByTagName,ht=i.importNode,ct=Tu();t.isSupported=typeof Au=="function"&&typeof f=="function"&&W&&W.createHTMLDocument!==void 0;let Ct=cg,Mt=hg,Xt=ug,Re=dg,Ot=fg,le=pg,he=mg,Jt=_g,Le=bu,qt=null,We=oe({},[...xu,...ql,...Yl,...$l,...yu]),Bt=null,pn=oe({},[...vu,...Zl,...Su,...Sa]),ge=Object.seal(Ts(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Xe=null,on=null,Pe=Object.seal(Ts(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),F=!0,Qe=!0,ye=!1,_e=!0,mt=!1,ve=!0,Dt=!1,kt=!1,R=null,y=null,H=!1,lt=!1,it=!1,pt=!1,bt=!0,Q=!1,nt="user-content-",gt=!0,C=!1,tt=null,J={},dt=null,ft=oe({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","selectedcontent","style","svg","template","thead","title","video","xmp"]),_t=null,Lt=oe({},["audio","video","img","source","image","track"]),$t=null,ut=oe({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Nt="http://www.w3.org/1998/Math/MathML",Ht="http://www.w3.org/2000/svg",yt="http://www.w3.org/1999/xhtml",se=yt,Ce=!1,Dn=null,ca=oe({},[Nt,Ht,yt],Xl),ys=qe(["mi","mo","mn","ms","mtext"]),rr=oe({},ys),ar=qe(["annotation-xml"]),vs=oe({},ar),mi=oe({},["title","style","font","a","script"]),gi=null,ha=["application/xhtml+xml","text/html"],ua="text/html",Se=null,_i=null,da=e.createElement("form"),Di=function(w){return w instanceof RegExp||w instanceof Function},or=function(){let w=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(_i&&_i===w)return;(!w||typeof w!="object")&&(w={}),w=Mn(w),gi=ha.indexOf(w.PARSER_MEDIA_TYPE)===-1?ua:w.PARSER_MEDIA_TYPE,Se=gi==="application/xhtml+xml"?Xl:es,qt=Ui(w,"ALLOWED_TAGS",We,{transform:Se}),Bt=Ui(w,"ALLOWED_ATTR",pn,{transform:Se}),Dn=Ui(w,"ALLOWED_NAMESPACES",ca,{transform:Xl}),$t=Ui(w,"ADD_URI_SAFE_ATTR",ut,{transform:Se,base:ut}),_t=Ui(w,"ADD_DATA_URI_TAGS",Lt,{transform:Se,base:Lt}),dt=Ui(w,"FORBID_CONTENTS",ft,{transform:Se}),Xe=Ui(w,"FORBID_TAGS",Mn({}),{transform:Se}),on=Ui(w,"FORBID_ATTR",Mn({}),{transform:Se}),J=xn(w,"USE_PROFILES")?w.USE_PROFILES&&typeof w.USE_PROFILES=="object"?Mn(w.USE_PROFILES):w.USE_PROFILES:!1,F=w.ALLOW_ARIA_ATTR!==!1,Qe=w.ALLOW_DATA_ATTR!==!1,ye=w.ALLOW_UNKNOWN_PROTOCOLS||!1,_e=w.ALLOW_SELF_CLOSE_IN_ATTR!==!1,mt=w.SAFE_FOR_TEMPLATES||!1,ve=w.SAFE_FOR_XML!==!1,Dt=w.WHOLE_DOCUMENT||!1,lt=w.RETURN_DOM||!1,it=w.RETURN_DOM_FRAGMENT||!1,pt=w.RETURN_TRUSTED_TYPE||!1,H=w.FORCE_BODY||!1,bt=w.SANITIZE_DOM!==!1,Q=w.SANITIZE_NAMED_PROPS||!1,gt=w.KEEP_CONTENT!==!1,C=w.IN_PLACE||!1,Le=ag(w.ALLOWED_URI_REGEXP)?w.ALLOWED_URI_REGEXP:bu,se=typeof w.NAMESPACE=="string"?w.NAMESPACE:yt,rr=Jl(w,"MATHML_TEXT_INTEGRATION_POINTS",()=>oe({},ys)),vs=Jl(w,"HTML_INTEGRATION_POINTS",()=>oe({},ar));let O=Jl(w,"CUSTOM_ELEMENT_HANDLING",()=>Ts(null));if(ge=Ts(null),xn(O,"tagNameCheck")&&Di(O.tagNameCheck)&&(ge.tagNameCheck=O.tagNameCheck),xn(O,"attributeNameCheck")&&Di(O.attributeNameCheck)&&(ge.attributeNameCheck=O.attributeNameCheck),xn(O,"allowCustomizedBuiltInElements")&&typeof O.allowCustomizedBuiltInElements=="boolean"&&(ge.allowCustomizedBuiltInElements=O.allowCustomizedBuiltInElements),Ke(ge),mt&&(Qe=!1),it&&(lt=!0),J&&(qt=oe({},yu),Bt=Ts(null),J.html===!0&&(oe(qt,xu),oe(Bt,vu)),J.svg===!0&&(oe(qt,ql),oe(Bt,Zl),oe(Bt,Sa)),J.svgFilters===!0&&(oe(qt,Yl),oe(Bt,Zl),oe(Bt,Sa)),J.mathMl===!0&&(oe(qt,$l),oe(Bt,Su),oe(Bt,Sa))),Pe.tagCheck=null,Pe.attributeCheck=null,xn(w,"ADD_TAGS")&&(typeof w.ADD_TAGS=="function"?Pe.tagCheck=w.ADD_TAGS:As(w.ADD_TAGS)&&(qt===We&&(qt=Mn(qt)),oe(qt,w.ADD_TAGS,Se))),xn(w,"ADD_ATTR")&&(typeof w.ADD_ATTR=="function"?Pe.attributeCheck=w.ADD_ATTR:As(w.ADD_ATTR)&&(Bt===pn&&(Bt=Mn(Bt)),oe(Bt,w.ADD_ATTR,Se))),xn(w,"ADD_FORBID_CONTENTS")&&As(w.ADD_FORBID_CONTENTS)&&(dt===ft&&(dt=Mn(dt)),oe(dt,w.ADD_FORBID_CONTENTS,Se)),gt&&(qt["#text"]=!0),Dt&&oe(qt,["html","head","body"]),qt.table&&(oe(qt,["tbody"]),delete Xe.tbody),w.TRUSTED_TYPES_POLICY){if(typeof w.TRUSTED_TYPES_POLICY.createHTML!="function")throw Si('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof w.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Si('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');let st=N;N=w.TRUSTED_TYPES_POLICY;try{B=k("")}catch(rt){throw N=st,rt}}else w.TRUSTED_TYPES_POLICY===null?(N=void 0,B=""):(N===void 0&&(N=D()),N&&typeof B=="string"&&(B=k("")));qe&&qe(w),_i=w},lr=oe({},[...ql,...Yl,...og]),cr=oe({},[...$l,...lg]),Al=function(w,O,st){return O.namespaceURI===yt?w==="svg":O.namespaceURI===Nt?w==="svg"&&(st==="annotation-xml"||rr[st]):!!lr[w]},El=function(w,O,st){return O.namespaceURI===yt?w==="math":O.namespaceURI===Ht?w==="math"&&vs[st]:!!cr[w]},Rl=function(w,O,st){return O.namespaceURI===Ht&&!vs[st]||O.namespaceURI===Nt&&!rr[st]?!1:!cr[w]&&(mi[w]||!lr[w])},fa=function(w){let O=P(w),st=es(M(w)),rt=f(w),Ut,zt;return rt&&_(rt)===Ue.element?(Ut={namespaceURI:P(rt)},zt=es(M(rt))):(Ut={namespaceURI:se},zt="template"),Dn[O]?O===Ht?Al(st,Ut,zt):O===Nt?El(st,Ut,zt):O===yt?Rl(st,Ut,zt):!!(gi==="application/xhtml+xml"&&Dn[O]):!1},S=function(w){gr(t.removed,{element:w});try{f(w).removeChild(w)}catch{if(p(w),!f(w))throw Si("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place")}},L=function(w,O,st){try{g(w,O)}catch{try{w.removeAttribute(st)}catch{}}},q=function(w){Et(w);let O=m(w);O&&vi(jm(O),rt=>{try{p(rt)}catch{}});let st=_(w)===Ue.element?A(w):null;if(st)for(let rt=st.length-1;rt>=0;--rt){let Ut=st[rt],zt=Ut&&Ut.name;typeof zt=="string"&&L(w,Ut,zt)}},G=function(w,O,st){if(!st)try{st=O.getAttributeNode(w)}catch{st=null}gr(t.removed,{attribute:st||null,from:O});try{st?g(O,st):O.removeAttribute(w)}catch{try{O.removeAttribute(w)}catch{}}if(w==="is")if(lt||it)try{S(O)}catch{}else try{O.setAttribute(w,"")}catch{}},V=function(w){let O=A(w);if(O)for(let st=O.length-1;st>=0;--st){let rt=O[st],Ut=rt&&rt.name;typeof Ut!="string"||Bt[Se(Ut)]||L(w,rt,Ut)}},St=function(w,O){let st=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!1,rt=[w];for(;rt.length>0;){let Ut=rt.pop();if(O(Ut)===!1)continue;if(st&&_(Ut)===Ue.element){let ee=v(Ut);be(ee)&&rt.push(ee)}let zt=m(Ut);if(zt)for(let ee=zt.length-1;ee>=0;--ee)rt.push(zt[ee])}},Et=function(w){St(w,O=>{_(O)===Ue.element&&V(O)})},vt=function(w){let O=[];return St(w,st=>{O.push(st)},!0),O},wt=function(w,O){let st=Vl();vi(vt(w),rt=>{_(rt)===Ue.element&&Wl(st,rt)}),vi(O,rt=>{_(rt)===Ue.element&&!_r(st,rt)&&V(rt)})},Pt=function(w,O){let st=!1;return vi(t.removed,rt=>{rt.element&&(st=st||rt.element===w,Et(rt.element))}),wt(w,O),st},Vt=8,jt=function(w,O){let st=tt,rt=null,Ut=()=>(rt||(rt=Vl(),vi(O,zt=>{Wl(rt,zt)})),rt);for(let zt=0;;zt++){let ee=vt(w),Be=[w],ni=!1;if(vi(ee,ln=>{_(ln)===Ue.documentFragment?gr(Be,ln):!ni&&!_r(st,ln)&&(ni=_r(Ut(),ln))}),!ni)return;if(zt>=Vt)throw Si("the tree kept changing during in-place sanitization; refusing to return it");vi(Be,(ln,gn)=>{It(ln,gn>0,w,Ut())})}},It=function(w,O,st,rt){let Ut=De(w),zt;for(;zt=Ut.nextNode();)!_r(rt,zt)||_r(tt,zt)||(O&&Ne(ct.uponSanitizeShadowNode,zt,null),Ie(zt,st),Cl(zt,st),be(zt.content)&&hr(zt.content))},Qt=function(w){tt&&Wl(tt,w)},Te=function(w,O){return ve?w==="patchsrc"?!0:w==="for"&&O!=="label"&&O!=="output":!1},xe=function(w){ve&&St(w,O=>{let st=_(O);if(st===Ue.processingInstruction||st===Ue.comment&&Ze(Mu,O.data)){try{p(O)}catch{}return!1}if(st===Ue.element){let rt=O,Ut=Se(M(O));try{rt.hasAttribute&&rt.hasAttribute("patchsrc")&&rt.removeAttribute("patchsrc"),rt.hasAttribute&&rt.hasAttribute("for")&&Te("for",Ut)&&rt.removeAttribute("for")}catch{}}return!0})},ue=function(w){let O=null,st=null;if(H)w="<remove></remove>"+w;else{let zt=pu(w,/^[\r\n\t ]+/);st=zt&&zt[0]}gi==="application/xhtml+xml"&&se===yt&&(w='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+w+"</body></html>");let rt=N?k(w):w;if(se===yt)try{O=new c().parseFromString(rt,gi)}catch{}if(!O||!O.documentElement){O=W.createDocument(se,"template",null);try{O.documentElement.innerHTML=Ce?B:rt}catch{}}let Ut=O.body||O.documentElement;return w&&st&&Ut.insertBefore(e.createTextNode(st),Ut.childNodes[0]||null),se===yt?K.call(O,Dt?"html":"body")[0]:Dt?O.documentElement:Ut},De=function(w){let O=E?E(w):w.ownerDocument;return ot.call(O||w,w,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},Rt=function(w){return w=xr(w,Ct," "),w=xr(w,Mt," "),w=xr(w,Xt," "),w},Fe=function(w){var O;ae(w);let st=(O=w.querySelectorAll)===null||O===void 0?void 0:O.call(w,"template");st&&vi(st,rt=>{be(rt.content)&&Fe(rt.content)})},ae=function(w){w.normalize();let O=E?E(w):w.ownerDocument,st=ot.call(O||w,w,l.SHOW_TEXT|l.SHOW_COMMENT|l.SHOW_CDATA_SECTION|l.SHOW_PROCESSING_INSTRUCTION,null),rt=st.nextNode();for(;rt;)rt.data=Rt(rt.data),rt=st.nextNode()},Nn=function(w){let O=T?T(w):null;return typeof O!="string"||Se(O)!=="form"?!1:typeof w.nodeName!="string"||typeof w.textContent!="string"||typeof w.removeChild!="function"||w.attributes!==A(w)||typeof w.removeAttribute!="function"||typeof w.removeAttributeNode!="function"||typeof w.getAttributeNode!="function"||typeof w.setAttribute!="function"||typeof w.namespaceURI!="string"||typeof w.insertBefore!="function"||typeof w.hasChildNodes!="function"||w.nodeType!==b(w)||w.childNodes!==m(w)},be=function(w){if(!b||typeof w!="object"||w===null)return!1;try{return b(w)===Ue.documentFragment}catch{return!1}},ei=function(w){if(!b||typeof w!="object"||w===null)return!1;try{return typeof b(w)=="number"}catch{return!1}};function Ne(at,w,O){at.length!==0&&vi(at,st=>{st.call(t,w,O,_i)})}let xi=function(w,O){return!!(ve&&w.hasChildNodes()&&!ei(w.firstElementChild)&&Ze(Kl,w.textContent)&&Ze(Kl,w.innerHTML)||ve&&yg[O]&&_(w)===Ue.element&&P(w)===yt&&(ei(w.firstElementChild)||typeof w.textContent=="string"&&Ze(Kl,w.textContent))||w.nodeType===Ue.processingInstruction||ve&&w.nodeType===Ue.comment&&Ze(Mu,w.data))},te=function(w,O){if(w instanceof RegExp)return Ze(w,O);if(w instanceof Function){for(var st=arguments.length,rt=new Array(st>2?st-2:0),Ut=2;Ut<st;Ut++)rt[Ut-2]=arguments[Ut];return!!w(O,...rt)}return!1},ke=function(w,O,st){if(!Xe[O]&&Hh(O)&&te(ge.tagNameCheck,O))return!1;if(gt&&!dt[O]&&!dt[es(O)]){let rt=f(w),Ut=m(w);if(Ut&&rt){let zt=Ut.length;for(let ee=zt-1;ee>=0;--ee){let Be=w===st?d(Ut[ee],!0):Ut[ee];rt.insertBefore(Be,x(w))}}}return S(w),!0},mn=function(w,O,st,rt){return w.length===0?O:O===st||O===rt?Mn(O):O},de=function(w,O){return w===O||f(w)!==null?!1:(C&&Et(w),!0)},Ie=function(w,O){if(Qt(w),Ne(ct.beforeSanitizeElements,w,null),de(w,O))return!0;if(Nn(w))return S(w),!0;let st=Se(M(w));if(qt=mn(ct.uponSanitizeElement,qt,We,R),Ne(ct.uponSanitizeElement,w,{tagName:st,allowedTags:qt}),de(w,O))return!0;if(xi(w,st))return S(w),!0;if(Xe[st]||!(Pe.tagCheck instanceof Function&&Pe.tagCheck(st))&&!qt[st]){let rt=ke(w,st,O);return rt===!1&&(Ne(ct.afterSanitizeElements,w,null),de(w,O))?!0:rt}if(_(w)===Ue.element&&!fa(w)||(st==="noscript"||st==="noembed"||st==="noframes")&&Ze(xg,w.innerHTML))return S(w),!0;if(mt&&w.nodeType===Ue.text){let rt=Rt(w.textContent);w.textContent!==rt&&(gr(t.removed,{element:w.cloneNode()}),w.textContent=rt)}return Ne(ct.afterSanitizeElements,w,null),de(w,O)},Un=function(w,O,st){if(on[O]||Te(O,w)||bt&&(O==="id"||O==="name")&&(st in e||st in da))return!1;let rt=Bt[O]||Pe.attributeCheck instanceof Function&&Pe.attributeCheck(O,w);return Qe&&Ze(Re,O)||F&&Ze(Ot,O)?!0:rt?$t[O]||Ze(Le,xr(st,he,""))||(O==="src"||O==="xlink:href"||O==="href")&&w!=="script"&&mu(st,"data:")===0&&_t[w]||ye&&!Ze(le,xr(st,he,""))?!0:!st:Hh(w)&&te(ge.tagNameCheck,w)&&te(ge.attributeNameCheck,O,w)||O==="is"&&ge.allowCustomizedBuiltInElements&&te(ge.tagNameCheck,st)},pa=oe({},["annotation-xml","color-profile","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","missing-glyph"]),Hh=function(w){return!pa[es(w)]&&Ze(Jt,w)},Fp=function(w,O,st,rt){if(N&&typeof h=="object"&&typeof h.getAttributeType=="function"&&!st)switch(h.getAttributeType(w,O)){case"TrustedHTML":return k(rt);case"TrustedScriptURL":return j(rt)}return rt},kp=function(w,O,st,rt){try{return st?w.setAttributeNS(st,O,rt):w.setAttribute(O,rt),Nn(w)?(S(w),!1):!0}catch{return G(O,w),!1}},Vh=function(w,O){return ve&&Ze(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,O)?!0:es(w)==="attributename"&&pu(O,"href")!==null},Cl=function(w,O){if(Ne(ct.beforeSanitizeAttributes,w,null),de(w,O))return;let st=w.attributes;if(!st||Nn(w))return;Bt=mn(ct.uponSanitizeAttribute,Bt,pn,y);let rt={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Bt,forceKeepAttr:void 0},Ut=st.length,zt=Se(w.nodeName);for(;Ut--;){let ee=st[Ut],Be=ee.name,ni=ee.namespaceURI,ln=ee.value,gn=Se(Be),Ss=ln,_n=Be==="value"?Ss:tg(Ss),Wh=!1;if(rt.attrName=gn,rt.attrValue=_n,rt.keepAttr=!0,rt.forceKeepAttr=void 0,Ne(ct.uponSanitizeAttribute,w,rt),_n=rt.attrValue,Q&&(gn==="id"||gn==="name")&&mu(_n,nt)!==0&&(G(Be,w,ee),_n=nt+_n,Wh=!0),Vh(Be,_n)){G(Be,w,ee);continue}if(!rt.forceKeepAttr){if(!rt.keepAttr){G(Be,w,ee);continue}if(!_e&&Ze(wu,_n)){G(Be,w,ee);continue}if(mt&&(_n=Rt(_n)),!Un(zt,gn,_n)){G(Be,w,ee);continue}_n=Fp(zt,gn,ni,_n),_n!==Ss&&kp(w,Be,ni,_n)&&Wh&&fu(t.removed)}}Ne(ct.afterSanitizeAttributes,w,null),de(w,O)},hr=function(w){let O=null,st=De(w);for(Ne(ct.beforeSanitizeShadowDOM,w,null);O=st.nextNode();)if(Ne(ct.uponSanitizeShadowNode,O,null),Ie(O,w),Cl(O,w),be(O.content)&&hr(O.content),_(O)===Ue.element){let rt=v(O);be(rt)&&(Il(rt),hr(rt))}mt&&ae(w),Ne(ct.afterSanitizeShadowDOM,w,null)},Il=function(w){let O=[{node:w,shadow:null}];for(;O.length>0;){let st=O.pop();if(st.shadow){hr(st.shadow);continue}let rt=st.node,Ut=_(rt)===Ue.element,zt=m(rt);if(zt)for(let ee=zt.length-1;ee>=0;--ee)O.push({node:zt[ee],shadow:null});if(Ut){let ee=T?T(rt):null;if(typeof ee=="string"&&Se(ee)==="template"){let Be=rt.content;be(Be)&&O.push({node:Be,shadow:null})}}if(Ut){let ee=v(rt);be(ee)&&O.push({node:null,shadow:ee},{node:ee,shadow:null})}}};return t.sanitize=function(at){let w=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},O=null,st=null,rt=null,Ut=null;if(Ce=!at,Ce&&(at="<!-->"),typeof at!="string"&&!ei(at)&&(at=sg(at),typeof at!="string"))throw Si("dirty is not a string, aborting");if(!t.isSupported)return at;kt?(qt=R,Bt=y):or(w),(ct.uponSanitizeElement.length>0||ct.uponSanitizeAttribute.length>0)&&(qt=Mn(qt)),ct.uponSanitizeAttribute.length>0&&(Bt=Mn(Bt)),t.removed=[];let zt=C&&typeof at!="string"&&ei(at),ee=[],Be=tt;if(zt){xe(at);let gn=M(at);if(typeof gn=="string"){let Ss=Se(gn);if(!qt[Ss]||Xe[Ss])throw q(at),Si("root node is forbidden and cannot be sanitized in-place")}if(Nn(at))throw q(at),Si("root node is clobbered and cannot be sanitized in-place");ee=vt(at),tt=Vl()}else if(ei(at))O=ue("<!---->"),st=O.ownerDocument.importNode(at,!0),st.nodeType===Ue.element&&st.nodeName==="BODY"||st.nodeName==="HTML"?O=st:O.appendChild(st),Il(O);else{if(!lt&&!mt&&!Dt&&at.indexOf("<")===-1)return N&&pt?k(at):at;if(O=ue(at),!O)return lt?null:pt?B:""}O&&H&&S(O.firstChild);let ni=zt?at:O;try{zt&&Il(at);let gn=De(ni);for(;rt=gn.nextNode();)Ie(rt,ni),Cl(rt,ni),be(rt.content)&&hr(rt.content);zt&&jt(at,ee)}catch(gn){throw zt&&(q(at),Pt(at,ee)),gn}finally{tt=Be}if(zt){if(Pt(at,ee))throw Si("a node selected for removal could not be safely returned; refusing to sanitize in place");return mt&&Fe(at),at}if(lt){if(mt&&Fe(O),it)for(Ut=At.call(O.ownerDocument);O.firstChild;)Ut.appendChild(O.firstChild);else Ut=O;return(Bt.shadowroot||Bt.shadowrootmode)&&(Ut=ht.call(i,Ut,!0)),Ut}let ln=Dt?O.outerHTML:O.innerHTML;return Dt&&qt["!doctype"]&&O.ownerDocument&&O.ownerDocument.doctype&&O.ownerDocument.doctype.name&&Ze(gg,O.ownerDocument.doctype.name)&&(ln="<!DOCTYPE "+O.ownerDocument.doctype.name+`>
`+ln),mt&&(ln=Rt(ln)),N&&pt?k(ln):ln},t.setConfig=function(){let at=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};or(at),kt=!0,R=qt,y=Bt},t.clearConfig=function(){_i=null,kt=!1,R=null,y=null,N=Z,B=""},t.isValidAttribute=function(at,w,O){_i||or({});let st=Se(at),rt=Se(w);return typeof O=="string"&&(Vh(w,O)||!_e&&Ze(wu,O))?!1:Un(st,rt,O)},t.addHook=function(at,w){typeof w=="function"&&xn(ct,at)&&gr(ct[at],w)},t.removeHook=function(at,w){if(xn(ct,at)){if(w!==void 0){let O=Jm(ct[at],w);return O===-1?void 0:Qm(ct[at],O,1)[0]}return fu(ct[at])}},t.removeHooks=function(at){xn(ct,at)&&(ct[at]=[])},t.removeAllHooks=function(){ct=Tu()},t}var Lu=Pu();var li={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},$i={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},id=0,Ac=1,sd=2;var Xr=1,rd=2,Zs=3,Zi=0,un=1,ci=2,hs=0,Ks=1,Ec=2,Rc=3,Cc=4,ad=5;var us=100,od=101,ld=102,cd=103,hd=104,ud=200,dd=201,fd=202,pd=203,Ic=204,Pc=205,md=206,gd=207,_d=208,xd=209,yd=210,vd=211,Sd=212,bd=213,Md=214,qa=0,Ya=1,$a=2,Gs=3,Za=4,Ka=5,Ja=6,ja=7,Lc=0,wd=1,Td=2,hi=0,Dc=1,Nc=2,Uc=3,Oc=4,Fc=5,kc=6,Bc=7;var zc=300,ds=301,Js=302,To=303,Ao=304,Qa=1e3,ri=1001,to=1002,$e=1003,Ad=1004;var qr=1005;var hn=1006,Eo=1007;var Ii=1008;var Ln=1009,Gc=1010,Hc=1011,js=1012,Ro=1013,Zn=1014,Kn=1015,Jn=1016,Co=1017,Io=1018,fs=1020,Vc=35902,Wc=35899,Xc=1021,qc=1022,jn=1023,Ri=1026,Pi=1027,Yc=1028,Po=1029,Ki=1030,Lo=1031;var Do=1033,Yr=33776,$r=33777,Zr=33778,Kr=33779,No=35840,Uo=35841,Oo=35842,Fo=35843,ko=36196,Bo=37492,zo=37496,Go=37488,Ho=37489,Jr=37490,Vo=37491,Wo=37808,Xo=37809,qo=37810,Yo=37811,$o=37812,Zo=37813,Ko=37814,Jo=37815,jo=37816,Qo=37817,tl=37818,el=37819,nl=37820,il=37821,sl=36492,rl=36494,al=36495,ol=36283,ll=36284,jr=36285,cl=36286;var Er=2300,eo=2301,Wa=2302,yc=2303,vc=2400,Sc=2401,bc=2402;var Ed=3200;var $c=0,Rd=1,Li="",An="srgb",Rr="srgb-linear",Cr="linear",pe="srgb";var Xa=7680;var Cd=519,Id=512,Pd=513,Ld=514,Zc=515,Dd=516,Nd=517,Kc=518,Jc=519,Ud=35044;var jc="300 es",kn=2e3,Ir=2001;function bg(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Mg(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Pr(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Od(){let n=Pr("canvas");return n.style.display="block",n}var Du={},Hs=null;function Qc(...n){let t="THREE."+n.shift();Hs?Hs("log",t,...n):console.log(t,...n)}function Fd(n){let t=n[0];if(typeof t=="string"&&t.startsWith("TSL:")){let e=n[1];e&&e.isStackTrace?n[0]+=" "+e.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ft(...n){n=Fd(n);let t="THREE."+n.shift();if(Hs)Hs("warn",t,...n);else{let e=n[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...n)}}function Gt(...n){n=Fd(n);let t="THREE."+n.shift();if(Hs)Hs("error",t,...n);else{let e=n[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...n)}}function wr(...n){let t=n.join(" ");t in Du||(Du[t]=!0,Ft(...n))}function kd(n,t,e){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(t,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:i()}}setTimeout(r,e)})}var Bd={[qa]:qa,[$a]:Ja,[Za]:Za,[Gs]:Ka,[Ya]:Ya,[Ja]:$a,[ja]:ja,[Ka]:Gs},Yn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){let i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){let i=this._listeners;if(i===void 0)return;let s=i[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){let e=this._listeners;if(e===void 0)return;let i=e[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Nu=1234567,Tr=Math.PI/180,Vs=180/Math.PI;function Qs(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(tn[n&255]+tn[n>>8&255]+tn[n>>16&255]+tn[n>>24&255]+"-"+tn[t&255]+tn[t>>8&255]+"-"+tn[t>>16&15|64]+tn[t>>24&255]+"-"+tn[e&63|128]+tn[e>>8&255]+"-"+tn[e>>16&255]+tn[e>>24&255]+tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]).toLowerCase()}function ne(n,t,e){return Math.max(t,Math.min(e,n))}function th(n,t){return(n%t+t)%t}function wg(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function Tg(n,t,e){return n!==t?(e-n)/(t-n):0}function Ar(n,t,e){return(1-e)*n+e*t}function Ag(n,t,e,i){return Ar(n,t,1-Math.exp(-e*i))}function Eg(n,t=1){return t-Math.abs(th(n,t*2)-t)}function Rg(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Cg(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function Ig(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Pg(n,t){return n+Math.random()*(t-n)}function Lg(n){return n*(.5-Math.random())}function Dg(n){n!==void 0&&(Nu=n);let t=Nu+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ng(n){return n*Tr}function Ug(n){return n*Vs}function Og(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function Fg(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function eh(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function kg(n,t,e,i,s){let r=Math.cos,a=Math.sin,o=r(e/2),l=a(e/2),c=r((t+i)/2),h=a((t+i)/2),u=r((t-i)/2),d=a((t-i)/2),p=r((i-t)/2),g=a((i-t)/2);switch(s){case"XYX":n.set(o*h,l*u,l*d,o*c);break;case"YZY":n.set(l*d,o*h,l*u,o*c);break;case"ZXZ":n.set(l*u,l*d,o*h,o*c);break;case"XZX":n.set(o*h,l*g,l*p,o*c);break;case"YXY":n.set(l*p,o*h,l*g,o*c);break;case"ZYZ":n.set(l*g,l*p,o*h,o*c);break;default:Ft("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function nh(n){switch(n.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function zd(n,t){if(t.constructor===Float32Array)return n;let e=nh(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(n/e,-1)}function Gd(n,t){if(t.constructor===Float32Array)return n;let e=nh(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(n*e)}var ih={DEG2RAD:Tr,RAD2DEG:Vs,generateUUID:Qs,clamp:ne,euclideanModulo:th,mapLinear:wg,inverseLerp:Tg,lerp:Ar,damp:Ag,pingpong:Eg,smoothstep:Rg,smootherstep:Cg,randInt:Ig,randFloat:Pg,randFloatSpread:Lg,seededRandom:Dg,degToRad:Ng,radToDeg:Ug,isPowerOfTwo:Og,ceilPowerOfTwo:Fg,floorPowerOfTwo:eh,setQuaternionFromProperEuler:kg,normalize:Gd,denormalize:zd},Yt=class{static{this.prototype.isVector2=!0}constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Rn=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,a,o){let l=i[s+0],c=i[s+1],h=i[s+2],u=i[s+3],d=r[a+0],p=r[a+1],g=r[a+2],x=r[a+3];if(u!==x||l!==d||c!==p||h!==g){let m=l*d+c*p+h*g+u*x;m<0&&(d=-d,p=-p,g=-g,x=-x,m=-m);let f=1-o;if(m<.9995){let v=Math.acos(m),A=Math.sin(v);f=Math.sin(f*v)/A,o=Math.sin(o*v)/A,l=l*f+d*o,c=c*f+p*o,h=h*f+g*o,u=u*f+x*o}else{l=l*f+d*o,c=c*f+p*o,h=h*f+g*o,u=u*f+x*o;let v=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=v,c*=v,h*=v,u*=v}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],h=i[s+3],u=r[a],d=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*u+l*p-c*d,t[e+1]=l*g+h*d+c*u-o*p,t[e+2]=c*g+h*p+o*d-l*u,t[e+3]=h*g-o*u-l*d-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(s/2),u=o(r/2),d=l(i/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:Ft("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+o+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(i>o&&i>u){let p=2*Math.sqrt(1+i-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>u){let p=2*Math.sqrt(1+o-i-u);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-i-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ne(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-i*c,this._z=r*h+a*c+i*l-s*o,this._w=a*h-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(t,e){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){let c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+i*e,this._y=this._y*l+s*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},X=class{static{this.prototype.isVector3=!0}constructor(t=0,e=0,i=0){this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Uu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Uu.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*s-o*i),h=2*(o*e-r*s),u=2*(r*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return tc.copy(this).projectOnVector(t),this.sub(tc)}reflect(t){return this.sub(tc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(ne(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},tc=new X,Uu=new Rn,Wt=class{static{this.prototype.isMatrix3=!0}constructor(t,e,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c)}set(t,e,i,s,r,a,o,l,c){let h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],p=i[5],g=i[8],x=s[0],m=s[3],f=s[6],v=s[1],A=s[4],b=s[7],T=s[2],E=s[5],_=s[8];return r[0]=a*x+o*v+l*T,r[3]=a*m+o*A+l*E,r[6]=a*f+o*b+l*_,r[1]=c*x+h*v+u*T,r[4]=c*m+h*A+u*E,r[7]=c*f+h*b+u*_,r[2]=d*x+p*v+g*T,r[5]=d*m+p*A+g*E,r[8]=d*f+p*b+g*_,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*r*h+i*o*l+s*r*c-s*a*l}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*r,p=c*r-a*l,g=e*u+i*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return t[0]=u*x,t[1]=(s*c-h*i)*x,t[2]=(o*i-s*a)*x,t[3]=d*x,t[4]=(h*e-s*l)*x,t[5]=(s*r-o*e)*x,t[6]=p*x,t[7]=(i*l-c*e)*x,t[8]=(a*e-i*r)*x,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-s*c,s*l,-s*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return wr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(ec.makeScale(t,e)),this}rotate(t){return wr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(ec.makeRotation(-t)),this}translate(t,e){return wr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(ec.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},ec=new Wt,Ou=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Fu=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Bg(){let n={enabled:!0,workingColorSpace:Rr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===pe&&(s.r=Ei(s.r),s.g=Ei(s.g),s.b=Ei(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===pe&&(s.r=zs(s.r),s.g=zs(s.g),s.b=zs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Li?Cr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Rr]:{primaries:t,whitePoint:i,transfer:Cr,toXYZ:Ou,fromXYZ:Fu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:An},outputColorSpaceConfig:{drawingBufferColorSpace:An}},[An]:{primaries:t,whitePoint:i,transfer:pe,toXYZ:Ou,fromXYZ:Fu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:An}}}),n}var re=Bg();function Ei(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function zs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Es,no=class{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Es===void 0&&(Es=Pr("canvas")),Es.width=t.width,Es.height=t.height;let s=Es.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Es}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Pr("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ei(r[a]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ei(e[i]/255)*255):e[i]=Ei(e[i]);return{data:e,width:t.width,height:t.height}}else return Ft("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},zg=0,Ws=class{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:zg++}),this.uuid=Qs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){let e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(nc(s[a].image)):r.push(nc(s[a]))}else r=nc(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function nc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?no.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ft("Texture: Unable to serialize Texture."),{})}var Gg=0,ic=new X,yn=class n extends Yn{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=ri,s=ri,r=hn,a=Ii,o=jn,l=Ln,c=n.DEFAULT_ANISOTROPY,h=Li){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gg++}),this.uuid=Qs(),this.name="",this.source=new Ws(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Yt(0,0),this.repeat=new Yt(1,1),this.center=new Yt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(ic).x}get height(){return this.source.getSize(ic).y}get depth(){return this.source.getSize(ic).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(let e in t){let i=t[e];if(i===void 0){Ft(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Ft(`Texture.setValues(): property '${e}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==zc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Qa:t.x=t.x-Math.floor(t.x);break;case ri:t.x=t.x<0?0:1;break;case to:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Qa:t.y=t.y-Math.floor(t.y);break;case ri:t.y=t.y<0?0:1;break;case to:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};yn.DEFAULT_IMAGE=null;yn.DEFAULT_MAPPING=zc;yn.DEFAULT_ANISOTROPY=1;var Ee=class{static{this.prototype.isVector4=!0}constructor(t=0,e=0,i=0,s=1){this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],x=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let A=(c+1)/2,b=(p+1)/2,T=(f+1)/2,E=(h+d)/4,_=(u+x)/4,M=(g+m)/4;return A>b&&A>T?A<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(A),s=E/i,r=_/i):b>T?b<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),i=E/s,r=M/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=_/r,s=M/r),this.set(i,s,r,e),this}let v=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(u-x)/v,this.z=(d-h)/v,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=ne(this.x,t.x,e.x),this.y=ne(this.y,t.y,e.y),this.z=ne(this.z,t.z,e.z),this.w=ne(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=ne(this.x,t,e),this.y=ne(this.y,t,e),this.z=ne(this.z,t,e),this.w=ne(this.w,t,e),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ne(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},io=class extends Yn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new Ee(0,0,t,e),this.scissorTest=!1,this.viewport=new Ee(0,0,t,e),this.textures=[];let s=i.count;for(let r=0;r<s;r++)this.textures[r]=new yn({width:t,height:e,depth:i.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){let e={minFilter:hn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;let s=Object.assign({},t.textures[e].image);this.textures[e].source=new Ws(s)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){let e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Cn=class extends io{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},Lr=class extends yn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var so=class extends yn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}};var Ae=class n{static{this.prototype.isMatrix4=!0}constructor(t,e,i,s,r,a,o,l,c,h,u,d,p,g,x,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,a,o,l,c,h,u,d,p,g,x,m)}set(t,e,i,s,r,a,o,l,c,h,u,d,p,g,x,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=x,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();let e=this.elements,i=t.elements,s=1/Rs.setFromMatrixColumn(t,0).length(),r=1/Rs.setFromMatrixColumn(t,1).length(),a=1/Rs.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=a*h,p=a*u,g=o*h,x=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=p+g*c,e[5]=d-x*c,e[9]=-o*l,e[2]=x-d*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){let d=l*h,p=l*u,g=c*h,x=c*u;e[0]=d+x*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=x+d*o,e[10]=a*l}else if(t.order==="ZXY"){let d=l*h,p=l*u,g=c*h,x=c*u;e[0]=d-x*o,e[4]=-a*u,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=x-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){let d=a*h,p=a*u,g=o*h,x=o*u;e[0]=l*h,e[4]=g*c-p,e[8]=d*c+x,e[1]=l*u,e[5]=x*c+d,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){let d=a*l,p=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=x-d*u,e[8]=g*u+p,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*u+g,e[10]=d-x*u}else if(t.order==="XZY"){let d=a*l,p=a*c,g=o*l,x=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+x,e[5]=a*h,e[9]=p*u-g,e[2]=g*u-p,e[6]=o*h,e[10]=x*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Hg,t,Vg)}lookAt(t,e,i){let s=this.elements;return wn.subVectors(t,e),wn.lengthSq()===0&&(wn.z=1),wn.normalize(),Oi.crossVectors(i,wn),Oi.lengthSq()===0&&(Math.abs(i.z)===1?wn.x+=1e-4:wn.z+=1e-4,wn.normalize(),Oi.crossVectors(i,wn)),Oi.normalize(),ba.crossVectors(wn,Oi),s[0]=Oi.x,s[4]=ba.x,s[8]=wn.x,s[1]=Oi.y,s[5]=ba.y,s[9]=wn.y,s[2]=Oi.z,s[6]=ba.z,s[10]=wn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],p=i[13],g=i[2],x=i[6],m=i[10],f=i[14],v=i[3],A=i[7],b=i[11],T=i[15],E=s[0],_=s[4],M=s[8],z=s[12],P=s[1],N=s[5],B=s[9],Z=s[13],I=s[2],Y=s[6],et=s[10],k=s[14],j=s[3],D=s[7],$=s[11],W=s[15];return r[0]=a*E+o*P+l*I+c*j,r[4]=a*_+o*N+l*Y+c*D,r[8]=a*M+o*B+l*et+c*$,r[12]=a*z+o*Z+l*k+c*W,r[1]=h*E+u*P+d*I+p*j,r[5]=h*_+u*N+d*Y+p*D,r[9]=h*M+u*B+d*et+p*$,r[13]=h*z+u*Z+d*k+p*W,r[2]=g*E+x*P+m*I+f*j,r[6]=g*_+x*N+m*Y+f*D,r[10]=g*M+x*B+m*et+f*$,r[14]=g*z+x*Z+m*k+f*W,r[3]=v*E+A*P+b*I+T*j,r[7]=v*_+A*N+b*Y+T*D,r[11]=v*M+A*B+b*et+T*$,r[15]=v*z+A*Z+b*k+T*W,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],p=t[14],g=t[3],x=t[7],m=t[11],f=t[15],v=l*p-c*d,A=o*p-c*u,b=o*d-l*u,T=a*p-c*h,E=a*d-l*h,_=a*u-o*h;return e*(x*v-m*A+f*b)-i*(g*v-m*T+f*E)+s*(g*A-x*T+f*_)-r*(g*b-x*E+m*_)}determinantAffine(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-i*(r*h-o*l)+s*(r*c-a*l)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],p=t[11],g=t[12],x=t[13],m=t[14],f=t[15],v=e*o-i*a,A=e*l-s*a,b=e*c-r*a,T=i*l-s*o,E=i*c-r*o,_=s*c-r*l,M=h*x-u*g,z=h*m-d*g,P=h*f-p*g,N=u*m-d*x,B=u*f-p*x,Z=d*f-p*m,I=v*Z-A*B+b*N+T*P-E*z+_*M;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let Y=1/I;return t[0]=(o*Z-l*B+c*N)*Y,t[1]=(s*B-i*Z-r*N)*Y,t[2]=(x*_-m*E+f*T)*Y,t[3]=(d*E-u*_-p*T)*Y,t[4]=(l*P-a*Z-c*z)*Y,t[5]=(e*Z-s*P+r*z)*Y,t[6]=(m*b-g*_-f*A)*Y,t[7]=(h*_-d*b+p*A)*Y,t[8]=(a*B-o*P+c*M)*Y,t[9]=(i*P-e*B-r*M)*Y,t[10]=(g*E-x*b+f*v)*Y,t[11]=(u*b-h*E-p*v)*Y,t[12]=(o*z-a*N-l*M)*Y,t[13]=(e*N-i*z+s*M)*Y,t[14]=(x*A-g*T-m*v)*Y,t[15]=(h*T-u*A+d*v)*Y,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+i,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,u=o+o,d=r*c,p=r*h,g=r*u,x=a*h,m=a*u,f=o*u,v=l*c,A=l*h,b=l*u,T=i.x,E=i.y,_=i.z;return s[0]=(1-(x+f))*T,s[1]=(p+b)*T,s[2]=(g-A)*T,s[3]=0,s[4]=(p-b)*E,s[5]=(1-(d+f))*E,s[6]=(m+v)*E,s[7]=0,s[8]=(g+A)*_,s[9]=(m-v)*_,s[10]=(1-(d+x))*_,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),e.identity(),this;let a=Rs.set(s[0],s[1],s[2]).length(),o=Rs.set(s[4],s[5],s[6]).length(),l=Rs.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Wn.copy(this);let c=1/a,h=1/o,u=1/l;return Wn.elements[0]*=c,Wn.elements[1]*=c,Wn.elements[2]*=c,Wn.elements[4]*=h,Wn.elements[5]*=h,Wn.elements[6]*=h,Wn.elements[8]*=u,Wn.elements[9]*=u,Wn.elements[10]*=u,e.setFromRotationMatrix(Wn),i.x=a,i.y=o,i.z=l,this}makePerspective(t,e,i,s,r,a,o=kn,l=!1){let c=this.elements,h=2*r/(e-t),u=2*r/(i-s),d=(e+t)/(e-t),p=(i+s)/(i-s),g,x;if(l)g=r/(a-r),x=a*r/(a-r);else if(o===kn)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Ir)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,a,o=kn,l=!1){let c=this.elements,h=2/(e-t),u=2/(i-s),d=-(e+t)/(e-t),p=-(i+s)/(i-s),g,x;if(l)g=1/(a-r),x=a/(a-r);else if(o===kn)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===Ir)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Rs=new X,Wn=new Ae,Hg=new X(0,0,0),Vg=new X(1,1,1),Oi=new X,ba=new X,wn=new X,ku=new Ae,Bu=new Rn,Hi=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(ne(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ne(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(ne(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ne(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ne(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ne(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ft("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return ku.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ku,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Bu.setFromEuler(this),this.setFromQuaternion(Bu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Hi.DEFAULT_ORDER="XYZ";var Dr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},Wg=0,zu=new X,Cs=new Rn,bi=new Ae,Ma=new X,vr=new X,Xg=new X,qg=new Rn,Gu=new X(1,0,0),Hu=new X(0,1,0),Vu=new X(0,0,1),Wu={type:"added"},Yg={type:"removed"},Is={type:"childadded",child:null},sc={type:"childremoved",child:null},In=class n extends Yn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wg++}),this.uuid=Qs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new X,e=new Hi,i=new Rn,s=new X(1,1,1);function r(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ae},normalMatrix:{value:new Wt}}),this.matrix=new Ae,this.matrixWorld=new Ae,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Dr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Cs.setFromAxisAngle(t,e),this.quaternion.multiply(Cs),this}rotateOnWorldAxis(t,e){return Cs.setFromAxisAngle(t,e),this.quaternion.premultiply(Cs),this}rotateX(t){return this.rotateOnAxis(Gu,t)}rotateY(t){return this.rotateOnAxis(Hu,t)}rotateZ(t){return this.rotateOnAxis(Vu,t)}translateOnAxis(t,e){return zu.copy(t).applyQuaternion(this.quaternion),this.position.add(zu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Gu,t)}translateY(t){return this.translateOnAxis(Hu,t)}translateZ(t){return this.translateOnAxis(Vu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(bi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ma.copy(t):Ma.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?bi.lookAt(vr,Ma,this.up):bi.lookAt(Ma,vr,this.up),this.quaternion.setFromRotationMatrix(bi),s&&(bi.extractRotation(s.matrixWorld),Cs.setFromRotationMatrix(bi),this.quaternion.premultiply(Cs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(Gt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Wu),Is.child=t,this.dispatchEvent(Is),Is.child=null):Gt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Yg),sc.child=t,this.dispatchEvent(sc),sc.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),bi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),bi.multiply(t.parent.matrixWorld)),t.applyMatrix4(bi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Wu),Is.child=t,this.dispatchEvent(Is),Is.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,t,Xg),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,qg,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let t=this.pivot;if(t!==null){let e=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*i-r[8]*s,r[13]+=i-r[1]*e-r[5]*i-r[9]*s,r[14]+=s-r[2]*e-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e,i=!1){let s=this.parent;if(t===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),e===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(t.animations,l))}}if(e){let o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};In.DEFAULT_UP=new X(0,1,0);In.DEFAULT_MATRIX_AUTO_UPDATE=!0;In.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var as=class extends In{constructor(){super(),this.isGroup=!0,this.type="Group"}},$g={type:"move"},Xs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new as,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new as,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new as,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(let x of t.hand.values()){let m=e.getJointPose(x,i),f=this._getHandJoint(c,x);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.quaternion,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($g)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new as;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Hd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fi={h:0,s:0,l:0},wa={h:0,s:0,l:0};function rc(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var ie=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=An){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.colorSpaceToWorking(this,e),this}setRGB(t,e,i,s=re.workingColorSpace){return this.r=t,this.g=e,this.b=i,re.colorSpaceToWorking(this,s),this}setHSL(t,e,i,s=re.workingColorSpace){if(t=th(t,1),e=ne(e,0,1),i=ne(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,a=2*i-r;this.r=rc(a,r,t+1/3),this.g=rc(a,r,t),this.b=rc(a,r,t-1/3)}return re.colorSpaceToWorking(this,s),this}setStyle(t,e=An){function i(r){r!==void 0&&parseFloat(r)<1&&Ft("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ft("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ft("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=An){let i=Hd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):Ft("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ei(t.r),this.g=Ei(t.g),this.b=Ei(t.b),this}copyLinearToSRGB(t){return this.r=zs(t.r),this.g=zs(t.g),this.b=zs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=An){return re.workingToColorSpace(en.copy(this),t),Math.round(ne(en.r*255,0,255))*65536+Math.round(ne(en.g*255,0,255))*256+Math.round(ne(en.b*255,0,255))}getHexString(t=An){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.workingToColorSpace(en.copy(this),e);let i=en.r,s=en.g,r=en.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-i)/u+2;break;case r:l=(i-s)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=re.workingColorSpace){return re.workingToColorSpace(en.copy(this),e),t.r=en.r,t.g=en.g,t.b=en.b,t}getStyle(t=An){re.workingToColorSpace(en.copy(this),t);let e=en.r,i=en.g,s=en.b;return t!==An?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Fi),this.setHSL(Fi.h+t,Fi.s+e,Fi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Fi),t.getHSL(wa);let i=Ar(Fi.h,wa.h,e),s=Ar(Fi.s,wa.s,e),r=Ar(Fi.l,wa.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},en=new ie;ie.NAMES=Hd;var Nr=class extends In{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Hi,this.environmentIntensity=1,this.environmentRotation=new Hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}},Xn=new X,Mi=new X,ac=new X,wi=new X,Ps=new X,Ls=new X,Xu=new X,oc=new X,lc=new X,cc=new X,hc=new Ee,uc=new Ee,dc=new Ee,Gi=class n{constructor(t=new X,e=new X,i=new X){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Xn.subVectors(t,e),s.cross(Xn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Xn.subVectors(s,e),Mi.subVectors(i,e),ac.subVectors(t,e);let a=Xn.dot(Xn),o=Xn.dot(Mi),l=Xn.dot(ac),c=Mi.dot(Mi),h=Mi.dot(ac),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-p-g,g,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,wi)===null?!1:wi.x>=0&&wi.y>=0&&wi.x+wi.y<=1}static getInterpolation(t,e,i,s,r,a,o,l){return this.getBarycoord(t,e,i,s,wi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,wi.x),l.addScaledVector(a,wi.y),l.addScaledVector(o,wi.z),l)}static getInterpolatedAttribute(t,e,i,s,r,a){return hc.setScalar(0),uc.setScalar(0),dc.setScalar(0),hc.fromBufferAttribute(t,e),uc.fromBufferAttribute(t,i),dc.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(hc,r.x),a.addScaledVector(uc,r.y),a.addScaledVector(dc,r.z),a}static isFrontFacing(t,e,i,s){return Xn.subVectors(i,e),Mi.subVectors(t,e),Xn.cross(Mi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Xn.subVectors(this.c,this.b),Mi.subVectors(this.a,this.b),Xn.cross(Mi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,a,o;Ps.subVectors(s,i),Ls.subVectors(r,i),oc.subVectors(t,i);let l=Ps.dot(oc),c=Ls.dot(oc);if(l<=0&&c<=0)return e.copy(i);lc.subVectors(t,s);let h=Ps.dot(lc),u=Ls.dot(lc);if(h>=0&&u<=h)return e.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(i).addScaledVector(Ps,a);cc.subVectors(t,r);let p=Ps.dot(cc),g=Ls.dot(cc);if(g>=0&&p<=g)return e.copy(r);let x=p*c-l*g;if(x<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(i).addScaledVector(Ls,o);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return Xu.subVectors(r,s),o=(u-h)/(u-h+(p-g)),e.copy(s).addScaledVector(Xu,o);let f=1/(m+x+d);return a=x*f,o=d*f,e.copy(i).addScaledVector(Ps,a).addScaledVector(Ls,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Vi=class{constructor(t=new X(1/0,1/0,1/0),e=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(qn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(qn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=qn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,qn):qn.fromBufferAttribute(r,a),qn.applyMatrix4(t.matrixWorld),this.expandByPoint(qn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ta.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ta.copy(i.boundingBox)),Ta.applyMatrix4(t.matrixWorld),this.union(Ta)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,qn),qn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Sr),Aa.subVectors(this.max,Sr),Ds.subVectors(t.a,Sr),Ns.subVectors(t.b,Sr),Us.subVectors(t.c,Sr),ki.subVectors(Ns,Ds),Bi.subVectors(Us,Ns),ns.subVectors(Ds,Us);let e=[0,-ki.z,ki.y,0,-Bi.z,Bi.y,0,-ns.z,ns.y,ki.z,0,-ki.x,Bi.z,0,-Bi.x,ns.z,0,-ns.x,-ki.y,ki.x,0,-Bi.y,Bi.x,0,-ns.y,ns.x,0];return!fc(e,Ds,Ns,Us,Aa)||(e=[1,0,0,0,1,0,0,0,1],!fc(e,Ds,Ns,Us,Aa))?!1:(Ea.crossVectors(ki,Bi),e=[Ea.x,Ea.y,Ea.z],fc(e,Ds,Ns,Us,Aa))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,qn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(qn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ti[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ti[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ti[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ti[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ti[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ti[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ti[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ti[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ti),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}},Ti=[new X,new X,new X,new X,new X,new X,new X,new X],qn=new X,Ta=new Vi,Ds=new X,Ns=new X,Us=new X,ki=new X,Bi=new X,ns=new X,Sr=new X,Aa=new X,Ea=new X,is=new X;function fc(n,t,e,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){is.fromArray(n,r);let o=s.x*Math.abs(is.x)+s.y*Math.abs(is.y)+s.z*Math.abs(is.z),l=t.dot(is),c=e.dot(is),h=i.dot(is);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var Oe=new X,Ra=new Yt,Zg=0,ai=class extends Yn{constructor(t,e,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Zg++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ud,this.updateRanges=[],this.gpuType=Kn,this.version=0,this._normalizationScale=t!==void 0?nh(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ra.fromBufferAttribute(this,e),Ra.applyMatrix3(t),this.setXY(e,Ra.x,Ra.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix3(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=this._denormalize(i)),i}setComponent(t,e,i){return this.normalized&&(i=this._normalize(i)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),s=this._normalize(s)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),i=this._normalize(i),s=this._normalize(s),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){let e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):zd(t,this.array)}_normalize(t){let e=this._normalizationScale;return e!==void 0?Math.round(t*e):Gd(t,this.array)}};var Ur=class extends ai{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Or=class extends ai{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Je=class extends ai{constructor(t,e,i){super(new Float32Array(t),e,i)}},Kg=new Vi,br=new X,pc=new X,os=class{constructor(t=new X,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Kg.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;br.subVectors(t,this.center);let e=br.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(br,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(pc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(br.copy(t.center).add(pc)),this.expandByPoint(br.copy(t.center).sub(pc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}},Jg=0,Fn=new Ae,mc=new In,Os=new X,Tn=new Vi,Mr=new Vi,Ye=new X,$n=class n extends Yn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Jg++}),this.uuid=Qs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(bg(t)?Or:Ur)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Wt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Fn.makeRotationFromQuaternion(t),this.applyMatrix4(Fn),this}rotateX(t){return Fn.makeRotationX(t),this.applyMatrix4(Fn),this}rotateY(t){return Fn.makeRotationY(t),this.applyMatrix4(Fn),this}rotateZ(t){return Fn.makeRotationZ(t),this.applyMatrix4(Fn),this}translate(t,e,i){return Fn.makeTranslation(t,e,i),this.applyMatrix4(Fn),this}scale(t,e,i){return Fn.makeScale(t,e,i),this.applyMatrix4(Fn),this}lookAt(t){return mc.lookAt(t),mc.updateMatrix(),this.applyMatrix4(mc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Os).negate(),this.translate(Os.x,Os.y,Os.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let i=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Je(i,3))}else{let i=Math.min(t.length,e.count);for(let s=0;s<i;s++){let r=t[s];e.setXYZ(s,r.x,r.y,r.z||0)}t.length>e.count&&Ft("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Gt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];Tn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Gt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new os);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Gt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(t){let i=this.boundingSphere.center;if(Tn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];Mr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ye.addVectors(Tn.min,Mr.min),Tn.expandByPoint(Ye),Ye.addVectors(Tn.max,Mr.max),Tn.expandByPoint(Ye)):(Tn.expandByPoint(Mr.min),Tn.expandByPoint(Mr.max))}Tn.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Ye.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ye));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Ye.fromBufferAttribute(o,c),l&&(Os.fromBufferAttribute(t,c),Ye.add(Os)),s=Math.max(s,i.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Gt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){Gt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=e.position,s=e.normal,r=e.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new ai(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[],c=new Uint8Array(i.count);for(let z=0;z<i.count;z++)o[z]=new X,l[z]=new X;let h=new X,u=new X,d=new X,p=new Yt,g=new Yt,x=new Yt,m=new X,f=new X;function v(z,P,N){c[z]=c[P]=c[N]=1,h.fromBufferAttribute(i,z),u.fromBufferAttribute(i,P),d.fromBufferAttribute(i,N),p.fromBufferAttribute(r,z),g.fromBufferAttribute(r,P),x.fromBufferAttribute(r,N),u.sub(h),d.sub(h),g.sub(p),x.sub(p);let B=1/(g.x*x.y-x.x*g.y);isFinite(B)&&(m.copy(u).multiplyScalar(x.y).addScaledVector(d,-g.y).multiplyScalar(B),f.copy(d).multiplyScalar(g.x).addScaledVector(u,-x.x).multiplyScalar(B),o[z].add(m),o[P].add(m),o[N].add(m),l[z].add(f),l[P].add(f),l[N].add(f))}let A=this.groups;A.length===0&&(A=[{start:0,count:t.count}]);for(let z=0,P=A.length;z<P;++z){let N=A[z],B=N.start,Z=N.count;for(let I=B,Y=B+Z;I<Y;I+=3)v(t.getX(I+0),t.getX(I+1),t.getX(I+2))}let b=new X,T=new X,E=new X,_=new X;function M(z){E.fromBufferAttribute(s,z),_.copy(E);let P=o[z];b.copy(P),b.sub(E.multiplyScalar(E.dot(P))).normalize(),T.crossVectors(_,P);let B=T.dot(l[z])<0?-1:1;a.setXYZW(z,b.x,b.y,b.z,B)}for(let z=0,P=i.count;z<P;++z)c[z]&&M(z);this._transformed=!0}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==e.count)i=new ai(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);let s=new X,r=new X,a=new X,o=new X,l=new X,c=new X,h=new X,u=new X;if(t)for(let d=0,p=t.count;d<p;d+=3){let g=t.getX(d+0),x=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,x),a.fromBufferAttribute(e,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ye.fromBufferAttribute(t,e),Ye.normalize(),t.setXYZ(e,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),p=0,g=0;for(let x=0,m=l.length;x<m;x++){o.isInterleavedBufferAttribute?p=l[x]*o.data.stride+o.offset:p=l[x]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new ai(d,h,u)}if(this.index===null)return Ft("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=t(l,i);e.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],p=t(d,i);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){let t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let l in i){let c=i[l];t.data.attributes[l]=c.toJSON(t.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(t.data))}h.length>0&&(s[l]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone());let s=t.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(e))}let r=t.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}};var gc=new X,jg=new X,Qg=new Wt,En=class{constructor(t=new X(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=gc.subVectors(i,e).cross(jg.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,i=!0){let s=t.delta(gc),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let a=-(t.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(s,a)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Qg.getNormalMatrix(t),s=this.coplanarPoint(gc).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}},t_=0,Wi=class extends Yn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:t_++}),this.uuid=Qs(),this.name="",this.type="Material",this.blending=Ks,this.side=Zi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ic,this.blendDst=Pc,this.blendEquation=us,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ie(0,0,0),this.blendAlpha=0,this.depthFunc=Gs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Cd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Xa,this.stencilZFail=Xa,this.stencilZPass=Xa,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){Ft(`Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){Ft(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(i.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(i.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new ie().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(i=>new En().fromJSON(i))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Yt().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Yt().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};var Ai=new X,_c=new X,Ca=new X,Ia=new X,ls=class{constructor(t=new X,e=new X(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Ai)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Ai.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Ai.copy(this.origin).addScaledVector(this.direction,e),Ai.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){_c.copy(t).add(e).multiplyScalar(.5),Ca.copy(e).sub(t).normalize(),Ia.copy(this.origin).sub(_c);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Ca),o=Ia.dot(this.direction),l=-Ia.dot(Ca),c=Ia.lengthSq(),h=Math.abs(1-a*a),u,d,p,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(_c).addScaledVector(Ca,d),p}intersectSphere(t,e){if(t.radius<0)return null;Ai.subVectors(t.center,this.origin);let i=Ai.dot(this.direction),s=Ai.dot(Ai)-i*i,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,s=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,s=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Ai)!==null}intersectTriangle(t,e,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,u=t.x-a.x,d=t.y-a.y,p=t.z-a.z,g=e.x-a.x,x=e.y-a.y,m=e.z-a.z,f=i.x-a.x,v=i.y-a.y,A=i.z-a.z,b=Math.abs(l),T=Math.abs(c),E=Math.abs(h),_,M,z,P,N,B,Z,I,Y,et,k,j;if(b>=T&&b>=E?(z=l,B=u,Y=g,j=f,l>=0?(_=c,M=h,P=d,N=p,Z=x,I=m,et=v,k=A):(_=h,M=c,P=p,N=d,Z=m,I=x,et=A,k=v)):T>=E?(z=c,B=d,Y=x,j=v,c>=0?(_=h,M=l,P=p,N=u,Z=m,I=g,et=A,k=f):(_=l,M=h,P=u,N=p,Z=g,I=m,et=f,k=A)):(z=h,B=p,Y=m,j=A,h>=0?(_=l,M=c,P=u,N=d,Z=g,I=x,et=f,k=v):(_=c,M=l,P=d,N=u,Z=x,I=g,et=v,k=f)),z===0)return null;let D=_/z,$=M/z,W=1/z,ot=P-D*B,At=N-$*B,K=Z-D*Y,ht=I-$*Y,ct=et-D*j,Ct=k-$*j,Mt=ct*ht-Ct*K,Xt=ot*Ct-At*ct,Re=K*At-ht*ot;if(s){if(Mt<0||Xt<0||Re<0)return null}else if((Mt<0||Xt<0||Re<0)&&(Mt>0||Xt>0||Re>0))return null;let Ot=Mt+Xt+Re;if(Ot===0)return null;let le=W*(Mt*B+Xt*Y+Re*j);return(Ot>0?le<0:le>0)?null:this.at(le/Ot,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ro=class extends Wi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Hi,this.combine=Lc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}},qu=new Ae,ss=new ls,Pa=new os,Yu=new X,La=new X,Da=new X,Na=new X,xc=new X,Ua=new X,$u=new X,Oa=new X,oi=class extends In{constructor(t=new $n,e=new ro){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){Ua.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(xc.fromBufferAttribute(u,t),a?Ua.addScaledVector(xc,h):Ua.addScaledVector(xc.sub(e),h))}e.add(Ua)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Pa.copy(i.boundingSphere),Pa.applyMatrix4(r),ss.copy(t.ray).recast(t.near),!(Pa.containsPoint(ss.origin)===!1&&(ss.intersectSphere(Pa,Yu)===null||ss.origin.distanceToSquared(Yu)>(t.far-t.near)**2))&&(qu.copy(r).invert(),ss.copy(t.ray).applyMatrix4(qu),!(i.boundingBox!==null&&ss.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ss)))}_computeIntersections(t,e,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){let m=d[g],f=a[m.materialIndex],v=Math.max(m.start,p.start),A=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let b=v,T=A;b<T;b+=3){let E=o.getX(b),_=o.getX(b+1),M=o.getX(b+2);s=Fa(this,f,t,i,c,h,u,E,_,M),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(o.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let v=o.getX(m),A=o.getX(m+1),b=o.getX(m+2);s=Fa(this,a,t,i,c,h,u,v,A,b),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,x=d.length;g<x;g++){let m=d[g],f=a[m.materialIndex],v=Math.max(m.start,p.start),A=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let b=v,T=A;b<T;b+=3){let E=b,_=b+1,M=b+2;s=Fa(this,f,t,i,c,h,u,E,_,M),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,f=x;m<f;m+=3){let v=m,A=m+1,b=m+2;s=Fa(this,a,t,i,c,h,u,v,A,b),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function e_(n,t,e,i,s,r,a,o){let l;if(t.side===un?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,t.side===Zi,o),l===null)return null;Oa.copy(o),Oa.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(Oa);return c<e.near||c>e.far?null:{distance:c,point:Oa.clone(),object:n}}function Fa(n,t,e,i,s,r,a,o,l,c){n.getVertexPosition(o,La),n.getVertexPosition(l,Da),n.getVertexPosition(c,Na);let h=e_(n,t,e,i,La,Da,Na,$u);if(h){let u=new X;Gi.getBarycoord($u,La,Da,Na,u),s&&(h.uv=Gi.getInterpolatedAttribute(s,o,l,c,u,new Yt)),r&&(h.uv1=Gi.getInterpolatedAttribute(r,o,l,c,u,new Yt)),a&&(h.normal=Gi.getInterpolatedAttribute(a,o,l,c,u,new X),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new X,materialIndex:0};Gi.getNormal(La,Da,Na,d.normal),h.face=d,h.barycoord=u}return h}var ao=class extends yn{constructor(t=null,e=1,i=1,s,r,a,o,l,c=$e,h=$e,u,d){super(null,a,o,l,c,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var rs=new os,n_=new Yt(.5,.5),ka=new X,cs=class{constructor(t=new En,e=new En,i=new En,s=new En,r=new En,a=new En){this.planes=[t,e,i,s,r,a]}set(t,e,i,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=kn,i=!1){let s=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],u=r[5],d=r[6],p=r[7],g=r[8],x=r[9],m=r[10],f=r[11],v=r[12],A=r[13],b=r[14],T=r[15];if(s[0].setComponents(c-a,p-h,f-g,T-v).normalize(),s[1].setComponents(c+a,p+h,f+g,T+v).normalize(),s[2].setComponents(c+o,p+u,f+x,T+A).normalize(),s[3].setComponents(c-o,p-u,f-x,T-A).normalize(),i)s[4].setComponents(l,d,m,b).normalize(),s[5].setComponents(c-l,p-d,f-m,T-b).normalize();else if(s[4].setComponents(c-l,p-d,f-m,T-b).normalize(),e===kn)s[5].setComponents(c+l,p+d,f+m,T+b).normalize();else if(e===Ir)s[5].setComponents(l,d,m,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),rs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),rs.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(rs)}intersectsSprite(t){rs.center.set(0,0,0);let e=n_.distanceTo(t.center);return rs.radius=.7071067811865476+e,rs.applyMatrix4(t.matrixWorld),this.intersectsSphere(rs)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(ka.x=s.normal.x>0?t.max.x:t.min.x,ka.y=s.normal.y>0?t.max.y:t.min.y,ka.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(ka)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Zu=new Ae,oo=class n{constructor(){this.coordinateSystem=kn,this._frustums=[],this._count=0}setFromArrayCamera(t){let e=t.cameras,i=this._frustums;for(let s=0;s<e.length;s++){let r=e[s];Zu.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),i[s]===void 0&&(i[s]=new cs),i[s].setFromProjectionMatrix(Zu,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsObject(t))return!0;return!1}intersectsSprite(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSprite(t))return!0;return!1}intersectsSphere(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsSphere(t))return!0;return!1}intersectsBox(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].intersectsBox(t))return!0;return!1}containsPoint(t){let e=this._frustums;for(let i=0;i<this._count;i++)if(e[i].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;let e=this._frustums,i=t._frustums;for(let s=0;s<t._count;s++)e[s]===void 0&&(e[s]=new cs),e[s].copy(i[s]);return this._count=t._count,this}clone(){return new n().copy(this)}};var lo=class extends Wi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}},Ku=new Ae,Mc=new ls,Ba=new os,za=new X,Fr=class extends In{constructor(t=new $n,e=new lo){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ba.copy(i.boundingSphere),Ba.applyMatrix4(s),Ba.radius+=r,t.ray.intersectsSphere(Ba)===!1)return;Ku.copy(s).invert(),Mc.copy(t.ray).applyMatrix4(Ku);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){let d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=d,x=p;g<x;g++){let m=c.getX(g);za.fromBufferAttribute(u,m),Ju(za,m,l,s,t,e,this)}}else{let d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=d,x=p;g<x;g++)za.fromBufferAttribute(u,g),Ju(za,g,l,s,t,e,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Ju(n,t,e,i,s,r,a){let o=Mc.distanceSqToPoint(n);if(o<e){let l=new X;Mc.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}var kr=class extends yn{constructor(t=[],e=ds,i,s,r,a,o,l,c,h){super(t,e,i,s,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}};var Ci=class extends yn{constructor(t,e,i=Zn,s,r,a,o=$e,l=$e,c,h=Ri,u=1){if(h!==Ri&&h!==Pi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:t,height:e,depth:u};super(d,s,r,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ws(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}},Br=class extends Ci{constructor(t,e=Zn,i=ds,s,r,a=$e,o=$e,l,c=Ri){let h={width:t,height:t,depth:1},u=[h,h,h,h,h,h];super(t,t,e,i,s,r,a,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}},zr=class extends yn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}},qs=class n extends $n{constructor(t=1,e=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,i,e,t,a,r,0),g("z","y","x",1,-1,i,e,-t,a,r,1),g("x","z","y",1,1,t,i,e,s,a,2),g("x","z","y",1,-1,t,i,-e,s,a,3),g("x","y","z",1,-1,t,e,i,s,r,4),g("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Je(c,3)),this.setAttribute("normal",new Je(h,3)),this.setAttribute("uv",new Je(u,2));function g(x,m,f,v,A,b,T,E,_,M,z){let P=b/_,N=T/M,B=b/2,Z=T/2,I=E/2,Y=_+1,et=M+1,k=0,j=0,D=new X;for(let $=0;$<et;$++){let W=$*N-Z;for(let ot=0;ot<Y;ot++){let At=ot*P-B;D[x]=At*v,D[m]=W*A,D[f]=I,c.push(D.x,D.y,D.z),D[x]=0,D[m]=0,D[f]=E>0?1:-1,h.push(D.x,D.y,D.z),u.push(ot/_),u.push(1-$/M),k+=1}}for(let $=0;$<M;$++)for(let W=0;W<_;W++){let ot=d+W+Y*$,At=d+W+Y*($+1),K=d+(W+1)+Y*($+1),ht=d+(W+1)+Y*$;l.push(ot,At,ht),l.push(At,K,ht),j+=6}o.addGroup(p,j,z),p+=j,d+=k}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};var Gr=class n extends $n{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(i),l=Math.floor(s),c=o+1,h=l+1,u=t/o,d=e/l,p=[],g=[],x=[],m=[];for(let f=0;f<h;f++){let v=f*d-a;for(let A=0;A<c;A++){let b=A*u-r;g.push(b,-v,0),x.push(0,0,1),m.push(A/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let v=0;v<o;v++){let A=v+c*f,b=v+c*(f+1),T=v+1+c*(f+1),E=v+1+c*f;p.push(A,b,E),p.push(b,T,E)}this.setIndex(p),this.setAttribute("position",new Je(g,3)),this.setAttribute("normal",new Je(x,3)),this.setAttribute("uv",new Je(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}};function ps(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];if(ju(s))s.isRenderTargetTexture?(Ft("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone();else if(Array.isArray(s))if(ju(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();t[e][i]=r}else t[e][i]=s.slice();else t[e][i]=s}}return t}function nn(n){let t={};for(let e=0;e<n.length;e++){let i=ps(n[e]);for(let s in i)t[s]=i[s]}return t}function ju(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function i_(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function sh(n){let t=n.getRenderTarget();return t===null?n.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}var Vd={clone:ps,merge:nn},s_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,r_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Bn=class extends Wi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=s_,this.fragmentShader=r_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ps(t.uniforms),this.uniformsGroups=i_(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(let i in t.uniforms){let s=t.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=e[s.value]||null;break;case"c":this.uniforms[i].value=new ie().setHex(s.value);break;case"v2":this.uniforms[i].value=new Yt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new X().fromArray(s.value);break;case"v4":this.uniforms[i].value=new Ee().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Wt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Ae().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(let i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}},co=class extends Bn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ho=class extends Wi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ed,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},uo=class extends Wi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}};function Fs(n,t){return!n||n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function Ga(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Xi=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=e[++i],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=e[--i-1],t>=r)break t}a=i,i=0;break e}break n}for(;i<a;){let o=i+a>>>1;t<e[o]?a=o:i=o+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=i[r+a];return e}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},fo=class extends Xi{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vc,endingEnd:vc}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Sc:r=t,o=2*e-i;break;case bc:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Sc:a=t,l=2*i-e;break;case bc:a=1,l=i+s[1]-s[0];break;default:a=t-1,l=e}let c=(i-e)*.5,h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(l-i),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(i-e)/(s-e),x=g*g,m=x*g,f=-d*m+2*d*x-d*g,v=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,A=(-1-p)*m+(1.5+p)*x+.5*g,b=p*m-p*x;for(let T=0;T!==o;++T)r[T]=f*a[h+T]+v*a[c+T]+A*a[l+T]+b*a[u+T];return r}},po=class extends Xi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=(i-e)/(s-e),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},mo=class extends Xi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},go=class extends Xi{interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=t*o,c=l-o,h=this.inTangents,u=this.outTangents;if(!h||!u){let g=(i-e)/(s-e),x=1-g;for(let m=0;m!==o;++m)r[m]=a[c+m]*x+a[l+m]*g;return r}let d=o*2,p=t-1;for(let g=0;g!==o;++g){let x=a[c+g],m=a[l+g],f=p*d+g*2,v=u[f],A=u[f+1],b=t*d+g*2,T=h[b],E=h[b+1],_=o_(i,e,v,T,s);r[g]=Wd(_,x,A,E,m)}return r}};function Wd(n,t,e,i,s){let r=1-n;return r*r*r*t+3*r*r*n*e+3*r*n*n*i+n*n*n*s}function a_(n,t,e,i,s){let r=1-n;return 3*r*r*(e-t)+6*r*n*(i-e)+3*n*n*(s-i)}function o_(n,t,e,i,s){let r=(n-t)/(s-t);for(let a=0;a<8;a++){let o=Wd(r,t,e,i,s)-n;if(Math.abs(o)<1e-10)break;let l=a_(r,t,e,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Pn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=Fs(e,this.TimeBufferType),this.values=Fs(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:Fs(t.times,Array),values:Fs(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s),Ga(t.settings)&&(i.settings={inTangents:Fs(t.settings.inTangents,Array),outTangents:Fs(t.settings.outTangents,Array)})}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new mo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new po(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new fo(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodBezier(t){let e=new go(this.times,this.values,this.getValueSize(),t);return this.settings&&(e.inTangents=this.settings.inTangents,e.outTangents=this.settings.outTangents),e}setInterpolation(t){let e;switch(t){case Er:e=this.InterpolantFactoryMethodDiscrete;break;case eo:e=this.InterpolantFactoryMethodLinear;break;case Wa:e=this.InterpolantFactoryMethodSmooth;break;case yc:e=this.InterpolantFactoryMethodBezier;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ft("KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Er;case this.InterpolantFactoryMethodLinear:return eo;case this.InterpolantFactoryMethodSmooth:return Wa;case this.InterpolantFactoryMethodBezier:return yc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t;Ga(this.settings)&&(Qu(this.settings.inTangents,t),Qu(this.settings.outTangents,t))}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t;Ga(this.settings)&&(td(this.settings.inTangents,t),td(this.settings.outTangents,t))}return this}trim(t,e){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<t;)++r;for(;a!==-1&&i[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(Gt("KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Gt("KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Gt("KeyframeTrack: Time is not a valid number.",this,o,l),t=!1;break}if(a!==null&&a>l){Gt("KeyframeTrack: Out of order keys.",this,o,l,a),t=!1;break}a=l}if(s!==void 0&&Mg(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Gt("KeyframeTrack: Value is not a valid number.",this,o,c),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Wa,r=t.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=t[o],h=t[o+1];if(c!==h&&(o!==1||c!==t[0]))if(s)l=!0;else{let u=o*i,d=u-i,p=u+i;for(let g=0;g!==i;++g){let x=e[u+g];if(x!==e[d+g]||x!==e[p+g]){l=!0;break}}}if(l){if(o!==a){t[a]=t[o];let u=o*i,d=a*i;for(let p=0;p!==i;++p)e[d+p]=e[u+p]}++a}}if(r>0){t[a]=t[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)e[l+c]=e[o+c];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,Ga(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Qu(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]+=t}function td(n,t){for(let e=0,i=n.length;e!==i;e+=2)n[e]*=t}Pn.prototype.ValueTypeName="";Pn.prototype.TimeBufferType=Float32Array;Pn.prototype.ValueBufferType=Float32Array;Pn.prototype.DefaultInterpolation=eo;var qi=class extends Pn{constructor(t,e,i){super(t,e,i)}};qi.prototype.ValueTypeName="bool";qi.prototype.ValueBufferType=Array;qi.prototype.DefaultInterpolation=Er;qi.prototype.InterpolantFactoryMethodLinear=void 0;qi.prototype.InterpolantFactoryMethodSmooth=void 0;var _o=class extends Pn{constructor(t,e,i,s){super(t,e,i,s)}};_o.prototype.ValueTypeName="color";var xo=class extends Pn{constructor(t,e,i,s){super(t,e,i,s)}};xo.prototype.ValueTypeName="number";var yo=class extends Xi{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-e)/(s-e),c=t*o;for(let h=c+o;c!==h;c+=4)Rn.slerpFlat(r,0,a,c-o,a,c,l);return r}},Hr=class extends Pn{constructor(t,e,i,s){super(t,e,i,s)}InterpolantFactoryMethodLinear(t){return new yo(this.times,this.values,this.getValueSize(),t)}};Hr.prototype.ValueTypeName="quaternion";Hr.prototype.InterpolantFactoryMethodSmooth=void 0;var Yi=class extends Pn{constructor(t,e,i){super(t,e,i)}};Yi.prototype.ValueTypeName="string";Yi.prototype.ValueBufferType=Array;Yi.prototype.DefaultInterpolation=Er;Yi.prototype.InterpolantFactoryMethodLinear=void 0;Yi.prototype.InterpolantFactoryMethodSmooth=void 0;var vo=class extends Pn{constructor(t,e,i,s){super(t,e,i,s)}};vo.prototype.ValueTypeName="vector";var So=class{constructor(t,e,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Xd=new So,bo=class{constructor(t){this.manager=t!==void 0?t:Xd,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},this.priority="auto",this.cache="default",typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}setPriority(t){return this.priority=t,this}setCache(t){return this.cache=t,this}abort(){return this}};bo.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ha=new X,Va=new Rn,si=new X,Vr=class extends In{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ae,this.projectionMatrix=new Ae,this.projectionMatrixInverse=new Ae,this.coordinateSystem=kn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Ha,Va,si),si.x===1&&si.y===1&&si.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ha,Va,si.set(1,1,1)).invert()}updateWorldMatrix(t,e,i=!1){super.updateWorldMatrix(t,e,i),this.matrixWorld.decompose(Ha,Va,si),si.x===1&&si.y===1&&si.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ha,Va,si.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},zi=new X,ed=new Yt,nd=new Yt,cn=class extends Vr{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Vs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Tr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Vs*2*Math.atan(Math.tan(Tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){zi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(zi.x,zi.y).multiplyScalar(-t/zi.z),zi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(zi.x,zi.y).multiplyScalar(-t/zi.z)}getViewSize(t,e){return this.getViewBounds(t,ed,nd),e.subVectors(nd,ed)}setViewOffset(t,e,i,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Tr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,e-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}};var Mo=class extends Vr{constructor(t=-1,e=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,a=i+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}};var ks=-90,Bs=1,Ys=class extends In{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new cn(ks,Bs,t,e);s.layers=this.layers,this.add(s);let r=new cn(ks,Bs,t,e);r.layers=this.layers,this.add(r);let a=new cn(ks,Bs,t,e);a.layers=this.layers,this.add(a);let o=new cn(ks,Bs,t,e);o.layers=this.layers,this.add(o);let l=new cn(ks,Bs,t,e);l.layers=this.layers,this.add(l);let c=new cn(ks,Bs,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,a,o,l]=e;for(let c of e)this.remove(c);if(t===kn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ir)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let x=i.texture.mipmapsAutoUpdate;i.texture.mipmapsAutoUpdate=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),i.texture.mipmapsAutoUpdate=x,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}},wo=class extends cn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}};var rh="\\[\\]\\.:\\/",l_=new RegExp("["+rh+"]","g"),ah="[^"+rh+"]",c_="[^"+rh.replace("\\.","")+"]",h_=/((?:WC+[\/:])*)/.source.replace("WC",ah),u_=/(WCOD+)?/.source.replace("WCOD",c_),d_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ah),f_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ah),p_=new RegExp("^"+h_+u_+d_+f_+"$"),m_=["material","materials","bones","map"],wc=class{constructor(t,e,i){let s=i||Me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Me=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(l_,"")}static parseTrackName(t){let e=p_.exec(t);if(e===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);m_.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let l=i(o.children);if(l)return l}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){Ft("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=e.objectIndex;switch(i){case"materials":if(!t.material){Gt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){Gt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){Gt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===c){c=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){Gt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){Gt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){Gt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(c!==void 0){if(t[c]===void 0){Gt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[c]}}let a=t[s];if(a===void 0){let c=e.nodeName;Gt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?o=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){Gt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){Gt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Me.Composite=wc;Me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Me.prototype.GetterByBindingType=[Me.prototype._getValue_direct,Me.prototype._getValue_array,Me.prototype._getValue_arrayElement,Me.prototype._getValue_toArray];Me.prototype.SetterByBindingTypeAndVersioning=[[Me.prototype._setValue_direct,Me.prototype._setValue_direct_setNeedsUpdate,Me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_array,Me.prototype._setValue_array_setNeedsUpdate,Me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_arrayElement,Me.prototype._setValue_arrayElement_setNeedsUpdate,Me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_fromArray,Me.prototype._setValue_fromArray_setNeedsUpdate,Me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var fb=new Float32Array(1);var $s=class{constructor(t=1,e=0,i=0){this.radius=t,this.phi=e,this.theta=i}set(t,e,i){return this.radius=t,this.phi=e,this.theta=i,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=ne(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,i){return this.radius=Math.sqrt(t*t+e*e+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,i),this.phi=Math.acos(ne(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Tc=class{static{this.prototype.isMatrix2=!0}constructor(t,e,i,s){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let i=0;i<4;i++)this.elements[i]=t[i+e];return this}set(t,e,i,s){let r=this.elements;return r[0]=t,r[2]=e,r[1]=i,r[3]=s,this}};var Wr=class extends Yn{constructor(t,e=null){super(),this.object=t,this.domElement=e,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(t){this.domElement!==null&&this.disconnect(),this.domElement=t}disconnect(){}dispose(){}update(){}};function oh(n,t,e,i){let s=g_(i);switch(e){case Xc:return n*t;case Yc:return n*t/s.components*s.byteLength;case Po:return n*t/s.components*s.byteLength;case Ki:return n*t*2/s.components*s.byteLength;case Lo:return n*t*2/s.components*s.byteLength;case qc:return n*t*3/s.components*s.byteLength;case jn:return n*t*4/s.components*s.byteLength;case Do:return n*t*4/s.components*s.byteLength;case Yr:case $r:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case Zr:case Kr:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Uo:case Fo:return Math.max(n,16)*Math.max(t,8)/4;case No:case Oo:return Math.max(n,8)*Math.max(t,8)/2;case ko:case Bo:case Go:case Ho:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*8;case zo:case Jr:case Vo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Wo:return Math.floor((n+3)/4)*Math.floor((t+3)/4)*16;case Xo:return Math.floor((n+4)/5)*Math.floor((t+3)/4)*16;case qo:return Math.floor((n+4)/5)*Math.floor((t+4)/5)*16;case Yo:return Math.floor((n+5)/6)*Math.floor((t+4)/5)*16;case $o:return Math.floor((n+5)/6)*Math.floor((t+5)/6)*16;case Zo:return Math.floor((n+7)/8)*Math.floor((t+4)/5)*16;case Ko:return Math.floor((n+7)/8)*Math.floor((t+5)/6)*16;case Jo:return Math.floor((n+7)/8)*Math.floor((t+7)/8)*16;case jo:return Math.floor((n+9)/10)*Math.floor((t+4)/5)*16;case Qo:return Math.floor((n+9)/10)*Math.floor((t+5)/6)*16;case tl:return Math.floor((n+9)/10)*Math.floor((t+7)/8)*16;case el:return Math.floor((n+9)/10)*Math.floor((t+9)/10)*16;case nl:return Math.floor((n+11)/12)*Math.floor((t+9)/10)*16;case il:return Math.floor((n+11)/12)*Math.floor((t+11)/12)*16;case sl:case rl:case al:return Math.ceil(n/4)*Math.ceil(t/4)*16;case ol:case ll:return Math.ceil(n/4)*Math.ceil(t/4)*8;case jr:case cl:return Math.ceil(n/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function g_(n){switch(n){case Ln:case Gc:return{byteLength:1,components:1};case js:case Hc:case Jn:return{byteLength:2,components:1};case Co:case Io:return{byteLength:2,components:4};case Zn:case Ro:case Kn:return{byteLength:4,components:1};case Vc:case Wc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"187"}}));typeof window<"u"&&(window.__THREE__?Ft("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="187");function pf(){let n=null,t=!1,e=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),e(r,a)}return{start:function(){t!==!0&&e!==null&&n!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function x_(n){let t=new WeakMap;function e(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,o),u.length===0)n.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){let g=u[d],x=u[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){let x=u[p];n.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=t.get(o);l&&(n.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var y_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,v_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,S_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,b_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,M_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,w_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,T_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT )
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN )
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,A_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,E_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,R_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,C_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,I_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,P_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,L_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,D_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,N_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,U_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,O_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,F_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,k_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,B_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,z_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,G_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,H_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,V_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,W_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,X_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,q_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Y_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$_="gl_FragColor = linearToOutputTexel( gl_FragColor );",Z_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,K_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,J_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,j_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Q_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,t0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,e0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,n0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,i0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,s0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,r0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,a0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,o0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,l0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,c0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,h0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,u0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,d0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,f0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,p0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,m0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,g0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN

		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );

		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );

		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );

		irradiance *= sheenEnergyComp;

	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,_0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,x0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,y0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,v0=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,S0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,b0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,M0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,w0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,T0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,A0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,E0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,R0=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,C0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,I0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,P0=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,L0=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,D0=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,N0=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,U0=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,O0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,F0=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,k0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,B0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,z0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,G0=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,H0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,V0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,W0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,X0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,q0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Y0=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER

		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {

	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,$0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Z0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,K0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,J0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,j0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Q0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,tx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif

				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ex=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,nx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ix=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,sx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ax=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ox=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,lx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ux=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,dx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,fx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,px=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,mx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,gx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,_x=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,xx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,yx=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sx=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Tx=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ax=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ex=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ix=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Px=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lx=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Dx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Nx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ux=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ox=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Fx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Bx=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hx=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Vx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN

		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;

	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Yx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,$x=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Kx=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Kt={alphahash_fragment:y_,alphahash_pars_fragment:v_,alphamap_fragment:S_,alphamap_pars_fragment:b_,alphatest_fragment:M_,alphatest_pars_fragment:w_,aomap_fragment:T_,aomap_pars_fragment:A_,batching_pars_vertex:E_,batching_vertex:R_,begin_vertex:C_,beginnormal_vertex:I_,bsdfs:P_,iridescence_fragment:L_,bumpmap_pars_fragment:D_,clipping_planes_fragment:N_,clipping_planes_pars_fragment:U_,clipping_planes_pars_vertex:O_,clipping_planes_vertex:F_,color_fragment:k_,color_pars_fragment:B_,color_pars_vertex:z_,color_vertex:G_,common:H_,defaultnormal_vertex:V_,displacementmap_pars_vertex:W_,displacementmap_vertex:X_,emissivemap_fragment:q_,emissivemap_pars_fragment:Y_,colorspace_fragment:$_,colorspace_pars_fragment:Z_,envmap_fragment:K_,envmap_common_pars_fragment:J_,envmap_pars_fragment:j_,envmap_pars_vertex:Q_,envmap_physical_pars_fragment:h0,envmap_vertex:t0,fog_vertex:e0,fog_pars_vertex:n0,fog_fragment:i0,fog_pars_fragment:s0,gradientmap_pars_fragment:r0,lightmap_pars_fragment:a0,lights_lambert_fragment:o0,lights_lambert_pars_fragment:l0,lights_pars_begin:c0,lights_toon_fragment:u0,lights_toon_pars_fragment:d0,lights_phong_fragment:f0,lights_phong_pars_fragment:p0,lights_physical_fragment:m0,lights_physical_pars_fragment:g0,lights_fragment_begin:_0,lights_fragment_maps:x0,lights_fragment_end:y0,lightprobes_pars_fragment:v0,logdepthbuf_fragment:S0,logdepthbuf_pars_fragment:b0,logdepthbuf_pars_vertex:M0,logdepthbuf_vertex:w0,map_fragment:T0,map_pars_fragment:A0,map_particle_fragment:E0,map_particle_pars_fragment:R0,metalnessmap_fragment:C0,metalnessmap_pars_fragment:I0,morphinstance_vertex:P0,morphcolor_vertex:L0,morphnormal_vertex:D0,morphtarget_pars_vertex:N0,morphtarget_vertex:U0,normal_fragment_begin:O0,normal_fragment_maps:F0,normal_pars_fragment:k0,normal_pars_vertex:B0,normal_vertex:z0,normalmap_pars_fragment:G0,clearcoat_normal_fragment_begin:H0,clearcoat_normal_fragment_maps:V0,clearcoat_pars_fragment:W0,iridescence_pars_fragment:X0,opaque_fragment:q0,packing:Y0,premultiplied_alpha_fragment:$0,project_vertex:Z0,dithering_fragment:K0,dithering_pars_fragment:J0,roughnessmap_fragment:j0,roughnessmap_pars_fragment:Q0,shadowmap_pars_fragment:tx,shadowmap_pars_vertex:ex,shadowmap_vertex:nx,shadowmask_pars_fragment:ix,skinbase_vertex:sx,skinning_pars_vertex:rx,skinning_vertex:ax,skinnormal_vertex:ox,specularmap_fragment:lx,specularmap_pars_fragment:cx,tonemapping_fragment:hx,tonemapping_pars_fragment:ux,transmission_fragment:dx,transmission_pars_fragment:fx,uv_pars_fragment:px,uv_pars_vertex:mx,uv_vertex:gx,worldpos_vertex:_x,background_vert:xx,background_frag:yx,backgroundCube_vert:vx,backgroundCube_frag:Sx,cube_vert:bx,cube_frag:Mx,depth_vert:wx,depth_frag:Tx,distance_vert:Ax,distance_frag:Ex,equirect_vert:Rx,equirect_frag:Cx,linedashed_vert:Ix,linedashed_frag:Px,meshbasic_vert:Lx,meshbasic_frag:Dx,meshlambert_vert:Nx,meshlambert_frag:Ux,meshmatcap_vert:Ox,meshmatcap_frag:Fx,meshnormal_vert:kx,meshnormal_frag:Bx,meshphong_vert:zx,meshphong_frag:Gx,meshphysical_vert:Hx,meshphysical_frag:Vx,meshtoon_vert:Wx,meshtoon_frag:Xx,points_vert:qx,points_frag:Yx,shadow_vert:$x,shadow_frag:Zx,sprite_vert:Kx,sprite_frag:Jx},Tt={common:{diffuse:{value:new ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new Yt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new ie(16777215)},opacity:{value:1},center:{value:new Yt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},di={basic:{uniforms:nn([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:nn([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new ie(0)},envMapIntensity:{value:1}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:nn([Tt.common,Tt.specularmap,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,Tt.lights,{emissive:{value:new ie(0)},specular:{value:new ie(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:nn([Tt.common,Tt.envmap,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.roughnessmap,Tt.metalnessmap,Tt.fog,Tt.lights,{emissive:{value:new ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:nn([Tt.common,Tt.aomap,Tt.lightmap,Tt.emissivemap,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.gradientmap,Tt.fog,Tt.lights,{emissive:{value:new ie(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:nn([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,Tt.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:nn([Tt.points,Tt.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:nn([Tt.common,Tt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:nn([Tt.common,Tt.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:nn([Tt.common,Tt.bumpmap,Tt.normalmap,Tt.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:nn([Tt.sprite,Tt.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distance:{uniforms:nn([Tt.common,Tt.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distance_vert,fragmentShader:Kt.distance_frag},shadow:{uniforms:nn([Tt.lights,Tt.fog,{color:{value:new ie(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};di.physical={uniforms:nn([di.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new Yt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Wt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new Yt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new ie(0)},specularColor:{value:new ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new Yt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};var hl={r:0,b:0,g:0},jx=new Ae,mf=new Wt;mf.set(-1,0,0,0,1,0,0,0,1);function Qx(n,t,e,i,s,r){let a=new ie(0),o=s===!0?0:1,l,c,h=null,u=0,d=null;function p(v){let A=v.isScene===!0?v.background:null;if(A&&A.isTexture){let b=v.backgroundBlurriness>0;A=t.get(A,b)}return A}function g(v){let A=!1,b=p(v);b===null?m(a,o):b&&b.isColor&&(m(b,1),A=!0);let T=n.xr.getEnvironmentBlendMode();T==="additive"?e.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(n.autoClear||A)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(v,A){let b=p(A);b&&b.isCubeTexture?(c===void 0&&(c=new oi(new qs(1,1,1),new Bn({name:"BackgroundCubeMaterial",uniforms:ps(di.backgroundCube.uniforms),vertexShader:di.backgroundCube.vertexShader,fragmentShader:di.backgroundCube.fragmentShader,side:un,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,E,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(jx.makeRotationFromEuler(A.backgroundRotation)).transpose(),b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(mf),c.material.toneMapped=re.getTransfer(b.colorSpace)!==pe,(h!==b||u!==b.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,h=b,u=b.version,d=n.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new oi(new Gr(2,2),new Bn({name:"BackgroundMaterial",uniforms:ps(di.background.uniforms),vertexShader:di.background.vertexShader,fragmentShader:di.background.fragmentShader,side:Zi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.toneMapped=re.getTransfer(b.colorSpace)!==pe,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(h!==b||u!==b.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,h=b,u=b.version,d=n.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,A){v.getRGB(hl,sh(n)),e.buffers.color.setClear(hl.r,hl.g,hl.b,A,r)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,A=1){a.set(v),o=A,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(a,o)},render:g,addToRenderList:x,dispose:f}}function ty(n,t){let e=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,a=!1;function o(N,B,Z,I,Y){let et=!1,k=u(N,I,Z,B);r!==k&&(r=k,c(r.object)),et=p(N,I,Z,Y),et&&g(N,I,Z,Y),Y!==null&&t.update(Y,n.ELEMENT_ARRAY_BUFFER),(et||a)&&(a=!1,b(N,B,Z,I),Y!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function l(){return n.createVertexArray()}function c(N){return n.bindVertexArray(N)}function h(N){return n.deleteVertexArray(N)}function u(N,B,Z,I){let Y=I.wireframe===!0,et=i[B.id];et===void 0&&(et={},i[B.id]=et);let k=N.isInstancedMesh===!0?N.id:0,j=et[k];j===void 0&&(j={},et[k]=j);let D=j[Z.id];D===void 0&&(D={},j[Z.id]=D);let $=D[Y];return $===void 0&&($=d(l()),D[Y]=$),$}function d(N){let B=[],Z=[],I=[];for(let Y=0;Y<e;Y++)B[Y]=0,Z[Y]=0,I[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:Z,attributeDivisors:I,object:N,attributes:{},index:null}}function p(N,B,Z,I){let Y=r.attributes,et=B.attributes,k=0,j=Z.getAttributes();for(let D in j)if(j[D].location>=0){let W=Y[D],ot=et[D];if(ot===void 0&&(D==="instanceMatrix"&&N.instanceMatrix&&(ot=N.instanceMatrix),D==="instanceColor"&&N.instanceColor&&(ot=N.instanceColor)),W===void 0||W.attribute!==ot||ot&&W.data!==ot.data)return!0;k++}return r.attributesNum!==k||r.index!==I}function g(N,B,Z,I){let Y={},et=B.attributes,k=0,j=Z.getAttributes();for(let D in j)if(j[D].location>=0){let W=et[D];W===void 0&&(D==="instanceMatrix"&&N.instanceMatrix&&(W=N.instanceMatrix),D==="instanceColor"&&N.instanceColor&&(W=N.instanceColor));let ot={};ot.attribute=W,W&&W.data&&(ot.data=W.data),Y[D]=ot,k++}r.attributes=Y,r.attributesNum=k,r.index=I}function x(){let N=r.newAttributes;for(let B=0,Z=N.length;B<Z;B++)N[B]=0}function m(N){f(N,0)}function f(N,B){let Z=r.newAttributes,I=r.enabledAttributes,Y=r.attributeDivisors;Z[N]=1,I[N]===0&&(n.enableVertexAttribArray(N),I[N]=1),Y[N]!==B&&(n.vertexAttribDivisor(N,B),Y[N]=B)}function v(){let N=r.newAttributes,B=r.enabledAttributes;for(let Z=0,I=B.length;Z<I;Z++)B[Z]!==N[Z]&&(n.disableVertexAttribArray(Z),B[Z]=0)}function A(N,B,Z,I,Y,et,k){k===!0?n.vertexAttribIPointer(N,B,Z,Y,et):n.vertexAttribPointer(N,B,Z,I,Y,et)}function b(N,B,Z,I){x();let Y=I.attributes,et=Z.getAttributes(),k=B.defaultAttributeValues;for(let j in et){let D=et[j];if(D.location>=0){let $=Y[j];if($===void 0&&(j==="instanceMatrix"&&N.instanceMatrix&&($=N.instanceMatrix),j==="instanceColor"&&N.instanceColor&&($=N.instanceColor)),$!==void 0){let W=$.normalized,ot=$.itemSize,At=t.get($);if(At===void 0)continue;let K=At.buffer,ht=At.type,ct=At.bytesPerElement,Ct=ht===n.INT||ht===n.UNSIGNED_INT||$.gpuType===Ro;if($.isInterleavedBufferAttribute){let Mt=$.data,Xt=Mt.isInterleavedBuffer===!0?Mt.stride:Mt.itemSize,Re=$.offset;if(Mt.isInstancedInterleavedBuffer||Mt.isInstancedBufferAttribute){for(let Ot=0;Ot<D.locationSize;Ot++)f(D.location+Ot,Mt.meshPerAttribute);N.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let Ot=0;Ot<D.locationSize;Ot++)m(D.location+Ot);n.bindBuffer(n.ARRAY_BUFFER,K);for(let Ot=0;Ot<D.locationSize;Ot++)A(D.location+Ot,ot/D.locationSize,ht,W,Xt*ct,(Re+ot/D.locationSize*Ot)*ct,Ct)}else{if($.isInstancedBufferAttribute){for(let Mt=0;Mt<D.locationSize;Mt++)f(D.location+Mt,$.meshPerAttribute);N.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let Mt=0;Mt<D.locationSize;Mt++)m(D.location+Mt);n.bindBuffer(n.ARRAY_BUFFER,K);for(let Mt=0;Mt<D.locationSize;Mt++)A(D.location+Mt,ot/D.locationSize,ht,W,ot*ct,ot/D.locationSize*Mt*ct,Ct)}}else if(k!==void 0){let W=k[j];if(W!==void 0)switch(W.length){case 2:n.vertexAttrib2fv(D.location,W);break;case 3:n.vertexAttrib3fv(D.location,W);break;case 4:n.vertexAttrib4fv(D.location,W);break;default:n.vertexAttrib1fv(D.location,W)}}}}v()}function T(){z();for(let N in i){let B=i[N];for(let Z in B){let I=B[Z];for(let Y in I){let et=I[Y];for(let k in et)h(et[k].object),delete et[k];delete I[Y]}}delete i[N]}}function E(N){if(i[N.id]===void 0)return;let B=i[N.id];for(let Z in B){let I=B[Z];for(let Y in I){let et=I[Y];for(let k in et)h(et[k].object),delete et[k];delete I[Y]}}delete i[N.id]}function _(N){for(let B in i){let Z=i[B];for(let I in Z){let Y=Z[I];if(Y[N.id]===void 0)continue;let et=Y[N.id];for(let k in et)h(et[k].object),delete et[k];delete Y[N.id]}}}function M(N){for(let B in i){let Z=i[B],I=N.isInstancedMesh===!0?N.id:0,Y=Z[I];if(Y!==void 0){for(let et in Y){let k=Y[et];for(let j in k)h(k[j].object),delete k[j];delete Y[et]}delete Z[I],Object.keys(Z).length===0&&delete i[B]}}}function z(){P(),a=!0,r!==s&&(r=s,c(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:z,resetDefaultState:P,dispose:T,releaseStatesOfGeometry:E,releaseStatesOfObject:M,releaseStatesOfProgram:_,initAttributes:x,enableAttribute:m,disableUnusedAttributes:v}}function ey(n,t,e){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),e.update(c,i,1)}function a(l,c,h){h!==0&&(n.drawArraysInstanced(i,l,c,h),e.update(c,i,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let d=0;for(let p=0;p<h;p++)d+=c[p];e.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function ny(n,t,e,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let _=t.get("EXT_texture_filter_anisotropic");s=n.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(_){return!(_!==jn&&i.convert(_)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(_){let M=_===Jn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(_!==Ln&&_!==Kn&&!M&&i.convert(_)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(_){if(_==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp",h=l(c);h!==c&&(Ft("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),d=e.logarithmicDepthBuffer===!0&&u===!1;e.reversedDepthBuffer===!0&&u===!1&&Ft("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&u===!0&&Ft("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");let p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),f=n.getParameter(n.MAX_VERTEX_ATTRIBS),v=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),A=n.getParameter(n.MAX_VARYING_VECTORS),b=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),E=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:v,maxVaryings:A,maxFragmentUniforms:b,maxSamples:T,samples:E}}function iy(n){let t=this,e=null,i=0,s=!1,r=!1,a=new En,o=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||i!==0||s;return s=d,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let v=r?0:i,A=v*4,b=f.clippingState||null;l.value=b,b=h(g,d,A,p);for(let T=0;T!==A;++T)b[T]=e[T];f.clippingState=b,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,p,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let f=p+x*4,v=d.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let A=0,b=p;A!==x;++A,b+=4)a.copy(u[A]).applyMatrix4(v,o),a.normal.toArray(m,b),m[b+3]=a.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}var ea=class extends Cn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new kr(s),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new qs(5,5,5),r=new Bn({name:"CubemapFromEquirect",uniforms:ps(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:un,blending:hs});r.uniforms.tEquirect.value=e;let a=new oi(s,r),o=e.minFilter;return e.minFilter===Ii&&(e.minFilter=hn),new Ys(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,s=!0){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,s);t.setRenderTarget(r)}},qd=256,sy=3,ry=20,gf=256,_f=16,ay=3,oy=new X,ly=new ie,dl=class n{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Ys(1,10,null),this._boxMesh=new oi(new qs(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,i=.1,s=100,r={}){let{size:a=256,position:o=oy}=r,l=this._renderer;this._setSize(a);let c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);let u=l.autoClear,d=l.autoClearColor,p=l.autoClearDepth,g=l.autoClearStencil,x=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,x===null&&(t.background=l.getClearColor(ly));let m=new Ys(i,s,h);return m.position.copy(o),m.update(l,t),l.autoClear=u,l.autoClearColor=d,l.autoClearDepth=p,l.autoClearStencil=g,t.background=x,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Zd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=$d(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(qd,eh(t))}_fromTexture(t,e){t.mapping===ds||t.mapping===Js?this._setSize(t.image.length===0?qd:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);let i=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(i),i}_allocateTarget(){let t=this._cubeSize,e=Yd(t,!1,!1),i=Math.log2(t)-sy;for(let s=0;s<=i;s++)e.texture.mipmaps.push({width:t>>s,height:t>>s});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){let e=this._cubeSize,i=this._sourceTarget;return(i===null||i.width!==e||t&&i.depthBuffer===!1)&&(i!==null&&i.dispose(),this._sourceTarget=Yd(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,i){let s=this._boxMesh,r=this._cubeCamera;s.material=i,r.renderTarget=t,r.activeMipmapLevel=e;let a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,s),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===ds||t.mapping===Js?(this._cubemapMaterial===null&&(this._cubemapMaterial=Zd()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=$d()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=cy(),this._integrationMaterial=hy());let e=this._cubeSize,i=t.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;let r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/_f);for(let a=0;a<=i;a++){let o=n.lodToRoughness(a,i);if(a>i-ay)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{let l=o>0?Math.log2(e)+.5*Math.log2(6/(gf*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=uy());let i=this._blurMaterial,s=i.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(t,0,i),s.envMap.value=t.texture,this._renderCube(r,0,i)}};function Yd(n,t,e){return new ea(n,{minFilter:Ii,generateMipmaps:t,type:Jn,colorSpace:Rr,depthBuffer:e})}function na(n,t,e){return new Bn({name:n,uniforms:t,vertexShader:Kt.cube_vert,fragmentShader:e,side:un,blending:hs,depthTest:!1,depthWrite:!1})}function cy(){return na("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${gf}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function hy(){return na("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:_f}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function uy(){return na("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${ry}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function $d(){return na("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Zd(){return na("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function dy(n){let t=new WeakMap,e=new WeakMap,i=null;function s(d,p=!1){return d==null?null:p?a(d):r(d)}function r(d){if(d&&d.isTexture){let p=d.mapping;if(p===To||p===Ao)if(t.has(d)){let g=t.get(d).texture;return o(g,d.mapping)}else{let g=d.image;if(g&&g.height>0){let x=new ea(g.height);return x.fromEquirectangularTexture(n,d),t.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){let p=d.mapping,g=p===To||p===Ao,x=p===ds||p===Js;if(g||x){let m=e.get(d),f=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==f)return i===null&&(i=new dl(n)),m=g?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),m.texture;if(m!==void 0)return m.texture;{let v=d.image;return g&&v&&v.height>0||x&&v&&l(v)?(i===null&&(i=new dl(n)),m=g?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,e.set(d,m),d.addEventListener("dispose",h),m.texture):null}}}return d}function o(d,p){return p===To?d.mapping=ds:p===Ao&&(d.mapping=Js),d}function l(d){let p=0,g=6;for(let x=0;x<g;x++)d[x]!==void 0&&p++;return p===g}function c(d){let p=d.target;p.removeEventListener("dispose",c);let g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function h(d){let p=d.target;p.removeEventListener("dispose",h);let g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(){t=new WeakMap,e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:u}}function fy(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s=n.getExtension(i);return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){let s=e(i);return s===null&&wr("WebGLRenderer: "+i+" extension not supported."),s}}}function py(n,t,e,i){let s={},r=new WeakMap,a=new FinalizationRegistry(g=>delete s[g]);function o(g){l(g.target)}function l(g){g.index!==null&&t.remove(g.index);for(let m in g.attributes)t.remove(g.attributes[m]);g.removeEventListener("dispose",o),delete s[g.id],a.unregister(g);let x=r.get(g);x&&(t.remove(x),r.delete(g)),i.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,e.memory.geometries--}function c(g,x){return s[x.id]!==void 0||(x.addEventListener("dispose",o),s[x.id]=new WeakRef(x),a.register(x,x.id,x),e.memory.geometries++),x}function h(g){let x=g.attributes;for(let m in x)t.update(x[m],n.ARRAY_BUFFER)}function u(g){let x=g.index,m=g.attributes.position,f=0;if(m===void 0)return;let v=x!==null?x.array.length:m.array.length/3-1,A=m.count>=65535?Or:Ur,b=new A(Math.ceil(v/3)*6,1),T=b.array;if(x!==null){let _=x.array;f=x.version;for(let M=0,z=0;M<v;M+=3){let P=_[M+0],N=_[M+1],B=_[M+2];T[z++]=P,T[z++]=N,T[z++]=N,T[z++]=B,T[z++]=B,T[z++]=P}}else{f=m.version;for(let _=0,M=0;_<v;_+=3){let z=_+0,P=_+1,N=_+2;T[M++]=z,T[M++]=P,T[M++]=P,T[M++]=N,T[M++]=N,T[M++]=z}}b.version=f;let E=r.get(g);E&&t.remove(E),r.set(g,b)}function d(g){let x=r.get(g);if(x){let m=g.index;m!==null&&x.version<m.version&&u(g)}else u(g);return r.get(g)}function p(){for(let g in s){let x=s[g].deref();x!==void 0&&l(x)}}return{get:c,update:h,getWireframeAttribute:d,dispose:p}}function my(n,t,e){let i;function s(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function l(u,d){n.drawElements(i,d,r,u*a),e.update(d,i,1)}function c(u,d,p){p!==0&&(n.drawElementsInstanced(i,d,r,u*a,p),e.update(d,i,p))}function h(u,d,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,u,0,p);let x=0;for(let m=0;m<p;m++)x+=d[m];e.update(x,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function gy(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(e.calls++,a){case n.TRIANGLES:e.triangles+=o*(r/3);break;case n.LINES:e.lines+=o*(r/2);break;case n.LINE_STRIP:e.lines+=o*(r-1);break;case n.LINE_LOOP:e.lines+=o*r;break;case n.POINTS:e.points+=o*r;break;default:Gt("WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function _y(n,t,e){let i=new WeakMap,s=new Ee;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(o);if(d===void 0||d.count!==u){let z=function(){_.dispose(),i.delete(o),o.removeEventListener("dispose",z)};d!==void 0&&d.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],v=o.morphAttributes.color||[],A=0;p===!0&&(A=1),g===!0&&(A=2),x===!0&&(A=3);let b=o.attributes.position.count*A,T=1;b>t.maxTextureSize&&(T=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let E=new Float32Array(b*T*4*u),_=new Lr(E,b,T,u);_.type=Kn,_.needsUpdate=!0;let M=A*4;for(let P=0;P<u;P++){let N=m[P],B=f[P],Z=v[P],I=b*T*4*P;for(let Y=0;Y<N.count;Y++){let et=Y*M;p===!0&&(s.fromBufferAttribute(N,Y),E[I+et+0]=s.x,E[I+et+1]=s.y,E[I+et+2]=s.z,E[I+et+3]=0),g===!0&&(s.fromBufferAttribute(B,Y),E[I+et+4]=s.x,E[I+et+5]=s.y,E[I+et+6]=s.z,E[I+et+7]=0),x===!0&&(s.fromBufferAttribute(Z,Y),E[I+et+8]=s.x,E[I+et+9]=s.y,E[I+et+10]=s.z,E[I+et+11]=Z.itemSize===4?s.w:1)}}d={count:u,texture:_,size:new Yt(b,T)},i.set(o,d),o.addEventListener("dispose",z)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,e);else{let p=0;for(let x=0;x<c.length;x++)p+=c[x];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function xy(n,t,e,i,s){let r=new WeakMap;function a(c){let h=s.render.frame,u=c.geometry,d=t.get(c,u);if(r.get(d)!==h&&(t.update(d),r.set(d,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){let p=c.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return d}function o(){r=new WeakMap}function l(c){let h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}var yy={[Dc]:"LINEAR_TONE_MAPPING",[Nc]:"REINHARD_TONE_MAPPING",[Uc]:"CINEON_TONE_MAPPING",[Oc]:"ACES_FILMIC_TONE_MAPPING",[kc]:"AGX_TONE_MAPPING",[Bc]:"NEUTRAL_TONE_MAPPING",[Fc]:"CUSTOM_TONE_MAPPING"};function vy(n,t,e,i,s,r){let a=new Cn(t,e,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=null,h=new $n;h.setAttribute("position",new Je([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Je([0,2,0,0,2,0],2));let u=new co({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new oi(h,u),p=new Mo(-1,1,1,-1,0,1),g=null,x=null,m=!1,f,v=null,A=[],b=!1;this.setSize=function(T,E){a.setSize(T,E),o!==null&&o.setSize(T,E),l!==null&&l.setSize(T,E);for(let _=0;_<A.length;_++){let M=A[_];M.setSize&&M.setSize(T,E)}},this.setEffects=function(T){A=T,b=A.length>0&&A[0].isRenderPass===!0;let E=a.width,_=a.height;A.length>0&&o===null&&(o=new Cn(E,_,{type:Jn,depthBuffer:!1,stencilBuffer:!1}),l=new Cn(E,_,{type:Jn,depthBuffer:!1,stencilBuffer:!1}));let M=s===!0&&A.some(z=>z.needsDepthTexture===!0);M!==(a.depthTexture!==null)&&(M===!0&&c===null&&(c=new Ci(E,_),r===!0&&(c.format=Pi,c.type=fs)),a.dispose(),a.depthTexture=M?c:null,a.resolveDepthBuffer=M,a.storeMultisampledDepthBuffer=M);for(let z=0;z<A.length;z++){let P=A[z];P.setSize&&P.setSize(E,_),M&&P.needsDepthTexture===!0&&P.setDepthTexture&&P.setDepthTexture(c)}},this.begin=function(T,E){if(m||T.toneMapping===hi&&A.length===0)return!1;if(v=E,E!==null){let _=E.width,M=E.height;(a.width!==_||a.height!==M)&&this.setSize(_,M)}return b===!1&&T.setRenderTarget(a),f=T.toneMapping,T.toneMapping=hi,!0},this.hasRenderPass=function(){return b},this.end=function(T,E){T.toneMapping=f,m=!0;let _=a,M=o;for(let z=0;z<A.length;z++){let P=A[z];P.enabled!==!1&&(P.render(T,M,_,E),P.needsSwap!==!1&&(_=M,M=M===o?l:o))}if(g!==T.outputColorSpace||x!==T.toneMapping){g=T.outputColorSpace,x=T.toneMapping,u.defines={},re.getTransfer(g)===pe&&(u.defines.SRGB_TRANSFER="");let z=yy[x];z&&(u.defines[z]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=_.texture,T.setRenderTarget(v),T.render(d,p),v=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),u.dispose()}}var xf=new yn,yf=new Ci(1,1),vf=new Br(1),Sf=new Lr,bf=new so,Mf=new kr,Kd=[],Jd=[],jd=new Float32Array(16),Qd=new Float32Array(9),tf=new Float32Array(4);function er(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Kd[s];if(r===void 0&&(r=new Float32Array(s),Kd[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,n[a].toArray(r,o)}return r}function Ge(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function He(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function pl(n,t){let e=Jd[t];e===void 0&&(e=new Int32Array(t),Jd[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Sy(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function by(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2fv(this.addr,t),He(e,t)}}function My(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ge(e,t))return;n.uniform3fv(this.addr,t),He(e,t)}}function wy(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4fv(this.addr,t),He(e,t)}}function Ty(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),He(e,t)}else{if(Ge(e,i))return;tf.set(i),n.uniformMatrix2fv(this.addr,!1,tf),He(e,i)}}function Ay(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),He(e,t)}else{if(Ge(e,i))return;Qd.set(i),n.uniformMatrix3fv(this.addr,!1,Qd),He(e,i)}}function Ey(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),He(e,t)}else{if(Ge(e,i))return;jd.set(i),n.uniformMatrix4fv(this.addr,!1,jd),He(e,i)}}function Ry(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function Cy(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2iv(this.addr,t),He(e,t)}}function Iy(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;n.uniform3iv(this.addr,t),He(e,t)}}function Py(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4iv(this.addr,t),He(e,t)}}function Ly(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function Dy(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2uiv(this.addr,t),He(e,t)}}function Ny(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;n.uniform3uiv(this.addr,t),He(e,t)}}function Uy(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4uiv(this.addr,t),He(e,t)}}function ml(n){return n.version===0&&(n.compareFunction=Jc,n.needsUpdate=!0),n}function Oy(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?r=ml(yf):r=xf,e.setTexture2D(t||r,s)}function Fy(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||bf,s)}function ky(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_CUBE_SHADOW?r=ml(vf):r=Mf,e.setTextureCube(t||r,s)}function By(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Sf,s)}function zy(n){switch(n){case 5126:return Sy;case 35664:return by;case 35665:return My;case 35666:return wy;case 35674:return Ty;case 35675:return Ay;case 35676:return Ey;case 5124:case 35670:return Ry;case 35667:case 35671:return Cy;case 35668:case 35672:return Iy;case 35669:case 35673:return Py;case 5125:return Ly;case 36294:return Dy;case 36295:return Ny;case 36296:return Uy;case 35678:case 36198:case 36298:case 36306:case 35682:return Oy;case 35679:case 36299:case 36307:return Fy;case 35680:case 36300:case 36308:case 36293:return ky;case 36289:case 36303:case 36311:case 36292:return By}}function Gy(n,t){n.uniform1fv(this.addr,t)}function Hy(n,t){let e=er(t,this.size,2);n.uniform2fv(this.addr,e)}function Vy(n,t){let e=er(t,this.size,3);n.uniform3fv(this.addr,e)}function Wy(n,t){let e=er(t,this.size,4);n.uniform4fv(this.addr,e)}function Xy(n,t){let e=er(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function qy(n,t){let e=er(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Yy(n,t){let e=er(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function $y(n,t){n.uniform1iv(this.addr,t)}function Zy(n,t){n.uniform2iv(this.addr,t)}function Ky(n,t){n.uniform3iv(this.addr,t)}function Jy(n,t){n.uniform4iv(this.addr,t)}function jy(n,t){n.uniform1uiv(this.addr,t)}function Qy(n,t){n.uniform2uiv(this.addr,t)}function tv(n,t){n.uniform3uiv(this.addr,t)}function ev(n,t){n.uniform4uiv(this.addr,t)}function nv(n,t,e){let i=this.cache,s=t.length,r=pl(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),He(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=ml(yf):a=xf;for(let o=0;o!==s;++o)e.setTexture2D(t[o]||a,r[o])}function iv(n,t,e){let i=this.cache,s=t.length,r=pl(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),He(i,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||bf,r[a])}function sv(n,t,e){let i=this.cache,s=t.length,r=pl(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),He(i,r));let a;this.type===n.SAMPLER_CUBE_SHADOW?a=ml(vf):a=Mf;for(let o=0;o!==s;++o)e.setTextureCube(t[o]||a,r[o])}function rv(n,t,e){let i=this.cache,s=t.length,r=pl(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),He(i,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||Sf,r[a])}function av(n){switch(n){case 5126:return Gy;case 35664:return Hy;case 35665:return Vy;case 35666:return Wy;case 35674:return Xy;case 35675:return qy;case 35676:return Yy;case 5124:case 35670:return $y;case 35667:case 35671:return Zy;case 35668:case 35672:return Ky;case 35669:case 35673:return Jy;case 5125:return jy;case 36294:return Qy;case 36295:return tv;case 36296:return ev;case 35678:case 36198:case 36298:case 36306:case 35682:return nv;case 35679:case 36299:case 36307:return iv;case 35680:case 36300:case 36308:case 36293:return sv;case 36289:case 36303:case 36311:case 36292:return rv}}var hh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=zy(e.type)}},uh=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=av(e.type)}},dh=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],i)}}},lh=/(\w+)(\])?(\[|\.)?/g;function ef(n,t){n.seq.push(t),n.map[t.id]=t}function ov(n,t,e){let i=n.name,s=i.length;for(lh.lastIndex=0;;){let r=lh.exec(i),a=lh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){ef(e,c===void 0?new hh(o,n,t):new uh(o,n,t));break}else{let u=e.map[o];u===void 0&&(u=new dh(o),ef(e,u)),e=u}}}var tr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);ov(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&i.push(a)}return i}};function nf(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var lv=37297,cv=0;function hv(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}var sf=new Wt;function uv(n){re._getMatrix(sf,re.workingColorSpace,n);let t=`mat3( ${sf.elements.map(e=>e.toFixed(4))} )`;switch(re.getTransfer(n)){case Cr:return[t,"LinearTransferOETF"];case pe:return[t,"sRGBTransferOETF"];default:return Ft("WebGLProgram: Unsupported color space: ",n),[t,"LinearTransferOETF"]}}function rf(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),r=(n.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+hv(n.getShaderSource(t),o)}else return r}function dv(n,t){let e=uv(t);return[`vec4 ${n}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}var fv={[Dc]:"Linear",[Nc]:"Reinhard",[Uc]:"Cineon",[Oc]:"ACESFilmic",[kc]:"AgX",[Bc]:"Neutral",[Fc]:"Custom"};function pv(n,t){let e=fv[t];return e===void 0?(Ft("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var ul=new X;function mv(){re.getLuminanceCoefficients(ul);let n=ul.x.toFixed(4),t=ul.y.toFixed(4),e=ul.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ta).join(`
`)}function _v(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function xv(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:n.getAttribLocation(t,a),locationSize:o}}return e}function ta(n){return n!==""}function af(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function of(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var yv=/^[ \t]*#include +<([\w\d./]+)>/gm;function fh(n){return n.replace(yv,vv)}function vv(n,t){let e=Kt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return fh(e)}var Sv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function lf(n){return n.replace(Sv,bv)}function bv(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function cf(n){let t=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}var Mv={[Xr]:"SHADOWMAP_TYPE_PCF",[Zs]:"SHADOWMAP_TYPE_VSM"};function wv(n){return Mv[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var Tv={[Js]:"ENVMAP_MODE_REFRACTION"};function Av(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":Tv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var Ev={[Lc]:"ENVMAP_BLENDING_MULTIPLY",[wd]:"ENVMAP_BLENDING_MIX",[Td]:"ENVMAP_BLENDING_ADD"};function Rv(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":Ev[n.combine]||"ENVMAP_BLENDING_NONE"}function Cv(n,t,e,i){let s=n.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,l=wv(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=Av(e),u=Rv(e),d=gv(e),p=_v(r),g=s.createProgram(),x,m,f=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(x=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(ta).join(`
`),x.length>0&&(x+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(ta).join(`
`),m.length>0&&(m+=`
`)):(x=[cf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ta).join(`
`),m=[cf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==hi?"#define TONE_MAPPING":"",e.toneMapping!==hi?Kt.tonemapping_pars_fragment:"",e.toneMapping!==hi?pv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,dv("linearToOutputTexel",e.outputColorSpace),mv(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ta).join(`
`)),a=fh(a),a=af(a,e),a=of(a,e),o=fh(o),o=af(o,e),o=of(o,e),a=lf(a),o=lf(o),e.isRawShaderMaterial!==!0&&(f=`#version 300 es
`,x=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+x,m=["#define varying in",e.glslVersion===jc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===jc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);let v=f+x+a,A=f+m+o,b=nf(s,s.VERTEX_SHADER,v),T=nf(s,s.FRAGMENT_SHADER,A);s.attachShader(g,b),s.attachShader(g,T),e.index0AttributeName!==void 0?s.bindAttribLocation(g,0,e.index0AttributeName):e.hasPositionAttribute===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function E(P){if(n.debug.checkShaderErrors){let N=s.getProgramInfoLog(g)||"",B=s.getShaderInfoLog(b)||"",Z=s.getShaderInfoLog(T)||"",I=N.trim(),Y=B.trim(),et=Z.trim(),k=!0,j=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(k=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,b,T);else{let D=rf(s,b,"vertex"),$=rf(s,T,"fragment");Gt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+I+`
`+D+`
`+$)}else I!==""?Ft("WebGLProgram: Program Info Log:",I):(Y===""||et==="")&&(j=!1);j&&(P.diagnostics={runnable:k,programLog:I,vertexShader:{log:Y,prefix:x},fragmentShader:{log:et,prefix:m}})}s.deleteShader(b),s.deleteShader(T),_=new tr(s,g),M=xv(s,g)}let _;this.getUniforms=function(){return _===void 0&&E(this),_};let M;this.getAttributes=function(){return M===void 0&&E(this),M};let z=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=s.getProgramParameter(g,lv)),z},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=cv++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=b,this.fragmentShader=T,this}var Iv=0,ph=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,i){let s=this._getShaderCacheForMaterial(t);return s.has(e)===!1&&(s.add(e),e.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new mh(t),e.set(t,i)),i}},mh=class{constructor(t){this.id=Iv++,this.code=t,this.usedTimes=0}};function Pv(n){return n===Ki||n===Jr||n===jr}function Lv(n,t,e,i,s,r){let a=new Dr,o=new ph,l=new Set,c=[],h=new Map,u=i.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return l.add(_),_===0?"uv":`uv${_}`}function g(_,M,z,P,N,B){let Z=P.fog,I=N.geometry,Y=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?P.environment:null,et=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,k=t.get(_.envMap||Y,et),j=d[_.type],D=i.precision;_.precision!==null&&(D=i.getMaxPrecision(_.precision),D!==_.precision&&Ft("WebGLProgram.getParameters:",_.precision,"not supported, using",D,"instead."));let $=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,W=$!==void 0?$.length:0,ot=0;I.morphAttributes.position!==void 0&&(ot=1),I.morphAttributes.normal!==void 0&&(ot=2),I.morphAttributes.color!==void 0&&(ot=3);let At,K,ht,ct;if(j){let yt=di[j];At=yt.vertexShader,K=yt.fragmentShader}else{At=_.vertexShader,K=_.fragmentShader;let yt=o.getVertexShaderStage(_),se=o.getFragmentShaderStage(_);o.update(_,yt,se),ht=yt.id,ct=se.id}let Ct=n.getRenderTarget(),Mt=n.state.buffers.depth.getReversed(),Xt=N.isInstancedMesh===!0,Re=N.isBatchedMesh===!0,Ot=!!_.map,le=!!_.matcap,he=!!k,Jt=he&&k.isPMREMTexture===!0,Le=!!_.aoMap,qt=!!_.lightMap,We=!!_.bumpMap&&_.wireframe===!1,Bt=!!_.normalMap,pn=!!_.displacementMap,ge=!!_.emissiveMap,Xe=!!_.metalnessMap,on=!!_.roughnessMap,Pe=_.anisotropy>0,F=_.clearcoat>0,Qe=_.diffuseRoughness>0,ye=_.dispersion>0,_e=_.retroreflectivity>0,mt=_.iridescence>0,ve=_.sheen>0,Dt=_.transmission>0,kt=Pe&&!!_.anisotropyMap,R=F&&!!_.clearcoatMap,y=F&&!!_.clearcoatNormalMap,H=F&&!!_.clearcoatRoughnessMap,lt=Qe&&!!_.diffuseRoughnessMap,it=mt&&!!_.iridescenceMap,pt=mt&&!!_.iridescenceThicknessMap,bt=ve&&!!_.sheenColorMap,Q=ve&&!!_.sheenRoughnessMap,nt=!!_.specularMap,gt=!!_.specularColorMap,C=!!_.specularIntensityMap,tt=Dt&&!!_.transmissionMap,J=Dt&&!!_.thicknessMap,dt=!!_.gradientMap,ft=!!_.alphaMap,_t=_.alphaTest>0,Lt=!!_.alphaHash,$t=!!_.extensions,ut=hi;_.toneMapped&&(Ct===null||Ct.isXRRenderTarget===!0)&&(ut=n.toneMapping);let Nt=Jt?k.isCompressedCubeTexture?k.image[0].mipmaps:k.mipmaps:null,Ht={shaderID:j,shaderType:_.type,shaderName:_.name,vertexShader:At,fragmentShader:K,defines:_.defines,customVertexShaderID:ht,customFragmentShaderID:ct,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:D,batching:Re,batchingColor:Re&&N._colorsTexture!==null,instancing:Xt,instancingColor:Xt&&N.instanceColor!==null,instancingMorph:Xt&&N.morphTexture!==null,outputColorSpace:Ct===null?n.outputColorSpace:Ct.isXRRenderTarget===!0?Ct.texture.colorSpace:re.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Ot,matcap:le,envMap:he,envMapMode:he&&k.mapping,envMapPMREM:Jt,envMapMaxLod:Jt?Nt.length-1:null,envMapSize:Jt?Nt[0].width:null,aoMap:Le,lightMap:qt,bumpMap:We,normalMap:Bt,displacementMap:pn,emissiveMap:ge,normalMapObjectSpace:Bt&&_.normalMapType===Rd,normalMapTangentSpace:Bt&&_.normalMapType===$c,packedNormalMap:Bt&&_.normalMapType===$c&&Pv(_.normalMap.format),metalnessMap:Xe,roughnessMap:on,anisotropy:Pe,anisotropyMap:kt,clearcoat:F,clearcoatMap:R,clearcoatNormalMap:y,clearcoatRoughnessMap:H,diffuseRoughness:Qe,diffuseRoughnessMap:lt,dispersion:ye,retroreflection:_e,iridescence:mt,iridescenceMap:it,iridescenceThicknessMap:pt,sheen:ve,sheenColorMap:bt,sheenRoughnessMap:Q,specularMap:nt,specularColorMap:gt,specularIntensityMap:C,transmission:Dt,transmissionMap:tt,thicknessMap:J,gradientMap:dt,opaque:_.transparent===!1&&_.blending===Ks&&_.alphaToCoverage===!1,alphaMap:ft,alphaTest:_t,alphaHash:Lt,combine:_.combine,mapUv:Ot&&p(_.map.channel),aoMapUv:Le&&p(_.aoMap.channel),lightMapUv:qt&&p(_.lightMap.channel),bumpMapUv:We&&p(_.bumpMap.channel),normalMapUv:Bt&&p(_.normalMap.channel),displacementMapUv:pn&&p(_.displacementMap.channel),emissiveMapUv:ge&&p(_.emissiveMap.channel),metalnessMapUv:Xe&&p(_.metalnessMap.channel),roughnessMapUv:on&&p(_.roughnessMap.channel),anisotropyMapUv:kt&&p(_.anisotropyMap.channel),clearcoatMapUv:R&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:y&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:H&&p(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:lt&&p(_.diffuseRoughnessMap.channel),iridescenceMapUv:it&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:pt&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:bt&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:Q&&p(_.sheenRoughnessMap.channel),specularMapUv:nt&&p(_.specularMap.channel),specularColorMapUv:gt&&p(_.specularColorMap.channel),specularIntensityMapUv:C&&p(_.specularIntensityMap.channel),transmissionMapUv:tt&&p(_.transmissionMap.channel),thicknessMapUv:J&&p(_.thicknessMap.channel),alphaMapUv:ft&&p(_.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(Bt||Pe),vertexNormals:!!I.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!I.attributes.uv&&(Ot||ft),fog:!!Z,useFog:_.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||I.attributes.normal===void 0&&Bt===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:Mt,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:W,morphTextureStride:ot,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:B.filter(yt=>yt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:n.shadowMap.enabled&&z.length>0,shadowMapType:n.shadowMap.type,toneMapping:ut,decodeVideoTexture:Ot&&_.map.isVideoTexture===!0&&re.getTransfer(_.map.colorSpace)===pe,decodeVideoTextureEmissive:ge&&_.emissiveMap.isVideoTexture===!0&&re.getTransfer(_.emissiveMap.colorSpace)===pe,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===ci,flipSided:_.side===un,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:$t&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($t&&_.extensions.multiDraw===!0||Re)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Ht.vertexUv1s=l.has(1),Ht.vertexUv2s=l.has(2),Ht.vertexUv3s=l.has(3),l.clear(),Ht}function x(_){let M=[];if(_.shaderID?M.push(_.shaderID):(M.push(_.customVertexShaderID),M.push(_.customFragmentShaderID)),_.defines!==void 0)for(let z in _.defines)M.push(z),M.push(_.defines[z]);return _.isRawShaderMaterial===!1&&(m(M,_),f(M,_),M.push(n.outputColorSpace)),M.push(_.customProgramCacheKey),M.join()}function m(_,M){_.push(M.precision),_.push(M.outputColorSpace),_.push(M.envMapMode),_.push(M.envMapPMREM),_.push(M.envMapMaxLod),_.push(M.envMapSize),_.push(M.mapUv),_.push(M.alphaMapUv),_.push(M.lightMapUv),_.push(M.aoMapUv),_.push(M.bumpMapUv),_.push(M.normalMapUv),_.push(M.displacementMapUv),_.push(M.emissiveMapUv),_.push(M.metalnessMapUv),_.push(M.roughnessMapUv),_.push(M.anisotropyMapUv),_.push(M.clearcoatMapUv),_.push(M.clearcoatNormalMapUv),_.push(M.clearcoatRoughnessMapUv),_.push(M.diffuseRoughnessMapUv),_.push(M.iridescenceMapUv),_.push(M.iridescenceThicknessMapUv),_.push(M.sheenColorMapUv),_.push(M.sheenRoughnessMapUv),_.push(M.specularMapUv),_.push(M.specularColorMapUv),_.push(M.specularIntensityMapUv),_.push(M.transmissionMapUv),_.push(M.thicknessMapUv),_.push(M.combine),_.push(M.fogExp2),_.push(M.sizeAttenuation),_.push(M.morphTargetsCount),_.push(M.numSunLights),_.push(M.numDirLights),_.push(M.numPointLights),_.push(M.numSpotLights),_.push(M.numSpotLightMaps),_.push(M.numHemiLights),_.push(M.numRectAreaLights),_.push(M.numSunLightShadows),_.push(M.numDirLightShadows),_.push(M.numPointLightShadows),_.push(M.numSpotLightShadows),_.push(M.numSpotLightShadowsWithMaps),_.push(M.numLightProbes),_.push(M.numLightProbeGrids),_.push(M.shadowMapType),_.push(M.toneMapping),_.push(M.numClippingPlanes),_.push(M.numClipIntersection),_.push(M.depthPacking)}function f(_,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.diffuseRoughness&&a.enable(25),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function v(_){let M=d[_.type],z;if(M){let P=di[M];z=Vd.clone(P.uniforms)}else z=_.uniforms;return z}function A(_,M){let z=h.get(M);return z!==void 0?++z.usedTimes:(z=new Cv(n,M,_,s),c.push(z),h.set(M,z)),z}function b(_){if(--_.usedTimes===0){let M=c.indexOf(_);c[M]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function T(_){o.remove(_)}function E(){o.dispose()}return{getParameters:g,getProgramCacheKey:x,getUniforms:v,acquireProgram:A,releaseProgram:b,releaseShaderCache:T,programs:c,dispose:E}}function Dv(){let n=new WeakMap;function t(a){return n.has(a)}function e(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:t,get:e,remove:i,update:s,dispose:r}}function Nv(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.materialVariant!==t.materialVariant?n.materialVariant-t.materialVariant:n.z!==t.z?n.z-t.z:n.id-t.id}function hf(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function uf(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function a(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function o(d,p,g,x,m,f){let v=n[t];return v===void 0?(v={id:d.id,object:d,geometry:p,material:g,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:m,group:f},n[t]=v):(v.id=d.id,v.object=d,v.geometry=p,v.material=g,v.materialVariant=a(d),v.groupOrder=x,v.renderOrder=d.renderOrder,v.z=m,v.group=f),t++,v}function l(d,p,g,x,m,f,v){v.reversedDepth===!0&&(m=-m);let A=o(d,p,g,x,m,f);g.transmission>0?i.push(A):g.transparent===!0?s.push(A):e.push(A)}function c(d,p,g,x,m,f){let v=o(d,p,g,x,m,f);g.transmission>0?i.unshift(v):g.transparent===!0?s.unshift(v):e.unshift(v)}function h(d,p){e.length>1&&e.sort(d||Nv),i.length>1&&i.sort(p||hf),s.length>1&&s.sort(p||hf)}function u(){for(let d=t,p=n.length;d<p;d++){let g=n[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:u,sort:h}}function Uv(){let n=new WeakMap;function t(i,s){let r=n.get(i),a;return r===void 0?(a=new uf,n.set(i,[a])):s>=r.length?(a=new uf,r.push(a)):a=r[s],a}function e(){n=new WeakMap}return{get:t,dispose:e}}function Ov(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new X,color:new ie};break;case"SpotLight":e={position:new X,direction:new X,color:new ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new X,color:new ie,distance:0,decay:0};break;case"HemisphereLight":e={direction:new X,skyColor:new ie,groundColor:new ie};break;case"RectAreaLight":e={color:new ie,position:new X,halfWidth:new X,halfHeight:new X};break}return n[t.id]=e,e}}}function Fv(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Yt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var kv=0;function Bv(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function zv(n){let t=new Ov,e=Fv(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new X);let s=new X,r=new Ae,a=new Ae;function o(c){let h=0,u=0,d=0;for(let B=0;B<9;B++)i.probe[B].set(0,0,0);let p=0,g=0,x=0,m=0,f=0,v=0,A=0,b=0,T=0,E=0,_=0,M=0,z=0,P=0;c.sort(Bv);for(let B=0,Z=c.length;B<Z;B++){let I=c[B],Y=I.color,et=I.intensity,k=I.distance,j=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Ki?j=I.shadow.map.texture:j=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=Y.r*et,u+=Y.g*et,d+=Y.b*et;else if(I.isLightProbe){for(let D=0;D<9;D++)i.probe[D].addScaledVector(I.sh.coefficients[D],et);P++}else if(I.isSunLight){let D=t.get(I);if(D.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let $=I.shadow,W=e.get(I);W.shadowIntensity=$.intensity,W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize.copy($.mapSize).multiply($.getFrameExtents()),i.sunShadow[g]=W,i.sunShadowMap[g]=j;let ot=$.getViewportCount();for(let At=0;At<ot;At++)i.sunShadowMatrix[x+At]=$.getMatrix(At),i.sunShadowCascade[x+At]=$._cascadeData[At];x+=ot,g++}i.sun[p]=D,p++}else if(I.isDirectionalLight){let D=t.get(I);if(D.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){let $=I.shadow,W=e.get(I);W.shadowIntensity=$.intensity,W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize=$.mapSize,i.directionalShadow[m]=W,i.directionalShadowMap[m]=j,i.directionalShadowMatrix[m]=I.shadow.matrix,T++}i.directional[m]=D,m++}else if(I.isSpotLight){let D=t.get(I);D.position.setFromMatrixPosition(I.matrixWorld),D.color.copy(Y).multiplyScalar(et),D.distance=k,D.coneCos=Math.cos(I.angle),D.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),D.decay=I.decay,i.spot[v]=D;let $=I.shadow;if(I.map&&(i.spotLightMap[M]=I.map,M++,$.updateMatrices(I),I.castShadow&&z++),i.spotLightMatrix[v]=$.matrix,I.castShadow){let W=e.get(I);W.shadowIntensity=$.intensity,W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize=$.mapSize,i.spotShadow[v]=W,i.spotShadowMap[v]=j,_++}v++}else if(I.isRectAreaLight){let D=t.get(I);D.color.copy(Y).multiplyScalar(et),D.halfWidth.set(I.width*.5,0,0),D.halfHeight.set(0,I.height*.5,0),i.rectArea[A]=D,A++}else if(I.isPointLight){let D=t.get(I);if(D.color.copy(I.color).multiplyScalar(I.intensity),D.distance=I.distance,D.decay=I.decay,I.castShadow){let $=I.shadow,W=e.get(I);W.shadowIntensity=$.intensity,W.shadowBias=$.bias,W.shadowNormalBias=$.normalBias,W.shadowRadius=$.radius,W.shadowMapSize=$.mapSize,W.shadowCameraNear=$.camera.near,W.shadowCameraFar=$.camera.far,i.pointShadow[f]=W,i.pointShadowMap[f]=j,i.pointShadowMatrix[f]=I.shadow.matrix,E++}i.point[f]=D,f++}else if(I.isHemisphereLight){let D=t.get(I);D.skyColor.copy(I.color).multiplyScalar(et),D.groundColor.copy(I.groundColor).multiplyScalar(et),i.hemi[b]=D,b++}}A>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Tt.LTC_FLOAT_1,i.rectAreaLTC2=Tt.LTC_FLOAT_2):(i.rectAreaLTC1=Tt.LTC_HALF_1,i.rectAreaLTC2=Tt.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let N=i.hash;(N.sunLength!==p||N.directionalLength!==m||N.pointLength!==f||N.spotLength!==v||N.rectAreaLength!==A||N.hemiLength!==b||N.numSunShadows!==g||N.numDirectionalShadows!==T||N.numPointShadows!==E||N.numSpotShadows!==_||N.numSpotMaps!==M||N.numLightProbes!==P)&&(i.sun.length=p,i.directional.length=m,i.spot.length=v,i.rectArea.length=A,i.point.length=f,i.hemi.length=b,i.sunShadow.length=g,i.sunShadowMap.length=g,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=E,i.pointShadowMap.length=E,i.pointShadowMatrix.length=E,i.spotShadow.length=_,i.spotShadowMap.length=_,i.spotLightMatrix.length=_+M-z,i.spotLightMap.length=M,i.numSpotLightShadowsWithMaps=z,i.numLightProbes=P,N.sunLength=p,N.directionalLength=m,N.pointLength=f,N.spotLength=v,N.rectAreaLength=A,N.hemiLength=b,N.numSunShadows=g,N.numDirectionalShadows=T,N.numPointShadows=E,N.numSpotShadows=_,N.numSpotMaps=M,N.numLightProbes=P,i.version=kv++)}function l(c,h){let u=0,d=0,p=0,g=0,x=0,m=0,f=h.matrixWorldInverse;for(let v=0,A=c.length;v<A;v++){let b=c[v];if(b.isSunLight){let T=i.sun[u];T.direction.setFromMatrixPosition(b.matrixWorld),T.direction.transformDirection(f),u++}else if(b.isDirectionalLight){let T=i.directional[d];T.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(f),d++}else if(b.isSpotLight){let T=i.spot[g];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(f),T.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(f),g++}else if(b.isRectAreaLight){let T=i.rectArea[x];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(f),a.identity(),r.copy(b.matrixWorld),r.premultiply(f),a.extractRotation(r),T.halfWidth.set(b.width*.5,0,0),T.halfHeight.set(0,b.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),x++}else if(b.isPointLight){let T=i.point[p];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(f),p++}else if(b.isHemisphereLight){let T=i.hemi[m];T.direction.setFromMatrixPosition(b.matrixWorld),T.direction.transformDirection(f),m++}}}return{setup:o,setupView:l,state:i}}function df(n){let t=new zv(n),e=[],i=[],s=[];function r(u){h.camera=u,e.length=0,i.length=0,s.length=0}function a(u){u.isLightProbeGrid?s.push(u):e.push(u)}function o(u){i.push(u)}function l(){t.setup(e),s.sort((u,d)=>u.priority-d.priority||u.id-d.id)}function c(u){t.setupView(e,u)}let h={lightsArray:e,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function Gv(n){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new df(n),t.set(s,[o])):r>=a.length?(o=new df(n),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:e,dispose:i}}var Hv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Vv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Wv=[new X(1,0,0),new X(-1,0,0),new X(0,1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1)],Xv=[new X(0,-1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1),new X(0,-1,0),new X(0,-1,0)],ff=new Ae,Qr=new X,ch=new X;function qv(n,t,e){let i=new cs,s=new Yt,r=new Yt,a=new Ee,o=new ho,l=new uo,c={},h=e.maxTextureSize,u={[Zi]:un,[un]:Zi,[ci]:ci},d=new Bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Yt},radius:{value:4}},vertexShader:Hv,fragmentShader:Vv}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new $n;g.setAttribute("position",new ai(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new oi(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Xr;let f=this.type;this.render=function(E,_,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===rd&&(Ft("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Xr);let z=n.getRenderTarget(),P=n.getActiveCubeFace(),N=n.getActiveMipmapLevel(),B=n.state;B.setBlending(hs),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);let Z=f!==this.type;Z&&_.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(Y=>Y.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,Y=E.length;I<Y;I++){let et=E[I],k=et.shadow;if(k===void 0){Ft("WebGLShadowMap:",et,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;s.copy(k.mapSize);let j=k.getFrameExtents();s.multiply(j),r.copy(k.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/j.x),s.x=r.x*j.x,k.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/j.y),s.y=r.y*j.y,k.mapSize.y=r.y));let D=n.state.buffers.depth.getReversed();if(k.camera._reversedDepth=D,k.map===null||Z===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===Zs){if(et.isPointLight){Ft("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Cn(s.x,s.y,{format:Ki,type:Jn,minFilter:hn,magFilter:hn,generateMipmaps:!1}),k.map.texture.name=et.name+".shadowMap",k.map.depthTexture=new Ci(s.x,s.y,Kn),k.map.depthTexture.name=et.name+".shadowMapDepth",k.map.depthTexture.format=Ri,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=$e,k.map.depthTexture.magFilter=$e}else et.isPointLight?(k.map=new ea(s.x),k.map.depthTexture=new Br(s.x,Zn)):(k.map=new Cn(s.x,s.y),k.map.depthTexture=new Ci(s.x,s.y,Zn)),k.map.depthTexture.name=et.name+".shadowMap",k.map.depthTexture.format=Ri,this.type===Xr?(k.map.depthTexture.compareFunction=D?Kc:Zc,k.map.depthTexture.minFilter=hn,k.map.depthTexture.magFilter=hn):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=$e,k.map.depthTexture.magFilter=$e);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==s.x||k.map.height!==s.y)&&k.map.setSize(s.x,s.y);let $=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();et.isPointLight!==!0&&k.updateMatrices(et,M);let W=(k.camera.layers.mask&4294967294)!==0?k.camera.layers:M.layers;for(let ot=0;ot<$;ot++){let At=k.getCamera(ot);if(et.isPointLight){let K=k.camera,ht=k.matrix,ct=et.distance||K.far;ct!==K.far&&(K.far=ct,K.updateProjectionMatrix()),Qr.setFromMatrixPosition(et.matrixWorld),K.position.copy(Qr),ch.copy(K.position),ch.add(Wv[ot]),K.up.copy(Xv[ot]),K.lookAt(ch),K.updateMatrixWorld(),ht.makeTranslation(-Qr.x,-Qr.y,-Qr.z),ff.multiplyMatrices(K.projectionMatrix,K.matrixWorldInverse),k._frustum.setFromProjectionMatrix(ff,K.coordinateSystem,K.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)n.setRenderTarget(k.map,ot),n.clear();else{ot===0&&(n.setRenderTarget(k.map),n.clear());let K=k.getViewport(ot);a.set(r.x*K.x,r.y*K.y,r.x*K.z,r.y*K.w),B.viewport(a)}i=k.getFrustum(ot),b(_,M,At,et,W,this.type)}k.isPointLightShadow!==!0&&this.type===Zs&&v(k,M),k.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(z,P,N)};function v(E,_){let M=t.update(x);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null?E.mapPass=new Cn(s.x,s.y,{format:Ki,type:Jn}):(E.mapPass.width!==E.map.width||E.mapPass.height!==E.map.height)&&E.mapPass.setSize(E.map.width,E.map.height),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value.set(E.map.width,E.map.height),d.uniforms.radius.value=E.radius,n.setRenderTarget(E.mapPass),n.clear(),n.renderBufferDirect(_,null,M,d,x,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value.set(E.map.width,E.map.height),p.uniforms.radius.value=E.radius,n.setRenderTarget(E.map),n.clear(),n.renderBufferDirect(_,null,M,p,x,null)}function A(E,_,M,z){let P=null,N=M.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(N!==void 0)P=N;else if(P=M.isPointLight===!0?l:o,n.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){let B=P.uuid,Z=_.uuid,I=c[B];I===void 0&&(I={},c[B]=I);let Y=I[Z];Y===void 0&&(Y=P.clone(),I[Z]=Y,_.addEventListener("dispose",T)),P=Y}if(P.visible=_.visible,P.wireframe=_.wireframe,z===Zs?P.side=_.shadowSide!==null?_.shadowSide:_.side:P.side=_.shadowSide!==null?_.shadowSide:u[_.side],P.alphaMap=_.alphaMap,P.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,P.map=_.map,P.clipShadows=_.clipShadows,P.clippingPlanes=_.clippingPlanes,P.clipIntersection=_.clipIntersection,P.displacementMap=_.displacementMap,P.displacementScale=_.displacementScale,P.displacementBias=_.displacementBias,P.wireframeLinewidth=_.wireframeLinewidth,P.linewidth=_.linewidth,M.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let B=n.properties.get(P);B.light=M}return P}function b(E,_,M,z,P,N){if(E.visible===!1)return;if(E.layers.test(P)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&N===Zs)&&(!E.frustumCulled||E.intersectsFrustum(i))){E.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,E.matrixWorld);let I=t.update(E),Y=E.material;if(Array.isArray(Y)){let et=I.groups;for(let k=0,j=et.length;k<j;k++){let D=et[k],$=Y[D.materialIndex];if($&&$.visible){let W=A(E,$,z,N);E.onBeforeShadow(n,E,_,M,I,W,D),n.renderBufferDirect(M,null,I,W,E,D),E.onAfterShadow(n,E,_,M,I,W,D)}}}else if(Y.visible){let et=A(E,Y,z,N);E.onBeforeShadow(n,E,_,M,I,et,null),n.renderBufferDirect(M,null,I,et,E,null),E.onAfterShadow(n,E,_,M,I,et,null)}}let Z=E.children;for(let I=0,Y=Z.length;I<Y;I++)b(Z[I],_,M,z,P,N)}function T(E){E.target.removeEventListener("dispose",T);for(let M in c){let z=c[M],P=E.target.uuid;P in z&&(z[P].dispose(),delete z[P])}}}function Yv(n,t){function e(){let C=!1,tt=new Ee,J=null,dt=new Ee(0,0,0,0);return{setMask:function(ft){J!==ft&&!C&&(n.colorMask(ft,ft,ft,ft),J=ft)},setLocked:function(ft){C=ft},setClear:function(ft,_t,Lt,$t,ut){ut===!0&&(ft*=$t,_t*=$t,Lt*=$t),tt.set(ft,_t,Lt,$t),dt.equals(tt)===!1&&(n.clearColor(ft,_t,Lt,$t),dt.copy(tt))},reset:function(){C=!1,J=null,dt.set(-1,0,0,0)}}}function i(){let C=!1,tt=!1,J=null,dt=null,ft=null;return{setReversed:function(_t){if(tt!==_t){let Lt=t.get("EXT_clip_control");_t?Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.ZERO_TO_ONE_EXT):Lt.clipControlEXT(Lt.LOWER_LEFT_EXT,Lt.NEGATIVE_ONE_TO_ONE_EXT),tt=_t;let $t=ft;ft=null,this.setClear($t)}},getReversed:function(){return tt},setTest:function(_t){_t?Mt(n.DEPTH_TEST):Xt(n.DEPTH_TEST)},setMask:function(_t){J!==_t&&!C&&(n.depthMask(_t),J=_t)},setFunc:function(_t){if(tt&&(_t=Bd[_t]),dt!==_t){switch(_t){case qa:n.depthFunc(n.NEVER);break;case Ya:n.depthFunc(n.ALWAYS);break;case $a:n.depthFunc(n.LESS);break;case Gs:n.depthFunc(n.LEQUAL);break;case Za:n.depthFunc(n.EQUAL);break;case Ka:n.depthFunc(n.GEQUAL);break;case Ja:n.depthFunc(n.GREATER);break;case ja:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}dt=_t}},setLocked:function(_t){C=_t},setClear:function(_t){ft!==_t&&(ft=_t,tt&&(_t=1-_t),n.clearDepth(_t))},reset:function(){C=!1,J=null,dt=null,ft=null,tt=!1}}}function s(){let C=!1,tt=null,J=null,dt=null,ft=null,_t=null,Lt=null,$t=null,ut=null;return{setTest:function(Nt){C||(Nt?Mt(n.STENCIL_TEST):Xt(n.STENCIL_TEST))},setMask:function(Nt){tt!==Nt&&!C&&(n.stencilMask(Nt),tt=Nt)},setFunc:function(Nt,Ht,yt){(J!==Nt||dt!==Ht||ft!==yt)&&(n.stencilFunc(Nt,Ht,yt),J=Nt,dt=Ht,ft=yt)},setOp:function(Nt,Ht,yt){(_t!==Nt||Lt!==Ht||$t!==yt)&&(n.stencilOp(Nt,Ht,yt),_t=Nt,Lt=Ht,$t=yt)},setLocked:function(Nt){C=Nt},setClear:function(Nt){ut!==Nt&&(n.clearStencil(Nt),ut=Nt)},reset:function(){C=!1,tt=null,J=null,dt=null,ft=null,_t=null,Lt=null,$t=null,ut=null}}}let r=new e,a=new i,o=new s,l={},c=new WeakMap,h={},u={},d={},p=new WeakMap,g=[],x=null,m=!1,f=null,v=null,A=null,b=null,T=null,E=null,_=null,M=new ie(0,0,0),z=0,P=!1,N=null,B=null,Z=null,I=null,Y=null,et=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),k=!1,j=0,D=n.getParameter(n.VERSION);D.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(D)[1]),k=j>=1):D.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(D)[1]),k=j>=2);let $=null,W={},ot=n.getParameter(n.SCISSOR_BOX),At=n.getParameter(n.VIEWPORT),K=new Ee().fromArray(ot),ht=new Ee().fromArray(At);function ct(C,tt,J,dt){let ft=new Uint8Array(4),_t=n.createTexture();n.bindTexture(C,_t),n.texParameteri(C,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(C,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Lt=0;Lt<J;Lt++)C===n.TEXTURE_3D||C===n.TEXTURE_2D_ARRAY?n.texImage3D(tt,0,n.RGBA,1,1,dt,0,n.RGBA,n.UNSIGNED_BYTE,ft):n.texImage2D(tt+Lt,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ft);return _t}let Ct={};Ct[n.TEXTURE_2D]=ct(n.TEXTURE_2D,n.TEXTURE_2D,1),Ct[n.TEXTURE_CUBE_MAP]=ct(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ct[n.TEXTURE_2D_ARRAY]=ct(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),Ct[n.TEXTURE_3D]=ct(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Mt(n.DEPTH_TEST),a.setFunc(Gs),We(!1),Bt(Ac),Mt(n.CULL_FACE),Le(hs);function Mt(C){h[C]!==!0&&(n.enable(C),h[C]=!0)}function Xt(C){h[C]!==!1&&(n.disable(C),h[C]=!1)}function Re(C,tt){return d[C]!==tt?(n.bindFramebuffer(C,tt),d[C]=tt,C===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=tt),C===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=tt),!0):!1}function Ot(C,tt){let J=g,dt=!1;if(C){J=p.get(tt),J===void 0&&(J=[],p.set(tt,J));let ft=C.textures;if(J.length!==ft.length||J[0]!==n.COLOR_ATTACHMENT0){for(let _t=0,Lt=ft.length;_t<Lt;_t++)J[_t]=n.COLOR_ATTACHMENT0+_t;J.length=ft.length,dt=!0}}else J[0]!==n.BACK&&(J[0]=n.BACK,dt=!0);dt&&n.drawBuffers(J)}function le(C){return x!==C?(n.useProgram(C),x=C,!0):!1}let he={[us]:n.FUNC_ADD,[od]:n.FUNC_SUBTRACT,[ld]:n.FUNC_REVERSE_SUBTRACT};he[cd]=n.MIN,he[hd]=n.MAX;let Jt={[ud]:n.ZERO,[dd]:n.ONE,[fd]:n.SRC_COLOR,[Ic]:n.SRC_ALPHA,[yd]:n.SRC_ALPHA_SATURATE,[_d]:n.DST_COLOR,[md]:n.DST_ALPHA,[pd]:n.ONE_MINUS_SRC_COLOR,[Pc]:n.ONE_MINUS_SRC_ALPHA,[xd]:n.ONE_MINUS_DST_COLOR,[gd]:n.ONE_MINUS_DST_ALPHA,[vd]:n.CONSTANT_COLOR,[Sd]:n.ONE_MINUS_CONSTANT_COLOR,[bd]:n.CONSTANT_ALPHA,[Md]:n.ONE_MINUS_CONSTANT_ALPHA};function Le(C,tt,J,dt,ft,_t,Lt,$t,ut,Nt){if(C===hs){m===!0&&(Xt(n.BLEND),m=!1);return}if(m===!1&&(Mt(n.BLEND),m=!0),C!==ad){if(C!==f||Nt!==P){if((v!==us||T!==us)&&(n.blendEquation(n.FUNC_ADD),v=us,T=us),Nt)switch(C){case Ks:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ec:n.blendFunc(n.ONE,n.ONE);break;case Rc:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Cc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Gt("WebGLState: Invalid blending: ",C);break}else switch(C){case Ks:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ec:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Rc:Gt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Cc:Gt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Gt("WebGLState: Invalid blending: ",C);break}A=null,b=null,E=null,_=null,M.set(0,0,0),z=0,f=C,P=Nt}return}ft=ft||tt,_t=_t||J,Lt=Lt||dt,(tt!==v||ft!==T)&&(n.blendEquationSeparate(he[tt],he[ft]),v=tt,T=ft),(J!==A||dt!==b||_t!==E||Lt!==_)&&(n.blendFuncSeparate(Jt[J],Jt[dt],Jt[_t],Jt[Lt]),A=J,b=dt,E=_t,_=Lt),($t.equals(M)===!1||ut!==z)&&(n.blendColor($t.r,$t.g,$t.b,ut),M.copy($t),z=ut),f=C,P=!1}function qt(C,tt){C.side===ci?Xt(n.CULL_FACE):Mt(n.CULL_FACE);let J=C.side===un;tt&&(J=!J),We(J),C.blending===Ks&&C.transparent===!1?Le(hs):Le(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),a.setFunc(C.depthFunc),a.setTest(C.depthTest),a.setMask(C.depthWrite),r.setMask(C.colorWrite);let dt=C.stencilWrite;o.setTest(dt),dt&&(o.setMask(C.stencilWriteMask),o.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),o.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),ge(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?Mt(n.SAMPLE_ALPHA_TO_COVERAGE):Xt(n.SAMPLE_ALPHA_TO_COVERAGE)}function We(C){N!==C&&(C?n.frontFace(n.CW):n.frontFace(n.CCW),N=C)}function Bt(C){C!==id?(Mt(n.CULL_FACE),C!==B&&(C===Ac?n.cullFace(n.BACK):C===sd?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):Xt(n.CULL_FACE),B=C}function pn(C){C!==Z&&(k&&n.lineWidth(C),Z=C)}function ge(C,tt,J){C?(Mt(n.POLYGON_OFFSET_FILL),(I!==tt||Y!==J)&&(I=tt,Y=J,a.getReversed()&&(tt=-tt,J=-J),n.polygonOffset(tt,J))):Xt(n.POLYGON_OFFSET_FILL)}function Xe(C){C?Mt(n.SCISSOR_TEST):Xt(n.SCISSOR_TEST)}function on(C){C===void 0&&(C=n.TEXTURE0+et-1),$!==C&&(n.activeTexture(C),$=C)}function Pe(C,tt,J){J===void 0&&($===null?J=n.TEXTURE0+et-1:J=$);let dt=W[J];dt===void 0&&(dt={type:void 0,texture:void 0},W[J]=dt),(dt.type!==C||dt.texture!==tt)&&($!==J&&(n.activeTexture(J),$=J),n.bindTexture(C,tt||Ct[C]),dt.type=C,dt.texture=tt)}function F(){let C=W[$];C!==void 0&&C.type!==void 0&&(n.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function Qe(){try{n.compressedTexImage2D(...arguments)}catch(C){Gt("WebGLState:",C)}}function ye(){try{n.compressedTexImage3D(...arguments)}catch(C){Gt("WebGLState:",C)}}function _e(){try{n.texSubImage2D(...arguments)}catch(C){Gt("WebGLState:",C)}}function mt(){try{n.texSubImage3D(...arguments)}catch(C){Gt("WebGLState:",C)}}function ve(){try{n.compressedTexSubImage2D(...arguments)}catch(C){Gt("WebGLState:",C)}}function Dt(){try{n.compressedTexSubImage3D(...arguments)}catch(C){Gt("WebGLState:",C)}}function kt(){try{n.texStorage2D(...arguments)}catch(C){Gt("WebGLState:",C)}}function R(){try{n.texStorage3D(...arguments)}catch(C){Gt("WebGLState:",C)}}function y(){try{n.texImage2D(...arguments)}catch(C){Gt("WebGLState:",C)}}function H(){try{n.texImage3D(...arguments)}catch(C){Gt("WebGLState:",C)}}function lt(C){return u[C]!==void 0?u[C]:n.getParameter(C)}function it(C,tt){u[C]!==tt&&(n.pixelStorei(C,tt),u[C]=tt)}function pt(C){K.equals(C)===!1&&(n.scissor(C.x,C.y,C.z,C.w),K.copy(C))}function bt(C){ht.equals(C)===!1&&(n.viewport(C.x,C.y,C.z,C.w),ht.copy(C))}function Q(C,tt){let J=c.get(tt);J===void 0&&(J=new WeakMap,c.set(tt,J));let dt=J.get(C);dt===void 0&&(dt=n.getUniformBlockIndex(tt,C.name),n.uniformBlockBinding(tt,dt,dt),J.set(C,dt))}function nt(C,tt,J){let ft=c.get(tt).get(C);l[ft]!==J&&(n.bindBufferBase(n.UNIFORM_BUFFER,ft,J),l[ft]=J)}function gt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),h={},u={},$=null,W={},d={},l={},p=new WeakMap,g=[],x=null,m=!1,f=null,v=null,A=null,b=null,T=null,E=null,_=null,M=new ie(0,0,0),z=0,P=!1,N=null,B=null,Z=null,I=null,Y=null,K.set(0,0,n.canvas.width,n.canvas.height),ht.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Mt,disable:Xt,bindFramebuffer:Re,drawBuffers:Ot,useProgram:le,setBlending:Le,setMaterial:qt,setFlipSided:We,setCullFace:Bt,setLineWidth:pn,setPolygonOffset:ge,setScissorTest:Xe,activeTexture:on,bindTexture:Pe,unbindTexture:F,compressedTexImage2D:Qe,compressedTexImage3D:ye,texImage2D:y,texImage3D:H,pixelStorei:it,getParameter:lt,updateUBOMapping:Q,uniformBlockBinding:nt,texStorage2D:kt,texStorage3D:R,texSubImage2D:_e,texSubImage3D:mt,compressedTexSubImage2D:ve,compressedTexSubImage3D:Dt,scissor:pt,viewport:bt,reset:gt}}function $v(n,t,e,i,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Yt,h=new WeakMap,u=new Set,d,p=new WeakMap,g=new Set,x=new FinalizationRegistry(R=>g.delete(R)),m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(R,y){return m?new OffscreenCanvas(R,y):Pr("canvas")}function v(R,y,H){let lt=1,it=kt(R);if((it.width>H||it.height>H)&&(lt=H/Math.max(it.width,it.height)),lt<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){let pt=Math.floor(lt*it.width),bt=Math.floor(lt*it.height);d===void 0&&(d=f(pt,bt));let Q=y?f(pt,bt):d;return Q.width=pt,Q.height=bt,Q.getContext("2d").drawImage(R,0,0,pt,bt),Ft("WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+pt+"x"+bt+")."),Q}else return"data"in R&&Ft("WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),R;return R}function A(R){return R.generateMipmaps}function b(R){n.generateMipmap(R)}function T(R){return R.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?n.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function E(R,y,H,lt,it,pt=!1){if(R!==null){if(n[R]!==void 0)return n[R];Ft("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let bt;lt&&(bt=t.get("EXT_texture_norm16"),bt||Ft("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=y;if(y===n.RED&&(H===n.FLOAT&&(Q=n.R32F),H===n.HALF_FLOAT&&(Q=n.R16F),H===n.UNSIGNED_BYTE&&(Q=n.R8),H===n.UNSIGNED_SHORT&&bt&&(Q=bt.R16_EXT),H===n.SHORT&&bt&&(Q=bt.R16_SNORM_EXT)),y===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.R8UI),H===n.UNSIGNED_SHORT&&(Q=n.R16UI),H===n.UNSIGNED_INT&&(Q=n.R32UI),H===n.BYTE&&(Q=n.R8I),H===n.SHORT&&(Q=n.R16I),H===n.INT&&(Q=n.R32I)),y===n.RG&&(H===n.FLOAT&&(Q=n.RG32F),H===n.HALF_FLOAT&&(Q=n.RG16F),H===n.UNSIGNED_BYTE&&(Q=n.RG8),H===n.UNSIGNED_SHORT&&bt&&(Q=bt.RG16_EXT),H===n.SHORT&&bt&&(Q=bt.RG16_SNORM_EXT)),y===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.RG8UI),H===n.UNSIGNED_SHORT&&(Q=n.RG16UI),H===n.UNSIGNED_INT&&(Q=n.RG32UI),H===n.BYTE&&(Q=n.RG8I),H===n.SHORT&&(Q=n.RG16I),H===n.INT&&(Q=n.RG32I)),y===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.RGB8UI),H===n.UNSIGNED_SHORT&&(Q=n.RGB16UI),H===n.UNSIGNED_INT&&(Q=n.RGB32UI),H===n.BYTE&&(Q=n.RGB8I),H===n.SHORT&&(Q=n.RGB16I),H===n.INT&&(Q=n.RGB32I)),y===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(Q=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(Q=n.RGBA16UI),H===n.UNSIGNED_INT&&(Q=n.RGBA32UI),H===n.BYTE&&(Q=n.RGBA8I),H===n.SHORT&&(Q=n.RGBA16I),H===n.INT&&(Q=n.RGBA32I)),y===n.RGB&&(H===n.UNSIGNED_SHORT&&bt&&(Q=bt.RGB16_EXT),H===n.SHORT&&bt&&(Q=bt.RGB16_SNORM_EXT),H===n.UNSIGNED_INT_5_9_9_9_REV&&(Q=n.RGB9_E5),H===n.UNSIGNED_INT_10F_11F_11F_REV&&(Q=n.R11F_G11F_B10F)),y===n.RGBA){let nt=pt?Cr:re.getTransfer(it);H===n.FLOAT&&(Q=n.RGBA32F),H===n.HALF_FLOAT&&(Q=n.RGBA16F),H===n.UNSIGNED_BYTE&&(Q=nt===pe?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT&&bt&&(Q=bt.RGBA16_EXT),H===n.SHORT&&bt&&(Q=bt.RGBA16_SNORM_EXT),H===n.UNSIGNED_SHORT_4_4_4_4&&(Q=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(Q=n.RGB5_A1)}return(Q===n.R16F||Q===n.R32F||Q===n.RG16F||Q===n.RG32F||Q===n.RGBA16F||Q===n.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function _(R,y){let H;return R?y===null||y===Zn||y===fs?H=n.DEPTH24_STENCIL8:y===Kn?H=n.DEPTH32F_STENCIL8:y===js&&(H=n.DEPTH24_STENCIL8,Ft("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Zn||y===fs?H=n.DEPTH_COMPONENT24:y===Kn?H=n.DEPTH_COMPONENT32F:y===js&&(H=n.DEPTH_COMPONENT16),H}function M(R,y){return A(R)===!0||R.isFramebufferTexture&&R.minFilter!==$e&&R.minFilter!==hn?Math.log2(Math.max(y.width,y.height))+1:R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?y.mipmaps.length:1}function z(R){let y=new WeakRef(R);i.get(R).__ref=y,g.add(y),x.register(R,y,y)}function P(R){let y=i.get(R).__ref;y!==void 0&&(g.delete(y),x.unregister(y))}function N(R){Z(R.target)}function B(R){I(R.target)}function Z(R){R.removeEventListener("dispose",N),P(R),et(R),R.isVideoTexture&&h.delete(R),R.isHTMLTexture&&u.delete(R)}function I(R){R.removeEventListener("dispose",B),P(R),j(R)}function Y(){for(let R of g){let y=R.deref();y!==void 0&&(y.isRenderTarget===!0?I(y):Z(y))}g.clear(),u.clear()}function et(R){let y=i.get(R);if(y.__webglInit===void 0)return;let H=R.source,lt=p.get(H);if(lt){let it=lt[y.__cacheKey];it.usedTimes--,it.usedTimes===0&&k(R),Object.keys(lt).length===0&&p.delete(H)}i.remove(R)}function k(R){let y=i.get(R);n.deleteTexture(y.__webglTexture);let H=R.source,lt=p.get(H);delete lt[y.__cacheKey],a.memory.textures--}function j(R){let y=i.get(R);y.__depthDisposeCallback&&y.__depthDisposeCallback();let H=R.depthTexture;if(H&&H.renderTarget===R&&Z(H),R.isWebGLCubeRenderTarget)for(let it=0;it<6;it++){if(Array.isArray(y.__webglFramebuffer[it]))for(let pt=0;pt<y.__webglFramebuffer[it].length;pt++)n.deleteFramebuffer(y.__webglFramebuffer[it][pt]);else n.deleteFramebuffer(y.__webglFramebuffer[it]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[it])}else{if(Array.isArray(y.__webglFramebuffer))for(let it=0;it<y.__webglFramebuffer.length;it++)n.deleteFramebuffer(y.__webglFramebuffer[it]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let it=0;it<y.__webglColorRenderbuffer.length;it++)y.__webglColorRenderbuffer[it]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[it]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let lt=R.textures;for(let it=0,pt=lt.length;it<pt;it++){let bt=i.get(lt[it]);bt.__webglTexture&&(n.deleteTexture(bt.__webglTexture),a.memory.textures--),i.remove(lt[it])}i.remove(R)}let D=0;function $(){D=0}function W(){return D}function ot(R){D=R}function At(){let R=D;return R>=s.maxTextures&&Ft("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+s.maxTextures),D+=1,R}function K(R){let y=[];return y.push(R.wrapS),y.push(R.wrapT),y.push(R.wrapR||0),y.push(R.magFilter),y.push(R.minFilter),y.push(R.anisotropy),y.push(R.internalFormat),y.push(R.format),y.push(R.type),y.push(R.generateMipmaps),y.push(R.mipmapsAutoUpdate),y.push(R.premultiplyAlpha),y.push(R.flipY),y.push(R.unpackAlignment),y.push(R.colorSpace),y.join()}function ht(R,y){let H=i.get(R);if(R.isVideoTexture&&ve(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&H.__version!==R.version){let lt=R.image;if(lt===null)Ft("WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)Ft("WebGLRenderer: Texture marked for update but image is incomplete");else{qt(H,R,y);return}}else R.isExternalTexture&&(H.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+y)}function ct(R,y){let H=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&H.__version!==R.version){qt(H,R,y);return}else R.isExternalTexture&&(H.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+y)}function Ct(R,y){let H=i.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&H.__version!==R.version){qt(H,R,y);return}e.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+y)}function Mt(R,y){let H=i.get(R);if(R.version>0&&H.__version!==R.version){We(H,R,y);return}e.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+y)}let Xt={[Qa]:n.REPEAT,[ri]:n.CLAMP_TO_EDGE,[to]:n.MIRRORED_REPEAT},Re={[$e]:n.NEAREST,[Ad]:n.NEAREST_MIPMAP_NEAREST,[qr]:n.NEAREST_MIPMAP_LINEAR,[hn]:n.LINEAR,[Eo]:n.LINEAR_MIPMAP_NEAREST,[Ii]:n.LINEAR_MIPMAP_LINEAR},Ot={[Id]:n.NEVER,[Jc]:n.ALWAYS,[Pd]:n.LESS,[Zc]:n.LEQUAL,[Ld]:n.EQUAL,[Kc]:n.GEQUAL,[Dd]:n.GREATER,[Nd]:n.NOTEQUAL};function le(R,y){if(y.type===Kn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===hn||y.magFilter===Eo||y.magFilter===qr||y.magFilter===Ii||y.minFilter===hn||y.minFilter===Eo||y.minFilter===qr||y.minFilter===Ii)&&Ft("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(R,n.TEXTURE_WRAP_S,Xt[y.wrapS]),n.texParameteri(R,n.TEXTURE_WRAP_T,Xt[y.wrapT]),(R===n.TEXTURE_3D||R===n.TEXTURE_2D_ARRAY)&&n.texParameteri(R,n.TEXTURE_WRAP_R,Xt[y.wrapR]),n.texParameteri(R,n.TEXTURE_MAG_FILTER,Re[y.magFilter]),n.texParameteri(R,n.TEXTURE_MIN_FILTER,Re[y.minFilter]),y.compareFunction&&(n.texParameteri(R,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(R,n.TEXTURE_COMPARE_FUNC,Ot[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===$e||y.minFilter!==qr&&y.minFilter!==Ii||y.type===Kn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let H=t.get("EXT_texture_filter_anisotropic");n.texParameterf(R,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function he(R,y){let H=!1;R.__webglInit===void 0&&(R.__webglInit=!0,y.addEventListener("dispose",N),z(y));let lt=y.source,it=p.get(lt);it===void 0&&(it={},p.set(lt,it));let pt=K(y);if(pt!==R.__cacheKey){it[pt]===void 0&&(it[pt]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,H=!0),it[pt].usedTimes++;let bt=it[R.__cacheKey];bt!==void 0&&(it[R.__cacheKey].usedTimes--,bt.usedTimes===0&&k(y)),R.__cacheKey=pt,R.__webglTexture=it[pt].texture}return H}function Jt(R,y,H){return Math.floor(Math.floor(R/H)/y)}function Le(R,y,H,lt){let pt=R.updateRanges;if(pt.length===0)e.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,H,lt,y.data);else{pt.sort((C,tt)=>C.start-tt.start);let bt=0;for(let C=1;C<pt.length;C++){let tt=pt[bt],J=pt[C],dt=tt.start+tt.count,ft=Jt(J.start,y.width,4),_t=Jt(tt.start,y.width,4);J.start<=dt+1&&ft===_t&&Jt(J.start+J.count-1,y.width,4)===ft?tt.count=Math.max(tt.count,J.start+J.count-tt.start):(++bt,pt[bt]=J)}pt.length=bt+1;let Q=e.getParameter(n.UNPACK_ROW_LENGTH),nt=e.getParameter(n.UNPACK_SKIP_PIXELS),gt=e.getParameter(n.UNPACK_SKIP_ROWS);e.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let C=0,tt=pt.length;C<tt;C++){let J=pt[C],dt=Math.floor(J.start/4),ft=Math.ceil(J.count/4),_t=dt%y.width,Lt=Math.floor(dt/y.width),$t=ft,ut=1;e.pixelStorei(n.UNPACK_SKIP_PIXELS,_t),e.pixelStorei(n.UNPACK_SKIP_ROWS,Lt),e.texSubImage2D(n.TEXTURE_2D,0,_t,Lt,$t,ut,H,lt,y.data)}R.clearUpdateRanges(),e.pixelStorei(n.UNPACK_ROW_LENGTH,Q),e.pixelStorei(n.UNPACK_SKIP_PIXELS,nt),e.pixelStorei(n.UNPACK_SKIP_ROWS,gt)}}function qt(R,y,H){let lt=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(lt=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&(lt=n.TEXTURE_3D);let it=he(R,y),pt=y.source;e.bindTexture(lt,R.__webglTexture,n.TEXTURE0+H);let bt=i.get(pt);if(pt.version!==bt.__version||it===!0){if(e.activeTexture(n.TEXTURE0+H),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){let ut=re.getPrimaries(re.workingColorSpace),Nt=y.colorSpace===Li?null:re.getPrimaries(y.colorSpace),Ht=y.colorSpace===Li||ut===Nt?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ht)}e.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment);let nt=v(y.image,!1,s.maxTextureSize);nt=Dt(y,nt);let gt=r.convert(y.format,y.colorSpace),C=r.convert(y.type),tt=E(y.internalFormat,gt,C,y.normalized,y.colorSpace,y.isVideoTexture);le(lt,y);let J,dt=y.mipmaps,ft=y.isVideoTexture!==!0,_t=bt.__version===void 0||it===!0,Lt=pt.dataReady,$t=M(y,nt);if(y.isDepthTexture)tt=_(y.format===Pi,y.type),_t&&(ft?e.texStorage2D(n.TEXTURE_2D,1,tt,nt.width,nt.height):e.texImage2D(n.TEXTURE_2D,0,tt,nt.width,nt.height,0,gt,C,null));else if(y.isDataTexture)if(dt.length>0){ft&&_t&&e.texStorage2D(n.TEXTURE_2D,$t,tt,dt[0].width,dt[0].height);for(let ut=0,Nt=dt.length;ut<Nt;ut++)J=dt[ut],ft?Lt&&e.texSubImage2D(n.TEXTURE_2D,ut,0,0,J.width,J.height,gt,C,J.data):e.texImage2D(n.TEXTURE_2D,ut,tt,J.width,J.height,0,gt,C,J.data);y.generateMipmaps=!1}else ft?(_t&&e.texStorage2D(n.TEXTURE_2D,$t,tt,nt.width,nt.height),Lt&&Le(y,nt,gt,C)):e.texImage2D(n.TEXTURE_2D,0,tt,nt.width,nt.height,0,gt,C,nt.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){ft&&_t&&e.texStorage3D(n.TEXTURE_2D_ARRAY,$t,tt,dt[0].width,dt[0].height,nt.depth);for(let ut=0,Nt=dt.length;ut<Nt;ut++)if(J=dt[ut],y.format!==jn)if(gt!==null)if(ft){if(Lt)if(y.layerUpdates.size>0){let Ht=oh(J.width,J.height,y.format,y.type);for(let yt of y.layerUpdates){let se=J.data.subarray(yt*Ht/J.data.BYTES_PER_ELEMENT,(yt+1)*Ht/J.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ut,0,0,yt,J.width,J.height,1,gt,se)}}else e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ut,0,0,0,J.width,J.height,nt.depth,gt,J.data)}else e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ut,tt,J.width,J.height,nt.depth,0,J.data,0,0);else Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ft?Lt&&e.texSubImage3D(n.TEXTURE_2D_ARRAY,ut,0,0,0,J.width,J.height,nt.depth,gt,C,J.data):e.texImage3D(n.TEXTURE_2D_ARRAY,ut,tt,J.width,J.height,nt.depth,0,gt,C,J.data);y.layerUpdates.size>0&&y.clearLayerUpdates()}else{ft&&_t&&e.texStorage2D(n.TEXTURE_2D,$t,tt,dt[0].width,dt[0].height);for(let ut=0,Nt=dt.length;ut<Nt;ut++)J=dt[ut],y.format!==jn?gt!==null?ft?Lt&&e.compressedTexSubImage2D(n.TEXTURE_2D,ut,0,0,J.width,J.height,gt,J.data):e.compressedTexImage2D(n.TEXTURE_2D,ut,tt,J.width,J.height,0,J.data):Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ft?Lt&&e.texSubImage2D(n.TEXTURE_2D,ut,0,0,J.width,J.height,gt,C,J.data):e.texImage2D(n.TEXTURE_2D,ut,tt,J.width,J.height,0,gt,C,J.data)}else if(y.isDataArrayTexture)if(ft){if(_t&&e.texStorage3D(n.TEXTURE_2D_ARRAY,$t,tt,nt.width,nt.height,nt.depth),Lt)if(y.layerUpdates.size>0){let ut=oh(nt.width,nt.height,y.format,y.type);for(let Nt of y.layerUpdates){let Ht=nt.data.subarray(Nt*ut/nt.data.BYTES_PER_ELEMENT,(Nt+1)*ut/nt.data.BYTES_PER_ELEMENT);e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Nt,nt.width,nt.height,1,gt,C,Ht)}y.clearLayerUpdates()}else e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,nt.width,nt.height,nt.depth,gt,C,nt.data)}else e.texImage3D(n.TEXTURE_2D_ARRAY,0,tt,nt.width,nt.height,nt.depth,0,gt,C,nt.data);else if(y.isData3DTexture)ft?(_t&&e.texStorage3D(n.TEXTURE_3D,$t,tt,nt.width,nt.height,nt.depth),Lt&&e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,nt.width,nt.height,nt.depth,gt,C,nt.data)):e.texImage3D(n.TEXTURE_3D,0,tt,nt.width,nt.height,nt.depth,0,gt,C,nt.data);else if(y.isFramebufferTexture){if(_t)if(ft)e.texStorage2D(n.TEXTURE_2D,$t,tt,nt.width,nt.height);else{let ut=nt.width,Nt=nt.height;for(let Ht=0;Ht<$t;Ht++)e.texImage2D(n.TEXTURE_2D,Ht,tt,ut,Nt,0,gt,C,null),ut>>=1,Nt>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in n){let ut=n.canvas;if(ut.hasAttribute("layoutsubtree")||ut.setAttribute("layoutsubtree","true"),nt.parentNode!==ut){ut.appendChild(nt),u.add(y),ut.onpaint=Nt=>{let Ht=Nt.changedElements;for(let yt of u)Ht.includes(yt.image)&&(yt.needsUpdate=!0)},ut.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,nt);else{let Ht=n.RGBA,yt=n.RGBA,se=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ht,yt,se,nt)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(dt.length>0){if(ft&&_t){let ut=kt(dt[0]);e.texStorage2D(n.TEXTURE_2D,$t,tt,ut.width,ut.height)}for(let ut=0,Nt=dt.length;ut<Nt;ut++)J=dt[ut],ft?Lt&&e.texSubImage2D(n.TEXTURE_2D,ut,0,0,gt,C,J):e.texImage2D(n.TEXTURE_2D,ut,tt,gt,C,J);y.generateMipmaps=!1}else if(ft){if(_t){let ut=kt(nt);e.texStorage2D(n.TEXTURE_2D,$t,tt,ut.width,ut.height)}Lt&&e.texSubImage2D(n.TEXTURE_2D,0,0,0,gt,C,nt)}else e.texImage2D(n.TEXTURE_2D,0,tt,gt,C,nt);A(y)&&y.mipmapsAutoUpdate===!0&&b(lt),bt.__version=pt.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function We(R,y,H){if(y.image.length!==6)return;let lt=he(R,y),it=y.source;e.bindTexture(n.TEXTURE_CUBE_MAP,R.__webglTexture,n.TEXTURE0+H);let pt=i.get(it);if(it.version!==pt.__version||lt===!0){e.activeTexture(n.TEXTURE0+H);let bt=re.getPrimaries(re.workingColorSpace),Q=y.colorSpace===Li?null:re.getPrimaries(y.colorSpace),nt=y.colorSpace===Li||bt===Q?n.NONE:n.BROWSER_DEFAULT_WEBGL;e.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),e.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),e.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),e.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,nt);let gt=y.isCompressedTexture||y.image[0].isCompressedTexture,C=y.image[0]&&y.image[0].isDataTexture,tt=[];for(let yt=0;yt<6;yt++)!gt&&!C?tt[yt]=v(y.image[yt],!0,s.maxCubemapSize):tt[yt]=C?y.image[yt].image:y.image[yt],tt[yt]=Dt(y,tt[yt]);let J=tt[0],dt=r.convert(y.format,y.colorSpace),ft=r.convert(y.type),_t=E(y.internalFormat,dt,ft,y.normalized,y.colorSpace),Lt=y.isVideoTexture!==!0,$t=pt.__version===void 0||lt===!0,ut=it.dataReady,Nt=M(y,J);le(n.TEXTURE_CUBE_MAP,y);let Ht;if(y.isDepthTexture){if(_t=_(y.format===Pi,y.type),$t)if(Lt)e.texStorage2D(n.TEXTURE_CUBE_MAP,1,_t,J.width,J.height);else for(let yt=0;yt<6;yt++)e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,_t,J.width,J.height,0,dt,ft,null)}else if(gt){Lt&&$t&&e.texStorage2D(n.TEXTURE_CUBE_MAP,Nt,_t,J.width,J.height);for(let yt=0;yt<6;yt++){Ht=tt[yt].mipmaps;for(let se=0;se<Ht.length;se++){let Ce=Ht[se];y.format!==jn?dt!==null?Lt?ut&&e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,se,0,0,Ce.width,Ce.height,dt,Ce.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,se,_t,Ce.width,Ce.height,0,Ce.data):Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Lt?ut&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,se,0,0,Ce.width,Ce.height,dt,ft,Ce.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,se,_t,Ce.width,Ce.height,0,dt,ft,Ce.data)}}}else{if(Ht=y.mipmaps,Lt&&$t){Ht.length>0&&Nt++;let yt=kt(tt[0]);e.texStorage2D(n.TEXTURE_CUBE_MAP,Nt,_t,yt.width,yt.height)}for(let yt=0;yt<6;yt++)if(C){Lt?ut&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,tt[yt].width,tt[yt].height,dt,ft,tt[yt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,_t,tt[yt].width,tt[yt].height,0,dt,ft,tt[yt].data);for(let se=0;se<Ht.length;se++){let Dn=Ht[se].image[yt].image;Lt?ut&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,se+1,0,0,Dn.width,Dn.height,dt,ft,Dn.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,se+1,_t,Dn.width,Dn.height,0,dt,ft,Dn.data)}}else{Lt?ut&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,0,0,dt,ft,tt[yt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,_t,dt,ft,tt[yt]);for(let se=0;se<Ht.length;se++){let Ce=Ht[se];Lt?ut&&e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,se+1,0,0,dt,ft,Ce.image[yt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+yt,se+1,_t,dt,ft,Ce.image[yt])}}}A(y)&&y.mipmapsAutoUpdate===!0&&b(n.TEXTURE_CUBE_MAP),pt.__version=it.version,y.onUpdate&&y.onUpdate(y)}R.__version=y.version}function Bt(R,y,H,lt,it,pt){let bt=r.convert(H.format,H.colorSpace),Q=r.convert(H.type),nt=E(H.internalFormat,bt,Q,H.normalized,H.colorSpace),gt=i.get(y),C=i.get(H);if(C.__renderTarget=y,!gt.__hasExternalTextures){let tt=Math.max(1,y.width>>pt),J=Math.max(1,y.height>>pt);it===n.TEXTURE_3D||it===n.TEXTURE_2D_ARRAY?e.texImage3D(it,pt,nt,tt,J,y.depth,0,bt,Q,null):e.texImage2D(it,pt,nt,tt,J,0,bt,Q,null)}e.bindFramebuffer(n.FRAMEBUFFER,R),mt(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,lt,it,C.__webglTexture,0,_e(y)):(it===n.TEXTURE_2D||it>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,lt,it,C.__webglTexture,pt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function pn(R,y,H){if(n.bindRenderbuffer(n.RENDERBUFFER,R),y.depthBuffer){let lt=y.depthTexture,it=lt&&lt.isDepthTexture?lt.type:null,pt=_(y.stencilBuffer,it),bt=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;mt(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_e(y),pt,y.width,y.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,_e(y),pt,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,pt,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,bt,n.RENDERBUFFER,R)}else{let lt=y.textures;for(let it=0;it<lt.length;it++){let pt=lt[it],bt=r.convert(pt.format,pt.colorSpace),Q=r.convert(pt.type),nt=E(pt.internalFormat,bt,Q,pt.normalized,pt.colorSpace);mt(y)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_e(y),nt,y.width,y.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,_e(y),nt,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,nt,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ge(R,y,H){let lt=y.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(n.FRAMEBUFFER,R),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let it=i.get(y.depthTexture);it.__renderTarget=y;let pt=lt?y.depthTexture.image[0]:y.depthTexture.image;(!it.__webglTexture||pt.width!==y.width||pt.height!==y.height)&&(pt.width=y.width,pt.height=y.height,y.depthTexture.needsUpdate=!0),lt?Mt(y.depthTexture,0):ht(y.depthTexture,0);let bt=it.__webglTexture,Q=_e(y),nt=lt?n.TEXTURE_CUBE_MAP_POSITIVE_X+H:n.TEXTURE_2D,gt=y.depthTexture.format===Pi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(y.depthTexture.format===Ri)mt(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,gt,nt,bt,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,gt,nt,bt,0);else if(y.depthTexture.format===Pi)mt(y)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,gt,nt,bt,0,Q):n.framebufferTexture2D(n.FRAMEBUFFER,gt,nt,bt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Xe(R){let y=i.get(R),H=R.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==R.depthTexture){let lt=R.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),lt){let it=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,lt.removeEventListener("dispose",it)};lt.addEventListener("dispose",it),y.__depthDisposeCallback=it}y.__boundDepthTexture=lt}if(R.depthTexture&&!y.__autoAllocateDepthBuffer)if(H)for(let lt=0;lt<6;lt++)ge(y.__webglFramebuffer[lt],R,lt);else R.texture.mipmaps.length>0?ge(y.__webglFramebuffer[0],R,0):ge(y.__webglFramebuffer,R,0);else if(H){y.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)if(e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[lt]),y.__webglDepthbuffer[lt]===void 0)y.__webglDepthbuffer[lt]=n.createRenderbuffer(),pn(y.__webglDepthbuffer[lt],R,!1);else{let it=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=y.__webglDepthbuffer[lt];n.bindRenderbuffer(n.RENDERBUFFER,pt),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,pt)}}else if(R.texture.mipmaps.length>0?e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):e.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),pn(y.__webglDepthbuffer,R,!1);else{let it=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pt=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,pt),n.framebufferRenderbuffer(n.FRAMEBUFFER,it,n.RENDERBUFFER,pt)}e.bindFramebuffer(n.FRAMEBUFFER,null)}function on(R,y,H){let lt=i.get(R);y!==void 0&&Bt(lt.__webglFramebuffer,R,R.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&Xe(R)}function Pe(R){let y=R.texture,H=i.get(R),lt=i.get(y);R.addEventListener("dispose",B),z(R);let it=R.textures,pt=R.isWebGLCubeRenderTarget===!0,bt=it.length>1;if(bt||(lt.__webglTexture===void 0&&(lt.__webglTexture=n.createTexture()),lt.__version=y.version,a.memory.textures++),pt){H.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(y.mipmaps.length>0){H.__webglFramebuffer[Q]=[];for(let nt=0;nt<y.mipmaps.length;nt++)H.__webglFramebuffer[Q][nt]=n.createFramebuffer()}else H.__webglFramebuffer[Q]=n.createFramebuffer()}else{if(y.mipmaps.length>0){H.__webglFramebuffer=[];for(let Q=0;Q<y.mipmaps.length;Q++)H.__webglFramebuffer[Q]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(bt)for(let Q=0,nt=it.length;Q<nt;Q++){let gt=i.get(it[Q]);gt.__webglTexture===void 0&&(gt.__webglTexture=n.createTexture(),a.memory.textures++)}if(R.samples>0&&mt(R)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let Q=0;Q<it.length;Q++){let nt=it[Q];H.__webglColorRenderbuffer[Q]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[Q]);let gt=r.convert(nt.format,nt.colorSpace),C=r.convert(nt.type),tt=E(nt.internalFormat,gt,C,nt.normalized,nt.colorSpace,R.isXRRenderTarget===!0),J=_e(R);n.renderbufferStorageMultisample(n.RENDERBUFFER,J,tt,R.width,R.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Q,n.RENDERBUFFER,H.__webglColorRenderbuffer[Q])}n.bindRenderbuffer(n.RENDERBUFFER,null),R.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),pn(H.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(pt){e.bindTexture(n.TEXTURE_CUBE_MAP,lt.__webglTexture),le(n.TEXTURE_CUBE_MAP,y);for(let Q=0;Q<6;Q++)if(y.mipmaps.length>0)for(let nt=0;nt<y.mipmaps.length;nt++)Bt(H.__webglFramebuffer[Q][nt],R,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,nt);else Bt(H.__webglFramebuffer[Q],R,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);A(y)?b(n.TEXTURE_CUBE_MAP):y.mipmaps.length>0&&n.texParameteri(n.TEXTURE_CUBE_MAP,n.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}else if(bt){for(let Q=0,nt=it.length;Q<nt;Q++){let gt=it[Q],C=i.get(gt),tt=n.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(tt=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(tt,C.__webglTexture),le(tt,gt),Bt(H.__webglFramebuffer,R,gt,n.COLOR_ATTACHMENT0+Q,tt,0),A(gt)&&b(tt)}e.unbindTexture()}else{let Q=n.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Q=R.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),e.bindTexture(Q,lt.__webglTexture),le(Q,y),y.mipmaps.length>0)for(let nt=0;nt<y.mipmaps.length;nt++)Bt(H.__webglFramebuffer[nt],R,y,n.COLOR_ATTACHMENT0,Q,nt);else Bt(H.__webglFramebuffer,R,y,n.COLOR_ATTACHMENT0,Q,0);A(y)?b(Q):y.mipmaps.length>0&&n.texParameteri(Q,n.TEXTURE_MAX_LEVEL,y.mipmaps.length-1),e.unbindTexture()}R.depthBuffer&&Xe(R)}function F(R){let y=R.textures;for(let H=0,lt=y.length;H<lt;H++){let it=y[H];if(A(it)&&it.mipmapsAutoUpdate===!0){let pt=T(R),bt=i.get(it).__webglTexture;e.bindTexture(pt,bt),b(pt),e.unbindTexture()}}}let Qe=[];function ye(R){if(R.samples>0){if(mt(R)===!1){let y=R.textures,H=R.width,lt=R.height,it=n.COLOR_BUFFER_BIT,pt=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,bt=i.get(R),Q=y.length>1;if(Q)for(let gt=0;gt<y.length;gt++)e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),R.texture.mipmaps.length>0?e.bindFramebuffer(n.DRAW_FRAMEBUFFER,bt.__webglFramebuffer[0]):e.bindFramebuffer(n.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let gt=0;gt<y.length;gt++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(it|=n.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(it|=n.STENCIL_BUFFER_BIT)),Q){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,bt.__webglColorRenderbuffer[gt]);let C=i.get(y[gt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,C,0)}n.blitFramebuffer(0,0,H,lt,0,0,H,lt,it,n.NEAREST),l===!0&&(Qe.length=0,Qe.push(n.COLOR_ATTACHMENT0+gt),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&Qe.push(pt),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Qe))}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Q)for(let gt=0;gt<y.length;gt++){e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.RENDERBUFFER,bt.__webglColorRenderbuffer[gt]);let C=i.get(y[gt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,bt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+gt,n.TEXTURE_2D,C,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&l){let y=R.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function _e(R){return Math.min(s.maxSamples,R.samples)}function mt(R){let y=i.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function ve(R){let y=a.render.frame;h.get(R)!==y&&(h.set(R,y),R.update())}function Dt(R,y){let H=R.colorSpace,lt=R.format,it=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||H!==Rr&&H!==Li&&(re.getTransfer(H)===pe?(lt!==jn||it!==Ln)&&Ft("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Gt("WebGLTextures: Unsupported texture color space:",H)),y}function kt(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=At,this.resetTextureUnits=$,this.getTextureUnits=W,this.setTextureUnits=ot,this.setTexture2D=ht,this.setTexture2DArray=ct,this.setTexture3D=Ct,this.setTextureCube=Mt,this.rebindTextures=on,this.setupRenderTarget=Pe,this.updateRenderTargetMipmap=F,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=Bt,this.useMultisampledRTT=mt,this.dispose=Y}function Zv(n,t){function e(i,s=Li){let r,a=re.getTransfer(s);if(i===Ln)return n.UNSIGNED_BYTE;if(i===Co)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Io)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Vc)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Wc)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Gc)return n.BYTE;if(i===Hc)return n.SHORT;if(i===js)return n.UNSIGNED_SHORT;if(i===Ro)return n.INT;if(i===Zn)return n.UNSIGNED_INT;if(i===Kn)return n.FLOAT;if(i===Jn)return n.HALF_FLOAT;if(i===Xc)return n.ALPHA;if(i===qc)return n.RGB;if(i===jn)return n.RGBA;if(i===Ri)return n.DEPTH_COMPONENT;if(i===Pi)return n.DEPTH_STENCIL;if(i===Yc)return n.RED;if(i===Po)return n.RED_INTEGER;if(i===Ki)return n.RG;if(i===Lo)return n.RG_INTEGER;if(i===Do)return n.RGBA_INTEGER;if(i===Yr||i===$r||i===Zr||i===Kr)if(a===pe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Yr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===$r)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Yr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===$r)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Zr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Kr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===No||i===Uo||i===Oo||i===Fo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===No)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Uo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Oo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Fo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ko||i===Bo||i===zo||i===Go||i===Ho||i===Jr||i===Vo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ko||i===Bo)return a===pe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===zo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Go)return r.COMPRESSED_R11_EAC;if(i===Ho)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Jr)return r.COMPRESSED_RG11_EAC;if(i===Vo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Wo||i===Xo||i===qo||i===Yo||i===$o||i===Zo||i===Ko||i===Jo||i===jo||i===Qo||i===tl||i===el||i===nl||i===il)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Wo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Xo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===qo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Yo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===$o)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Zo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ko)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Jo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===jo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Qo)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===tl)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===el)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===nl)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===il)return a===pe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===sl||i===rl||i===al)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===sl)return a===pe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===rl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===al)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===ol||i===ll||i===jr||i===cl)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===ol)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ll)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===jr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===cl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===fs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:e}}var Kv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Jv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,gh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){let i=new zr(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,i=new Bn({vertexShader:Kv,fragmentShader:Jv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new oi(new Gr(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},_h=class extends Yn{constructor(t,e){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null,x=typeof XRWebGLBinding<"u",m=new gh,f={},v=e.getContextAttributes(),A=null,b=null,T=[],E=[],_=new Yt,M=null,z=null,P=new cn;P.viewport=new Ee;let N=new cn;N.viewport=new Ee;let B=[P,N],Z=new wo,I=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let ht=T[K];return ht===void 0&&(ht=new Xs,T[K]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(K){let ht=T[K];return ht===void 0&&(ht=new Xs,T[K]=ht),ht.getGripSpace()},this.getHand=function(K){let ht=T[K];return ht===void 0&&(ht=new Xs,T[K]=ht),ht.getHandSpace()};function et(K){let ht=E.indexOf(K.inputSource);if(ht===-1)return;let ct=T[ht];ct!==void 0&&(ct.update(K.inputSource,K.frame,c||a),ct.dispatchEvent({type:K.type,data:K.inputSource}))}function k(){s.removeEventListener("select",et),s.removeEventListener("selectstart",et),s.removeEventListener("selectend",et),s.removeEventListener("squeeze",et),s.removeEventListener("squeezestart",et),s.removeEventListener("squeezeend",et),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",j);for(let K=0;K<T.length;K++){let ht=E[K];ht!==null&&(E[K]=null,T[K].disconnect(ht))}I=null,Y=null,m.reset();for(let K in f)delete f[K];if(t.setRenderTarget(A),p=null,d=null,u=null,s=null,b=null,At.stop(),i.isPresenting=!1,t.setPixelRatio(M),t.setSize(_.width,_.height,!1),z!==null){let K=z.camera;K.fov=z.fov,K.zoom=z.zoom,K.updateProjectionMatrix(),z=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){r=K,i.isPresenting===!0&&Ft("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){o=K,i.isPresenting===!0&&Ft("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(K){c=K},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(s,e)),u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(K){if(s=K,s!==null){if(A=t.getRenderTarget(),s.addEventListener("select",et),s.addEventListener("selectstart",et),s.addEventListener("selectend",et),s.addEventListener("squeeze",et),s.addEventListener("squeezestart",et),s.addEventListener("squeezeend",et),s.addEventListener("end",k),s.addEventListener("inputsourceschange",j),v.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(_),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ct=null,Ct=null,Mt=null;v.depth&&(Mt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ct=v.stencil?Pi:Ri,Ct=v.stencil?fs:Zn);let Xt={colorFormat:e.RGBA8,depthFormat:Mt,scaleFactor:r};u=this.getBinding(),d=u.createProjectionLayer(Xt),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),b=new Cn(d.textureWidth,d.textureHeight,{format:jn,type:Ln,depthTexture:new Ci(d.textureWidth,d.textureHeight,Ct,void 0,void 0,void 0,void 0,void 0,void 0,ct),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let ct={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,ct),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),b=new Cn(p.framebufferWidth,p.framebufferHeight,{format:jn,type:Ln,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),At.setContext(s),At.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(K){for(let ht=0;ht<K.removed.length;ht++){let ct=K.removed[ht],Ct=E.indexOf(ct);Ct>=0&&(E[Ct]=null,T[Ct].disconnect(ct))}for(let ht=0;ht<K.added.length;ht++){let ct=K.added[ht],Ct=E.indexOf(ct);if(Ct===-1){for(let Xt=0;Xt<T.length;Xt++)if(Xt>=E.length){E.push(ct),Ct=Xt;break}else if(E[Xt]===null){E[Xt]=ct,Ct=Xt;break}if(Ct===-1)break}let Mt=T[Ct];Mt&&Mt.connect(ct)}}function D(K,ht){ht===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(ht.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(s===null)return;let ht=K.near,ct=K.far;m.texture!==null&&(m.depthNear>0&&(ht=m.depthNear),m.depthFar>0&&(ct=m.depthFar)),Z.near=N.near=P.near=ht,Z.far=N.far=P.far=ct,(I!==Z.near||Y!==Z.far)&&(s.updateRenderState({depthNear:Z.near,depthFar:Z.far}),I=Z.near,Y=Z.far),Z.layers.mask=K.layers.mask|6,P.layers.mask=Z.layers.mask&-5,N.layers.mask=Z.layers.mask&-3;let Ct=K.parent,Mt=Z.cameras;D(Z,Ct);for(let Xt=0;Xt<Mt.length;Xt++)D(Mt[Xt],Ct);Z.projectionMatrix.copy(P.projectionMatrix),Z.projectionMatrixInverse.copy(P.projectionMatrixInverse),z===null&&K.isPerspectiveCamera&&(z={camera:K,fov:K.fov,zoom:K.zoom}),$(K,Z,Ct)};function $(K,ht,ct){ct===null?K.matrix.copy(ht.matrixWorld):(K.matrix.copy(ct.matrixWorld),K.matrix.invert(),K.matrix.multiply(ht.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(ht.projectionMatrix),K.projectionMatrixInverse.copy(ht.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=Vs*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return Z},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(K){l=K,d!==null&&(d.fixedFoveation=K),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=K)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(Z)},this.getCameraTexture=function(K){return f[K]};let W=null;function ot(K,ht){if(h=ht.getViewerPose(c||a),g=ht,h!==null){let ct=h.views;p!==null&&(t.setRenderTargetFramebuffer(b,p.framebuffer),t.setRenderTarget(b));let Ct=!1;ct.length!==Z.cameras.length&&(Z.cameras.length=0,Ct=!0);for(let Ot=0;Ot<ct.length;Ot++){let le=ct[Ot],he=null;if(p!==null)he=p.getViewport(le);else{let Le=u.getViewSubImage(d,le);he=Le.viewport,Ot===0&&(t.setRenderTargetTextures(b,Le.colorTexture,Le.depthStencilTexture),t.setRenderTarget(b))}let Jt=B[Ot];Jt===void 0&&(Jt=new cn,Jt.layers.enable(Ot),Jt.viewport=new Ee,B[Ot]=Jt),Jt.matrix.fromArray(le.transform.matrix),Jt.matrix.decompose(Jt.position,Jt.quaternion,Jt.scale),Jt.projectionMatrix.fromArray(le.projectionMatrix),Jt.projectionMatrixInverse.copy(Jt.projectionMatrix).invert(),Jt.viewport.set(he.x,he.y,he.width,he.height),Ot===0&&(Z.matrix.copy(Jt.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale)),Ct===!0&&Z.cameras.push(Jt)}let Mt=s.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){u=i.getBinding();let Ot=u.getDepthInformation(ct[0]);Ot&&Ot.isValid&&Ot.texture&&m.init(Ot,s.renderState)}if(Mt&&Mt.includes("camera-access")&&x){t.state.unbindTexture(),u=i.getBinding();for(let Ot=0;Ot<ct.length;Ot++){let le=ct[Ot].camera;if(le){let he=f[le];he||(he=new zr,f[le]=he);let Jt=u.getCameraImage(le);he.sourceTexture=Jt}}}}for(let ct=0;ct<T.length;ct++){let Ct=E[ct],Mt=T[ct];Ct!==null&&Mt!==void 0&&Mt.update(Ct,ht,c||a)}W&&W(K,ht),ht.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ht}),g=null}let At=new pf;At.setAnimationLoop(ot),this.setAnimationLoop=function(K){W=K},this.dispose=function(){}}},jv=new Ae,wf=new Wt;wf.set(-1,0,0,0,1,0,0,0,1);function Qv(n,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,sh(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,v,A,b){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,b)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),x(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,v,A):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===un&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===un&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let v=t.get(f),A=v.envMap,b=v.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(jv.makeRotationFromEuler(b)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(wf),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,v,A){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*v,m.scale.value=A*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,v){m.ior.value=f.ior,f.diffuseRoughness>0&&(m.diffuseRoughness.value=f.diffuseRoughness,f.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=f.diffuseRoughnessMap,e(f.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===un&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.retroreflectivity>0&&(m.retroreflectivity.value=f.retroreflectivity),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=f.iridescenceThicknessMaximum,f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function x(m,f){let v=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function tS(n,t,e,i){let s={},r={};function a(v,A){let b=A.program;i.uniformBlockBinding(v,b,s[v.id])}function o(v,A){let b=s[v.id];b===void 0&&(g(v),b=l(v),s[v.id]=b,v.addEventListener("dispose",m));let T=A.program;i.updateUBOMapping(v,T);let E=t.render.frame;r[v.id]!==E&&(c(v),r[v.id]=E)}function l(v){let A=n.createBuffer(),b=v.__size,T=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,A),n.bufferData(n.UNIFORM_BUFFER,b,T),n.bindBuffer(n.UNIFORM_BUFFER,null),A}function c(v){let A=s[v.id],b=v.uniforms,T=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,A);for(let E=0,_=b.length;E<_;E++){let M=b[E];if(Array.isArray(M))for(let z=0,P=M.length;z<P;z++)h(M[z],E,z,T);else h(M,E,0,T)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function h(v,A,b,T){if(d(v,A,b,T)===!0){let E=v.__offset,_=v.value;if(Array.isArray(_)){let M=0;for(let z=0;z<_.length;z++){let P=_[z],N=x(P,!0);u(P,v.__data,M),M+=N.storage/Float32Array.BYTES_PER_ELEMENT}}else u(_,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,E,v.__data)}}function u(v,A,b){typeof v=="number"||typeof v=="boolean"?A[b]=v:v.isMatrix3?(A[b]=v.elements[0],A[b+1]=v.elements[1],A[b+2]=v.elements[2],A[b+3]=0,A[b+4]=v.elements[3],A[b+5]=v.elements[4],A[b+6]=v.elements[5],A[b+7]=0,A[b+8]=v.elements[6],A[b+9]=v.elements[7],A[b+10]=v.elements[8],A[b+11]=0):ArrayBuffer.isView(v)?A.set(v.subarray(0,A.length-b),b):v.toArray(A,b)}function d(v,A,b,T){let E=v.value,_=A+"_"+b;if(Array.isArray(E)){T[_]===void 0&&(T[_]=[]);let M=T[_],z=!1;for(let P=0;P<E.length;P++)p(E[P],M,P)===!0&&(z=!0);return z}return p(E,T,_)}function p(v,A,b){if(A[b]===void 0)return typeof v=="number"||typeof v=="boolean"?A[b]=v:ArrayBuffer.isView(v)?A[b]=v.slice():A[b]=v.clone(),!0;{let T=A[b];if(typeof v=="number"||typeof v=="boolean"){if(T!==v)return A[b]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(T.equals(v)===!1)return T.copy(v),!0}}return!1}function g(v){let A=v.uniforms,b=0,T=16;for(let _=0,M=A.length;_<M;_++){let z=Array.isArray(A[_])?A[_]:[A[_]];for(let P=0,N=z.length;P<N;P++){let B=z[P],Z=Array.isArray(B.value)?B.value:[B.value],I=Array.isArray(A[_])||Array.isArray(B.value),Y=b;for(let k=0,j=Z.length;k<j;k++){let D=Z[k],$=x(D,I),W=b%T,ot=W%$.boundary,At=W+ot;b+=ot,At!==0&&T-At<$.storage&&(b+=T-At),k===0&&(Y=b),b+=$.storage}let et=B.type==="int"?Int32Array:B.type==="uint"?Uint32Array:Float32Array;B.__data=new et((b-Y)/Float32Array.BYTES_PER_ELEMENT),B.__offset=Y}}let E=b%T;return E>0&&(b+=T-E),v.__size=b,v.__cache={},this}function x(v,A){let b={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(b.boundary=4,b.storage=4):v.isVector2?(b.boundary=8,b.storage=8):v.isVector3||v.isColor?(b.boundary=16,b.storage=12):v.isVector4?(b.boundary=16,b.storage=16):v.isMatrix3?(b.boundary=16,b.storage=48):v.isMatrix4?(b.boundary=16,b.storage=64):v.isTexture?Ft("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(b.boundary=16,b.storage=v.byteLength):Ft("WebGLRenderer: Unsupported uniform value type.",v),A===!0&&(b.boundary=16,b.storage=Math.ceil(b.storage/16)*16),b}function m(v){let A=v.target;A.removeEventListener("dispose",m),n.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function f(){for(let v in s)n.deleteBuffer(s[v]);s={},r={}}return{bind:a,update:o,dispose:f}}var eS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),ui=null;function nS(){return ui===null&&(ui=new ao(eS,16,16,Ki,Jn),ui.name="DFG_LUT",ui.minFilter=hn,ui.magFilter=hn,ui.wrapS=ri,ui.wrapT=ri,ui.generateMipmaps=!1,ui.needsUpdate=!0),ui}var fl=class{constructor(t={}){let{canvas:e=Od(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:p=Ln}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;let x=p,m=new Set([Do,Lo,Po]),f=new Set([Ln,Zn,js,fs,Co,Io]),v=new Uint32Array(4),A=new Int32Array(4),b={textures:[],min:[],max:[],resolution:[]},T=null,E=null,_=[],M=[],z=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=hi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,N=!1,B=null,Z=null,I=null,Y=null;this._outputColorSpace=An;let et=0,k=0,j=null,D=-1,$=null,W=new Ee,ot=new Ee,At=null,K=new ie(0),ht=0,ct=e.width,Ct=e.height,Mt=1,Xt=null,Re=null,Ot=new Ee(0,0,ct,Ct),le=new Ee(0,0,ct,Ct),he=!1,Jt=new cs,Le=new oo,qt=!1,We=!1,Bt=new Ae,pn=new X,ge=new Ee,Xe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},on=!1;function Pe(){return j===null?Mt:1}let F=i;function Qe(S,L){return e.getContext(S,L)}let ye,_e,mt,ve,Dt,kt,R,y,H,lt,it,pt,bt,Q,nt,gt,C,tt,J,dt,ft,_t,Lt;try{let S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${"187"}`),e.addEventListener("webglcontextlost",Nt,!1),e.addEventListener("webglcontextrestored",Ht,!1),e.addEventListener("webglcontextcreationerror",yt,!1),F===null){let L="webgl2";if(F=Qe(L,S),F===null)throw Qe(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}$t()}catch(S){throw e.removeEventListener("webglcontextlost",Nt,!1),e.removeEventListener("webglcontextrestored",Ht,!1),e.removeEventListener("webglcontextcreationerror",yt,!1),Gt("WebGLRenderer: "+S.message),S}function $t(){ye=new fy(F),ye.init(),ft=new Zv(F,ye),_e=new ny(F,ye,t,ft),mt=new Yv(F,ye),_e.reversedDepthBuffer&&d&&mt.buffers.depth.setReversed(!0),Z=F.createFramebuffer(),I=F.createFramebuffer(),Y=F.createFramebuffer(),ve=new gy(F),Dt=new Dv,kt=new $v(F,ye,mt,Dt,_e,ft,ve),R=new dy(P),y=new x_(F),_t=new ty(F,y),H=new py(F,y,ve,_t),lt=new xy(F,H,y,_t,ve),tt=new _y(F,_e,kt),nt=new iy(Dt),it=new Lv(P,R,ye,_e,_t,nt),pt=new Qv(P,Dt),bt=new Uv,Q=new Gv(ye),C=new Qx(P,R,mt,lt,g,l),gt=new qv(P,lt,_e),Lt=new tS(F,ve,_e,mt),J=new ey(F,ye,ve),dt=new my(F,ye,ve),ve.programs=it.programs,P.capabilities=_e,P.extensions=ye,P.properties=Dt,P.renderLists=bt,P.shadowMap=gt,P.state=mt,P.info=ve}x!==Ln&&(z=new vy(x,e.width,e.height,o,s,r));let ut=new _h(P,F);this.xr=ut,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let S=ye.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=ye.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Mt},this.setPixelRatio=function(S){S!==void 0&&(Mt=S,this.setSize(ct,Ct,!1))},this.getSize=function(S){return S.set(ct,Ct)},this.setSize=function(S,L,q=!0){if(ut.isPresenting){Ft("WebGLRenderer: Can't change size while VR device is presenting.");return}ct=S,Ct=L,e.width=Math.floor(S*Mt),e.height=Math.floor(L*Mt),q===!0&&(e.style.width=S+"px",e.style.height=L+"px"),z!==null&&z.setSize(e.width,e.height),this.setViewport(0,0,S,L)},this.getDrawingBufferSize=function(S){return S.set(ct*Mt,Ct*Mt).floor()},this.setDrawingBufferSize=function(S,L,q){ct=S,Ct=L,Mt=q,e.width=Math.floor(S*q),e.height=Math.floor(L*q),this.setViewport(0,0,S,L)},this.setEffects=function(S){if(x===Ln){Gt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let L=0;L<S.length;L++)if(S[L].isOutputPass===!0){Ft("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}z.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(W)},this.getViewport=function(S){return S.copy(Ot)},this.setViewport=function(S,L,q,G){S.isVector4?Ot.set(S.x,S.y,S.z,S.w):Ot.set(S,L,q,G),mt.viewport(W.copy(Ot).multiplyScalar(Pe()).round())},this.getScissor=function(S){return S.copy(le)},this.setScissor=function(S,L,q,G){S.isVector4?le.set(S.x,S.y,S.z,S.w):le.set(S,L,q,G),mt.scissor(ot.copy(le).multiplyScalar(Pe()).round())},this.getScissorTest=function(){return he},this.setScissorTest=function(S){mt.setScissorTest(he=S)},this.setOpaqueSort=function(S){Xt=S},this.setTransparentSort=function(S){Re=S},this.getClearColor=function(S){return S.copy(C.getClearColor())},this.setClearColor=function(){C.setClearColor(...arguments)},this.getClearAlpha=function(){return C.getClearAlpha()},this.setClearAlpha=function(){C.setClearAlpha(...arguments)},this.clear=function(S=!0,L=!0,q=!0){let G=0;if(S){let V=!1;if(j!==null){let St=j.texture.format;V=m.has(St)}if(V){let St=j.texture.type,Et=f.has(St),vt=C.getClearColor(),wt=C.getClearAlpha(),Pt=vt.r,Vt=vt.g,jt=vt.b;Et?(v[0]=Pt,v[1]=Vt,v[2]=jt,v[3]=wt,F.clearBufferuiv(F.COLOR,0,v)):(A[0]=Pt,A[1]=Vt,A[2]=jt,A[3]=wt,F.clearBufferiv(F.COLOR,0,A))}else G|=F.COLOR_BUFFER_BIT}L&&(G|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(G|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&F.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),B=S},this.dispose=function(){e.removeEventListener("webglcontextlost",Nt,!1),e.removeEventListener("webglcontextrestored",Ht,!1),e.removeEventListener("webglcontextcreationerror",yt,!1),C.dispose(),bt.dispose(),Q.dispose(),kt.dispose(),Dt.dispose(),R.dispose(),lt.dispose(),H.dispose(),_t.dispose(),Lt.dispose(),it.dispose(),ut.dispose(),ut.removeEventListener("sessionstart",ar),ut.removeEventListener("sessionend",vs),mi.stop()};function Nt(S){S.preventDefault(),Qc("WebGLRenderer: Context Lost."),N=!0}function Ht(){Qc("WebGLRenderer: Context Restored."),N=!1;let S=ve.autoReset,L=gt.enabled,q=gt.autoUpdate,G=gt.needsUpdate,V=gt.type;$t(),ve.autoReset=S,gt.enabled=L,gt.autoUpdate=q,gt.needsUpdate=G,gt.type=V}function yt(S){Gt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function se(S){let L=S.target;L.removeEventListener("dispose",se),Ce(L)}function Ce(S){Dn(S),Dt.remove(S)}function Dn(S){let L=Dt.get(S).programs;L!==void 0&&(L.forEach(function(q){it.releaseProgram(q)}),S.isShaderMaterial&&it.releaseShaderCache(S))}this.renderBufferDirect=function(S,L,q,G,V,St){L===null&&(L=Xe);let Et=V.isMesh&&V.matrixWorld.determinantAffine()<0,vt=Al(S,L,q,G,V);mt.setMaterial(G,Et);let wt=q.index,Pt=1;if(G.wireframe===!0){if(wt=H.getWireframeAttribute(q),wt===void 0)return;Pt=2}let Vt=q.drawRange,jt=q.attributes.position,It=Vt.start*Pt,Qt=(Vt.start+Vt.count)*Pt;St!==null&&(It=Math.max(It,St.start*Pt),Qt=Math.min(Qt,(St.start+St.count)*Pt)),wt!==null?(It=Math.max(It,0),Qt=Math.min(Qt,wt.count)):jt!=null&&(It=Math.max(It,0),Qt=Math.min(Qt,jt.count));let Te=Qt-It;if(Te<0||Te===1/0)return;_t.setup(V,G,vt,q,wt);let xe,ue=J;if(wt!==null&&(xe=y.get(wt),ue=dt,ue.setIndex(xe)),V.isMesh)G.wireframe===!0?(mt.setLineWidth(G.wireframeLinewidth*Pe()),ue.setMode(F.LINES)):ue.setMode(F.TRIANGLES);else if(V.isLine){let De=G.linewidth;De===void 0&&(De=1),mt.setLineWidth(De*Pe()),V.isLineSegments?ue.setMode(F.LINES):V.isLineLoop?ue.setMode(F.LINE_LOOP):ue.setMode(F.LINE_STRIP)}else V.isPoints?ue.setMode(F.POINTS):V.isSprite&&ue.setMode(F.TRIANGLES);if(V.isBatchedMesh)if(ye.get("WEBGL_multi_draw"))ue.renderMultiDraw(V._multiDrawStarts,V._multiDrawCounts,V._multiDrawCount);else{let De=V._multiDrawStarts,Rt=V._multiDrawCounts,Fe=V._multiDrawCount,ae=wt?y.get(wt).bytesPerElement:1,Nn=Dt.get(G).currentProgram.getUniforms();for(let be=0;be<Fe;be++)Nn.setValue(F,"_gl_DrawID",be),ue.render(De[be]/ae,Rt[be])}else if(V.isInstancedMesh)ue.renderInstances(It,Te,V.count);else if(q.isInstancedBufferGeometry){let De=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,Rt=Math.min(q.instanceCount,De);ue.renderInstances(It,Te,Rt)}else ue.render(It,Te)};function ca(S,L,q,G){B!==null&&S.isNodeMaterial&&B.setObject(G,S),qt===!0&&nt.setState(S,q,!1),S.transparent===!0&&S.side===ci&&S.forceSinglePass===!1?(S.side=un,S.needsUpdate=!0,Di(S,L,G),S.side=Zi,S.needsUpdate=!0,Di(S,L,G),S.side=ci):Di(S,L,G)}this.compile=function(S,L,q=null){q===null&&(q=S),B!==null&&B.renderStart(S,L,q),E=Q.get(q),E.init(L),M.push(E),q.traverseVisible(function(V){V.isLight&&V.layers.test(L.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),S!==q&&S.traverseVisible(function(V){V.isLight&&V.layers.test(L.layers)&&(E.pushLight(V),V.castShadow&&E.pushShadow(V))}),E.setupLights(),B!==null&&B.updateLights(E.state.lightsArray),We=this.localClippingEnabled,qt=nt.init(this.clippingPlanes,We),qt===!0&&nt.setGlobalState(this.clippingPlanes,L),B!==null&&gt.render(E.state.shadowsArray,q,L);let G=new Set;return S.traverse(function(V){if(!(V.isMesh||V.isPoints||V.isLine||V.isSprite))return;let St=V.material;if(St)if(Array.isArray(St))for(let Et=0;Et<St.length;Et++){let vt=St[Et];ca(vt,q,L,V),G.add(vt)}else ca(St,q,L,V),G.add(St)}),E=M.pop(),B!==null&&B.renderEnd(),G},this.compileAsync=function(S,L,q=null){let G=this.compile(S,L,q);return new Promise(V=>{function St(){if(G.forEach(function(Et){let wt=Dt.get(Et).currentProgram;(wt===void 0||wt.isReady())&&G.delete(Et)}),G.size===0){V(S);return}setTimeout(St,10)}ye.get("KHR_parallel_shader_compile")!==null?St():setTimeout(St,10)})};let ys=null;function rr(S){ys&&ys(S)}function ar(){mi.stop()}function vs(){mi.start()}let mi=new pf;mi.setAnimationLoop(rr),typeof self<"u"&&mi.setContext(self),this.setAnimationLoop=function(S){ys=S,ut.setAnimationLoop(S),S===null?mi.stop():mi.start()},ut.addEventListener("sessionstart",ar),ut.addEventListener("sessionend",vs),this.render=function(S,L){if(L!==void 0&&L.isCamera!==!0){Gt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;B!==null&&B.renderStart(S,L);let q=ut.enabled===!0&&ut.isPresenting===!0,G=z!==null&&(j===null||q)&&z.begin(P,j);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),ut.enabled===!0&&ut.isPresenting===!0&&(z===null||z.isCompositing()===!1)&&(ut.cameraAutoUpdate===!0&&ut.updateCamera(L),L=ut.getCamera()),S.isScene===!0&&S.onBeforeRender(P,S,L,j),E=Q.get(S,M.length),E.init(L),E.state.textureUnits=kt.getTextureUnits(),M.push(E),Bt.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),L.isArrayCamera?Le.setFromArrayCamera(L):Jt.setFromProjectionMatrix(Bt,kn,L.reversedDepth),We=this.localClippingEnabled,qt=nt.init(this.clippingPlanes,We),T=bt.get(S,_.length),T.init(),_.push(T),this.info.render.frame++,ut.enabled===!0&&ut.isPresenting===!0){let Et=P.xr.getDepthSensingMesh();Et!==null&&gi(Et,L,-1/0,P.sortObjects)}gi(S,L,0,P.sortObjects),T.finish(),B!==null&&B.updateLights(E.state.lightsArray),P.sortObjects===!0&&T.sort(Xt,Re),on=ut.enabled===!1||ut.isPresenting===!1||ut.hasDepthSensing()===!1,on&&C.addToRenderList(T,S),this.info.autoReset===!0&&this.info.reset(),qt===!0&&nt.beginShadows();let V=E.state.shadowsArray;if(gt.render(V,S,L),qt===!0&&nt.endShadows(),(G&&z.hasRenderPass())===!1){let Et=T.opaque,vt=T.transmissive;if(E.setupLights(),L.isArrayCamera){let wt=L.cameras;if(vt.length>0)for(let Pt=0,Vt=wt.length;Pt<Vt;Pt++){let jt=wt[Pt];ua(Et,vt,S,jt)}on&&C.render(S);for(let Pt=0,Vt=wt.length;Pt<Vt;Pt++){let jt=wt[Pt];ha(T,S,jt,jt.viewport)}}else vt.length>0&&ua(Et,vt,S,L),on&&C.render(S),ha(T,S,L)}j!==null&&k===0&&(kt.updateMultisampleRenderTarget(j),kt.updateRenderTargetMipmap(j)),G&&z.end(P),S.isScene===!0&&S.onAfterRender(P,S,L),_t.resetDefaultState(),D=-1,$=null,M.pop(),M.length>0?(E=M[M.length-1],kt.setTextureUnits(E.state.textureUnits),qt===!0&&nt.setGlobalState(P.clippingPlanes,E.state.camera)):E=null,_.pop(),_.length>0?T=_[_.length-1]:T=null,B!==null&&B.renderEnd()};function gi(S,L,q,G){if(S.visible===!1)return;if(S.layers.test(L.layers)){if(S.isGroup)q=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(L);else if(S.isLight)E.pushLight(S),S.castShadow&&E.pushShadow(S);else if(S.isSprite){let Et=L.isArrayCamera?Le:Jt;if(!S.frustumCulled||S.intersectsFrustum(Et)){G&&ge.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Bt);let vt=lt.update(S),wt=S.material;wt.visible&&T.push(S,vt,wt,q,ge.z,null,L)}}else if(S.isMesh||S.isLine||S.isPoints){let Et=L.isArrayCamera?Le:Jt;if(!S.frustumCulled||S.intersectsFrustum(Et)){let vt=lt.update(S),wt=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),ge.copy(S.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),ge.copy(vt.boundingSphere.center)),ge.applyMatrix4(S.matrixWorld).applyMatrix4(Bt)),Array.isArray(wt)){let Pt=vt.groups;for(let Vt=0,jt=Pt.length;Vt<jt;Vt++){let It=Pt[Vt],Qt=wt[It.materialIndex];Qt&&Qt.visible&&T.push(S,vt,Qt,q,ge.z,It,L)}}else wt.visible&&T.push(S,vt,wt,q,ge.z,null,L)}}}let St=S.children;for(let Et=0,vt=St.length;Et<vt;Et++)gi(St[Et],L,q,G)}function ha(S,L,q,G){let{opaque:V,transmissive:St,transparent:Et}=S;E.setupLightsView(q),qt===!0&&nt.setGlobalState(P.clippingPlanes,q),G&&mt.viewport(W.copy(G)),V.length>0&&Se(V,L,q),St.length>0&&Se(St,L,q),Et.length>0&&Se(Et,L,q),mt.buffers.depth.setTest(!0),mt.buffers.depth.setMask(!0),mt.buffers.color.setMask(!0),mt.setPolygonOffset(!1)}function ua(S,L,q,G){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[G.id]===void 0){let It=ye.has("EXT_color_buffer_half_float")||ye.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[G.id]=new Cn(1,1,{generateMipmaps:!0,type:It?Jn:Ln,minFilter:Ii,samples:Math.max(4,_e.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:re.workingColorSpace})}let St=E.state.transmissionRenderTarget[G.id],Et=G.viewport||W;St.setSize(Et.z*P.transmissionResolutionScale,Et.w*P.transmissionResolutionScale);let vt=P.getRenderTarget(),wt=P.getActiveCubeFace(),Pt=P.getActiveMipmapLevel();P.setRenderTarget(St),P.getClearColor(K),ht=P.getClearAlpha(),ht<1&&P.setClearColor(16777215,.5),P.clear(),on&&C.render(q);let Vt=P.toneMapping;P.toneMapping=hi;let jt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),qt===!0&&nt.setGlobalState(P.clippingPlanes,G),Se(S,q,G),kt.updateMultisampleRenderTarget(St),kt.updateRenderTargetMipmap(St),ye.has("WEBGL_multisampled_render_to_texture")===!1){let It=!1;for(let Qt=0,Te=L.length;Qt<Te;Qt++){let xe=L[Qt],{object:ue,geometry:De,material:Rt,group:Fe}=xe;if(Rt.side===ci&&ue.layers.test(G.layers)){let ae=Rt.side;Rt.side=un,Rt.needsUpdate=!0,_i(ue,q,G,De,Rt,Fe),Rt.side=ae,Rt.needsUpdate=!0,It=!0}}It===!0&&(kt.updateMultisampleRenderTarget(St),kt.updateRenderTargetMipmap(St))}P.setRenderTarget(vt,wt,Pt),P.setClearColor(K,ht),jt!==void 0&&(G.viewport=jt),P.toneMapping=Vt}function Se(S,L,q){let G=L.isScene===!0?L.overrideMaterial:null;for(let V=0,St=S.length;V<St;V++){let Et=S[V],{object:vt,geometry:wt,group:Pt}=Et,Vt=Et.material;Vt.allowOverride===!0&&G!==null&&(Vt=G),vt.layers.test(q.layers)&&_i(vt,L,q,wt,Vt,Pt)}}function _i(S,L,q,G,V,St){B!==null&&V.isNodeMaterial&&B.setObject(S,V),S.onBeforeRender(P,L,q,G,V,St),S.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),V.onBeforeRender(P,L,q,G,S,St),V.transparent===!0&&V.side===ci&&V.forceSinglePass===!1?(V.side=un,V.needsUpdate=!0,P.renderBufferDirect(q,L,G,V,S,St),V.side=Zi,V.needsUpdate=!0,P.renderBufferDirect(q,L,G,V,S,St),V.side=ci):P.renderBufferDirect(q,L,G,V,S,St),S.onAfterRender(P,L,q,G,V,St)}function da(S){let L=0;for(let q of S)q.texture!==null&&L++;return L}function Di(S,L,q){L.isScene!==!0&&(L=Xe);let G=Dt.get(S),V=E.state.lights,St=E.state.shadowsArray,Et=V.state.version,vt=it.getParameters(S,V.state,St,L,q,E.state.lightProbeGridArray),wt=it.getProgramCacheKey(vt),Pt=G.programs;G.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?L.environment:null,G.fog=L.fog;let Vt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;G.envMap=R.get(S.envMap||G.environment,Vt),G.envMapRotation=G.environment!==null&&S.envMap===null?L.environmentRotation:S.envMapRotation,Pt===void 0&&(S.addEventListener("dispose",se),Pt=new Map,G.programs=Pt,G.programVariants=new Map);let jt=Pt.get(wt);if(jt!==void 0){if(G.currentProgram===jt&&G.lightsStateVersion===Et)return cr(S,vt),jt}else vt.uniforms=it.getUniforms(S),B!==null&&S.isNodeMaterial&&B.build(S,q,vt),S.onBeforeCompile(vt,P),jt=it.acquireProgram(vt,wt),Pt.set(wt,jt),G.uniforms=vt.uniforms;let It=G.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(It.clippingPlanes=nt.uniform),cr(S,vt),G.needsLights=Rl(S),G.lightsStateVersion=Et,G.needsLights&&(It.ambientLightColor.value=V.state.ambient,It.lightProbe.value=V.state.probe,It.sunLights.value=V.state.sun,It.sunLightShadows.value=V.state.sunShadow,It.directionalLights.value=V.state.directional,It.directionalLightShadows.value=V.state.directionalShadow,It.spotLights.value=V.state.spot,It.spotLightShadows.value=V.state.spotShadow,It.rectAreaLights.value=V.state.rectArea,It.ltc_1.value=V.state.rectAreaLTC1,It.ltc_2.value=V.state.rectAreaLTC2,It.pointLights.value=V.state.point,It.pointLightShadows.value=V.state.pointShadow,It.hemisphereLights.value=V.state.hemi,It.sunShadowMatrix.value=V.state.sunShadowMatrix,It.sunShadowCascade.value=V.state.sunShadowCascade,It.directionalShadowMatrix.value=V.state.directionalShadowMatrix,It.spotLightMatrix.value=V.state.spotLightMatrix,It.spotLightMap.value=V.state.spotLightMap,It.pointShadowMatrix.value=V.state.pointShadowMatrix),G.numLightProbeGrids=da(E.state.lightProbeGridArray),G.currentProgram=jt,G.uniformsList=null,jt}function or(S,L,q,G,V){let St=Dt.get(S),Et=St.currentProgram.id+","+G+","+V,vt=St.programVariants.get(Et);return vt===void 0?(vt=Di(S,L,q),St.programVariants.set(Et,vt)):(St.currentProgram=vt,St.uniformsList=null,St.outputColorSpace=G,St.toneMapping=V),vt}function lr(S){if(S.uniformsList===null){let L=S.currentProgram.getUniforms();S.uniformsList=tr.seqWithValue(L.seq,S.uniforms)}return S.uniformsList}function cr(S,L){let q=Dt.get(S);q.outputColorSpace=L.outputColorSpace,q.batching=L.batching,q.batchingColor=L.batchingColor,q.instancing=L.instancing,q.instancingColor=L.instancingColor,q.instancingMorph=L.instancingMorph,q.skinning=L.skinning,q.morphTargets=L.morphTargets,q.morphNormals=L.morphNormals,q.morphColors=L.morphColors,q.morphTargetsCount=L.morphTargetsCount,q.numClippingPlanes=L.numClippingPlanes,q.numIntersection=L.numClipIntersection,q.vertexAlphas=L.vertexAlphas,q.vertexTangents=L.vertexTangents,q.toneMapping=L.toneMapping}function Al(S,L,q,G,V){L.isScene!==!0&&(L=Xe),kt.resetTextureUnits();let St=L.fog,Et=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?L.environment:null,vt=j===null?P.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:re.workingColorSpace,wt=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,Pt=R.get(G.envMap||Et,wt),Vt=G.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,jt=!!q.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),It=!!q.morphAttributes.position,Qt=!!q.morphAttributes.normal,Te=!!q.morphAttributes.color,xe=hi;G.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(xe=P.toneMapping);let ue=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,De=ue!==void 0?ue.length:0,Rt=Dt.get(G),Fe=E.state.lights;if(qt===!0&&(We===!0||S!==$)){let de=S===$&&G.id===D;nt.setState(G,S,de)}let ae=!1,Nn=!1;G.version===Rt.__version?Rt.needsLights&&Rt.lightsStateVersion!==Fe.state.version||V.isBatchedMesh&&Rt.batching===!1||!V.isBatchedMesh&&Rt.batching===!0||V.isBatchedMesh&&Rt.batchingColor===!0&&V._colorsTexture===null||V.isBatchedMesh&&Rt.batchingColor===!1&&V._colorsTexture!==null||V.isInstancedMesh&&Rt.instancing===!1||!V.isInstancedMesh&&Rt.instancing===!0||V.isSkinnedMesh&&Rt.skinning===!1||!V.isSkinnedMesh&&Rt.skinning===!0||V.isInstancedMesh&&Rt.instancingColor===!0&&V.instanceColor===null||V.isInstancedMesh&&Rt.instancingColor===!1&&V.instanceColor!==null||V.isInstancedMesh&&Rt.instancingMorph===!0&&V.morphTexture===null||V.isInstancedMesh&&Rt.instancingMorph===!1&&V.morphTexture!==null||Rt.envMap!==Pt||G.fog===!0&&Rt.fog!==St||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==nt.numPlanes||Rt.numIntersection!==nt.numIntersection)||Rt.vertexAlphas!==Vt||Rt.vertexTangents!==jt||Rt.morphTargets!==It||Rt.morphNormals!==Qt||Rt.morphColors!==Te||Rt.morphTargetsCount!==De||Rt.numLightProbeGrids!==da(E.state.lightProbeGridArray)?ae=!0:(Rt.outputColorSpace!==vt||Rt.toneMapping!==xe)&&(Nn=!0):(ae=!0,Rt.__version=G.version);let be=Rt.currentProgram;(ae===!0||Nn===!0)&&(be=Nn===!0?or(G,L,V,vt,xe):Di(G,L,V),B&&G.isNodeMaterial&&B.onUpdateProgram(G,be,Rt));let ei=!1,Ne=!1,xi=!1,te=be.getUniforms(),ke=Rt.uniforms;if(mt.useProgram(be.program)&&(ei=!0,Ne=!0,xi=!0),G.id!==D&&(D=G.id,Ne=!0),ei||$!==S){mt.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),te.setValue(F,"projectionMatrix",S.projectionMatrix),te.setValue(F,"viewMatrix",S.matrixWorldInverse);let Ie=te.map.cameraPosition;Ie!==void 0&&Ie.setValue(F,pn.setFromMatrixPosition(S.matrixWorld)),_e.logarithmicDepthBuffer&&te.setValue(F,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&te.setValue(F,"isOrthographic",S.isOrthographicCamera===!0),$!==S&&($=S,Ne=!0,xi=!0)}if(Rt.needsLights&&(Fe.state.sunShadowMap.length>0&&te.setValue(F,"sunShadowMap",Fe.state.sunShadowMap,kt),Fe.state.directionalShadowMap.length>0&&te.setValue(F,"directionalShadowMap",Fe.state.directionalShadowMap,kt),Fe.state.spotShadowMap.length>0&&te.setValue(F,"spotShadowMap",Fe.state.spotShadowMap,kt),Fe.state.pointShadowMap.length>0&&te.setValue(F,"pointShadowMap",Fe.state.pointShadowMap,kt)),V.isSkinnedMesh){te.setOptional(F,V,"bindMatrix"),te.setOptional(F,V,"bindMatrixInverse");let de=V.skeleton;de&&(de.boneTexture===null&&de.computeBoneTexture(),te.setValue(F,"boneTexture",de.boneTexture,kt))}V.isBatchedMesh&&(te.setOptional(F,V,"batchingTexture"),te.setValue(F,"batchingTexture",V._matricesTexture,kt),te.setOptional(F,V,"batchingIdTexture"),te.setValue(F,"batchingIdTexture",V._indirectTexture,kt),te.setOptional(F,V,"batchingColorTexture"),V._colorsTexture!==null&&te.setValue(F,"batchingColorTexture",V._colorsTexture,kt));let mn=q.morphAttributes;if((mn.position!==void 0||mn.normal!==void 0||mn.color!==void 0)&&tt.update(V,q,be),(Ne||Rt.receiveShadow!==V.receiveShadow)&&(Rt.receiveShadow=V.receiveShadow,te.setValue(F,"receiveShadow",V.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&L.environment!==null&&(ke.envMapIntensity.value=L.environmentIntensity),ke.dfgLUT!==void 0&&(ke.dfgLUT.value=nS()),Ne){if(te.setValue(F,"toneMappingExposure",P.toneMappingExposure),Rt.needsLights&&El(ke,xi),St&&G.fog===!0&&pt.refreshFogUniforms(ke,St),pt.refreshMaterialUniforms(ke,G,Mt,Ct,E.state.transmissionRenderTarget[S.id]),Rt.needsLights&&Rt.numLightProbeGrids>0){let de=b,Ie=0;for(let Un of E.state.lightProbeGridArray)Un.texture!==null&&(de.textures[Ie]=Un.texture,de.min[Ie]=Un.boundingBox.min,de.max[Ie]=Un.boundingBox.max,de.resolution[Ie]=Un.resolution,Ie++);for(let Un in de)de[Un].length=Ie;ke.probesSH.value=de.textures,ke.probesMin.value=de.min,ke.probesMax.value=de.max,ke.probesResolution.value=de.resolution}tr.upload(F,lr(Rt),ke,kt)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(tr.upload(F,lr(Rt),ke,kt),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&te.setValue(F,"center",V.center),te.setValue(F,"modelViewMatrix",V.modelViewMatrix),te.setValue(F,"normalMatrix",V.normalMatrix),te.setValue(F,"modelMatrix",V.matrixWorld),G.uniformsGroups!==void 0){let de=G.uniformsGroups;for(let Ie=0,Un=de.length;Ie<Un;Ie++){let pa=de[Ie];Lt.update(pa,be),Lt.bind(pa,be)}}return be}function El(S,L){S.ambientLightColor.needsUpdate=L,S.lightProbe.needsUpdate=L,S.sunLights.needsUpdate=L,S.sunLightShadows.needsUpdate=L,S.directionalLights.needsUpdate=L,S.directionalLightShadows.needsUpdate=L,S.pointLights.needsUpdate=L,S.pointLightShadows.needsUpdate=L,S.spotLights.needsUpdate=L,S.spotLightShadows.needsUpdate=L,S.rectAreaLights.needsUpdate=L,S.hemisphereLights.needsUpdate=L}function Rl(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return et},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(S,L,q){let G=Dt.get(S);G.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),Dt.get(S.texture).__webglTexture=L,Dt.get(S.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:q,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,L){let q=Dt.get(S);q.__webglFramebuffer=L,q.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(S,L=0,q=0){j=S,et=L,k=q;let G=null,V=!1,St=!1;if(S){let vt=Dt.get(S);if(vt.__useDefaultFramebuffer!==void 0){mt.bindFramebuffer(F.FRAMEBUFFER,vt.__webglFramebuffer),W.copy(S.viewport),ot.copy(S.scissor),At=S.scissorTest,mt.viewport(W),mt.scissor(ot),mt.setScissorTest(At),D=-1;return}else if(vt.__webglFramebuffer===void 0)kt.setupRenderTarget(S);else if(vt.__hasExternalTextures)kt.rebindTextures(S,Dt.get(S.texture).__webglTexture,Dt.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let Vt=S.depthTexture;if(vt.__boundDepthTexture!==Vt){if(Vt!==null&&Dt.has(Vt)&&(S.width!==Vt.image.width||S.height!==Vt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");kt.setupDepthRenderbuffer(S)}}let wt=S.texture;(wt.isData3DTexture||wt.isDataArrayTexture||wt.isCompressedArrayTexture)&&(St=!0);let Pt=Dt.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Pt[L])?G=Pt[L][q]:G=Pt[L],V=!0):S.samples>0&&kt.useMultisampledRTT(S)===!1?G=Dt.get(S).__webglMultisampledFramebuffer:Array.isArray(Pt)?G=Pt[q]:G=Pt,W.copy(S.viewport),ot.copy(S.scissor),At=S.scissorTest}else W.copy(Ot).multiplyScalar(Mt).floor(),ot.copy(le).multiplyScalar(Mt).floor(),At=he;if(q!==0&&(G=Z),mt.bindFramebuffer(F.FRAMEBUFFER,G)&&mt.drawBuffers(S,G),mt.viewport(W),mt.scissor(ot),mt.setScissorTest(At),V){let vt=Dt.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+L,vt.__webglTexture,q)}else if(St){let vt=L;for(let wt=0;wt<S.textures.length;wt++){let Pt=Dt.get(S.textures[wt]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+wt,Pt.__webglTexture,q,vt)}}else if(S!==null&&q!==0){let vt=Dt.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,vt.__webglTexture,q)}D=-1};function fa(S){let L=Dt.get(S);return(L.__readFormat!==S.format||L.__readType!==S.type)&&(L.__readFormat=S.format,L.__readType=S.type,L.__formatReadable=_e.textureFormatReadable(S.format),L.__typeReadable=_e.textureTypeReadable(S.type)),L}this.readRenderTargetPixels=function(S,L,q,G,V,St,Et,vt=0){if(!(S&&S.isWebGLRenderTarget)){Gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=Dt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Et!==void 0&&(wt=wt[Et],Array.isArray(wt)&&(wt=wt[0])),wt){mt.bindFramebuffer(F.FRAMEBUFFER,wt);try{let Pt=S.textures[vt],Vt=Pt.format,jt=Pt.type;S.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+vt);let It=fa(Pt);if(It.__formatReadable===!1){Gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(It.__typeReadable===!1){Gt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=S.width-G&&q>=0&&q<=S.height-V&&F.readPixels(L,q,G,V,ft.convert(Vt),ft.convert(jt),St)}finally{let Pt=j!==null?Dt.get(j).__webglFramebuffer:null;mt.bindFramebuffer(F.FRAMEBUFFER,Pt)}}},this.readRenderTargetPixelsAsync=async function(S,L,q,G,V,St,Et,vt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=Dt.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Et!==void 0&&(wt=wt[Et],Array.isArray(wt)&&(wt=wt[0])),wt)if(L>=0&&L<=S.width-G&&q>=0&&q<=S.height-V){mt.bindFramebuffer(F.FRAMEBUFFER,wt);let Pt=S.textures[vt],Vt=Pt.format,jt=Pt.type;S.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+vt);let It=fa(Pt);if(It.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(It.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let Qt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Qt),F.bufferData(F.PIXEL_PACK_BUFFER,St.byteLength,F.STREAM_READ),F.readPixels(L,q,G,V,ft.convert(Vt),ft.convert(jt),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);let Te=j!==null?Dt.get(j).__webglFramebuffer:null;mt.bindFramebuffer(F.FRAMEBUFFER,Te);let xe=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await kd(F,xe,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Qt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,St),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(Qt),F.deleteSync(xe),St}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,L=null,q=0){let G=Math.pow(2,-q),V=Math.floor(S.image.width*G),St=Math.floor(S.image.height*G),Et=L!==null?L.x:0,vt=L!==null?L.y:0;kt.setTexture2D(S,0),F.copyTexSubImage2D(F.TEXTURE_2D,q,0,0,Et,vt,V,St),mt.unbindTexture()},this.copyTextureToTexture=function(S,L,q=null,G=null,V=0,St=0){let Et,vt,wt,Pt,Vt,jt,It,Qt,Te,xe=S.isCompressedTexture?S.mipmaps[St]:S.image;if(q!==null)Et=q.max.x-q.min.x,vt=q.max.y-q.min.y,wt=q.isBox3?q.max.z-q.min.z:1,Pt=q.min.x,Vt=q.min.y,jt=q.isBox3?q.min.z:0;else{let te=Math.pow(2,-V);Et=Math.floor(xe.width*te),vt=Math.floor(xe.height*te),S.isDataArrayTexture?wt=xe.depth:S.isData3DTexture?wt=Math.floor(xe.depth*te):wt=1,Pt=0,Vt=0,jt=0}G!==null?(It=G.x,Qt=G.y,Te=G.z):(It=0,Qt=0,Te=0);let ue=ft.convert(L.format),De=ft.convert(L.type),Rt;L.isData3DTexture?(kt.setTexture3D(L,0),Rt=F.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(kt.setTexture2DArray(L,0),Rt=F.TEXTURE_2D_ARRAY):(kt.setTexture2D(L,0),Rt=F.TEXTURE_2D),mt.activeTexture(F.TEXTURE0),mt.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,L.flipY),mt.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),mt.pixelStorei(F.UNPACK_ALIGNMENT,L.unpackAlignment);let Fe=mt.getParameter(F.UNPACK_ROW_LENGTH),ae=mt.getParameter(F.UNPACK_IMAGE_HEIGHT),Nn=mt.getParameter(F.UNPACK_SKIP_PIXELS),be=mt.getParameter(F.UNPACK_SKIP_ROWS),ei=mt.getParameter(F.UNPACK_SKIP_IMAGES);mt.pixelStorei(F.UNPACK_ROW_LENGTH,xe.width),mt.pixelStorei(F.UNPACK_IMAGE_HEIGHT,xe.height),mt.pixelStorei(F.UNPACK_SKIP_PIXELS,Pt),mt.pixelStorei(F.UNPACK_SKIP_ROWS,Vt),mt.pixelStorei(F.UNPACK_SKIP_IMAGES,jt);let Ne=S.isDataArrayTexture||S.isData3DTexture,xi=L.isDataArrayTexture||L.isData3DTexture;if(S.isDepthTexture){let te=Dt.get(S),ke=Dt.get(L),mn=Dt.get(te.__renderTarget),de=Dt.get(ke.__renderTarget);mt.bindFramebuffer(F.READ_FRAMEBUFFER,mn.__webglFramebuffer),mt.bindFramebuffer(F.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let Ie=0;Ie<wt;Ie++)Ne&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Dt.get(S).__webglTexture,V,jt+Ie),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Dt.get(L).__webglTexture,St,Te+Ie)),F.blitFramebuffer(Pt,Vt,Pt+Et,Vt+vt,It,Qt,It+Et,Qt+vt,F.DEPTH_BUFFER_BIT,F.NEAREST);mt.bindFramebuffer(F.READ_FRAMEBUFFER,null),mt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(V!==0||S.isRenderTargetTexture||Dt.has(S)){let te=Dt.get(S),ke=Dt.get(L);mt.bindFramebuffer(F.READ_FRAMEBUFFER,I),mt.bindFramebuffer(F.DRAW_FRAMEBUFFER,Y);for(let mn=0;mn<wt;mn++)Ne?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,te.__webglTexture,V,jt+mn):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,te.__webglTexture,V),xi?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ke.__webglTexture,St,Te+mn):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ke.__webglTexture,St),V!==0?F.blitFramebuffer(Pt,Vt,Pt+Et,Vt+vt,It,Qt,It+Et,Qt+vt,F.COLOR_BUFFER_BIT,F.NEAREST):xi?F.copyTexSubImage3D(Rt,St,It,Qt,Te+mn,Pt,Vt,Et,vt):F.copyTexSubImage2D(Rt,St,It,Qt,Pt,Vt,Et,vt);mt.bindFramebuffer(F.READ_FRAMEBUFFER,null),mt.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else xi?S.isDataTexture||S.isData3DTexture?F.texSubImage3D(Rt,St,It,Qt,Te,Et,vt,wt,ue,De,xe.data):L.isCompressedArrayTexture?F.compressedTexSubImage3D(Rt,St,It,Qt,Te,Et,vt,wt,ue,xe.data):F.texSubImage3D(Rt,St,It,Qt,Te,Et,vt,wt,ue,De,xe):S.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,St,It,Qt,Et,vt,ue,De,xe.data):S.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,St,It,Qt,xe.width,xe.height,ue,xe.data):F.texSubImage2D(F.TEXTURE_2D,St,It,Qt,Et,vt,ue,De,xe);mt.pixelStorei(F.UNPACK_ROW_LENGTH,Fe),mt.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ae),mt.pixelStorei(F.UNPACK_SKIP_PIXELS,Nn),mt.pixelStorei(F.UNPACK_SKIP_ROWS,be),mt.pixelStorei(F.UNPACK_SKIP_IMAGES,ei),St===0&&L.generateMipmaps===!0&&L.mipmapsAutoUpdate===!0&&F.generateMipmap(Rt),mt.unbindTexture()},this.initRenderTarget=function(S){Dt.get(S).__webglFramebuffer===void 0&&kt.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?kt.setTextureCube(S,0):S.isData3DTexture?kt.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?kt.setTexture2DArray(S,0):kt.setTexture2D(S,0),mt.unbindTexture()},this.resetState=function(){et=0,k=0,j=null,mt.reset(),_t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=re._getDrawingBufferColorSpace(t),e.unpackColorSpace=re._getUnpackColorSpace()}};var Tf={type:"change"},yh={type:"start"},Ef={type:"end"},gl=new ls,Af=new En,sS=Math.cos(70*ih.DEG2RAD),Ve=new X,vn=2*Math.PI,ce={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},xh=1e-6,_l=class extends Wr{constructor(t,e=null){super(t,e),this.state=ce.NONE,this.target=new X,this.cursor=new X,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:li.ROTATE,MIDDLE:li.DOLLY,RIGHT:li.PAN},this.touches={ONE:$i.ROTATE,TWO:$i.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new X,this._lastQuaternion=new Rn,this._lastTargetPosition=new X,this._quat=new Rn().setFromUnitVectors(t.up,new X(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new $s,this._sphericalDelta=new $s,this._scale=1,this._panOffset=new X,this._rotateStart=new Yt,this._rotateEnd=new Yt,this._rotateDelta=new Yt,this._panStart=new Yt,this._panEnd=new Yt,this._panDelta=new Yt,this._dollyStart=new Yt,this._dollyEnd=new Yt,this._dollyDelta=new Yt,this._dollyDirection=new X,this._mouse=new Yt,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=aS.bind(this),this._onPointerDown=rS.bind(this),this._onPointerUp=oS.bind(this),this._onContextMenu=pS.bind(this),this._onMouseWheel=hS.bind(this),this._onKeyDown=uS.bind(this),this._onTouchStart=dS.bind(this),this._onTouchMove=fS.bind(this),this._onMouseDown=lS.bind(this),this._onMouseMove=cS.bind(this),this._interceptControlDown=mS.bind(this),this._interceptControlUp=gS.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(t){this._cursorStyle=t,t==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(t){super.connect(t),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.ownerDocument.addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=ce.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.ownerDocument.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(t){t.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=t}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Tf),this.update(),this.state=ce.NONE}pan(t,e){this._pan(t,e),this.update()}dollyIn(t){this._dollyIn(t),this.update()}dollyOut(t){this._dollyOut(t),this.update()}rotateLeft(t){this._rotateLeft(t),this.update()}rotateUp(t){this._rotateUp(t),this.update()}update(t=null){let e=this.object.position;Ve.copy(e).sub(this.target),Ve.applyQuaternion(this._quat),this._spherical.setFromVector3(Ve),this.autoRotate&&this.state===ce.NONE&&this._rotateLeft(this._getAutoRotationAngle(t)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=vn:i>Math.PI&&(i-=vn),s<-Math.PI?s+=vn:s>Math.PI&&(s-=vn),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(Ve.setFromSpherical(this._spherical),Ve.applyQuaternion(this._quatInverse),e.copy(this.target).add(Ve),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){let o=Ve.length();a=this._clampDistance(o*this._scale);let l=o-a;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){let o=new X(this._mouse.x,this._mouse.y,0);o.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;let c=new X(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(o),this.object.updateMatrixWorld(),a=Ve.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(gl.origin.copy(this.object.position),gl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(gl.direction))<sS?this.object.lookAt(this.target):(Af.setFromNormalAndCoplanarPoint(this.object.up,this.target),gl.intersectPlane(Af,this.target))))}else if(this.object.isOrthographicCamera){let a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>xh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>xh||this._lastTargetPosition.distanceToSquared(this.target)>xh?(this.dispatchEvent(Tf),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(t){return t!==null?vn/60*this.autoRotateSpeed*t:vn/60/60*this.autoRotateSpeed}_getZoomScale(t){let e=Math.abs(t*.01);return Math.pow(.95,this.zoomSpeed*e)}_rotateLeft(t){this._sphericalDelta.theta-=t}_rotateUp(t){this._sphericalDelta.phi-=t}_panLeft(t,e){Ve.setFromMatrixColumn(e,0),Ve.multiplyScalar(-t),this._panOffset.add(Ve)}_panUp(t,e){this.screenSpacePanning===!0?Ve.setFromMatrixColumn(e,1):(Ve.setFromMatrixColumn(e,0),Ve.crossVectors(this.object.up,Ve)),Ve.multiplyScalar(t),this._panOffset.add(Ve)}_pan(t,e){let i=this.domElement;if(this.object.isPerspectiveCamera){let s=this.object.position;Ve.copy(s).sub(this.target);let r=Ve.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*t*r/i.clientHeight,this.object.matrix),this._panUp(2*e*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(t*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(e*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(t){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=t:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(t,e){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),s=t-i.left,r=e-i.top,a=i.width,o=i.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(t){return Math.max(this.minDistance,Math.min(this.maxDistance,t))}_handleMouseDownRotate(t){this._rotateStart.set(t.clientX,t.clientY)}_handleMouseDownDolly(t){this._updateZoomParameters(t.clientX,t.clientY),this._dollyStart.set(t.clientX,t.clientY)}_handleMouseDownPan(t){this._panStart.set(t.clientX,t.clientY)}_handleMouseMoveRotate(t){this._rotateEnd.set(t.clientX,t.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(vn*this._rotateDelta.x/e.clientHeight),this._rotateUp(vn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(t){this._dollyEnd.set(t.clientX,t.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.zoomToCursor&&(this._performCursorZoom=!0,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()),this.update()}_handleMouseMovePan(t){this._panEnd.set(t.clientX,t.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(t){this._updateZoomParameters(t.clientX,t.clientY),t.deltaY<0?this._dollyIn(this._getZoomScale(t.deltaY)):t.deltaY>0&&this._dollyOut(this._getZoomScale(t.deltaY)),this.update()}_handleKeyDown(t){let e=!1;switch(t.code){case this.keys.UP:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),e=!0;break;case this.keys.BOTTOM:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateUp(-vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),e=!0;break;case this.keys.LEFT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),e=!0;break;case this.keys.RIGHT:t.ctrlKey||t.metaKey||t.shiftKey?this.enableRotate&&this._rotateLeft(-vn*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),e=!0;break}e&&(t.preventDefault(),this.update())}_handleTouchStartRotate(t){if(this._pointers.length===1)this._rotateStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(t){if(this._pointers.length===1)this._panStart.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panStart.set(i,s)}}_handleTouchStartDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enablePan&&this._handleTouchStartPan(t)}_handleTouchStartDollyRotate(t){this.enableZoom&&this._handleTouchStartDolly(t),this.enableRotate&&this._handleTouchStartRotate(t)}_handleTouchMoveRotate(t){if(this._pointers.length==1)this._rotateEnd.set(t.pageX,t.pageY);else{let i=this._getSecondPointerPosition(t),s=.5*(t.pageX+i.x),r=.5*(t.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let e=this.domElement;this._rotateLeft(vn*this._rotateDelta.x/e.clientHeight),this._rotateUp(vn*this._rotateDelta.y/e.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(t){if(this._pointers.length===1)this._panEnd.set(t.pageX,t.pageY);else{let e=this._getSecondPointerPosition(t),i=.5*(t.pageX+e.x),s=.5*(t.pageY+e.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(t){let e=this._getSecondPointerPosition(t),i=t.pageX-e.x,s=t.pageY-e.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let a=(t.pageX+e.x)*.5,o=(t.pageY+e.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enablePan&&this._handleTouchMovePan(t)}_handleTouchMoveDollyRotate(t){this.enableZoom&&this._handleTouchMoveDolly(t),this.enableRotate&&this._handleTouchMoveRotate(t)}_addPointer(t){this._pointers.push(t.pointerId)}_removePointer(t){delete this._pointerPositions[t.pointerId];for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId){this._pointers.splice(e,1);return}}_isTrackingPointer(t){for(let e=0;e<this._pointers.length;e++)if(this._pointers[e]==t.pointerId)return!0;return!1}_trackPointer(t){let e=this._pointerPositions[t.pointerId];e===void 0&&(e=new Yt,this._pointerPositions[t.pointerId]=e),e.set(t.pageX,t.pageY)}_getSecondPointerPosition(t){let e=t.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[e]}_customWheelEvent(t){let e=t.deltaMode,i={clientX:t.clientX,clientY:t.clientY,deltaY:t.deltaY};switch(e){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return t.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function rS(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function aS(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function oS(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ef),this.state=ce.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:let t=this._pointers[0],e=this._pointerPositions[t];this._onTouchStart({pointerId:t,pageX:e.x,pageY:e.y});break}}function lS(n){let t;switch(n.button){case 0:t=this.mouseButtons.LEFT;break;case 1:t=this.mouseButtons.MIDDLE;break;case 2:t=this.mouseButtons.RIGHT;break;default:t=-1}switch(t){case li.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ce.DOLLY;break;case li.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ce.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ce.ROTATE}break;case li.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ce.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ce.PAN}break;default:this.state=ce.NONE}this.state!==ce.NONE&&this.dispatchEvent(yh)}function cS(n){switch(this.state){case ce.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ce.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ce.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function hS(n){this.enabled===!1||this.enableZoom===!1||this.state!==ce.NONE||(n.preventDefault(),this.dispatchEvent(yh),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Ef))}function uS(n){this.enabled!==!1&&this._handleKeyDown(n)}function dS(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case $i.ROTATE:if(this.enableRotate===!1){this.state=ce.NONE;break}this._handleTouchStartRotate(n),this.state=ce.TOUCH_ROTATE;break;case $i.PAN:if(this.enablePan===!1){this.state=ce.NONE;break}this._handleTouchStartPan(n),this.state=ce.TOUCH_PAN;break;default:this.state=ce.NONE}break;case 2:switch(this.touches.TWO){case $i.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ce.TOUCH_DOLLY_PAN;break;case $i.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ce.TOUCH_DOLLY_ROTATE;break;default:this.state=ce.NONE}break;default:this.state=ce.NONE}this.state!==ce.NONE&&this.dispatchEvent(yh)}function fS(n){switch(this._trackPointer(n),this.state){case ce.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ce.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ce.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ce.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ce.NONE}}function pS(n){this.enabled!==!1&&n.preventDefault()}function mS(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.ownerDocument.addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function gS(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.ownerDocument.removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Rf(n){let t=+this._x.call(null,n);return Cf(this.cover(t),t,n)}function Cf(n,t,e){if(isNaN(t))return n;var i,s=n._root,r={data:e},a=n._x0,o=n._x1,l,c,h,u,d;if(!s)return n._root=r,n;for(;s.length;)if((h=t>=(l=(a+o)/2))?a=l:o=l,i=s,!(s=s[u=+h]))return i[u]=r,n;if(c=+n._x.call(null,s.data),t===c)return r.next=s,i?i[u]=r:n._root=r,n;do i=i?i[u]=new Array(2):n._root=new Array(2),(h=t>=(l=(a+o)/2))?a=l:o=l;while((u=+h)==(d=+(c>=l)));return i[d]=s,i[u]=r,n}function If(n){Array.isArray(n)||(n=Array.from(n));let t=n.length,e=new Float64Array(t),i=1/0,s=-1/0;for(let r=0,a;r<t;++r)isNaN(a=+this._x.call(null,n[r]))||(e[r]=a,a<i&&(i=a),a>s&&(s=a));if(i>s)return this;this.cover(i).cover(s);for(let r=0;r<t;++r)Cf(this,e[r],n[r]);return this}function Pf(n){if(isNaN(n=+n))return this;var t=this._x0,e=this._x1;if(isNaN(t))e=(t=Math.floor(n))+1;else{for(var i=e-t||1,s=this._root,r,a;t>n||n>=e;)switch(a=+(n<t),r=new Array(2),r[a]=s,s=r,i*=2,a){case 0:e=t+i;break;case 1:t=e-i;break}this._root&&this._root.length&&(this._root=s)}return this._x0=t,this._x1=e,this}function Lf(){var n=[];return this.visit(function(t){if(!t.length)do n.push(t.data);while(t=t.next)}),n}function Df(n){return arguments.length?this.cover(+n[0][0]).cover(+n[1][0]):isNaN(this._x0)?void 0:[[this._x0],[this._x1]]}function zn(n,t,e){this.node=n,this.x0=t,this.x1=e}function Nf(n,t){var e,i=this._x0,s,r,a=this._x1,o=[],l=this._root,c,h;for(l&&o.push(new zn(l,i,a)),t==null?t=1/0:(i=n-t,a=n+t);c=o.pop();)if(!(!(l=c.node)||(s=c.x0)>a||(r=c.x1)<i))if(l.length){var u=(s+r)/2;o.push(new zn(l[1],u,r),new zn(l[0],s,u)),(h=+(n>=u))&&(c=o[o.length-1],o[o.length-1]=o[o.length-1-h],o[o.length-1-h]=c)}else{var d=Math.abs(n-+this._x.call(null,l.data));d<t&&(t=d,i=n-d,a=n+d,e=l.data)}return e}function Uf(n){if(isNaN(l=+this._x.call(null,n)))return this;var t,e=this._root,i,s,r,a=this._x0,o=this._x1,l,c,h,u,d;if(!e)return this;if(e.length)for(;;){if((h=l>=(c=(a+o)/2))?a=c:o=c,t=e,!(e=e[u=+h]))return this;if(!e.length)break;t[u+1&1]&&(i=t,d=u)}for(;e.data!==n;)if(s=e,!(e=e.next))return this;return(r=e.next)&&delete e.next,s?(r?s.next=r:delete s.next,this):t?(r?t[u]=r:delete t[u],(e=t[0]||t[1])&&e===(t[1]||t[0])&&!e.length&&(i?i[d]=e:this._root=e),this):(this._root=r,this)}function Of(n){for(var t=0,e=n.length;t<e;++t)this.remove(n[t]);return this}function Ff(){return this._root}function kf(){var n=0;return this.visit(function(t){if(!t.length)do++n;while(t=t.next)}),n}function Bf(n){var t=[],e,i=this._root,s,r,a;for(i&&t.push(new zn(i,this._x0,this._x1));e=t.pop();)if(!n(i=e.node,r=e.x0,a=e.x1)&&i.length){var o=(r+a)/2;(s=i[1])&&t.push(new zn(s,o,a)),(s=i[0])&&t.push(new zn(s,r,o))}return this}function zf(n){var t=[],e=[],i;for(this._root&&t.push(new zn(this._root,this._x0,this._x1));i=t.pop();){var s=i.node;if(s.length){var r,a=i.x0,o=i.x1,l=(a+o)/2;(r=s[0])&&t.push(new zn(r,a,l)),(r=s[1])&&t.push(new zn(r,l,o))}e.push(i)}for(;i=e.pop();)n(i.node,i.x0,i.x1);return this}function Gf(n){return n[0]}function Hf(n){return arguments.length?(this._x=n,this):this._x}function ms(n,t){var e=new vh(t??Gf,NaN,NaN);return n==null?e:e.addAll(n)}function vh(n,t,e){this._x=n,this._x0=t,this._x1=e,this._root=void 0}function Vf(n){for(var t={data:n.data},e=t;n=n.next;)e=e.next={data:n.data};return t}var Sn=ms.prototype=vh.prototype;Sn.copy=function(){var n=new vh(this._x,this._x0,this._x1),t=this._root,e,i;if(!t)return n;if(!t.length)return n._root=Vf(t),n;for(e=[{source:t,target:n._root=new Array(2)}];t=e.pop();)for(var s=0;s<2;++s)(i=t.source[s])&&(i.length?e.push({source:i,target:t.target[s]=new Array(2)}):t.target[s]=Vf(i));return n};Sn.add=Rf;Sn.addAll=If;Sn.cover=Pf;Sn.data=Lf;Sn.extent=Df;Sn.find=Nf;Sn.remove=Uf;Sn.removeAll=Of;Sn.root=Ff;Sn.size=kf;Sn.visit=Bf;Sn.visitAfter=zf;Sn.x=Hf;function _S(n){let t=+this._x.call(null,n),e=+this._y.call(null,n);return Xf(this.cover(t,e),t,e,n)}function Xf(n,t,e,i){if(isNaN(t)||isNaN(e))return n;var s,r=n._root,a={data:i},o=n._x0,l=n._y0,c=n._x1,h=n._y1,u,d,p,g,x,m,f,v;if(!r)return n._root=a,n;for(;r.length;)if((x=t>=(u=(o+c)/2))?o=u:c=u,(m=e>=(d=(l+h)/2))?l=d:h=d,s=r,!(r=r[f=m<<1|x]))return s[f]=a,n;if(p=+n._x.call(null,r.data),g=+n._y.call(null,r.data),t===p&&e===g)return a.next=r,s?s[f]=a:n._root=a,n;do s=s?s[f]=new Array(4):n._root=new Array(4),(x=t>=(u=(o+c)/2))?o=u:c=u,(m=e>=(d=(l+h)/2))?l=d:h=d;while((f=m<<1|x)===(v=(g>=d)<<1|p>=u));return s[v]=r,s[f]=a,n}function xS(n){Array.isArray(n)||(n=Array.from(n));let t=n.length,e=new Float64Array(t),i=new Float64Array(t),s=1/0,r=s,a=-s,o=a;for(let l=0,c,h,u;l<t;++l){if(isNaN(h=+this._x.call(null,c=n[l]))||isNaN(u=+this._y.call(null,c))){e[l]=NaN;continue}e[l]=h,i[l]=u,h<s&&(s=h),h>a&&(a=h),u<r&&(r=u),u>o&&(o=u)}if(s>a||r>o)return this;this.cover(s,r).cover(a,o);for(let l=0;l<t;++l)Xf(this,e[l],i[l],n[l]);return this}function yS(n,t){if(isNaN(n=+n)||isNaN(t=+t))return this;var e=this._x0,i=this._y0,s=this._x1,r=this._y1;if(isNaN(e))s=(e=Math.floor(n))+1,r=(i=Math.floor(t))+1;else{for(var a=s-e||1,o=this._root,l,c;e>n||n>=s||i>t||t>=r;)switch(c=(t<i)<<1|n<e,l=new Array(4),l[c]=o,o=l,a*=2,c){case 0:s=e+a,r=i+a;break;case 1:e=s-a,r=i+a;break;case 2:s=e+a,i=r-a;break;case 3:e=s-a,i=r-a;break}this._root&&this._root.length&&(this._root=o)}return this._x0=e,this._y0=i,this._x1=s,this._y1=r,this}function vS(){var n=[];return this.visit(function(t){if(!t.length)do n.push(t.data);while(t=t.next)}),n}function SS(n){return arguments.length?this.cover(+n[0][0],+n[0][1]).cover(+n[1][0],+n[1][1]):isNaN(this._x0)?void 0:[[this._x0,this._y0],[this._x1,this._y1]]}function dn(n,t,e,i,s){this.node=n,this.x0=t,this.y0=e,this.x1=i,this.y1=s}function bS(n,t,e){var i,s=this._x0,r=this._y0,a,o,l,c,h=this._x1,u=this._y1,d=[],p=this._root,g,x;for(p&&d.push(new dn(p,s,r,h,u)),e==null?e=1/0:(s=n-e,r=t-e,h=n+e,u=t+e,e*=e);g=d.pop();)if(!(!(p=g.node)||(a=g.x0)>h||(o=g.y0)>u||(l=g.x1)<s||(c=g.y1)<r))if(p.length){var m=(a+l)/2,f=(o+c)/2;d.push(new dn(p[3],m,f,l,c),new dn(p[2],a,f,m,c),new dn(p[1],m,o,l,f),new dn(p[0],a,o,m,f)),(x=(t>=f)<<1|n>=m)&&(g=d[d.length-1],d[d.length-1]=d[d.length-1-x],d[d.length-1-x]=g)}else{var v=n-+this._x.call(null,p.data),A=t-+this._y.call(null,p.data),b=v*v+A*A;if(b<e){var T=Math.sqrt(e=b);s=n-T,r=t-T,h=n+T,u=t+T,i=p.data}}return i}function MS(n){if(isNaN(h=+this._x.call(null,n))||isNaN(u=+this._y.call(null,n)))return this;var t,e=this._root,i,s,r,a=this._x0,o=this._y0,l=this._x1,c=this._y1,h,u,d,p,g,x,m,f;if(!e)return this;if(e.length)for(;;){if((g=h>=(d=(a+l)/2))?a=d:l=d,(x=u>=(p=(o+c)/2))?o=p:c=p,t=e,!(e=e[m=x<<1|g]))return this;if(!e.length)break;(t[m+1&3]||t[m+2&3]||t[m+3&3])&&(i=t,f=m)}for(;e.data!==n;)if(s=e,!(e=e.next))return this;return(r=e.next)&&delete e.next,s?(r?s.next=r:delete s.next,this):t?(r?t[m]=r:delete t[m],(e=t[0]||t[1]||t[2]||t[3])&&e===(t[3]||t[2]||t[1]||t[0])&&!e.length&&(i?i[f]=e:this._root=e),this):(this._root=r,this)}function wS(n){for(var t=0,e=n.length;t<e;++t)this.remove(n[t]);return this}function TS(){return this._root}function AS(){var n=0;return this.visit(function(t){if(!t.length)do++n;while(t=t.next)}),n}function ES(n){var t=[],e,i=this._root,s,r,a,o,l;for(i&&t.push(new dn(i,this._x0,this._y0,this._x1,this._y1));e=t.pop();)if(!n(i=e.node,r=e.x0,a=e.y0,o=e.x1,l=e.y1)&&i.length){var c=(r+o)/2,h=(a+l)/2;(s=i[3])&&t.push(new dn(s,c,h,o,l)),(s=i[2])&&t.push(new dn(s,r,h,c,l)),(s=i[1])&&t.push(new dn(s,c,a,o,h)),(s=i[0])&&t.push(new dn(s,r,a,c,h))}return this}function RS(n){var t=[],e=[],i;for(this._root&&t.push(new dn(this._root,this._x0,this._y0,this._x1,this._y1));i=t.pop();){var s=i.node;if(s.length){var r,a=i.x0,o=i.y0,l=i.x1,c=i.y1,h=(a+l)/2,u=(o+c)/2;(r=s[0])&&t.push(new dn(r,a,o,h,u)),(r=s[1])&&t.push(new dn(r,h,o,l,u)),(r=s[2])&&t.push(new dn(r,a,u,h,c)),(r=s[3])&&t.push(new dn(r,h,u,l,c))}e.push(i)}for(;i=e.pop();)n(i.node,i.x0,i.y0,i.x1,i.y1);return this}function CS(n){return n[0]}function IS(n){return arguments.length?(this._x=n,this):this._x}function PS(n){return n[1]}function LS(n){return arguments.length?(this._y=n,this):this._y}function ia(n,t,e){var i=new Sh(t??CS,e??PS,NaN,NaN,NaN,NaN);return n==null?i:i.addAll(n)}function Sh(n,t,e,i,s,r){this._x=n,this._y=t,this._x0=e,this._y0=i,this._x1=s,this._y1=r,this._root=void 0}function Wf(n){for(var t={data:n.data},e=t;n=n.next;)e=e.next={data:n.data};return t}var fn=ia.prototype=Sh.prototype;fn.copy=function(){var n=new Sh(this._x,this._y,this._x0,this._y0,this._x1,this._y1),t=this._root,e,i;if(!t)return n;if(!t.length)return n._root=Wf(t),n;for(e=[{source:t,target:n._root=new Array(4)}];t=e.pop();)for(var s=0;s<4;++s)(i=t.source[s])&&(i.length?e.push({source:i,target:t.target[s]=new Array(4)}):t.target[s]=Wf(i));return n};fn.add=_S;fn.addAll=xS;fn.cover=yS;fn.data=vS;fn.extent=SS;fn.find=bS;fn.remove=MS;fn.removeAll=wS;fn.root=TS;fn.size=AS;fn.visit=ES;fn.visitAfter=RS;fn.x=IS;fn.y=LS;function qf(n){let t=+this._x.call(null,n),e=+this._y.call(null,n),i=+this._z.call(null,n);return Yf(this.cover(t,e,i),t,e,i,n)}function Yf(n,t,e,i,s){if(isNaN(t)||isNaN(e)||isNaN(i))return n;var r,a=n._root,o={data:s},l=n._x0,c=n._y0,h=n._z0,u=n._x1,d=n._y1,p=n._z1,g,x,m,f,v,A,b,T,E,_,M;if(!a)return n._root=o,n;for(;a.length;)if((b=t>=(g=(l+u)/2))?l=g:u=g,(T=e>=(x=(c+d)/2))?c=x:d=x,(E=i>=(m=(h+p)/2))?h=m:p=m,r=a,!(a=a[_=E<<2|T<<1|b]))return r[_]=o,n;if(f=+n._x.call(null,a.data),v=+n._y.call(null,a.data),A=+n._z.call(null,a.data),t===f&&e===v&&i===A)return o.next=a,r?r[_]=o:n._root=o,n;do r=r?r[_]=new Array(8):n._root=new Array(8),(b=t>=(g=(l+u)/2))?l=g:u=g,(T=e>=(x=(c+d)/2))?c=x:d=x,(E=i>=(m=(h+p)/2))?h=m:p=m;while((_=E<<2|T<<1|b)===(M=(A>=m)<<2|(v>=x)<<1|f>=g));return r[M]=a,r[_]=o,n}function $f(n){Array.isArray(n)||(n=Array.from(n));let t=n.length,e=new Float64Array(t),i=new Float64Array(t),s=new Float64Array(t),r=1/0,a=1/0,o=1/0,l=-1/0,c=-1/0,h=-1/0;for(let u=0,d,p,g,x;u<t;++u)isNaN(p=+this._x.call(null,d=n[u]))||isNaN(g=+this._y.call(null,d))||isNaN(x=+this._z.call(null,d))||(e[u]=p,i[u]=g,s[u]=x,p<r&&(r=p),p>l&&(l=p),g<a&&(a=g),g>c&&(c=g),x<o&&(o=x),x>h&&(h=x));if(r>l||a>c||o>h)return this;this.cover(r,a,o).cover(l,c,h);for(let u=0;u<t;++u)Yf(this,e[u],i[u],s[u],n[u]);return this}function Zf(n,t,e){if(isNaN(n=+n)||isNaN(t=+t)||isNaN(e=+e))return this;var i=this._x0,s=this._y0,r=this._z0,a=this._x1,o=this._y1,l=this._z1;if(isNaN(i))a=(i=Math.floor(n))+1,o=(s=Math.floor(t))+1,l=(r=Math.floor(e))+1;else{for(var c=a-i||1,h=this._root,u,d;i>n||n>=a||s>t||t>=o||r>e||e>=l;)switch(d=(e<r)<<2|(t<s)<<1|n<i,u=new Array(8),u[d]=h,h=u,c*=2,d){case 0:a=i+c,o=s+c,l=r+c;break;case 1:i=a-c,o=s+c,l=r+c;break;case 2:a=i+c,s=o-c,l=r+c;break;case 3:i=a-c,s=o-c,l=r+c;break;case 4:a=i+c,o=s+c,r=l-c;break;case 5:i=a-c,o=s+c,r=l-c;break;case 6:a=i+c,s=o-c,r=l-c;break;case 7:i=a-c,s=o-c,r=l-c;break}this._root&&this._root.length&&(this._root=h)}return this._x0=i,this._y0=s,this._z0=r,this._x1=a,this._y1=o,this._z1=l,this}function Kf(){var n=[];return this.visit(function(t){if(!t.length)do n.push(t.data);while(t=t.next)}),n}function Jf(n){return arguments.length?this.cover(+n[0][0],+n[0][1],+n[0][2]).cover(+n[1][0],+n[1][1],+n[1][2]):isNaN(this._x0)?void 0:[[this._x0,this._y0,this._z0],[this._x1,this._y1,this._z1]]}function me(n,t,e,i,s,r,a){this.node=n,this.x0=t,this.y0=e,this.z0=i,this.x1=s,this.y1=r,this.z1=a}function jf(n,t,e,i){var s,r=this._x0,a=this._y0,o=this._z0,l,c,h,u,d,p,g=this._x1,x=this._y1,m=this._z1,f=[],v=this._root,A,b;for(v&&f.push(new me(v,r,a,o,g,x,m)),i==null?i=1/0:(r=n-i,a=t-i,o=e-i,g=n+i,x=t+i,m=e+i,i*=i);A=f.pop();)if(!(!(v=A.node)||(l=A.x0)>g||(c=A.y0)>x||(h=A.z0)>m||(u=A.x1)<r||(d=A.y1)<a||(p=A.z1)<o))if(v.length){var T=(l+u)/2,E=(c+d)/2,_=(h+p)/2;f.push(new me(v[7],T,E,_,u,d,p),new me(v[6],l,E,_,T,d,p),new me(v[5],T,c,_,u,E,p),new me(v[4],l,c,_,T,E,p),new me(v[3],T,E,h,u,d,_),new me(v[2],l,E,h,T,d,_),new me(v[1],T,c,h,u,E,_),new me(v[0],l,c,h,T,E,_)),(b=(e>=_)<<2|(t>=E)<<1|n>=T)&&(A=f[f.length-1],f[f.length-1]=f[f.length-1-b],f[f.length-1-b]=A)}else{var M=n-+this._x.call(null,v.data),z=t-+this._y.call(null,v.data),P=e-+this._z.call(null,v.data),N=M*M+z*z+P*P;if(N<i){var B=Math.sqrt(i=N);r=n-B,a=t-B,o=e-B,g=n+B,x=t+B,m=e+B,s=v.data}}return s}var DS=(n,t,e,i,s,r)=>Math.sqrt((n-i)**2+(t-s)**2+(e-r)**2);function Qf(n,t,e,i){let s=[],r=n-i,a=t-i,o=e-i,l=n+i,c=t+i,h=e+i;return this.visit((u,d,p,g,x,m,f)=>{if(!u.length)do{let v=u.data;DS(n,t,e,this._x(v),this._y(v),this._z(v))<=i&&s.push(v)}while(u=u.next);return d>l||p>c||g>h||x<r||m<a||f<o}),s}function tp(n){if(isNaN(d=+this._x.call(null,n))||isNaN(p=+this._y.call(null,n))||isNaN(g=+this._z.call(null,n)))return this;var t,e=this._root,i,s,r,a=this._x0,o=this._y0,l=this._z0,c=this._x1,h=this._y1,u=this._z1,d,p,g,x,m,f,v,A,b,T,E;if(!e)return this;if(e.length)for(;;){if((v=d>=(x=(a+c)/2))?a=x:c=x,(A=p>=(m=(o+h)/2))?o=m:h=m,(b=g>=(f=(l+u)/2))?l=f:u=f,t=e,!(e=e[T=b<<2|A<<1|v]))return this;if(!e.length)break;(t[T+1&7]||t[T+2&7]||t[T+3&7]||t[T+4&7]||t[T+5&7]||t[T+6&7]||t[T+7&7])&&(i=t,E=T)}for(;e.data!==n;)if(s=e,!(e=e.next))return this;return(r=e.next)&&delete e.next,s?(r?s.next=r:delete s.next,this):t?(r?t[T]=r:delete t[T],(e=t[0]||t[1]||t[2]||t[3]||t[4]||t[5]||t[6]||t[7])&&e===(t[7]||t[6]||t[5]||t[4]||t[3]||t[2]||t[1]||t[0])&&!e.length&&(i?i[E]=e:this._root=e),this):(this._root=r,this)}function ep(n){for(var t=0,e=n.length;t<e;++t)this.remove(n[t]);return this}function np(){return this._root}function ip(){var n=0;return this.visit(function(t){if(!t.length)do++n;while(t=t.next)}),n}function sp(n){var t=[],e,i=this._root,s,r,a,o,l,c,h;for(i&&t.push(new me(i,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1));e=t.pop();)if(!n(i=e.node,r=e.x0,a=e.y0,o=e.z0,l=e.x1,c=e.y1,h=e.z1)&&i.length){var u=(r+l)/2,d=(a+c)/2,p=(o+h)/2;(s=i[7])&&t.push(new me(s,u,d,p,l,c,h)),(s=i[6])&&t.push(new me(s,r,d,p,u,c,h)),(s=i[5])&&t.push(new me(s,u,a,p,l,d,h)),(s=i[4])&&t.push(new me(s,r,a,p,u,d,h)),(s=i[3])&&t.push(new me(s,u,d,o,l,c,p)),(s=i[2])&&t.push(new me(s,r,d,o,u,c,p)),(s=i[1])&&t.push(new me(s,u,a,o,l,d,p)),(s=i[0])&&t.push(new me(s,r,a,o,u,d,p))}return this}function rp(n){var t=[],e=[],i;for(this._root&&t.push(new me(this._root,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1));i=t.pop();){var s=i.node;if(s.length){var r,a=i.x0,o=i.y0,l=i.z0,c=i.x1,h=i.y1,u=i.z1,d=(a+c)/2,p=(o+h)/2,g=(l+u)/2;(r=s[0])&&t.push(new me(r,a,o,l,d,p,g)),(r=s[1])&&t.push(new me(r,d,o,l,c,p,g)),(r=s[2])&&t.push(new me(r,a,p,l,d,h,g)),(r=s[3])&&t.push(new me(r,d,p,l,c,h,g)),(r=s[4])&&t.push(new me(r,a,o,g,d,p,u)),(r=s[5])&&t.push(new me(r,d,o,g,c,p,u)),(r=s[6])&&t.push(new me(r,a,p,g,d,h,u)),(r=s[7])&&t.push(new me(r,d,p,g,c,h,u))}e.push(i)}for(;i=e.pop();)n(i.node,i.x0,i.y0,i.z0,i.x1,i.y1,i.z1);return this}function ap(n){return n[0]}function op(n){return arguments.length?(this._x=n,this):this._x}function lp(n){return n[1]}function cp(n){return arguments.length?(this._y=n,this):this._y}function hp(n){return n[2]}function up(n){return arguments.length?(this._z=n,this):this._z}function gs(n,t,e,i){var s=new bh(t??ap,e??lp,i??hp,NaN,NaN,NaN,NaN,NaN,NaN);return n==null?s:s.addAll(n)}function bh(n,t,e,i,s,r,a,o,l){this._x=n,this._y=t,this._z=e,this._x0=i,this._y0=s,this._z0=r,this._x1=a,this._y1=o,this._z1=l,this._root=void 0}function dp(n){for(var t={data:n.data},e=t;n=n.next;)e=e.next={data:n.data};return t}var je=gs.prototype=bh.prototype;je.copy=function(){var n=new bh(this._x,this._y,this._z,this._x0,this._y0,this._z0,this._x1,this._y1,this._z1),t=this._root,e,i;if(!t)return n;if(!t.length)return n._root=dp(t),n;for(e=[{source:t,target:n._root=new Array(8)}];t=e.pop();)for(var s=0;s<8;++s)(i=t.source[s])&&(i.length?e.push({source:i,target:t.target[s]=new Array(8)}):t.target[s]=dp(i));return n};je.add=qf;je.addAll=$f;je.cover=Zf;je.data=Kf;je.extent=Jf;je.find=jf;je.findAllWithinRadius=Qf;je.remove=tp;je.removeAll=ep;je.root=np;je.size=ip;je.visit=sp;je.visitAfter=rp;je.x=op;je.y=cp;je.z=up;function sn(n){return function(){return n}}function Qn(n){return(n()-.5)*1e-6}function Mh(n){return n.x+n.vx}function fp(n){return n.y+n.vy}function NS(n){return n.z+n.vz}function wh(n){var t,e,i,s,r=1,a=1;typeof n!="function"&&(n=sn(n==null?1:+n));function o(){for(var h,u=t.length,d,p,g,x,m,f,v,A=0;A<a;++A)for(d=(e===1?ms(t,Mh):e===2?ia(t,Mh,fp):e===3?gs(t,Mh,fp,NS):null).visitAfter(l),h=0;h<u;++h)p=t[h],f=i[p.index],v=f*f,g=p.x+p.vx,e>1&&(x=p.y+p.vy),e>2&&(m=p.z+p.vz),d.visit(b);function b(T,E,_,M,z,P,N){var B=[E,_,M,z,P,N],Z=B[0],I=B[1],Y=B[2],et=B[e],k=B[e+1],j=B[e+2],D=T.data,$=T.r,W=f+$;if(D){if(D.index>p.index){var ot=g-D.x-D.vx,At=e>1?x-D.y-D.vy:0,K=e>2?m-D.z-D.vz:0,ht=ot*ot+At*At+K*K;ht<W*W&&(ot===0&&(ot=Qn(s),ht+=ot*ot),e>1&&At===0&&(At=Qn(s),ht+=At*At),e>2&&K===0&&(K=Qn(s),ht+=K*K),ht=(W-(ht=Math.sqrt(ht)))/ht*r,p.vx+=(ot*=ht)*(W=($*=$)/(v+$)),e>1&&(p.vy+=(At*=ht)*W),e>2&&(p.vz+=(K*=ht)*W),D.vx-=ot*(W=1-W),e>1&&(D.vy-=At*W),e>2&&(D.vz-=K*W))}return}return Z>g+W||et<g-W||e>1&&(I>x+W||k<x-W)||e>2&&(Y>m+W||j<m-W)}}function l(h){if(h.data)return h.r=i[h.data.index];for(var u=h.r=0;u<Math.pow(2,e);++u)h[u]&&h[u].r>h.r&&(h.r=h[u].r)}function c(){if(t){var h,u=t.length,d;for(i=new Array(u),h=0;h<u;++h)d=t[h],i[d.index]=+n(d,h,t)}}return o.initialize=function(h,...u){t=h,s=u.find(d=>typeof d=="function")||Math.random,e=u.find(d=>[1,2,3].includes(d))||2,c()},o.iterations=function(h){return arguments.length?(a=+h,o):a},o.strength=function(h){return arguments.length?(r=+h,o):r},o.radius=function(h){return arguments.length?(n=typeof h=="function"?h:sn(+h),c(),o):n},o}var US={value:()=>{}};function Th(){for(var n=0,t=arguments.length,e={},i;n<t;++n){if(!(i=arguments[n]+"")||i in e||/[\s.]/.test(i))throw new Error("illegal type: "+i);e[i]=[]}return new xl(e)}function xl(n){this._=n}function OS(n,t){return n.trim().split(/^|\s+/).map(function(e){var i="",s=e.indexOf(".");if(s>=0&&(i=e.slice(s+1),e=e.slice(0,s)),e&&!t.hasOwnProperty(e))throw new Error("unknown type: "+e);return{type:e,name:i}})}xl.prototype=Th.prototype={constructor:xl,on:function(n,t){var e=this._,i=OS(n+"",e),s,r=-1,a=i.length;if(arguments.length<2){for(;++r<a;)if((s=(n=i[r]).type)&&(s=FS(e[s],n.name)))return s;return}if(t!=null&&typeof t!="function")throw new Error("invalid callback: "+t);for(;++r<a;)if(s=(n=i[r]).type)e[s]=pp(e[s],n.name,t);else if(t==null)for(s in e)e[s]=pp(e[s],n.name,null);return this},copy:function(){var n={},t=this._;for(var e in t)n[e]=t[e].slice();return new xl(n)},call:function(n,t){if((s=arguments.length-2)>0)for(var e=new Array(s),i=0,s,r;i<s;++i)e[i]=arguments[i+2];if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(r=this._[n],i=0,s=r.length;i<s;++i)r[i].value.apply(t,e)},apply:function(n,t,e){if(!this._.hasOwnProperty(n))throw new Error("unknown type: "+n);for(var i=this._[n],s=0,r=i.length;s<r;++s)i[s].value.apply(t,e)}};function FS(n,t){for(var e=0,i=n.length,s;e<i;++e)if((s=n[e]).name===t)return s.value}function pp(n,t,e){for(var i=0,s=n.length;i<s;++i)if(n[i].name===t){n[i]=US,n=n.slice(0,i).concat(n.slice(i+1));break}return e!=null&&n.push({name:t,value:e}),n}var nr=0,ra=0,sa=0,gp=1e3,yl,aa,vl=0,_s=0,Sl=0,oa=typeof performance=="object"&&performance.now?performance:Date,_p=typeof window=="object"&&window.requestAnimationFrame?window.requestAnimationFrame.bind(window):function(n){setTimeout(n,17)};function xp(){return _s||(_p(kS),_s=oa.now()+Sl)}function kS(){_s=0}function Ah(){this._call=this._time=this._next=null}Ah.prototype=Rh.prototype={constructor:Ah,restart:function(n,t,e){if(typeof n!="function")throw new TypeError("callback is not a function");e=(e==null?xp():+e)+(t==null?0:+t),!this._next&&aa!==this&&(aa?aa._next=this:yl=this,aa=this),this._call=n,this._time=e,Eh()},stop:function(){this._call&&(this._call=null,this._time=1/0,Eh())}};function Rh(n,t,e){var i=new Ah;return i.restart(n,t,e),i}function BS(){xp(),++nr;for(var n=yl,t;n;)(t=_s-n._time)>=0&&n._call.call(void 0,t),n=n._next;--nr}function mp(){_s=(vl=oa.now())+Sl,nr=ra=0;try{BS()}finally{nr=0,GS(),_s=0}}function zS(){var n=oa.now(),t=n-vl;t>gp&&(Sl-=t,vl=n)}function GS(){for(var n,t=yl,e,i=1/0;t;)t._call?(i>t._time&&(i=t._time),n=t,t=t._next):(e=t._next,t._next=null,t=n?n._next=e:yl=e);aa=n,Eh(i)}function Eh(n){if(!nr){ra&&(ra=clearTimeout(ra));var t=n-_s;t>24?(n<1/0&&(ra=setTimeout(mp,Math.ceil(n-oa.now()-Sl)+1)),sa&&(sa=clearInterval(sa))):(sa||(vl=oa.now(),sa=setInterval(zS,gp)),nr=1,_p(mp))}}function yp(){let n=1;return()=>(n=(1664525*n+1013904223)%4294967296)/4294967296}var vp=3;function bl(n){return n.x}function Ch(n){return n.y}function Sp(n){return n.z}var HS=10,VS=Math.PI*(3-Math.sqrt(5)),WS=Math.PI*20/(9+Math.sqrt(221));function Ih(n,t){t=t||2;var e=Math.min(vp,Math.max(1,Math.round(t))),i,s=1,r=.001,a=1-Math.pow(r,1/300),o=0,l=.6,c=new Map,h=Rh(p),u=Th("tick","end"),d=yp();n==null&&(n=[]);function p(){g(),u.call("tick",i),s<r&&(h.stop(),u.call("end",i))}function g(f){var v,A=n.length,b;f===void 0&&(f=1);for(var T=0;T<f;++T)for(s+=(o-s)*a,c.forEach(function(E){E(s)}),v=0;v<A;++v)b=n[v],b.fx==null?b.x+=b.vx*=l:(b.x=b.fx,b.vx=0),e>1&&(b.fy==null?b.y+=b.vy*=l:(b.y=b.fy,b.vy=0)),e>2&&(b.fz==null?b.z+=b.vz*=l:(b.z=b.fz,b.vz=0));return i}function x(){for(var f=0,v=n.length,A;f<v;++f){if(A=n[f],A.index=f,A.fx!=null&&(A.x=A.fx),A.fy!=null&&(A.y=A.fy),A.fz!=null&&(A.z=A.fz),isNaN(A.x)||e>1&&isNaN(A.y)||e>2&&isNaN(A.z)){var b=HS*(e>2?Math.cbrt(.5+f):e>1?Math.sqrt(.5+f):f),T=f*VS,E=f*WS;e===1?A.x=b:e===2?(A.x=b*Math.cos(T),A.y=b*Math.sin(T)):(A.x=b*Math.sin(T)*Math.cos(E),A.y=b*Math.cos(T),A.z=b*Math.sin(T)*Math.sin(E))}(isNaN(A.vx)||e>1&&isNaN(A.vy)||e>2&&isNaN(A.vz))&&(A.vx=0,e>1&&(A.vy=0),e>2&&(A.vz=0))}}function m(f){return f.initialize&&f.initialize(n,d,e),f}return x(),i={tick:g,restart:function(){return h.restart(p),i},stop:function(){return h.stop(),i},numDimensions:function(f){return arguments.length?(e=Math.min(vp,Math.max(1,Math.round(f))),c.forEach(m),i):e},nodes:function(f){return arguments.length?(n=f,x(),c.forEach(m),i):n},alpha:function(f){return arguments.length?(s=+f,i):s},alphaMin:function(f){return arguments.length?(r=+f,i):r},alphaDecay:function(f){return arguments.length?(a=+f,i):+a},alphaTarget:function(f){return arguments.length?(o=+f,i):o},velocityDecay:function(f){return arguments.length?(l=1-f,i):1-l},randomSource:function(f){return arguments.length?(d=f,c.forEach(m),i):d},force:function(f,v){return arguments.length>1?(v==null?c.delete(f):c.set(f,m(v)),i):c.get(f)},find:function(){var f=Array.prototype.slice.call(arguments),v=f.shift()||0,A=(e>1?f.shift():null)||0,b=(e>2?f.shift():null)||0,T=f.shift()||1/0,E=0,_=n.length,M,z,P,N,B,Z;for(T*=T,E=0;E<_;++E)B=n[E],M=v-B.x,z=A-(B.y||0),P=b-(B.z||0),N=M*M+z*z+P*P,N<T&&(Z=B,T=N);return Z},on:function(f,v){return arguments.length>1?(u.on(f,v),i):u.on(f)}}}function Ph(){var n,t,e,i,s,r=sn(-30),a,o=1,l=1/0,c=.81;function h(g){var x,m=n.length,f=(t===1?ms(n,bl):t===2?ia(n,bl,Ch):t===3?gs(n,bl,Ch,Sp):null).visitAfter(d);for(s=g,x=0;x<m;++x)e=n[x],f.visit(p)}function u(){if(n){var g,x=n.length,m;for(a=new Array(x),g=0;g<x;++g)m=n[g],a[m.index]=+r(m,g,n)}}function d(g){var x=0,m,f,v=0,A,b,T,E,_=g.length;if(_){for(A=b=T=E=0;E<_;++E)(m=g[E])&&(f=Math.abs(m.value))&&(x+=m.value,v+=f,A+=f*(m.x||0),b+=f*(m.y||0),T+=f*(m.z||0));x*=Math.sqrt(4/_),g.x=A/v,t>1&&(g.y=b/v),t>2&&(g.z=T/v)}else{m=g,m.x=m.data.x,t>1&&(m.y=m.data.y),t>2&&(m.z=m.data.z);do x+=a[m.data.index];while(m=m.next)}g.value=x}function p(g,x,m,f,v){if(!g.value)return!0;var A=[m,f,v][t-1],b=g.x-e.x,T=t>1?g.y-e.y:0,E=t>2?g.z-e.z:0,_=A-x,M=b*b+T*T+E*E;if(_*_/c<M)return M<l&&(b===0&&(b=Qn(i),M+=b*b),t>1&&T===0&&(T=Qn(i),M+=T*T),t>2&&E===0&&(E=Qn(i),M+=E*E),M<o&&(M=Math.sqrt(o*M)),e.vx+=b*g.value*s/M,t>1&&(e.vy+=T*g.value*s/M),t>2&&(e.vz+=E*g.value*s/M)),!0;if(g.length||M>=l)return;(g.data!==e||g.next)&&(b===0&&(b=Qn(i),M+=b*b),t>1&&T===0&&(T=Qn(i),M+=T*T),t>2&&E===0&&(E=Qn(i),M+=E*E),M<o&&(M=Math.sqrt(o*M)));do g.data!==e&&(_=a[g.data.index]*s/M,e.vx+=b*_,t>1&&(e.vy+=T*_),t>2&&(e.vz+=E*_));while(g=g.next)}return h.initialize=function(g,...x){n=g,i=x.find(m=>typeof m=="function")||Math.random,t=x.find(m=>[1,2,3].includes(m))||2,u()},h.strength=function(g){return arguments.length?(r=typeof g=="function"?g:sn(+g),u(),h):r},h.distanceMin=function(g){return arguments.length?(o=g*g,h):Math.sqrt(o)},h.distanceMax=function(g){return arguments.length?(l=g*g,h):Math.sqrt(l)},h.theta=function(g){return arguments.length?(c=g*g,h):Math.sqrt(c)},h}function Lh(n){var t=sn(.1),e,i,s;typeof n!="function"&&(n=sn(n==null?0:+n));function r(o){for(var l=0,c=e.length,h;l<c;++l)h=e[l],h.vx+=(s[l]-h.x)*i[l]*o}function a(){if(e){var o,l=e.length;for(i=new Array(l),s=new Array(l),o=0;o<l;++o)i[o]=isNaN(s[o]=+n(e[o],o,e))?0:+t(e[o],o,e)}}return r.initialize=function(o){e=o,a()},r.strength=function(o){return arguments.length?(t=typeof o=="function"?o:sn(+o),a(),r):t},r.x=function(o){return arguments.length?(n=typeof o=="function"?o:sn(+o),a(),r):n},r}function Dh(n){var t=sn(.1),e,i,s;typeof n!="function"&&(n=sn(n==null?0:+n));function r(o){for(var l=0,c=e.length,h;l<c;++l)h=e[l],h.vy+=(s[l]-h.y)*i[l]*o}function a(){if(e){var o,l=e.length;for(i=new Array(l),s=new Array(l),o=0;o<l;++o)i[o]=isNaN(s[o]=+n(e[o],o,e))?0:+t(e[o],o,e)}}return r.initialize=function(o){e=o,a()},r.strength=function(o){return arguments.length?(t=typeof o=="function"?o:sn(+o),a(),r):t},r.y=function(o){return arguments.length?(n=typeof o=="function"?o:sn(+o),a(),r):n},r}function Nh(n){let t=2166136261;for(let e of n)t=Math.imul(t^e.codePointAt(0),16777619);return t>>>0}function bp(n,t=new Map){let e=[...new Set(n.map(a=>a.sessionKey||a.context?.sessionKey||a.runId))].sort(),i=Math.max(170,Math.sqrt(n.length)*38),s=[...n].sort((a,o)=>a.id.localeCompare(o.id)).map(a=>{let o=a.sessionKey||a.context?.sessionKey||a.runId,l=e.indexOf(o),c=l*2.39996323,h=e.length>1?i*Math.sqrt((l+.5)/e.length):0,u=Math.cos(c)*h,d=Math.sin(c)*h,p=t.get(a.id),g=Nh(a.id);return{...a,group:o,ax:u,ay:d,x:p?.x??u+Math.cos(g)*45,y:p?.y??d+Math.sin(g)*45,z:0}}),r=Ih(s,2).stop().force("charge",Ph().strength(-650).distanceMax(i*2)).force("collision",wh(25).iterations(2)).force("x",Lh(a=>a.ax).strength(.055)).force("y",Dh(a=>a.ay).strength(.055)).velocityDecay(.45).alphaDecay(.045);return{nodes:s,simulation:r,radius:i}}var Mp=["#7ba9eb","#6ac8b7","#d9b978","#ba9fd8","#dc929c","#86baca"],rn=n=>document.getElementById(n);function wp(n,t){let e=rn("scene"),i=rn("graph"),s=new Nr,r=new cn(40,1,1,2e4),a=new _l(r,i);a.minDistance=100,a.maxDistance=12e3,a.enableRotate=!1,a.mouseButtons.LEFT=li.PAN,a.zoomSpeed=.85,a.listenToKeyEvents(i);let o=null,l=null;try{o=new fl({canvas:i,antialias:!0,powerPreference:"low-power"}),o.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),o.setClearColor(1185566,1)}catch{try{l=i.getContext("2d")}catch{}}rn("graph-error").hidden=!!(o||l);let c=new Bn({transparent:!0,depthWrite:!1,vertexColors:!0,uniforms:{uPixelRatio:{value:o?o.getPixelRatio():1}},vertexShader:"uniform float uPixelRatio; attribute float aSize; attribute float aOpacity; varying vec3 vColor; varying float vOpacity; void main(){vColor=color;vOpacity=aOpacity;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_Position=projectionMatrix*mv;gl_PointSize=clamp(aSize*2000.0/max(150.0,-mv.z),16.0,90.0)*uPixelRatio;}",fragmentShader:`varying vec3 vColor; varying float vOpacity; void main(){float r=length(gl_PointCoord-vec2(.5))*2.0;float a=(exp(-r*r*6.0)*.40+exp(-r*r*38.0)*.9)*(1.0-smoothstep(.60,1.0,r))*vOpacity;if(a<.003)discard;gl_FragColor=vec4(vColor,a);
#include <colorspace_fragment>
}`}),h,u=[],d=null,p=null,g=null,x=900,m=800,f="",v="",A=null,b=null,T=null,E=new Map;function _(k){let j=new X(k.x,k.y,k.z).project(r);return{x:(j.x+1)*x/2,y:(1-j.y)*m/2,z:j.z}}function M(){let j=Math.max(180,...u.map(D=>Math.hypot(D.x,D.y,D.z)))/Math.tan(r.fov*Math.PI/360)*1.25/Math.min(1,x/m);r.position.set(0,0,j),a.target.set(0,0,0),a.update()}function z(){if(!h)return;let k=h.geometry;u.forEach((j,D)=>{k.attributes.position.setXYZ(D,j.x,j.y,j.z),E.set(j.id,{x:j.x,y:j.y,z:j.z})}),k.attributes.position.needsUpdate=!0,k.computeBoundingSphere()}function P(){let k=d?.memoryId||d?.focusWiki?.memoryId;if(u.forEach((D,$)=>{D.active=D.memoryId===k,D.sourceMatch=g?.has(D.runId)||!1,D.searchMatch=p?.has(D.memoryId)||!1,D.emphasized=D.active||D.sourceMatch||D.searchMatch,D.opacity=D.emphasized?1:.78,D.size=D.active?64:D.emphasized?48:29;let W=new ie(Mp[Nh(D.group)%Mp.length]);D.emphasized&&W.lerp(new ie("#ffffff"),D.active?.5:.25),D.color="#"+W.getHexString(),h.geometry.attributes.color.setXYZ($,W.r,W.g,W.b),h.geometry.attributes.aSize.setX($,D.size),h.geometry.attributes.aOpacity.setX($,D.opacity)}),h)for(let D of["color","aSize","aOpacity"])h.geometry.attributes[D].needsUpdate=!0;let j=u.map(D=>D.id).join("|");j!==v&&rn("node-list").replaceChildren(...u.map(D=>{let $=document.createElement("button");return $.textContent=D.title,$.dataset.memoryId=D.memoryId,$.dataset.runId=D.runId,$.title="\u5355\u51FB\u9605\u8BFB\uFF1B\u53CC\u51FB\u5B9A\u4F4D\u5DE6\u4FA7\u6765\u6E90",$.onclick=()=>n(D),$.ondblclick=()=>t(D),$})),v=j;for(let D of rn("node-list").children){let $=D.dataset.memoryId===k;D.classList.toggle("active",$),D.setAttribute("aria-pressed",String($)),D.classList.toggle("source-match",g?.has(D.dataset.runId)||!1),D.classList.toggle("search-match",p?.has(D.dataset.memoryId)||!1)}B()}function N(k){A?.stop(),b&&cancelAnimationFrame(b),h&&(h.geometry.dispose(),s.remove(h));let j=bp(k,E);u=j.nodes,A=j.simulation,A.tick(u.length<500?80:5);let D=new $n;D.setAttribute("position",new Je(new Float32Array(u.length*3),3)),D.setAttribute("color",new Je(new Float32Array(u.length*3),3)),D.setAttribute("aSize",new Je(new Float32Array(u.length),1)),D.setAttribute("aOpacity",new Je(new Float32Array(u.length),1)),h=new Fr(D,c),h.frustumCulled=!1,s.add(h),rn("renderer-label").textContent=`2D \xB7 ${o?"WebGL":l?"Canvas":"\u8282\u70B9\u5217\u8868"}`,rn("graph-empty").hidden=u.length>0,z(),M(),P();function $(){if(document.hidden){b=null;return}A.tick(),z(),B(),A.alpha()>A.alphaMin()?b=requestAnimationFrame($):(b=null,A.stop())}!matchMedia("(prefers-reduced-motion: reduce)").matches&&u.length?b=requestAnimationFrame($):(A.tick(90),z(),M(),B())}function B(){if(r.updateMatrixWorld(),o)o.render(s,r);else if(l){l.clearRect(0,0,x,m),l.fillStyle="#12171e",l.fillRect(0,0,x,m);for(let W of[...u].sort((ot,At)=>_(At).z-_(ot).z)){let ot=_(W);if(Math.abs(ot.z)>=1)continue;let At=W.size*.55,K=l.createRadialGradient(ot.x,ot.y,0,ot.x,ot.y,At);K.addColorStop(0,W.color),K.addColorStop(.18,W.color+"aa"),K.addColorStop(1,W.color+"00"),l.globalAlpha=W.opacity,l.fillStyle=K,l.fillRect(ot.x-At,ot.y-At,At*2,At*2)}l.globalAlpha=1}let k=[],j=[],D=[],$=[...u].sort((W,ot)=>Number(ot.active)*4+ +(ot.id===T?.id)*3+Number(ot.emphasized)-(Number(W.active)*4+ +(W.id===T?.id)*3+Number(W.emphasized)));for(let W of $){let ot=_(W);if(Math.abs(ot.z)>=1||ot.x<0||ot.x>x||ot.y<0||ot.y>m)continue;if(W.emphasized){let Ct=document.createElement("span");Ct.className="graph-ring"+(W.sourceMatch?" source-match":"")+(W.searchMatch?" search-match":"")+(W.active?" active":""),Ct.dataset.memoryId=W.memoryId,Ct.style.left=ot.x+"px",Ct.style.top=ot.y+"px",D.push(Ct)}if(!W.emphasized&&W.id!==T?.id&&!rn("show-labels").checked)continue;let At=Math.max(88,Math.min(x-88,ot.x)),K=Math.min(m-38,ot.y),ht={x:At-82,y:K+15,w:164,h:22};if(!W.active&&k.some(Ct=>ht.x<Ct.x+Ct.w&&ht.x+ht.w>Ct.x&&ht.y<Ct.y+Ct.h&&ht.y+ht.h>Ct.y))continue;k.push(ht);let ct=document.createElement("span");ct.className="graph-label wiki"+(W.active?" focus":""),ct.classList.toggle("source-match",W.sourceMatch),ct.classList.toggle("search-match",W.searchMatch),ct.dataset.memoryId=W.memoryId,ct.textContent=W.title,ct.style.left=At+"px",ct.style.top=K+"px",j.length<80&&j.push(ct)}rn("node-highlights").replaceChildren(...D),rn("labels").replaceChildren(...j)}function Z(){x=e.clientWidth||900,m=e.clientHeight||800,r.aspect=x/m,r.updateProjectionMatrix(),o?o.setSize(x,m,!1):(i.width=x,i.height=m),B()}function I(k){let j=i.getBoundingClientRect(),D=null,$=18;for(let W of u){let ot=_(W);if(Math.abs(ot.z)>=1)continue;let At=Math.hypot(k.clientX-j.left-ot.x,k.clientY-j.top-ot.y);At<$&&($=At,D=W)}return D}let Y=null;i.addEventListener("pointerdown",k=>{Y=[k.clientX,k.clientY]}),i.addEventListener("pointerup",k=>{if(Y&&k.button===0&&Math.hypot(k.clientX-Y[0],k.clientY-Y[1])<5){let j=I(k);j&&n(j)}Y=null}),i.addEventListener("dblclick",k=>{let j=I(k);j&&t(j)}),i.addEventListener("pointermove",k=>{T=k.buttons?null:I(k);let j=rn("hover-tip");if(j.style.display=T?"block":"none",i.style.cursor=T?"pointer":"grab",T){let D=i.getBoundingClientRect();j.textContent=T.title,j.style.left=Math.max(5,Math.min(x-230,k.clientX-D.left+14))+"px",j.style.top=Math.min(m-60,k.clientY-D.top+14)+"px"}B()}),i.addEventListener("pointerleave",()=>{Y=null,T=null,rn("hover-tip").style.display="none",B()}),a.addEventListener("change",B),rn("reset").onclick=M;function et(k){let j=r.position.clone().sub(a.target).multiplyScalar(k).clampLength(a.minDistance,a.maxDistance);r.position.copy(a.target).add(j),a.update()}return rn("zoom-in").onclick=()=>et(.8),rn("zoom-out").onclick=()=>et(1.25),rn("show-labels").onchange=B,new ResizeObserver(Z).observe(e),Z(),{update(k,j,D=null,$=null){d=j,p=D,g=$;let W=k.wikis.map(ot=>ot.id).sort().join("|");!h||W!==f?(f=W,N(k.wikis)):P()}}}function Tp(n){let t;try{t=JSON.parse(n)}catch{return{kind:"markdown",text:n}}return!t||typeof t!="object"?{kind:"markdown",text:n}:!Array.isArray(t)&&t.source==="memory"&&typeof t.summary=="string"?{kind:"memory",text:t.summary,raw:n}:{kind:"json",text:JSON.stringify(t,null,2)}}var Ml=(...n)=>JSON.stringify(n);function Ap(n,t,e=[]){let i=new Map(n.map(r=>[r.session_key,r]));for(let r of t)for(let a of r.sessions)i.has(a.session_key)||i.set(a.session_key,a);let s=new Map;for(let r of i.values()){let a=r.bot_id||"";s.has(a)||s.set(a,{kind:"bot",id:Ml("bot",a),botId:a,label:r.bot_name||e.find(h=>h.bot_id===a)?.bot_name||a||"\u672A\u8BB0\u5F55 Bot",children:[]});let o=s.get(a),l=t.filter(h=>h.sessions.some(u=>u.session_key===r.session_key)),c=[...new Set([...r.participant_names||[],...l.flatMap(h=>h.sessions.filter(u=>u.session_key===r.session_key).flatMap(u=>u.participant_names||[]))])].sort();l.some(h=>!h.sessions.find(u=>u.session_key===r.session_key)?.participant_names?.length)&&!c.includes("")&&c.push("");for(let h of c.length?c:[""]){let u=o.children.find(p=>p.userName===h);u||(u={kind:"user",id:Ml("user",a,h),botId:a,userName:h,label:h||"\u672A\u8BB0\u5F55\u7528\u6237",children:[]},o.children.push(u));let d={kind:"session",id:Ml("session",a,h,r.session_key),botId:a,userName:h,sessionKey:r.session_key,label:r.session_name||"",session:r,children:[]};for(let p of[...l].sort((g,x)=>g.created_at.localeCompare(x.created_at)||g.run_id.localeCompare(x.run_id))){let x=p.sessions.find(m=>m.session_key===r.session_key).participant_names||[];(x.length?!x.includes(h):h!=="")||d.children.push({kind:"batch",id:Ml("batch",a,h,r.session_key,p.run_id),botId:a,userName:h,sessionKey:r.session_key,runId:p.run_id,batch:p,children:[]})}u.children.push(d)}}return[...s.values()].sort((r,a)=>r.label.localeCompare(a.label))}function xs(n){return n.flatMap(t=>[t,...xs(t.children)])}function Ep(n,t){let e=t?xs(n).find(i=>i.id===t.id):null;return t&&!e?new Set:new Set(xs(e?[e]:n).filter(i=>i.kind==="batch").map(i=>i.runId))}function Uh(n,t){let e=[];function i(s,r){for(let a of s){let o=[...r,a];a.kind==="batch"&&a.runId===t?e.push(o):i(a.children,o)}}return i(n,[]),e}var XS={bot:"\u25C8",user:"\u25C9",session:"\u25A4",batch:"\xB7"};function Rp(n,t){let e=new Set,i=new Set,s=[],r=null,a=null;function o(){let l=n.scrollTop,c=n.contains(document.activeElement)?{id:document.activeElement.closest(".tree-row")?.dataset.treeId,toggle:document.activeElement.classList.contains("tree-toggle")}:null,h=Uh(s,a),u=new Set(h.flatMap(x=>x.map(m=>m.id))),d=[];function p(x,m){for(let f of x){let v=document.createElement("div");v.className="tree-row",v.style.setProperty("--depth",m),v.dataset.treeId=f.id,v.dataset.kind=f.kind,f.runId&&(v.dataset.runId=f.runId),v.classList.toggle("is-scope",r?.id===f.id),v.classList.toggle("is-related",u.has(f.id)),v.classList.toggle("is-selected",f.kind==="batch"&&f.runId===a);let A=document.createElement("button");A.className="tree-toggle",A.textContent=f.kind==="batch"?"":e.has(f.id)?"\u2304":"\u203A",A.disabled=f.kind==="batch",A.setAttribute("aria-label",`${e.has(f.id)?"\u6536\u8D77":"\u5C55\u5F00"}${f.label||"\u4F1A\u8BDD"}`),f.kind!=="batch"&&A.setAttribute("aria-expanded",String(e.has(f.id))),A.onclick=()=>{e.has(f.id)?e.delete(f.id):e.add(f.id),o()};let b=document.createElement("button");b.className="tree-select",b.setAttribute("aria-pressed",String(r?.id===f.id));let T=document.createElement("span");T.className="tree-icon",T.textContent=XS[f.kind],T.setAttribute("aria-hidden","true");let E=document.createElement("span");E.className="tree-label";let _=f.session?.first_received_at||f.session?.last_received_at||f.children[0]?.batch?.created_at;E.textContent=f.kind==="batch"?new Date(f.batch.created_at).toLocaleString([],{month:"numeric",day:"numeric",hour:"2-digit",minute:"2-digit"}):f.label||(_?new Date(_).toLocaleDateString():"\u2014");let M=document.createElement("small");M.textContent=f.kind==="batch"?`${f.batch.published_memory_count} Wiki`:String(f.children.length),b.title=f.session?.session_key||(f.kind==="batch"?`${f.batch.status} \xB7 ${f.runId}`:f.label),b.setAttribute("aria-label",`${{bot:"Bot",user:"\u7528\u6237",session:"\u4F1A\u8BDD",batch:"\u6279\u6B21"}[f.kind]} ${E.textContent}`),b.onclick=()=>{e.add(f.id),t(f)},b.append(T,E,M),v.append(A,b),d.push(v),e.has(f.id)&&p(f.children,m+1)}}p(s,0),n.replaceChildren(...d),n.scrollTop=l,(c&&d.find(x=>x.dataset.treeId===c.id))?.querySelector(c.toggle?".tree-toggle":".tree-select").focus({preventScroll:!0})}return{update(l,c,h){s=l,r=c,a=h;for(let u of xs(s))i.has(u.id)||((u.kind==="bot"||u.kind==="user")&&e.add(u.id),i.add(u.id));o()},reveal(l,c=!1){a=l;let h=Uh(s,l);for(let u of h)for(let d of u)e.add(d.id);if(o(),c){let u=h.find(p=>p.some(g=>g.id===r?.id))||h[0],d=u&&[...n.children].find(p=>p.dataset.treeId===u.at(-1).id);d&&(n.scrollTop+=d.getBoundingClientRect().top-n.getBoundingClientRect().top-n.clientHeight*.4)}}}}fe.setOptions({gfm:!0,breaks:!1});var xt=n=>document.getElementById(n),U={key:"",sessions:[],batches:[],contexts:[],wikis:[],selected:null,loading:!1,error:"",sessionOffset:0,batchOffset:0,searchHits:null,abort:null,generation:0,uploadKeyId:"",dateFrom:"",dateTo:"",uploadKeys:[],bots:[],scope:null},Cp=wp(sr,n=>ir(n,!0)),Ip=Rp(xt("sessions"),Lp),Pp=n=>`${new Date(n.created_at).toLocaleString()} \xB7 ${n.status} \xB7 ${n.task_count??0} tasks \xB7 ${n.published_memory_count??0} Wiki`;function Gn(n){xt("toast").textContent=n,xt("toast").classList.add("visible"),setTimeout(()=>xt("toast").classList.remove("visible"),2400)}async function fi(n,t={},e){let i=await fetch("/v1"+n,{...t,signal:e,headers:{authorization:"Bearer "+U.key,...t.body?{"content-type":"application/json"}:{},...t.headers}});if(!i.ok){let s=await i.json().catch(()=>({}));throw new Error(s.error||`HTTP ${i.status}`)}return i.json()}function Oh(){U.generation++,U.abort?.abort(),U.abort=null,U.sessions=[],U.batches=[],U.contexts=[],U.wikis=[],U.selected=null,U.searchHits=null,U.scope=null,U.sessionOffset=0,U.batchOffset=0,U.sessionNext=null,U.batchNext=null,U.totalBatches=0,Cp.update({sessions:[],batches:[],contexts:[],wikis:[]},null),xt("sessions").replaceChildren(),xt("search-results").replaceChildren(),xt("reader-content").replaceChildren(),xt("reader-title").textContent="",xt("reader-id").textContent="",xt("reader-meta").textContent=""}function wl(n){let t=U.sessions.find(e=>e.session_key===n?.session_key);return t?.session_name||(t?.participant_names||[]).join("\u3001")||""}function kh(){return Ap(U.sessions,U.batches,U.bots)}function qS(){return Ep(kh(),U.scope)}function ir(n,t=!1){Ip.reveal(n.runId,t)}function an(){for(let e of[...U.contexts,...U.wikis])e.sessionLabel=wl({session_key:e.sessionKey||e.context?.sessionKey});let n=qS(),t=U.wikis.filter(e=>n.has(e.runId)).length;Cp.update({wikis:U.wikis},U.selected,U.searchHits,U.scope?n:null),xt("map-status").textContent=U.loading?"\u52A0\u8F7D\u4E2D\u2026":U.error?"\u8BFB\u53D6\u5931\u8D25":U.scope?`\u6765\u6E90\u9AD8\u4EAE\uFF1A${U.scope.label||(U.scope.kind==="batch"?"\u6240\u9009\u6279\u6B21":"\u6240\u9009\u4F1A\u8BDD")}`:"\u5168\u90E8\u8BB0\u5FC6",xt("map-status").title=xt("map-status").textContent,xt("sample-count").textContent=`${U.wikis.length} \u7BC7 Wiki \xB7 ${U.batches.length} \u4E2A\u6279\u6B21${U.scope?` \xB7 \u6765\u6E90\u9009\u4E2D ${t} \u7BC7`:""}${U.searchHits?` \xB7 \u641C\u7D22\u547D\u4E2D ${U.searchHits.size} \u7BC7`:""}${U.batchNext?" \xB7 \u53EF\u7EE7\u7EED\u8F7D\u5165":""}`,xt("selection-path").textContent=U.selected?`${U.selected.sessionLabel||"\u4F1A\u8BDD"} / ${U.selected.runLabel||U.selected.title}`:"",xt("locate-source").disabled=!U.selected}function ti(){xt("session-count").textContent=String(U.sessions.length),Ip.update(kh(),U.scope,U.selected?.runId),xt("all-sources").classList.toggle("active",!U.scope),xt("more-sessions").hidden=!U.sessionNext,xt("more-runs").hidden=!U.batchNext}async function Lp(n){U.scope=n,ti(),an(),pi(),n?.kind==="batch"&&await la(n.runId)}function Dp(n,t){n.innerHTML=Lu.sanitize(fe.parse(t),{USE_PROFILES:{html:!0}})}function Np(n){return n.text??JSON.stringify(n.content,null,2)??""}function YS(n){let t=Np(n),e=/^\[发言人\s*[:：]\s*([^\]\r\n]+)\][ \t]*(?:\r?\n)?/u.exec(t);return{name:e?.[1].trim().replace(/[（(](?:人|用户|机器人|智能体|助手|bot|AI)[）)]$/iu,"").trim()||(n.kind==="query"?"\u7528\u6237":"Bot"),text:e?t.slice(e[0].length):t}}function $S(n,t){let e=Tp(t);if(e.kind==="json"){let i=document.createElement("pre");i.textContent=e.text,n.append(i)}else if(Dp(n,e.text),e.kind==="memory"){let i=document.createElement("details");i.className="message-envelope";let s=document.createElement("summary");s.textContent="\u67E5\u770B\u539F\u59CB\u6CE8\u5165\u6570\u636E";let r=document.createElement("pre");r.textContent=e.raw,i.append(s,r),n.append(i)}return e.kind}function ZS(n,t){let e=new Map;for(let i of t){let s=i.session_key+"\0"+(i.source_group||i.conversation_run_id||i.ref);e.has(s)||e.set(s,[]),e.get(s).push(i)}for(let i of e.values()){let s=document.createElement("section");s.className="conversation-episode";let r=i.some(l=>l.selected!==!1),a=document.createElement("div");a.className="episode-divider",a.textContent=r?"\u5BF9\u8BDD\u6BB5":"\u5BF9\u8BDD\u6BB5 \xB7 \u672A\u9009",s.append(a);let o=null;for(let l of i){if(l.kind==="tool_result"&&i.some(u=>u.kind==="tool_call"&&u.tool_call_id&&u.tool_call_id===l.tool_call_id))continue;let c=l.kind==="tool_call"||l.kind==="tool_result",h=document.createElement(c?"details":"article");if(h.className=(c?"tool-pair":`event ${l.kind==="query"?"query":"msg"}`)+(l.selected===!1?" unselected":""),h.dataset.ref=l.ref,h.tabIndex=0,c){let u=l.kind==="tool_call"?i.find(x=>x.kind==="tool_result"&&x.tool_call_id===l.tool_call_id):null,d=document.createElement("summary");d.textContent=l.content?.name||"\u5DE5\u5177\u8BB0\u5F55",d.title=`${l.ref}${l.selected===!1?" \xB7 \u672A\u9009":""}`;let p=document.createElement("div");p.className="tool-body";let g=x=>{let m=document.createElement("pre");m.textContent=Np(x),x.selected===!1&&(m.className="unselected"),p.append(m)};if(g(l),u&&g(u),!u&&l.tool_pair_ref){let x=document.createElement("button");x.textContent="\u52A0\u8F7D\u914D\u5BF9\u8BB0\u5F55",x.onclick=async()=>{try{let m=await fi("/read",{method:"POST",body:JSON.stringify({ref:l.tool_pair_ref})});g({...m.event,selected:l.tool_pair_selected}),x.remove()}catch(m){Gn("\u5DE5\u5177\u8BB0\u5F55\u8BFB\u53D6\u5931\u8D25\uFF1A"+m.message)}},p.append(x)}h.append(d,p)}else{let u=YS(l),d=document.createElement("div");d.className="event-heading",d.textContent=u.name;let p=document.createElement("div");p.className="message-body",l.kind==="query"?p.textContent=u.text:$S(p,u.text)==="memory"&&(d.textContent="\u8BB0\u5FC6\u6CE8\u5165");let g=document.createElement("span");g.className="event-ref",g.textContent=[l.timestamp,l.ref].filter(Boolean).join(" \xB7 "),g.title=g.textContent,h.append(d,p,g)}if(c){if(!o){let u=document.createElement("details");u.className="tool-stack",u.dataset.ref="tools:"+l.ref;let d=document.createElement("summary");u.append(d);let p=document.createElement("div");u.append(p),s.append(u),o={stack:u,summary:d,body:p,count:0,selected:!1}}o.count++,o.selected||=l.selected!==!1,o.summary.textContent=`${o.count} \u6761\u5DE5\u5177\u8BB0\u5F55`,o.stack.classList.toggle("unselected",!o.selected),o.body.append(h)}else o=null,s.append(h)}n.append(s)}}function Fh(n){let t=n.pages?.at(-1)?.batch;if(!t||t.sessions?.length!==1)return null;let e=t.sessions[0].session_key;return U.batches.filter(i=>i.sessions?.some(s=>s.session_key===e)).sort((i,s)=>i.created_at.localeCompare(s.created_at)||i.run_id.localeCompare(s.run_id)).find(i=>i.created_at>t.created_at||i.created_at===t.created_at&&i.run_id>t.run_id)||null}function KS(n){let t=xt("reader-content");for(let s of n.pages){let r=document.createElement("section");r.className="batch-block",r.dataset.runId=s.batch.run_id;let a=document.createElement("div");if(a.className="batch-banner",a.textContent=new Date(s.batch.created_at).toLocaleString(),n.focusWiki){let o=document.createElement("span");o.textContent=s.batch.run_id===n.focusWiki.runId?"Wiki \u6765\u6E90\u6279\u6B21":"\u672A\u9009\u6279\u6B21",a.append(o)}if(r.append(a),ZS(r,s.events),s.error){let o=document.createElement("p");o.className="reader-error",o.textContent=s.error,r.append(o)}t.append(r)}let e=n.pages.at(-1),i=document.createElement("button");i.className="load-conversation",i.textContent=n.loadingMore?"\u52A0\u8F7D\u4E2D\u2026":e.nextOffset!=null?"\u7EE7\u7EED\u52A0\u8F7D\u672C\u6279\u6B21":Fh(n)?"\u7EE7\u7EED\u67E5\u770B\u4E0B\u4E00\u6279\u6B21":"\u5DF2\u5230\u672C\u6279\u6B21\u672B\u5C3E",i.disabled=n.loadingMore||e.nextOffset==null&&!Fh(n),i.onclick=()=>Bh(n),t.append(i)}function pi(n=!1){let t=U.selected,e=xt("reader-content"),i=n?e.scrollTop:0,s=new Set(n?[...e.querySelectorAll("details[open]")].map(r=>r.dataset.ref):[]);if(document.querySelectorAll("[data-view]").forEach(r=>r.classList.toggle("active",!!t&&r.dataset.view===(t?.kind==="wiki"?"wiki":"context"))),e.classList.toggle("conversation-view",!!(t&&t.kind!=="wiki")),e.replaceChildren(),xt("reader-meta").replaceChildren(),!t){xt("reader-title").textContent="",xt("reader-id").textContent="",xt("reader-label").textContent=U.key?"\u672A\u9009\u62E9":"\u672A\u8FDE\u63A5",e.textContent=U.error||(U.key?"\u5F53\u524D\u7B5B\u9009\u4E0B\u6682\u65E0\u5185\u5BB9":"\u4F7F\u7528\u9879\u76EE Key \u8FDE\u63A5\u8BB0\u5FC6\u670D\u52A1"),xt("reader-footnote").textContent="\u672A\u8BFB\u53D6\u670D\u52A1\u5668\u5185\u5BB9",xt("follow-source").disabled=!0;return}xt("reader-title").textContent=t.title,xt("reader-id").textContent=t.id,xt("follow-source").disabled=!1,t.kind==="wiki"?(xt("reader-label").textContent="Wiki",xt("reader-footnote").textContent="\u4FDD\u5B58\u7684 Markdown \xB7 \u53EF\u56DE\u67E5\u4F1A\u8BDD\u539F\u6587",xt("follow-source").textContent="\u67E5\u770B\u539F\u6587 \u2197",Dp(e,t.markdown||"\u52A0\u8F7D\u8BB0\u5FC6\u2026")):(xt("reader-label").textContent="\u4F1A\u8BDD\u539F\u6587",xt("reader-footnote").textContent=t.focusWiki?"\u6DE1\u8272\u4E3A\u5F53\u524D Wiki \u672A\u9009\u5185\u5BB9":"\u5B8C\u6574\u6279\u6B21 \xB7 \u5DE5\u5177\u8BB0\u5F55\u9ED8\u8BA4\u6298\u53E0",xt("follow-source").textContent="\u8FD4\u56DE Wiki",xt("follow-source").disabled=!t.focusWiki&&!U.wikis.some(r=>r.runId===t.runId),KS(t));for(let r of e.querySelectorAll("details"))s.has(r.dataset.ref)&&(r.open=!0);e.scrollTop=i}async function la(n,t=null){let e=U.batches.find(r=>r.run_id===n);if(!e)return;let i={batch:e,events:[],nextOffset:0},s={id:n,runId:n,kind:"batch",title:t?.title||"\u4F1A\u8BDD\u539F\u6587",focusWiki:t,pages:[i],sessionLabel:wl(e.sessions?.[0]),runLabel:new Date(e.created_at).toLocaleString()};U.selected=s,an(),ti(),ir(s),pi(),await Bh(s)}async function JS(n){let t=U.wikis.find(e=>e.memoryId===n.memoryId);await la(n.runId,t||null)}async function Bh(n){if(n!==U.selected||n.loadingMore)return;let t=n.pages.at(-1);if(t.nextOffset==null){let e=Fh(n);if(!e)return;t={batch:e,events:[],nextOffset:0},n.pages.push(t)}n.loadingMore=!0,t.error=null;try{let e=new URLSearchParams({offset:String(t.nextOffset),limit:"100"});n.focusWiki?.runId===t.batch.run_id&&(e.set("thread_id",n.focusWiki.threadId),e.set("context","true"));let i=await fi(`/workbench/runs/${encodeURIComponent(t.batch.run_id)}/events?${e}`);if(n!==U.selected)return;t.events.push(...i.items.map(s=>n.focusWiki&&n.focusWiki.runId!==t.batch.run_id?{...s,selected:!1}:s)),t.nextOffset=i.next_offset}catch(e){t.error="\u539F\u6587\u52A0\u8F7D\u5931\u8D25\uFF1A"+e.message,Gn(t.error)}finally{n.loadingMore=!1,n===U.selected&&pi(!0)}}async function jS(n){if(U.selected?.id===n.id&&U.selected?.kind==="wiki"){ir(n);return}U.selected={...n,kind:"wiki",title:n.title,markdown:null},an(),ti(),ir(n),pi();let t=U.generation,e=await fi(`/memories/${encodeURIComponent(n.memoryId)}`);t!==U.generation||U.selected?.id!==n.id||(Object.assign(U.selected,{markdown:e.markdown}),pi())}async function sr(n){try{if(n.kind==="wiki")await jS(n);else if(n.kind==="context")await JS(n);else{let t=U.selected?.kind==="wiki"?U.selected:U.selected?.focusWiki;await la(n.runId,t?.runId===n.runId?t:null)}}catch(t){Gn("\u8BFB\u53D6\u5931\u8D25\uFF1A"+t.message)}}async function zh(n=!1){let t=U.generation,e=new URLSearchParams({limit:"50",offset:String(n?U.sessionOffset:0)});U.uploadKeyId&&e.set("upload_key_id",U.uploadKeyId),U.dateFrom&&e.set("date_from",U.dateFrom),U.dateTo&&e.set("date_to",U.dateTo);let i=await fi(`/workbench/sessions?${e}`);t===U.generation&&(n||(U.sessions=[]),U.sessions.push(...i.items),U.sessionOffset=U.sessions.length,U.sessionNext=i.next_offset)}async function Gh(n=!1){let t=U.generation,e=new URLSearchParams({limit:"50",offset:String(n?U.batchOffset:0)});U.uploadKeyId&&e.set("upload_key_id",U.uploadKeyId),U.dateFrom&&e.set("date_from",U.dateFrom),U.dateTo&&e.set("date_to",U.dateTo);let i=await fi(`/workbench/runs?${e}`);if(t!==U.generation)return;n||(U.batches=[]),U.batches=[...new Map([...U.batches,...i.items].map(a=>[a.run_id,a])).values()],U.batchOffset=(n?U.batchOffset:0)+i.items.length,U.batchNext=i.next_offset,U.totalBatches=i.total;let s=i.items.filter(a=>a.task_count),r=await Promise.all(s.map(a=>fi(`/workbench/runs/${encodeURIComponent(a.run_id)}/graph?limit=100`)));if(t===U.generation)for(let a=0;a<s.length;a++)for(let o of r[a].tasks){let l=`${s[a].run_id}:${o.thread_id}`,c=o.sessions[0]||s[a].sessions[0],h={id:`context:${l}`,kind:"context",runId:s[a].run_id,threadId:o.thread_id,title:o.title,task:o,episode:o.episode,memoryId:o.episode?.memory_id,sessionKey:c?.session_key,sessionLabel:wl(c),runLabel:Pp(s[a])};U.contexts.some(u=>u.id===h.id)||(U.contexts.push(h),h.memoryId&&U.wikis.push({id:h.memoryId,kind:"wiki",memoryId:h.memoryId,contextId:h.id,runId:h.runId,threadId:h.threadId,title:o.title,context:h,sessionLabel:h.sessionLabel,runLabel:h.runLabel}))}}async function Up(){let n=U.generation,t=new URLSearchParams;U.uploadKeyId&&t.set("upload_key_id",U.uploadKeyId);let e=await fi(`/workbench/filters?${t}`);n===U.generation&&(U.uploadKeys=e.upload_keys,U.bots=e.bots,xt("upload-key-filter").replaceChildren(new Option("\u5168\u90E8\u4E0A\u4F20\u6765\u6E90",""),...U.uploadKeys.map(i=>new Option(`${i.label} \xB7 ${i.record_count} \u6761`,i.upload_key_id??"__unattributed__"))),xt("upload-key-filter").value=U.uploadKeyId)}async function Op(n){if(U.key=n.trim(),!U.key)throw new Error("\u8BF7\u586B\u5199\u9879\u76EE Key");Oh(),U.loading=!0,U.error="",xt("refresh").disabled=!0;let t=U.generation;try{if(await Up(),await Promise.all([zh(),Gh()]),t!==U.generation)return;U.loading=!1,ti(),an();let e=U.wikis[0]||U.contexts[0]||U.batches[0];e&&await sr(e),xt("connection-dialog").close(),xt("refresh").disabled=!1,xt("connection-button").textContent="\u5DF2\u8FDE\u63A5",Gn("\u5DF2\u8FDE\u63A5\u9879\u76EE\u6570\u636E")}catch(e){U.loading=!1,U.error=e.message,Oh(),U.error=e.message,an(),pi(),xt("connection-error").textContent=e.message}}function QS(){U.key="",U.uploadKeyId="",U.dateFrom="",U.dateTo="",xt("upload-key-filter").value="",xt("date-from").value="",xt("date-to").value="",Oh(),U.error="",xt("refresh").disabled=!0,xt("connection-button").textContent="\u8FDE\u63A5",ti(),an(),pi()}xt("connect-form").onsubmit=async n=>{n.preventDefault();try{await Op(xt("project-key").value),xt("project-key").value=""}catch(t){xt("connection-error").textContent=t.message}};xt("connection-button").onclick=()=>{U.key?QS():(xt("connection-dialog").showModal(),xt("connection-error").textContent="")};xt("cancel-connect").onclick=()=>xt("connection-dialog").close();xt("refresh").onclick=async()=>{U.key&&(U.loading=!0,await Op(U.key))};xt("upload-key-filter").onchange=()=>Tl();xt("date-from").onchange=()=>Tl();xt("date-to").onchange=()=>Tl();xt("clear-filters").onclick=()=>{xt("upload-key-filter").value="",xt("date-from").value="",xt("date-to").value="",Tl()};async function Tl(){if(U.uploadKeyId=xt("upload-key-filter").value,U.dateFrom=xt("date-from").value,U.dateTo=xt("date-to").value,U.dateFrom&&U.dateTo&&U.dateFrom>U.dateTo){Gn("\u5F00\u59CB\u65E5\u671F\u4E0D\u80FD\u665A\u4E8E\u7ED3\u675F\u65E5\u671F");return}if(!U.key)return;U.generation++,U.abort?.abort(),U.abort=null,U.sessions=[],U.batches=[],U.contexts=[],U.wikis=[],U.selected=null,U.scope=null,U.sessionOffset=0,U.batchOffset=0,U.searchHits=null,xt("search-results").replaceChildren(),xt("search").value="";let n=U.generation;ti(),an(),pi();try{if(await Up(),n!==U.generation||(await Promise.all([zh(),Gh()]),n!==U.generation))return;ti(),an(),pi();let t=U.wikis[0]||U.contexts[0]||U.batches[0];t&&await sr(t)}catch(t){Gn("\u7B5B\u9009\u6570\u636E\u8F7D\u5165\u5931\u8D25\uFF1A"+t.message)}}xt("more-sessions").onclick=async()=>{try{await zh(!0),ti(),an()}catch(n){Gn(n.message)}};xt("more-runs").onclick=async()=>{try{await Gh(!0),ti(),an()}catch(n){Gn(n.message)}};xt("search-form").onsubmit=async n=>{if(n.preventDefault(),!U.key){xt("connection-dialog").showModal();return}let t=xt("search").value.trim().split(/\s+/).filter(Boolean);if(!t.length){U.searchHits=null,an(),xt("search-results").replaceChildren();return}let e=U.generation;try{let i=await fi("/memories/search",{method:"POST",body:JSON.stringify({keywords:t,operator:xt("search-operator").value,limit:10,...U.uploadKeyId?{upload_key_id:U.uploadKeyId}:{},...U.dateFrom?{date_from:U.dateFrom}:{},...U.dateTo?{date_to:U.dateTo}:{}})});if(e!==U.generation)return;let s=await Promise.all(i.items.map(r=>fi("/memories/"+encodeURIComponent(r.memory_id))));if(e!==U.generation)return;U.searchHits=new Set(s.map(r=>r.memory_id)),an(),xt("search-results").replaceChildren(...s.map(r=>{let a=document.createElement("button");return a.textContent=r.markdown.split(`
`).find(o=>o.startsWith("# "))?.slice(2)||r.memory_id,a.onclick=async()=>{try{if(e!==U.generation)return;let o=U.wikis.find(l=>l.memoryId===r.memory_id);if(!o){let l=s.find(g=>g.memory_id===r.memory_id),c=await fi(`/workbench/runs/${encodeURIComponent(l.run_id)}/graph?limit=100`);if(e!==U.generation)return;let h={...c.run,sessions:c.run.sessions,task_count:c.total_tasks,published_memory_count:c.tasks.filter(g=>g.episode?.memory_id).length};U.batches.some(g=>g.run_id===h.run_id)||U.batches.push(h);let u=c.tasks.find(g=>g.thread_id===l.thread_id);if(!u){Gn("\u6279\u6B21\u4E2D\u627E\u4E0D\u5230\u8BB0\u5FC6\u5BF9\u5E94\u7684\u4EFB\u52A1");return}let d=u.sessions[0]||h.sessions[0],p={id:`context:${h.run_id}:${u.thread_id}`,runId:h.run_id,threadId:u.thread_id,title:u.title,task:u,episode:u.episode,memoryId:r.memory_id,sessionKey:d?.session_key,sessionLabel:wl(d),runLabel:Pp(h)};o={...p,id:r.memory_id,kind:"wiki",memoryId:r.memory_id,context:p,markdown:l.markdown},U.contexts.some(g=>g.id===p.id)||U.contexts.push(p),U.wikis.push(o),ti(),an()}await sr(o)}catch(o){Gn("\u8BFB\u53D6\u5931\u8D25\uFF1A"+o.message)}},a})),Gn(`${s.length} \u6761\u53BB\u91CD\u547D\u4E2D${i.next_offset?" \xB7 \u5C1A\u6709\u540E\u7EED":""}`)}catch(i){Gn("\u641C\u7D22\u5931\u8D25\uFF1A"+i.message)}};xt("search").oninput=()=>{xt("search").value||(U.searchHits=null,an(),xt("search-results").replaceChildren())};document.querySelectorAll("[data-view]").forEach(n=>n.onclick=()=>{let t=U.selected;if(t)if(n.dataset.view==="wiki"){let e=t.focusWiki||(t.kind==="wiki"?t:U.wikis.find(i=>i.runId===t.runId));e&&sr(e)}else t.kind==="wiki"&&la(t.runId,t)});xt("follow-source").onclick=()=>{let n=U.selected;if(n)if(n.kind==="wiki")la(n.runId,n);else{let t=n.focusWiki||U.wikis.find(e=>e.runId===n.runId);t&&sr(t)}};xt("reader-content").onscroll=n=>{let t=n.currentTarget,e=U.selected;if(!e||e.kind==="wiki")return;let i=t.getBoundingClientRect(),s=[...t.querySelectorAll(".batch-block")].find(r=>r.getBoundingClientRect().bottom>i.top+40);if(s&&s.dataset.runId!==e.runId){e.runId=s.dataset.runId,e.id=e.runId;let r=e.pages.find(a=>a.batch.run_id===e.runId)?.batch;r&&(e.runLabel=new Date(r.created_at).toLocaleString()),U.scope?.kind==="batch"&&(U.scope=xs(kh()).find(a=>a.kind==="batch"&&a.runId===e.runId&&a.sessionKey===U.scope.sessionKey&&a.userName===U.scope.userName)||U.scope),an(),ti(),ir(e)}t.scrollTop+t.clientHeight>=t.scrollHeight-120&&Bh(e)};an();pi();xt("all-sources").onclick=()=>Lp(null);xt("locate-source").onclick=()=>{U.selected&&ir(U.selected,!0)};})();
/*! Bundled license information:

dompurify/dist/purify.es.mjs:
  (*! @license DOMPurify 3.4.17 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.17/LICENSE *)
  (*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE *)

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
