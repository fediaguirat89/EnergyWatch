#  EnergyWatch IoT Dashboard

> Application mobile de surveillance de consommation énergétique en temps réel via capteurs IoT

![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)
![IoT](https://img.shields.io/badge/IoT-ESP8266-green?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

---

##  Aperçu

EnergyWatch est une application mobile développée avec **React Native & Expo**, conçue pour surveiller et analyser la consommation énergétique d'une maison ou d'un bâtiment industriel en temps réel. Elle s'interface avec des capteurs IoT (ESP8266/NodeMCU) pour collecter et visualiser les données de consommation.

---

##  Fonctionnalités

###  Dashboard Principal
- **Consommation en temps réel** — mise à jour automatique toutes les 5 secondes
- **4 métriques clés** : consommation actuelle (kW), coût du jour (€), kWh mensuel, économies réalisées
- **Comparaison** avec la veille et le mois précédent

### Graphique 7 jours
- Visualisation de la consommation sur la semaine
- Identification automatique du **pic de consommation** (barre rouge)
- Identification de la **consommation minimale** (barre verte)

###  Système d'alertes
- Détection automatique des **pics de consommation anormaux**
- Notification avec heure et valeur du pic
- Historique des alertes

### Gestion des appareils connectés
- Liste des appareils IoT connectés (chauffage, réfrigérateur, éclairage, chauffe-eau)
- **Activation/désactivation** à distance (ON/OFF)
- Affichage de la consommation par appareil (W) et du coût horaire (€/h)
- Calcul du **total actif** en temps réel

###  Navigation
- 5 onglets : Accueil, Analyses, Appareils, Alertes, Réglages

---

## 🛠️ Technologies utilisées

| Technologie | Utilisation |
|---|---|
| **React Native** | Framework mobile cross-platform |
| **Expo SDK 54** | Environnement de développement |
| **TypeScript** | Typage statique |
| **ESP8266 / NodeMCU** | Capteurs IoT (hardware) |
| **JavaScript** | Logique applicative |

---

##  Installation et lancement

### Prérequis
- Node.js v18+
- Expo Go (sur votre téléphone)
- npm ou yarn

### Étapes

```bash
# 1. Cloner le projet
git clone https://github.com/fediaguirat89/EnergyWatch.git

# 2. Accéder au dossier
cd EnergyWatch

# 3. Installer les dépendances
npm install

# 4. Lancer l'application
npx expo start
```

### Lancer sur votre téléphone
1. Téléchargez **Expo Go** sur App Store ou Google Play
2. Scannez le QR code affiché dans le terminal
3. L'app s'ouvre automatiquement sur votre téléphone !

---

##  Architecture du projet

```
EnergyWatch/
├── app/
│   ├── index.tsx          # Dashboard principal
│   └── _layout.tsx        # Configuration navigation
├── assets/
│   └── images/            # Icônes et images
├── app.json               # Configuration Expo
├── package.json           # Dépendances
└── README.md              # Documentation
```

---

##  Intégration IoT (Hardware)

L'application est conçue pour s'interfacer avec des capteurs IoT basés sur **ESP8266/NodeMCU** :

```
[Capteur IoT ESP8266] → [WiFi] → [API REST] → [EnergyWatch App]
```

### Capteurs compatibles
- **Capteur de courant** (ACS712) — mesure consommation en ampères
- **Capteur de tension** — mesure la tension secteur
- **Calcul puissance** : P (W) = V (V) × I (A)

### Communication
- Protocole : **HTTP REST** ou **MQTT**
- Format données : **JSON**
- Fréquence : toutes les 5 secondes

---

##  Cas d'usage

| Secteur | Application |
|---|---|
| **Résidentiel** | Surveillance consommation maison |
| **PME industrielle** | Optimisation coûts énergétiques |
| **Bâtiments publics** | Conformité directive européenne 2030 |
| **Agriculture** | Monitoring serres et équipements |

---

## Roadmap

- [ ] Connexion API réelle avec capteurs ESP8266
- [ ] Authentification utilisateur
- [ ] Notifications push (alertes consommation)
- [ ] Export données CSV/PDF
- [ ] Mode multi-sites (plusieurs bâtiments)
- [ ] Intégration avec Odoo (module énergie)
- [ ] Intelligence artificielle — prédiction consommation

---

##  Auteure

**Fedia GUIRAT**
- 🎓 Ingénieure en Systèmes Embarqués | Data Analyst
- 📍 Liège, Belgique
- 📧 fediaguirat89@gmail.com
- 🔗 [GitHub](https://github.com/fediaguirat89)
- 💼 [LinkedIn](https://linkedin.com/in/fediaguirat89)

---

## 📄 Licence

Ce projet est sous licence MIT — libre d'utilisation et de modification.

---

> 💡 **Projet portfolio** — développé dans le cadre d'une reconversion en Data Analyst & Développement IoT
