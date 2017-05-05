<?php
  include_once('db_conn.php');
  include_once('db_func.php');
  header('Content-Type: text/json; charset=utf-8');

  // 檢查帳號名稱及密碼
  $qrystr = "SELECT catid FROM nfc_form_6 WHERE tagid ='$tagid'";
  $res = db_query($qrystr);

  $productArray = array();
  //$productArray['sql'] = $qrystr;
  $productArray['num'] = db_num_rows($res);
  if ( $productArray['num'] > 0 )
  {  // 若帳號及密碼正確

    $row = db_fetch_array($res);
    $productArray['tagid'] = $tagid;
    $productArray['catid'] = $row['catid'];   

    $cntstr = "SELECT count(*) as howmany FROM nfc_form_8 WHERE tagid ='$tagid' and phone='$phone'";
    $res2 = db_query($cntstr);
    $row2 = db_fetch_array($res2);
    if( $row2['howmany'] == "0" )
        $cntstr = "INSERT INTO `nfc_form_8` (`tagid`, `phone`, `submission_date`, `last_modified_date` , `issms`) VALUES ('$tagid', '$phone', now(), now(), '0')";
    else
        $cntstr = "update nfc_form_8 set `last_modified_date`=now() WHERE tagid ='$tagid' and phone='$phone'";
    $res3 = db_query($cntstr);

    // 在 session 中記錄管理員已登入
    //session_start();
    //$_SESSION['is_admin'] = true;

    $productArray['e'] = "登入成功!";
  }
  else // 等級不夠
  {
    $productArray['e'] = "tag错误!";
    $qrystr = "INSERT INTO `nfc_form_6` (`tagid`, `catid`, `submission_date`, `last_modified_date`) VALUES ('$tagid', '1', now(), now())";
    $res = db_query($qrystr);
  }

  //we send the array as JSON object
  echo json_encode($productArray, JSON_UNESCAPED_UNICODE);
?>
