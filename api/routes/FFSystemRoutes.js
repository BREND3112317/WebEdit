'use strict';

var name_regex = "0-9a-zA-Z\-\=\_";

module.exports = function(app) {
    var FFS = require('../controllers/FFSystemController');
    app.route(`/api/path/:path([${name_regex}]+)`).get(FFS.path_info);
    app.route(`/api/folder/:path([${name_regex}]+)`).get(FFS.folder_list);
    app.route(`/api/file/:path([${name_regex}]+)`)
        .get(FFS.read_file)
        .post(FFS.write_file);
}