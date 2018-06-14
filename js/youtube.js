(function ($) {
  var dominserti = 0;
var notificationtext="";
var lastnotification;
var lastnotificationtext="";
var notificationactive=false;
if(sessionStorage.getItem("customnotificationactive")=="true"){
  notificationactive=true;
}
  setTimeout(function()
    {
     
      Notification.requestPermission().then(function(result) {
        if (result === 'denied') {
          console.log('Notification permission not allowed');
          return;
        }
        if (result === 'default'||result === 'granted') {
      $('body')
      .on('click',
        '.ytp-right-controls .customnotificationactive',
        function(e)
        {
          notificationactive=!notificationactive;
          $(this).attr("aria-pressed",notificationactive);
          sessionStorage.setItem("customnotificationactive",notificationactive);
        })
      $('body')
        .on('DOMNodeInserted',
          '.caption-window',
          function(e)
          {
                    if(notificationactive){
                    var notificationtext=$(".caption-window").text();
                      var options={
                        body:notificationtext,
                        tag: 'soManyNotification'
                      }
                      var lastnotification=new Notification("Youtube SubTitle", options);
                      lastnotification.onclick = function(x) { 
                        window.focus(); 
                      };
                      setTimeout(lastnotification.close.bind(lastnotification), 4000);
                    }
          });
        }
      });
     


    },1000);
  setInterval(function(){
    $(".close-padding.condensed.contains-svg").click();
    $(".videoAdUiSkipButton").click();
    $(".annotation-close-button").click();
  if($(".ytp-right-controls .customnotificationactive").length==0){
    $(".ytp-right-controls").prepend('<button title="View Sub Titles as Notification" class="ytp-subtitles-button ytp-button customnotificationactive" style="" aria-pressed="'+notificationactive+'"><span style="  height: 100%;  width: 100%;  display: block; float: left;  margin: -1px 1px 0px 0px;  text-align: center;">NT</span></button>');
  }
},
2000);


})(myjQuery);
