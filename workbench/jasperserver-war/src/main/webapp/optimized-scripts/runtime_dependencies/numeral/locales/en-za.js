!function(e,n){"function"==typeof define&&define.amd?define(["../numeral"],n):n("object"==typeof module&&module.exports?require("../numeral"):e.numeral)}(this,function(e){e.register("locale","en-za",{delimiters:{thousands:" ",decimal:","},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(e){var n=e%10;return 1==~~(e%100/10)?"th":1===n?"st":2===n?"nd":3===n?"rd":"th"},currency:{symbol:"R"}})});