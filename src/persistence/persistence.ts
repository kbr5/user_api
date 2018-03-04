export class Persistence implements IPersistence {

    private storage: IPersistence;

    constructor(storage: IPersistence) {
        this.storage = storage;
    }

    create(obj: any) : PersistenceResponse {        
        return this.storage.create(obj);
    }

    read(id: number) : PersistenceResponse {
        return this.storage.read(id);
    }

    readAll() : PersistenceResponse {
        return this.storage.readAll(); 
    }

    update(id: number, obj: any) : PersistenceResponse {
        return this.storage.update(id, obj);
    }

    delete(id: number) : PersistenceResponse {
        return this.storage.delete(id);
    }

}

export interface IPersistence {
    create(obj: any) : PersistenceResponse;
    read(id: number) : PersistenceResponse;
    readAll(): PersistenceResponse;
    update(id: number, obj: any) : PersistenceResponse;
    delete(id: number) : PersistenceResponse;
}

export class PersistenceResponse {
    data?: any
    error?: Error
    success?: boolean;
}

export interface IPersistenceResponseBuilder {
    setData(data: any) : void
    setError(error: Error) : void;
    build(): PersistenceResponse;
}

export class PersistenceResponseBuilder implements IPersistenceResponseBuilder {
    private _persistenceResponse: PersistenceResponse;

    constructor() {
        this._persistenceResponse = new PersistenceResponse();
    }

    setData(data: any) {
        this._persistenceResponse.data = data;
    }

    setError(error: Error) {
        this._persistenceResponse.error = error;
    }

    setSuccess(success: boolean) {
        this._persistenceResponse.success = success;
    }

    build() : PersistenceResponse {
        return this._persistenceResponse;
    }

}