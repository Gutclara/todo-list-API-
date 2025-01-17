"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deleteTodo = exports.putEditToDo = exports.postNewToDo = exports.getAllToDos = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var utils_1 = require("./utils");
var ToDos_1 = require("./entities/ToDos");
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, user_name, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.user_name)
                    throw new utils_1.Exception("Please provide an user_name");
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                return [4 /*yield*/, userRepo.findOne({ where: { user_name: req.body.user_name } })];
            case 2:
                user_name = _a.sent();
                if (user_name)
                    throw new utils_1.Exception("User_name already exists");
                newUser = typeorm_1.getRepository(Users_1.Users).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(newUser)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var getAllToDos = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(ToDos_1.ToDos).find({ where: { userid: req.params.userid } })];
            case 1:
                todos = _a.sent();
                return [2 /*return*/, res.json(todos)];
        }
    });
}); };
exports.getAllToDos = getAllToDos;
var postNewToDo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newToDo, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.label)
                    throw new utils_1.Exception("Please put your task here (label)"); //estos if frenan en caso de que no esten completos los campos
                if (!req.body.done)
                    throw new utils_1.Exception("Please enter done or not (done)");
                if (!req.body.userid)
                    throw new utils_1.Exception("Please enter your id (userid)");
                newToDo = new ToDos_1.ToDos() //creo una variable con let porque se modifica, le ponemos nueva tarea y se iguala con ese new ToDos que es una nueva tabla.
                ;
                newToDo.label = req.body.label; //esta nueva tabla tiene atributos label, done y userid. Label esta vacio y se iguala a la solicitud 
                newToDo.done = req.body.done;
                newToDo.userid = req.body.userid;
                return [4 /*yield*/, typeorm_1.getRepository(ToDos_1.ToDos).save(newToDo)
                    //await es que espera a tener todo lo que esta a su derecha pronto
                    //getRepository es un metodo para obtener tablas(la que cree es ToDos)
                    //save es un metodo que guarda la tabla nueva
                    //entonces results obtienen todas las tablas de todos -los repositorios- y le agrega -guarda- la nueva tabla
                ];
            case 1:
                results = _a.sent();
                //await es que espera a tener todo lo que esta a su derecha pronto
                //getRepository es un metodo para obtener tablas(la que cree es ToDos)
                //save es un metodo que guarda la tabla nueva
                //entonces results obtienen todas las tablas de todos -los repositorios- y le agrega -guarda- la nueva tabla
                return [2 /*return*/, res.json(newToDo)];
        }
    });
}); };
exports.postNewToDo = postNewToDo;
var putEditToDo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var editTodo, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.label)
                    throw new utils_1.Exception("Please put your task here (label)");
                if (!req.body.done)
                    throw new utils_1.Exception("Please enter done or not (done)");
                if (!req.params.todoid)
                    throw new utils_1.Exception("Please enter your id (userid)");
                return [4 /*yield*/, typeorm_1.getRepository(ToDos_1.ToDos).findOne({ where: { id: req.params.todoid } })];
            case 1:
                editTodo = _a.sent();
                if (!editTodo)
                    throw new utils_1.Exception("This tasks doesnt exist"); //se fija si el campo de tarea esta vacio. si esta vacio no hay nada qu editar
                editTodo.label = req.body.label;
                editTodo.done = req.body.done;
                return [4 /*yield*/, typeorm_1.getRepository(ToDos_1.ToDos).save(editTodo)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(editTodo)];
        }
    });
}); };
exports.putEditToDo = putEditToDo;
var deleteTodo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteTodo, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(ToDos_1.ToDos).find({ where: { id: req.params.todoid } })];
            case 1:
                deleteTodo = _a.sent();
                if (!deleteTodo)
                    throw new utils_1.Exception("nothing to delete");
                return [4 /*yield*/, typeorm_1.getRepository(ToDos_1.ToDos)["delete"](req.params.todoid)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.json(result)];
        }
    });
}); };
exports.deleteTodo = deleteTodo;
