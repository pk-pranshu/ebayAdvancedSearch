$(document).ready(function() 
{
   $.validator.addMethod('greaterThan',function(value,element,params){
    // return this.optional(element)|| value>= $(param).val();
    return this.optional(element)|| (Number(value) > Number($(params).val()));
     }, 'Invalid value');
  
                $("#mainform").validate({
                            rules:
                              {
                                in_keyword:'required',

                                price_from:{
                                  number:true,
                                  min:0
                                },
                                price_to:{
                                  number:true,
                                  min:0,
                                  greaterThan:'#price_from'
                                },
                                max_days:
                                {
                                  digits:true,
                                  min:1
                                }
                              },

                            messages:
                              {
                               in_keyword:'Please enter a key word',
                               price_from:{
                                  number:'Price should be a valid number',
                                  min:'Minimum price cannot be below 0'
                                },
                                price_to:{
                                  number:'Price should be a valid number',
                                  min:'Maximum price cannot be less than minimum price or below 0',
                                  greaterThan:'Maximum price cannot be less than minimum price or below 0'
                                },
                                max_days:
                                {
                                  digits:'Max handling time should be a valid digit',
                                  min:'Max handling time should be greater than or equal to 1'
                                }

                            },
                        });

                $("#submit").click(function()
                  {
                    $("#mainform").valid();
                  });


    $("#submit").click(function()
    {
    

      
      searchCall(0);
});

    

          
                           $("#clear").click(function()
                      {
                      document.getElementById("displayresult").innerHTML ="";
                      document.getElementById("header").innerHTML="";
                      document.getElementById("page").innerHTML="";
                      });

                
        }); 
        
function checkcall(pg)

{

searchCall(pg);

}
      pageNums =[1,2,3,4,5];

      pagin = "";
       active=-1;
      prev="";
