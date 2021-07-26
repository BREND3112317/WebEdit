'use strict';

const fs = require('fs')
const path = require('path')



exports.list_folder = function(req, res) {
    // console.log("[list_folder] echo: req = ", req)
    var dir = decodeURIComponent(req.params.path);
    var data = {"dirents": []};
    fs.readdir(dir, { withFileTypes: true }, function(err, files){
        if (err) { // todo: 可引用 fs.stat or fs.access 來判別錯誤方向 http://nodejs.cn/api/fs.html#fs_fs_stat_path_options_callback
            res.json(
                {
                    "status": "error",
                    "response": {
                        "err": err
                    }
                }
            )
            return ;
        }
        files.forEach( function (file) {
            // console.log(file);
            var file_class = {};
            file_class.name = file.name;
            file_class.isFolder = file.isDirectory();
            data.dirents.push(file_class);
        });
        res.json(data)
    });
}

// exports.list_folder = function(req, res) {
//     res.json(req.params)
//     console.log("[list_folder] echo: req = ", req)
//     var data = {"dirents": []};
//     opendir_List(decodeURIComponent(req.params.path), function (dir) {
//         for (const dirent of dir) {
//             data.dirents.push(dirent.name);
//         }
//     })
//     // res.send()
//     // console.log("[list_folder] echo: req.params Decode = ", decodeURIComponent(req.params.path))
//     async function opendir_List(path, callback) {
//         const dir = fs.opendirSync(path);
//         callback(dir);
//     }
// }