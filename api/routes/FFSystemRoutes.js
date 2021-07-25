'use strict';

module.exports = function(app) {
    var FFS_List = require('../controllers/FFSystemController');

    app.route('/api/folder/:path([0-9a-zA-Z\/\%\.]+)').get(FFS_List.list_folder);
}