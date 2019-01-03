var express = require('express');
var router = express.Router();

router.all('*',(req,res,next)=>{
  //res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Origin","http://127.0.0.1:8080"); //允许携带cookie证书的域名
  res.header("Access-Control-Allow-Credentials",true);  //值是一个布尔值，表示是否允许发送Cookie
  next()
})
//引入mssql模块
const mysql = require('mysql');

//数据库链接配置(创建数据库链接)
const conn = mysql.createConnection({
  host      :'localhost',
  user      :'root',
  password  :'root',
  database  :'hlsmms'
});

//打开数据库连接
conn.connect(err=>{
  if(err){
    console.log("×数据库连接失败!",message)
  }
  else{
    console.log("√数据库连接成功!")
  }
})
/* GET users listing. */
router.post('/useradd', function(req, res) {
  res.header("Access-Control-Allow-Origin","*");
  //接收前台发送的数据
  let {username,pass,usergroup}=req.body;
  let sqlStr="insert into userinfo(username,userpwd,usergroup) values(?,?,?)";
  let sqlParmas=[username,pass,usergroup];
  conn.query(sqlStr,sqlParmas,(err,result)=>{
    //错误处理
    if(err){
      throw err;
    }
    else{
      //执行的结果
      console.log(result);
      if(result.affectedRows>0){
        res.json({"isOk":true,"code":1,"msg":"用户添加成功！"});
      }
      else{
        res.json({"isOk":false,"code":-1,"msg":"用户添加失败！"});
      }
    }
  });
});

router.get('/userlists',(req,res)=>{
let sqlStr ="select * from userinfo order by userid desc";
  conn.query(sqlStr,(err,users)=>{
    if(err){
      throw err;
    }else{
      res.send(users);
    }
  })
})

router.get('/userdel',(req,res)=>{
  let userid = req.query.userid;
  let sqlStr = `delete from userinfo where userid = ${userid}`
  conn.query(sqlStr,(err,relest)=>{
    if(err){
      throw err;
    }else{
      //console.log(relest);
      if(relest.affectedRows>0){
        res.send({"isOk":true,"code":1,"msg":"用户删除成功!!"});
      }else{
        res.send({"isOk":false,"code":-1,"msg":"用户删除失败!!"});
      }
    }

  })

})
router.get('/userupdate',(req,res)=>{
  let userid =req.query.userid;
  let strStr ="select * from userinfo where userid="+userid;
  conn.query(strStr,(err,relest)=>{
    if(err){
      throw err;
    }else{
      res.send(relest);
    }
  })
})
router.post('/usersave',(req,res)=>{
  let {username,userpwd,usergroup,userid}=req.body;
  //console.log(username,userpwd,usergroup,userid)
  let sqlStr ="update userinfo set username=?,userpwd=?,usergroup=? where userid=?";
  let sqlParams=[username,userpwd,usergroup,userid];
  conn.query(sqlStr,sqlParams,(err,result)=>{
    if(err){rr
      throw err;
    }else{
      if(result.affectedRows>0){
        res.json({"isOk":true,"code":1,"msg":"用户修改成功"});
      }else{
        res.json({"isOk":false,"code":-1,"msg":"用户修改失败"});
      }
    }
  })
})
router.post('/checklogin',(req,res)=>{
  let {username,userpwd}=req.body;
  let sqlStr ="select * from userinfo where username=? and userpwd=?";
  let sqlParams=[username,userpwd];
  conn.query(sqlStr,sqlParams,(err,result)=>{
    if(err){
      throw err;
    }else{
      if(result.length>0){
        res.cookie("userid",result[0].userid);
        res.cookie("username",username);
        res.send({"isOk":true,"msg":"用户登陆成功！"});
      }else{
        res.send({"isOk":false,"msg":"用户登陆失败！"});
      }
    }
  });
});
//检验cookie是否存在
//验证cookie是否存在
router.get("/getcookie",(req,res)=>{
  let userid=req.cookies.userid;
  let username=req.cookies.username;
//如果存在就有cookie就合法
  if(userid && username){
    res.send({"isOk":true,"username":username});
  }
  else{
    res.send({"isOk":false});
  }
});

router.get("/loginOut",(req,res)=>{
  res.clearCookie("userid");
  res.clearCookie("username");
  res.send({"isOk":true});
})

router.get("/getgoods",(req,res)=>{
  let {classname,keywords}=req.query;
  let sqlStr="select * from goodsinfo where 1=1";
  //let sqlStr ="select * from goodsinfo order by goodsid desc";
  if(classname){
    sqlStr+=` and classname='${classname}'`; //字符串加引号
  }
  if(keywords){
    sqlStr+=` and (goodsname like '%${keywords}%' or barcode like '%${keywords}%')`; //商品名和条码二选一
  }
  sqlStr+=" order by goodsid desc";

  let total=0;
  conn.query(sqlStr,(err,goodsTotal)=>{
    if(err){
      throw err;
    }
    else{
      total=goodsTotal.length;
    }
  });
  //分页--------------------------------------------------------------------------------------------
  let {pagesize,currentpage}=req.query;
  console.log('pagesize',pagesize,'currentpage',currentpage);

  //拼接分页的sql语句
  //console.log(sqlStr);  验证拼接是否正常
  //limit的语法: limit 跳过的条数，每页显示的条数
  if(pagesize && currentpage){
    let skip=(currentpage-1)*pagesize; //跳过的条数
    sqlStr+=` limit ${skip},${pagesize}`;
  }
  conn.query(sqlStr,(err,result)=>{
    if(err){
      throw err;
    }else{
      res.send({"total":total,"result":result});
    }
  })
})

//router.get("/getgoods",(req,res)=>{
//  let sqlStr ="select * from goodsinfo order by goodsid desc";
//conn.query(sqlStr,(err,result)=>{
//  if(err){
//    throw err;
//  }else{
//    res.send(result);
//  }
//})
//})
module.exports = router;
