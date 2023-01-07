// gitprofile.config.js

const config = {
  github: {
    username: 'shinydev1108', // Your GitHub org/user name. (Required)
    sortBy: 'stars', // stars | updated
    limit: 16, // How many projects to display.
    exclude: {
      forks: false, // Forked projects will not be displayed if set to true.
      projects: [], // These projects will not be displayed. example: ['my-project1', 'my-project2']
    },
  },
  social: {
    facebook: '',
    instagram: '',
    dribbble: '',
    behance: '',
    stackoverflow: '', // format: userid/username
    website: 'https://gitprofile-59b04.firebaseapp.com/',
    phone: '',
    email: 'shinydev1108@gmail.com',
  },
  resume: {
    fileUrl:
      '', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'JavaScript',
    'React.js',
    'Node.js',
    'Vue.js',
    'Angular.js',
    'Express.js',
    'MySQL',
    'MongoDB',
    'Git',
    'Docker',
    'TypeScript',
    'CSS',
    'Antd',
    'Tailwind',
    'MaterialUI',
    'AWS Lambda',
  ],
  experiences: [
    {
      company: 'Randstad Technologies',
      position: 'Junior Full-Stack Developer',
      from: 'June 2014',
      to: 'August 2017'
    },
    {
      company: 'Netcom Business Services',
      position: 'Software Engineer0',
      from: 'August 2017',
      to: 'August 2020'
    },
    {
      company: 'Deloitte',
      position: 'Senior Full-Stack Developer',
      from: 'August 2020',
      to: 'Present'
    },
  ],
  /* certifications: [
    {
      name: 'Lorem ipsum',
      body: 'Lorem ipsum dolor sit amet',
      year: 'March 2022',
      link: 'https://example.com'
    },
  ], */
  education: [
    {
      institution: 'University of Tennessee',
      degree: 'B.S',
      from: '2019',
      to: '2013',
    },
  ],

  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'business',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Hide the ring in Profile picture
    hideAvatarRing: false,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'procyon',
    ],

    // Custom theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },
};

export default config;
