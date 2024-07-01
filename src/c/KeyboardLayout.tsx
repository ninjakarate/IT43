import { Stack, Typography } from "@mui/material";
import { KeyTypeEnum } from "../utils/types";
import React from "react";

export default function KeyboardLayout({ keys }: {
    keys: React.MutableRefObject<{ [key: string]: boolean }>
}) {
    const renderKey = (key: string) => {
        return <Stack
            borderRadius={1.5}
            width={'30px'}
            height={'30px'}
            bgcolor={keys.current[key] ? 'lightblue' : 'white'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <Typography variant={'caption'} fontFamily={'Orbitron'} letterSpacing={2}>
                {key}
            </Typography>
        </Stack>;
    }
    return (
        <Stack
            position={'absolute'}
            width={'250px'}
            height={'150px'}
            p={2}
            bgcolor={'lightgrey'}
            borderRadius={2}
            boxShadow={3}
            alignItems={'center'}
            justifyContent={'space-between'}
            top={'80%'}
            left={'3%'}
        >
            <Typography variant={'h6'} fontFamily={'Orbitron'} letterSpacing={2}>
                Pressed Keys
            </Typography>
            <Stack
                width={'100%'}
                height={'100%'}
                display={'grid'}
                gridTemplateColumns={'repeat(3, 1fr)'}
                justifyItems={'center'}
                alignItems={'center'}
            >
                {renderKey(KeyTypeEnum.sideLeft)}
                {renderKey(KeyTypeEnum.forward)}
                {renderKey(KeyTypeEnum.sideRight)}
                {renderKey(KeyTypeEnum.left)}
                {renderKey(KeyTypeEnum.backward)}
                {renderKey(KeyTypeEnum.right)}
            </Stack>
        </Stack>
    );
}