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
  { category: 'Archive' },
] 

export interface Course {
  courseName: string;
  category: string;
  courseId: number;
	module : string;
	moduleUrl: string;
  href?: string;
}
export interface Lehrstuhl {
  courseName: string;
  category: string;
  courseId?: number;
	module : string;
	moduleUrl: string;
  href: string;
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
    category: '1 Sem',
    courseId: 1,
		module: 'Praktisch',
		moduleUrl: iconPraktisch,
  },
  {    
    courseName: 'Technische Informatik',
    category: '1 Sem',
    courseId: 2,
		module: 'Technisch',
		moduleUrl: iconTechnisch
  },
  {
    courseName: 'Diskrete Strukturen',
    category: '1 Sem',
    courseId: 3,
		module: 'Mathematik',
		moduleUrl: iconMathematik
  },
  {    
    courseName: 'Analysis für Informatiker',
    category: '1 Sem',
    courseId: 4,
		module: 'Mathematik',
		moduleUrl: iconMathematik
  },{
    courseName: 'Datenstrukturen und Algorithmen',
    category: '2 Sem',
    courseId: 5,
		module: 'Praktisch',
		moduleUrl: iconPraktisch
  },
  {    
    courseName: 'Betriebssysteme und Systemsoftware',
    category: '2 Sem',
    courseId: 6,
		module: 'Technisch',
		moduleUrl: iconTechnisch
  },
  {    
    courseName: 'Formale Systeme, Automaten, Prozesse',
    category: '2 Sem',
    courseId: 7,
		module: 'Theoretisch',
		moduleUrl: iconTheoretisch
  },
  {    
    courseName: 'Lineare Algebra',
    category: '2 Sem',
    courseId: 8,
		module: 'Mathematik',
		moduleUrl: iconMathematik
  },
  {    
    courseName: 'Proseminar',
    category: '2 Sem',
    courseId: 9,
		module: 'Sonstige',
		moduleUrl: iconSonstige
  },
  {    
    courseName: 'Einführung in die Softwaretechnik',
    category: '3 Sem',
    courseId: 10,
		module: 'Praktisch',
		moduleUrl: iconPraktisch
  },
  {    
    courseName: 'System programmierung (PSP)',
    category: '3 Sem',
    courseId: 11,
		module: 'Praktisch',
		moduleUrl: iconPraktisch
  },
  {    
    courseName: 'Daten kommunikation',
    category: '3 Sem',
    courseId: 12,
		module: 'Technisch',
		moduleUrl: iconTechnisch
  },
  {    
    courseName: 'Berechenbarkeit und Komplexität',
    category: '3 Sem',
    courseId: 13,
		module: 'Teoretisch',
		moduleUrl: iconTheoretisch
  },
  {    
    courseName: 'Wahlpflicht-/ Anwendungsbereich',
    category: '3 Sem',
    courseId: 14,
		module: 'Wahlpflicht',
		moduleUrl: iconWahlpflicht
  },
  {    
    courseName: 'Datenbanken und Informationssysteme',
    category: '4 Sem',
    courseId: 15,
		module: 'Praktisch',
		moduleUrl: iconPraktisch
  },
  {    
    courseName: 'Mathematische Logik',
    category: '4 Sem',
    courseId: 16,
		module: 'Theoretisch',
		moduleUrl: iconTheoretisch
  },
  {    
    courseName: 'Einführung in die angewandte Stochstik',
    category: '4 Sem',
    courseId: 17,
		module: 'Mathematik',
		moduleUrl: iconMathematik
  },
  {    
    courseName: 'Wahlpflicht-/ Anwendungsbereich',
    category: '4 Sem',
    courseId: 18,
		module: 'Wahlpflicht',
		moduleUrl: iconWahlpflicht
  },
  {    
    courseName: 'Machine Learning and Data Science',
    category: '5 Sem',
    courseId: 19,
		module: 'Praktisch',
		moduleUrl: iconPraktisch
  },
  {    
    courseName: 'Seminar',
    category: '5 Sem',
    courseId: 20,
		module: 'Sonstige',
		moduleUrl: iconSonstige
  },
  {    
    courseName: 'Nicht- technisches Wahlfach',
    category: '5 Sem',
    courseId: 21,
		module: 'Wahlpflicht',
		moduleUrl: iconWahlpflicht
  },
  {    
    courseName: 'Wahlpflicht-/ Anwendungsbereich',
    category: '5 Sem',
    courseId: 22,
		module: 'Wahlpflicht',
		moduleUrl: iconWahlpflicht
  },
  {    
    courseName: 'Wahlpflicht-/ Anwendungsbereich',
    category: '6 Sem',
    courseId: 23,
		module: 'Wahlpflicht',
		moduleUrl: iconWahlpflicht
  },
  {    
    courseName: 'Bachelorarbeit',
    category: '6 Sem',
    courseId: 24,
		module: 'Sonstige',
		moduleUrl: iconSonstige
  },
]

