# OpenPets Plugin Starter

A tiny, complete starter template for building an OpenPets community plugin.

This example intentionally keeps the permissions small:

- `pet:speak` — show a pet speech bubble.
- `pet:reaction` — make the pet wave.
- `commands` — add one right-click pet command.
- `status` — show a short status in the Plugins UI.

It does **not** use network, OAuth, secrets, files, or AI. Start here before
building a more advanced integration.

## Files

```text
openpets.plugin.json  # Manifest: id, version, permissions, settings, assets
index.js              # Plugin entry file
locales/en.json       # Display strings and settings labels
assets/icon.svg       # Bundled catalog icon
test.js               # SDK test-harness smoke test
package.json          # Local test dependencies
```

## Customize it

1. Rename the plugin id in `openpets.plugin.json` from `yourname.hello-pet` to
   your own stable id, for example `saimun.spotify-buddy`.
2. Update the name and description in `locales/en.json`.
3. Keep permissions minimal. Add new permissions only when your code actually
   needs them.
4. If your plugin uses the network, add exact hosts under `network.hosts`.
5. Replace `assets/icon.svg` with your own bundled SVG icon.

## Test the plugin files

You can build and test a plugin without cloning the OpenPets source repo.
Install this starter's test dependencies once:

Install dependencies:

```bash
npm install
```

Run the smoke test:

```bash
npm test
```

Validate the plugin package with the OpenPets CLI:

```bash
npx -y @open-pets/cli plugin validate .
```

## Run inside the OpenPets desktop app

To see the plugin with a real pet, install/open OpenPets and load this folder
directly. You still do **not** need to clone OpenPets.

In OpenPets:

1. Open **Tray → Plugins**.
2. Open **Developer Mode**.
3. Click **Load Folder**.
4. Select this `openpets-plugin-starter` folder.

OpenPets validates the manifest, snapshots the declared files into app data,
watches this source folder, and reloads after edits. Enable the plugin if it is
off, then right-click your pet to run the **Say Hello** command.

If you want to force a re-read after editing, click **Refresh** on the local
plugin card or **Refresh from Folder** in its configuration view.

### If you already have an OpenPets checkout

The installed desktop flow above is recommended. If you are working on OpenPets
itself, you can still run the maintainer dev app with this plugin loaded from
its absolute path:

```bash
OPENPETS_DEV_PLUGIN_PATHS=/absolute/path/to/openpets-plugin-starter pnpm dev:desktop
```

Do not copy your plugin into `node_modules` or mount the full OpenPets checkout
inside another OS/VM. Keep one normal OpenPets app checkout and one normal plugin
repo checkout.

## Submit to the OpenPets catalog

When your plugin is ready:

1. Push it to a public GitHub repository.
2. Tag a release, for example `v1.0.0`.
3. Prepare your review packet:
   - Plugin name and plugin id.
   - GitHub repo URL.
   - Plugin subdirectory, or `.` if the manifest is at the repo root.
   - Release tag or full commit SHA.
   - Requested permissions and why each one is needed.
   - Network hosts and what each host is used for.
   - Any external account setup users need.
4. Submit it from the OpenPets plugin submission page:
   <https://openpets.dev/plugins/submit>

OpenPets users install reviewed, hash-pinned ZIP packages from the OpenPets
catalog. Your GitHub repo remains the source/provenance for review and future
updates.
