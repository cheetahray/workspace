<?php require 'vendor/autoload.php';
$generator = new \Picqer\Barcode\BarcodeGeneratorPNG();
echo '<html><body>';
echo '<img src="data:image/png;base64,' . base64_encode($generator->getBarcode($_GET['tagid'], $generator::TYPE_CODE_128)) . '">';
echo '<br/><font>' . $_GET['tagid'] . '</font>';
echo '</body></html>';
?>
