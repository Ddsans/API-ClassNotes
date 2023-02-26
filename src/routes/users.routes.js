const {Router} = require("express");
const multer = require("multer");
const uploadConfig = require ("../configs/Upload")

const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated =  require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER)

// function myMiddleware(req, res, next) {
//   console.log("Você passou pelo Middleware!");
//   if(!req.body.isAdmin) {
//     return res.json({ message: "user unauthourizade"})
//   }

//   next();
// }


const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)


module.exports = usersRoutes;



// //Route params
// app.get("/message/:id/:user", (req, res) => {
//   const { id, User} = req.params;
//   res.send(`Id da mensagem: ${id}. Para o usuario: ${user}.`);
// })

// //Query params
// app.get("/users", (req, res) => {
//   const{page, limit} = req.query;

//   res.send(`Página: ${page}. Mostrar: ${limit}`)
// })
// //localhost:3333/users?page=5&limit=10

