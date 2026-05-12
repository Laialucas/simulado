
<!-- caso não funcione, tirar o "port=3307" -->
<?php
$conn = new PDO("mysql:host=localhost;port=3307;dbname=simulado;charset=utf8", "user", "1234");
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);