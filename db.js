
const pg = require('pg');

const client = new pg.Client('postgres://localhost/acme_reservation_planner');


//GET /api/customers
const getCustomers = async()=>{
    const response = await client.query('SELECT * FROM customer ORDER BY id ASC');
    return response.rows;
}

//GET /api/restaurants
const getRestaurants = async()=>{
    const response = await client.query('SELECT * FROM restaurant ORDER BY id ASC');
    return response.rows;
}

//GET /api/reservations
const getReservations = async()=>{
    const response = await client.query('SELECT * FROM reservation ORDER BY id ASC');
    return response.rows;
}

//POST /api/customers/:id/reservations
const addReservation = async (body) => {
    try {
        const query = `
            INSERT INTO reservation(date, party_count, restaurant_id, customer_id)
            VALUES(now(), $1, $2, $3)
            RETURNING *;
        `;
        const values = [body.party_count, body.restaurant_id, body.customer_id];
        const response = await client.query(query, values);
        return response.rows[0];
    } catch (err) {
        console.error(err);
        throw new Error("Failed to create reservation");
    }
};
  

//DELETE /api/customers/:customer_id/reservations/:id
const deleteReservation = async (id) => {
    await client.query(`DELETE from reservation WHERE id = $1`, [Number(id)]);
    return {
      id: id,
    };
    };


//GET single reservation by id
const getSingleReservationByCustomerId = async (params_id) => {
    const response = await client.query(`SELECT * FROM customer WHERE id = $1`, [
        params_id,
    ]);
    const { id, name } = response.rows[0];
    const res_response = await client.query(
        `SELECT * FROM reservation WHERE customer_id = $1 LIMIT 1`,
        [params_id]
    );
    return {
        id,
        name,
        reservation: res_response.rows[0], 
    };
};

//GET single reservations by restaurant id
const getSingleReservationByRestaurantId = async (params_id) => {
    const response = await client.query(
      `SELECT * FROM restaurant WHERE id = $1`,
      [params_id]
    );
    const { id, name } = response.rows[0];
    const res_response = await client.query(
      `SELECT * FROM reservation WHERE restaurant_id = $1 LIMIT 1`,
      [params_id]
    );
    return {
      id,
      name,
      reservation: res_response.rows[0],
    };
  };

  


module.exports ={
    getCustomers,
    getRestaurants,
    getReservations,
    addReservation,
    deleteReservation,
    getSingleReservationByCustomerId,
    getSingleReservationByRestaurantId,
    client
}  ;  



