# React Native — Sample Project

A small React Native project demonstrating navigation, a custom sidebar, and global state management with Zustand.

## Features

- Simple counter state using Zustand (`store/useCounterStore.js`).
- Multiple screens: Home, Settings, Zustand, and `PagerViewScreen`.
 - Multiple screens: Home, Settings, Zustand, `PagerViewScreen`, and `ChatScreen`.
- Pager View feature for swipeable screen navigation (`screens/PagerViewScreen.js`).
- Custom sidebar component (`components/CustomSideBar.js`).
- Basic navigation setup and example UI in `App.js` / `index.js`.
- Minimal, easy-to-read code ideal for learning or quick prototyping.

## Quick Start

Prerequisites:
- Node.js (16+ recommended)
- npm or yarn
- Expo CLI (if using Expo) or React Native CLI

Install dependencies:

```bash
npm install
# or
yarn install
```

Run (Expo):

```bash
npx expo start
```

Run (React Native CLI):

```bash
npx react-native run-android
npx react-native run-ios
```

## Usage

- Open the app on your simulator or device.
- Use the sidebar to navigate between `HomeScreen`, `SettingsScreen`, `ZustandScreen`, and `PagerViewScreen`.
- On `ZustandScreen` you can increment/decrement the shared counter — the state is persisted in the global store.
- On `PagerViewScreen` you can swipe through multiple pages to see the pager view in action.
 - On `ChatScreen` you can view and send messages in the local chat UI (no backend by default).

## Project Structure

- [App.js](App.js) — app entry and navigation setup
- [index.js](index.js) — React Native bootstrap
- [app.json](app.json), [eas.json](eas.json) — project config
- [assets/](assets/) — images and static assets
- [components/CustomSideBar.js](components/CustomSideBar.js) — custom drawer/sidebar component
- [screens/HomeScreen.js](screens/HomeScreen.js) — home view
- [screens/SettingsScreen.js](screens/SettingsScreen.js) — settings view
- [screens/ZustandScreen.js](screens/ZustandScreen.js) — example using the Zustand store
- [screens/PagerViewScreen.js](screens/PagerViewScreen.js) — swipeable pager view feature
 - [screens/ChatScreen.js](screens/ChatScreen.js) — chat interface (message list + input)
- [store/useCounterStore.js](store/useCounterStore.js) — Zustand store for counter state

## Contributing

- Fork the repo, create a feature branch, and open a pull request.
- Keep changes small and focused; update this README when adding notable features.

## License

This project is provided as-is for learning and prototyping. Add a license file if you plan to publish or share widely.

---

If you'd like, I can add badges, code examples for the store usage, or update the README with exact `package.json` scripts from your project.

## ChatScreen

- **Purpose**: Demonstrates an in-app chat UI with a scrollable message list and a text input to compose messages. It's useful as a UI reference or starting point for integrating a real messaging backend.
- **File**: [screens/ChatScreen.js](screens/ChatScreen.js)
- **Behavior**:
	- Displays messages in a vertical list, grouped by sender/time where implemented.
	- Provides an input field and send button to append messages locally.
	- No network/back-end configuration is included by default — you can wire it to your API or WebSocket service.
- **Usage**: Open the app, navigate to the sidebar and select the Chat screen to try the UI.
- **Notes**: If you want, I can add sample message persistence, mock data, or an example integration with a WebSocket or Firebase.
