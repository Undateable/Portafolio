// Schema.org structured data for SEO
const schemaData = {
    "@context": "http://schema.org",
    "@type": "Person",
    "name": "Dante Pentito",
    "jobTitle": "Game and Narrative Designer",
    "url": "https://yourwebsite.com",
    "description": "Game and Narrative Designer with experience in Unreal Engine and Unity. Specialized in game mechanics, level design, and interactive storytelling.",
    "alumniOf": {
        "@type": "Organization",
        "name": "Brinca – Campus de Videojuegos"
    },
    "knowsAbout": [
        "Game Design",
        "Narrative Design", 
        "Level Design",
        "Unreal Engine",
        "Unity",
        "C++",
        "C#",
        "Blueprint Visual Scripting"
    ],
    "sameAs": [
        "https://www.linkedin.com/in/dpentito/",
        "https://github.com/Undateable",
        "https://dannette.itch.io/"
    ],
    "image": "assets/img/logodp.png",
    "email": "pentitodante2@gmail.com"
};

// Inject schema data into document
document.addEventListener('DOMContentLoaded', function() {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData, null, 2);
    document.head.appendChild(script);
    
    console.log('Schema.org structured data loaded successfully');
});