import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with apiKey and user-agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// System instruction containing all authentic Saubhagya Hospital information
const HOSPITAL_SYSTEM_INSTRUCTION = `
You are "Saubhagya AI Swasthya Mitra", the official friendly virtual healthcare assistant for "Saubhagya Hospital" (सौभाग्य हॉस्पिटल) located in Raipur, Chhattisgarh.
Your job is to provide warm, polite, highly professional, and informative answers to patients in either Hindi, English, or Hinglish based on their query language.

--- HOSPITAL FACTS & KNOWLEDGE BASE ---
1. Name: Saubhagya Hospital (सौभाग्य हॉस्पिटल)
2. Location: Sector 1, Saptgiri Colony, Shivanand Nagar, Raipur, Chhattisgarh 492008. (सप्तगिरी कॉलोनी, शिवानंद नगर, रायपुर).
3. Contact Phone: 077140 50625 or +91 77140 50625 (emergency / appointments).
4. Rating: 4.8 out of 5 stars based on 531+ genuine patient reviews on Google Maps. Very highly rated.
5. Operating Hours: Open 24 Hours, 7 Days a week for Emergencies, Labor/Delivery, Pharmacy, and ICU.
6. OPD (Out-Patient) Consultation Timings: Monday to Saturday, 10:00 AM - 2:00 PM and 5:00 PM - 8:00 PM.

7. Key Specialists & Departments:
   - Gynaecology & Obstetrics (स्त्री रोग एवं प्रसूति):
     * Doctors: Dr. Rashmi Bhandari (Senior Gynecologist & Laparoscopic Surgeon, MBBS, MS - 15+ years experience) & Dr. Pratibha Sahu (Consultant Obstetrician - 10+ years experience).
     * Services: Painless delivery, high-risk pregnancy monitoring, deluxe labor suits, laparoscopic keyhole surgery for fibroids, cysts, hysterectomy, infertility counseling.
   - Pediatrics & Neonatology (बाल रोग और नवजात शिशु):
     * Doctor: Dr. S. K. Singh (Senior Pediatrician & Neonatologist, MD Pediatrics - 18+ years experience).
     * Services: Level-II Neonatal Intensive Care Unit (NICU) for premature/sick babies, routine childhood vaccinations, growth monitoring, pediatric asthma & nutrition counseling.
   - General Medicine & Diabetology (सामान्य चिकित्सा और मधुमेह):
     * Doctor: Dr. Anil Sharma (Senior Physician & Diabetologist, MD - 14+ years experience).
     * Services: Diabetes care, hypertension (BP) screening, thyroid treatment, fever, seasonal infections (dengue, malaria, typhoid), wellness screenings.
   - General & Laparoscopic Surgery (सर्जरी):
     * Doctor: Dr. V. K. Bhandari (Consultant General & Laparoscopic Surgeon, MS, FMAS - 16+ years experience).
     * Services: Laparoscopic surgery for gallbladder stones (cholecystectomy), appendix (appendectomy), hernia mesh repairs, painless laser treatment for piles/fissures/fistula, emergency trauma wound repair.
   - Orthopaedics & Joint Care (हड्डी रोग):
     * Doctor: Dr. Rajesh Dewangan (Visiting Consultant Orthopaedic Surgeon, MS Ortho - 12+ years experience).
     * Services: Plasters & fracture reductions, chronic arthritis care, gout, sciatica & back pain therapy, sports injuries, in-house physiotherapy unit.

8. Facilities:
   - 24/7 emergency trauma cover
   - Level-II Neonatal Intensive Care Unit (NICU)
   - Modern Modular Operation Theatres
   - Deluxe and Semi-Private Labor and Maternity Suites
   - Fully automated diagnostics laboratory
   - 24-hour in-house medical store/pharmacy
   - Dedicated Physiotherapy clinic

--- COMMUNICATION GUIDELINES ---
- Always maintain a reassuring, humble, and polite healthcare tone.
- When asked for a medical diagnosis, politely specify that you are an AI assistant and cannot physically examine them. Recommend they book an appointment with Saubhagya Hospital's respective specialist (e.g., Dr. Rashmi Bhandari for pregnancy, Dr. S. K. Singh for child fever, Dr. Rajesh Dewangan for joint pain, Dr. Anil Sharma for diabetes/general health, Dr. V. K. Bhandari for gallbladder/appendix surgery).
- Guide them on how to book an appointment (either by filling the booking form on our website or calling our contact number 077140 50625).
- Keep responses relatively concise, structured, and easy to read. Use bullet points where appropriate.
- Speak in Hindi if the user asks in Hindi, in Hinglish if they ask in Hinglish, and in English if they ask in English. Do not mix unnecessarily unless helpful.
`;

