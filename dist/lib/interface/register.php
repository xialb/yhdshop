<?php
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];
    $phone = $_REQUEST["tel"];
    
    $link = mysqli_connect("localhost","root","root","shop");
    if(!$link){
        echo "connect error";
    }
    $sql = "SELECT `phone` FROM `user` WHERE '$phone'=`phone`";
    $res = mysqli_query($link, $sql);
    $row = mysqli_fetch_assoc($res);
    if($row){
       echo json_encode(array("code"=>1, "msg"=>"手机号码重复")); 
    }else{
        $sql = "SELECT `username` FROM `user` WHERE '$username'=`username`";
        $res = mysqli_query($link, $sql);
        $row = mysqli_fetch_assoc($res);
        if($row){
            echo json_encode(array("code"=>2, "msg"=>"用户名重复"));
        }else{
            $sql = "INSERT INTO `user` (`username`,`password`,`phone`) VALUES ('$username','$password','$phone')";
            $res = mysqli_query($link, $sql);
            if($res){
                echo json_encode(array("code"=>0, "msg"=>"注册成功"));
            }else{
                echo json_encode(array("code"=>3, "msg"=>"其它"));
            }
        }
    }

?>