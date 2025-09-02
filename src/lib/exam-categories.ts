
import type { ExamDetails } from '@/lib/types';

interface ExamCategory {
  category: string;
  exams: ExamDetails[];
}

export const examCategories: ExamCategory[] = [
  {
    category: 'Civil Services & Government Jobs',
    exams: [
            {
              examId: 'upsc-civil-services',
              examName: 'UPSC Civil Services Exam (IAS, IPS, IFS, etc.)',
              description: 'Central Civil Services of the Government of India.',
              stages: [
                {
                  stageId: 'prelims',
                  stageName: 'Preliminary Examination',
                  papers: [
                    {
                      paperId: 'GS-Paper-I',
                      paperName: 'General Studies Paper I',
                      type: 'Objective (MCQ)',
                      duration: '2 hours',
                      totalMarks: 200,
                      totalQuestions: 100,
                      negativeMarking: '1/3 per wrong answer',
                      topics: [
                        'Current events of national and international importance',
                        'History of India and Indian National Movement',
                        'Indian & World Geography',
                        'Indian Polity and Governance',
                        'Economic and Social Development',
                        'Environmental Ecology, Biodiversity & Climate Change',
                        'General Science',
                      ],
                    },
                    {
                      paperId: 'CSAT',
                      paperName: 'General Studies Paper II (CSAT)',
                      type: 'Objective (MCQ, Qualifying)',
                      duration: '2 hours',
                      totalMarks: 200,
                      totalQuestions: 80,
                      negativeMarking: '1/3 per wrong answer',
                      qualifyingMarks: '33%',
                      topics: [
                        'Comprehension',
                        'Interpersonal and communication skills',
                        'Logical reasoning & analytical ability',
                        'Decision making & problem solving',
                        'General mental ability',
                        'Basic numeracy and data interpretation (Class X level)',
                      ],
                    },
                  ],
                },
                {
                  stageId: 'mains',
                  stageName: 'Main Examination',
                  papers: [
                    {
                      paperId: 'A',
                      paperName: 'Paper A – Indian Language (Qualifying)',
                      type: 'Descriptive',
                      duration: '3 hours',
                      totalMarks: 300,
                      qualifying: true,
                      notes: 'Marks not counted for ranking; minimum 25% required to qualify',
                    },
                    {
                      paperId: 'B',
                      paperName: 'Paper B – English (Qualifying)',
                      type: 'Descriptive',
                      duration: '3 hours',
                      totalMarks: 300,
                      qualifying: true,
                      notes: 'Marks not counted for ranking; minimum 25% required to qualify',
                    },
                    {
                      paperId: 'Essay',
                      paperName: 'Essay',
                      type: 'Descriptive',
                      duration: '3 hours',
                      totalMarks: 250,
                    },
                    {
                      paperId: 'GS-1',
                      paperName: 'General Studies-I',
                      type: 'Descriptive',
                      duration: '3 hours',
                      totalMarks: 250,
                      topics: [
                        'Indian Heritage and Culture',
                        'History (Modern & World)',
                        'Society (Diversity, Poverty, Empowerment)',
                        'World & Indian Geography',
                      ],
                    },
                    {
                      paperId: 'GS-2',
                      paperName: 'General Studies-II',
                      type: 'Descriptive',
                      duration: '3 hours',
                      totalMarks: 250,
                      topics: [
                        'Indian Constitution and Polity',
                        'Governance and Social Justice',
                        'International Relations',
                      ],
                    },
                    {
                      paperId: 'GS-3',
                      paperName: 'General Studies-III',
                      type: 'Descriptive',
                      duration: '3 hours',
                      totalMarks: 250,
                      topics: [
                        'Indian Economy',
                        'Technology & Biodiversity',
                        'Environment & Disaster Management',
                        'Internal Security',
                      ],
                    },
                    {
                      paperId: 'GS-4',
                      paperName: 'General Studies-IV',
                      type: 'Descriptive',
                      duration: '3 hours',
                      totalMarks: 250,
                      topics: [
                        'Ethics, Integrity & Aptitude',
                        'Emotional Intelligence',
                        'Probity in Governance',
                      ],
                    },
                    {
                      paperId: 'Optional-I',
                      paperName: 'Optional Subject – Paper I',
                      type: 'Descriptive',
                      duration: '3 hours',
                      totalMarks: 250,
                    },
                    {
                      paperId: 'Optional-II',
                      paperName: 'Optional Subject – Paper II',
                      type: 'Descriptive',
                      duration: '3 hours',
                      totalMarks: 250,
                    },
                  ],
                  personalityTest: {
                    stageName: 'Personality Test / Interview',
                    totalMarks: 275,
                  },
                },
              ],
              totalMarks: 2025,
            },
            {
              examId: 'rrb-ntpc',
              examName: 'RRB NTPC',
              description: 'Railway Recruitment Board Non‑Technical Popular Categories recruitment.',
              stages: [
                {
                  stageId: 'cbt-1',
                  stageName: 'CBT Stage I (Preliminary Exam)',
                  papers: [
                    {
                      paperId: 'c­bt1',
                      paperName: 'CBT Stage I',
                      type: 'Objective (MCQ)',
                      duration: '90 minutes',
                      totalMarks: 100,
                      totalQuestions: 100,
                      negativeMarking: '1/3 per wrong answer',
                      topics: [
                        'General Awareness – 40 questions',
                        'Mathematics (Arithmetic Ability) – 30 questions',
                        'General Intelligence & Reasoning – 30 questions',
                      ],
                    },
                  ],
                },
                {
                  stageId: 'cbt-2',
                  stageName: 'CBT Stage II (Main Exam)',
                  papers: [
                    {
                      paperId: 'cbt2',
                      paperName: 'CBT Stage II',
                      type: 'Objective (MCQ)',
                      duration: '90 minutes',
                      totalMarks: 120,
                      totalQuestions: 120,
                      negativeMarking: '1/3 per wrong answer',
                      topics: [
                        'General Awareness – 50 questions',
                        'Mathematics – 35 questions',
                        'General Intelligence & Reasoning – 35 questions',
                      ],
                    },
                  ],
                },
                {
                  stageId: 'skill-test',
                  stageName: 'Skill Test / Typing / CBAT',
                  papers: [
                    {
                      paperId: 'typing-skill-test',
                      paperName: 'Typing Skill Test / Computer-Based Aptitude Test',
                      type: 'Skill Test',
                      notes: 'For applicable posts (e.g., Clerk, Typist)',
                    },
                  ],
                },
              ],
              totalStages: 3,
            }, 
    
            
            {
              examId: 'ibps-clerk',
              examName: 'IBPS Clerk (CRP‑CSA)',
              description: 'Institute of Banking Personnel Selection Clerical exam for Customer Service Associates.',
              stages: [
                {
                  stageId: 'prelims',
                  stageName: 'Preliminary Examination',
                  papers: [
                    {
                      paperId: 'prelims',
                      paperName: 'Prelims',
                      type: 'Objective (MCQ)',
                      duration: '60 minutes',
                      totalMarks: 100,
                      totalQuestions: 100,
                      negativeMarking: '0.25 per wrong answer',
                      sections: [
                        { sectionName: 'English Language', questions: 30, marks: 30, time: '20 minutes' },
                        { sectionName: 'Numerical Ability', questions: 35, marks: 35, time: '20 minutes' },
                        { sectionName: 'Reasoning Ability', questions: 35, marks: 35, time: '20 minutes' },
                      ],
                    },
                  ],
                },
                {
                  stageId: 'mains',
                  stageName: 'Main Examination',
                  papers: [
                    {
                      paperId: 'mains-objective',
                      paperName: 'Mains – Objective',
                      type: 'Objective (MCQ)',
                      duration: '160 minutes',
                      totalMarks: 200,
                      sections: [
                        { sectionName: 'Reasoning Ability & Computer Aptitude', questions: 50, marks: 60, time: '45 minutes' },
                        { sectionName: 'General/Financial Awareness', questions: 50, marks: 50, time: '35 minutes' },
                        { sectionName: 'General English', questions: 40, marks: 40, time: '35 minutes' },
                        { sectionName: 'Quantitative Aptitude', questions: 50, marks: 50, time: '45 minutes' },
                      ],
                      negativeMarking: '0.25 per wrong answer',
                    },
                    {
                      paperId: 'mains-descriptive',
                      paperName: 'Mains – Descriptive (if applicable)',
                      type: 'Descriptive (essay/letter)',
                      duration: '30 minutes',
                      totalMarks: 25,
                      notes: 'English only; timing and inclusion may vary',
                    },
                  ],
                },
                {
                  stageId: 'final',
                  stageName: 'Final Selection',
                  papers: [
                    {
                      paperId: 'final-scoring',
                      paperName: 'Final Merit – Mains only',
                      type: 'Evaluation',
                      notes: 'Final selection based only on Mains score; Prelims is qualifying.',
                    },
                  ],
                },
              ],
              totalStages: 3,
            },        
            { examId: 'sbi-po-clerk-so', examName: 'SBI PO / Clerk / SO', description: 'State Bank of India exams for various banking roles.', stages: [] },
            { examId: 'lic-aao-ado', examName: 'LIC AAO / ADO', description: 'Life Insurance Corporation exams for officer roles.', stages: [] },
            { examId: 'nabard-grade-a-b', examName: 'NABARD Grade A & B', description: 'National Bank for Agriculture and Rural Development officer exams.', stages: [] },
            { examId: 'rbi-grade-b-assistant', examName: 'RBI Grade B / Assistant', description: 'Reserve Bank of India exams for officer and assistant roles.', stages: [] },
            { examId: 'indian-coast-guard', examName: 'Indian Coast Guard Exam', description: 'Recruitment exam for the Indian Coast Guard.', stages: [] },
            { examId: 'nda', examName: 'NDA (National Defence Academy)', description: 'For admission to the Army, Navy, and Air Force wings of the NDA.', stages: [] },
            { examId: 'cds', examName: 'CDS (Combined Defence Services)', description: 'For recruitment into the Indian Military Academy, Officers Training Academy, etc.', stages: [] },
            { examId: 'afcat', examName: 'AFCAT (Air Force Common Admission Test)', description: 'For selection of officers in all branches of the Indian Air Force.', stages: [] },
            { examId: 'capf', examName: 'CAPF (Central Armed Police Forces)', description: 'Recruitment of Assistant Commandants in the Central Armed Police Forces.', stages: [] },
        ]
      },
       {
        category: 'Language & Communication',
        exams: [
          {
            examId: 'ielts',
            examName: 'IELTS (International English Language Testing System)',
            description: 'Measures English language proficiency for study, migration, and work.',
            stages: []
          },
        ]
      },
      {
        category: 'Engineering & Technical',
        exams: [
          {
            examId: 'jee-main-advanced',
            examName: 'JEE Main / JEE Advanced',
            description: 'For admission to undergraduate engineering programs in IITs, NITs, etc.',
            stages: [
              {
                stageId: 'jee-main',
                stageName: 'JEE Main',
                papers: [
                  {
                    paperId: 'paper1',
                    paperName: 'Paper 1 - B.E./B.Tech',
                    type: 'Objective (MCQ and Numerical Value)',
                    duration: '3 hours',
                    totalMarks: 300,
                    sections: [
                      {
                        sectionName: 'Physics',
                        topics: [
                          'Physics and Measurement',
                          'Kinematics',
                          'Laws of Motion',
                          'Work, Energy and Power',
                          'Rotational Motion',
                          'Gravitation',
                          'Properties of Solids and Liquids',
                          'Thermodynamics',
                          'Kinetic Theory of Gases',
                          'Oscillations and Waves',
                        ],
                      },
                      {
                        sectionName: 'Chemistry',
                        topics: [
                          'Some Basic Concepts of Chemistry',
                          'Atomic Structure',
                          'Chemical Bonding and Molecular Structure',
                          'Chemical Thermodynamics',
                          'Equilibrium',
                          'Redox Reactions',
                          'The Periodic Table and the Periodic Law',
                          'Hydrogen',
                          'The s-Block Element',
                          'The p-Block Element',
                          'The d-Block and f-Block Elements',
                          'Organic Chemistry',
                        ],
                      },
                      {
                        sectionName: 'Mathematics',
                        topics: [
                          'Sets, Relations and Functions',
                          'Complex Numbers and Quadratic Equations',
                          'Matrices and Determinants',
                          'Permutations and Combinations',
                          'Mathematical Induction',
                          'Binomial Theorem and Its Applications',
                          'Sequences and Series',
                          'Limits, Continuity and Differentiability',
                          'Integral Calculus',
                          'Differential Equations',
                          'Coordinate Geometry',
                          'Three Dimensional Geometry',
                          'Vector Algebra',
                          'Statistics and Probability',
                          'Trigonometry',
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                stageId: 'jee-advanced',
                stageName: 'JEE Advanced',
                papers: [
                  {
                    paperId: 'paper1',
                    paperName: 'Paper 1',
                    type: 'Objective and Subjective',
                    duration: '3 hours',
                    totalMarks: 180,
                    sections: [
                      {
                        sectionName: 'Physics',
                        topics: [
                          'General Physics',
                          'Mechanics',
                          'Thermodynamics',
                          'Electricity and Magnetism',
                          'Optics',
                          'Modern Physics',
                        ],
                      },
                      {
                        sectionName: 'Chemistry',
                        topics: [
                          'Physical Chemistry',
                          'Inorganic Chemistry',
                          'Organic Chemistry',
                        ],
                      },
                      {
                        sectionName: 'Mathematics',
                        topics: [
                          'Algebra',
                          'Trigonometry',
                          'Analytical Geometry',
                          'Differential Calculus',
                          'Integral Calculus',
                          'Vectors',
                        ],
                      },
                    ],
                  },
                  {
                    paperId: 'paper2',
                    paperName: 'Paper 2',
                    type: 'Objective and Subjective',
                    duration: '3 hours',
                    totalMarks: 180,
                    // Similar topics as Paper 1 but with different question pattern
                  },
                ],
              },
            ],
            totalMarks: 480,
          },
          {
            examId: 'gate',
            examName: 'GATE (Graduate Aptitude Test in Engineering)',
            description: 'For admission to postgraduate engineering programs and PSU recruitment.',
            stages: [
              {
                stageId: 'gate-exam',
                stageName: 'GATE Exam',
                papers: [
                  {
                    paperId: 'general',
                    paperName: 'General Aptitude',
                    type: 'Objective',
                    duration: '3 hours',
                    totalMarks: 100,
                    topics: [
                      'Engineering Mathematics',
                      'General Aptitude (Verbal Ability, Numerical Ability)',
                    ],
                  },
                  {
                    paperId: 'subject-specific',
                    paperName: 'Subject-Specific Paper',
                    type: 'Objective',
                    duration: '3 hours',
                    totalMarks: 100,
                    topics: [
                      'Depends on the chosen engineering discipline, e.g., Mechanical, Electrical, Civil, Computer Science, etc.',
                    ],
                  },
                ],
              },
            ],
            totalMarks: 200,
          },
          {
            examId: 'isro-drdo',
            examName: 'ISRO / DRDO Recruitment',
            description: 'Recruitment exams for scientists and engineers in space and defense organizations.',
            stages: [
              {
                stageId: 'written-test',
                stageName: 'Written Test',
                papers: [
                  {
                    paperId: 'engineering-knowledge',
                    paperName: 'Engineering Knowledge',
                    type: 'Objective',
                    duration: '2 hours',
                    totalMarks: 100,
                    topics: [
                      'Core engineering subjects as per the applied discipline',
                      'Basic Mathematics and Physics',
                      'Technical knowledge related to the role',
                    ],
                  },
                ],
              },
              {
                stageId: 'interview',
                stageName: 'Interview',
                papers: [],
                notes: 'Technical and HR interview to assess suitability.',
              },
            ],
          },
            { examId: 'psu-recruitment', examName: 'BHEL / NTPC / ONGC / IOCL Recruitments', description: 'Recruitment for various Public Sector Undertakings.', stages: [] },
            { examId: 'barc-oces-dgfs', examName: 'BARC OCES/DGFS', description: 'Bhabha Atomic Research Centre training schemes for engineers and scientists.', stages: [] },
        ]
      },
      {
          category: 'Medical / Science / Research',
          exams: [
              { examId: 'neet-ug-pg', examName: 'NEET UG / NEET PG', description: 'National Eligibility cum Entrance Test for medical courses.', stages: [] },
              { examId: 'aiims-jipmer', examName: 'AIIMS / JIPMER Entrance Exams', description: 'Entrance exams for premier medical colleges.', stages: [] },
              { examId: 'icmr-jrf', examName: 'ICMR JRF', description: 'Indian Council of Medical Research Junior Research Fellowship.', stages: [] },
              { examId: 'csir-ugc-net', examName: 'CSIR-UGC NET', description: 'For Junior Research Fellowship and Lectureship in science subjects.', stages: [] },
              { examId: 'ugc-net', examName: 'UGC NET', description: 'For Lectureship/JRF in various subjects.', stages: [] },
          ]
      },
      {
          category: 'Law / Commerce / Management',
          exams: [
              { examId: 'clat-ailet', examName: 'CLAT / AILET (Law Entrance Exams)', description: 'Common Law Admission Test and All India Law Entrance Test.', stages: [] },
              { examId: 'ca', examName: 'CA Foundation / Intermediate / Final', description: 'Chartered Accountancy exams.', stages: [] },
              { examId: 'cs', examName: 'CS (Company Secretary)', description: 'Company Secretary professional exams.', stages: [] },
              { examId: 'cma', examName: 'CMA', description: 'Cost and Management Accountancy exams.', stages: [] },
              { examId: 'cat', examName: 'CAT (MBA Entrance)', description: 'Common Admission Test for MBA programs.', stages: [] },
              { examId: 'xat-snap-nmat', examName: 'XAT / SNAP / NMAT / MAT / CMAT', description: 'Other popular MBA entrance exams.', stages: [] },
              { examId: 'iift-tissnet', examName: 'IIFT / TISSNET', description: 'Entrance exams for management courses at IIFT and TISS.', stages: [] },
          ]
      },
      {
          category: 'School / Junior Level',
          exams: [
            {
              examId: 'ntse',
              examName: 'National Talent Search Examination (NTSE)',
              description: 'A national level scholarship exam for Class 10 students to identify and nurture talent.',
              stages: [
                {
                  stageId: 'stage-1',
                  stageName: 'Stage 1 (State Level)',
                  papers: [
                    {
                      paperId: 'mental-ability-test',
                      paperName: 'Mental Ability Test (MAT)',
                      type: 'Objective (MCQ)',
                      duration: '120 minutes',
                      totalMarks: 100,
                      topics: [
                        'Analogy',
                        'Classification',
                        'Series',
                        'Pattern Perception',
                        'Coding-Decoding',
                        'Puzzle',
                        'Logical Venn Diagrams',
                        'Problem Solving',
                        'Direction Sense Test',
                        'Non-Verbal Reasoning',
                        'Alphabet Test',
                      ],
                    },
                    {
                      paperId: 'scholastic-aptitude-test',
                      paperName: 'Scholastic Aptitude Test (SAT)',
                      type: 'Objective (MCQ)',
                      duration: '120 minutes',
                      totalMarks: 100,
                      topics: [
                        'Science: Physics, Chemistry, Biology (Class 9 & 10 level)',
                        'Mathematics: Algebra, Geometry, Arithmetic (Class 9 & 10 level)',
                        'Social Science: History, Geography, Civics, Economics (Class 9 & 10 level)',
                      ],
                    },
                  ],
                },
                {
                  stageId: 'stage-2',
                  stageName: 'Stage 2 (National Level)',
                  papers: [
                    {
                      paperId: 'mental-ability-test-2',
                      paperName: 'Mental Ability Test (MAT)',
                      type: 'Objective (MCQ)',
                      duration: '120 minutes',
                      totalMarks: 100,
                      topics: [
                        'Higher difficulty logical reasoning and problem-solving',
                        'Advanced pattern recognition',
                        'Complex coding-decoding',
                        'Analytical reasoning',
                      ],
                    },
                    {
                      paperId: 'scholastic-aptitude-test-2',
                      paperName: 'Scholastic Aptitude Test (SAT)',
                      type: 'Objective (MCQ)',
                      duration: '120 minutes',
                      totalMarks: 100,
                      topics: [
                        'In-depth Science (Physics, Chemistry, Biology)',
                        'Advanced Mathematics',
                        'Comprehensive Social Science',
                      ],
                    },
                    {
                      paperId: 'language-test',
                      paperName: 'Language Test (Qualifying)',
                      type: 'Objective (MCQ)',
                      duration: '45 minutes',
                      totalMarks: 'Qualifying only',
                      topics: [
                        'English Language Comprehension and Grammar',
                        'Regional Language',
                      ],
                    },
                  ],
                },
              ],
              totalMarks: 400,
            },
              {
                examId: 'nmms',
                examName: 'National Means-cum-Merit Scholarship (NMMS) Exam',
                description: 'Scholarship exam for students of class 8 to support education expenses.',
                stages: [
                  {
                    stageId: 'nmms-exam',
                    stageName: 'NMMS Scholarship Exam',
                    papers: [
                      {
                        paperId: 'mental-ability-test',
                        paperName: 'Mental Ability Test (MAT)',
                        type: 'Objective (MCQ)',
                        duration: '90 minutes',
                        totalMarks: 90,
                        topics: [
                          'Analogies',
                          'Classification',
                          'Series (Number and Alphabetical)',
                          'Coding-Decoding',
                          'Blood Relations',
                          'Directions',
                          'Spatial Visualization',
                          'Problem Solving',
                          'Decision Making',
                          'Visual Memory',
                          'Non-Verbal Reasoning',
                        ],
                      },
                      {
                        paperId: 'scholastic-aptitude-test',
                        paperName: 'Scholastic Aptitude Test (SAT)',
                        type: 'Objective (MCQ)',
                        duration: '90 minutes',
                        totalMarks: 90,
                        topics: [
                          'Language Comprehension (English or Regional Language)',
                          'Mathematics (Class 7 and 8 level)',
                          'Science (Class 7 and 8 level)',
                          'Social Studies (Class 7 and 8 level)',
                        ],
                      },
                    ],
                  },
                ],
                totalMarks: 180,
              },
              { examId: 'kvpy', examName: 'KVPY (Now merged with INSPIRE)', description: 'Scholarship program to encourage students to take up research careers.', stages: [] },
              { examId: 'olympiads', examName: 'Olympiads (NSO, IMO, IEO, etc.)', description: 'Various national and international Olympiads for school students.', stages: [] },
              { examId: 'rmo-inmo', examName: 'RMO / INMO (Math Olympiad)', description: 'Mathematical Olympiad program in India.', stages: [] },
          ]
      },
      {
          category: 'Andhra Pradesh Public Service Commission (APPSC)',
          exams: [
              { examId: 'appsc-group1', examName: 'APPSC Group 1', description: 'Executive & Administrative Services in Andhra Pradesh.', stages: [] },
              { examId: 'appsc-group2', examName: 'APPSC Group 2', description: 'Non-Executive Posts in Andhra Pradesh.', stages: [] },
              { examId: 'appsc-group3', examName: 'APPSC Group 3', description: 'Panchayat Secretary and other posts in Andhra Pradesh.', stages: [] },
              { examId: 'appsc-group4', examName: 'APPSC Group 4', description: 'Clerical posts in Andhra Pradesh.', stages: [] },
              { examId: 'appsc-ae-aee', examName: 'APPSC AE / AEE', description: 'Assistant Engineer/Assistant Executive Engineer jobs in AP.', stages: [] },
          ]
      },
      {
          category: 'Andhra Pradesh - Police & Defence',
          exams: [
              { examId: 'ap-police-si', examName: 'AP Police SI Exam', description: 'Andhra Pradesh Police Sub-Inspector recruitment.', stages: [] },
              { examId: 'ap-police-constable', examName: 'AP Police Constable Exam', description: 'Andhra Pradesh Police Constable recruitment.', stages: [] },
              { examId: 'ap-fire-services', examName: 'AP Fire Services Exams', description: 'Recruitment for Andhra Pradesh State Disaster Response & Fire Services.', stages: [] },
              { examId: 'ap-jail-warder', examName: 'AP Jail Warder', description: 'Recruitment for prison department staff in Andhra Pradesh.', stages: [] },
          ]
      },
      {
          category: 'Andhra Pradesh - Educational Service Exams',
          exams: [
              { examId: 'ap-tet', examName: 'AP TET (Teacher Eligibility Test)', description: 'Andhra Pradesh Teacher Eligibility Test.', stages: [] },
              { examId: 'ap-dsc', examName: 'AP DSC (Teacher Recruitment)', description: 'Andhra Pradesh District Selection Committee for teacher recruitment.', stages: [] },
              { examId: 'apset', examName: 'APSET (State Eligibility Test for Lecturers)', description: 'AP State Eligibility Test for Assistant Professor/Lecturer.', stages: [] },
              { examId: 'deecet', examName: 'DEECET (Diploma in Elementary Education CET)', description: 'AP Diploma in Elementary Education Common Entrance Test.', stages: [] },
          ]
      },
      {
          category: 'Andhra Pradesh - Entrance Exams (Higher Education)',
          exams: [
            {
              examId: 'ap-eapcet',
              examName: 'EAMCET (AP EAPCET)',
              description: 'Engineering, Agriculture, Pharmacy Common Entrance Test in Andhra Pradesh.',
              stages: [
                {
                  stageId: 'eapcet-exam',
                  stageName: 'EAPCET Exam',
                  papers: [
                    {
                      paperId: 'engineering-stream',
                      paperName: 'Engineering Stream',
                      type: 'Objective (MCQ)',
                      duration: '3 hours',
                      totalMarks: 160,
                      sections: [
                        {
                          sectionName: 'Physics',
                          topics: [
                            'Physical world and Measurement',
                            'Kinematics',
                            'Laws of Motion',
                            'Work, Energy and Power',
                            'Motion of System of Particles and Rigid Body',
                            'Gravitation',
                            'Properties of Bulk Matter',
                            'Thermodynamics',
                            'Behaviour of Perfect Gas and Kinetic Theory',
                            'Oscillations and Waves',
                          ],
                        },
                        {
                          sectionName: 'Chemistry',
                          topics: [
                            'Some Basic Concepts of Chemistry',
                            'Atomic Structure',
                            'Chemical Bonding and Molecular Structure',
                            'States of Matter: Gases and Liquids',
                            'Thermodynamics',
                            'Equilibrium',
                            'Redox Reactions',
                            'Hydrogen',
                            'The p-Block Elements',
                            'The d- and f-Block Elements',
                            'Organic Chemistry - Some Basic Principles and Techniques',
                            'Hydrocarbons',
                            'Environmental Chemistry',
                          ],
                        },
                        {
                          sectionName: 'Mathematics',
                          topics: [
                            'Relations and Functions',
                            'Algebra',
                            'Trigonometry',
                            'Analytical Geometry',
                            'Differential Calculus',
                            'Integral Calculus',
                            'Vectors',
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
              totalMarks: 160,
            },
            {
              examId: 'ap-ecet',
              examName: 'AP ECET',
              description: 'For Diploma Holders seeking lateral entry into B.Tech courses in Andhra Pradesh.',
              stages: [
                {
                  stageId: 'ecet-exam',
                  stageName: 'ECET Exam',
                  papers: [
                    {
                      paperId: 'ecet-paper',
                      paperName: 'Engineering Common Entrance Test',
                      type: 'Objective (MCQ)',
                      duration: '3 hours',
                      totalMarks: 200,
                      sections: [
                        {
                          sectionName: 'Engineering Mathematics',
                          topics: [
                            'Matrices and Determinants',
                            'Vector Algebra',
                            'Calculus',
                            'Differential Equations',
                            'Probability and Statistics',
                          ],
                        },
                        {
                          sectionName: 'Engineering Subjects',
                          topics: [
                            ' Electrical', 
                            'Mechanical', 
                            'Civil', 
                            'Electronics',
                            'Computer Science',
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
              totalMarks: 200,
            },
            {
              examId: 'ap-icet',
              examName: 'AP ICET',
              description: 'Integrated Common Entrance Test for MBA and MCA admissions in Andhra Pradesh.',
              stages: [
                {
                  stageId: 'icet-exam',
                  stageName: 'ICET Exam',
                  papers: [
                    {
                      paperId: 'icet-paper',
                      paperName: 'Integrated Common Entrance Test',
                      type: 'Objective (MCQ)',
                      duration: '3 hours',
                      totalMarks: 200,
                      sections: [
                        {
                          sectionName: 'Analytical Ability',
                          topics: [
                            'Data Sufficiency',
                            'Problem Solving',
                            'Data Analysis and Interpretation',
                          ],
                        },
                        {
                          sectionName: 'Mathematical Ability',
                          topics: [
                            'Arithmetic',
                            'Algebra',
                            'Geometry',
                          ],
                        },
                        {
                          sectionName: 'Communication Ability',
                          topics: [
                            'Vocabulary',
                            'Business and Computer Terminology',
                            'Functional Grammar',
                            'Reading Comprehension',
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
              totalMarks: 200,
            },        
              { examId: 'ap-lawcet', examName: 'LAWCET / PGLCET', description: 'Law Common Entrance Test for AP.', stages: [] },
              { examId: 'ap-edcet', examName: 'EDCET', description: 'Education Common Entrance Test for B.Ed admissions in AP.', stages: [] },
              { examId: 'ap-pgcet', examName: 'PGCET', description: 'Post Graduate Common Entrance Test for AP.', stages: [] },
              { examId: 'ap-polycet', examName: 'POLYCET', description: 'Polytechnic Common Entrance Test for AP.', stages: [] },
          ]
      },
      {
          category: 'Andhra Pradesh - Health & Paramedical',
          exams: [
              { examId: 'ap-medical-officer', examName: 'APPSC Medical Officer Recruitment', description: 'Recruitment for Medical Officers in AP.', stages: [] },
              { examId: 'ap-paramedical', examName: 'AP Paramedical Recruitment', description: 'For Staff Nurse, Pharmacist, etc. in AP.', stages: [] },
              { examId: 'ap-ayush', examName: 'AP Ayush Department Exams', description: 'Exams for the Department of Ayurveda, Yoga, Unani, Siddha and Homoeopathy.', stages: [] },
          ]
      }
    ].map(category => ({
      ...category,
      exams: category.exams.map(exam => ({
        ...exam,
        // Ensure all exams have a stages array, even if it's empty, for consistency.
        stages: exam.stages || [], 
      }))
    }));
    
    
