$(window).on('load', function () {
   if (!$('.vote-list-group').length)
       return;
    var $firstItem = $('.vote-group-item:not(.disabled)').slice(0, 1);
    $firstItem.addClass('active');
    var $input = $('input[type=hidden]');
    $input.attr('value', $firstItem.data('groupname'));
    $('.vote-group-item').on('click tap', function () {
        if ($(this).hasClass('disabled'))
            return;
       $('.vote-group-item').removeClass('active');
       $(this).addClass('active');
       $input.attr('value', $(this).data('groupname'));
    });
});