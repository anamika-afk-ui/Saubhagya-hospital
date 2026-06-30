export type Language = 'en' | 'hi';

export interface TranslationSet {
  navHome: string;
  navAbout: string;
  navServices: string;
  navReviews: string;
  navContact: string;
  navBook: string;
  navChat: string;
  
  heroBadge: string;
  heroTitle: string;
  heroSub: string;
  heroBookBtn: string;
  heroEmergencyCall: string;
  heroRatingText: string;
  heroStatsYears: string;
  heroStatsPatients: string;
  heroStatsDoctors: string;
  heroStatsReviews: string;

  aboutTitle: string;
  aboutBadge: string;
  aboutPara1: string;
  aboutPara2: string;
  aboutFeature1: string;
  aboutFeature1Sub: string;
  aboutFeature2: string;
  aboutFeature2Sub: string;
  aboutFeature3: string;
  aboutFeature3Sub: string;
  aboutFeature4: string;
  aboutFeature4Sub: string;

  servicesTitle: string;
  servicesSubtitle: string;
  servicesBadge: string;
  viewDetails: string;
  close: string;

  reviewsTitle: string;
  reviewsSubtitle: string;
  reviewsBadge: string;
  reviewFilterAll: string;
  reviewWriteBtn: string;

  contactTitle: string;
  contactSubtitle: string;
  contactBadge: string;
  contactPhone: string;
  contactEmail: string;
  contactAddress: string;
  contactHours: string;
  contactHoursVal: string;
  contactMapTitle: string;
  contactGetDirections: string;

  bookTitle: string;
  bookSubtitle: string;
  bookBadge: string;
  bookFormName: string;
  bookFormPhone: string;
  bookFormAge: string;
  bookFormGender: string;
  bookFormGenderM: string;
  bookFormGenderF: string;
  bookFormGenderO: string;
  bookFormDept: string;
  bookFormDate: string;
  bookFormTime: string;
  bookFormSymptoms: string;
  bookFormSubmit: string;
  bookFormSuccess: string;
  bookFormSuccessSub: string;
  bookFormError: string;
  
  appointmentsManagerTitle: string;
  appointmentsManagerSub: string;
  apptStatusScheduled: string;
  apptActionCancel: string;
  apptNoRecords: string;
  apptDownloadSlip: string;

  chatTitle: string;
  chatSubtitle: string;
  chatPlaceholder: string;
  chatWelcome: string;
  chatDisclaimer: string;
  chatSendBtn: string;
}

