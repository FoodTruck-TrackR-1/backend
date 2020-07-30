const db = require("../../data/dbConfig");

module.exports = {
   addFavorite,
   getFavorites,
   removeFavorite,
   findTruck,
   findMenu,
   findTrucks,
};
// favorites list
async function addFavorite(favorite) {
    
    try {
        const [id] = await db("favorites").insert(favorite, "id");
    
        return getFavorite(id);
      } catch (error) {
        throw error;
      }
}
function getFavorite(id) {
    return db('favorites').select('favorites.*').where({ id }).first();
}
async function getFavorites(id) {
    try {
        const favorites = await db('favorites')
        .join('trucks', 'trucks.id', 'favorites.truck_id')
        .select('favorites.id', 'favorites.truck_id', 'favorites.diner_id', 'trucks.name', 'trucks.cuisine_type', 'trucks.truck_image', 'trucks.operator_id',)
        .where('favorites.diner_id', id)

        return favorites;
    } catch (error) {
        throw error;
    }
}
function removeFavorite(id) {
   return db('favorites').where({ id }).del();
}

// truck and menu search
function findTrucks() {
    return db('trucks').select('trucks.*')
}
function findTruck(id) {
    return db('trucks').select('trucks.*').where({ id }).first();
}
function findMenu(truckID) {
    return db('menu_items')
        .join('trucks', 'trucks.id', 'menu_items.truck_id')
        .select('menu_items.*')
        .where('menu_items.truck_id', truckID)
}