function modifyDOMNode(e){
    var arabic = /[\u0600-\u06FF]/;


    if(e.currentTarget.tagName == "BLOCKQUOTE"){
        if(arabic.test(e.currentTarget.textContent.charAt(0))){
            $(e.currentTarget.firstChild).removeClass("leftq");
        }else{
            $(e.currentTarget.firstChild).addClass("leftq");
        }
    }


    if(arabic.test(e.currentTarget.children[0].textContent.charAt(0))){
        e.currentTarget.children.forEach((item_li, i) => {
            if($(item_li).hasClass( "task-list-item" )){
                $(item_li).find("p").attr("dir", "rtl");
            }
            else {
                $(item_li.firstChild).attr("dir", "rtl");
            }
            $(item_li).attr("dir", "rtl");
        });
        $(e.currentTarget).attr("dir", "rtl");
    }else{
        e.currentTarget.children.forEach((item_li, i) => {
            if($(item_li).hasClass( "task-list-item" )){
                $(item_li).find("p").attr("dir", "ltr");
            }
            else {
                $(item_li.firstChild).attr("dir", "ltr");
            }
            $(item_li).attr("dir", "ltr");
        });
        $(e.currentTarget).attr("dir", "ltr");
    }
}


$("#write").on('DOMNodeInserted', '.ul-list, .ol-list, blockquote', function(e){
    modifyDOMNode(e);

});

$("#write").on('DOMSubtreeModified', '.ul-list, .ol-list, blockquote', function(e){
    modifyDOMNode(e);
});