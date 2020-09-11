/*
| -------------------------------------------------------------------
| 定義後台公用JS
| -------------------------------------------------------------------
| 後臺整個專案可用的皆可定義於此，方便管理
|
| -------------------------------------------------------------------
*/

// 引入要用到的js檔---------------------------------------------------------------------------------------------------------------------
//fancybox
document.write('<script src="/plugin/fancybox/jquery.mousewheel-3.0.6.pack.js"><\/script>');
document.write('<script src="/plugin/fancybox/jquery.fancybox.pack.js?v=2.1.5"><\/script>');

$(function() {
    // 修改密碼驗證---------------------------------------------------------------------------------------------------------------------
    $('#password_check_form').validate({
        errorElement: 'div',
        errorClass: 'help-block',
        focusInvalid: false,
        ignore: '',
        rules: {
            c_password: {
                required: true
            },
            c_password_chk: {
                required: true,
                equalTo: '#c_password'
            }
        },

        highlight: function (e) {
            $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
        },

        success: function (e) {
            $(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
            $(e).remove();
        },

        submitHandler: function (form) {
            $('#check').attr('disabled', 'disabled');
            form.submit();
        }
    });

    // 燈箱---------------------------------------------------------------------------------------------------------------------
    $('.iframe-box').each(function() {
        // 沒有定義燈箱寬度就預設為1200
        if(typeof($(this).attr('data-box-width'))=="undefined") {
            var thisWidth = 1200;
        } else {
            var thisWidth = parseInt($(this).attr('data-box-width'));
        }

        $(this).fancybox({
            width       : thisWidth,
            height      : '90%',
            autoScale       : true,
            transitionIn    : 'none',
            transitionOut   : 'none',
            type        : 'iframe'
        });
    });

    // 按重置時將全部文字編輯器
    $('button[type="reset"]').click(function() {
        $('.ce1').each(function() {
            ce1.instances[$(this).attr('name')].setData('');
        });
    });
});

// 清除篩選---------------------------------------------------------------------------------------------------------------------
function clearfilter(elem) {
    var $form = $(elem).parents('form');
    $('input[type=text]', $form).val('');
    $('select', $form).each(function() {
        var $this = $(this);
        $this.val($('option:first-child', $this).val());
    });

    $form.submit();
}

// 自訂訊息視窗---------------------------------------------------------------------------------------------------------------------
function alert_custom(content='')
{
    bootbox.alert({
        message: '<span class="bigger-110">' + content + '</span>',
    });
}

// 自訂詢問視窗---------------------------------------------------------------------------------------------------------------------
function confirm_custom(content='',elem)
{
    event.preventDefault();

    bootbox.confirm(content, function(result) {
        if(result) {
            if($(elem) != '') {
                window.location = $(elem).attr("href");
            }
        }
    });
}


// 選取全部資料---------------------------------------------------------------------------------------------------------------------

function check_all(element,action_page)
{
    var check_val = '';

    if($(element).prop('checked')) {
        $('input[name="check_col[]"]').each(function(key) {
            $(this).prop('checked', true);

            if(key == 0) {
                check_val = $(this).val();
            } else {
                check_val = check_val + ',' + $(this).val();
            }
        });

        if (check_val != '') {
            save_check_list(action_page,check_val,true);
        }
    } else {
        $('input[name="check_col[]"]').each(function(key) {
            $(this).prop('checked', false);

            if(key == 0) {
                check_val = $(this).val();
            } else {
                check_val = check_val + ',' + $(this).val();
            }
        });

        if (check_val != '') {
            save_check_list(action_page,check_val,false);
        }
    }
}

// 清單選動作---------------------------------------------------------------------------------------------------------------------

function save_check_list(action_page,check_val,action)
{
    if(action == undefined) {
        action = '';
    }

    var csrf_test_name = $('.csrf_test_name').val();

    $.post("/ajax/ajax_cms/save_check_list",{'action_page' :action_page, 'check_val':check_val, 'action':action, 'csrf_test_name':csrf_test_name },function(res) {
        if (check_val == -2) {
            $('input[name="check_all"]').prop('checked',false);
            $('input[name="check_col[]"]').prop('checked',false);
        }

        $('.csrf_test_name').val(res['csrf_data']['hash']);
    },'json');
}

// 刪除所有選擇的資料---------------------------------------------------------------------------------------------------------------------

function deleteAll(elem)
{
    var check_col = [];
    $("input[name='check_col[]']").each(function() {
        if($(this).prop('checked')) {
            check_col.push($(this).val());
        }
    });

    // 沒有選資料提示使用者，確定刪除前也要提示
    if(check_col.length == 0){
        alert_custom('請選擇要刪除的資料');
        event.preventDefault();
    } else {
        confirm_custom('確定要刪除資料嗎？',elem);
    }
}

// 更改狀態---------------------------------------------------------------------------------------------------------------------
function ajax_database_data_update(table, field, obj, id)
{
    var csrf_test_name = $('.csrf_test_name').val();

    if ($(obj).prop('checked') == false) {
        var value = 0;
    } else {
        var value = 1;
    }

    $.post('/ajax/ajax_common/database_data_update',{'table':table,'field':field,'value':value,'id':id, 'csrf_test_name':csrf_test_name},function(res) {
        if(res['result'] == 1) {        //刪除後重新整理
            $('.csrf_test_name').val(res['csrf_data']['hash']);
        }
    },'json');
}

// 更改排序----------------------------------------------------------------------------------------------------------------
function ajax_sort($act, table, id, condition)
{
    var csrf_test_name = $('.csrf_test_name').val();

    $.post('/ajax/ajax_cms/sort_change', {'act':$act, 'table': table, 'id': id, 'condition':condition, 'csrf_test_name':csrf_test_name}, function() {
        document.location.reload();
    }, 'json').fail(function(res){console.log(res);});
}

/* 寫入替代標籤，文字編輯器
 * @param   string      value           標籤的值
 * @param   element     textarea_name   文字編輯器名稱
 * @param   string      type            類型(plugin:文字編輯器套件，general:一般文字區塊)
*/
function writeLabelBytextarea(value,textarea_name,type) {
    var $this_textarea = $('textarea[name="' + textarea_name + '"]');

    if(type == 'plugin') {
        editorInsertValue($this_textarea,value,'text');
    } else if(type == 'general') {
        $this_textarea.val($this_textarea.val() + value);
    }
}