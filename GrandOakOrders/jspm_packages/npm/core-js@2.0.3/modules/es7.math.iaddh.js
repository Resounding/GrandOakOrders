/* */ 
var $export = require("./_export");
$export($export.S, 'Math', {iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0,
        $x1 = x1 >>> 0,
        $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }});