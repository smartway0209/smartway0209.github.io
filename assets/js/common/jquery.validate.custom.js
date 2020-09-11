/*
| -------------------------------------------------------------------
| 擴充jquery.validate
| -------------------------------------------------------------------
| 將好用的驗證方法定義於此，方便管理
|
| -------------------------------------------------------------------
*/

$.validator.addMethod(
        "regex",
        function(value, element, regexp) {
            var re = new RegExp(regexp);
            return this.optional(element) || re.test(value);
        },
        "請輸入正確的值"
);

$.validator.addMethod(
        "phoneCheck",
        function(value, element) {
            var re = new RegExp('^[\\d\-\(\)\#]{1,}$');
            return this.optional(element) || re.test(value);
        },
        "電話號碼不符合格式，僅接受數字、#-()等符號"
);

$.validator.addMethod(
        "mobileTaiwan",
        function(value, element) {
            var re = new RegExp('^09[\\d]{2}[\\d\-]{1,}$');
            return this.optional(element) || re.test(value);
        },
        "手機號碼不符合格式，僅允許09開頭的數字、-符號"
);