$(window).load(function(){
  $('.post').each( function(){
    var thisPost = $(this);
    var id = $(this).attr('id');
    $("body div[id!='" + id + "'] a[href='#" + id + "']:not(.quotereply)").each( function(){
      var replyID = $(this).parent().parent().attr('id');
      var postLink = "<a href='#" + replyID
                                 + "' class='quotereply'>"
                                 + replyID
                                 + "</a>";
      if (replyID !== undefined) {
          thisPost.parent().find('.replies').append(postLink);
      }
    })
  })
})
