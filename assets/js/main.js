const projects = [
  {
    id: "dior",
    title: "Christian Dior Couture",
    subtitle: "Boutique Restaurant à Saint-Tropez",
    kind: "professionnel",
    typeLabel: "Retail / Concept Design",
    cover: "assets/img/dior-hero.jpg",
    year: "Projet professionnel",
    summary: "Développement des concepts retail de la boutique Dior Saint-Tropez : conception du mobilier, modélisation 3D et production des plans/coupes.",
    gallery: [
      ["assets/img/p3.jpg", "Développement du concept retail et intégration du mobilier.", "wide"],
      ["assets/img/p3.jpg", "Vue intérieure et proposition de parcours.", ""]
    ]
  },
  {
    id: "studios40",
    title: "Studios 40",
    subtitle: "Family Room — The Voice",
    kind: "professionnel",
    typeLabel: "Scénographie",
    cover: "assets/img/studios-hero.jpg",
    year: "Projet professionnel",
    summary: "Réalisation d'animations et de rendus, mise au propre des plans et travail de conception sur la Family Room The Voice.",
    gallery: [
      ["assets/img/p4.jpg", "Rendus et documents de conception de la Family Room.", "wide"]
    ]
  },
  {
    id: "penniman",
    title: "Agence Fortuné Penniman",
    subtitle: "Villa Mastroianni",
    kind: "professionnel",
    typeLabel: "Rénovation / CAO",
    cover: "assets/img/penniman-hero.jpg",
    year: "Projet professionnel",
    summary: "Développement du projet de rénovation de la Villa Mastroianni : production des plans, coupes et élévations en CAO.",
    gallery: [
      ["assets/img/p5.jpg", "Plans, coupes et élévations du projet.", "wide"]
    ]
  },
  {
    id: "nicolas",
    title: "Agence Nicolas Barbu",
    subtitle: "Rénovation d’un hall d’immeuble",
    kind: "professionnel",
    typeLabel: "Architecture / DCE",
    cover: "assets/img/nicolas-hero.jpg",
    year: "Projet professionnel",
    summary: "Production des documents de conception pour la rénovation d’un hall d’immeuble : plans sols/plafonds, détails luminaires et coupes sur Archicad.",
    gallery: [
      ["assets/img/p6.jpg", "Plans techniques, détails et proposition de matérialité.", "wide"]
    ]
  },
  {
    id: "arnold",
    title: "Agence Arnold",
    subtitle: "Projet d’aménagement de bureaux",
    kind: "professionnel",
    typeLabel: "BIM / Tertiaire",
    cover: "assets/img/arnold-hero.jpg",
    year: "Projet professionnel",
    summary: "Développement BIM d’un projet d’aménagement de bureaux : modélisation Revit, exploitation de nuages de points et production des documents techniques.",
    gallery: [
      ["assets/img/p7.jpg", "Plan du projet et développement BIM.", "wide"]
    ]
  },
  {
    id: "isatis",
    title: "ISATIS",
    subtitle: "Tiny House d’un artisan pastelier",
    kind: "academique",
    typeLabel: "Architecture / Habitat",
    cover: "assets/img/isatis-hero.jpg",
    year: "Projet académique",
    summary: "Tiny House en Occitanie, conçue pour accueillir un artisan pastelier sur les berges du Tarn près d’Albi. La structure s’inspire du colombage traditionnel et le projet met en valeur le patrimoine du pastel.",
    gallery: [
      ["assets/img/p8.jpg", "Vue intérieure — relation entre espace de vie, travail et paysage.", ""],
      ["assets/img/p9.jpg", "Atmosphère, implantation et recherche de matérialité.", ""],
      ["assets/img/p10.jpg", "Plans et coupes du projet.", "wide"]
    ]
  },
  {
    id: "ludoparc",
    title: "LUDO-PARC",
    subtitle: "Re-conversion du café « Fluctuat Nec Mergitur »",
    kind: "academique",
    typeLabel: "Architecture / Espace public",
    cover: "assets/img/ludo-hero.jpg",
    year: "Projet académique",
    summary: "Reconversion du café situé place de la République en ludothèque ouverte à tous, avec un espace de jeux intérieur / extérieur et une extension en polycarbonate structurée par des portiques et un système de rails.",
    gallery: [
      ["assets/img/p11.jpg", "Vue intérieure — nouvel espace de jeu.", ""],
      ["assets/img/p12.jpg", "Système constructif et organisation des flux.", ""],
      ["assets/img/p13.jpg", "Déploiement du dispositif vers le parvis.", "wide"]
    ]
  },
  {
    id: "reed",
    title: "Collection REED",
    subtitle: "Tabouret et coupe à fruit en roseau",
    kind: "objet",
    typeLabel: "Design / Artisanat",
    cover: "assets/img/reed-hero.jpg",
    year: "Projet académique",
    summary: "Collection explorant les qualités du roseau de Camargue à travers plusieurs objets. « The Nest » est un objet hybride ; « Piupiu » réinterprète l’assise avec un habillage en roseaux.",
    gallery: [
      ["assets/img/p14.jpg", "Recherche d’usage et mise en situation.", ""],
      ["assets/img/p15.jpg", "Le tabouret et son système formel.", ""],
      ["assets/img/p16.jpg", "Décomposition et détails de l’objet.", "wide"]
    ]
  }
];

