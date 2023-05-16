interface Card {
    id: number;
    name: string;
    pseudo: string;
    backImageUrl: any;
    frontImageUrl: any;
    tendance: string[];
    }
  
  const CARD_DECK = [
    {
      id: 1,
      name: 'le bateleur',
      pseudo: "l'Iris de Magie",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/1-le-bateleur.png'),
      tendance: [
        "Ajourd'hui votre créativité sera à son apogée. Profitez-en pour explorer de nouveaux projets et trouver des solutions innovantes.",
        "Aujourd'hui votre capacité à communiquer sera mise en valeur. Utilisez votre intelligence et votre esprit vif pour convaincre les autres de vos idées.",
        "Votre esprit aventureux vous amènera à découvrir de nouvelles opportunités et à prendre des risques. Faites confiance à votre instinct et foncez !"
      ]
    },
    {
      id: 2,
      name: 'la papesse',
      pseudo: "L'Iris de Sagesse",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/2-la-papesse.png'),
      tendance: [
        "Votre intuition sera particulièrement forte aujourd'hui. Écoutez votre voix intérieure pour prendre des décisions importantes.",
        "Vous êtes en train d'acquérir une sagesse nouvelle. Prenez le temps de méditer et de réfléchir pour mieux comprendre vos émotions et vos motivations.",
        "Votre sensibilité sera mise à l'honneur aujourd'hui. Profitez-en pour nourrir votre créativité et votre inspiration."
      ]
    },
    {
      id: 3,
      name: 'l imperatrice',
      pseudo: "L'Iris de Fertilité",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/3-l-imperatrice.png'),
      tendance: [
        "La prospérité financière sera à l'honneur aujourd'hui. Profitez de cette période favorable pour investir dans vos projets à long terme.",
        "Votre charisme et votre capacité à plaire aux autres seront mis en valeur. Utilisez-les pour atteindre vos objectifs professionnels et personnels.",
        "Votre stabilité et votre sécurité financière seront mises en valeur. Faites preuve de prudence et d'organisation pour consolider vos acquis."
      ]
    },
    {
      id: 4,
      name: 'l empereur',
      pseudo: "l'Iris de Stabilité",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/4-l-empereur.png'),
      tendance: [
        "Aujourd'hui votre leadership et votre autorité seront à l'honneur. Utilisez-les pour prendre des décisions importantes et inspirer les autres.",
        "Vous êtes en train de mettre en place une structure solide pour réaliser vos projets à long terme. Restez organisé et persévérant pour réussir.",
        "Votre sens de l'analyse et votre pragmatisme sont à l'honneur. Utilisez-les pour résoudre des problèmes complexes et prendre des décisions importantes."
      ]
  },
  {
      id: 5,
      name: 'le pape',
      pseudo: "l'Iris du Sage Divin",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/5-le-pape.png'),
      tendance: [
        "Vous êtes en train de chercher des réponses spirituelles à vos questions existentielles. Profitez de cette période pour vous connecter avec des mentors et des guides spirituels",
        "Votre empathie et votre sensibilité sont sur le devant de la scène. Utilisez-les pour aider les autres et créer des relations significatives.",
        "Votre besoin de sécurité et de stabilité vous amènera à chercher des réponses intérieures. Prenez le temps de vous connecter avec votre sagesse intérieure."
      ]
  },
  {
      id: 6,
      name: 'l amoureux',
      pseudo: "l'Iris de Tentation",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/6-l-amoureux.png'),
      tendance: [
        "Vous êtes en train de faire un choix important en matière de relations ou de partenariats. Faites confiance à votre cœur pour prendre la bonne décision.",
        "Votre vie amoureuse sera au premier plan aujourd'hui. Profitez de cette période pour renforcer les liens avec votre partenaire ou pour rencontrer de nouvelles personnes.",
        "Vous êtes en train de chercher l'équilibre dans votre vie amoureuse. Soyez honnête avec vous-même et avec les autres pour atteindre une relation harmonieuse."
      ]
  },
  {
      id: 7,
      name: 'le chariot',
      pseudo: "l'Iris de Succès",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/7-le-chariot.png'),
      tendance: [
        "Vous êtes en train de prendre les commandes de votre vie. Faites preuve de courage et de détermination pour atteindre vos objectifs.",
        "Votre besoin de sécurité et de protection sera mis en avant aujourd'hui. Prenez le temps de consolider votre position et de renforcer votre confiance en vous-même.",
        "Votre ambition et votre réussite professionnelle seront mises en valeur. Utilisez votre force de caractère pour surmonter les obstacles et atteindre vos objectifs."
      ]
  },
  {
      id: 8,
      name: 'la justice',
      pseudo: "l'Iris de Feu",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/8-la-justice.png'),
      tendance: [
        "Vous ressentez un besoin de justice et d'équité. Soyez impartial et objectif dans vos décisions et vos actions.",
        "Votre sens de la justice et de l'équité sera mis à l'honneur. Utilisez-le pour promouvoir des causes justes et équitables.",
        "Votre capacité à prendre des décisions justes et équitables sera mise en avant aujourdhui. Faites preuve de courage pour défendre vos convictions."
      ]
  },
  {
      id: 9,
      name: 'l hermite',
      pseudo: "l'Iris d'Introspection",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/9-l-hermite.png'),
      tendance: [
        "Vous êtes en train de chercher des réponses intérieures à vos questions existentielles. Profitez de cette période pour vous connecter avec votre sagesse intérieure et trouver la paix intérieure.",
        "Vous ressentez un besoin de solitude et d'introspection. Prenez le temps de vous recentrer sur vous-même et de réfléchir à vos objectifs de vie.",
        "Votre besoin de spiritualité et de connexion avec l'univers sera mis à l'honneur. Profitez de cette période pour méditer et pour vous connecter avec votre essence spirituelle."
      ]
  },
  {
      id: 10,
      name: 'la roue de la fortune',
      pseudo: "l'Iris de Destinée",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/10-la-roue-de-fortune.png'),
      tendance: [
        "Votre chance et votre opportunité sont au rendez-vous. Soyez ouvert aux nouvelles possibilités et aux changements imprévus.",
        "Vous êtes en train de vivre un moment de transformation et de changement. Soyez ouvert à l'évolution et à l'adaptation pour réussir.",
        "Votre chance et votre réussite seront mises en avant. Utilisez votre confiance en vous et votre créativité pour saisir les opportunités qui se présenten"
      ]
  },
  {
      id: 11,
      name: 'la force',
      pseudo: "l'Iris de Volonté",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/11-la-force.jpg'),
      tendance: [
        "Votre force intérieure et votre détermination seront mises à l'honneur. Utilisez votre courage et votre ténacité pour surmonter les obstacles et atteindre vos objectifs.",
        "Votre force de caractère et votre leadership seront mis en avant. Utilisez-les pour inspirer les autres et pour atteindre une position de pouvoir.",
        " Votre force émotionnelle et votre capacité à résister à la pression seront mises en valeur. Utilisez-les pour surmonter les défis et les difficultés."
      ]
  },
  {
      id: 12,
      name: 'le pendu',
      pseudo: "l'Iris de Patience",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/12-le-pendu.jpg'),
      tendance: [
        "Vous êtes en train de vivre une période de sacrifice et de lâcher prise. Acceptez ce qui ne peut être changé et profitez de cette période pour réfléchir à vos priorités.",
        "Votre besoin de détachement et de recul sera mis en avant. Prenez le temps de vous recentrer sur vous-même et de trouver la paix intérieure.",
        "Votre capacité à accepter les changements et les défis sera mise à l'honneur. Utilisez votre souplesse pour vous adapter aux circonstances et pour trouver des solutions créatives."
      ]
  },
  {
      id: 13,
      name: 'l arcane sans nom',
      pseudo: "l'Iris Big Bang",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/13-l-arcane-sans-nom.jpg'),
      tendance: [
        "Vous êtes en train de vivre un moment de transformation et de renouveau. Laissez aller ce qui n'a plus sa place dans votre vie pour faire place au neuf.",
        "Votre besoin de changement et d'innovation sera mis en avant. Soyez prêt à abandonner le passé pour embrasser le futur.",
        "Votre capacité à surmonter les obstacles et les difficultés sera mise en valeur. Utilisez votre force intérieure pour transformer les défis en opportunités."
      ]
  },
  {
      id: 14,
      name: 'la temperance',
      pseudo: "l'Iris d'Equilibre",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/14-la-temperance.jpg'),
      tendance: [
        "Votre besoin d'harmonie et d'équilibre sera mis en avant. Trouvez le juste équilibre entre vos obligations et vos désirs personnels.",
        "Votre capacité à trouver des solutions créatives sera mise à l'honneur. Utilisez votre imagination et votre intuition pour résoudre les problèmes.",
        "Votre besoin de paix et d'harmonie sera mis en avant ce mois-ci. Prenez le temps de créer un environnement serein et équilibré pour vous-même."
      ]
  },
  {
      id: 15,
      name: 'le diable',
      pseudo: "l'Iris de Succube",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/15-le-diable.jpg'),
      tendance: [
        "Votre besoin de libération et de transformation sera mis en avant. Laissez aller les habitudes et les comportements qui vous retiennent.",
        "Vous êtes en train de faire face à vos peurs et à vos désirs les plus profonds. Utilisez votre force intérieure pour surmonter les obstacles.",
        "Votre capacité à transformer les situations sera mise en valeur. Utilisez votre pouvoir personnel pour changer les circonstances."
      ]
  },
  {
      id: 16,
      name: 'la maison dieu',
      pseudo: "l'Iris de la Tour de Babel",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/16-la-maison-dieu.jpg'),
      tendance: [
        "Vous êtes en train de vivre un moment de bouleversement et de transformation. Soyez ouvert aux changements et aux opportunités qui se présentent.",
        "Votre besoin de contrôle et de pouvoir sera mis à l'honneur. Utilisez votre force de caractère pour surmonter les défis.",
        "Vous êtes en train de faire face à des changements imprévus et des événements soudains. Restez calme et flexible pour trouver des solutions."
      ]
  },
  {
      id: 17,
      name: 'l etoile',
      pseudo: "l'Iris de l'Espoir",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/17-l-etoile.jpg'),
      tendance: [
        "Votre besoin de spiritualité et de connexion avec l'univers sera mis en avant. Profitez de cette période pour vous connecter avec votre essence spirituelle.",
        " Optimisme et enthousiasme. Utilisez votre énergie positive pour réaliser vos projets.",
        "Votre besoin de sécurité et de protection sera mis en avant. Trouvez des personnes et des environnements qui vous apportent du réconfort."
      ]
  },
  {
      id: 18,
      name: 'la lune',
      pseudo: "l'Iris des Intuitions",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/18-la-lune.jpg'),
      tendance: [
        "Vos émotions et vos instincts seront mis en avant. Utilisez votre intuition pour comprendre les situations et les personnes qui vous entourent.",
        "Aujourd'hui vous ressentirez un besoin de sécurité et de stabilité. Prenez le temps de vous connecter avec votre famille et vos proches.",
        "Votre capacité à écouter votre voix intérieure sera un atout. Faites confiance à votre intuition pour prendre les bonnes décisions."
      ]
  },
  {
      id: 19,
      name: 'le soleil',
      pseudo: "l'Iris de Joie",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/19-le-soleil.jpg'),
      tendance: [
        "La journée sera marquée par un besoin de reconnaissance et de succès. Utilisez votre créativité et votre charisme pour atteindre vos objectifs.",
        "Votre optimisme et votre confiance en l'avenir seront mis en avant. Profitez de cette période pour prendre des risques et explorer de nouveaux horizons.",
        "Votre énergie et votre force de caractère seront mises à l'honneur. Utilisez votre détermination pour réaliser vos projets."
      ]
  },
  {
      id: 20,
      name: 'le jugement',
      pseudo: "l'Iris de Vérité",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/20-le-jugement.jpg'),
      tendance: [
        "Des choix importants pourront etres fait. Prenez le temps de réfléchir à vos priorités et à vos valeurs.",
        "Votre capacité à prendre des décisions difficiles sera mise en valeur. Utilisez votre bon sens pour choisir la meilleure option.",
        "Votre besoin de liberté et d'indépendance sera mis en avant. Faites des choix qui vous permettent de vous sentir libre et autonome."
      ]
  },
  {
      id: 21,
      name: 'le monde',
      pseudo: "l'Iris de PLénitude",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/21-le-monde.jpg'),
      tendance: [
        "Votre besoin de stabilité et de sécurité sera mis à l'honneur. Profitez de cette période pour consolider vos acquis et renforcer vos liens.",
        "Votre besoin d'organisation et de planification sera mis en avant. Utilisez votre esprit logique pour atteindre vos objectifs.",
        "Votre besoin de reconnaissance et de succès sera mis en valeur. Profitez de cette période pour briller et montrer votre potentiel."
      ]
  },
  {
      id: 22,
      name: 'le mat',
      pseudo: "l'Iris de l'Insouciance",
      backImageUrl: require('../../assets/images/cards/back/Claire_Back_Card.png'),
      frontImageUrl: require('../../assets/images/cards/front/22-le-mat.jpg'),
      tendance: [
        "Votre besoin d'aventure et de découverte sera mis à l'honneur ce mois-ci. Explorez de nouveaux horizons et prenez des risques.",
        "Votre capacité à être flexible et adaptable sera mise en avant. Soyez ouvert aux changements et aux imprévus.",
        "Votre besoin de sécurité et de protection sera mis en avant. Prenez soin de vous et de vos proches en vous entourant de personnes bienveillantes."
      ]
  },
  
  ];
  
  export default CARD_DECK;