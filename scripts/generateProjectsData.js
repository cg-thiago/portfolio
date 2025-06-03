const fs = require('fs');
const path = require('path');

const PROJECTS_DIR = path.join(__dirname, '../public/projects');
const OUTPUT_FILE = path.join(__dirname, '../app/data/projects.js');

function readTextFileIfExists(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8').trim();
  } catch {
    return '';
  }
}

function getImages(dir, exts = ['.jpg', '.jpeg', '.png', '.webp', '.gif']) {
  return fs.readdirSync(dir)
    .filter(f => exts.includes(path.extname(f).toLowerCase()))
    .map(f => `/projects/${path.basename(dir)}/${f}`);
}

function getProjectData(projectDir) {
  const name = path.basename(projectDir);
  const files = fs.readdirSync(projectDir);
  const heroImg = files.find(f => /^hero\.(jpg|jpeg|png|webp)$/i.test(f));
  const thumbImg = files.find(f => /thumb\.(jpg|jpeg|png|webp)$/i.test(f));
  const allImages = getImages(projectDir);
  // Remove hero/thumbnail from gallery
  const gallery = allImages.filter(img => !img.includes('hero.') && !img.includes('thumb.'));

  // Read text fields
  const description = readTextFileIfExists(path.join(projectDir, 'description.txt'));
  const challenge = readTextFileIfExists(path.join(projectDir, 'challenge.txt'));
  const goals = readTextFileIfExists(path.join(projectDir, 'goals.txt')).split('\n').filter(Boolean);
  const testimonial = readTextFileIfExists(path.join(projectDir, 'testimonial.txt'));

  // Fallbacks
  const title = name.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const slug = name.toLowerCase().replace(/\s+/g, '-');

  return {
    id: slug,
    title,
    slug,
    heroImage: heroImg ? `/projects/${name}/${heroImg}` : gallery[0] || '',
    thumbnail: thumbImg ? `/projects/${name}/${thumbImg}` : heroImg ? `/projects/${name}/${heroImg}` : gallery[0] || '',
    description,
    challenge,
    goals,
    testimonial,
    gallery,
  };
}

function main() {
  const projects = fs.readdirSync(PROJECTS_DIR)
    .filter(f => fs.statSync(path.join(PROJECTS_DIR, f)).isDirectory())
    .map(f => getProjectData(path.join(PROJECTS_DIR, f)));

  const output = `export const projectsData = ${JSON.stringify(projects, null, 2)};\n`;
  fs.writeFileSync(OUTPUT_FILE, output, 'utf-8');
  console.log(`Generated ${OUTPUT_FILE} with ${projects.length} projects.`);
}

main(); 