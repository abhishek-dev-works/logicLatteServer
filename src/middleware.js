const userController = require("./controllers/userControllers");
const skillsController = require("./controllers/skillsControllers");
const postsController = require("./controllers/postsControllers");
const friendsController = require("./controllers/friendsControllers");

exports.ApiMiddleWare = (app) => {
  // User routes
  app.get("/users", userController.getAllUsers);
  app.get("/users/:id", userController.getUserById);
  app.post("/users", userController.createUser);
  app.put("/users/:id", userController.updateUser);
  app.delete("/users/:id", userController.deleteUser);

  //Skills routes
  app.post("/skills", skillsController.addSkill);
  app.delete("/skills/:id", skillsController.deleteSkill);
  app.get("/skills/:id", skillsController.getSkillsByUserId);

  //Posts routes
  app.post("/post", postsController.createPost);
  app.put("/post/:id", postsController.updatePost);
  app.delete("/post/:id", postsController.deletePost);
  app.get("post/user/:id", postsController.getPostsbyUserId);

  //Friends Routes
  app.post("/friends/add", friendsController.addFriend);
  app.post("/friends/remove", friendsController.removeFriend);
  app.get("/friends/:user_id", friendsController.getFriendsByUserId);
};
