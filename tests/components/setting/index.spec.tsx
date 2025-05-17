import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

import SettingComponent from '@components/setting';

describe('SettingComponent', () => {
    it('should render properly', () => {
        const { getByText } = render(<SettingComponent />);

        expect(getByText('Enable Dark Theme')).toBeTruthy();
    });
});
