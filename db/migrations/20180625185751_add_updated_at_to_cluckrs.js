
exports.up = function(knex, Promise) {
    return knex.schema.table('cluckrs', table => {
        table.timestamp("updatedAt").default(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('cluckrs', table => {
        table.dropColumn('updatedAt');
    });
};


