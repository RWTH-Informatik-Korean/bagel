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

export const COURSES: Course[] = [
  {
    courseName: 'Programmierung',
    category: '1 Semester',
    courseId: 1,
		module: 'Praktische',
		moduleUrl: '../../assets/logos/MATHEMATIK.svg',
  },
  {    
    courseName: 'Technische Informatik',
    category: '1 Semester',
    courseId: 2,
		module: 'Technische',
		moduleUrl: '../../assets/logos/PRAKTISCH.svg',
  },
  {
    courseName: 'Diskrete Strukturen',
    category: '1 Semester',
    courseId: 3,
		module: 'Mathematik',
		moduleUrl: '../../assets/logos/SONSTIGE.svg',
  },
  {    
    courseName: 'Analysis für Informatiker',
    category: '1 Semester',
    courseId: 4,
		module: 'Mathematik',
		moduleUrl: '../../assets/logos/TECHNISCH.svg',
  },{
    courseName: 'Datenstrukturen und Algorithmen',
    category: '2 Semester',
    courseId: 5,
		module: 'Praktische',
		moduleUrl: '../../assets/logos/THEORETISCH.svg',
  },
  {    
    courseName: 'Betriebssysteme und Systemsoftware',
    category: '2 Semester',
    courseId: 6,
		module: 'Technische',
		moduleUrl: '../../assets/logos/WHALPFLICHT.svg',
  },
  // {
  //   courseName: 'Formale Systeme, Automaten, Prozesse',
  //   category: '2 Semester',
  //   courseId: 7,
	// 	module: 'Theoretische',
	// 	moduleUrl: 'URL',
  // },
  // {    
  //   courseName: 'Lineare Algebra',
  //   category: '2 Semester',
  //   courseId: 8,
	// 	module: 'Mathematik',
	// 	moduleUrl: 'URL',
  // },
  // {    
  //   courseName: 'Proseminar',
  //   category: '2 Semester',
  //   courseId: 9,
	// 	module: 'Sonstige',
	// 	moduleUrl: 'URL',
  // }

]
