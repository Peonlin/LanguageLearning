$(function() {
  $('#get_num').click(function() {
    
    var email = $('#email').val();
    console.log(email);
    $.ajax({
      type: "post",
      url: "/email",
      dataType: 'json',
      cache: 'false',
      data: {email: email},
      success: function(data) {
        console.log("success");
      },
      error: function(error) {
        console.log("出错了！");
      },
    });
  });
});