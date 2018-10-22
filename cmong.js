var express = require('express');
var bodyParser = require('body-parser');
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var fs = require('fs');
var fse = require('fs-extra')
var multer = require('multer');
var session = require('express-session')
var socketio = require('socket.io');
var cors = require('cors');
var mysql = require('mysql');
var conn = mysql.createConnection({
  host     : 'cmongdb.cyae1ptjai7y.ap-northeast-2.rds.amazonaws.com',
  user     : 'chjfrom',
  password : '',
  database : ''
});
conn.connect();
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('file'));
app.use(express.static('public'));
app.use(express.static('loadUp'));
app.use(session({
  secret: '3!@4&*$#%$#',
  resave: true,
  saveUninitialized: true,
}))
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("---------------")
    console.log(req.params.id)
    cb(null, 'loadUp/'+req.params.id)
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, file.originalname);
  }
});
var upload = multer({storage: storage});

app.get('/type_list',function(req,res){
    var c_user =  req.session.c_user;
    var c_userId =  req.session.c_user.c_id;
    var category = req.query.category;
    var typeName;
    if (category == 1){
        typeName = '디자인';
    } else if (category == 2){
        typeName = 'IT&프로그래밍';
    } else if (category == 11){
        typeName = '로고디자인';
    } else if (category == 12){
        typeName = '명함&인쇄물';
    } else if (category == 13){
        typeName = '웹&모바일';
    } else if (category == 21){
         typeName = '워드프레스';
    } else if (category == 22){
         typeName = '웹사이트 개발';
    } else if (category == 23){
         typeName = '웹사이트 유지보수';
    }
    if (category == 1 || category == 2){
        var sql = 'select * from cmong_product where de_cate_01 = ?'
        conn.query(sql,typeName,function(err,cmong_product,fields){
            if (err){
                console.log(err);
            } else {
                var cmong_product = cmong_product;
                var sql = 'select * from c_interest where c_id = ? and c_interestC = 1';
                conn.query(sql,c_userId,function(err,c_interest,fields){
                    if(err) {
                        console.log(err)
                    } else {
                        res.render('type_list',{cmong_product:cmong_product,typeName:typeName,category:category,c_user:c_user,c_interest:c_interest});
                    }
                });
            }
        });
    } else {
        var sql = 'select * from cmong_product where de_cate_02 = ?'
        conn.query(sql,typeName,function(err,cmong_product,fields){
            if (err){
                console.log(err);
            } else {
                var cmong_product = cmong_product;
                var sql = 'select * from c_interest where c_id = ? and c_interestC = 1';
                conn.query(sql,c_userId,function(err,c_interest,fields){
                    if(err) {
                        console.log(err)
                    } else {
                        res.render('type_list',{cmong_product:cmong_product,typeName:typeName,category:category,c_user:c_user,c_interest:c_interest});
                    }
                });
            }
        });
    }

});


