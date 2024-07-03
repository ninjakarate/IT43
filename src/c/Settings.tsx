import { Button, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { useSettings } from '../utils/providers/SettingsProvider';
import MapSettings from './MapSettings';

export default function Settings({
    onConfirm
}: {
    onConfirm: () => void;
}) {
    const { settings, setSettings } = useSettings();

    return (
        <Stack direction={'row'}
            alignItems={'start'}
            fontFamily={'Orbitron'}
            bgcolor={'#ebebeb'}
            width={'100%'}
            height={'100%'}
            justifyContent={'space-between'}
            p={4}
        >

            <Stack alignItems={'start'}>
                <Typography variant={'h4'} fontFamily={'Orbitron'} letterSpacing={2}>
                    Settings
                </Typography>
                <Button onClick={onConfirm}>Confirm</Button>
                <FormControlLabel label={'Shades'} control={<Checkbox
                    checked={settings.isShading}
                    onChange={() => setSettings((prev) => ({ ...prev, isShading: !prev.isShading }))}
                />} />
                <FormControlLabel label={'Wiggling'} control={<Checkbox
                    checked={settings.isWiggling}
                    title='wiggling'
                    onChange={() => setSettings((prev) => ({ ...prev, isWiggling: !prev.isWiggling }))}
                />} />
                <FormControlLabel label={'Fps counter'} control={<Checkbox
                    checked={settings.isShowFps}
                    title='fps'
                    onChange={() => setSettings((prev) => ({ ...prev, isShowFps: !prev.isShowFps }))}
                />} />
            </Stack>
            <MapSettings />
        </Stack>
    );
}
