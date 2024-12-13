const config = require('../configs/db');

let mysql = require('mysql');
let pool = mysql.createPool(config);

module.exports = {
    getTodo(req, res) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM todo;', function (error, results) {
                if (error) throw error;

                // Check if results contains any data
                if (results.length > 0) {
                    res.render('todo', {
                        url: 'http://localhost:3030/',
                        todos: results // Pass the todos data to the view
                    });
                } else {
                    res.render('todo', {
                        url: 'http://localhost:3030/',
                        todos: [] // Pass an empty array if no data
                    });
                }
            });
            connection.release();
        });
    },
    formTodo(req, res) {
        res.render("addTodo", {
            url: 'http://localhost:3030/',
        });
    },
    saveTodo(req, res) {
        let { nama_kegiatan } = req.body;
        console.log("Received data:", req.body); // Tambahkan ini untuk debugging
        if (nama_kegiatan) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(
                    `INSERT INTO todo (nama_kegiatan) VALUES (?);`,
                    [nama_kegiatan],
                    function (error, results) {
                        if (error) {
                            console.error(error);
                            res.send('Gagal menyimpan data');
                            return;
                        }
                        req.flash('color', 'success');
                        req.flash('status', 'Yes..');
                        req.flash('message', 'Data berhasil disimpan');
                        res.redirect('/todo');
                    }
                );
                connection.release();
            });
        } else {
            res.send('Data tidak lengkap');
        }
    },
    editTodo(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('SELECT * FROM todo WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                if (results.length > 0) {
                    res.render('editTodo', {
                        url: 'http://localhost:3030/',
                        todo: results[0]
                    });
                } else {
                    res.redirect('/todo');
                }
            });
            connection.release();
        });
    },
    updateTodo(req, res) {
        const { id } = req.params;
        const { nama_kegiatan } = req.body;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(
                'UPDATE todo SET nama_kegiatan = ? WHERE id = ?',
                [nama_kegiatan, id],
                function (error, results) {
                    if (error) throw error;
                    res.redirect('/todo');
                }
            );
            connection.release();
        });
    },
    deleteTodo(req, res) {
        const { id } = req.params;
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query('DELETE FROM todo WHERE id = ?', [id], function (error, results) {
                if (error) throw error;
                res.redirect('/todo');
            });
            connection.release();
        });
    },
};
