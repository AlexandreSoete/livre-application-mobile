const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

// Obtenir la configuration par défaut
const defaultConfig = getDefaultConfig(__dirname);

// Ajoutez les options personnalisées ici
const config = {
  transformer: {
    // Désactiver TurboModules
    unstable_disableTurboModules: true,
  },
  resolver: {
    // Extensions que Metro doit reconnaître
    sourceExts: [...defaultConfig.resolver.sourceExts, 'ts', 'tsx', 'js', 'jsx', 'json'],
  },
};

// Fusionner la configuration par défaut et la configuration personnalisée
module.exports = mergeConfig(defaultConfig, config);