export const LEHRSTUHLE: Lehrstuhl[] = [  
  {    
    courseName: 'Anfrage "Support Abschlussarbeit',
    category: 'Thesis',
    courseId: 25,
		module: 'SC',
		moduleUrl: "../../assets/logos/sc.svg",
    href: "https://pa.informatik.rwth-aachen.de/login?next=%2Fapplication%2Fissue-finding-thesis&notice=true"
  },
  {    
    courseName: 'Algorithmen und Komplexität',
    category: 'Thesis',
    courseId: 26,
		module: 'i1',
		moduleUrl: "../../assets/logos/i1-1-t.svg",
    href: "https://algo.rwth-aachen.de/bachelorarbeiten.py"
  },
  {    
    courseName: 'Theoretical Computer Science',
    category: 'Thesis',
    courseId: 27,
		module: 'i1- TCS',
		moduleUrl: "../../assets/logos/i1-tcs-t.svg",
    href: "https://tcs.rwth-aachen.de/index.php"
  },
  {    
    courseName: 'Software modellierung und Verifikation',
    category: 'Thesis',
    courseId: 28,
		module: 'i2 - MOVES',
		moduleUrl: "../../assets/logos/i2-moves-t.svg",
    href: "https://moves.rwth-aachen.de/teaching/thesis-projects/"
  },
  {    
    courseName: 'Theory of Hybrid Systems',
    category: 'Thesis',
    courseId: 29,
		module: 'i2',
		moduleUrl: "../../assets/logos/i2-2-t.svg",
    href: "https://ths.rwth-aachen.de/theses/"
  },
  {    
    courseName: 'Software Engineering',
    category: 'Thesis',
    courseId: 30,
		module: 'i3 - SE',
		moduleUrl: "../../assets/logos/i3-se-t.svg",
    href: "https://www.se-rwth.de/theses/"
  },
  {    
    courseName: 'Software Construction',
    category: 'Thesis',
    courseId: 31,
		module: 'i3 - SWE',
		moduleUrl: "../../assets/logos/i3-swc-t.svg",
    href: "https://swc.rwth-aachen.de/theses/open/"
  },
  {    
    courseName: 'Communication and Distributed Systems',
    category: 'Thesis',
    courseId: 32,
		module: 'i4 - COMSYS',
		moduleUrl: "../../assets/logos/i4-comsys-t.svg",
    href: "https://www.comsys.rwth-aachen.de/teaching/available-theses"
  },
  {    
    courseName: 'IT-Security',
    category: 'Thesis',
    courseId: 33,
		module: 'i4 - IT',
		moduleUrl: "../../assets/logos/i4-it-t.svg",
    href: "https://www.itsec.rwth-aachen.de/cms/ITSEC/Studium/~ehprm/Abschlussarbeiten/"
  },
  {    
    courseName: 'Computational Network Science',
    category: 'Thesis',
    courseId: 34,
		module: 'i4',
		moduleUrl: "../../assets/logos/i4-t.svg",
    href: "https://www.netsci.rwth-aachen.de/cms/netsci/Studium/~lzyay/research-papers-and-theses/"
  },
  {    
    courseName: 'Information Systems and Databases',
    category: 'Thesis',
    courseId: 35,
		module: 'i5 - DBIS',
		moduleUrl: "../../assets/logos/i5-dbis-t.svg",
    href: "https://dbis.rwth-aachen.de/dbis/index.php/academics/thesis-projects/"
  },  
  {    
    courseName: 'Knowledge-Based Systems Group',
    category: 'Thesis',
    courseId: 36,
		module: 'i5 - KBSG',
		moduleUrl: "../../assets/logos/i5-kbsg-t.svg",
    href: "https://kbsg.rwth-aachen.de/theses/open_theses/"
  },
  {    
    courseName: 'Human Language Technology and Pattern Recognition',
    category: 'Thesis',
    courseId: 37,
		module: 'i6',
		moduleUrl: "../../assets/logos/i6-t.svg",
    href: "https://www-i6.informatik.rwth-aachen.de/web/OpenPositions/index.html"
  },
  {    
    courseName: 'Logic and Theory of Discrete Systems',
    category: 'Thesis',
    courseId: 38,
		module: 'i7',
		moduleUrl: "../../assets/logos/i7-t.svg",
    href: "https://www.lics.rwth-aachen.de/cms/LICS/Studium/Abschluss-Arbeiten/~rund/Bachelorarbeiten/lidx/1/"
  },
  {    
    courseName: 'Mathematische Grundlagen der Informatik',
    category: 'Thesis',
    courseId: 39,
		module: 'i7 - mgi',
		moduleUrl: "../../assets/logos/i7-mgi-t.svg",
    href: "https://logic.rwth-aachen.de/index.html.de"
  },
  {    
    courseName: 'Combinatorial Optimization',
    category: 'Thesis',
    courseId: 40,
		module: 'i7',
		moduleUrl: "../../assets/logos/i7-co-t.svg",
    href: "https://combi.rwth-aachen.de/teaching.php"
  },
  {    
    courseName: 'Computer Graphics and Multimedia',
    category: 'Thesis',
    courseId: 41,
		module: 'i8',
		moduleUrl: "../../assets/logos/i8-cgm-t.svg",
    href: "https://www.graphics.rwth-aachen.de/theses/"
  },
  {    
    courseName: 'Computer Animation',
    category: 'Thesis',
    courseId: 42,
		module: 'i8',
		moduleUrl: "../../assets/logos/i8-ca-t.svg",
    href: "https://animation.rwth-aachen.de/theses/"
  },
  {    
    courseName: 'Process and Data Science',
    category: 'Thesis',
    courseId: 43,
		module: 'i9 - PADS',
		moduleUrl: "../../assets/logos/i9-pads-t.svg",
    href: "https://www.pads.rwth-aachen.de/cms/PADS/Studium/~pncl/Abschlussarbeiten/lidx/1/"
  },
  {    
    courseName: 'Learning Technologies',
    category: 'Thesis',
    courseId: 44,
		module: 'i9',
		moduleUrl: "../../assets/logos/i9-t.svg",
    href: "https://learntech.rwth-aachen.de/cms/LearnTech/Studium/Studien-und-Abschlussarbeiten/~jixr/Offene-Abschlussarbeiten/lidx/1/"
  },
  {    
    courseName: 'Media Computing and Human-Computer Interaction',
    category: 'Thesis',
    courseId: 45,
		module: 'i10 - HCI',
		moduleUrl: "../../assets/logos/i10-hci-t.svg",
    href: "https://hci.rwth-aachen.de/jobs"
  },
  {    
    courseName: 'Software for Embedded Systems',
    category: 'Thesis',
    courseId: 46,
		module: 'i11',
		moduleUrl: "../../assets/logos/i11-t.svg",
    href: "https://embedded.rwth-aachen.de/doku.php?id=lehre:abschlussarbeiten"
  },
  {    
    courseName: 'High Performance Computing',
    category: 'Thesis',
    courseId: 47,
		module: 'i12',
		moduleUrl: "../../assets/logos/i12-hp-t.svg",
    href: "https://www.i12.rwth-aachen.de/cms/Lehrstuhl-fuer-Informatik/Studium/Studien-und-Abschlussarbeiten/~noar/HPC/lidx/1/"
  },
  {    
    courseName: 'Software and Tools for Computational Engineering',
    category: 'Thesis',
    courseId: 48,
		module: 'i12',
		moduleUrl: "../../assets/logos/i12-st-t.svg",
    href: "https://www.i12.rwth-aachen.de/cms/Lehrstuhl-fuer-Informatik/Studium/Studien-und-Abschlussarbeiten/~noas/STCE/lidx/1/"
  },
  {    
    courseName: 'Virtual Reality and Immersive Visualization',
    category: 'Thesis',
    courseId: 49,
		module: 'i12',
		moduleUrl: "../../assets/logos/i12-vr-t.svg",
    href: "http://www.vr.rwth-aachen.de/theses/"
  },
  {    
    courseName: 'Computer Vision',
    category: 'Thesis',
    courseId: 50,
		module: 'i13',
		moduleUrl: "../../assets/logos/i13-cv-t.svg",
    href: "https://www.vision.rwth-aachen.de/theses/"
  },
  {    
    courseName: 'List of Research Areas',
    category: 'Thesis',
    courseId: 51,
		module: 'Informatik',
		moduleUrl: "../../assets/logos/informatik.svg",
    href: "https://www.informatik.rwth-aachen.de/cms/informatik/Forschung/Forschungsbereiche/~mrys/Liste-der-Forschungsbereiche/?lidx=1"
  },
]
