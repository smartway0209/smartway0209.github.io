/**
 * 頁籤切換
 * @param   object  $elem        HTML元素
 * @param   string  $btn_class   頁籤選單class名稱(共同，開頭須加".")
 * @param   string  $pg_class    分頁外框class名稱(共同，開頭須加".")
 * @param   string  $pg_id       分頁外框id名稱(開頭須加"#")

 * @rerurn 
 */


// 頁籤
function Bookmark(elem, btn_class, pg_class, pg_id) {
    // 選單切換
    $(btn_class).removeClass('clk');
    $(elem).addClass('clk');
    // 內容顯示
    $(pg_class).css("display", "none");
    $(pg_id).css("display", "block");
}





/**
 * 手風琴效果
 * /////////////////////////////////////////////////////
 * @ AccordionMenu(基本手風琴)
 * @param   object  $elem        HTML元素
 *
 * /////////////////////////////////////////////////////
 * AccordionMenu(手風琴-單一顯示)
 * @param   object  $elem        HTML元素
 * @param   string  $list_class  選單列表class名稱(共同，開頭須加".")
 * @param   string  $btn_class   手風琴按鈕class名稱(共同，開頭須加".")
 */


// 手風琴選單
function AccordionMenu(elem) {
    if ($(elem).next().is(":hidden")) {
        $(elem).addClass('clk');
    } else {
        $(elem).removeClass('clk');
    }
    $(elem).next().slideToggle();
}

// 單一手風琴
function AccordionMenu(elem, list_class, btn_class) {
    var status = 0;
    $(list_class).slideUp();
    $(btn_class).removeClass('clk');

    if ($(elem).next().is(":hidden")) {
        $(elem).addClass('clk');
        $(elem).next().slideDown();

    } else {
        $(elem).removeClass('clk');
        $(elem).next().slideUp();
    }
}


/**
 * 小圖換大圖
 * @param   object  $elem          小圖HTML元素
 * @param   string  $show_box_id   大圖的id名稱(共同，開頭須加"#")
 *
 */

function ChangePicture(elem, big_img_id) {
    var img_src = $(elem).attr('src');
    $(big_img_id).attr('src', img_src);
}



// 清文字編輯

$(function() {
    if ($('.text_editor_block').length > 0) {
        $('.text_editor_block').find('img').css({ "max-width": "100%", "width": "", "height": "" });

        var window_width = parseInt($(window).width());
        if (window_width < 768) {
            var width = 320;
            var height = 180;
        }
        $('.text_editor_block iframe').attr({ 'width': width, 'height': height });
    }
});
