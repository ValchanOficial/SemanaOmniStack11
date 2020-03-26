exports.up = function(knex) {
    // npx knex migrate:make create_ongs
    // npx knex migrate:latest
    return knex.schema.createTable('ongs', (table) => {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
    });
};

exports.down = function(knex) {
    // npx knex migrate:rollback
    return knex.schema.dropTable('ongs');
};

// npx knex migrate:status - lista migrations