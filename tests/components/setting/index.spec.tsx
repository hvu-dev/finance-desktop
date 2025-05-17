import SettingComponent from '@components/setting';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-react';

describe('SettingComponent', () => {
    it('should render properly', () => {
        const { getByText } = render(<SettingComponent />);

        expect(getByText('Enable Dark Theme')).toBeTruthy();
    });
});
