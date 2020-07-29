
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('name', 128).notNullable();
        tbl.string('username', 128).notNullable().unique();
        tbl.string('password', 128).notNullable();
        tbl.boolean('is_operator').defaultTo(false);
    })
    .createTable('trucks', tbl => {
        tbl.increments();
        tbl.string('name', 128).notNullable();
        tbl.string('cuisine_type', 128).notNullable();
        tbl.string('truck_image', 1000).notNullable();
        tbl.integer('operator_id').notNullable().references('users.id');
    })
    .createTable('menu_items', tbl => {
        tbl.increments();
        tbl.string('item_name', 128).notNullable();
        tbl.string('item_description', 128).notNullable();
        tbl.string('item_photo', 1000).notNullable();
        tbl.integer('item_price').notNullable();
        tbl.integer('truck_id').notNullable().references('trucks.id');
    })
    .createTable('favorites', tbl => {
        tbl.increments();
        tbl.integer('truck_id').references('trucks.id');
        tbl.integer('diner_id').references('users.id');
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('favorites')
    .dropTableIfExists('menu_items')
    .dropTableIfExists('trucks')
    .dropTableIfExists('users');
};
