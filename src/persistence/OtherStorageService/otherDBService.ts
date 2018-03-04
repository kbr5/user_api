import { IPersistence, PersistenceResponse, PersistenceResponseBuilder } from '../persistence';

export class OtherDBService implements IPersistence {
    create(obj: any) : PersistenceResponse {
        var response = new PersistenceResponseBuilder;

        return response.build()
    }

    read(id: number) : PersistenceResponse {
        var response = new PersistenceResponseBuilder;

        return response.build()
    }

    readAll() : PersistenceResponse {
        var response = new PersistenceResponseBuilder;

        return response.build() 
    }

    update(obj: any) : PersistenceResponse {
        var response = new PersistenceResponseBuilder;

        return response.build() 
    }

    delete(obj: any) : PersistenceResponse {
        var response = new PersistenceResponseBuilder;

        return response.build() 
    }
}