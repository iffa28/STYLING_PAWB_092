const config = require('../configs/db');
let mysql      = require('mysql');
let pool       = mysql.createPool(config);

pool.on('error',(err)=> {
    console.error(err);
});

module.exports ={
    formRegister(req,res){
        res.render("register",{
            url : 'http://localhost:3030/',
        });
    },
    saveRegister(req,res){
        let username = req.body.username;
        let password = req.body.pass;
        if (username && password) {
            pool.getConnection(function(err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO users (username,password) VALUES (?,SHA2(?,512));`
                , [username, password],function (error, results) {
                    if (error) throw error; 
                    req.flash('color', 'success');
                    req.flash('status', 'Yes..');
                    req.flash('message', 'Registrasi berhasil');
                    res.redirect('/login');
                });
                connection.release();
            })
        } else {
            res.redirect('/login');
            res.end();
        }
    }
}