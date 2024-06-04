const express = require('express');
const {     
    getCustomers,
    getRestaurants,
    getReservations,
    addReservation,
    deleteReservation,
    getSingleReservationByCustomerId,
    getSingleReservationByRestaurantId,
    client 
} = require("./db");

const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

//working route
router.get('/reservations/customers', async (req, res, next) => {
    try {
        const customers = await getCustomers();
        res.json(customers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err});
    }
});

//working route
router.get('/reservations/restaurants', async (req, res, next)=> {
    try {
        const restaurants = await getRestaurants();
        res.json(restaurants);
        } catch (err) {
            console.error(err);
            res.status(500).json({ err });
            }
});

//working route
router.get('/reservations', async (req, res, next)=> {
    try {
        const reservations = await getReservations();
        res.json(reservations);
        } catch (err) {
            console.error(err);
            res.status(500).json({ err });
            }
});

//working route
router.post("/reservations", async (req, res, next) => {
    try {
      res.send(await addReservation(req.body));
    } catch (err) {
      next(err);
    }
  });

//working route
router.delete("/reservations/:id", async (req, res, next) => {
    try {
      res.send(await deleteReservation(req.params.id));
    } catch (err) {
      next(err);
    }
  });
 

//working route
router.get('/reservations/customers/:id', async (req, res, next)=> {
    try {
        const reservations = await getSingleReservationByCustomerId(req.params.id);
        res.json(reservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

//working route
router.get('/reservations/restaurants/:id', async (req, res, next)=> {
    try {
        const reservations = await getSingleReservationByRestaurantId(req.params.id);
        res.json(reservations);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

//post customer
router.post("/reservations/customers", async (req, res, next) => {
    try {
      res.send(await (req.body));
    } catch (err) {
      next(err);
    }
  });

//post restaurant
router.post("/reservations/restaurants", async (req, res, next) => {
    try {
      res.send(await (req.body));
    } catch (err) {
      next(err);
    }
  });

app.use('/api', router);
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "server" });
});

client.connect()
    .then(() => {
        app.listen(3000, () => {
            console.log("App 3000");
        });
    })
    .catch(err => {
        console.error(err);
    });