import { DatabaseRepository } from '../../repository/database';
import { DEFAULT_SETTINGS } from '../const';
import { Migration } from '../migrator';

export class Migration0003 implements Migration {
    private createDefaultSettings(
        databaseRepository: DatabaseRepository
    ): void {
        const settingInsertStmt = databaseRepository.prepare(
            'INSERT OR IGNORE INTO settings (key, value) VALUES (@key, @value)'
        );
        for (const setting of DEFAULT_SETTINGS) {
            settingInsertStmt.run(setting);
        }
    }

    upgrade(databaseRepository: DatabaseRepository): void {
        databaseRepository.execute(
            `CREATE TABLE IF NOT EXISTS settings (
                id INTEGER PRIMARY KEY,
                key TEXT NOT NULL UNIQUE,
                value TEXT NOT NULL
            );`
        );

        this.createDefaultSettings(databaseRepository);
    }

    downgrade(databaseRepository: DatabaseRepository): void {
        databaseRepository.execute(`DROP TABLE settings;`);
    }
}
