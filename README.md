# 🌤️ Weather App - React Native & Expo

A beautiful, modern weather application built with React Native, Expo, and TypeScript. Get real-time weather information and 3-day forecasts for any city worldwide with an intuitive, responsive interface.

## ✨ Features

- **Real-time Weather Data**: Current weather conditions powered by WeatherAPI
- **3-Day Forecast**: Detailed weather predictions for the next 3 days
- **City Search**: Search and get weather for any city worldwide
- **Dark/Light Theme**: Automatic theme switching with manual override
- **Temperature Units**: Switch between Celsius and Fahrenheit
- **Responsive Design**: Optimized for both iOS and Android devices
- **Modern UI**: Beautiful animations and intuitive user interface
- **Pull-to-Refresh**: Refresh weather data with simple pull gesture
- **Safe Area Support**: Properly handles device notches and navigation bars

## 🏗️ Tech Stack

- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and toolchain
- **TypeScript** - Type-safe JavaScript
- **Expo Router** - File-based routing system
- **React Navigation** - Tab navigation
- **Lucide React Native** - Beautiful SVG icons
- **WeatherAPI** - Real-time weather data source

## 📱 Screenshots

The app features three main tabs:

- **Current**: Real-time weather conditions
- **Forecast**: 3-day weather forecast
- **Settings**: Theme preferences and temperature units

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0.0 or higher)
- **npm** or **yarn**
- **Expo CLI** (optional but recommended)
- **Expo Go app** on your mobile device

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Nikola1306/project-weather.git
   cd project-weather
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start -c
   ```
   The `-c` flag clears the cache for a fresh start.

### 📱 Running on Your Device

#### Method 1: Using Expo Go (Recommended for development)

1. **Install Expo Go** on your mobile device:

   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Scan the QR Code**:

   - After running `npx expo start -c`, a QR code will appear in your terminal
   - **iOS**: Open the Camera app and scan the QR code
   - **Android**: Open Expo Go app and scan the QR code

3. **Wait for the build** - The app will compile and load on your device

#### Method 2: Using iOS Simulator (macOS only)

```bash
# After running npx expo start -c
# Press 'i' in the terminal to open iOS simulator
```

#### Method 3: Using Android Emulator

```bash
# After running npx expo start -c
# Press 'a' in the terminal to open Android emulator
```

### 🌐 Running on Web

```bash
# After running npx expo start -c
# Press 'w' in the terminal to open in web browser
# Or visit: http://localhost:8081
```

## ⚙️ Configuration

### Weather API Setup

The app uses WeatherAPI for weather data. **An API key is already included in the code**, so you can start using the app immediately without any additional setup!

The weather data is provided by [WeatherAPI.com](https://www.weatherapi.com/) and the app is ready to use out of the box.

## 🎨 Customization

### Themes

The app supports both light and dark themes with customizable colors. Modify theme colors in `src/theme/colors.ts`:

```typescript
export const lightTheme = {
  primary: '#3B82F6',
  background: '#FFFFFF',
  // ... other colors
};
```

### Adding New Features

The app follows a modular structure:

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── services/       # API services
├── theme/          # Theme configuration
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## 🔧 Available Scripts

```bash
# Start development server with cache cleared
npm run dev
# or
npx expo start -c

# Build for web
npm run build:web

# Run linting
npm run lint

# Install compatible Expo SDK packages
npx expo install --fix
```

## 📚 Project Structure

```
project-weather/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Home/Current weather
│   │   ├── forecast.tsx   # Forecast screen
│   │   └── settings.tsx   # Settings screen
│   └── _layout.tsx        # Root layout
├── src/
│   ├── components/        # UI components
│   ├── screens/           # Screen components
│   ├── services/          # API services
│   ├── theme/             # Theme system
│   ├── types/             # TypeScript types
│   └── utils/             # Utilities
├── assets/                # Images and fonts
└── package.json
```

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler cache issues**:

   ```bash
   npx expo start -c
   ```

2. **Package conflicts**:

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npx expo install --fix
   ```

3. **Android navigation bar overlap**:

   - The app includes proper SafeAreaProvider configuration
   - Ensure you're using the latest version

4. **QR Code not working**:
   - Make sure your device and computer are on the same network
   - Try using the tunnel connection: `npx expo start --tunnel`

### Performance Tips

- Use `expo start -c` to clear cache when encountering issues
- Close other development servers to free up ports
- Restart Metro bundler if hot reloading stops working

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [WeatherAPI](https://www.weatherapi.com/) for weather data
- [Lucide](https://lucide.dev/) for beautiful icons
- [Expo](https://expo.dev/) for the amazing development platform
- React Native community for continuous improvements

---

**Made with ❤️ and ☀️**

For support or questions, please open an issue on GitHub.
