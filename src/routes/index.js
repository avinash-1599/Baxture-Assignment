const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.controller");

router.post("/api/users", (req, res) => userController.createUser(req, res));
router.get("/api/users", (req, res) => userController.getAllUsers(req, res));
router.get("/api/users/:userId", (req, res) => userController.getUserById(req, res));
router.put("/api/users/:userId", (req, res) => userController.updateUser(req, res));
router.delete("/api/users/:userId", (req, res) => userController.deleteUser(req, res));

module.exports = router;