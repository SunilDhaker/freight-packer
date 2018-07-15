
import Logger from '../utils/cik/Logger';
import Signaler from '../utils/cik/Signaler';
import BoxEntry from './box/BoxEntry';

var updated = 'updated',
    aborted = 'aborted',
    completed = 'completed';

/**
 * Cubic volumes entry
 */
class CargoInput extends Signaler {

    constructor(){
        super();
        
        this.entry = new BoxEntry();
    }

    /**
     * Starts a new entry 'session', or, updates the current entry
     * @param {Object} params 
     */
    Update(params){
        this.entry.dimensions.Set(params.width, params.length, params.height);
        Logger.Trace('entry updated', this.entry);
        this.entry.active = true;
        this.Dispatch(updated, this.entry);
    }

    Abort(){
        this.entry.active = false;
        this.entry.Reset();
        Logger.Trace('entry deleted');
        this.Dispatch(aborted);
    }

    Complete(){
        if( this.entry.active ){
            this.Dispatch(completed, this.entry);
            this.entry.Reset();
        }
        return this.entry;
    }

    get currentEntry(){
        return this.entry;
    }
}

export default CargoInput;