export const translations: Record<Language, TranslationSet> = {
  en: {
    navHome: "Home",
    navAbout: "About Us",
    navServices: "Specialties",
    navReviews: "Reviews",
    navContact: "Contact Us",
    navBook: "Book Appointment",
    navChat: "AI Swasthya Mitra",

    heroBadge: "Raipur's Most Trusted Family Hospital",
    heroTitle: "Expert Healthcare, Compassionate Treatment",
    heroSub: "Saubhagya Hospital offers world-class maternity, pediatric, and general medical care in Raipur. Led by experienced specialists, we are committed to your family's health and wellness.",
    heroBookBtn: "Schedule an Appointment",
    heroEmergencyCall: "Emergency: +91 77140 50625",
    heroRatingText: "4.8 out of 5 stars (Based on 531+ patient reviews)",
    heroStatsYears: "15+ Years of Trust",
    heroStatsPatients: "25,000+ Happy Families",
    heroStatsDoctors: "12+ Expert Doctors",
    heroStatsReviews: "530+ Verified Reviews",

    aboutTitle: "Serving Raipur with Care & Dedication",
    aboutBadge: "ABOUT SAUBHAGYA HOSPITAL",
    aboutPara1: "Saubhagya Hospital in Raipur has earned a reputation as one of Chhattisgarh's leading healthcare institutions, specializing in Maternity (Obstetrics & Gynaecology), Pediatrics, General Medicine, and Laparoscopic Surgery.",
    aboutPara2: "Located in the quiet and accessible Sapthagiri Colony, Shivanand Nagar, Raipur, our facility features state-of-the-art modular operation theatres, deluxe labor suites, advanced neonatal care units (NICU), and comprehensive diagnostic services. We treat every patient as family, ensuring that premium medical care is delivered with warmth and affordability.",
    aboutFeature1: "24/7 Emergency & ICU",
    aboutFeature1Sub: "Always ready for any medical emergencies with dedicated specialist cover.",
    aboutFeature2: "Specialized Maternity Care",
    aboutFeature2Sub: "Comprehensive prenatal, painless delivery, and postnatal support systems.",
    aboutFeature3: "Advanced Pediatric Unit",
    aboutFeature3Sub: "Specialist pediatricians and neonatologists ensuring absolute care for your little ones.",
    aboutFeature4: "Modern Laparoscopy",
    aboutFeature4Sub: "Minimally invasive surgeries enabling quicker discharge and faster healing.",

    servicesTitle: "Our Medical Specialties",
    servicesSubtitle: "Dedicated departments offering advanced therapeutic treatments and surgeries.",
    servicesBadge: "DEPARTMENTS & SPECIALTIES",
    viewDetails: "View Department Details",
    close: "Close",

    reviewsTitle: "What Our Patients Say",
    reviewsSubtitle: "We hold a proud 4.8-star rating with over 531 Google reviews from Raipur residents.",
    reviewsBadge: "TESTIMONIALS & FEEDBACK",
    reviewFilterAll: "All Reviews",
    reviewWriteBtn: "Write a Review",

    contactTitle: "Get in Touch with Us",
    contactSubtitle: "Reach out for enquiries, emergency support, or visit us in Shivanand Nagar, Raipur.",
    contactBadge: "CONTACT & DIRECTIONS",
    contactPhone: "Phone Numbers",
    contactEmail: "Email Address",
    contactAddress: "Hospital Location",
    contactHours: "Working Hours",
    contactHoursVal: "Open 24 Hours / 7 Days a Week",
    contactMapTitle: "Interactive Raipur Map Route",
    contactGetDirections: "Get Directions on Google Maps",

    bookTitle: "Book Your Hospital Visit",
    bookSubtitle: "Schedule your consultation with our specialist doctors easily. We will confirm your slot via SMS/Call.",
    bookBadge: "EASY ONLINE BOOKING",
    bookFormName: "Full Name",
    bookFormPhone: "Phone Number",
    bookFormAge: "Age",
    bookFormGender: "Gender",
    bookFormGenderM: "Male",
    bookFormGenderF: "Female",
    bookFormGenderO: "Other",
    bookFormDept: "Select Department",
    bookFormDate: "Preferred Date",
    bookFormTime: "Preferred Time Slot",
    bookFormSymptoms: "Brief Symptoms / Reason for Visit",
    bookFormSubmit: "Confirm Booking Request",
    bookFormSuccess: "Appointment Request Submitted Successfully!",
    bookFormSuccessSub: "Your booking has been registered. An assistant from Saubhagya Hospital will call you shortly to confirm.",
    bookFormError: "Please fill out all required fields correctly.",

    appointmentsManagerTitle: "Your Booked Appointments",
    appointmentsManagerSub: "Manage and view your upcoming hospital consultation requests locally.",
    apptStatusScheduled: "Registered",
    apptActionCancel: "Cancel Appointment",
    apptNoRecords: "No active appointment bookings found. Use the form above to schedule your first visit!",
    apptDownloadSlip: "Download Booking Slip",

    chatTitle: "Saubhagya AI Swasthya Mitra",
    chatSubtitle: "Your virtual healthcare assistant. Ask about hospital services, timings, locations, or seek symptom-based advice.",
    chatPlaceholder: "Ask me anything (e.g., 'Do you have maternity packages?', 'Where is the hospital located?')...",
    chatWelcome: "Namaste! I am Saubhagya AI Swasthya Mitra, your virtual guide for Saubhagya Hospital Raipur. How can I assist you with your health enquiries, timings, or doctors today?",
    chatDisclaimer: "Disclaimer: AI Assistant provides informational advice based on hospital guidelines. For medical emergencies, please call +91 77140 50625 immediately.",
    chatSendBtn: "Send"
  },
  hi: {
    navHome: "होम",
    navAbout: "हमारे बारे में",
    navServices: "विशेषज्ञताएं",
    navReviews: "समीक्षाएं",
    navContact: "संपर्क करें",
    navBook: "अपॉइंटमेंट बुक करें",
    navChat: "एआई स्वास्थ्य मित्र",

    heroBadge: "रायपुर का सबसे भरोसेमंद पारिवारिक अस्पताल",
    heroTitle: "विशेषज्ञ चिकित्सा देखभाल, संवेदनशील उपचार",
    heroSub: "सौभाग्य हॉस्पिटल रायपुर में विश्व स्तरीय प्रसूति, बाल चिकित्सा और सामान्य चिकित्सा देखभाल प्रदान करता है। अनुभवी विशेषज्ञों के नेतृत्व में, हम आपके परिवार के स्वास्थ्य और खुशहाली के लिए प्रतिबद्ध हैं।",
    heroBookBtn: "अपॉइंटमेंट शेड्यूल करें",
    heroEmergencyCall: "आपातकालीन: +91 77140 50625",
    heroRatingText: "4.8 सितारे (531+ मरीज समीक्षाओं के आधार पर)",
    heroStatsYears: "15+ वर्षों का विश्वास",
    heroStatsPatients: "25,000+ खुशहाल परिवार",
    heroStatsDoctors: "12+ विशेषज्ञ डॉक्टर",
    heroStatsReviews: "530+ सत्यापित समीक्षाएं",

    aboutTitle: "देखभाल और समर्पण के साथ रायपुर की सेवा",
    aboutBadge: "सौभाग्य हॉस्पिटल के बारे में",
    aboutPara1: "रायपुर में सौभाग्य हॉस्पिटल ने छत्तीसगढ़ के प्रमुख स्वास्थ्य संस्थानों में से एक के रूप में प्रतिष्ठा अर्जित की है, जो प्रसूति (स्त्री रोग), बाल रोग, सामान्य चिकित्सा और लैप्रोस्कोपिक सर्जरी में विशेषज्ञता रखता है।",
    aboutPara2: "शिवानंद नगर, रायपुर के शांत और सुलभ सप्तगिरी कॉलोनी, सेक्टर 1 में स्थित, हमारी सुविधा में अत्याधुनिक मॉड्यूलर ऑपरेशन थिएटर, डीलक्स लेबर सुइट्स, उन्नत नवजात शिशु देखभाल इकाइयां (NICU) और व्यापक नैदानिक सेवाएं उपलब्ध हैं। हम प्रत्येक रोगी का परिवार की तरह इलाज करते हैं, जिससे यह सुनिश्चित होता है कि प्रीमियम चिकित्सा देखभाल गर्मजोशी और किफायती दामों में दी जाए।",
    aboutFeature1: "24/7 आपातकालीन और आईसीयू",
    aboutFeature1Sub: "समर्पित विशेषज्ञ डॉक्टरों के साथ किसी भी चिकित्सा आपात स्थिति के लिए हमेशा तैयार।",
    aboutFeature2: "विशेषज्ञ प्रसूति देखभाल",
    aboutFeature2Sub: "प्रसव पूर्व व्यापक देखभाल, दर्द रहित प्रसव, और प्रसवोत्तर सहायता प्रणाली।",
    aboutFeature3: "उन्नत बाल चिकित्सा इकाई",
    aboutFeature3Sub: "विशेषज्ञ बाल रोग विशेषज्ञ और नवजात शिशु विशेषज्ञ आपके बच्चों की पूर्ण सुरक्षा सुनिश्चित करते हैं।",
    aboutFeature4: "आधुनिक लैप्रोस्कोपी",
    aboutFeature4Sub: "न्यूनतम आक्रामक सर्जरी जिससे जल्द डिस्चार्ज और तेजी से रिकवरी संभव होती है।",

    servicesTitle: "हमारी चिकित्सा विशेषज्ञताएं",
    servicesSubtitle: "उन्नत उपचारात्मक उपचार और सर्जरी की पेशकश करने वाले समर्पित विभाग।",
    servicesBadge: "विभाग और विशेषज्ञताएं",
    viewDetails: "विभाग के विवरण देखें",
    close: "बंद करें",

    reviewsTitle: "हमारे मरीजों की राय",
    reviewsSubtitle: "हमें रायपुर के निवासियों से 531 से अधिक गूगल समीक्षाओं के साथ 4.8-स्टार रेटिंग पर गर्व है।",
    reviewsBadge: "प्रशंसापत्र और प्रतिक्रिया",
    reviewFilterAll: "सभी समीक्षाएं",
    reviewWriteBtn: "समीक्षा लिखें",

    contactTitle: "हमसे संपर्क करें",
    contactSubtitle: "पूछताछ, आपातकालीन सहायता या रायपुर के शिवानंद नगर में हमारे अस्पताल में आने के लिए संपर्क करें।",
    contactBadge: "संपर्क और निर्देश",
    contactPhone: "फ़ोन नंबर",
    contactEmail: "ईमेल पता",
    contactAddress: "अस्पताल का पता",
    contactHours: "कार्य समय",
    contactHoursVal: "24 घंटे / 7 दिन खुला है",
    contactMapTitle: "इंटरएक्टिव रायपुर मैप मार्ग",
    contactGetDirections: "गूगल मैप्स पर दिशा-निर्देश प्राप्त करें",

    bookTitle: "अपना अस्पताल दौरा बुक करें",
    bookSubtitle: "हमारे विशेषज्ञ डॉक्टरों के साथ आसानी से अपॉइंटमेंट शेड्यूल करें। हम एसएमएस/कॉल के माध्यम से आपके समय की पुष्टि करेंगे।",
    bookBadge: "आसान ऑनलाइन बुकिंग",
    bookFormName: "पूरा नाम",
    bookFormPhone: "फ़ोन नंबर",
    bookFormAge: "उम्र",
    bookFormGender: "लिंग",
    bookFormGenderM: "पुरुष",
    bookFormGenderF: "महिला",
    bookFormGenderO: "अन्य",
    bookFormDept: "विभाग चुनें",
    bookFormDate: "पसंदीदा तारीख",
    bookFormTime: "पसंदीदा समय स्लॉट",
    bookFormSymptoms: "संक्षिप्त लक्षण / आने का कारण",
    bookFormSubmit: "बुकिंग अनुरोध की पुष्टि करें",
    bookFormSuccess: "अपॉइंटमेंट अनुरोध सफलतापूर्वक जमा किया गया!",
    bookFormSuccessSub: "आपकी बुकिंग दर्ज हो गई है। सौभाग्य हॉस्पिटल के सहायक जल्द ही आपको पुष्टि के लिए कॉल करेंगे।",
    bookFormError: "कृपया सभी आवश्यक फ़ील्ड्स को सही ढंग से भरें।",

    appointmentsManagerTitle: "आपके बुक किए गए अपॉइंटमेंट",
    appointmentsManagerSub: "स्थानीय रूप से अपने आगामी अस्पताल परामर्श अनुरोधों को प्रबंधित और देखें।",
    apptStatusScheduled: "दर्ज किया गया",
    apptActionCancel: "अपॉइंटमेंट रद्द करें",
    apptNoRecords: "कोई सक्रिय अपॉइंटमेंट बुकिंग नहीं मिली। अपनी पहली मुलाकात बुक करने के लिए ऊपर दिए गए फॉर्म का उपयोग करें!",
    apptDownloadSlip: "बुकिंग पर्ची डाउनलोड करें",

    chatTitle: "सौभाग्य एआई स्वास्थ्य मित्र",
    chatSubtitle: "आपका वर्चुअल स्वास्थ्य सहायक। अस्पताल की सेवाओं, समय, स्थान के बारे में पूछें, या लक्षणों के आधार पर सलाह लें।",
    chatPlaceholder: "मुझसे कुछ भी पूछें (जैसे, 'क्या आपके पास प्रसूति पैकेज हैं?', 'अस्पताल कहाँ स्थित है?')...",
    chatWelcome: "नमस्ते! मैं सौभाग्य एआई स्वास्थ्य मित्र हूँ, सौभाग्य हॉस्पिटल रायपुर के लिए आपका वर्चुअल गाइड। आज मैं स्वास्थ्य संबंधी पूछताछ, समय या डॉक्टरों के बारे में आपकी कैसे सहायता कर सकता हूँ?",
    chatDisclaimer: "अस्वीकरण: एआई सहायक अस्पताल के दिशा-निर्देशों के आधार पर सूचनात्मक सलाह देता है। चिकित्सा आपात स्थिति के लिए, कृपया तुरंत +91 77140 50625 पर कॉल करें।",
    chatSendBtn: "भेजें"
  }
};

