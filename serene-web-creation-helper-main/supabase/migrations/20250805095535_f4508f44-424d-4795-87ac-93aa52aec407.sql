-- Ajouter du contenu pour toutes les sections demandées

-- Header/Navigation
INSERT INTO site_content (key, title, content, content_type, section, order_index) VALUES
('header_title', 'Nom du praticien', 'Natalia Kourycheva', 'text', 'header', 1),
('header_subtitle', 'Spécialités', 'Psychanalyste & Hypnotherapeute', 'text', 'header', 2),
('header_phone', 'Numéro de téléphone', '+33123456789', 'text', 'header', 3),
('header_email', 'Email de contact', 'contact@nataliaquershi.fr', 'text', 'header', 4);

-- Hero section (page d'accueil)
INSERT INTO site_content (key, title, content, content_type, section, order_index) VALUES
('hero_location', 'Localisation', '94, Val-de-Marne', 'text', 'hero', 3),
('hero_address', 'Adresse complète', '15 rue Adrien Damalix, 94410 Saint-Maurice', 'text', 'hero', 4),
('hero_intro', 'Texte d''introduction', 'Et si vous décidiez d''agir en vous faisant aider par un spécialiste ? Que vous soyez un particulier ou une entreprise, je vous propose un accompagnement personnalisé en sophrologie ou en hypnose.', 'text', 'hero', 5),
('hero_hours_title', 'Titre horaires', 'Horaires', 'text', 'hero', 6),
('hero_hours', 'Horaires de consultation', 'Mardi et vendredi de 8h à 21h<br />et samedi de 8h à 13h', 'html', 'hero', 7);

-- Services/Spécialités
INSERT INTO site_content (key, title, content, content_type, section, order_index) VALUES
('services_title', 'Titre des spécialités', 'Mes spécialités', 'text', 'services', 1),
('services_intro', 'Introduction des services', 'Découvrez mes différentes approches pour vous accompagner dans votre démarche de bien-être et de développement personnel.', 'text', 'services', 2),
('sophrologie_title', 'Titre Sophrologie', 'Sophrologie', 'text', 'services', 3),
('sophrologie_description', 'Description Sophrologie', 'Une méthode de relaxation dynamique pour gérer le stress et développer vos capacités.', 'text', 'services', 4),
('hypnose_title', 'Titre Hypnose', 'Hypnose', 'text', 'services', 5),
('hypnose_description', 'Description Hypnose', 'Un accompagnement en état de conscience modifié pour dépasser vos blocages.', 'text', 'services', 6),
('entreprise_title', 'Titre Entreprise', 'Entreprise', 'text', 'services', 7),
('entreprise_description', 'Description Entreprise', 'Des formations et ateliers pour améliorer la qualité de vie au travail.', 'text', 'services', 8);

-- Section À propos
INSERT INTO site_content (key, title, content, content_type, section, order_index) VALUES
('about_title', 'Titre À propos', 'À propos de Natalia Kourycheva', 'text', 'about', 1),
('about_intro', 'Introduction À propos', 'Découvrez mon parcours et ma philosophie d''accompagnement.', 'text', 'about', 2);

-- Footer
INSERT INTO site_content (key, title, content, content_type, section, order_index) VALUES
('footer_description', 'Description footer', 'Accompagnement personnalisé en sophrologie et hypnose pour particuliers et entreprises dans le Val-de-Marne.', 'text', 'footer', 1),
('footer_services_title', 'Titre services footer', 'Services', 'text', 'footer', 2),
('footer_contact_title', 'Titre contact footer', 'Contact', 'text', 'footer', 3),
('footer_hours_title', 'Titre horaires footer', 'Horaires', 'text', 'footer', 4),
('footer_hours', 'Horaires footer', 'Mardi: 8h - 21h<br />Vendredi: 8h - 21h<br />Samedi: 8h - 13h', 'html', 'footer', 5),
('footer_copyright', 'Copyright', '© 2024 Natalia Kourycheva. Tous droits réservés.', 'text', 'footer', 6),
('footer_linkedin', 'Lien LinkedIn', '#', 'text', 'footer', 7);
