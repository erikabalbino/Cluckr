
exports.up = function(knex, Promise) {

    return knex.schema.createTable("cluckrs", table => {
        table.increments("id");
        table.string("username");
        table.text("content");
        table.string("image_Url");
        table.timestamp("createdAt").default(knex.fn.now());
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable("cluckrs");
};
