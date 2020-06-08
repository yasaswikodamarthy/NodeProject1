exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('user_table', function(table) {
        table.increments('id')
        table.string('username').notNullable()
        table.string('password').notNullable()
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('user_table')
}