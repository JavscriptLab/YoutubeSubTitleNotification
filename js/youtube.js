(function ($) {
  var dominserti = 0;
var lastnotification;
var lastnotificationtext="";
var deactivatenotifications=false;
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

        var splitbylines=function(N,string){
          var app=string.split(' '),
              arrayApp=[],
              stringApp="";
          app.forEach(function(sentence,index){
            
            
            if((stringApp+sentence+' ').length<N){
              stringApp+=sentence+' ';
              if(index==app.length-1){
                arrayApp.push(stringApp.trim());
              }
            }else {
              arrayApp.push(stringApp.trim());
              stringApp=sentence+' ';
              if(index==app.length-1){
                arrayApp.push(stringApp.trim());
              }
            }
          });
          return arrayApp;
          
        };
      $('body')
        .on('DOMNodeInserted',
          '.caption-window',
          function(e)
          {
            /////&&$(".caption-window").hasClass("ytp-rollup-mode")
            if(notificationactive&&!deactivatenotifications){
             
                  var notificationhtml=$(".caption-window").html();
                  var notificationtext=$(".caption-window").text();
                  var mylocalnotificationtext=notificationtext;
                  var mylocallastnotificationtext=lastnotificationtext;
                
                  var textpieces=$(notificationhtml.replace(/<br ?\/?>/g, " ")
                      .replace(/&nbsp;/ig, " ").replace(/\n/ig,"")
                      .replace("  ", " "))
                    .text()
                    .split(" ")
                    .filter(function(e, y)
                    {
                      e=e.trim();
                      return e!=""&&e!=" "&e!="  ";
                    });
                    if(textpieces.length>0){
                    lastnotificationtext=notificationhtml;
                  var found=false;
                  var notificationbody=textpieces.join(" ");
                  if(mylocallastnotificationtext)
                  {
                    var lastpieces=
                      $("<span>"+mylocallastnotificationtext.replace(/<br ?\/?>/g, " ")
                          .replace(/&nbsp;/ig, " ").replace(/\n/ig,"")
                          .replace("  ", " ")+"</span>")
                        .text()
                        .split(" ")
                        .filter(function(e, y)
                        {
                          e=e.trim();
                          return e!=""&&e!=" "&e!="  ";
                        });
                    ////var lastthree=lastpieces.splice(-3);
// //                     var foundcount=0;
                    
// //                     var currentpieceslength=textpieces.length;
// //                     var lastpieceslength=lastpieces.length;
// //                     var lastword=lastpieces[lastpieceslength-1];
// //                     console.log("'"+lastword+"'");
// //                     var lastwordindexesinnewtext=[];
// //                     var removedprevioswordstext="";
// //                     $.each(textpieces,function(i,v){
// // if(v==lastword){
// // lastwordindexesinnewtext.push(i);
// // }
// // });
// // if(lastwordindexesinnewtext.length>0){
// //                     for(var i=0; i<lastwordindexesinnewtext.length; i++)
// //                     {
// //                       if(!found){
// // var foundlocalscenario=true;
// //                     for(var j=lastwordindexesinnewtext[i];j>=0;j--){
// //                       if(foundlocalscenario==true){
// // if(textpieces[j]!=lastpieces[lastpieceslength-1-(lastwordindexesinnewtext[i]-j)]){
// //   foundlocalscenario=false;
// // }
// // }

// //                     }
// //                     if(foundlocalscenario){
// //                       found=true;
// //                       textpieces.splice(0,lastwordindexesinnewtext[i]+1);
// //                       notificationbody=lastpieces.join(" ")+" "+textpieces.join(" ");
// //                       lastnotificationtext=notificationbody;
// //                       i=lastwordindexesinnewtext.length;
// //                     }
// //                   }
// //                 }
// //               }else{
                
// //               }


// // if(!found&&lastpieces.length>0){
// //                 ////  notificationbody=lastpieces.join(" ")+" "+textpieces.join(" ");
// //                   ////lastnotificationtext=notificationbody;
// // }
////console.log(notificationbody);
///notificationbody=lastpieces.join(" ")+" "+textpieces.join(" ");
                  }
                  
   ////               notificationbody=notificationbody.replace(/(\W|^)(.+)\s\2/igm,"");

notificationbody=$("<span>"+notificationbody+"</span>").text();
var lastnotificationpieces= splitbylines(35,notificationbody.replace(/\n/ig,""));
  lastnotificationpieces=lastnotificationpieces.splice(lastnotificationpieces.length-5,100000);
  notificationbody=lastnotificationpieces.join(" \n");
////  console.log(notificationbody);
lastnotificationtext="<span>"+notificationbody+"</span>";

                    var options={
                      body:notificationbody,
                      tag: 'soManyNotification',
                    }
                    lastnotification=new Notification("Youtube SubTitle", options);
                    setTimeout(lastnotification.close.bind(lastnotification), 4000);
                    lastnotification.onclick = function(x) { 
                                  window.focus(); 
                                };
                                lastnotification.onclose = function(x) { 
                                 /// deactivatenotifications=true;
                                  setTimeout(function(){
                                 ////   deactivatenotifications=false;
                                  },15000);
                                            };

              
            }
              
            
            // // var options={
            // //             body:notificationtext,
            // //             tag: 'soManyNotification'
            // //           }
            // //           var lastnotification=new Notification("Youtube SubTitle", options);
            // //           lastnotification.onclick = function(x) { 
            // //             window.focus(); 
            // //           };
            // //           setTimeout(lastnotification.close.bind(lastnotification), 4000);
            }
          });
        }
      });
     


    },1000);
  setInterval(function(){
      $(".close-padding.condensed.contains-svg,.iv-promo-close").click();
      $(".ytp-ad-skip-button,.videoAdUiSkipButton").click()
          $(".ytp-ad-overlay-close-button").click()
    $(".annotation-close-button").click();
  if($(".ytp-right-controls .customnotificationactive").length==0){
    $(".ytp-right-controls").prepend('<button title="View Sub Titles as Notification" class="ytp-subtitles-button ytp-button customnotificationactive" style="" aria-pressed="'+notificationactive+'"><span style="  height: 100%;  width: 100%;  display: block; float: left;  margin: -1px 1px 0px 0px;  text-align: center;">NT</span></button>');
    if(notificationactive==true){
      $(".ytp-subtitles-button.ytp-button[aria-pressed=false]").click();
    }
  }
},
2000);


})(myjQuery);
