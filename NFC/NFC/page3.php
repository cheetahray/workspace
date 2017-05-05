<?php
  include_once('db_conn.php');
  include_once('db_func.php');
  header('Content-Type: text/json; charset=utf-8');

  // 檢查帳號名稱及密碼
  $qrystr = "SELECT h6,h7,h8,h9,h10,photo7,photo8,photo9,photo10 FROM nfc_form_5 inner join nfc_form_6 on nfc_form_5.catid = nfc_form_6.catid WHERE tagid ='$tagid'";
  $res = db_query($qrystr);

  $productArray = array();
  //$productArray['sql'] = $qrystr;
  $productArray['num'] = db_num_rows($res);
  if ( $productArray['num'] > 0 )
  {  // 若帳號及密碼正確

    $row = db_fetch_array($res);
    $productArray['tagid'] = $tagid;
    $productArray['h6'] = $row['h6'];
    $productArray['h7'] = $row['h7'];
    $productArray['h8'] = $row['h8'];
    $productArray['h9'] = $row['h9'];
    $productArray['h10'] = $row['h10'];
    $productArray['photo7'] = $row['photo7'];
    $productArray['photo8'] = $row['photo8'];
    $productArray['photo9'] = $row['photo9'];
    $productArray['photo10'] = $row['photo10'];

    // 在 session 中記錄管理員已登入
    //session_start();
    //$_SESSION['is_admin'] = true;

    $productArray['e'] = "登入成功!";
  }
  else // 等級不夠
  {
    $productArray['e'] = "tag错误!";
  }

  //we send the array as JSON object
  echo json_encode($productArray, JSON_UNESCAPED_UNICODE);
?>
