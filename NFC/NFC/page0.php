<?php
  include_once('db_conn.php');
  include_once('db_func.php');
  header('Content-Type: text/json; charset=utf-8');

    $cntstr = "SELECT count(*) as howmany FROM nfc_form_7 WHERE phone='$phone'";
    $res2 = db_query($cntstr);
    $row2 = db_fetch_array($res2);
    if( $row2['howmany'] == "0" )
        $cntstr = "INSERT INTO `nfc_form_7` (`phone`, `submission_date`, `last_modified_date`) VALUES ('$phone', now(), now())";
    else
        $cntstr = "update nfc_form_7 set `last_modified_date`=now() WHERE phone='$phone'";
    $res3 = db_query($cntstr);

    $productArray['e'] = "驗證成功";

  //we send the array as JSON object
  echo json_encode($productArray, JSON_UNESCAPED_UNICODE);
?>
