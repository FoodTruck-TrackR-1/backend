const db = require("../../data/dbConfig");

module.exports = {
    addTruck,
    findTrucks,
    findTruck,
    updateTruck,
    removeTruck,
    addMenuItem,
    findItem,
    findItems,
    updateItem,
    removeItem
};

//trucks
async function addTruck(truck) {
    try {
        const [id] = await db("trucks").insert(truck, "id");
    
        return findTruck(id);
      } catch (error) {
        throw error;
      }
}

function findTrucks(id) {
    return db('trucks')
    .join('users', 'users.id', 'trucks.operator_id')
    .select('trucks.*')
    .where('trucks.operator_id', id)
}
function findTruck(id) {
    return db('trucks').select('trucks.*').where({ id }).first();
}

function updateTruck(changes, id) {
    return db('trucks').where({ id }).update(changes);
}
function removeTruck(id) {
    return db('trucks').where({ id }).del();
}


// menus
async function addMenuItem(item) {
    try {
        const [id] = await db("menu_items").insert(item, "id");
    
        return findItem(id);
      } catch (error) {
        throw error;
      }
}

function findItems(truckID) {
    return db('menu_items')
    .join('trucks', 'trucks.id', 'menu_items.truck_id')
    .select('menu_items.*')
    .where('menu_items.truck_id', truckID)
}

function findItem(id) {
    return db('menu_items').select('menu_items.*').where({ id }).first();
}

function updateItem(changes, id) {
    return db('menu_items').where({ id }).update(changes);
}

function removeItem(id) {
    return db('menu_items').where({ id }).del();
}