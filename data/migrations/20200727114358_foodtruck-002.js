
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('name', 128).notNullable();
        tbl.string('username', 128).notNullable().unique();
        tbl.string('password', 128).notNullable();
        tbl.enu('userType', ['operator', 'diner']).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