app.get('/likepage',function(req,res){
    var type =  req.query.type;
    var c_user =  req.session.c_user;
    var c_userId =  req.session.c_user.c_id;
    if (type == 1){
        var sql = 'select c.c_interest,c.c_idx,c.c_id,c.de_idx,c.c_interestC,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_interest as c right join cmong_product as p on c.de_idx = p.de_idx and c.c_interestC =1 where c.c_id = ?'
        conn.query(sql,c_userId,function(err,likeList){
            if (err){
                console.log(err)
            } else {
                var sql = 'select * from c_interest where c_id = ? and c_interestC = 1';
                conn.query(sql,c_userId,function(err,c_interest,fields){
                    if (err) {
                        console.log(err)
                    } else {
                        res.render('likepage',{likeList:likeList,c_user:c_user,c_interest:c_interest,type:type});
                    }

                });
            }
        });
    } else if (type == 2){
         var sql = 'select c.c_interest,c.c_idx,c.c_id,c.de_idx,c.c_interestC,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_interest as c right join cmong_product as p on c.de_idx = p.de_idx and c.c_interestC =1 and de_cate_01 = "디자인" where c.c_id = ?'
        conn.query(sql,c_userId,function(err,likeList){
            if (err){
                console.log(err)
            } else {
                var sql = 'select * from c_interest where c_id = ? and c_interestC = 1';
                conn.query(sql,c_userId,function(err,c_interest,fields){
                    if (err) {
                        console.log(err)
                    } else {
                        res.render('likepage',{likeList:likeList,c_user:c_user,c_interest:c_interest,type:type});
                    }

                });
            }
        });
    } else if (type == 3){
         var sql = 'select c.c_interest,c.c_idx,c.c_id,c.de_idx,c.c_interestC,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_interest as c right join cmong_product as p on c.de_idx = p.de_idx and c.c_interestC =1 and de_cate_01 = "it & 프로그래밍" where c.c_id = ?'
        conn.query(sql,c_userId,function(err,likeList){
            if (err){
                console.log(err)
            } else {
                var sql = 'select * from c_interest where c_id = ? and c_interestC = 1';
                conn.query(sql,c_userId,function(err,c_interest,fields){
                    if (err) {
                        console.log(err)
                    } else {
                        res.render('likepage',{likeList:likeList,c_user:c_user,c_interest:c_interest,type:type});
                    }

                });
            }
        });
    } else {
        var sql = 'select c.c_interest,c.c_idx,c.c_id,c.de_idx,c.c_interestC,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_interest as c right join cmong_product as p on c.de_idx = p.de_idx and c.c_interestC =1 where c.c_id = ?'
        conn.query(sql,c_userId,function(err,likeList){
            if (err){
                console.log(err)
            } else {
                var sql = 'select * from c_interest where c_id = ? and c_interestC = 1';
                conn.query(sql,c_userId,function(err,c_interest,fields){
                    if (err) {
                        console.log(err)
                    } else {
                        res.render('likepage',{likeList:likeList,c_user:c_user,c_interest:c_interest,type:type});
                    }

                });
            }
        });
    }
});

app.get('/chargepage',function(req,res){
    var c_user =  req.session.c_user;
    var c_idx =  req.session.c_user.c_idx;
    var sql = 'select * from c_user where c_idx = ?';
    conn.query(sql,c_idx,function(err,c_user,fields){
        if(err){
            console.log(err)
        } else {
            var c_user = c_user[0]
            req.session.c_user = c_user;
            req.session.save(function(){
                res.render('chargepage',{c_user:req.session.c_user})
            })
        }
    });
});
app.get('/charDb',function(req,res){
    var c_idx = req.query.c_idx;
    var chargeMoney = parseInt(req.query.chargeMoney);
    var sql = 'select * from c_user where c_idx = ?'
    conn.query(sql,c_idx,function(err,c_user1,fields){
        if (err){
            console.log(err);
        } else {
            var c_user1 = c_user1[0];
            var dbCash = parseInt(c_user1.c_cash);
            var finalDbCash = chargeMoney + dbCash;
            var sql = 'update c_user set c_cash = ? where c_idx =?'
            conn.query(sql,[finalDbCash,c_idx],function(err,cash){
                if (err){
                    console.log(err);
                } else {
                    var sql = 'select * from c_user where c_idx = ?';
                    conn.query(sql,c_idx,function(err,c_user,fields){
                    if (err){
                        console.log(err)
                    } else {
                        var c_user = c_user[0];
                        req.session.c_user = c_user;
                        req.session.save(function(){
                            res.render('chargepage',{c_user:req.session.c_user})
                        })
                    }
                    })
                }
            })
        }
    })
});

