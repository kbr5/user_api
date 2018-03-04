import { Persistence, IPersistence } from '../persistence/persistence';
import { Request, Response, NextFunction } from "express";
import validator from 'validator';

export class UserService {

    public persistence;
    public validator: IValidatorStatic = validator;

    constructor(storageType: IPersistence) {
        this.persistence = storageType;
    }

    create = (req: Request, res: Response) : void => {
        var user = new UserBuilder();
        Object.keys(req.body).forEach(function(key) {
            switch(key) {
                case 'forename':
                    user.setForename(req.body[key]);
                    break
                case 'surname':
                    user.setSurname(req.body[key]);
                    break
                case 'email':
                    if(validator.isEmail(req.body[key])) {
                        user.setEmail(req.body[key]);   
                    } else {
                        res.status(400).json({success: false, user: 'Email address not valid'});
                    }
                    break
                default:
                    break;
            }
        });

        var dataRequest = this.persistence.create(user.build());
        if(dataRequest.success) {
            res.json({success: dataRequest.success, user: user});
        } else {
            res.status(500).json({success: dataRequest.success, error: dataRequest.error });
        }
    }

    get = (req: Request, res: Response) : void => {
        var dataRequest = this.persistence.read(req.params.id);
        if(dataRequest.success) {
            res.json({success: dataRequest.success, user: dataRequest.data});
        } else {
            res.status(500).json({success: dataRequest.success, error: dataRequest.error});
        }
    }

    getAll = (req: Request, res: Response) : void => {
        var userList : User[] = new Array<User>();
        var dataRequest = this.persistence.readAll();
        if(dataRequest.success) {
            dataRequest.data.forEach(user => {
                userList.push(user)
            });
            res.json({success: dataRequest.success, users: userList})
        } else {
            res.status(500).json({success: dataRequest.success, error: dataRequest.error});
        }
    }

    update = (req: Request, res: Response) : void => {

        // Get user
        var existingUserDataRequest = this.persistence.read(req.params.id);

        if (!existingUserDataRequest.success) {
            res.json({success: false, error: 'User could not be found!'});
        }

        var userData = existingUserDataRequest.data;

        // Update user values 
        Object.keys(req.body).forEach(function(key) {
            switch(key) {
                case 'forename':
                    if(!req.body[key]) break;
                    userData.forename =  req.body[key];
                    break
                case 'surname':
                    if(!req.body[key]) break;
                    userData.surname = req.body[key];
                    break
                case 'email':
                    if(!req.body[key]) break;
                    if(validator.isEmail(req.body[key])) {
                        userData.surname = req.body[key];   
                    } else {
                        res.status(400).json({success: false, user: 'Email address not valid'});
                    }
                    break
                default:
                    break;
            }
        });

        var dataRequest = this.persistence.update(req.params.id, userData);
        if(dataRequest.success) {
            res.json({success: dataRequest.success, user: userData});
        } else {
            res.status(500).json({success: dataRequest.success, error: dataRequest.error});
        }
    }

    delete = (req: Request, res: Response) : void => {
        var dataRequest = this.persistence.delete(req.params.id);
        if(dataRequest.success) {
            res.json({success: dataRequest.success});
        } else {
            res.status(500).json({success: dataRequest.success, error: dataRequest.error});
        }
    }

}

export class User {
    public id?: number;
    public email?: string;
    public forename?: string;
    public surname?: string;
}

export interface IUserBuilder {
    setId(id: number) : void
    setEmail(email: string) : void;
    setForename(forename: string) : void;
    setSurname(surname: string) : void;
    build() : User;
}

export class UserBuilder implements IUserBuilder {
    private _user: User;

    constructor() {
        this._user = new User();
    }

    public setId(id: number) {
        this._user.id = id;
    }
    
    public setEmail(email: string) {
        this._user.email = email;
    }

    public setForename(forename: string) {
        this._user.forename = forename;
    }

    public setSurname(surname: string) {
        this._user.surname = surname
    }

    public build() : User {
        return this._user;
    }
} 