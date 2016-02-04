;$(function(){ 
  $('#LAreaList .LALitem').mouseover(function(){
    $(this).find('ul').addClass('transition-falldown');
  });
  $('#LAreaList .LALitem').mouseleave(function(){
    $(this).find('ul').removeClass('transition-falldown');
  });
});