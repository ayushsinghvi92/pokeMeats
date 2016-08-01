$(document).ready(function() {
// Tooltip only Text

    $('.masterTooltip').hover(function(){
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')

    }, function() {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
    }).mousemove(function(e) {
        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.tooltip')
        .css({ top: mousey, left: mousex })

    })

})

function toggleColor(type) {
    console.log("update")
    var button = $("button#" + type);
    console.log(button[0].style)
    if (button[0].style.backgroundColor.length == 0) {
        button.css("background-color", "#2f4f4f");
    }
    else {
        button.css("background-color", "");
    }
}