app.get('/userpage',function(req,res){
    var c_user = req.session.c_user;
    var c_id =  req.session.c_user.c_id;
    var sql = 'select * from cmong_manager where buy_user =?'
    conn.query(sql,c_id,function(err,userBuy,fields){
        if (err){
            console.log(err);
        } else {
            var userBuy = userBuy;
            res.render('userpage',{c_user:c_user,userBuy:userBuy});
        }
    })
})
app.get('/sellerpage',function(req,res){
    var c_user =  req.session.c_user;
    var c_idx =  req.session.c_user.c_idx;
    var c_id =  req.session.c_user.c_id;
    var sql = 'select * from cmong_manager where sell_user =?'
    conn.query(sql,c_id,function(err,userSell,fields){
        if (err){
            console.log(err);
        } else {
            var userBuy = userBuy;
            res.render('sellerpage',{c_user:c_user,userSell:userSell});
        }
    })
})
app.get('/type_list',function(req,res){
    res.render('type_list');
})
app.get('/likepage',function(req,res){
    res.render('likepage');
})
app.get('/buyForm',function(req,res){
    var c = req.query.c;
    var d = req.query.d;
    var c_user =  req.session.c_user;
    var count = req.query.count;
    var sql = 'select * from c_user where c_idx =?'
    conn.query(sql,c,function(err,c,fields){
        if (err) {
            console.log(err)
            console.log('유저DB오류')
        } else {
            var resultc = c[0];
            if (err){
                console.log(err)
                console.log('판매물품DB오류')
            } else {
                 var sql = 'select * from cmong_product where de_idx =?'
                 conn.query(sql,d,function(err,d,fields){
                     var resultd = d[0];
                     res.render('buyForm',{resultd:resultd,resultc:resultc,count:count,c_user:req.session.c_user});
                })
            }
        }
    })
})

