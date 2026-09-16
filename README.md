# Desktop Greenery

The marketplace runs on Vite and the adoption API runs on Express.

## Run locally

```sh
npm run server
npm run dev
```

Build the Windows installer with `npm run tauri build`. The marketplace download
route serves the generated file from `src-tauri/target/release/bundle/nsis`.

For a deployed frontend, set `VITE_API_URL` to the public API origin. You can
also set `VITE_INSTALLER_URL` to the public URL of the uploaded `.exe` asset.
The installer must be uploaded with the exact generated name:
`desktop-plant_0.1.0_x64-setup.exe`.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
"# desktop-plant" 
