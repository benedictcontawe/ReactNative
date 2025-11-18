@echo off
echo Cleaning Android build...
cd android
call gradlew.bat clean
cd ..

echo Regenerating native code with plugins...
call npx expo prebuild --clean --platform android

echo Rebuilding Android app...
call npx expo run:android