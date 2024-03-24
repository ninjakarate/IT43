import { useMemo, useState } from 'react';
import './styles.css';

import stones from "./utils/assets/tex/8.png";
import skybox from "./utils/assets/tex/cubemap.png";

import Raycaster from './c/Raycaster';
import Settings from './c/Settings';
import { map } from './utils/assets/map';
import { useSettings } from './utils/providers/SettingsProvider';
import { KeyTypeEnum, PlayerType, Tiles } from './utils/types';
import { tiles } from './utils/functions/renderMapTile';

function App() {
  const [isReady, setIsReady] = useState(false);
  const { settings } = useSettings();

  const dimensions = {
    width: 640,
    height: 320,
  };

  const gameTiles = useMemo((): Tiles => (tiles), [])

  const player = useMemo((): PlayerType => ({
    x: 2,
    y: 2,
  }), [])

  const inputs = {
    forward: KeyTypeEnum.forward,
    left: KeyTypeEnum.left,
    right: KeyTypeEnum.right,
    backward: KeyTypeEnum.backward,
    action: KeyTypeEnum.action,
    sideLeft: KeyTypeEnum.sideLeft,
    sideRight: KeyTypeEnum.sideRight,
  }
  console.log(settings)
  return (
    <>
      {isReady
        ? <Raycaster
          map={settings.map ?? map}
          tiles={gameTiles}
          player={player}
          floor={stones}
          skybox={skybox}
          inputs={inputs}
          settings={settings}
          width={dimensions.width}
          height={dimensions.height}
        />
        : <Settings onConfirm={() => setIsReady(true)} />}
    </>
  )
}

export default App