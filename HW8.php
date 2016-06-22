<?php

//echo json_encode("{'Hello':'World'}");
header('Access-Control-Allow-Origin: *');

header('Access-Control-Allow-Methods: GET, POST');

if (isset($_GET['submit'])) {

error_reporting(E_ALL);  // Turn on all errors, warnings and notices for easier debugging

// API request variables
$endpoint = 'http://svcs.ebay.com/services/search/FindingService/v1';  // URL to call
$version = '1.0.0';  // API version supported by your application
$appid = 'USC06cba4-cdbc-48b1-a6fa-31664c77277';  // Replace with your own AppID
$globalid = 'EBAY-US';  // Global ID of the eBay site you want to search (e.g., EBAY-DE)
$query = $_GET['in_keyword'];  // You may want to supply your own query
$safequery = urlencode(utf8_encode($query));  // Make the query URL-friendly
$responseEncoding = 'XML';
$i = '0';  // Initialize the item filter index to 0

      
      $conditionvalue="";
    $conditionName="";
    $listinginfo="";
      $listingtype="";
      $sellerType= "";
      $freeship="";
      $expedi="";
     $freetotally="";
     $finalprice="";
     $TotalItem = "";
      $maxtime= "";
      $buyingformat=" "; 
      $sortingOrder=""; 
      $minprice="";
      $maxprice="";
      $condition="";
      $format="";
      $max_days="";
      $price_from="";
      $price_to="";
      $max_days="";
      
  $resultperpage = $_GET['Resultsperpage'];
   $sortvalue = $_GET['SortBy'];
  
  
 if(($_GET['condition'])=="") 
  {
    $conditionvalue="";
  }
  else
  {
    $conditionvalue = $_GET['condition'];
  }

   $minprice= $_GET['price_from'];
   
   $maxprice= $_GET['price_to'];
   
  if(($_GET['format'])=="") 
  {
     $listingtype ="";
  } 
  else
  {
    $listingtype = $_GET['format'];
  }
  if(($_GET['seller'])=="true")
  {
   $sellerType=true;
  }
  else
  {
    $sellerType=false;
  }
  
   if(($_GET['free'])=="true") 
   {
    $freeship=true;
   }
   else
   {
    $freeship=false;
   }

   if(($_GET['expedited'])=="true") 
   {
    $expedi="Expedited";
   }
   
  $maxtime= $_GET['max_days'];
   
   if($maxtime == "")
   {
    $maxtime="1";
    }
    else
    {
     $maxtime =$_GET['max_days'];
   }
   if(($_GET['pageNumber'])!="")
      {
        $pageNo=$_GET['pageNumber'];
      }
      else
      {

        $pageNo=1;
      }

// Create a PHP array of the item filters you want to use in your request
$filterarray =
  array(
  array(
     'value' => $minprice,
     'name' => 'MinPrice',
     'paramName' => 'Currency',
     'paramValue' => 'USD'),
    array(
    'value' => $maxprice,
    'name' => 'MaxPrice',
    'paramName' => 'Currency',
    'paramValue' => 'USD'),
    array(
    'value' =>$conditionvalue,
    'name' => 'Condition',
    'paramName' => '',
    'paramValue' => ''),
    array(
    'value' => $listingtype,
    'name' => 'ListingType',
    'paramName' => '',
    'paramValue' => ''),
    array(
     'value' => $sellerType,
    'name' => 'ReturnsAcceptedOnly',
    'paramName' => '',
    'paramValue' => ''),
    array(
     'value' => $freeship,
    'name' => 'FreeShippingOnly',
    'paramName' => '',
    'paramValue' => ''),
     array(
     'value' => $expedi,
    'name' => 'ExpeditedShippingType',
    'paramName' => '',
    'paramValue' => ''),
    array(
     'value' => $maxtime,
    'name' => 'MaxHandlingTime',
    'paramName' => '',
    'paramValue' => ''),
      
  );





// Generates an indexed URL snippet from the array of item filters
function buildURLArray ($filterarray) {
  global $urlfilter;
  global $i;
  // Iterate through each filter in the array
  foreach($filterarray as $itemfilter) {
    // Iterate through each key in the filter
    $check="";
      foreach($itemfilter as $filter => $filtervalue)
      {
        if($filter=="value" && $filtervalue=="")
        {
          $check="set";
        }


      }
    
    foreach ($itemfilter as $key =>$value) {
      
       if($check!="set")
        {
         if(is_array($value)) {
          foreach($value as $j => $content) 
          { // Index the key for each value
        
          $urlfilter .= "&itemFilter($i).$key($j)=$content";
        }
      }
      else {
        if($value != "") {
           $urlfilter .= "&itemFilter($i).$key=$value";
        }
      }
      }
    }
    if($check=="set")
    {
        $i--;
    }
    $i++;
  }
  return "$urlfilter";
} // End of buildURLArray function

// Build the indexed item filter URL snippet
buildURLArray($filterarray);

// Construct the findItemsByKeywords HTTP GET call 
$apicall = "$endpoint?";
$apicall .= "OPERATION-NAME=findItemsAdvanced";
$apicall .= "&SERVICE-VERSION=$version";
$apicall .= "&SECURITY-APPNAME=$appid";
$apicall .= "&GLOBAL-ID=$globalid";
$apicall .= "&RESPONSE-DATA-FORMAT=$responseEncoding";
$apicall .= "&keywords=$safequery";
$apicall .= "&outputSelector[0]=SellerInfo";
$apicall .= "&outputSelector[1]=PictureURLSuperSize";
$apicall .= "&outputSelector[2]=StoreInfo";
$apicall .= "&paginationInput.pageNumber=$pageNo";
$apicall .= "&sortOrder=$sortingOrder";
$apicall .= "$urlfilter";
$apicall .= "&sortOrder=$sortvalue";
$apicall .= "&paginationInput.entriesPerPage=$resultperpage";

  



// Load the call and capture the document returned by eBay API
$resp = simplexml_load_file($apicall);

if(($resp->paginationOutput->totalEntries[0])==0)
    {
      $jdata=array(
        'ack'=>'No Results Found',
        );


    }
    else
    {

  $jdata= array(
    'ack'=>(string)$resp->ack,
    'resultCount'=>(string)$resp->paginationOutput->totalEntries[0],
    'pageNumber'=>(string)$resp->paginationOutput->pageNumber[0],
    'itemCount'=>(string)$resp->paginationOutput->entriesPerPage[0],
    );


  $i=0;
  foreach ($resp->searchResult->item as $item) {


    $jdata["item$i"]=array(

      'basicInfo'=>array(
        'title'=>isset($item->title) ? (string)$item->title : "N/A",
        'viewItemURL'=>isset($item->viewItemURL) ? (string)$item->viewItemURL : "N/A",
        'galleryURL'=>isset($item->galleryURL) ? (string)$item->galleryURL : "N/A",
        'pictureURLSuperSize'=>isset($item->pictureURLSuperSize) ? (string)$item->pictureURLSuperSize : "N/A",
        'convertedCurrentPrice'=>isset($item->sellingStatus[0]->convertedCurrentPrice) ? (string)$item->sellingStatus[0]->convertedCurrentPrice : "N/A",
        'shippingServiceCost'=>isset($item->shippingInfo[0]->shippingServiceCost) ? (string)$item->shippingInfo[0]->shippingServiceCost: "N/A", 
        'conditionDisplayName'=>isset($item->condition[0]->conditionDisplayName) ?  (string)$item->condition[0]->conditionDisplayName: "N/A",
        'listingType'=>isset($item->listingInfo[0]->listingType) ? (string)$item->listingInfo[0]->listingType : "N/A",
        'location'=>isset($item->location[0]) ?  (string)$item->location[0]: "N/A",
        'categoryName'=>isset($item->primaryCategory[0]->categoryName) ? (string)$item->primaryCategory[0]->categoryName : "N/A",
        'topRatedListing'=>isset($item->topRatedListing[0]) ?  (string)$item->topRatedListing[0]: "N/A",
        ),
      'sellerInfo'=>array(
        'sellerUserName'=>isset($item->sellerInfo[0]->sellerUserName) ? (string)$item->sellerInfo[0]->sellerUserName : "N/A",
        'feedbackScore'=>isset($item->sellerInfo[0]->feedbackScore) ? (string)$item->sellerInfo[0]->feedbackScore : "N/A",
        'positiveFeedbackPercent'=>isset($item->sellerInfo[0]->positiveFeedbackPercent) ?  (string)$item->sellerInfo[0]->positiveFeedbackPercent: "N/A",
        'feedbackRatingStar'=>isset($item->sellerInfo[0]->feedbackRatingStar) ?  (string)$item->sellerInfo[0]->feedbackRatingStar: "N/A",
        'topRatedSeller'=>isset($item->sellerInfo[0]->topRatedSeller) ? (string)$item->sellerInfo[0]->topRatedSeller : "N/A",
        'sellerStoreName'=>isset($item->storeInfo[0]->storeName) ? (string)$item->storeInfo[0]->storeName : "N/A",
        'sellerStoreURL'=>isset($item->storeInfo[0]->storeURL) ? (string)$item->storeInfo[0]->storeURL : "N/A",
        ),
      'shippingInfo'=>array(
        'shippingType'=>isset($item->shippingInfo[0]->shippingType) ? (string)$item->shippingInfo[0]->shippingType : "N/A",
        'shipToLocations'=>isset($item->shippingInfo[0]->shipToLocations) ? (string)$item->shippingInfo[0]->shipToLocations : "N/A",
        'expeditedShipping'=>isset($item->shippingInfo[0]->expeditedShipping) ?  (string)$item->shippingInfo[0]->expeditedShipping: "N/A",
        'oneDayShippingAvailable'=>isset($item->shippingInfo[0]->oneDayShippingAvailable) ? (string)$item->shippingInfo[0]->oneDayShippingAvailable : "N/A",
        'returnsAccepted'=>isset($item->returnsAccepted[0]) ?  (string)$item->returnsAccepted[0]: "N/A",
        'handlingTime'=>isset($item->shippingInfo[0]->handlingTime) ? (string)$item->shippingInfo[0]->handlingTime : "N/A",
        )

      );
    
    $i++;

  }
}

      header('Content-Type: application/json');

  
  $returnjson=json_encode($jdata,JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
  

  echo $returnjson;


 
 }
?>



