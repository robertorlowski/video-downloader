class Utils {
  static _slugify_strip_re = /[^\w\s-]/g;
  static _slugify_hyphenate_re = /[-\s]+/g;

  static slugify(s) {
    s = s
      .replace(this._slugify_strip_re, "")
      .trim()
      .toLowerCase();
    s = s.replace(this._slugify_hyphenate_re, "-");
    return s;
  }

  static uniqueArray(arrArg, props) {
    if (arrArg == undefined) {
      return [];
    }
    return arrArg.filter(function(elem, pos) {
      for (const idx in arrArg) {
        if (idx != pos && arrArg[idx][`${props}`] === elem[`${props}`]) {
          return false;
        }
      }

      return true;
    });
  }
}

export default Utils;