function cardTemplate(p){
  return `
    <article class="project-card" data-kind="${p.kind}">
      <a href="projet.html?id=${p.id}" aria-label="Voir ${p.title}">
        <div class="card-image">
          <img src="${p.cover}" alt="${p.title} — ${p.subtitle}" loading="lazy">
        </div>
        <div class="card-meta">
          <div>
            <div class="card-title">${p.title}</div>
            <div class="card-sub">${p.subtitle}</div>
          </div>
          <div class="card-kind">${p.typeLabel}</div>
        </div>
      </a>
    </article>
  `;
}

function initHome(){
  const grid=document.querySelector("#project-grid");
  if(!grid) return;
  grid.innerHTML=projects.map(cardTemplate).join("");

  const buttons=[...document.querySelectorAll(".filter")];
  buttons.forEach(btn=>{
    btn.addEventListener("click",()=>{
      buttons.forEach(b=>b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter=btn.dataset.filter;
      document.querySelectorAll(".project-card").forEach(card=>{
        card.classList.toggle("is-hidden", filter!=="all" && card.dataset.kind!==filter);
      });
    });
  });
}

function initProject(){
  const host=document.querySelector("#project-detail");
  if(!host) return;
  const id=new URLSearchParams(location.search).get("id") || "dior";
  const index=Math.max(0,projects.findIndex(p=>p.id===id));
  const p=projects[index];
  if(!p) return;

  document.title=`${p.title} — Luna Barbu`;
  const previous=projects[(index-1+projects.length)%projects.length];
  const next=projects[(index+1)%projects.length];

  const gallery=p.gallery.map(([src,alt,size])=>`
    <figure class="${size}">
      <img src="${src}" alt="${alt}" loading="lazy">
    </figure>`).join("");

  host.innerHTML=`
    <div class="project-hero">
      <div>
        <a class="detail-back" href="index.html#projets">← Retour aux projets</a>
        <p class="eyebrow">${p.typeLabel}</p>
        <h1>${p.title}</h1>
        <p class="project-lede">${p.summary}</p>
        <dl class="project-data">
          <div><dt>Projet</dt><dd>${p.subtitle}</dd></div>
          <div><dt>Catégorie</dt><dd>${p.year}</dd></div>
        </dl>
      </div>
      <img src="${p.cover}" alt="${p.title} — image principale">
    </div>
    <section class="detail-gallery">${gallery}</section>
    <div class="detail-footer">
      <a href="projet.html?id=${previous.id}">← ${previous.title}</a>
      <a class="next-link" href="projet.html?id=${next.id}">Projet suivant →</a>
    </div>
  `;
}

function initMenu(){
  const btn=document.querySelector(".menu-toggle");
  const nav=document.querySelector("#site-nav");
  if(!btn||!nav) return;
  btn.addEventListener("click",()=>{
    const open=nav.classList.toggle("is-open");
    btn.setAttribute("aria-expanded",String(open));
  });
}
document.querySelector("#year")?.replaceChildren(document.createTextNode(new Date().getFullYear()));
initHome();
initProject();
initMenu();
