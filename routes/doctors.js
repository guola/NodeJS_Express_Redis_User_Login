/**
 * Created with JetBrains WebStorm.
 * User: guola
 * Date: 12-9-28
 * Time: 上午10:38
 * To change this template use File | Settings | File Templates.
 */

var db = require('../db');
var doctors = db.get('doctors');
doctors.property('id', {identifier: true});
doctors.property('username', {unique: true});
doctors.property('email', {index: true, email: true});
doctors.property('password', {});




exports.index = function (req, res, next) {
    res.render('doctors', { title: '医生注册' });
};


exports.list = function (req, res, next) {
    doctors.list({
        direction: 'desc'
    }, function(err, users) {
        console.log(users);
        if (!err) {
            return res.send(users);
        } else {
            return console.log(err);
        }
    });

};

exports.add=function (req, res,next){
    console.log("POST: ");
    console.log(req.body);
    doctors.create(
        {username: req.body.username, email: req.body.email,password:req.body.password},
        function(err, user){
            if(user)
            {
                console.log({ret:true,msg:'恭喜您成功注册',data:user});
                return res.send({ret:true,msg:'恭喜您成功注册',data:user});
            }
            else
            {
                console.log({ret:false,msg:'请修改医生昵称',data:err});
                return res.send({ret:false,msg:'请修改医生昵称',data:err});
            }
        });
};

exports.doctor=function (req,res,next)
{
    doctors.get({id:req.params.id}
    , function(err, user) {
            if(!err)
            {
                console.log(user);
                return res.send(user);
            }
        else
            {
            return console.log(err);
            }

        });

    return;
};

exports.update=function (req, res,next){
    doctors.update({
        id:req.params.id,
        username: req.params.username,
        email: req.params.email,
        password:req.params.password
    }, function(err, user) {
        return console.log(user);
        if (!err) {
            console.log("updated");
        } else {
            console.log(err);
        }
        return res.send(user);

    });
};

exports.delete=function (req,res,next){
    doctors.remove(
        {
            id: req.params.id
        }
    , function(err, user) {
        if (!err) {
            console.log("removed");
            return res.send('');
        } else {
            console.log(err);
        }
        return console.log(user);
    });

};

exports.login=function (req,res,next)
{
    doctors.get({username:req.body.username, password:req.body.password}
        , function(err, user) {
            if(!err)
            {
                console.log(user);
                if(user)
                {
                  console.log({ret:true,msg:'成功登陆',data:user});
                  return res.send({ret:true,msg:'成功登陆',data:user});

                }
                else
                {
                    console.log({ret:false,msg:'请检查用户名和密码'});
                    return res.send({ret:false,msg:'请检查用户名和密码'});
                }
            }
        });
};

exports.usernameIsExist=function (req,res,next)
{
    doctors.get({username:req.body.username}
        , function(err, user) {
            if(!err)
            {
                console.log(user);
                if(user)
                {
                    console.log({ret:true,msg:'用户名已经存在，请修改用户名！',data:user});
                    return res.send({ret:true,msg:'用户名已经存在，请修改用户名！',data:user});

                }
                else
                {
                    console.log({ret:false,msg:'可以使用此用户名称'});
                    return res.send({ret:false,msg:'可以使用此用户名称'});
                }
            }
        });


}
