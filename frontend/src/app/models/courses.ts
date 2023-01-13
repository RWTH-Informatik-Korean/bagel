export interface Category {
  category: string;
}

export const CATEGORIES: Category[] = [
  { category: '1 Sem' },
  { category: '2 Sem' },
  { category: '3 Sem' },
  { category: '4 Sem' },
  { category: '5 Sem' },
  { category: '6 Sem' },
  { category: 'Thesis' },
  { category: 'Study' },
] 

export interface Course {
  courseName: string;
  category: string;
  courseId: number;
}

export interface Course {
  courseName: string;
  category: string;
  courseId: number;
	module : string;
	moduleUrl: string;
}

// icon src for each module
const iconMathematik: string = "../../assets/logos/MATHEMATIK.svg";
const iconTheoretisch: string = "../../assets/logos/THEORETISCH.svg";
const iconPraktisch: string = "../../assets/logos/PRAKTISCH.svg";
const iconTechnisch: string = "../../assets/logos/TECHNISCH.svg";
const iconWahlpflicht: string = "../../assets/logos/WAHLPFLICHT.svg";
const iconSonstige: string = "../../assets/logos/SONSTIGE.svg";

export const COURSES: Course[] = [
  {
    courseName: 'Programmierung',
    category: '1 Semester',
    courseId: 1,
		module: 'Praktisch',
		moduleUrl: iconPraktisch
  },
  {    
    courseName: 'Technische Informatik',
    category: '1 Semester',
    courseId: 2,
		module: 'Technisch',
		moduleUrl: iconTechnisch
  },
  {
    courseName: 'Diskrete Strukturen',
    category: '1 Semester',
    courseId: 3,
		module: 'Mathematik',
		moduleUrl: iconMathematik
  },
  {    
    courseName: 'Analysis für Informatiker',
    category: '1 Semester',
    courseId: 4,
		module: 'Mathematik',
		moduleUrl: iconMathematik
  },{
    courseName: 'Datenstrukturen und Algorithmen',
    category: '2 Semester',
    courseId: 5,
		module: 'Praktisch',
		moduleUrl: iconPraktisch
  },
  {    
    courseName: 'Betriebssysteme und Systemsoftware',
    category: '2 Semester',
    courseId: 6,
		module: 'Technisch',
		moduleUrl: iconTechnisch
  },
  {    
    courseName: 'Formale Systeme, Automaten, Prozesse',
    category: '2 Semester',
    courseId: 7,
		module: 'Theoretisch',
		moduleUrl: iconTheoretisch
  },
  {    
    courseName: 'Lineare Algebra',
    category: '2 Semester',
    courseId: 8,
		module: 'Mathematik',
		moduleUrl: iconMathematik
  },
  {    
    courseName: 'Proseminar',
    category: '2 Semester',
    courseId: 9,
		module: 'Sonstige',
		moduleUrl: iconSonstige
  },
  {    
    courseName: 'Einführung in die Softwaretechnik',
    category: '3 Semester',
    courseId: 10,
		module: 'Praktisch',
		moduleUrl: iconPraktisch
  },
  {    
    courseName: 'System programmierung (PSP)',
    category: '3 Semester',
    courseId: 11,
		module: 'Praktisch',
		moduleUrl: iconPraktisch
  },
  {    
    courseName: 'Daten kommunikation',
    category: '3 Semester',
    courseId: 12,
		module: 'Technisch',
		moduleUrl: iconTechnisch
  },
  {    
    courseName: 'Berechenbarkeit und Komplexität',
    category: '3 Semester',
    courseId: 13,
		module: 'Teoretisch',
		moduleUrl: iconTheoretisch
  },
  {    
    courseName: 'Wahlpflicht-/ Anwendungsbereich',
    category: '3 Semester',
    courseId: 14,
		module: 'Wahlpflicht',
		moduleUrl: iconWahlpflicht
  },
  {    
    courseName: 'Datenbanken und Informationssysteme',
    category: '4 Semester',
    courseId: 15,
		module: 'Praktisch',
		moduleUrl: iconPraktisch
  },
  {    
    courseName: 'Mathematische Logik',
    category: '4 Semester',
    courseId: 16,
		module: 'Theoretisch',
		moduleUrl: iconTheoretisch
  },
  {    
    courseName: 'Einführung in die angewandte Stochstik',
    category: '4 Semester',
    courseId: 17,
		module: 'Mathematik',
		moduleUrl: iconMathematik
  },
  {    
    courseName: 'Wahlpflicht-/ Anwendungsbereich',
    category: '4 Semester',
    courseId: 18,
		module: 'Wahlpflicht',
		moduleUrl: iconWahlpflicht
  },
  {    
    courseName: 'Machine Learning and Data Science',
    category: '5 Semester',
    courseId: 19,
		module: 'Praktisch',
		moduleUrl: iconPraktisch
  },
  {    
    courseName: 'Seminar',
    category: '5 Semester',
    courseId: 20,
		module: 'Sonstige',
		moduleUrl: iconSonstige
  },
  {    
    courseName: 'Nicht- technisches Wahlfach',
    category: '5 Semester',
    courseId: 21,
		module: 'Wahlpflicht',
		moduleUrl: iconWahlpflicht
  },
  {    
    courseName: 'Wahlpflicht-/ Anwendungsbereich',
    category: '5 Semester',
    courseId: 22,
		module: 'Wahlpflicht',
		moduleUrl: iconWahlpflicht
  },
  {    
    courseName: 'Wahlpflicht-/ Anwendungsbereich',
    category: '6 Semester',
    courseId: 23,
		module: 'Wahlpflicht',
		moduleUrl: iconWahlpflicht
  },
  {    
    courseName: 'Bachelorarbeit',
    category: '6 Semester',
    courseId: 24,
		module: 'Sonstige',
		moduleUrl: iconSonstige
  }
]
