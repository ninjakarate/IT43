import React, { useState } from 'react';
import { Button, Collapse, IconButton, IconButtonProps, Stack, TextField, Typography, styled } from '@mui/material';
import { useSettings } from '../utils/providers/SettingsProvider';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { tiles } from '../utils/functions/renderMapTile';

export const TextBox = styled(TextField)`
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
`;

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ }) => ({
    // transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    // marginLeft: 'auto',
    // transition: theme.transitions.create('transform', {
    //     duration: theme.transitions.duration.shortest,
    // }),
}));

const MapSettings = () => {
    const { setSettings } = useSettings();

    const [expanded, setExpanded] = useState(false);

    const createMap = (rows: number, cols: number) => {
        return Array.from({ length: rows }, (_, rowIndex) =>
            Array.from({ length: cols }, (_, colIndex) =>
                rowIndex === 0 || rowIndex === rows - 1 || colIndex === 0 || colIndex === cols - 1 ? 1 : 0
            )
        );
    };

    const [rows, setRows] = useState(10);
    const [cols, setCols] = useState(10);
    const [mapInput, setMapInput] = useState<number[][]>(() => createMap(rows, cols));



    const handleInputChange = (rowIndex: number, colIndex: number, value: string) => {
        if (parseInt(value, 10) > 12) {
            value = '0';
        }

        const newMap = [...mapInput];
        newMap[rowIndex][colIndex] = parseInt(value, 10);
        setMapInput(newMap);
    };

    const handleConfirm = () => {
        setSettings((prev) => ({ ...prev, map: mapInput }));
        setExpanded(false);
    };

    const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, dimension: string) => {
        const value = e.target.value ? Math.max(0, Math.min(parseInt(e.target.value, 10), 11)) : 0;

        if (dimension === 'rows') {
            setRows(value);
            setMapInput(Array.from({ length: value }, () => Array(cols).fill(0)));
        } else if (dimension === 'cols') {
            setCols(value);
            setMapInput(Array.from({ length: rows }, () => Array(value).fill(0)));
        }
    };

    const defineColor = (value: number) => {
        switch (value) {
            case 0:
                return '#fff';
            case 1:
                return '#000';
            case 2:
                return '#f00';
            case 3:
                return '#0f0';
            case 4:
                return '#00f';
            case 5:
                return '#ff0';
            case 6:
                return '#f0f';
            case 7:
                return '#0ff';
            case 8:
                return '#888';
            case 9:
                return '#f88';
            case 10:
                return '#8f8';
            case 11:
                return '#88f';
            case 12:
                return '#ff8';
            default:
                return '#fff';
        }
    }

    return (
        <>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Stack direction={'row'} mb={2} gap={2} flexGrow={1}>
                        <TextBox
                            fullWidth
                            label="Rows"
                            type="number"
                            value={rows}
                            onChange={(e) => handleSizeChange(e, 'rows')}
                        />
                        <TextBox
                            fullWidth
                            label="Cols"
                            type="number"
                            value={cols}
                            onChange={(e) => handleSizeChange(e, 'cols')}
                        />
                    </Stack>
                    <Stack>
                        {mapInput.map((row, rowIndex) => (
                            <div key={rowIndex} style={{ display: 'flex' }}>
                                {row.map((_, colIndex) => (
                                    <TextBox
                                        key={colIndex}
                                        type="number"
                                        value={mapInput[rowIndex][colIndex]}
                                        onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                                        style={{ padding: 0, margin: 0, borderRadius: 4 }}
                                        sx={{
                                            bgcolor: defineColor(mapInput[rowIndex][colIndex]),
                                            '& input': {
                                                textAlign: 'center',
                                                padding: 0,
                                                margin: 0,
                                                width: 30,
                                                height: 30,
                                                color: defineColor(mapInput[rowIndex][colIndex])
                                            },
                                        }}

                                    />
                                ))}
                            </div>
                        ))}
                    </Stack>
                <Button variant='contained' color='error' onClick={handleConfirm}>Save map</Button>
            </Collapse>
            <Stack direction={'column'} alignItems={'center'}>
                <ExpandMore
                    expand={expanded}
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    style={{ gap: 10 }}
                >
                    <ExpandMoreIcon />
                    <Typography variant={'h6'} fontFamily={'Orbitron'} letterSpacing={2}>
                        map editor
                    </Typography>
                </ExpandMore>


                {expanded
                    ? (<Stack mt={5} gap={2}>
                        <Button variant='contained' color='error' onClick={() => setSettings((prev) => ({ ...prev, map: createMap(10, 10) }))}>Reset map</Button>
                        <Typography variant={'h6'} fontFamily={'Orbitron'} letterSpacing={2}>
                            Map tiles
                        </Typography>
                        <Stack direction={'row'} gap={2}>
                            <Stack gap={2}>
                                {Object.entries(tiles).slice(0, Object.entries(tiles).length / 2).map(([key, value]) => (
                                    <Stack direction={'row'} alignItems={'center'} gap={2} justifyContent={'space-between'}>
                                        <Typography sx={{
                                            bgcolor: defineColor(parseInt(key, 10)),
                                        }} variant={'h6'} fontFamily={'Orbitron'} letterSpacing={2}>
                                            {key}
                                        </Typography>
                                        <Stack key={key} direction={'row'} gap={2}>
                                            <img src={value.src} alt={value.src} width={50} height={50} />
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                            <Stack gap={2}>
                                {Object.entries(tiles).slice(Object.entries(tiles).length / 2, Object.entries(tiles).length - 1).map(([key, value]) => (
                                    <Stack direction={'row'} alignItems={'center'} gap={2} justifyContent={'space-between'}>
                                        <Typography sx={{
                                            bgcolor: defineColor(parseInt(key, 10)),
                                        }} variant={'h6'} fontFamily={'Orbitron'} letterSpacing={2}>
                                            {key}
                                        </Typography>
                                        <Stack key={key} direction={'row'} gap={2}>
                                            <img src={value.src} alt={value.src} width={50} height={50} />
                                        </Stack>
                                    </Stack>
                                ))}
                            </Stack>
                        </Stack>
                    </Stack>)
                    : null}
            </Stack>
        </>
    );
};

export default MapSettings;
