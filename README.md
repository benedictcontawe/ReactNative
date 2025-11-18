# CameraApp - React Native Expo Project

A React Native camera application built with Expo, featuring camera capture, video recording, and image gallery functionality.

## Features

- 📷 Take photos with front/back camera
- 🎥 Record videos
- 🖼️ Image gallery with multiple image selection
- 📱 Image detail view
- 🎨 Modern UI with bottom sheet navigation

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for local builds) OR EAS CLI (for cloud builds)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Development

### Start the development server:
```bash
npm start
```

### Run on Android (local build):
```bash
npm run android
```

## Building the App

### Important: EAS Project ID Configuration

**Before building with EAS**, you need to update the EAS project ID in `app.json` (lines 48-52):

```json
"extra": {
  "eas": {
    "projectId": "YOUR_NEW_PROJECT_ID"
  }
}
```

If you're building for the first time or want to create a new project, you can remove this section and EAS will generate a new project ID automatically.

### EAS Build (Cloud Build - Recommended)

EAS Build is the recommended way to build your app, especially if you don't have Android Studio set up locally.

#### Setup EAS CLI:

```bash
npm install -g eas-cli
```

#### Login to Expo:

```bash
eas login
```

#### Verify your login:

```bash
eas whoami
```

#### Build the development client:

```bash
eas build --platform android --profile development --clear-cache
```

This will:
- Build your app with all native modules included
- Provide a download link for the APK
- Take approximately 10-20 minutes

After the build completes, download and install the APK on your Android device.

#### Troubleshooting APK Installation:

If the APK fails to install, try these steps:

1. **Uninstall any existing version** of the app first:
   - Go to Settings → Apps → Find "CameraApp" → Uninstall
   - Or use ADB: `adb uninstall com.reactnative.CameraApp`
   - Also check for the old package: `adb uninstall com.benedictcontaweyahoo.CameraApp`

2. **Enable "Install from Unknown Sources"**:
   - Settings → Security → Enable "Install unknown apps" for your browser/file manager

3. **Re-download the APK** if the download might be corrupted

4. **Check device storage** - ensure you have enough free space

5. **Try installing via ADB** (if you have ADB set up):
   ```bash
   adb install path/to/your-app.apk
   ```

### Local Build (Faster, requires Android Studio)

If you have Android Studio and Android SDK installed:

```bash
# Clean and regenerate native code
npx expo prebuild --clean --platform android

# Build and install on connected device
npx expo run:android
```

## Native Modules

This app uses the following native modules that require a development build:
- `expo-camera` - Camera functionality
- `expo-image-picker` - Image selection from gallery

**Note:** These modules will not work in Expo Go. You must use a development build (either via EAS Build or local build).

## Troubleshooting

### "Cannot find native module" Error

If you see errors about missing native modules, you need to rebuild the app:
- For EAS: Run `eas build --platform android --profile development --clear-cache`
- For local: Run `npx expo prebuild --clean --platform android` then `npx expo run:android`

### "App entry not found" Error

This usually means the app wasn't built with the required native modules. Rebuild using one of the methods above.

## Project Structure

```
├── App.js                 # Main app component with navigation
├── components/            # Screen components
│   ├── CameraScreen.js
│   ├── VideoScreen.js
│   ├── ImageGalleryScreen.js
│   └── ImageDetailScreen.js
├── utils/                # Utility functions
│   └── imagePicker.js    # Safe wrapper for expo-image-picker
├── assets/              # Images and icons
├── app.json             # Expo configuration
└── package.json         # Dependencies
```

## Package Name

The app uses the package name: `com.reactnative.CameraApp`

## License

Private project
