'use strict';

module.exports = function(app) {
    var FFS_List = require('../controllers/FFSystemController');

    app.route('/api/folder/:path([0-9a-zA-Z\/\%\.\-]+)').get(FFS_List.list_folder);
    app.route('/api/file/:path([0-9a-zA-Z\/\%\.\-]+)')
        .get(FFS_List.read_file)
        .post(FFS_List.write_file);
}