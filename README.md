# ffxiv-twitter-location

Update the location of your Twitter profile same as FFXIV

## How to build

### Twitter API credentials

1. Create your own [Twitter app](https://developer.twitter.com/apps)
1. `Permissions` → Edit access permission to `Read and write`
1. `Keys and tokens` → Copy consumer API keys and access tokens

### OverlayPlugin without CORS

1. Clone [OverlayPlugin](https://github.com/ngld/OverlayPlugin) repository
1. Edit [HtmlRenderer/Renderer.cs](https://github.com/ngld/OverlayPlugin/blob/b71797f9c98eb02379a9a5f836d7210fc5cc76dd/HtmlRenderer/Renderer.cs#L447) 
```cs
public static void Initialize(...)
{
  ...
  // Disable browser CORS. I know what I'm doing...
  cefSettings.CefCommandLineArgs["disable-web-security"] = "1";
  Cef.Initialize(...);
  ...
}
```
1. Run `./tools/fetch_deps.py`
1. Run `./build.bat`
1. Add `./out/Release/OverlayPlugin.dll` to [ACT](https://advancedcombattracker.com) plugins

### Place names

1. Start [SaintCoinach.Cmd](https://github.com/ufx/SaintCoinach/releases) → execute `exd` command
1. Run [script](https://nodejs.org) in `SaintCoinach.Cmd/[FFXIV_VERSION]/exd` directory → build `PlaceName.json`
```js
import fs from 'fs'

const data = Object.fromEntries(fs
  .readFileSync('./TerritoryType.csv', 'utf-8')
  .split('\n').map(line => line.split(',')).slice(3)
  .map(v => [parseInt(v[0]).toString(16), eval(v[6])]))

fs.writeFileSync('./PlaceName.json', JSON.stringify(data), 'utf-8')
```

### Overlay

1. Clone [ffxiv-twitter-location](https://github.com/ChalkPE/ffxiv-twitter-location)
1. Run `yarn install`
1. Copy `PlaceName.json` to `./src` directory
1. Create `./.env` and set [environment variables](https://parceljs.org/env.html)
    - `CONSUMER_KEY`= Consumer API key
    - `CONSUMER_SECRET`= Consumer API secret key
    - `ACCESS_TOKEN_KEY`= Access token
    - `ACCESS_TOKEN_SECRET`= Access token secret
1. Run `yarn build`
1. Add custom `MiniParse` overlay to [ACT](https://advancedcombattracker.com) OverlayPlugin
1. Set `URL` to `file:///[OVERLAY_PROJECT_DIRECTORY]/dist/index.html`

## License
[MIT](LICENSE)