new Vue({
  el: '#pageContainer',
  data: {
    jsonSource: '',
    resultContent: '',
    base64Source: '',
    jsonSourceEditor: null,
    jsonResultEditor: null,
  },
  mounted: function () {
    this.jsonSourceEditor = CodeMirror.fromTextArea(this.$refs.jsonSource, {
      mode: 'text/javascript',
      lineNumbers: !0,
      matchBrackets: !0,
      styleActiveLine: !0,
      lineWrapping: !0,
    });
    // this.jsonSourceEditor.focus();

    this.jsonSourceEditor.on('cursorActivity', () => {
      this.jsonSource = this.jsonSourceEditor.getValue();
      this.jsonSourceChange();
    });
    // this.editor.focus()

    // this.editor.setValue(this.resultContent);
  },
  methods: {
    base64SourceChange() {
      let val = this.utf8Decode(this.base64Decode(this.base64Source));

      if (this.base64Source) {
        this.jsonSourceEditor.setValue(val);
        // this.jsonSource = this.base64Encode(this.base64Source);
        // this.editor.setValue(this.resultContent);
      }
    },
    jsonSourceChange: function (e) {
      this.jsonSource = this.jsonSourceEditor.getValue();
      if (this.jsonSource) {
        this.resultContent = JSON.stringify(
          JSON.parse(this.jsonSource),
          null,
          4
        );
      }
    },

    base64Encode: function (e) {
      let t =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

      let n, a, i, r, s, o;
      for (i = e.length, a = 0, n = ''; a < i; ) {
        if (((r = 255 & e.charCodeAt(a++)), a == i)) {
          (n += t.charAt(r >> 2)), (n += t.charAt((3 & r) << 4)), (n += '==');
          break;
        }
        if (((s = e.charCodeAt(a++)), a == i)) {
          (n += t.charAt(r >> 2)),
            (n += t.charAt(((3 & r) << 4) | ((240 & s) >> 4))),
            (n += t.charAt((15 & s) << 2)),
            (n += '=');
          break;
        }
        (o = e.charCodeAt(a++)),
          (n += t.charAt(r >> 2)),
          (n += t.charAt(((3 & r) << 4) | ((240 & s) >> 4))),
          (n += t.charAt(((15 & s) << 2) | ((192 & o) >> 6))),
          (n += t.charAt(63 & o));
      }
      return n;
    },
    base64Decode: function (t) {
      let a = [
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
        -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57,
        58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8,
        9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1,
        -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
        39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1,
      ];
      let e, n, i, r, s, o, l;
      for (o = t.length, s = 0, l = ''; s < o; ) {
        do {
          e = a[255 & t.charCodeAt(s++)];
        } while (s < o && -1 == e);
        if (-1 == e) break;
        do {
          n = a[255 & t.charCodeAt(s++)];
        } while (s < o && -1 == n);
        if (-1 == n) break;
        l += String.fromCharCode((e << 2) | ((48 & n) >> 4));
        do {
          if (61 == (i = 255 & t.charCodeAt(s++))) return l;
          i = a[i];
        } while (s < o && -1 == i);
        if (-1 == i) break;
        l += String.fromCharCode(((15 & n) << 4) | ((60 & i) >> 2));
        do {
          if (61 == (r = 255 & t.charCodeAt(s++))) return l;
          r = a[r];
        } while (s < o && -1 == r);
        if (-1 == r) break;
        l += String.fromCharCode(((3 & i) << 6) | r);
      }
      return l;
    },
    utf8Encode: function (t) {
      let e, n, a, i;
      for (e = '', a = t.length, n = 0; n < a; n++)
        (i = t.charCodeAt(n)) >= 1 && i <= 127
          ? (e += t.charAt(n))
          : i > 2047
          ? ((e += String.fromCharCode(224 | ((i >> 12) & 15))),
            (e += String.fromCharCode(128 | ((i >> 6) & 63))),
            (e += String.fromCharCode(128 | ((i >> 0) & 63))))
          : ((e += String.fromCharCode(192 | ((i >> 6) & 31))),
            (e += String.fromCharCode(128 | ((i >> 0) & 63))));
      return e;
    },
    utf8Decode: function (t) {
      let e, n, a, i, r, s;
      for (e = '', a = t.length, n = 0; n < a; )
        switch ((i = t.charCodeAt(n++)) >> 4) {
          case 0:
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 7:
            e += t.charAt(n - 1);
            break;
          case 12:
          case 13:
            (r = t.charCodeAt(n++)),
              (e += String.fromCharCode(((31 & i) << 6) | (63 & r)));
            break;
          case 14:
            (r = t.charCodeAt(n++)),
              (s = t.charCodeAt(n++)),
              (e += String.fromCharCode(
                ((15 & i) << 12) | ((63 & r) << 6) | ((63 & s) << 0)
              ));
        }
      return e;
    },
  },
});