function searchCall(page)
    {

      
       // alert(page);
       if(page==0)
       {
        page=1;
       }
       var arr=[1,2,3,4,5,6];

       if(active%5==0 && page>prev)
       {
        for(var i=0;i<pageNums.length;i++)
        {
          pageNums[i]=pageNums[i]+5;
        }
        
       }

       else if(active==1 && page<prev )
       {
        // alert("yes");
        for(var k=0;k<pageNums.length;k++)
        {
          pageNums[k]=pageNums[k]-5;
        }
       }

       if(page<prev && page%5==0)
       {
        active=5;
        if(page in arr)
        {
          pagin = "<div><nav><ul class=\"pagination\"><li class=\"disabled\"><a href=\"#disp\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li>";
        }
        else
        {
           pagin = "<div><nav><ul class=\"pagination\"><li><a href=\"#disp\" onclick=\"searchCall("+(page-1)+")\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li>";

        }        
        
        
       }


       else if(!(page in arr) && page>active)
       {
         for(var k=1;k<=19;k++)
         {
          var x = page-(5*k);
          if(x==1 || x==2 || x==3 || x==4 || x==5)
          {
            active = x;
            break;
          }
         }
         pagin = "<div><nav><ul class=\"pagination\"><li><a href=\"#disp\" onclick=\"searchCall("+(page-1)+")\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li>";
      }
      else 
      {
        if(page==0)
        {
          active=1;
          pagin= "<div><nav><ul class=\"pagination\"><li class=\"disabled\"><a href=\"#disp\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li>";
        }
        else if(page in arr)
        {
          active=page;
          pagin= "<div><nav><ul class=\"pagination\"><li class=\"disabled\"><a href=\"#disp\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li>";

        }
        else{

        active=page;
        pagin ="<div><nav><ul class=\"pagination\"><li><a href=\"#disp\" onclick=\"searchCall("+(page-1)+")\" aria-label=\"Previous\"><span aria-hidden=\"true\">&laquo;</span></a></li>";
        
        }
      }
      prev=page;
      // alert("active"+active);
       if(active==1)
       {
        pagin += "<li id=\"one\" class=\"active\"><a href=\"#disp\" onclick=\"searchCall("+pageNums[0]+")\">"+pageNums[0]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[1]+")\">"+pageNums[1]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[2]+")\">"+pageNums[2]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[3]+")\">"+pageNums[3]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[4]+")\">"+pageNums[4]+"</a></li>";

       }
        else if(active==2)
       {
        pagin += "<li id=\"one\"><a href=\"#disp\" onclick=\"searchCall("+pageNums[0]+")\">"+pageNums[0]+"</a></li><li class=\"active\"><a href=\"#disp\" onclick=\"searchCall("+pageNums[1]+")\">"+pageNums[1]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[2]+")\">"+pageNums[2]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[3]+")\">"+pageNums[3]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[4]+")\">"+pageNums[4]+"</a></li>";

       }
        else if(active==3)
       {
        pagin += "<li id=\"one\"><a href=\"#disp\" onclick=\"searchCall("+pageNums[0]+")\">"+pageNums[0]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[1]+")\">"+pageNums[1]+"</a></li><li class=\"active\"><a href=\"#disp\" onclick=\"searchCall("+pageNums[2]+")\">"+pageNums[2]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[3]+")\">"+pageNums[3]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[4]+")\">"+pageNums[4]+"</a></li>";

       }
       else if(active==4)
       {
        pagin += "<li id=\"one\"><a href=\"#disp\" onclick=\"searchCall("+pageNums[0]+")\">"+pageNums[0]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[1]+")\">"+pageNums[1]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[2]+")\">"+pageNums[2]+"</a></li><li class=\"active\"><a href=\"#disp\" onclick=\"searchCall("+pageNums[3]+")\">"+pageNums[3]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[4]+")\">"+pageNums[4]+"</a></li>";

       }

       else if(active==5)
       {
        pagin += "<li id=\"one\"><a href=\"#disp\" onclick=\"searchCall("+pageNums[0]+")\">"+pageNums[0]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[1]+")\">"+pageNums[1]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[2]+")\">"+pageNums[2]+"</a></li><li><a href=\"#disp\" onclick=\"searchCall("+pageNums[3]+")\">"+pageNums[3]+"</a></li><li class=\"active\"><a href=\"#disp\" onclick=\"searchCall("+pageNums[4]+")\">"+pageNums[4]+"</a></li>";

       }

       if(page==95)
       {
        pagin+="<li class=\"disabled\"><a href=\"#disp\" aria-label=\"Next\"><span aria-hidden=\"true\">&raquo;</span></a></li></ul></nav></div>";
       }
       else
       {
        pagin+="<li><a href=\"#disp\" onclick=\"searchCall("+(page+1)+")\" aria-label=\"Next\"><span aria-hidden=\"true\">&raquo;</span></a></li></ul></nav></div>";

       }

        var key = document.getElementById("in_keyword").value;
        var s=document.getElementById("submit").value;
            var rp=document.getElementById("Resultsperpage").value;
            var sb=document.getElementById("SortBy").value;
            var pf = document.getElementById("price_from").value;
            var pt= document.getElementById("price_to").value;
            var md= document.getElementById("max_days").value;
                           
            var sell= $("#seller").prop('checked'); 
            var free=$("#free").prop('checked');
            var exp=$("#expedited").prop('checked');


                var cond=document.getElementsByName("condition[]");
                condArray=[];
                var j=0;
                for(var i=0;i<cond.length;i++)
                {
                  if(cond[i].checked)
                  {
                    condArray[j]=cond[i].value;
                    j++;
                  }

                }
               

                CondArrayPass="";

                if(condArray.length==0)
                { 
                  var emp="";
                  CondArrayPass+="&condition="+emp;

                }

                else
                {
                  for(var i=0;i<condArray.length;i++)
                  {
                    CondArrayPass+="&condition="+condArray[i];

                  }
                }

                var format=document.getElementsByName("format[]");
                formatArray=[];
                var j=0;
                for(var i=0;i<format.length;i++)
                {
                  if(format[i].checked)
                  {
                    formatArray[j]=format[i].value;
                    j++;
                  }

                }
               

                formatArrayPass="";

                if(formatArray.length==0)
                { 
                  var emp="";
                  formatArrayPass+="&format="+emp;

                }

                else
                {
                  for(var i=0;i<formatArray.length;i++)
                  {
                    formatArrayPass+="&format="+formatArray[i];

                  }
                }

      if(page!=0)
      {
        check ='in_keyword='+key+'&price_from='+pf+'&price_to='+pt+CondArrayPass+formatArrayPass+'&seller='+sell+'&free='+free+'&expedited='+exp+'&max_days='+md+'&SortBy='+sb+'&Resultsperpage='+rp+'&pageNumber='+page+'&submit='+s; 
      }
      else if(page==0)
      {

        
        check='in_keyword='+key+'&price_from='+pf+'&price_to='+pt+CondArrayPass+formatArrayPass+'&seller='+sell+'&free='+free+'&expedited='+exp+'&max_days='+md+'&SortBy='+sb+'&Resultsperpage='+rp+'&pageNumber='+""+'&submit='+s;
      }
    

                // var check='in_keyword='+key+'&price_from='+pf+'&price_to='+pt+CondArrayPass+formatArrayPass+'&seller='+sell+'&free='+free+'&expedited='+exp+'&max_days='+md+'&SortBy='+sb+'&Resultsperpage='+rp+'&submit='+s;

                // alert (check);
 
                $.ajax({
                    url: 'http://cs-server.usc.edu:24181/HW8.php?'+check,
                    type: "GET",
                    async: false,
                    dataType:"json",
                                        
                    success: function(result){
                      response=result;
                    
                        // alert(response.ack);
         
                         parseJSON(response);
                         
                                                
            },
            error: function()
            {
              alert("Error.");
            }
            
            
          });
         }



         function parseJSON(response)
          {

            resultCount=response.resultCount;
            itemCount=response.itemCount;
            // alert(resultCount);
                  ItemName = "";
                  item =""; 
                  Final ="";    
                  resultdisplay="";
                  resulttab=""; 
                  fb="http://cs-server.usc.edu:45678/hw/hw8/fb.png"; 
                  topRated="http://cs-server.usc.edu:45678/hw/hw8/itemTopRated.jpg"; 

                  if(response.ack == "No Results Found")  
                  {
                    resultdisplay="<hr><h1>No Results Found</h1>";
                    document.getElementById("displayresult").innerHTML=resultdisplay;
            document.getElementById("header").innerHTML="";
            document.getElementById("page").innerHTML=""


                  }
                  else
                  {
                    var results="";
        
            var currentPage =response.pageNumber;
            var fromPage=(currentPage-1)*itemCount+1;
            var toPage=currentPage*itemCount;
         
            var resultHeader="<h3>"+fromPage+"-"+toPage+" items out of "+resultCount+"</h3>";


                        for(var i=0; i <itemCount;i++)
                      {

                        Final=response['item'+i.toString()].basicInfo.title;
                  viewItemURL=response['item'+i.toString()].basicInfo.viewItemURL;
                      galleryURL=response['item'+i.toString()].basicInfo.galleryURL;
                      convertedCurrentPrice=response['item'+i.toString()].basicInfo.convertedCurrentPrice;
                      shippingServiceCost=response['item'+i.toString()].basicInfo.shippingServiceCost;
                      categoryName=response['item'+i.toString()].basicInfo.categoryName;
                      condition=response['item'+i.toString()].basicInfo.conditionDisplayName;
                      listingType=response['item'+i.toString()].basicInfo.listingType;
                      pictureURLSuperSize=response['item'+i.toString()].basicInfo.pictureURLSuperSize;
                      topRatedListing=response['item'+i.toString()].basicInfo.topRatedListing;


                      sellerUserName=response['item'+i.toString()].sellerInfo.sellerUserName;
                      feedbackScore=response['item'+i.toString()].sellerInfo.feedbackScore;
                      positiveFeedbackPercent=response['item'+i.toString()].sellerInfo.positiveFeedbackPercent;
                      feedbackRatingStar=response['item'+i.toString()].sellerInfo.feedbackRatingStar;
                      topRatedSeller=response['item'+i.toString()].sellerInfo.topRatedSeller;
                      sellerStoreName=response['item'+i.toString()].sellerInfo.sellerStoreName;
                      sellerStoreURL=response['item'+i.toString()].sellerInfo.sellerStoreURL;

                      shippingType=response['item'+i.toString()].shippingInfo.shippingType;
                      handlingTime=response['item'+i.toString()].shippingInfo.handlingTime;
                      shipToLocations=response['item'+i.toString()].shippingInfo.shipToLocations;
                      expeditedShipping=response['item'+i.toString()].shippingInfo.expeditedShipping;
                      oneDayShippingAvailable=response['item'+i.toString()].shippingInfo.oneDayShippingAvailable;
                      returnsAccepted=response['item'+i.toString()].shippingInfo.returnsAccepted;


                      if(shippingServiceCost== 0.0 || shippingServiceCost=="")
                      {
                        shippingServiceCost="FREE Shipping";
                      }
                      else
                      {
                        shippingServiceCost="+ $"+shippingServiceCost+" for shipping";

                      }
                      if(listingType=="FixedPrice" || listingType=="StoreInventory")
                      {
                        listingType="Buy It Now";
                      }
                      else if(listingType=="Classified")
                      {
                        listingType="Classified Ad";
                      }
                      else
                      {
                        listingType=listingType;
                      }
                      if(shippingType=="N/A")
              {
                shippingType=shippingType;

              }
              else
              {
                shippingType = shippingType.replace(/([a-z])([A-Z])/g, '$1 $2');
              }

                      loc=response['item'+i.toString()].basicInfo.location;

                    resultdisplay += "<div class=\"media\">\
                                         <div class=\"media-left\">\
                                        <a href=\"#myModal"+i.toString()+"\" data-target=\"#myModal"+i.toString()+"\" data-toggle=\"modal\">    \
                                        <img style=\"width:80px; height:80px;\" class=\"media-object\" src=\""+galleryURL+"\" alt=\"Media Object\">\
                                        </a></div> \
                                        <div class=\"media-body\">\
                                        <a id=\"drop\"href=\""+viewItemURL+"\">\
                                        <h4 class=\"media-heading\">"+Final+"</h4>\
                                        </a>\
                                        <p>\
                                        <b>Price:$"+convertedCurrentPrice+"</b>("+shippingServiceCost+")\
                                        <i>&nbsp&nbsp Location:"+loc+"</i>";
                                        if(topRatedListing == "true")
                                        {
                                          resultdisplay+="<img style=\"width:20px; height:20px;\" src=\""+topRated+"\"></img>";
                                        }
                                        resultdisplay +="&nbsp&nbsp&nbsp&nbsp\
                                        <a id=\"details\" data-toggle=\"collapse\" href=\"#displaytabs"+i.toString()+"\" aria-expanded=\"false\" aria-controls=\"collapseExample\">View Details</a>\
                                        &nbsp                                     \
                                      <img class =\"fbpage\" id=\"fb"+i.toString()+"\" style=\"width:20px; height:20px;\"  src=\""+fb+"\" alt=\"Fb\">\
                                      </a>\
                                        </img>\
                                        </p>\
                                        <div id=\"myModal"+i.toString()+"\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\
                          <div class=\"modal-dialog\">\
                        <div class=\"modal-content\">\
                        <div class=\"modal-header\">\
                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\
                        <span aria-hidden=\"true\">&times;</span></button>\
                        <h4 class=\"modal-title\" id=\"myModalLabel\">"+Final+"</h4>\
                        </div>\
                          <div class=\"modal-body\">";
                          if(pictureURLSuperSize=="N/A")
                          {
                            resultdisplay +="<img align=\"middle\" src=\""+galleryURL+"\" class=\"img-responsive\">";
                          }
                              else
                              {
                              resultdisplay +="<img src=\""+pictureURLSuperSize+"\" class=\"img-responsive\">";
                      }

                        resultdisplay +="</div>\
                        </div>\
                          </div>\
                        </div>\
                                        <div class=\"collapse\" id=\"displaytabs"+i.toString()+"\">\
                                        <ul class=\"nav nav-tabs\" role=\"tablist\" id=\"myTab\">\
                                        <li role=\"presentation\" class=\"active\">\
                                        <a href=\"#Basicinfo"+i.toString()+"\" aria-controls=\"home\" role=\"tab\" data-toggle=\"tab\">Basic Info</a>\
                                        </li>\
                                        <li role=\"presentation\">\
                                        <a href=\"#Sellerinfo"+i.toString()+"\" aria-controls=\"profile\" role=\"tab\" data-toggle=\"tab\">Seller Info</a>\
                                        </li>\
                                        <li role=\"presentation\">\
                                        <a href=\"#Shippinginfo"+i.toString()+"\" aria-controls=\"messages\" role=\"tab\" data-toggle=\"tab\">Shipping Info</a>\
                                        </li>\
                                        </ul>\
                                        <div id=\"myTabContent\" class=\"tab-content\">\
                         <div class=\"tab-pane fade in active\" id=\"Basicinfo"+i.toString()+"\">\
                          <table width=\"60%\">\
                            <tr>\
                            <tr><td><b>Category Name</b></td><td>"+categoryName+"</td></tr>\
                            <tr><td><b>Condition</b></td><td>"+condition+"</td></tr>\
                            <tr><td><b>Buying Format</b></td><td>"+listingType+"</td></tr>\
                          </tr></table></div>\
                         <div class=\"tab-pane fade\" id=\"Sellerinfo"+i.toString()+"\">\
                           <table width=\"60%\">\
                            <tr>\
                            <tr><td><b>User Name</b></td><td>"+sellerUserName+"</td></tr>\
                            <tr><td><b>Feedback Score</b></td><td>"+feedbackScore+"</td></tr>\
                            <tr><td><b>Positive Feedback</b></td><td>"+positiveFeedbackPercent+"%</td></tr>\
                            <tr><td><b>Feedback Rating</b></td><td>"+feedbackRatingStar+"</td></tr>";

                            

                        if(topRatedSeller=="true")
                        {

                          resultdisplay +="<tr><td><b>Top Rated</b></td><td><span class=\"glyphicon glyphicon-ok\" style=\"color:#00FF00\">";
                        }

                            
                    else
                    {
                        resultdisplay +="<tr><td><b>Top Rated</b></td><td><span class=\"glyphicon glyphicon-remove\" style=\"color:#FF0000\">";
                    }

                    resultdisplay +="</span></td></tr>\
                            <tr><td><b>Store</b></td><td><a href=\""+sellerStoreURL+"\">"+sellerStoreName+"</a></td></tr>\
                          </tr></table>\
                       </div>";
                    

                    resultdisplay +="<div class=\"tab-pane fade\" id=\"Shippinginfo"+i.toString()+"\">\
                          <table width=\"60%\">\
                            <tr>\
                            <tr><td><b>Shipping type</b></td><td>"+shippingType+"</td></tr>\
                            <tr><td><b>Handling time</b></td><td>"+handlingTime+"  day(s)</td></tr>\
                            <tr><td><b>Shipping locations</b></td><td>"+shipToLocations+"</td></tr>";

                      if(expeditedShipping=="true")
                        {

                          resultdisplay +="<tr><td><b>Expedited shipping</b></td><td><span class=\"glyphicon glyphicon-ok\" style=\"color:#00FF00\">";
                        }

                            
                    else
                    {
                        resultdisplay +="<tr><td><b>Expedited shipping</b></td><td><span class=\"glyphicon glyphicon-remove\" style=\"color:#FF0000\">";
                    }


                      if(oneDayShippingAvailable=="true")
                        {

                          resultdisplay +="<tr><td><b>One day shipping</b></td><td><span class=\"glyphicon glyphicon-ok\" style=\"color:#00FF00\">";
                        }

                            
                    else
                    {
                        resultdisplay +="<tr><td><b>One day shipping</b></td><td><span class=\"glyphicon glyphicon-remove\" style=\"color:#FF0000\">";
                    }


                    if(returnsAccepted=="true")
                        {

                          resultdisplay +="<tr><td><b>Returns accepted</b></td><td><span class=\"glyphicon glyphicon-ok\" style=\"color:#00FF00\">";
                        }

                            
                    else
                    {
                        resultdisplay +="<tr><td><b>Returns accepted</b></td><td><span class=\"glyphicon glyphicon-remove\" style=\"color:#FF0000\">";
                    }

                      resultdisplay +="</tr></table>\
                                   </div>\
                                   </div>\
                                                    </div></div></div>"; 


                                                      


                        }
          

          document.getElementById("header").innerHTML=resultHeader;
          document.getElementById("displayresult").innerHTML=resultdisplay;    
          document.getElementById("page").innerHTML=pagin; 
          





                 //$("#fb"+i.toString()).click(function() {   
                  $(".fbpage").click(function(){
                   // alert($(this).attr("id")) ; 

          if(parseFloat(shippingServiceCost)>0)
              ShippingPrice = '(+ $'+ shippingServiceCost+'),';
          else
            ShippingPrice = '(Free Shipping),';


          window.fbAsyncInit = function() {
            FB.init({
              appId      : '1564164697183781',
              xfbml      : true,
              version    : 'v2.2'
            });
          FB.ui({
                  method: 'feed',
                  name: Final,
                  link: viewItemURL,
                      caption: 'Search Information from eBay.com',
                  description: 'Price: $'+convertedCurrentPrice+ShippingPrice+' Location: '+loc,
                  picture: galleryURL
                  }, function(response) {
                  if (response && !response.error_code) {
                      alert('Posted Successfully');
                  } else {
                      alert('Not Posted');
                  }
                          
                });
            };
                   
                    (function(d, s, id){
                       var js, fjs = d.getElementsByTagName(s)[0];
                       if (d.getElementById(id)) {return;}
                       js = d.createElement(s); js.id = id;
                       js.src = "//connect.facebook.net/en_US/sdk.js";
                       fjs.parentNode.insertBefore(js, fjs);
                     }(document, 'script', 'facebook-jssdk'));

        });   





                    }


                             
                              
                }




