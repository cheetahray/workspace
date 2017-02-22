<?php
  include_once('db_conn.php');
  include_once('db_func.php');
  header('Content-Type: text/json; charset=utf-8');

  // 檢查帳號名稱及密碼
  $qrystr = "SELECT content,photo,h1,h2,phone,name FROM nfc_form_4 WHERE tagid ='$tagid'";
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
        $productArray['phone'] = $row['phone'];
        $productArray['name'] = $row['name'];

        // 在 session 中記錄管理員已登入
        //session_start();
        //$_SESSION['is_admin'] = true;

    $productArray['e'] = "登入成功!";
  }
  else // 等級不夠
  {
    $productArray['e'] = "tag错误!";
    $qrystr = "INSERT INTO `nfc_form_4` (`tagid`, `content`, `name`, `phone`, `photo`, `h1`, `h2`) VALUES ('$tagid', '請更新', '請更新', '0800080080', 'http://nfc.tagallover.com/gallery3/var/resizes/NFC/15319164_10207787086181225_4874076807689444839_n.jpg?m=1487158570', '請更新', '請更新')";
    $res = db_query($qrystr);
  }

  //we send the array as JSON object
  echo json_encode($productArray, JSON_UNESCAPED_UNICODE);
?>
