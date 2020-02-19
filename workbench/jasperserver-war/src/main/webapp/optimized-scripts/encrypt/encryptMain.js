function setMaxDigits(i){maxDigits=i,ZERO_ARRAY=new Array(maxDigits);for(var t=0;t<ZERO_ARRAY.length;t++)ZERO_ARRAY[t]=0;bigZero=new BigInt,bigOne=new BigInt,bigOne.digits[0]=1}function BigInt(i){this.digits="boolean"==typeof i&&1==i?null:ZERO_ARRAY.slice(0),this.isNeg=!1}function biFromDecimal(i){for(var t,e="-"==i.charAt(0),r=e?1:0;r<i.length&&"0"==i.charAt(r);)++r;if(r==i.length)t=new BigInt;else{var n=i.length-r,o=n%dpl10;for(0==o&&(o=dpl10),t=biFromNumber(Number(i.substr(r,o))),r+=o;r<i.length;)t=biAdd(biMultiply(t,biFromNumber(1e15)),biFromNumber(Number(i.substr(r,dpl10)))),r+=dpl10;t.isNeg=e}return t}function biCopy(i){var t=new BigInt(!0);return t.digits=i.digits.slice(0),t.isNeg=i.isNeg,t}function biFromNumber(i){var t=new BigInt;t.isNeg=i<0,i=Math.abs(i);for(var e=0;i>0;)t.digits[e++]=i&maxDigitVal,i>>=biRadixBits;return t}function reverseStr(i){for(var t="",e=i.length-1;e>-1;--e)t+=i.charAt(e);return t}function biToString(i,t){var e=new BigInt;e.digits[0]=t;for(var r=biDivideModulo(i,e),n=hexatrigesimalToChar[r[1].digits[0]];1==biCompare(r[0],bigZero);)r=biDivideModulo(r[0],e),digit=r[1].digits[0],n+=hexatrigesimalToChar[r[1].digits[0]];return(i.isNeg?"-":"")+reverseStr(n)}function biToDecimal(i){var t=new BigInt;t.digits[0]=10;for(var e=biDivideModulo(i,t),r=String(e[1].digits[0]);1==biCompare(e[0],bigZero);)e=biDivideModulo(e[0],t),r+=String(e[1].digits[0]);return(i.isNeg?"-":"")+reverseStr(r)}function digitToHex(t){var e="";for(i=0;i<4;++i)e+=hexToChar[15&t],t>>>=4;return reverseStr(e)}function biToHex(i){for(var t="",e=(biHighIndex(i),biHighIndex(i));e>-1;--e)t+=digitToHex(i.digits[e]);return t}function charToHex(i){return i>=48&&i<=57?i-48:i>=65&&i<=90?10+i-65:i>=97&&i<=122?10+i-97:0}function hexToDigit(i){for(var t=0,e=Math.min(i.length,4),r=0;r<e;++r)t<<=4,t|=charToHex(i.charCodeAt(r));return t}function biFromHex(i){for(var t=new BigInt,e=i.length,r=e,n=0;r>0;r-=4,++n)t.digits[n]=hexToDigit(i.substr(Math.max(r-4,0),Math.min(r,4)));return t}function biFromString(i,t){var e="-"==i.charAt(0),r=e?1:0,n=new BigInt,o=new BigInt;o.digits[0]=1;for(var s=i.length-1;s>=r;s--){n=biAdd(n,biMultiplyDigit(o,charToHex(i.charCodeAt(s)))),o=biMultiplyDigit(o,t)}return n.isNeg=e,n}function biDump(i){return(i.isNeg?"-":"")+i.digits.join(" ")}function biAdd(i,t){var e;if(i.isNeg!=t.isNeg)t.isNeg=!t.isNeg,e=biSubtract(i,t),t.isNeg=!t.isNeg;else{e=new BigInt;for(var r,n=0,o=0;o<i.digits.length;++o)r=i.digits[o]+t.digits[o]+n,e.digits[o]=65535&r,n=Number(r>=biRadix);e.isNeg=i.isNeg}return e}function biSubtract(i,t){var e;if(i.isNeg!=t.isNeg)t.isNeg=!t.isNeg,e=biAdd(i,t),t.isNeg=!t.isNeg;else{e=new BigInt;var r,n;n=0;for(var o=0;o<i.digits.length;++o)r=i.digits[o]-t.digits[o]+n,e.digits[o]=65535&r,e.digits[o]<0&&(e.digits[o]+=biRadix),n=0-Number(r<0);if(-1==n){n=0;for(var o=0;o<i.digits.length;++o)r=0-e.digits[o]+n,e.digits[o]=65535&r,e.digits[o]<0&&(e.digits[o]+=biRadix),n=0-Number(r<0);e.isNeg=!i.isNeg}else e.isNeg=i.isNeg}return e}function biHighIndex(i){for(var t=i.digits.length-1;t>0&&0==i.digits[t];)--t;return t}function biNumBits(i){var t,e=biHighIndex(i),r=i.digits[e],n=(e+1)*bitsPerDigit;for(t=n;t>n-bitsPerDigit&&0==(32768&r);--t)r<<=1;return t}function biMultiply(i,t){for(var e,r,n,o=new BigInt,s=biHighIndex(i),g=biHighIndex(t),d=0;d<=g;++d){for(e=0,n=d,j=0;j<=s;++j,++n)r=o.digits[n]+i.digits[j]*t.digits[d]+e,o.digits[n]=r&maxDigitVal,e=r>>>biRadixBits;o.digits[d+s+1]=e}return o.isNeg=i.isNeg!=t.isNeg,o}function biMultiplyDigit(i,t){var e,r,n,o=new BigInt;e=biHighIndex(i),r=0;for(var s=0;s<=e;++s)n=o.digits[s]+i.digits[s]*t+r,o.digits[s]=n&maxDigitVal,r=n>>>biRadixBits;return o.digits[1+e]=r,o}function arrayCopy(i,t,e,r,n){for(var o=Math.min(t+n,i.length),s=t,g=r;s<o;++s,++g)e[g]=i[s]}function biShiftLeft(i,t){var e=Math.floor(t/bitsPerDigit),r=new BigInt;arrayCopy(i.digits,0,r.digits,e,r.digits.length-e);for(var n=t%bitsPerDigit,o=bitsPerDigit-n,s=r.digits.length-1,g=s-1;s>0;--s,--g)r.digits[s]=r.digits[s]<<n&maxDigitVal|(r.digits[g]&highBitMasks[n])>>>o;return r.digits[0]=r.digits[s]<<n&maxDigitVal,r.isNeg=i.isNeg,r}function biShiftRight(i,t){var e=Math.floor(t/bitsPerDigit),r=new BigInt;arrayCopy(i.digits,e,r.digits,0,i.digits.length-e);for(var n=t%bitsPerDigit,o=bitsPerDigit-n,s=0,g=s+1;s<r.digits.length-1;++s,++g)r.digits[s]=r.digits[s]>>>n|(r.digits[g]&lowBitMasks[n])<<o;return r.digits[r.digits.length-1]>>>=n,r.isNeg=i.isNeg,r}function biMultiplyByRadixPower(i,t){var e=new BigInt;return arrayCopy(i.digits,0,e.digits,t,e.digits.length-t),e}function biDivideByRadixPower(i,t){var e=new BigInt;return arrayCopy(i.digits,t,e.digits,0,e.digits.length-t),e}function biModuloByRadixPower(i,t){var e=new BigInt;return arrayCopy(i.digits,0,e.digits,0,t),e}function biCompare(i,t){if(i.isNeg!=t.isNeg)return 1-2*Number(i.isNeg);for(var e=i.digits.length-1;e>=0;--e)if(i.digits[e]!=t.digits[e])return i.isNeg?1-2*Number(i.digits[e]>t.digits[e]):1-2*Number(i.digits[e]<t.digits[e]);return 0}function biDivideModulo(i,t){var e,r,n=biNumBits(i),o=biNumBits(t),s=t.isNeg;if(n<o)return i.isNeg?(e=biCopy(bigOne),e.isNeg=!t.isNeg,i.isNeg=!1,t.isNeg=!1,r=biSubtract(t,i),i.isNeg=!0,t.isNeg=s):(e=new BigInt,r=biCopy(i)),new Array(e,r);e=new BigInt,r=i;for(var g=Math.ceil(o/bitsPerDigit)-1,d=0;t.digits[g]<biHalfRadix;)t=biShiftLeft(t,1),++d,++o,g=Math.ceil(o/bitsPerDigit)-1;r=biShiftLeft(r,d),n+=d;for(var a=Math.ceil(n/bitsPerDigit)-1,u=biMultiplyByRadixPower(t,a-g);-1!=biCompare(r,u);)++e.digits[a-g],r=biSubtract(r,u);for(var b=a;b>g;--b){var l=b>=r.digits.length?0:r.digits[b],c=b-1>=r.digits.length?0:r.digits[b-1],h=b-2>=r.digits.length?0:r.digits[b-2],f=g>=t.digits.length?0:t.digits[g],p=g-1>=t.digits.length?0:t.digits[g-1];e.digits[b-g-1]=l==f?maxDigitVal:Math.floor((l*biRadix+c)/f);for(var y=e.digits[b-g-1]*(f*biRadix+p),m=l*biRadixSquared+(c*biRadix+h);y>m;)--e.digits[b-g-1],y=e.digits[b-g-1]*(f*biRadix|p),m=l*biRadix*biRadix+(c*biRadix+h);u=biMultiplyByRadixPower(t,b-g-1),r=biSubtract(r,biMultiplyDigit(u,e.digits[b-g-1])),r.isNeg&&(r=biAdd(r,u),--e.digits[b-g-1])}return r=biShiftRight(r,d),e.isNeg=i.isNeg!=s,i.isNeg&&(e=s?biAdd(e,bigOne):biSubtract(e,bigOne),t=biShiftRight(t,d),r=biSubtract(t,r)),0==r.digits[0]&&0==biHighIndex(r)&&(r.isNeg=!1),new Array(e,r)}function biDivide(i,t){return biDivideModulo(i,t)[0]}function biModulo(i,t){return biDivideModulo(i,t)[1]}function biMultiplyMod(i,t,e){return biModulo(biMultiply(i,t),e)}function biPow(i,t){for(var e=bigOne,r=i;;){if(0!=(1&t)&&(e=biMultiply(e,r)),0==(t>>=1))break;r=biMultiply(r,r)}return e}function biPowMod(i,t,e){for(var r=bigOne,n=i,o=t;;){if(0!=(1&o.digits[0])&&(r=biMultiplyMod(r,n,e)),o=biShiftRight(o,1),0==o.digits[0]&&0==biHighIndex(o))break;n=biMultiplyMod(n,n,e)}return r}function BarrettMu(i){this.modulus=biCopy(i),this.k=biHighIndex(this.modulus)+1;var t=new BigInt;t.digits[2*this.k]=1,this.mu=biDivide(t,this.modulus),this.bkplus1=new BigInt,this.bkplus1.digits[this.k+1]=1,this.modulo=BarrettMu_modulo,this.multiplyMod=BarrettMu_multiplyMod,this.powMod=BarrettMu_powMod}function BarrettMu_modulo(i){var t=biDivideByRadixPower(i,this.k-1),e=biMultiply(t,this.mu),r=biDivideByRadixPower(e,this.k+1),n=biModuloByRadixPower(i,this.k+1),o=biMultiply(r,this.modulus),s=biModuloByRadixPower(o,this.k+1),g=biSubtract(n,s);g.isNeg&&(g=biAdd(g,this.bkplus1));for(var d=biCompare(g,this.modulus)>=0;d;)g=biSubtract(g,this.modulus),d=biCompare(g,this.modulus)>=0;return g}function BarrettMu_multiplyMod(i,t){var e=biMultiply(i,t);return this.modulo(e)}function BarrettMu_powMod(i,t){var e=new BigInt;for(e.digits[0]=1;;){if(0!=(1&t.digits[0])&&(e=this.multiplyMod(e,i)),t=biShiftRight(t,1),0==t.digits[0]&&0==biHighIndex(t))break;i=this.multiplyMod(i,i)}return e}!function(i){i.jCryption=function(t,e){var r=this;r.$el=i(t),r.el=t,r.$el.data("jCryption",r),r.init=function(){if(r.options=i.extend({},i.jCryption.defaultOptions,e),$encryptedElement=i("<input />",{type:"hidden",name:r.options.postVariable}),!1!==r.options.submitElement)var t=r.options.submitElement;else var t=r.$el.find(":input:submit");t.bind(r.options.submitEvent,function(){return i(this).attr("disabled",!0),r.options.beforeEncryption()&&i.jCryption.getKeys(r.options.getKeysURL,function(t){i.jCryption.encrypt(r.$el.serialize(),t,function(t){$encryptedElement.val(t),i(r.$el).find(r.options.formFieldSelector).attr("disabled",!0).end().append($encryptedElement).submit()})}),!1})},r.init()},i.jCryption.getKeys=function(t,e){var r=function(i,t,e){setMaxDigits(parseInt(e,10)),this.e=biFromHex(i),this.m=biFromHex(t),this.chunkSize=2*biHighIndex(this.m),this.radix=16,this.barrett=new BarrettMu(this.m)};i.getJSON(t,function(t){var n=new r(t.e,t.n,t.maxdigits);i.isFunction(e)&&e.call(this,n)})},i.jCryption.encrypt=function(t,e,r){for(var n=0,o=0;o<t.length;o++)n+=t.charCodeAt(o);var s="0123456789abcdef",g="";g+=s.charAt((240&n)>>4)+s.charAt(15&n);for(var d=g+t,a=[],u=0;u<d.length;)a[u]=d.charCodeAt(u),u++;for(;a.length%e.chunkSize!=0;)a[u++]=0;!function(t){function n(){s=new BigInt,o=0;for(var a=g;a<g+e.chunkSize;++o)s.digits[o]=t[a++],s.digits[o]+=t[a++]<<8;var u=e.barrett.powMod(s,e.e),b=16==e.radix?biToHex(u):biToString(u,e.radix);if(d+=b+" ",(g+=e.chunkSize)<t.length)setTimeout(n,1);else{var l=d.substring(0,d.length-1);if(!i.isFunction(r))return l;r(l)}}var o,s,g=0,d="";setTimeout(n,1)}(a)},i.jCryption.defaultOptions={submitElement:!1,submitEvent:"click",getKeysURL:"main.php?generateKeypair=true",beforeEncryption:function(){return!0},postVariable:"jCryption",formFieldSelector:":input"},i.fn.jCryption=function(t){return this.each(function(){new i.jCryption(this,t)})}}(jQuery);var biRadixBase=2,biRadixBits=16,bitsPerDigit=biRadixBits,biRadix=65536,biHalfRadix=biRadix>>>1,biRadixSquared=biRadix*biRadix,maxDigitVal=biRadix-1,maxInteger=9999999999999998,maxDigits,ZERO_ARRAY,bigZero,bigOne,dpl10=15,highBitMasks=new Array(0,32768,49152,57344,61440,63488,64512,65024,65280,65408,65472,65504,65520,65528,65532,65534,65535),hexatrigesimalToChar=new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"),hexToChar=new Array("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"),lowBitMasks=new Array(0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535);define("jCryption",["jquery"],function(i){return function(){var t;return t=function(){return{BigInt:this.BigInt,biToHex:this.biToHex,biToString:this.biToString}},t.apply(i,arguments)||i.jQuery}}(this)),define("runtime_dependencies/js-sdk/src/common/extension/jQueryjCryptionExtensions",["require","exports","module","jquery","jCryption"],function(i,t,e){var r=i("jquery"),n=i("jCryption"),o=n.BigInt,s=n.biToHex,g=n.biToString;r.jCryption.encryptKeyWithoutRedundancy=function(i,t,e){if(""===i)return r.isFunction(e)?void e(i):i;for(var n=0,d=0;d<i.length;d++)n+=i.charCodeAt(d);for(var a=[],u=0;u<i.length;)a[u]=i.charCodeAt(u),u++;for(;a.length%t.chunkSize!=0;)a[u++]=0;!function(i){function n(){a=new o,d=0;for(var l=u;l<u+t.chunkSize;++d)a.digits[d]=i[l++],a.digits[d]+=i[l++]<<8;var c=t.barrett.powMod(a,t.e),h=16==t.radix?s(c):g(c,t.radix);if(b+=h+" ",(u+=t.chunkSize)<i.length)setTimeout(n,1);else{var f=b.substring(0,b.length-1);if(!r.isFunction(e))return f;e(f)}}var d,a,u=0,b="";setTimeout(n,1)}(a)},e.exports=r}),define("runtime_dependencies/js-sdk/src/common/util/encrypter",["require","exports","module","../extension/jQueryjCryptionExtensions"],function(i,t,e){var r=i("../extension/jQueryjCryptionExtensions"),n={};n.code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n.encode16BitString=function(i){var t,e,r,o,s,g,d,a,u,b,l,c,h=[],f="",p=n.code;if(l=i,(b=l.length%2)>0)for(;b++<2;)f+="===",l+="\0";for(b=0;b<l.length;b+=2)t=l.charCodeAt(b),e=l.charCodeAt(b+1),r=t<<16|e,o=r>>26&63,s=r>>20&63,g=r>>14&63,d=r>>8&63,a=r>>2&63,u=3&r,h[b/2]=p.charAt(o)+p.charAt(s)+p.charAt(g)+p.charAt(d)+p.charAt(a)+p.charAt(u);return c=h.join(""),c=c.slice(0,c.length-f.length)+f},n.decode16BitString=function(i){var t,e,r,o,s,g,d,a,u,b,l,c,h=[],f=n.code;c=i;for(var p=0;p<c.length;p+=6)s=f.indexOf(c.charAt(p)),g=f.indexOf(c.charAt(p+1)),d=f.indexOf(c.charAt(p+2)),a=f.indexOf(c.charAt(p+3)),u=f.indexOf(c.charAt(p+4)),b=f.indexOf(c.charAt(p+5)),l=s<<26|g<<20|d<<14|a<<8|u<<2|3&b,t=l>>>24&255,e=l>>>16&255,r=l>>>8&255,o=255&l,h[p/6]=String.fromCharCode(t<<8|e,r<<8|o),64==a&&(h[p/6]=h[p/6]=String.fromCharCode(t<<8|e));return h.join("")};var o={encryptData:function(i,t){if(!i)return void t();r.jCryption.getKeys("GetEncryptionKey",function(e){var r=e,n=[];for(var s in i)n.push(s);var g={};o._encryptDataRecursive(i,n,0,r,g,t)})},_encryptDataRecursive:function(i,t,e,n,s,g){if(t&&t.length!=e){var d=encodeURIComponent(i[t[e]]),a=d.split("").reverse().join("");r.jCryption.encryptKeyWithoutRedundancy(a,n,function(r){s[t[e]]=r,t.length==e+1?g(s):o._encryptDataRecursive(i,t,e+1,n,s,g)})}}};e.exports=o}),define("encrypt/encryptMain",["require","exports","module","jquery","underscore","requirejs-domready","runtime_dependencies/js-sdk/src/common/util/encrypter"],function(i,t,e){var r=i("jquery"),n=i("underscore"),o=i("requirejs-domready"),s=i("runtime_dependencies/js-sdk/src/common/util/encrypter");o(function(){var i=r("#text1"),t=r("#text2"),e=function(e){r.trim(i.val())&&(window.isEncryptionOn&&s.encryptData({j_password:i.val()},function(i){for(var e in i)t.removeAttr("disabled").val(i[e])}),e.preventDefault())},o=function(e){i.val(""),t.val(""),e.preventDefault()};r("#clearButton").click(o),r("#submitButton").click(e),i.keypress(function(i){13==(i.keyCode||i.which)&&n.defer(e,i)})})});