import { IPersistence, PersistenceResponse, PersistenceResponseBuilder } from '../persistence';
import { User } from '../../models/users';

declare var require: any;
var loki = require('lokijs');

export class lokijsService implements IPersistence {

    db: any; // LokiJS database
    collection: any; // our DB's document collection object

    constructor() {
        this.db = new loki('loki.db', {
            autoload: true,
            autoloadCallback: function() {
              console.log("* database loaded...")
            },
            autosave: true,
            autosaveInterval: 10 * 100, //every 10 seconds
            //adapter: adapter
        });
    }

    load(collectionName) : lokijsService {
        this.collection = this.db.getCollection(collectionName);
        if (this.collection == null) {
            this.collection = this.db.addCollection(collectionName);
        } else {
            this.collection = this.collection;
        }
        return this;
    }

    create(obj: any) : PersistenceResponse {
        var response = new PersistenceResponseBuilder;
        try {
            this.collection.insert(obj);
            response.setSuccess(true);
        } catch (e) {
            response.setError(e);
            response.setSuccess(false);
        }
        return response.build()
    }

    read(id: number) : PersistenceResponse {
        var response = new PersistenceResponseBuilder;
        try {
            response.setData(this.collection.get(id) || null);
            response.setSuccess(true);
        } catch (e) {
            response.setError(e);
            response.setSuccess(false);
        }
        return response.build()
    }

    readAll() : PersistenceResponse {
        var response = new PersistenceResponseBuilder;
        try {
            response.setData(this.collection.find({}));
            response.setSuccess(true);
        } catch (e) {
            response.setError(e);
            response.setSuccess(false);
        }
        return response.build() 
    }

    update(id: number, obj: any) : PersistenceResponse {
        var response = new PersistenceResponseBuilder;
        try {
            var data = this.collection.get(id);
            data = obj;
            this.collection.update(data);
            response.setSuccess(true);
        } catch (e) {
            response.setError(e);
            response.setSuccess(false);
        }
        return response.build() 
    }

    delete(id: number) : PersistenceResponse {
        var response = new PersistenceResponseBuilder;
        try {
            var data = this.collection.get(id);
            this.collection.remove(data)
            response.setSuccess(true);
        } catch (e) {
            response.setError(e);
            response.setSuccess(false);
        }
        return response.build() 
    }

}