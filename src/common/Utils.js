 class Utils {
    static  _slugify_strip_re = /[^\w\s-]/g;
    static  _slugify_hyphenate_re = /[-\s]+/g;
      

    static slugify(s) {
        s = s.replace(this._slugify_strip_re, '').trim().toLowerCase();
        s = s.replace(this._slugify_hyphenate_re, '-');
        return s;
    } 
}

export default Utils;