// API endpoint for chatbot
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      // Graceful error if key is missing
      return res.status(200).json({
        reply: "Welcome to Saubhagya Hospital. (Note: The GEMINI_API_KEY is not configured in secrets, so I am running in local offline mode. How can I help you today? You can book an appointment or view our departments!)"
      });
    }

    // Convert client-side history to Gemini format if provided
    const formattedContents = [];
    if (history && Array.isArray(history)) {
      for (const turn of history) {
        formattedContents.push({
          role: turn.role === 'user' ? 'user' : 'model',
          parts: [{ text: turn.content }]
        });
      }
    }
    
    // Add current user message
    formattedContents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: HOSPITAL_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

// File-based database configuration for appointments and traffic stats
import fs from "fs";

const APPOINTMENTS_FILE = path.join(process.cwd(), "appointments.json");
const TRAFFIC_FILE = path.join(process.cwd(), "traffic.json");

// Helper to read JSON file safely
function readJsonFile<T>(filePath: string, defaultValue: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data) as T;
    }
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
  }
  return defaultValue;
}

// Helper to write JSON file safely
function writeJsonFile<T>(filePath: string, data: T): boolean {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error(`Error writing file ${filePath}:`, err);
    return false;
  }
}

// API endpoint to log page visits (traffic)
app.post("/api/traffic", (req, res) => {
  try {
    const { path: pagePath, referrer, userAgent } = req.body;
    const traffic = readJsonFile<any[]>(TRAFFIC_FILE, []);
    
    const newVisit = {
      id: `vis-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      path: pagePath || "/",
      referrer: referrer || "Direct",
      userAgent: userAgent || "Unknown",
    };

    traffic.push(newVisit);
    // Keep last 10,000 visits to avoid unbounded growth
    if (traffic.length > 10000) {
      traffic.shift();
    }
    writeJsonFile(TRAFFIC_FILE, traffic);
    res.json({ success: true });
  } catch (err) {
    console.error("Error logging traffic:", err);
    res.status(500).json({ error: "Failed to log traffic" });
  }
});

// API endpoint to get traffic stats
app.get("/api/traffic", (req, res) => {
  try {
    const traffic = readJsonFile<any[]>(TRAFFIC_FILE, []);
    res.json(traffic);
  } catch (err) {
    console.error("Error getting traffic:", err);
    res.status(500).json({ error: "Failed to get traffic" });
  }
});

// API endpoint to get all appointments
app.get("/api/appointments", (req, res) => {
  try {
    const appointments = readJsonFile<any[]>(APPOINTMENTS_FILE, []);
    res.json(appointments);
  } catch (err) {
    console.error("Error getting appointments:", err);
    res.status(500).json({ error: "Failed to get appointments" });
  }
});

// API endpoint to add or update an appointment
app.post("/api/appointments", (req, res) => {
  try {
    const newAppt = req.body;
    if (!newAppt || !newAppt.id) {
      return res.status(400).json({ error: "Invalid appointment data" });
    }

    const appointments = readJsonFile<any[]>(APPOINTMENTS_FILE, []);
    const index = appointments.findIndex(a => a.id === newAppt.id);

    if (index !== -1) {
      // Update existing (e.g., if cancelled)
      appointments[index] = newAppt;
    } else {
      // Add new
      appointments.unshift(newAppt);
    }

    writeJsonFile(APPOINTMENTS_FILE, appointments);
    res.json({ success: true, appointment: newAppt });
  } catch (err) {
    console.error("Error saving appointment:", err);
    res.status(500).json({ error: "Failed to save appointment" });
  }
});

// Configure Vite or Static File Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development server middleware loaded.");
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static file serving loaded from 'dist'.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
