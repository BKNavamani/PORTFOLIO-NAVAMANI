import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

async function generatePDF() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
  const { width, height } = page.getSize();

  const fontHelvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontHelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontHelveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Color Palette - Forest Green Accent Theme
  const primaryColor = rgb(0.18, 0.31, 0.23); // #2f4f3a
  const accentColor = rgb(0.85, 0.62, 0.15); // Golden Amber
  const darkText = rgb(0.15, 0.17, 0.20);
  const grayText = rgb(0.40, 0.45, 0.50);
  const lightBg = rgb(0.96, 0.97, 0.96);
  const lineSeparator = rgb(0.88, 0.90, 0.88);

  // Top Header Banner
  page.drawRectangle({
    x: 0,
    y: height - 120,
    width: width,
    height: 120,
    color: primaryColor,
  });

  // Candidate Name
  page.drawText('NAVAMANI B', {
    x: 40,
    y: height - 50,
    size: 26,
    font: fontHelveticaBold,
    color: rgb(1, 1, 1),
  });

  // Professional Title
  page.drawText('Aspiring Frontend Developer & UI/UX Enthusiast', {
    x: 40,
    y: height - 72,
    size: 13,
    font: fontHelvetica,
    color: accentColor,
  });

  // Contact Info Row
  const contactText = 'Email: navamanib01@gmail.com  |  Location: India  |  Portfolio: Live Web App';
  page.drawText(contactText, {
    x: 40,
    y: height - 95,
    size: 9.5,
    font: fontHelvetica,
    color: rgb(0.9, 0.93, 0.91),
  });

  let currentY = height - 145;

  // Helper Section Heading
  function drawSectionHeading(title) {
    page.drawText(title.toUpperCase(), {
      x: 40,
      y: currentY,
      size: 12,
      font: fontHelveticaBold,
      color: primaryColor,
    });
    
    page.drawLine({
      start: { x: 40, y: currentY - 5 },
      end: { x: width - 40, y: currentY - 5 },
      thickness: 1.5,
      color: primaryColor,
    });

    currentY -= 22;
  }

  // 1. Executive Summary
  drawSectionHeading('Professional Summary');
  const summaryLines = [
    'Passionate and detail-oriented Aspiring Frontend Developer with strong skills in HTML5, CSS3, JavaScript (ES6+),',
    'Bootstrap 5, and modern web frameworks. Focused on creating highly responsive, accessible, and user-centric web',
    'applications. Proven ability to translate wireframes into pixel-perfect code with clean design aesthetics.'
  ];
  for (const line of summaryLines) {
    page.drawText(line, {
      x: 40,
      y: currentY,
      size: 9.5,
      font: fontHelvetica,
      color: darkText,
    });
    currentY -= 14;
  }

  currentY -= 10;

  // 2. Technical Skills Grid
  drawSectionHeading('Technical Skills');
  
  const skillCategories = [
    { label: 'Frontend & UI:', val: 'HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, Tailwind CSS, React' },
    { label: 'Languages & DB:', val: 'Java, Python, MySQL' },
    { label: 'Developer Tools:', val: 'Git, GitHub, VS Code, npm, REST APIs, EmailJS Integration' },
    { label: 'UI/UX & Design:', val: 'Figma, Canva, Adobe Photoshop, Responsive Web Design' }
  ];

  for (const cat of skillCategories) {
    page.drawText(cat.label, {
      x: 40,
      y: currentY,
      size: 9.5,
      font: fontHelveticaBold,
      color: primaryColor,
    });
    page.drawText(cat.val, {
      x: 155,
      y: currentY,
      size: 9.5,
      font: fontHelvetica,
      color: darkText,
    });
    currentY -= 15;
  }

  currentY -= 10;

  // 3. Featured Projects
  drawSectionHeading('Key Projects');

  const projects = [
    {
      name: 'Personal Portfolio Website & Interactive Showcase',
      tech: 'HTML5, CSS3, Bootstrap 5, JavaScript, EmailJS',
      desc: 'Built a responsive, high-performance portfolio featuring smooth scrolling, interactive project cards, dynamic skill grid, and live EmailJS form contact submission.'
    },
    {
      name: 'Modern E-Commerce Web Application',
      tech: 'JavaScript (ES6+), Bootstrap 5, HTML5/CSS3',
      desc: 'Designed an interactive online shopping portal with real-time product filtering, shopping cart drawer management, and responsive grid layouts.'
    },
    {
      name: 'Analytics & Productivity Dashboard',
      tech: 'JavaScript, CSS Grid/Flexbox, Chart Integration',
      desc: 'Developed a real-time metrics tracking dashboard with customizable widgets, data visualization cards, and adaptive light/dark UI themes.'
    },
    {
      name: 'Weather & Climate Forecast App',
      tech: 'JavaScript, RESTful APIs, CSS3',
      desc: 'Created an interactive weather application fetching real-time meteorological metrics, 5-day forecasts, and dynamic atmospheric background themes.'
    }
  ];

  for (const proj of projects) {
    page.drawText(`•  ${proj.name}`, {
      x: 40,
      y: currentY,
      size: 10,
      font: fontHelveticaBold,
      color: darkText,
    });

    const techText = `[ ${proj.tech} ]`;
    page.drawText(techText, {
      x: width - 40 - fontHelveticaOblique.widthOfTextAtSize(techText, 8.5),
      y: currentY,
      size: 8.5,
      font: fontHelveticaOblique,
      color: grayText,
    });

    currentY -= 14;

    page.drawText(proj.desc, {
      x: 52,
      y: currentY,
      size: 9,
      font: fontHelvetica,
      color: darkText,
    });

    currentY -= 18;
  }

  currentY -= 5;

  // 4. Education & Credentials
  drawSectionHeading('Education & Certifications');

  const eduItems = [
    {
      degree: 'Bachelor of Science / Technology in Computer Science',
      institution: 'Affiliated University, India',
      details: 'Focus on Software Engineering, Web Technologies, Database Systems, and Object-Oriented Programming.'
    },
    {
      degree: 'Full-Stack Web Development & UI/UX Certification',
      institution: 'Online Technical Certification',
      details: 'Comprehensive coursework covering Responsive Design, Modern JavaScript, UI/UX Principles, and Git Version Control.'
    }
  ];

  for (const item of eduItems) {
    page.drawText(`•  ${item.degree}`, {
      x: 40,
      y: currentY,
      size: 10,
      font: fontHelveticaBold,
      color: darkText,
    });
    currentY -= 14;

    page.drawText(item.institution, {
      x: 52,
      y: currentY,
      size: 9,
      font: fontHelveticaOblique,
      color: primaryColor,
    });
    currentY -= 13;

    page.drawText(item.details, {
      x: 52,
      y: currentY,
      size: 8.5,
      font: fontHelvetica,
      color: grayText,
    });
    currentY -= 18;
  }

  // Footer Note
  page.drawText('Navamani B — Professional Resume — References Available Upon Request', {
    x: width / 2 - fontHelveticaOblique.widthOfTextAtSize('Navamani B — Professional Resume — References Available Upon Request', 8) / 2,
    y: 25,
    size: 8,
    font: fontHelveticaOblique,
    color: grayText,
  });

  const pdfBytes = await pdfDoc.save();

  // Save to resume/Navamani_B_Resume.pdf and portfolio/resume/Navamani_B_Resume.pdf
  fs.mkdirSync('resume', { recursive: true });
  fs.mkdirSync('portfolio/resume', { recursive: true });

  fs.writeFileSync('resume/Navamani_B_Resume.pdf', pdfBytes);
  fs.writeFileSync('portfolio/resume/Navamani_B_Resume.pdf', pdfBytes);

  console.log('Resume PDF generated successfully at resume/Navamani_B_Resume.pdf and portfolio/resume/Navamani_B_Resume.pdf!');
}

generatePDF().catch(console.error);
