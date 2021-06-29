
exports.up = function(knex) {
    return knex.schema.table('posts', table => {
        table.timestamp('edited_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
    return knex.schema.table('posts', table => {
        table.dropColumn('edited_at');
    })
};
