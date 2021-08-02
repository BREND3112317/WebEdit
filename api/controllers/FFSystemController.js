'use strict';

const fs = require('fs')
const path = require('path')
const Base64 = require('js-base64')
const Buffer = require('buffer');

exports.path_info = function(req, res) {
    var _path = path.resolve(api_url_decode(req.params.path));
    var data = {"parse": {}};
    data.parse = path.parse(_path);
    send(res, data, 0);
}

exports.folder_list = function(req, res) {
    var dir = path.resolve(api_url_decode(req.params.path));
    var data = {"dirents": [], "parse": {}};
    fs.readdir(dir, { withFileTypes: true }, function(err, files){
        if (err) { // todo: 可引用 fs.stat or fs.access 來判別錯誤方向 http://nodejs.cn/api/fs.html#fs_fs_stat_path_options_callback
            send(res, {"err": err});
            return ;
        }
        files.forEach( function (file) {
            var file_class = {};
            file_class.name = file.name;
            file_class.isFolder = file.isDirectory();
            data.dirents.push(file_class);
        });
        data.parse = path.parse(dir);
        send(res, data, 0);
    });
}

exports.read_file = function (req, res) {
    var file = path.resolve(api_url_decode(req.params.path));
    var pre_data = {"text": "", parse: {}}
    fs.readFile(file, function (err, data) {
        if(err) {
            send(res, {"err": err});
            return ;
        }
        pre_data.text = data.toString()
        pre_data.parse = path.parse(file);
        send(res, pre_data, 0);
    });
}

exports.write_file = function(req, res) {
    var file = path.resolve(api_url_decode(req.params.path));
    fs.writeFile(file, req.body.content, function (err) {
        if (err)
            console.log(err);
        else
            console.log('Write operation complete.');
    });
    send(res, {"path": file, "content": req.body}, 0);
}

function send(res, data = {}, statusCode = -1) {
    console.log(`[System] [Send Json] `, ` [code: ${statusCode}]: `, data);
    var json_data = {}
    json_data.data = data;
    json_data.code = statusCode;
    if(statusCode >= 0) {
        json_data.status = "success";
    } else {
        json_data.status = "failed";
    }
    res.json(json_data);
}

function api_url_decode(url) {
    return Base64.decode(url);
}