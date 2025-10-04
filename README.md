# ☕ Cafe Finder  

Find the **nearest cafes around you** within a **5 km radius** using **React, TailwindCSS, and Leaflet.js**.  

---

## 🚀 Features  

- 📍 Detects your **current location**  
- 🗺️ Shows **cafes around you** (5 km radius)  
- 🌟 Cafe details with **ratings, description, and distance**  
- ⚡ Built with **React + TailwindCSS**  
- 🌀 Loading **spinner** while fetching location/cafes  

---

## ⚙️ Installation & Running the Project  

Follow these steps to run locally:  

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/yourusername/CafeFinder.git
cd cafefinder
```

### 2️⃣ Install Dependencies  
Make sure you have **Node.js (>=16)** installed. Then run:  
```bash
npm install
```

### 3️⃣ Start Development Server  
```bash
npm run dev
```

### 4️⃣ Open in Browser  
Once started, open:  
```
http://localhost:5173/
```

---

## 📂 Project Structure  

```
cafefinder/
│── src/
│   ├── components/
│   │   ├── FLanding.jsx
│   │   ├── Footer.jsx
│   │   ├── Landing.jsx
│   │   ├── Map.jsx
│   │   ├── Navbar.jsx
│   │   ├── Card.jsx
│   │   ├── Stars.jsx
│   │   ├── Spinner.jsx
│   ├── hooks/
│   │   ├── useGeoLocation.js
│   │   ├── useHaverSinKm.js
│   ├── data/
│   │   ├── indian_cafes_5000_sample.json
│   ├── App.jsx
│   ├── main.jsx
│── public/
│── package.json
│── README.md

```

---

## 📸 Screenshots  

| 📍 Nearest Cafes | 🗺️ Map Integration |
|------------------|-------------------|
| ![Cafe Cards](https://drive.google.com/uc?export=view&id=1_JTnmS1znLWX7SNe9zVJoIInw6WR1tga) | ![Map Preview](https://drive.google.com/uc?export=view&id=1kTpPC7t7R6qq45tUFaxgccNnQw2iV19W) |

---

## 🔮 Future Improvements  

- Search bar for cafes  
- Filters (rating, open/close status)  
- Live API integration instead of static JSON  
- Deploy on **Vercel/Netlify**  

---

## 🛠 Problem & Solution

**Problem:** On mobile and some browsers, websites often require **manual buttons** to request location permission, breaking the user experience.  

**Solution:** This app uses the **browser’s native geolocation API** on page load. The browser automatically prompts the user for location access, showing nearby cafes within 5 km without extra clicks. A loading spinner is displayed while fetching the location.

---

## 📜 License  

Licensed under the **MIT License**.  