export interface Department {
  id: string;
  name: Record<Language, string>;
  icon: string;
  shortDesc: Record<Language, string>;
  fullDesc: Record<Language, string>;
  doctors: Array<{
    name: Record<Language, string>;
    role: Record<Language, string>;
    experience: Record<Language, string>;
  }>;
  features: Record<Language, string[]>;
}

export const DEPARTMENTS: Department[] = [
  {
    id: "gyn",
    name: {
      en: "Obstetrics & Gynaecology",
      hi: "प्रसूति एवं स्त्री रोग विभाग"
    },
    icon: "HeartHandshake",
    shortDesc: {
      en: "Comprehensive women's health, pregnancy, maternity packages, and advanced laparoscopic surgery.",
      hi: "व्यापक महिला स्वास्थ्य, गर्भावस्था, प्रसूति पैकेज और उन्नत लैप्रोस्कोपिक स्त्री रोग सर्जरी।"
    },
    fullDesc: {
      en: "Our Gynaecology and Obstetrics wing is renowned across Raipur for expert maternal and reproductive care. We provide a supportive, warm environment for mothers from conception to childbirth, offering specialized high-risk pregnancy monitoring, painless labor services, state-of-the-art delivery rooms, and laparoscopic keyhole surgeries for uterine fibroids, ovarian cysts, and hysterectomy.",
      hi: "हमारा स्त्री एवं प्रसूति रोग विभाग रायपुर भर में विशेषज्ञ मातृत्व और प्रसव देखभाल के लिए प्रसिद्ध है। हम गर्भावस्था से लेकर शिशु जन्म तक माताओं के लिए एक गर्मजोशी और सहायक वातावरण प्रदान करते हैं। हम उच्च जोखिम वाली गर्भावस्था निगरानी, दर्द रहित प्रसव सुविधाएं, अत्याधुनिक लेबर रूम और गर्भाशय फाइब्रॉएड, डिम्बग्रंथि अल्सर और हिस्टेरेक्टॉमी के लिए लैप्रोस्कोपिक (की-होल) सर्जरी प्रदान करते हैं।"
    },
    doctors: [
      {
        name: { en: "Dr. Rashmi Bhandari", hi: "डॉ. रश्मी भंडारी" },
        role: { en: "Senior Gynecologist & Laparoscopic Surgeon (MBBS, MS)", hi: "वरिष्ठ स्त्री रोग विशेषज्ञ और लेप्रोस्कोपिक सर्जन (MBBS, MS)" },
        experience: { en: "15+ Years Experience", hi: "15+ वर्षों का अनुभव" }
      },
      {
        name: { en: "Dr. Pratibha Sahu", hi: "डॉ. प्रतिभा साहू" },
        role: { en: "Consultant Obstetrician (MBBS, DGO)", hi: "परामर्शदाता प्रसूति रोग विशेषज्ञ (MBBS, DGO)" },
        experience: { en: "10+ Years Experience", hi: "10+ वर्षों का अनुभव" }
      }
    ],
    features: {
      en: [
        "Advanced Painless Delivery & Modular Labor Suites",
        "High-risk Pregnancy Care & Antenatal Education Classes",
        "Keyhole Laparoscopic Gynecological Surgeries",
        "Infertility Evaluation and Comprehensive Counselling",
        "Polycystic Ovarian Syndrome (PCOS) & Menopause Clinics"
      ],
      hi: [
        "उन्नत दर्द रहित प्रसव और शानदार मॉड्यूलर लेबर सुइट्स",
        "उच्च जोखिम वाली गर्भावस्था देखभाल और प्रसव पूर्व शिक्षा कक्षाएं",
        "दूरबीन पद्धति (लैप्रोस्कोपिक) द्वारा स्त्री रोग संबंधी सर्जरी",
        "बांझपन मूल्यांकन और व्यापक परामर्श",
        "पॉलीसिस्टिक ओवेरियन सिंड्रोम (PCOS) और रजोनिवृत्ति (मेनोपॉज) क्लीनिक"
      ]
    }
  },
  {
    id: "ped",
    name: {
      en: "Pediatrics & Neonatology",
      hi: "बाल रोग और नवजात शिशु विभाग"
    },
    icon: "Baby",
    shortDesc: {
      en: "Expert childcare, routine vaccinations, critical newborn intensive care (NICU), and pediatric emergencies.",
      hi: "विशेषज्ञ बाल स्वास्थ्य देखभाल, नियमित टीकाकरण, गहन नवजात शिशु चिकित्सा (NICU) और बाल आपातकालीन सेवाएं।"
    },
    fullDesc: {
      en: "Dedicated to the medical care of infants, children, and adolescents. Backed by an advanced Neonatal Intensive Care Unit (NICU) with modern warmers, phototherapy, and monitors, our pediatric specialists are equipped to handle premature babies, neonatal infections, and critical pediatric illness with around-the-clock emergency support.",
      hi: "शिशुओं, बच्चों और किशोरों की चिकित्सा देखभाल के लिए पूर्णतः समर्पित। आधुनिक वार्मर, फोटोथेरेपी और मॉनिटर्स से सुसज्जित एक उन्नत नवजात गहन चिकित्सा इकाई (NICU) के साथ, हमारे बाल रोग विशेषज्ञ समय से पहले जन्मे बच्चों, नवजात संक्रमणों और चौबीसों घंटे आपातकालीन सहायता के साथ गंभीर बीमारियों के इलाज में सक्षम हैं।"
    },
    doctors: [
      {
        name: { en: "Dr. S. K. Singh", hi: "डॉ. एस. के. सिंह" },
        role: { en: "Senior Pediatrician & Neonatologist (MD Pediatrics)", hi: "वरिष्ठ बाल रोग विशेषज्ञ और नवजात रोग विशेषज्ञ (MD बाल रोग)" },
        experience: { en: "18+ Years Experience", hi: "18+ वर्षों का अनुभव" }
      }
    ],
    features: {
      en: [
        "Fully equipped Level-II Neonatal Intensive Care Unit (NICU)",
        "Comprehensive Immunization & Vaccination Schedules",
        "Growth and Development Monitoring Clinic",
        "Pediatric Asthma, Allergy, and Nutrition Counselling",
        "24/7 Dedicated Pediatric Emergency Support"
      ],
      hi: [
        "पूरी तरह से सुसज्जित लेवल-II नवजात गहन चिकित्सा इकाई (NICU)",
        "व्यापक टीकाकरण और इम्यूनाइजेशन चार्ट",
        "शारीरिक विकास और वृद्धि निगरानी क्लीनिक",
        "बाल अस्थमा, एलर्जी और पोषण संबंधी परामर्श",
        "24/7 समर्पित बाल आपातकालीन चिकित्सा सहायता"
      ]
    }
  },
  {
    id: "med",
    name: {
      en: "General Medicine & Diabetology",
      hi: "सामान्य चिकित्सा और मधुमेह विभाग"
    },
    icon: "Activity",
    shortDesc: {
      en: "Comprehensive diagnosis of acute diseases, diabetes management, hypertension, and primary care.",
      hi: "तीव्र संक्रामक रोगों का व्यापक निदान, मधुमेह प्रबंधन, उच्च रक्तचाप (बीपी) और सामान्य प्राथमिक उपचार।"
    },
    fullDesc: {
      en: "Our General Medicine department is the cornerstone of comprehensive health screening and adult disease management. We offer expert diagnosis and customized treatments for chronic diseases like diabetes mellitus, clinical hypertension, thyroid disorders, infectious diseases, chest infections, and lipid disorders, prioritizing preventative healthcare and lifestyle modifications.",
      hi: "हमारा सामान्य चिकित्सा विभाग व्यापक स्वास्थ्य जांच और वयस्कों की बीमारियों के प्रबंधन की आधारशिला है। हम मधुमेह (शुगर), उच्च रक्तचाप (बीपी), थायराइड विकार, संक्रामक बुखार, छाती के संक्रमण और कोलेस्ट्रॉल विकारों जैसी पुरानी बीमारियों के लिए विशेषज्ञ निदान और अनुकूलित उपचार प्रदान करते हैं, जिसमें प्रिवेंटिव हेल्थकेयर और जीवनशैली में बदलाव को प्राथमिकता दी जाती है।"
    },
    doctors: [
      {
        name: { en: "Dr. Anil Sharma", hi: "डॉ. अनिल शर्मा" },
        role: { en: "Senior Physician & Diabetologist (MD General Medicine)", hi: "वरिष्ठ फिजिशियन और मधुमेह विशेषज्ञ (MD सामान्य चिकित्सा)" },
        experience: { en: "14+ Years Experience", hi: "14+ वर्षों का अनुभव" }
      }
    ],
    features: {
      en: [
        "Advanced Diabetes Management & Counselling",
        "Hypertension, Thyroid & Cardiac Screening Modules",
        "Comprehensive Preventive Health Check-up Packages",
        "Treatment of Seasonal Infections, Dengue, Malaria, Typhoid",
        "Adult Vaccination and Wellness Programs"
      ],
      hi: [
        "उन्नत मधुमेह प्रबंधन, इंसुलिन अनुकूलन और परामर्श",
        "उच्च रक्तचाप, थायराइड और कार्डियक स्क्रीनिंग मॉड्यूल",
        "व्यापक निवारक स्वास्थ्य जांच पैकेज",
        "मौसमी संक्रमण, डेंगू, मलेरिया, टाइफाइड और संक्रामक रोगों का इलाज",
        "वयस्क टीकाकरण और स्वास्थ्य कल्याण कार्यक्रम"
      ]
    }
  },
  {
    id: "surg",
    name: {
      en: "General & Laparoscopic Surgery",
      hi: "सामान्य एवं लैप्रोस्कोपिक सर्जरी विभाग"
    },
    icon: "Scissors",
    shortDesc: {
      en: "Minimally invasive keyhole surgeries for hernia, appendix, gallbladder, and trauma care.",
      hi: "हर्निया, अपेंडिक्स, पित्त की थैली की पथरी और अन्य आघात देखभाल के लिए दूरबीन पद्धति द्वारा आधुनिक सर्जरी।"
    },
    fullDesc: {
      en: "Equipped with state-of-the-art surgical suites and high-definition laparoscopy systems, this department excels in minimally invasive procedures. Minimally invasive (keyhole) surgeries mean smaller incisions, negligible bleeding, significantly less post-operative pain, and much faster recovery for operations like laparoscopic cholecystectomy, appendectomy, and hernia repairs.",
      hi: "अत्याधुनिक सर्जिकल सुइट्स और हाई-डेफिनिशन लैप्रोस्कोपी सिस्टम से सुसज्जित, यह विभाग की-होल प्रक्रियाओं में उत्कृष्ट है। लैप्रोस्कोपिक सर्जरी का अर्थ है छोटे चीरे, नगण्य रक्तस्राव, सर्जरी के बाद बहुत कम दर्द और गॉलब्लेडर पथरी, अपेंडिक्स और हर्निया जैसी ऑपरेशनों के लिए बहुत तेज रिकवरी।"
    },
    doctors: [
      {
        name: { en: "Dr. V. K. Bhandari", hi: "डॉ. वी. के. भंडारी" },
        role: { en: "Consultant General & Minimal Access Surgeon (MS, FMAS)", hi: "परामर्शदाता सामान्य एवं लैप्रोस्कोपिक सर्जन (MS, FMAS)" },
        experience: { en: "16+ Years Experience", hi: "16+ वर्षों का अनुभव" }
      }
    ],
    features: {
      en: [
        "Laparoscopic Gallbladder Stone Removal (Cholecystectomy)",
        "Keyhole Surgery for Acute Appendicitis (Appendectomy)",
        "Tension-free Mesh Repairs for Hernia (Laparoscopic & Open)",
        "Advanced Laser treatment for Piles, Fissure, Fistula",
        "Emergency Trauma, Accident & Wound Reconstruction Care"
      ],
      hi: [
        "दूरबीन द्वारा पित्त की थैली की पथरी निकालना (Cholecystectomy)",
        "तीव्र अपेंडिक्स के लिए की-होल सर्जरी (Appendectomy)",
        "हर्निया के लिए तनाव मुक्त मेश रिपेयर (लेप्रोस्कोपिक और ओपन)",
        "बवासीर, फिशर, फिस्टुला के लिए उन्नत दर्दरहित लेजर उपचार",
        "आपातकालीन आघात, दुर्घटना और गंभीर चोट पुनर्निर्माण देखभाल"
      ]
    }
  },
  {
    id: "ortho",
    name: {
      en: "Orthopaedics & Joint Disorders",
      hi: "हड्डी, जोड़ एवं रीढ़ की हड्डी विभाग"
    },
    icon: "Bone",
    shortDesc: {
      en: "Fracture treatment, joint pain therapy, arthritis care, spinal conditions, and physiotherapy.",
      hi: "हड्डी टूटने का इलाज, जोड़ों के दर्द का उपचार, गठिया की देखभाल, रीढ़ की स्थिति और फिजियोथेरेपी।"
    },
    fullDesc: {
      en: "Our Orthopaedics department treats bone, joint, and ligament disorders. From emergency fracture management and plaster application to complex joint replacement surgeries, arthritis management, and spinal alignment care. Our team ensures patients of all ages regain their mobility and strength with supportive post-surgery rehabilitation.",
      hi: "हमारा हड्डी रोग विभाग हड्डियों, जोड़ों और लिगामेंट विकारों का इलाज करता है। आपातकालीन फ्रैक्चर प्रबंधन और प्लास्टर लगाने से लेकर जटिल जोड़ों के रिप्लेसमेंट, गठिया प्रबंधन और रीढ़ की हड्डी के संरेखण देखभाल तक। हमारी टीम यह सुनिश्चित करती है कि सभी उम्र के मरीज सहायक फिजियोथेरेपी के साथ अपनी गतिशीलता और ताकत वापस हासिल करें।"
    },
    doctors: [
      {
        name: { en: "Dr. Rajesh Dewangan", hi: "डॉ. राजेश देवांगन" },
        role: { en: "Visiting Consultant Orthopedic Surgeon (MS Ortho)", hi: "विजिटिंग कंसलटेंट हड्डी रोग सर्जन (MS Ortho)" },
        experience: { en: "12+ Years Experience", hi: "12+ वर्षों का अनुभव" }
      }
    ],
    features: {
      en: [
        "24/7 Fracture reduction, plastering & complex trauma fixation",
        "Arthritis, Gout, and Chronic Joint Pain Management",
        "Spine, Back pain & Sciatica treatment modules",
        "Ligament tear, Sports Injuries & Arthroscopy consultation",
        "In-house dedicated Physiotherapy and Muscle Rehabilitation"
      ],
      hi: [
        "24/7 फ्रैक्चर उपचार, प्लास्टर और जटिल हड्डी सर्जरी",
        "गठिया, यूरिक एसिड (गाउट) और पुराने जोड़ों के दर्द का प्रबंधन",
        "रीढ़ की हड्डी, पीठ दर्द और साइटिका उपचार मॉड्यूल",
        "लिगामेंट टूटना, खेल चोटें और आर्थ्रोस्कोपी परामर्श",
        "अस्पताल के अंदर समर्पित फिजियोथेरेपी और पुनर्वास इकाई"
      ]
    }
  }
];

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  source: string;
  content: Record<Language, string>;
  tag: string;
}

