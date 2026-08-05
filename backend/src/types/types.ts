const TYPES = {
  UserRepository: Symbol.for("UserRepository"),
  AuthService: Symbol.for("AuthService"),
  AuthController: Symbol.for("AuthController"),
  UserService: Symbol.for("UserService"),
  UserController: Symbol.for("UserController"),
  ProjectRepository: Symbol.for("ProjectRepository"),
  ProjectService: Symbol.for("ProjectService"),
  ProjectController: Symbol.for("ProjectController"),
  TaskRepository: Symbol.for("TaskRepository"),
  TaskService: Symbol.for("TaskService"),
  TaskController: Symbol.for("TaskController"),
};

export default TYPES;