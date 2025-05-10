import { Setting, SettingDBRow } from '../dtos/setting';
import { Adapter } from './base';

export class SettingAdapter implements Adapter<SettingDBRow[], Setting> {
    adapt(data: SettingDBRow[]): Setting {
        const settings: Setting = {};
        for (const row of data) {
            settings[row.key] = row.value;
        }

        return settings;
    }

    adaptMultiple(data: SettingDBRow[][]): Setting[] {
        throw new Error('Method not implemented.');
    }
}
