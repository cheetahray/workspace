<?php
  include_once('db_conn.php');
  include_once('db_func.php');
  header('Content-Type: text/json; charset=utf-8');

  // 檢查帳號名稱及密碼
  $qrystr = "SELECT content,photo,h1,h2,phone,name,logo,h3,h4,h5,thatsright,catid,href3,href4,href5 FROM nfc_form_4 WHERE tagid ='$tagid'";
  $res = db_query($qrystr);

  $productArray = array();
  //$productArray['sql'] = $qrystr;
  $productArray['num'] = db_num_rows($res);
  if ( $productArray['num'] > 0 )
  {  // 若帳號及密碼正確

    $row = db_fetch_array($res);
    $productArray['tagid'] = $tagid;
    $productArray['content'] = $row['content'];
    $productArray['photo'] = $row['photo']; 
    $productArray['h1'] = $row['h1'];
    $productArray['h2'] = $row['h2'];
    $productArray['h3'] = $row['h3'];
    $productArray['h4'] = $row['h4'];
    $productArray['h5'] = $row['h5'];
    $productArray['phone'] = $row['phone'];
    $productArray['name'] = $row['name'];
    $productArray['logo'] = $row['logo'];
    $productArray['thatsright'] = $row['thatsright'];
    $productArray['href3'] = $row['href3'];
    $productArray['href4'] = $row['href4'];
    $productArray['href5'] = $row['href5'];
    
    $cntstr = "SELECT count(*) as howmany FROM nfc_form_4 WHERE catid ='" . $row['catid']. "' and isscanned='1'";
    $res2 = db_query($cntstr);
    $row2 = db_fetch_array($res2);
    $productArray['howmany'] = $row2['howmany'];
    
    $updatestr = "UPDATE `nfc_form_4` SET `isscanned`='1' WHERE tagid ='$tagid'";
    $res3 = db_query($updatestr);
    // 在 session 中記錄管理員已登入
    //session_start();
    //$_SESSION['is_admin'] = true;

    $productArray['e'] = "登入成功!";
  }
  else // 等級不夠
  {
    $productArray['e'] = "tag错误!";
    $qrystr = "INSERT INTO `nfc_form_4` (`tagid`, `phone`, `photo`, `catid`, `isscanned`) VALUES ('$tagid', '0800080080', 'http://nfc.tagallover.com/gallery3/var/resizes/NFC/15319164_10207787086181225_4874076807689444839_n.jpg?m=1487158570', '1', '0')";
    $res = db_query($qrystr);
  }

  //we send the array as JSON object
  echo json_encode($productArray, JSON_UNESCAPED_UNICODE);
?>
