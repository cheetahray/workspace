<?php
  include_once('db_conn.php');
  include_once('db_func.php');
  header('Content-Type: text/json; charset=utf-8');

  session_start();
  if (!isset($_SESSION['content']))
      $_SESSION['content'] = 'content';
  else if ($_SESSION['content'] == 'content')
      $_SESSION['content'] = 'content2';
  else if ($_SESSION['content'] == 'content2')
      $_SESSION['content'] = 'content3';
  else if ($_SESSION['content'] == 'content3')
      $_SESSION['content'] = 'content';
 
  // 檢查帳號名稱及密碼
  $qrystr = "SELECT nfc_form_5.catid as catid," . $_SESSION['content'] . " as content,photo,h1,h2,logo,h3,h4,h5,thatsright,href3,href4,href5 FROM nfc_form_5 inner join nfc_form_6 on nfc_form_5.catid = nfc_form_6.catid WHERE tagid ='$tagid'";
  $res = db_query($qrystr);
  //echo $qrystr;
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
    $productArray['logo'] = $row['logo'];
    $productArray['thatsright'] = $row['thatsright'];
    $productArray['href3'] = $row['href3'];
    $productArray['href4'] = $row['href4'];
    $productArray['href5'] = $row['href5'];

    $scnstr = "SELECT issms FROM nfc_form_8 WHERE tagid='$tagid' and phone='$phone'";
    $res2 = db_query($scnstr);
    $row2 = db_fetch_array($res2);
    $productArray['issms'] = $row2['issms'];
    if ( $row2['issms'] == "0"  )
    {
        $scnstr = "update nfc_form_8 set issms = '1' WHERE tagid='$tagid' and phone='$phone'";
        $res3 = db_query($scnstr);
    }
    $cntstr = "SELECT count(*) as howmany FROM nfc_form_6 left join nfc_form_8 on nfc_form_6.tagid = nfc_form_8.tagid WHERE catid ='" . $row['catid']. "'";
    $res4 = db_query($cntstr);
    $row4 = db_fetch_array($res4);
    $productArray['howmany'] = $row4['howmany'];

    $productArray['e'] = "登入成功!";
  }
  else // 等級不夠
  {
    $productArray['e'] = "tag错误!";
  }

  //we send the array as JSON object
  echo json_encode($productArray, JSON_UNESCAPED_UNICODE);
?>
