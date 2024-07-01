import React, { useRef, useEffect, useState } from 'react';
import KeyboardLayout from './KeyboardLayout';
import { KeyTypeEnum } from '../utils/types';
import Map from './Map';

const Raycasting: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null); // Референс на canvas элемент
  const [width, setWidth] = useState(window.innerWidth); // Состояние для ширины окна
  const [height, setHeight] = useState(window.innerHeight); // Состояние для высоты окна
  const keys = useRef<{ [key: string]: boolean }>({}); // Состояние для отслеживания нажатых клавиш

  const [playerPos, setPlayerPos] = useState({ x: 1.5, y: 1.5, dir: 0 });
  
  // Карта уровня, 1 - это стена, 0 - пустое пространство
  const map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d'); // Получение 2D контекста для рисования на canvas

    if (!canvas || !context) {
      return;
    }



    // Параметры игрока: позиция, направление, поле зрения, скорости перемещения и поворота
    const player = {
      x: 1.5,
      y: 1.5,
      dir: 1.55,
      // fov: Math.PI / 3,
      moveSpeed: 0.05,
      rotSpeed: 0.03
    };

    // Функция обработки движения игрока
    const movePlayer = () => {
      let newX = player.x;
      let newY = player.y;

      // Вычисляем новые координаты игрока
      if (keys.current[KeyTypeEnum.forward]) {
        newX += Math.cos(player.dir) * player.moveSpeed;
        newY += Math.sin(player.dir) * player.moveSpeed;
      }
      if (keys.current[KeyTypeEnum.backward]) {
        newX -= Math.cos(player.dir) * player.moveSpeed;
        newY -= Math.sin(player.dir) * player.moveSpeed;
      }
      if (keys.current[KeyTypeEnum.sideLeft]) {
        newX += Math.cos(player.dir + Math.PI / 2) * player.moveSpeed;
        newY += Math.sin(player.dir + Math.PI / 2) * player.moveSpeed;
      }
      if (keys.current[KeyTypeEnum.sideRight]) {
        newX += Math.cos(player.dir - Math.PI / 2) * player.moveSpeed;
        newY += Math.sin(player.dir - Math.PI / 2) * player.moveSpeed;
      }
      // Проверяем наличие стены в новой позиции игрока
      const mapX = Math.floor(newX);
      const mapY = Math.floor(newY);

      if (map[mapX][mapY] === 0) {
        player.x = newX;
        player.y = newY;
        
        setPlayerPos({ x: player.x, y: player.y, dir: player.dir });
      }

      // Обрабатываем повороты без проверки столкновений
      if (keys.current[KeyTypeEnum.left]) {
        player.dir += player.rotSpeed;
        
        setPlayerPos({ x: player.x, y: player.y, dir: player.dir });
      }
      if (keys.current[KeyTypeEnum.right]) {
        player.dir -= player.rotSpeed;

        setPlayerPos({ x: player.x, y: player.y, dir: player.dir });
      }
    };


    // Функция отрисовки кадра
    const draw = () => {
      if (!canvas || !context) {
        return;
      }

      movePlayer(); // Обновление позиции игрока перед отрисовкой

      context.clearRect(0, 0, width, height); // Очистка canvas

      // Проходимся по каждому столбцу экрана
      for (let x = 0; x < width; x++) {
        // Вычисляем направление луча
        const cameraX = 2 * x / width - 1;
        const rayDirX = Math.cos(player.dir) + cameraX * Math.sin(player.dir);
        const rayDirY = Math.sin(player.dir) - cameraX * Math.cos(player.dir);

        // Определяем, в какой клетке карты мы находимся
        let mapX = Math.floor(player.x);
        let mapY = Math.floor(player.y);

        // Вычисляем длины луча
        const deltaDistX = Math.abs(1 / rayDirX);
        const deltaDistY = Math.abs(1 / rayDirY);

        let stepX, stepY;
        let sideDistX, sideDistY;

        // Определяем шаги и начальные дистанции до стороны сетки
        if (rayDirX < 0) {
          stepX = -1;
          sideDistX = (player.x - mapX) * deltaDistX;
        } else {
          stepX = 1;
          sideDistX = (mapX + 1.0 - player.x) * deltaDistX;
        }

        if (rayDirY < 0) {
          stepY = -1;
          sideDistY = (player.y - mapY) * deltaDistY;
        } else {
          stepY = 1;
          sideDistY = (mapY + 1.0 - player.y) * deltaDistY;
        }

        let hit = 0; // Флаг попадания в стену
        let side; // Флаг стороны (0 - по оси X, 1 - по оси Y)

        // Алгоритм DDA (Digital Differential Analyzer) для поиска пересечения луча со стеной
        while (hit === 0) {
          if (sideDistX < sideDistY) {
            sideDistX += deltaDistX;
            mapX += stepX;
            side = 0;
          } else {
            sideDistY += deltaDistY;
            mapY += stepY;
            side = 1;
          }

          // Проверка на столкновение с стеной
          if (map[mapX][mapY] > 0) {
            hit = 1;
          }
        }

        // Вычисляем расстояние до стены
        const perpWallDist = side === 0
          ? (mapX - player.x + (1 - stepX) / 2) / rayDirX
          : (mapY - player.y + (1 - stepY) / 2) / rayDirY;

        // Вычисляем высоту линии для рисования
        const lineHeight = Math.floor(height / perpWallDist);
        const drawStart = Math.max(-lineHeight / 2 + height / 2, 0);
        const drawEnd = Math.min(lineHeight / 2 + height / 2, height);

        // Определяем цвет стены в зависимости от стороны
        context.strokeStyle = side === 0 ? '#b85d56' : '#d16b62';
        context.beginPath();
        context.moveTo(x, drawStart);
        context.lineTo(x, drawEnd);
        context.stroke();

        // Добавляем цвет "потолка"
        context.fillStyle = 'lightblue';
        context.fillRect(x, 0, 1, drawStart);

        // Добавляем цвет "пола"
        context.fillStyle = '#9bbf9d';
        context.fillRect(x, drawEnd, 1, height - drawEnd);
      }

      // Запрос следующего кадра
      requestAnimationFrame(draw);
    };

    // Обработка изменения размеров окна
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    // Обработка нажатий клавиш
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
    };

    // Обработка отпускания клавиш
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key] = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    handleResize();

    // Запуск отрисовки
    requestAnimationFrame(draw);

    // Очистка эффектов при размонтировании компонента
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [width, height]);

  return <>
    <canvas ref={canvasRef} />
    <KeyboardLayout keys={keys} />
    <Map player={playerPos} map={map} />
  </>;
};

export default Raycasting;
