<?php
  $DB_HOST        = "localhost";    //資料庫主機位置
  $DB_LOGIN       = "NFC";         //資料庫的使用帳號
  $DB_PASSWORD    = "JoeyHatchRay";       //資料庫的使用密碼
  $DB_NAME        = "NFC";     //資料庫名稱

  $conn = mysql_connect($DB_HOST, $DB_LOGIN, $DB_PASSWORD);
  mysql_select_db($DB_NAME);
  mysql_set_charset('utf8', $conn);
?>
