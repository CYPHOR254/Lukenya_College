/**
 * Sanity Content Migration Script
 *
 * This script seeds the Sanity CMS with all existing hardcoded content
 * from the Lukenya College website components.
 *
 * Usage:
 *   1. First, update the projectId and token below
 *   2. Run: npx ts-node seed-content.ts
 *
 * Prerequisites:
 *   - npm install @sanity/client
 *   - A Sanity project with the schemas deployed
 *   - A Sanity API token with write permissions
 */

import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';

const client = createClient({
  projectId: 'YOUR_PROJECT_ID', // TODO: Replace after `sanity init`
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'YOUR_WRITE_TOKEN', // TODO: Create at manage.sanity.io > API > Tokens
  useCdn: false,
});

async function seedContent() {
  console.log('🚀 Starting content migration...\n');

  // ── Site Settings ──────────────────────────────────────────
  console.log('📝 Creating site settings...');
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    heroHeadline: 'Future-Driven Education Starts at Lukenya College',
    heroSubtext: 'Empowering students with practical skills, industry-relevant knowledge, and professional growth opportunities.',
    countdownTarget: '2025-11-28T08:00:00.000Z',
    eventDateDisplay: 'November 28th, 2025',
    eventDayTime: 'Monday, 08:00 AM - 06:00 PM',
    contactPhone: '+254 XXX XXX XXX',
    contactEmail: 'info@lukenyacollege.ac.ke',
    contactAddress: 'Emali Town, 125km from Nairobi, 500m off Mombasa Road',
  });

  // ── Facility Slides ────────────────────────────────────────
  console.log('🖼️  Creating facility slides...');
  const slides = [
    { title: 'Carpentry & Woodwork Lab', subtitle: 'Hands-on training with industrial-grade woodworking equipment', alt: 'Carpentry Workshop', localImage: 'Carpentry_latest.jpg' },
    { title: 'Library & Research Center', subtitle: 'Thousands of resources at your fingertips', alt: 'Library', localImage: 'library.jpg' },
    { title: 'Science Laboratories', subtitle: 'Cutting-edge equipment for hands-on experiments', alt: 'Laboratory', localImage: 'chefs.jpg' },
    { title: 'Sports & Fitness Complex', subtitle: 'Olympic-standard facilities for training and recreation', alt: 'Sports Complex', localImage: 'sports.png' },
    { title: 'Plumbing & Pipefitting Workshop', subtitle: 'Practical skills in water systems and pipe installation', alt: 'Plumbing Lab', localImage: 'Plumbing_latest.jpg' },
    { title: 'Automotive Mechanics Workshop', subtitle: 'Real vehicle diagnostics and repair training', alt: 'Automotive Workshop', localImage: 'automotive_latest.jpg' },
    { title: 'Barbering & Cosmetology Studio', subtitle: 'Professional grooming skills in a fully equipped salon', alt: 'Barbering Studio', localImage: 'barbering_latest.jpg' },
    { title: 'Beauty Therapy Lab', subtitle: 'Nail care, skin treatment and beauty therapy practice', alt: 'Beauty Therapy Lab', localImage: 'beauty.jpg' },
    { title: 'Pneumatics & Fluid Power Lab', subtitle: 'Industrial equipment training for engineering students', alt: 'tank Lab', localImage: 'tank.jpg' },
  ];

  for (let i = 0; i < slides.length; i++) {
    const slide = slides[i];
    const doc: any = {
      _type: 'facilitySlide',
      title: slide.title,
      subtitle: slide.subtitle,
      alt: slide.alt,
      order: i + 1,
    };

    // Upload image if it exists in the public folder
    const imagePath = path.join(__dirname, '..', 'public', slide.localImage);
    if (fs.existsSync(imagePath)) {
      const imageAsset = await client.assets.upload('image', fs.createReadStream(imagePath), {
        filename: slide.localImage,
      });
      doc.image = {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id },
      };
    }

    await client.create(doc);
    console.log(`  ✅ ${slide.title}`);
  }

  // ── Value Cards ────────────────────────────────────────────
  console.log('💡 Creating value cards...');
  const cards = [
    {
      title: 'Vision',
      description: 'To be a dynamic college, committed to scholarship in teaching, research, training and community service.',
      iconSvgPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.25 9.71 2 12 2c2.291 0 4.545.25 6.75.721v1.515m0 0a7.454 7.454 0 00-.982 3.172M18.75 4.236c.982.143 1.954.317 2.916.52a6.003 6.003 0 01-5.395 5.491m0 0a7.454 7.454 0 01-2.48 5.228" />',
      order: 1,
    },
    {
      title: 'Mission',
      description: 'To provide demand driven curricula and adequate resources with the aim of producing graduates equipped with skills relevant to market needs.',
      iconSvgPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />',
      order: 2,
    },
    {
      title: 'Philosophy',
      description: 'To Embrace a Green philosophy which fosters the use of innovative technologies in global food security, energy and sustainability, health and universal education.',
      iconSvgPath: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />',
      order: 3,
    },
  ];

  for (const card of cards) {
    await client.create({ _type: 'valueCard', ...card });
    console.log(`  ✅ ${card.title}`);
  }

  // ── Milestones ─────────────────────────────────────────────
  console.log('🏆 Creating milestones...');
  const milestones = [
    { label: 'College Founded in', year: '2016', icon: 'star', order: 1 },
    { label: '1st College Graduation', year: '2018', superscript: 'ST', icon: 'shield', order: 2 },
    { label: 'College Ranking in Kenya', year: '1st', icon: 'layers', order: 3 },
    { label: 'Alumni Official Site Launched', year: '2017', icon: 'archive', order: 4 },
    { label: 'Scholarship Study Program', year: '2018', icon: 'wifi', order: 5 },
  ];

  for (const m of milestones) {
    await client.create({ _type: 'milestone', ...m });
    console.log(`  ✅ ${m.label}`);
  }

  // ── Amenities ──────────────────────────────────────────────
  console.log('🏫 Creating amenities...');
  const amenities = [
    { title: 'Lecture Hall', description: 'Lukenya College has spacious lecture halls equipped with modern audio-visual technology for effective learning.', order: 1 },
    { title: 'Library', description: 'A well-stocked library with thousands of academic resources to support research and learning.', order: 2 },
    { title: 'Gym', description: 'Lukenya College has a Gym facility that guarantees students wellness and fitness outside the classroom.', order: 3 },
    { title: 'Football', description: 'Lukenya College has a football field that allows students wellness and fitness outside the classroom.', order: 4 },
    { title: 'Cafeteria', description: 'A modern cafeteria serving nutritious meals to keep students energized throughout the day.', order: 5 },
  ];

  for (const a of amenities) {
    await client.create({ _type: 'amenity', ...a });
    console.log(`  ✅ ${a.title}`);
  }

  // ── Program Categories & Academic Programs ─────────────────
  console.log('📚 Creating program categories and courses...');

  const knecCategory = await client.create({
    _type: 'programCategory',
    name: 'KNEC Courses',
    slug: { _type: 'slug', current: 'knec-courses' },
    description: 'Kenya National Examinations Council (KNEC) is the national body responsible for overseeing national examinations in the country. It was established to conduct school, post school and other examinations and has the role of ensuring validity and reliability of examinations; ensuring conformity to Kenya\'s goals and changes in government policies relating to the curriculum and examinations. The tertiary exams by KNEC are conducted in the months of March, July and November every year.',
    order: 1,
  });
  console.log('  ✅ KNEC Courses category');

  const shortCategory = await client.create({
    _type: 'programCategory',
    name: 'Short Courses',
    slug: { _type: 'slug', current: 'short-courses' },
    description: 'Kenya Accountants and Secretaries National Examinations Board (KASNEB) is the body responsible for preparing and administering exams for diploma and professional certificate courses. In addition to these roles, it is the professional body mandated to create the syllabus and offer certifications to students pursuing various courses. The main categories of courses KASNEB is mandated with include Management, Finance, Secretarial Studies, Information Technology, Credit, Governance, Accountancy and other related disciplines. KASNEB exams are normally conducted in the months of May and November every year.',
    order: 2,
  });
  console.log('  ✅ Short Courses category');

  const knecCourses = [
    'Diploma in Human Resource Management',
    'Diploma in Business Management',
    'Diploma in Information Communication Technology',
    'Diploma in Social Work & Communication Development',
  ];

  for (let i = 0; i < knecCourses.length; i++) {
    await client.create({
      _type: 'academicProgram',
      title: knecCourses[i],
      description: 'A comprehensive program designed to equip students with industry-relevant skills and practical knowledge.',
      category: { _type: 'reference', _ref: knecCategory._id },
      order: i + 1,
    });
    console.log(`  ✅ ${knecCourses[i]}`);
  }

  const shortCourses = [
    'Hair and beauty therapy',
    'Electrical Installation',
    'Plumbing',
  ];

  for (let i = 0; i < shortCourses.length; i++) {
    await client.create({
      _type: 'academicProgram',
      title: shortCourses[i],
      description: 'A practical short course providing hands-on skills for immediate industry application.',
      category: { _type: 'reference', _ref: shortCategory._id },
      order: i + 1,
    });
    console.log(`  ✅ ${shortCourses[i]}`);
  }

  // ── FAQ Topics ─────────────────────────────────────────────
  console.log('❓ Creating FAQ topics...');
  const faqTopics = [
    {
      name: 'General',
      order: 1,
      faqs: [
        { _key: 'g1', question: 'Are scholarships available for students?', answer: 'Yes, Lukenya College offers merit-based and need-based scholarships covering up to 100% of tuition. We also have special scholarships for international students, student athletes, and those excelling in arts and sciences. Application deadlines vary by scholarship type.' },
        { _key: 'g2', question: 'What is the tuition fee structure?', answer: 'Tuition fees vary by program. Certificate programs start from KES 15,000 per semester, diploma from KES 25,000, and degree programs from KES 45,000. HELB loans and payment plans are available.' },
        { _key: 'g3', question: 'Is on-campus housing available?', answer: 'Yes, Lukenya College provides affordable hostel accommodation for both male and female students on a first-come, first-served basis. All hostels have Wi-Fi, security, and communal dining.' },
        { _key: 'g4', question: 'How long are the academic programs?', answer: 'Artisan courses run 6 months, Certificate programs 1 year, Diploma programs 2 years, and Degree programs 3–4 years. Evening and weekend classes are available for working professionals.' },
      ],
    },
    {
      name: 'Scholarships',
      order: 2,
      faqs: [
        { _key: 's1', question: 'Who qualifies for a scholarship?', answer: 'Scholarships are available for students with outstanding academic performance, financial need, sports excellence, or those from disadvantaged backgrounds.' },
        { _key: 's2', question: 'How do I apply for a scholarship?', answer: 'Submit a scholarship application form along with your academic transcripts, a recommendation letter, and a personal statement to the admissions office.' },
        { _key: 's3', question: 'When is the scholarship application deadline?', answer: 'Deadlines vary by scholarship type. Check the college website or contact the admissions office for the current academic year deadlines.' },
        { _key: 's4', question: 'Can international students apply for scholarships?', answer: 'Yes, Lukenya College has special scholarships specifically set aside for international students. Contact the admissions team for eligibility criteria.' },
      ],
    },
    {
      name: 'Fee Structure',
      order: 3,
      faqs: [
        { _key: 'f1', question: 'What are the tuition fees for diploma programs?', answer: 'Diploma program fees start from KES 25,000 per semester. Fees may vary depending on the specific program.' },
        { _key: 'f2', question: 'Are there payment plans available?', answer: 'Yes, students can pay fees in installments. The college offers flexible payment plans to ease the financial burden on students and their families.' },
        { _key: 'f3', question: 'Does the college accept HELB loans?', answer: 'Yes, Lukenya College is a HELB-registered institution. Students can apply for HELB loans to cover tuition and other educational expenses.' },
        { _key: 'f4', question: 'Are there any hidden fees?', answer: 'No hidden fees. All fees including registration, examination, and activity fees are disclosed upfront during admission.' },
      ],
    },
    {
      name: 'Life at Lukenya College',
      order: 4,
      faqs: [
        { _key: 'l1', question: 'What clubs and activities are available?', answer: 'The college has a wide range of student clubs including drama, debate, sports teams, science clubs, and community service groups.' },
        { _key: 'l2', question: 'Is there a student cafeteria?', answer: 'Yes, the college has a modern cafeteria serving nutritious and affordable meals throughout the day.' },
        { _key: 'l3', question: 'What sports facilities are available?', answer: 'Students have access to football fields, basketball courts, volleyball courts, and a gym facility on campus.' },
        { _key: 'l4', question: 'Is the campus safe?', answer: 'Yes, the campus is secured 24/7 with trained security personnel and CCTV coverage throughout the campus grounds.' },
      ],
    },
    {
      name: 'Hostel availability',
      order: 5,
      faqs: [
        { _key: 'h1', question: 'Is hostel accommodation mandatory?', answer: 'No, hostel accommodation is optional. Students can choose to live on campus or find private accommodation nearby.' },
        { _key: 'h2', question: 'What is included in hostel fees?', answer: 'Hostel fees cover the room, Wi-Fi access, security, and access to communal kitchen and dining facilities.' },
        { _key: 'h3', question: 'Are hostels available for both male and female students?', answer: 'Yes, separate, secure hostel blocks are available for both male and female students.' },
        { _key: 'h4', question: 'How do I secure a hostel room?', answer: 'Hostel rooms are allocated on a first-come, first-served basis. Apply early through the student services office upon admission.' },
      ],
    },
    {
      name: 'Academic programs',
      order: 6,
      faqs: [
        { _key: 'a1', question: 'What programs does Lukenya College offer?', answer: 'Lukenya College offers programs in Education, Business, ICT, Technical, and Short Courses under KNEC, TVET, KASNEB, and other awarding bodies.' },
        { _key: 'a2', question: 'Can I transfer credits from another institution?', answer: 'Credit transfers are evaluated on a case-by-case basis. Contact the registrar\'s office with your academic transcripts for assessment.' },
        { _key: 'a3', question: 'Are there evening and weekend classes?', answer: 'Yes, the college offers evening and weekend classes to accommodate working professionals and part-time students.' },
        { _key: 'a4', question: 'How do I apply for admission?', answer: 'Visit the college admissions office or apply online through the college website. Required documents include KCSE certificate, national ID, and passport photos.' },
      ],
    },
  ];

  for (const topic of faqTopics) {
    await client.create({ _type: 'faqTopic', ...topic });
    console.log(`  ✅ ${topic.name} (${topic.faqs.length} FAQs)`);
  }

  // ── Staff Members ──────────────────────────────────────────
  console.log('👤 Creating staff members...');
  const staffMembers = [
    {
      name: 'Mr Joel Mulelu',
      title: 'College Principal',
      role: 'principal',
      collegeHighlight: 'Lukenya',
      order: 1,
      paragraphs: [
        'Welcome to Lukenya College — a duly accredited tertiary institution registered by the Ministry of Education and regulated by the Technical and Vocational Education and Training Authority (TVETA) and NITA.',
        'Strategically located in Emali Town, approximately 125 kilometers from Nairobi and 500 meters off Mombasa Road, the College provides a conducive learning environment designed to nurture skill development, innovation, and professional growth.',
        'Since its inception, Lukenya College has experienced remarkable growth in student enrollment, academic programmes, staff development, and infrastructure expansion. This growth reflects our commitment to delivering quality technical and professional training that meets national and global standards.',
        'Our programmes are designed to equip learners with practical competencies, entrepreneurial skills, and industry-relevant knowledge that enhance employability and promote economic empowerment. We believe education should not only transform individuals, but also create sustainable impact within communities.',
        'At Lukenya College, we cultivate a culture of discipline, hard work, integrity, and excellence. We encourage our students to take full advantage of the opportunities available, develop their talents, and confidently step into a world of limitless possibilities.',
        'I warmly invite you to join our vibrant academic community and become part of an institution dedicated to shaping skilled professionals and responsible leaders for tomorrow.',
      ],
    },
    {
      name: 'Mr Patrick Mutua',
      title: 'College Deputy Principal',
      role: 'deputy-principal',
      collegeHighlight: 'Lukenya',
      order: 2,
      paragraphs: [
        'It is my pleasure to welcome you to Lukenya College — a dynamic institution committed to excellence in Technical and Vocational Education and Training (TVET) as well as teacher education.',
        'At Lukenya, our mandate is clear: to equip learners with relevant knowledge, practical skills, and professional competencies that respond directly to industry needs. Over the years, the College has established itself as a centre of excellence, producing highly skilled technicians and competent educators who continue to make meaningful contributions locally and internationally.',
        'However, education must go beyond certification. The true value of training lies in its ability to translate into meaningful employment and entrepreneurship opportunities. As an institution, we recognize the critical importance of strengthening the link between training and the world of work.',
        'Our approach is therefore industry-focused, competency-based, and innovation-driven. We emphasize practical exposure, technical mastery, and character formation to ensure that our graduates are not only qualified, but also competitive and adaptable in an evolving global economy.',
        'At Lukenya College, we do not simply train — we prepare professionals. We are committed to shaping graduates who are solution-oriented, self-reliant, and ready to drive development in their respective fields.',
        'I invite you to join us as we continue building a future where education and industry walk hand in hand.',
      ],
    },
    {
      name: 'Stephen Mutunga',
      title: 'College School of Engineering',
      role: 'engineering-hod',
      collegeHighlight: 'Lukenya',
      order: 3,
      paragraphs: [
        'The School of Engineering and Technical Studies is committed to developing skilled, innovative, and industry-ready professionals equipped to meet the demands of a dynamic global economy.',
        'Since its establishment in 2014, the department has expanded significantly in program offerings, student enrollment, and infrastructure development. Our focus is on competency-based training that integrates technical expertise, practical application, entrepreneurship, and industrial exposure.',
        'As Head of Department, I am dedicated to ensuring high academic standards, strong industry linkages, and continuous curriculum improvement to produce graduates who are not only employable but also capable of creating opportunities for themselves and others.',
        'We take pride in shaping professionals who combine technical competence with integrity, creativity, and resilience.',
      ],
    },
    {
      name: 'Fredrick M. Nzavi',
      title: 'College School of Education',
      role: 'education-hod',
      collegeHighlight: 'Lukenya',
      order: 4,
      paragraphs: [
        'The School of Education at Lukenya College is committed to preparing competent, ethical, and innovative educators who are equipped to meet the evolving demands of the education sector.',
        'Since its establishment in 2014, the department has grown steadily, producing highly skilled teachers who serve in both public and private institutions across the country. Our programmes combine strong pedagogical foundations with practical teaching experience to ensure our graduates are confident, adaptable, and classroom-ready.',
        'As Head of Department, I am dedicated to maintaining high academic standards, strengthening professional mentorship, and fostering a culture of excellence within teacher training. We strive to nurture educators who not only impart knowledge but also inspire, lead, and positively transform their communities.',
      ],
    },
    {
      name: 'Dorcas M Muambi',
      title: 'College Registrar',
      role: 'registrar',
      collegeHighlight: 'Lukenya',
      order: 5,
      paragraphs: [
        'It is my pleasure to welcome you to Lukenya College and reaffirm our commitment to providing quality education and professional training to all qualified students.',
        'Lukenya College has engaged highly competent teaching and non-teaching staff to ensure that both the academic and welfare needs of our students are effectively met. Having evolved from a technical training institute, we continue to uphold our core value of hands-on knowledge, ensuring that practical skills remain central to our training philosophy.',
        'The Office of the Registrar plays a vital role in supporting the academic journey of our students. Our responsibilities include:',
      ],
      responsibilities: [
        'Student admissions',
        'Orientation of new students',
        'Management of academic records',
        'Coordination of examinations and processing of results',
        'Preparation of academic transcripts and certificates',
        'Graduation planning and certification',
      ],
      closingParagraphs: [
        'We provide comprehensive information and support services both online and through our administrative offices. Prospective and continuing students are encouraged to reach out through our official communication channels, including our website and social media platforms.',
        'I invite all qualified individuals to explore the wide range of programmes offered at Lukenya College — from Trade Tests to Diploma courses across various disciplines.',
        'Join us as we work together toward building your dream career.',
      ],
    },
  ];

  for (const staff of staffMembers) {
    await client.create({ _type: 'staffMember', ...staff });
    console.log(`  ✅ ${staff.name} (${staff.role})`);
  }

  // ── School Pages ───────────────────────────────────────────
  console.log('🏛️  Creating school pages...');
  const schoolPages = [
    {
      name: 'School of Engineering',
      slug: { _type: 'slug', current: 'school-of-engineering' },
      introText: 'The School of Engineering and Technical Studies is committed to developing skilled, innovative, and industry-ready professionals.',
      programmes: [
        'Diploma in Building Technology',
        'Diploma in Civil Engineering',
        'Diploma in Electrical and Electronics Engineering (Power Option)',
        'Diploma in Food and Beverage Production, Sales & Service',
        'Diploma in Social Work and Community Development',
        'Diploma in General Agriculture',
      ],
      assessmentItems: [
        'Continuous Assessment Tests (CATs)',
        'End-of-term examinations',
        'Trade projects',
        'National examinations',
      ],
      trainingApproach: [
        'Practical skills development',
        'Technical drawing and design',
        'Entrepreneurship and business planning',
        'Project-based learning',
        'Industrial exposure',
      ],
      attachmentTags: [
        'Real-world exposure',
        'Professional experience',
        'Hands-on learning',
      ],
    },
    {
      name: 'School of Education',
      slug: { _type: 'slug', current: 'school-of-education' },
      introText: 'The School of Education is committed to preparing competent, ethical, and innovative educators.',
      programmes: [],
      assessmentItems: [],
      trainingApproach: [],
      attachmentTags: [],
    },
    {
      name: 'School of Business',
      slug: { _type: 'slug', current: 'school-of-business' },
      introText: 'The School of Business equips students with essential business acumen and management skills.',
      programmes: [],
      assessmentItems: [],
      trainingApproach: [],
      attachmentTags: [],
    },
  ];

  for (const school of schoolPages) {
    await client.create({ _type: 'schoolPage', ...school });
    console.log(`  ✅ ${school.name}`);
  }

  // ── Program Options (form dropdown) ────────────────────────
  console.log('📋 Creating program options...');
  const programOptions = [
    'Department of Education',
    'Business Department',
    'Technical Department',
    'Diploma in ICT',
    'Certificate in Accounting',
    'Other',
  ];

  for (let i = 0; i < programOptions.length; i++) {
    await client.create({
      _type: 'programOption',
      name: programOptions[i],
      order: i + 1,
    });
    console.log(`  ✅ ${programOptions[i]}`);
  }

  // ── News Articles ──────────────────────────────────────────
  console.log('📰 Creating news articles...');
  const newsArticles = [
    {
      title: 'Short Discussions About Business In Pandemic Covid 19',
      category: 'Examinations',
      author: 'Admin',
      publishedAt: '2020-11-23T00:00:00.000Z',
      excerpt: 'A discussion on how businesses can adapt and thrive during challenging times.',
    },
    {
      title: "Spend Weekend Time With All Elmna's Team Members",
      category: 'Sports',
      author: 'Admin',
      publishedAt: '2020-11-23T00:00:00.000Z',
      excerpt: 'Team building activities and sports events that bring our community together.',
    },
    {
      title: 'Learn How To Increase Business Network In Pandemic',
      category: 'Admissions',
      author: 'Admin',
      publishedAt: '2020-11-23T00:00:00.000Z',
      excerpt: 'Strategies for expanding your professional network in challenging environments.',
    },
  ];

  for (const article of newsArticles) {
    await client.create({
      _type: 'newsArticle',
      ...article,
      slug: { _type: 'slug', current: article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
    });
    console.log(`  ✅ ${article.title}`);
  }

  // ── Gallery Images ─────────────────────────────────────────
  console.log('🖼️  Creating gallery image entries...');
  const galleryImages = [
    { localImage: 'group pic.jpg', alt: 'Group photo', category: 'students' },
    { localImage: 'greentrees.jpg', alt: 'Green trees on campus', category: 'campus' },
    { localImage: 'ballot-box.jpg', alt: 'Student elections', category: 'events' },
    { localImage: 'chefs.jpg', alt: 'Culinary students', category: 'training' },
    { localImage: 'road.jpg', alt: 'Campus road', category: 'campus' },
    { localImage: 'signboard.jpg', alt: 'College signboard', category: 'campus' },
    { localImage: 'waitress.jpg', alt: 'Hospitality training', category: 'training' },
    { localImage: 'home.jpg', alt: 'College building', category: 'campus' },
    { localImage: 'shop.jpg', alt: 'College shop', category: 'facilities' },
    { localImage: 'salon.jpg', alt: 'Beauty salon', category: 'training' },
    { localImage: 'technicians.jpg', alt: 'Technical students', category: 'training' },
    { localImage: 'mechanics.jpg', alt: 'Mechanics workshop', category: 'training' },
    { localImage: 'kinyozi.jpg', alt: 'Barbering students', category: 'training' },
    { localImage: 'plumber-students.jpg', alt: 'Plumbing students', category: 'training' },
    { localImage: 'beauty.jpg', alt: 'Beauty therapy', category: 'training' },
    { localImage: 'library.jpg', alt: 'College library', category: 'facilities' },
    { localImage: 'cooks.jpg', alt: 'Cooking class', category: 'training' },
    { localImage: 'computers.jpg', alt: 'Computer lab', category: 'facilities' },
    { localImage: 'gate.jpg', alt: 'College entrance gate', category: 'campus' },
    { localImage: 'engineer_cam.jpg', alt: 'Engineering student', category: 'training' },
    { localImage: 'electician.jpg', alt: 'Electrical workshop', category: 'training' },
  ];

  for (let i = 0; i < galleryImages.length; i++) {
    const img = galleryImages[i];
    const doc: any = {
      _type: 'galleryImage',
      alt: img.alt,
      category: img.category,
      order: i + 1,
    };

    const imagePath = path.join(__dirname, '..', 'public', img.localImage);
    if (fs.existsSync(imagePath)) {
      const imageAsset = await client.assets.upload('image', fs.createReadStream(imagePath), {
        filename: img.localImage,
      });
      doc.image = {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageAsset._id },
      };
    }

    await client.create(doc);
    console.log(`  ✅ ${img.alt}`);
  }

  console.log('\n✨ Content migration complete!');
  console.log('📊 Summary:');
  console.log(`   - 1 site settings document`);
  console.log(`   - ${slides.length} facility slides`);
  console.log(`   - ${cards.length} value cards`);
  console.log(`   - ${milestones.length} milestones`);
  console.log(`   - ${amenities.length} amenities`);
  console.log(`   - 2 program categories with ${knecCourses.length + shortCourses.length} courses`);
  console.log(`   - ${faqTopics.length} FAQ topics with ${faqTopics.reduce((sum, t) => sum + t.faqs.length, 0)} total FAQs`);
  console.log(`   - ${staffMembers.length} staff members`);
  console.log(`   - ${schoolPages.length} school pages`);
  console.log(`   - ${programOptions.length} program options`);
  console.log(`   - ${newsArticles.length} news articles`);
  console.log(`   - ${galleryImages.length} gallery images`);
}

seedContent().catch(console.error);
