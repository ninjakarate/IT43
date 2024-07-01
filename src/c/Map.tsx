import { Stack } from '@mui/material';
import React, { useEffect, useRef } from 'react';

const Map: React.FC<{ player: { x: number, y: number, dir: number }, map: number[][] }> = ({ player, map }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');

        if (!canvas || !context) {
            return;
        }

        canvas.width = map.length * 20;
        canvas.height = map[0].length * 20;

        // Отрисовка карты
        for (let x = 0; x < map.length; x++) {
            for (let y = 0; y < map[x].length; y++) {
                const tileColor = map[x][y] === 1 ? '#000000' : '#FFFFFF';
                context.fillStyle = tileColor;
                context.fillRect(x * 20, y * 20, 20, 20);
            }
        }

        // Отрисовка игрока
        context.save(); // Сохраняем текущее состояние контекста
        context.translate(player.x * 20, player.y * 20); // Перемещаем координаты в центр игрока
        context.rotate(player.dir); // Поворачиваем контекст в направлении игрока
        // Отражаем канвас по горизонтали
        canvas.style.transform = 'scaleY(-1)';
        // canvas.style.transform = 'rotate(-180deg)';

        context.fillStyle = '#FF0000';
        context.beginPath();
        context.arc(0, 0, 5, 0, 2 * Math.PI);
        context.fill();

        // Отрисовка направления игрока
        context.strokeStyle = '#FF0000';
        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(20, 0); // Отрисовываем направление вправо
        context.stroke();

        context.restore(); // Восстанавливаем сохраненное состояние контекста
    }, [player, map]);

    return <Stack position={'absolute'} style={{ position: 'absolute', top: 10, left: 10 }} width={'200px'} height={'auto'}>
        <canvas ref={canvasRef} />
    </Stack>;
};




export default Map;