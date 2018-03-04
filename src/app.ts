import express from "express";
import { UserService } from "./models/users"
import bodyParser from "body-parser";
import { lokijsService } from './persistence/LokiJS/lokijsService';
import { IPersistence } from "./persistence/persistence";

class App {
    
    public express: any;
    private userService: UserService;
  
    constructor () {

      var persistenceService = new lokijsService();
      this.userService = new UserService(persistenceService.load('user'));

      this.express = express();
      this.express.use(bodyParser.json());
      this.express.use(bodyParser.urlencoded({ extended: true }));
      this.mountRoutes()
    }
  
    private mountRoutes (): void {
      const router = express.Router()
      router.get('/', (req, res) => {
        res.json({
          message: 'Hello HX!'
        })
      })
      // all
      router.get('/user', this.userService.getAll)
      // One
      router.get('/user/:id', this.userService.get)

      router.post('/user', this.userService.create)
 
      router.put('/user/:id', this.userService.update )
  
      router.delete('/user/:id', this.userService.delete)
      this.express.use('/', router)
    }
  }

  // router.delete('/user/:id', (req, res) => {
  //   res.json({
  //     message: this.userService.delete(req.params.id)
  //   })
  // })
  
  export default new App().express