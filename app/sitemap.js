import { projectsData } from './data/projects';

export default function sitemap() {
  const baseUrl = 'https://thiagopin.to';
  
  // Static routes
  const routes = [
    '',
    '/about',
    '/work',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic project routes
  const projectRoutes = projectsData.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes];
} 