import { Adapter } from '../adapters/base';
import { Setting, SettingDBRow } from '../dtos/setting';
import { DatabaseRepository } from '../repository/database';

class SettingService {
    constructor(
        private databaseRepository: DatabaseRepository,
        private adapter: Adapter<SettingDBRow[], Setting>
    ) {}

    get(): Setting {
        const data: SettingDBRow[] = this.databaseRepository
            .prepare(
                `SELECT key, value
                FROM settings;`
            )
            .all();

        return this.adapter.adapt(data);
    }
}

export default SettingService;
