const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'app.config.js');
let configFileContent = fs.readFileSync(configPath, 'utf-8');

// Pour la version
const versionMatch = configFileContent.match(/"version":\s*"(\d+)\.(\d+)\.(\d+)"/);

if (!versionMatch) {
    console.error("Impossible de trouver la version dans app.config.js");
    process.exit(1);
}

const major = versionMatch[1];
const minor = versionMatch[2];
const patch = parseInt(versionMatch[3], 10) + 1; // Incrémenter le numéro de patch

const newVersion = `"version": "${major}.${minor}.${patch}"`;
configFileContent = configFileContent.replace(/"version":\s*"\d+\.\d+\.\d+"/, newVersion);

// Pour versionCode
const versionCodeMatch = configFileContent.match(/"versionCode":\s*(\d+)/);

if (!versionCodeMatch) {
    console.error("Impossible de trouver versionCode dans app.config.js");
    process.exit(1);
}

const versionCode = parseInt(versionCodeMatch[1], 10) + 1; // Incrémenter versionCode
const newVersionCode = `"versionCode": ${versionCode}`;
configFileContent = configFileContent.replace(/"versionCode":\s*\d+/, newVersionCode);

// Écrire le contenu modifié dans le fichier
fs.writeFileSync(configPath, configFileContent);

console.log(`Version mise à jour : ${major}.${minor}.${patch}`);
console.log(`versionCode mis à jour : ${versionCode}`);