app.get('/payment',function(req,res){
    var finalMoney = parseInt(req.query.finalMoney);
    var liveSavingM = parseInt(req.query.liveSavingM);
    var cashSaving = parseInt(req.query.cashSaving);
    var cashM = req.query.cashM;
    var SavingM = parseInt(req.query.SavingM);
    var c = req.query.c;
    var d = req.query.d;
    var c_userOrigin =  req.session.c_user;
    var c_user =  req.session.c_user.c_idx;
    var c_userId =  req.session.c_user.c_id;
    var countM = req.query.countM;
    var c_cashM = cashM - finalMoney;
    var c_savingM = (SavingM - cashSaving) + liveSavingM;
    var sql = 'update c_user set c_cash = ?,c_saving = ? where c_idx = ?'
    conn.query(sql,[c_cashM,c_savingM,c_user],function(err,payment,fields){
        if (err) {
            console.log(err)
            console.log('결제오류')
        } else {
            var sql = 'select * from c_user where c_idx =?'
            conn.query(sql,c,function(err,pamentUser,fields){
                if (err){
                   console.log('결제오류 de테이블 검색')
                } else {
                    var pamentUser = pamentUser[0];
                    var sellerM =parseInt(pamentUser.c_cash);
                    var sellerTotalm =  sellerM + finalMoney;
                    console.log(sellerM)
                    console.log(sellerTotalm)
                    var sql = 'update c_user set c_cash = ? where c_idx = ?'
                    conn.query(sql,[sellerTotalm,c],function(err,c_cash,fields){
                        if (err){
                            console.log('결제오류 de테이블 검색');
                        } else {
                            var sql = 'select * from cmong_product where de_idx = ?'
                            conn.query(sql,d,function(err,cmong_product,fields){
                                var cmong_product = cmong_product[0]
                                if (err) {
                                } else {
                                    var de_idx = cmong_product.de_idx;
                                    var c_id = cmong_product.c_id;
                                    var de_tit = cmong_product.de_tit;
                                    var de_cate_01 = cmong_product.de_cate_01;
                                    var de_subtit = cmong_product.de_subtit;
                                    var sql = 'INSERT INTO cmong_manager (buy_user,sell_user,de_idx,de_tit,de_cate_01,de_subtit,b_payCount,b_payTotal,b_date)VALUES(?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)';
                                    conn.query(sql,[c_userId,c_id,de_idx,de_tit,de_cate_01,de_subtit,countM,finalMoney],function(err,c_cash,fields){
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            var sql = 'select * from cmong_product';
                                            conn.query(sql,function(err,cmong_product,fields){
                                                if (err) {
                                                    console.log(err);
                                                    res.status(500).send('No Math cmong_product');
                                                } else {
                                                    var cmong_product = cmong_product;
                                                    var sql = 'select * from c_user where c_idx = ?';
                                                    conn.query(sql,c_user,function(err,c_user,fields){
                                                        if (err){
                                                            console.log(err)
                                                        } else {
                                                            var c_user = c_user[0];
                                                            var sql = 'select * from c_interest where c_id = ? and c_interestC = 1';
                                                            conn.query(sql,c_userId,function(err,c_interest,fields){
                                                                var c_interest = c_interest;
                                                                req.session.c_user = c_user;
                                                                req.session.save(function(){
                                                                    res.render('index',{c_user:req.session.c_user,cmong_product:cmong_product,c_interest:c_interest})
                                                                })
                                                            })

                                                        }
                                                  })
                                                }
                                            });
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
});

app.get('/product_list_view',function(req,res){
    var c = req.query.c;
    var d = req.query.d;
    var c_user =  req.session.c_user;
    console.log(c_user)
    var sql = 'select * from c_user where c_idx =?'
    conn.query(sql,c,function(err,c,fields){
        if (err) {
            console.log(err)
            console.log('유저DB오류')
        } else {
            var resultc = c[0];
            if (err){
                console.log(err)
                console.log('판매물품DB오류')
            } else {
                 var sql = 'select * from cmong_product where de_idx =?'
                 conn.query(sql,d,function(err,d,fields){
                     var resultd = d[0];
                     res.render('product_list_view',{resultd:resultd,resultc:resultc,c_user:c_user});
                })
            }
        }
    })
})

app.post('/ListCheckT',function(req,res){
    var arr = req.body.arr;
    var listText = req.body.listText;
    var arrLenth = arr.length;
    if (arrLenth == 1){
        var sql = 'select c.c_grade,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_user as c right join cmong_product as p on c.c_idx = p.c_idx and p.de_cate_02 = ? where c.c_grade = ?;'
        conn.query(sql,[listText,arr[0]],function(err,cate,fields){
            if (err) {
                console.log(err)
            } else {
                res.send(cate);
            }
        })
    } else if (arrLenth == 2){
        var sql = 'select c.c_grade,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_user as c right join cmong_product as p on c.c_idx = p.c_idx and p.de_cate_02 = ? where c.c_grade = ? OR c.c_grade = ?;'
        conn.query(sql,[listText,arr[0],arr[1]],function(err,cate,fields){
            if (err) {
                console.log(err)
            } else {
                res.send(cate);
            }
        })
    } else if (arrLenth == 3){
        var sql = 'select c.c_grade,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_user as c right join cmong_product as p on c.c_idx = p.c_idx and p.de_cate_02 = ? where c.c_grade = ? OR c.c_grade = ? OR c.c_grade = ?;'
        conn.query(sql,[listText,arr[0],arr[1],arr[2]],function(err,cate,fields){
            if (err) {
                console.log(err)
            } else {
                res.send(cate);
            }
        })
    }  else if (arrLenth == 4){
        var sql = 'select c.c_grade,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_user as c right join cmong_product as p on c.c_idx = p.c_idx and p.de_cate_02 = ? where c.c_grade = ? OR c.c_grade = ? OR c.c_grade = ? OR c.c_grade = ?;'
        conn.query(sql,[listText,arr[0],arr[1],arr[2],arr[3]],function(err,cate,fields){
            if (err) {
                console.log(err)
            } else {
                res.send(cate);
            }
        })
    } else if (arrLenth == 5){
        var sql = 'select c.c_grade,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_user as c right join cmong_product as p on c.c_idx = p.c_idx and p.de_cate_02 = ? where c.c_grade = ? OR c.c_grade = ? OR c.c_grade = ? OR c.c_grade = ? OR c.c_grade = ?;'
        conn.query(sql,[listText,arr[0],arr[1],arr[2],arr[3],arr[4]],function(err,cate,fields){
            if (err) {
                console.log(err)
            } else {
                res.send(cate);
            }
        })
    } else if (arrLenth == 6){
        var sql = 'select c.c_grade,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_user as c right join cmong_product as p on c.c_idx = p.c_idx and p.de_cate_02 = ? where c.c_grade = ? OR c.c_grade = ? OR c.c_grade = ? OR c.c_grade = ? OR c.c_grade = ? OR c.c_grade = ?;'
        conn.query(sql,[listText,arr[0],arr[1],arr[2],arr[3],arr[4],arr[5]],function(err,cate,fields){
            if (err) {
                console.log(err)
            } else {
                res.send(cate);
            }
        })
    } else if (arrLenth == null){
         console.log("fsdfsdfdsfds")
    }
})
app.post('/typeList',function(req,res){
    var cate = req.body.cate;
    var c_user =  req.session.c_user;
    var c_userId =  req.session.c_user.c_id;
    var sql = 'select c.c_grade,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_user as c right join cmong_product as p on c.c_idx = p.c_idx where p.de_cate_02 = ?'
    conn.query(sql,cate,function(err,cate,fields){
        if (err) {
            console.log(err)
        } else {
             res.send(cate);
        }
    })
})

app.post('/typeListCheck',function(req,res){
    var arr = req.body.arr;
    var cate01 = req.body.cate01;
     var arrLenth = arr.length;

    if (arrLenth == 1){
        var sql = 'select c.c_grade,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_user as c right join cmong_product as p on c.c_idx = p.c_idx and p.de_cate_01 = ? where c.c_grade = ?;'
        conn.query(sql,[cate01,arr[0]],function(err,check,fields){
            if (err) {
                console.log(err)
            } else {
                res.send(check);
            }
        })
    } else if (arrLenth == 2){
        var sql = 'select c.c_grade,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_user as c right join cmong_product as p on c.c_idx = p.c_idx and p.de_cate_01 = ? where c.c_grade = ? or c.c_grade = ?;'
        conn.query(sql,[cate01,arr[0],arr[1]],function(err,check,fields){
            if (err) {
                console.log(err)
            } else {
                res.send(check);
            }
        })
    } else if (arrLenth == 3){
        var sql = 'select c.c_grade,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_user as c right join cmong_product as p on c.c_idx = p.c_idx and p.de_cate_01 = ? where c.c_grade = ? or c.c_grade = ? or c.c_grade = ?;'
        conn.query(sql,[cate01,arr[0],arr[1],arr[2]],function(err,check,fields){
            if (err) {
                console.log(err)
            } else {
                res.send(check);
            }
        })
    } else if (arrLenth == 4){
        var sql = 'select c.c_grade,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_user as c right join cmong_product as p on c.c_idx = p.c_idx and p.de_cate_01 = ? where c.c_grade = ? or c.c_grade = ? or c.c_grade = ? or c.c_grade = ?;'
        conn.query(sql,[cate01,arr[0],arr[1],arr[2],arr[3]],function(err,check,fields){
            if (err) {
                console.log(err)
            } else {
                res.send(check);
            }
        })
    } else if (arrLenth == 5){
        var sql = 'select c.c_grade,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_user as c right join cmong_product as p on c.c_idx = p.c_idx and p.de_cate_01 = ? where c.c_grade = ? or c.c_grade = ? or c.c_grade = ? or c.c_grade = ? or c.c_grade = ?;'
        conn.query(sql,[cate01,arr[0],arr[1],arr[2],arr[3],arr[4]],function(err,check,fields){
            if (err) {
                console.log(err)
            } else {
                res.send(check);
            }
        })
    } else if (arrLenth == 6){
        var sql = 'select c.c_grade,p.de_idx,p.c_idx,p.c_id,p.de_tit,p.de_cate_01,p.de_cate_02,p.de_type_01,p.de_type_02,p.de_type_03,p.de_type_04,p.de_subtit,p.de_subtex,p.de_pay,p.de_step_01,p.de_step_02,p.de_step_03,p.de_step_04,p.de_detail_tex,p.de_as,p.de_pro_intro,p.de_interest,p.de_date datetime,p.de_main_img,p.de_sub_img01,p.de_sub_img02,p.de_sub_img03 from c_user as c right join cmong_product as p on c.c_idx = p.c_idx and p.de_cate_01 = ? where c.c_grade = ? or c.c_grade = ? or c.c_grade = ? or c.c_grade = ? or c.c_grade = ? or c.c_grade = ?;'
        conn.query(sql,[cate01,arr[0],arr[1],arr[2],arr[3],arr[4],arr[5]],function(err,check,fields){
            if (err) {
                console.log(err)
            } else {
                res.send(check);
            }
        })
    }
})
app.get('/mypage',function(req,res){
    var c_id = req.session.c_user.c_id;
    console.log(c_id);
    console.log("aaaaaaa")
    var sql = 'select * from c_user where c_id = ?';
    conn.query(sql,c_id,function(err,c_user,fields){
        var c_user = c_user[0]
        req.session.save(function(){
            res.render('mypage',{c_user:c_user})
        });
    });
});
app.post('/mypage',function(req,res){
    var c_id = req.body.c_id;
    var c_name = req.body.c_name;
    var c_phon = req.body.c_phon;
    var c_mail = req.body.c_mail;
    var callTime1 = req.body.callTime1;
    var callTime2 = req.body.callTime2;
    var modifyImg = req.body.modifyImg;
    var callTime = callTime1 + '~' + callTime2;

    console.log(callTime)
    var sql = 'update c_user set c_name=?, c_phon=?,c_mail=?,c_img=?,c_time=? where c_id = ?;'
    conn.query(sql,[c_name,c_phon,c_mail,modifyImg,callTime,c_id],function(err,result){
        if (err) {
            console.log(err)
        } else {
            var sql = 'select * from c_interest where c_id = ? and c_interestC = 1';
            conn.query(sql,c_id,function(err,c_interest,fields){
                if (err){
                    console.log(err)
                } else {
                    var sql = 'select * from cmong_product';
                    conn.query(sql,function(err,cmong_product,fields){
                        if (err) {
                            console.log(err)
                        } else {
                            var sql = 'select * from c_user where c_id = ?';
                            conn.query(sql,c_id,function(err,c_user,fields){
                                if (err){
                                    console.log(err)
                                } else {
                                    var c_user = c_user[0]
                                    req.session.c_user = c_user;
                                    req.session.save(function(){
                                        res.render('index',{c_user: req.session.c_user,cmong_product:cmong_product,c_interest:c_interest})
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    });
})


app.post('/loginIdc',function(req,res){
    var u_id = req.body.u_id;
    var sql = 'select * from c_user where c_id = ?;'
    conn.query(sql,u_id,function(err,result){
        if (err) {
            console.log(err)
            res.render('loginForm');
        } else {
            res.send(result);
        }
    })
})

app.post('/interest',function(req,res){
    var c_idx = req.body.c_idx;
    var c_id = req.body.c_id;
    var d_idx = req.body.d_idx;

    var sql = 'select * from c_interest where c_idx = ? and de_idx =?'
    conn.query(sql,[c_idx,d_idx],function(err,result){
        if (err){
            console.log(err);
        } else {
            var count = Object.keys(result).length;
            if (count == 1){
                var result = result[0];
                var c_interest = result.c_interest;
                var c_interestC = result.c_interestC;
                if (c_interestC == 1){
                    var sql = 'update c_interest set c_interestC = 0 where c_interest = ?'
                    conn.query(sql,c_interest,function(err,result1){
                        if(err) {
                            console.log(err)
                        } else {
                            var sql = 'select * from c_interest where c_idx = ? and de_idx =?'
                            conn.query(sql,[c_idx,d_idx],function(err,booleanResult){
                                var booleanResult = booleanResult[0];
                                var number = booleanResult.c_interestC;
                                if(err){
                                   console.log(err)
                                } else {
                                    res.send(number)
                                }
                            })
                        }
                    })
                } else {
                    var sql = 'update c_interest set c_interestC = 1 where c_interest = ?'
                    conn.query(sql,c_interest,function(err,result2){
                        if(err) {
                            console.log(err)
                        } else {
                            var sql = 'select * from c_interest where c_idx = ? and de_idx =?'
                            conn.query(sql,[c_idx,d_idx],function(err,booleanResult){
                                var booleanResult = booleanResult[0];
                                var number = booleanResult.c_interestC;
                                if(err){
                                   console.log(err)
                                } else {
                                    res.send(number)
                                }
                            })
                        }
                    })
                }
            } else {
                var sql = 'INSERT INTO c_interest (c_idx,c_id,de_idx,c_interestC) VALUES(?,?,?,1);'
                conn.query(sql,[c_idx,c_id,d_idx],function(err,result){
                    if (err) {
                        console.log(err)
                    } else {
                        res.send(result);
                    }
                })
            }
        }
    })
})

app.get('/loginForm',function(req,res){
    res.render('loginForm');
})
app.get('/productStep',function(req,res){
    req.session.save(function(){
     res.render('productStep',{c_user:req.session.c_user})
    });
})
app.get('/formtest',function(req,res){
    res.render('formtest');
})
app.post('/uptest/:test',upload.single('fileName'),function(req,res){
     res.end(req.body.test)
})



app.post('/uploadMain/:id', upload.single('userfile'), function(req, res){
    var c_idx = req.session.c_idx;
    console.log(c_idx);
});
app.post('/uploadSub/:id', upload.single('userfile'), function(req, res){
    console.log(req.file);
    res.send('Uploaded : '+req.file.filename);
    console.log("-------------")
    console.log(req.file.path)
    console.log(req.file.originalname)
});
app.post('/upload', function(req, res){
    var c_idx = req.body.uIdx;
    var c_id = req.body.uNAme;
    var de_tit = req.body.de_tit;
    var de_cate_01 = req.body.de_cate_01;
    var de_cate_02 = req.body.de_cate_02;
    var de_type_01 = req.body.de_type_01;
    var de_type_02 = req.body.de_type_02;
    var de_type_03 = req.body.de_type_03;
    var de_type_04 = req.body.de_type_04;
    var de_subtit = req.body.de_subtit;
    var de_subtex = req.body.de_subtex;
    var de_pay =  req.body.de_pay;
    var de_step_01 =  req.body.de_step_01;
    var de_step_02 =  req.body.de_step_02;
    var de_step_03 =  req.body.de_step_03;
    var de_step_04 =  req.body.de_step_04;
    var de_detail_tex =  req.body.de_detail_tex;
    var de_as =  req.body.de_as;
    var de_pro_intro =  req.body.de_pro_intro;
    var imgMain = req.body.imgMain;
    var imgSub1 = req.body.imgSub1;
    var imgSub2 = req.body.imgSub2;
    var imgSub3 = req.body.imgSub3;

    if (de_step_01 == null){
        de_step_01 = '원본파일 제공안함';
    }

    console.log(de_cate_01)
    console.log(de_cate_02)
    console.log(de_type_01)
    console.log(de_type_02)
    console.log(de_type_03)
    console.log(de_type_04)

    var sql = 'INSERT INTO cmong_product (c_idx,c_id,de_tit,de_cate_01,de_cate_02,de_type_01,de_type_02,de_type_03,de_type_04,de_subtit,de_subtex,de_pay,de_step_01,de_step_02,de_step_03,de_step_04,de_detail_tex,de_as,de_pro_intro,de_interest,de_date,de_main_img,de_sub_img01,de_sub_img02,de_sub_img03,de_payment)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,0,CURRENT_TIMESTAMP,?,?,?,?,0);'
    conn.query(sql,[c_idx,c_id,de_tit,de_cate_01,de_cate_02,de_type_01,de_type_02,de_type_03,de_type_04,de_subtit,de_subtex,de_pay,de_step_01,de_step_02,de_step_03,de_step_04,de_detail_tex,de_as,de_pro_intro,imgMain,imgSub1,imgSub2,imgSub3],function(err,result){
        if (err) {
            console.log(err)
            res.render('productStep');
        } else {
            res.send("성공")
        }
    });
});
app.get('/login',function(req,res){
    res.render('login');
})
app.post('/login',function(req,res){
    var id = req.body.u_id;
    var pw = req.body.u_pw;

    var sql = 'select * from c_user where c_id = ?';
    conn.query(sql,[id],function(err,c_user,fields){
        if (err) {
             console.log(err);
            res.status(500).send('No Math ID');
        } else {
            var c_user = c_user[0];
            if(id === c_user.c_id) {
              return hasher({password:pw, salt:c_user.c_salt}, function(err, pass, salt, hash){
                if(hash === c_user.c_pass){
                    var sql = 'select * from c_interest where c_id = ? and c_interestC = 1';
                    conn.query(sql,[id],function(err,c_interest,fields){
                        if (err) {
                            console.log(err)
                        } else {
                            var sql = 'select * from cmong_product';
                            conn.query(sql,function(err,cmong_product,fields){
                                if (err) {
                                    console.log(err);
                                    res.status(500).send('No Math cmong_product');
                                } else {
                                    var cmong_product = cmong_product;
                                    req.session.c_user = c_user;
                                    req.session.save(function(){
                                    res.render('index',{c_user:req.session.c_user,cmong_product:cmong_product,c_interest:c_interest})
                                  })
                                }
                            });
                        }
                    });
                } else {
                  res.render('login',{c_user:null});
                }
              });
            }
        }
    })
})
app.get('/logout',function(req,res){
    req.session.destroy(function(){
        req.session;
    });
    res.render('login');
})
app.get('/cmong',function(req,res){
    var c_user =  req.session.c_user;
    var c_userId =  req.session.c_user.c_id;
    var sql = 'select * from c_interest where c_id = ? and c_interestC = 1';
    conn.query(sql,c_userId,function(err,c_interest,fields){
        if (err) {
            console.log(err)
        } else {
            var sql = 'select * from cmong_product';
            conn.query(sql,function(err,cmong_product,fields){
                if (err) {
                    console.log(err);
                    res.status(500).send('No Math cmong_product');
                } else {
                    var cmong_product = cmong_product;
                    req.session.c_user = c_user;
                    req.session.save(function(){
                    res.render('index',{c_user:req.session.c_user,cmong_product:cmong_product,c_interest:c_interest})
                  })
                }
            });
        }
    });
});

app.post('/user_insert',function(req,res){
    hasher({password:req.body.u_pw}, function(err, pass, salt, hash){
        var id = req.body.u_id;
        var name = req.body.u_name;
        var pw = hash;
        var salt = salt;
        var phon = req.body.u_phon;
        var email = req.body.u_email;

        var sql = 'INSERT INTO c_user (c_id,c_pass,c_name,c_phon,c_mail,c_grade,c_life,c_img,c_cash,c_saving,c_salt,c_date)  VALUES (?,?,?,?,?,"0","1","user_first_img.jpg",0,0,?,CURRENT_TIMESTAMP);'
        conn.query(sql,[id,pw,name,phon,email,salt],function(err,result){
            if (err) {
                console.log(err)
                res.render('loginForm');
            } else {
                fs.mkdir('./loadUp/'+id, '0777', function(err){ if(err) throw err; console.log('dir writed'); });
                fse.copy('./user_first_img.jpg','./loadUp/'+id+'/user_first_img.jpg')
                .then(()=> console.log('sucess!'))
                .catch(err => console.error(err))
                res.render('login');
            }
        })
    });
});

app.get("/img",function(req,res){
    fse.copy('./user_first_img.jpg','./user_first_img1.jpg')
    .then(()=> console.log('sucess!'))
    .catch(err => console.error(err))
})

app.get('/chat',function(req,res){
    res.render('prosend');
});

app.use(cors());

var server = app.listen(80, function(){
  console.log('Connected, 80 port!');
})


var io = socketio.listen(server);
console.log('socketio 요청을 받아들일준비가 되었습니다.')

var login_ids = {}

io.sockets.on('connection',function(socket){
    console.log('connection info -->' + JSON.stringify(socket.request.connection._peername));
    socket.remoteAddress = socket.request.connection._peername.address;
	socket.remotePort = socket.request.connection._peername.port;

    socket.on('login',function(input){
        console.log('login 받음 ->' +JSON.stringify(input));

        login_ids[input.id] = socket.id;
        socket.login_id = input.id;

        sendResponse(socket,'login',200,'OK');

    });

    socket.on('message',function(message){
        console.log('message 받음 -> ' + JSON.stringify(message));

        if(message.recepient == 'ALL') {
            console.log('모든 클라이언트에세 메세지 전송');
            io.sockets.emit('message',message);
        } else {
            if(login_ids[message.recepient]) {
                io.sockets.connected[login_ids[message.recepient]].emit('message',message);
                sendResponse(socket,'message',200,'OK')
            } else {
                sendResponse(socket,'message',400,'상대방 ID를 찾을수 없습니다.')
            }
        }

    })

})

// 응답 메시지 전송 메소드
function sendResponse(socket, command, code, message) {
	var output = {
        command: command,
        code: code,
        message: message
    } ;
	socket.emit('response', output);
}
