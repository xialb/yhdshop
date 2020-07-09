<?php
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];
    
    $link = mysqli_connect("localhost","root","root","shop");
    if(!$link){
        echo "connect error";
    }

    $sql = "SELECT `username` FROM `user` WHERE `username`='$username'";
    $res = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($res);
    if(!$row){
        echo json_encode(array("code"=>1, "msg"=>"用户名不存在"));
    }else{
        $sql = "SELECT `password` FROM `user` WHERE `username`='$username'";
        $res = mysqli_query($link, $sql);
        $row = mysqli_fetch_assoc($res);
        $userpassword = $row["password"];
        if($password==$userpassword){
            echo json_encode(array("code"=>0, "msg"=>"登录成功"));
        }else if($password!=$userpassword){
            echo json_encode(array("code"=>2, "msg"=>"密码错误"));
        }else{
            echo json_encode(array("code"=>2, "msg"=>"其它"));
        }
    }
?>