export const REVIEWS: Review[] = [
  {
    id: "rev1",
    author: "Satish Kumar Sahu",
    rating: 5,
    date: "2 weeks ago",
    source: "Google Review",
    content: {
      en: "Saubhagya Hospital has the best gynaecologists in Raipur. Dr. Rashmi Bhandari performed my wife's delivery very safely. The nurse staff is highly caring and polite. Hospital is very neat and clean.",
      hi: "सौभाग्य हॉस्पिटल में रायपुर के सर्वश्रेष्ठ स्त्री रोग विशेषज्ञ हैं। डॉ. रश्मी भंडारी ने मेरी पत्नी की डिलीवरी बहुत सुरक्षित तरीके से की। नर्स स्टाफ बहुत मददगार और विनम्र है। अस्पताल बहुत साफ सुथरा है।"
    },
    tag: "Maternity"
  },
  {
    id: "rev2",
    author: "Priyanka Dewangan",
    rating: 5,
    date: "1 month ago",
    source: "Google Review",
    content: {
      en: "Highly recommended for pediatric doctor. My infant had severe fever and respiratory issues at midnight. Dr. S.K. Singh attended us immediately. Level 2 NICU is very well maintained. Extremely thankful to Saubhagya team.",
      hi: "बच्चों के डॉक्टर के लिए बहुत अनुशंसित। मेरे नवजात शिशु को आधी रात को तेज बुखार और सांस की तकलीफ थी। डॉ. एस.के. सिंह ने तुरंत हमारा ध्यान रखा। लेवल 2 एनआईसीयू बहुत अच्छे से संभला हुआ है।"
    },
    tag: "Pediatrics"
  },
  {
    id: "rev3",
    author: "Ramesh Verma",
    rating: 5,
    date: "3 weeks ago",
    source: "Google Review",
    content: {
      en: "Had my gallbladder laparoscopic stone surgery here by Dr. V. K. Bhandari. I was discharged within 2 days with very minimal pain. The packages are highly affordable and transparent, no extra charges asked. Excellent hospital in Raipur.",
      hi: "डॉ. वी. के. भंडारी द्वारा पित्त की थैली की पथरी की दूरबीन वाली सर्जरी कराई। मुझे बहुत कम दर्द के साथ 2 दिनों के भीतर छुट्टी दे दी गई। उपचार पैकेज बहुत किफायती और पारदर्शी हैं, कोई अतिरिक्त शुल्क नहीं।"
    },
    tag: "Surgery"
  },
  {
    id: "rev4",
    author: "Anjali Tiwari",
    rating: 4,
    date: "2 months ago",
    source: "Google Review",
    content: {
      en: "Very professional doctors and staff in Shivanand Nagar. Dr. Anil Sharma explained diabetes medicines so well. The appointment system is fast, and waiting time is low compared to other big corporate hospitals.",
      hi: "शिवानंद नगर में बहुत ही पेशेवर डॉक्टर और स्टाफ। डॉ. अनिल शर्मा ने मधुमेह की दवाओं को बहुत अच्छी तरह से समझाया। अपॉइंटमेंट सिस्टम तेज है और बड़े कॉर्पोरेट अस्पतालों की तुलना में प्रतीक्षा समय कम है।"
    },
    tag: "General Medicine"
  },
  {
    id: "rev5",
    author: "Surendra Yadav",
    rating: 5,
    date: "1 month ago",
    source: "Google Review",
    content: {
      en: "Best emergency hospital in this area. My father had a sudden fracture at night. The orthopedics team did plastering instantly and gave proper medicine. Very good coordination and polite behaviour.",
      hi: "इस क्षेत्र का सबसे अच्छा आपातकालीन अस्पताल। मेरे पिताजी को रात में अचानक फ्रैक्चर हो गया था। हड्डी रोग की टीम ने तुरंत प्लास्टर किया और सही दवा दी। बहुत बढ़िया समन्वय और विनम्र व्यवहार।"
    },
    tag: "Orthopaedics"
  }
];

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientAge: number;
  patientGender: string;
  departmentId: string;
  departmentName: string;
  date: string;
  timeSlot: string;
  symptoms: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  bookedAt: string;
}
