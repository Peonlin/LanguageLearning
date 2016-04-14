$(document).ready(function() {
  // 初始化to learn的数目
  texture($('.btn'),$('.myprogress'));
  $('.part').eq(0).addClass('active');
  // 给信息添加乱序
  for(var i=0;i<$('table').length;i++){
    randomOrder($('table').eq(i).find('td[type="B"]'));
    randomOrder($('table').eq(i).find('td[type="C"]'));
  }
  $('td[type="A"]').click(function(){
    $('td[type="A"]').removeClass('active');
    $(this).addClass('active');
  })
  // 给信息添加点击交换顺序的函数
  $('td.drag[type="B"]').click(function(){
    $('td[type="B"]').removeClass('active');
    $(this).addClass('active');
    var active = $(this).parents('table').find('td.active[type="A"]');
    // 只有两列
    if($(this).next().length == 0)
      exchangeTds($(this), active);
    else{
      $(this).prev().addClass('active');
      exchangeTds($(this), active);
    }
  });
  $('td.drag[type="C"]').click(function(){
    $('td[type="C"]').removeClass('active');
    $(this).addClass('active');
    var active = $(this).parents('table').find('td.active[type="B"]');
    exchangeTds($(this), active,'prevC');
  });

  // 点击“answer”
  $('#answer').click(function(){
    showAnswer();
  });
  function showAnswer(){
    $('td.drag').removeClass('changed red');
    var flag = true;
    var trs = $('.part.active table tr');
    for(var i=0;i<trs.length;i++){
      if(diffrent_id(trs.eq(i), trs.eq(i).find('td').eq(2)) == false)
        flag = false;
      var type_c = trs.eq(i).find('td').eq(3);
      if(type_c.length>0)
        if(diffrent_id(trs.eq(i), type_c.eq(0)) == false)
          flag = false;
    }
    if(flag == true){
      showInputTip('<span>Congratulations!</span> Correct answer!')
    }
  }
  // 点击‘next’
  $('#next').click(function(){
    // 显示答案
    if($(this).text() == 'Next'){
      showAnswer();
      $(this).text('Continue');
    }
    else{
      $(this).text('Next');
      var current = $('.part.active');
      // 如果习题已做完
      if(current.index() == $('.part').length-1){
        sendAnswerAjax();
      }
      else{
        current.removeClass('active');
        current.next().addClass('active');
        $('.myprogress .learn1:last').next().addClass('learn1');
      }
    }
  });

  // 判断信息匹配是否正确
  function diffrent_id(origin,td){
    if(origin.attr('_id') != td.find('div').eq(0).attr('_id')){
      td.addClass('red');
      return false;
    }
    else return true;
  }

  // 交换两个td
  // ob 指的是被点击的节点
  // active 指的是左列（A或B）
  // arg == 'prevC' 表示点击的是三列的C
  function exchangeTds(ob,active,arg){
    if(active.length>0){
      $('td').removeClass('changed');
      active.addClass('changed');
      if(arg == 'prevC')
        active.prev().addClass('changed');
      active.next().addClass('changed');
      var a = active.next().clone(true);
      active.next().html(ob.html());
      ob.html(a.html());
      $('td').removeClass('active red');
    }
  }

  // 显示信息，比如“Congratulations！Answer correct!”
  function showInputTip(str){
    $('.part.active').find('.popoverContent').html(str);
    $('.part.active').find('.inputTip').show();
    setTimeout(function(){
      $('.part.active').find('.inputTip').hide();
    },3000);
  };

  // 乱序列表函数
  function randomOrder(ob){
    if(ob.length == 0)
      return;
    var ramdom = shuffle(ob.clone(true));
    for(var i=0;i<ob.length;i++){
      ob.eq(i).html(ramdom.eq(i).html());
    }
  };
  // 乱序函数
  function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };
  function sendAnswerAjax(){
    $.ajax({
      url: 'nextType',
      type: 'post',
      data: getAnswers(),
    })
    .done(function(url){
      window.location.href = url;
    })
    .fail(function() {
      alert('刷新失败，请重试！');
    })
  }
  function getAnswers(){
    var data = {};
    // 当前所学习的语言、tour、unit、题目类型
    // 比如http://localhost:3000/A_GIVEN_B_CLOZE%EF%BC%9Flanguage=en&tour=1&unit=2
    data.type = window.location.pathname.substr(1);
    var search = window.location.search.substr(1).split(/[\=\&]/g);
    data.language = search[1];
    data.tour = search[3];
    data.unit = search[5];
    // 每道题的答案信息，题目id、答案
    data.answers = [];
    // 这个题型的答案暂时不予返回处理
    // for(var i=0;i<$('.part').length;i++){
    //   var temp = {};
    //   temp._id = $('.part').eq(i).find('.num').attr('table_id');
    //   temp.answer = $('.part').eq(i).find('input').val();
    //   data.answers.push(temp);
    // }
    return data;
  }

  // button的背景纹理和coins的纹理
  function texture(btns,coins){
    var image = 'url(../imgs/texture/Metal_texture_0' + myramdom(1,6) +'.jpg)'
    btns.css({
      'background-image':image,
      'color':'black',
      'font-weight':'bold'
    });
    coins.find('.learn0').eq(0).addClass('learn1');
  }
  function myramdom(min,max){
    return min + Math.round(Math.random() * (max - min));
  }

});
