-- AfriViral Database Seed Data
-- Sample data for development and testing

-- Insert sample annonceurs
INSERT INTO annonceurs (nom, email, mot_de_passe, whatsapp, entreprise, secteur) VALUES
('Cosmétiques Yopougon', 'demo@afriviral.com', '$2b$10$demo123hashedpassword', '+2250707070707', 'Beauty Yopougon', 'Cosmétiques'),
('Restaurant Abidjan', 'resto@example.com', '$2b$10$demo123hashedpassword', '+2250708080808', 'Saveurs d''Abidjan', 'Restauration'),
('Boutique Mode', 'mode@example.com', '$2b$10$demo123hashedpassword', '+2250709090909', 'Afrik Mode', 'Mode & Accessoires');

-- Insert sample influenceurs
INSERT INTO influenceurs (nom, email, mot_de_passe, followers, reseaux, verified, categories, taux_engagement) VALUES
('Awa Diarra', 'awa@influence.com', '$2b$10$demo123hashedpassword', 15000, '["instagram", "tiktok"]', true, '["beauté", "lifestyle"]', 4.5),
('Moussa Koné', 'moussa@influence.com', '$2b$10$demo123hashedpassword', 8500, '["instagram", "facebook"]', true, '["food", "lifestyle"]', 6.2),
('Fatou Bamba', 'fatou@influence.com', '$2b$10$demo123hashedpassword', 22000, '["instagram", "tiktok", "youtube"]', true, '["mode", "beauté"]', 3.8),
('Ibrahim Touré', 'ibrahim@influence.com', '$2b$10$demo123hashedpassword', 12000, '["instagram", "tiktok"]', false, '["tech", "lifestyle"]', 5.1),
('Mariam Traoré', 'mariam@influence.com', '$2b$10$demo123hashedpassword', 18000, '["instagram", "facebook"]', true, '["mode", "fitness"]', 4.9);

-- Insert sample agences
INSERT INTO agences (nom, email, mot_de_passe, telephone) VALUES
('Agence Digitale CI', 'contact@agenceci.com', '$2b$10$demo123hashedpassword', '+2250710101010'),
('Marketing Afrik', 'hello@marketingafrik.com', '$2b$10$demo123hashedpassword', '+2250711111111');

-- Insert sample clients for agencies
INSERT INTO clients (agence_id, nom, email, entreprise, secteur) VALUES
((SELECT id FROM agences WHERE email='contact@agenceci.com'), 'Client Cosmétiques', 'client1@cosmetiques.com', 'Beauty Plus CI', 'Cosmétiques'),
((SELECT id FROM agences WHERE email='contact@agenceci.com'), 'Client Tech', 'client2@tech.com', 'Tech Solutions CI', 'Technologie'),
((SELECT id FROM agences WHERE email='hello@marketingafrik.com'), 'Client Alimentation', 'client3@food.com', 'Saveurs du Terroir', 'Agroalimentaire');

-- Insert sample briefs
INSERT INTO briefs (annonceur_id, prompt, categorie, objectif, audience, produit, budget_estime_min, budget_estime_max, formats, duree) VALUES
((SELECT id FROM annonceurs WHERE email='demo@afriviral.com'), 'je vends des cosmetiques à Yopougon', 'beauté', 'augmenter les ventes', '{"age": "18-35", "localisation": "Yopougon", "genre": "femme"}', 'Crèmes et lotions naturelles', 50000, 150000, '["post", "story", "reel"]', 7),
((SELECT id FROM annonceurs WHERE email='resto@example.com'), 'promouvoir mon restaurant à Abidjan', 'restauration', 'augmenter la fréquentation', '{"age": "25-45", "localisation": "Abidjan", "genre": "mixte"}', 'Menu du midi et soir', 30000, 80000, '["post", "story"]', 5),
((SELECT id FROM clients WHERE email='client1@cosmetiques.com'), 'lancer une nouvelle gamme de maquillage', 'beauté', 'lancement produit', '{"age": "20-40", "localisation": "Abidjan", "genre": "femme"}', 'Nouvelle gamme de maquillage', 100000, 250000, '["post", "reel", "story"]', 10);

-- Insert sample campagnes
INSERT INTO campagnes (brief_id, annonceur_id, nom, description, budget, date_debut, date_fin, formats, type) VALUES
((SELECT id FROM briefs WHERE prompt LIKE '%cosmetiques à Yopougon%'), (SELECT id FROM annonceurs WHERE email='demo@afriviral.com'), 'Campagne Cosmétiques Yopougon', 'Campagne de promotion des cosmétiques naturelles à Yopougon', 100000, '2024-01-15', '2024-01-22', '["post", "story", "reel"]', 'standard'),
((SELECT id FROM briefs WHERE prompt LIKE '%restaurant à Abidjan%'), (SELECT id FROM annonceurs WHERE email='resto@example.com'), 'Campagne Restaurant Abidjan', 'Promotion spéciale menu du midi', 50000, '2024-01-20', '2024-01-25', '["post", "story"]', 'standard');

-- Insert sample assignations
INSERT INTO assignations (campagne_id, influenceur_id, statut, montant) VALUES
((SELECT id FROM campagnes WHERE nom='Campagne Cosmétiques Yopougon'), (SELECT id FROM influenceurs WHERE email='awa@influence.com'), 'acceptée', 35000),
((SELECT id FROM campagnes WHERE nom='Campagne Cosmétiques Yopougon'), (SELECT id FROM influenceurs WHERE email='fatou@influence.com'), 'en_attente', 40000),
((SELECT id FROM campagnes WHERE nom='Campagne Restaurant Abidjan'), (SELECT id FROM influenceurs WHERE email='moussa@influence.com'), 'acceptée', 25000);

-- Insert sample paiements
INSERT INTO paiements (campagne_id, montant, statut, transaction_id, mode) VALUES
((SELECT id FROM campagnes WHERE nom='Campagne Cosmétiques Yopougon'), 100000, 'payé', 'PAY_123456789', 'paystack'),
((SELECT id FROM campagnes WHERE nom='Campagne Restaurant Abidjan'), 50000, 'payé', 'PAY_987654321', 'paystack');

-- Insert sample livraisons
INSERT INTO livraisons (assignation_id, url_post, plateforme, statut) VALUES
((SELECT id FROM assignations WHERE influenceur_id=(SELECT id FROM influenceurs WHERE email='awa@influence.com')), 'https://instagram.com/p/ABC123', 'instagram', 'validé'),
((SELECT id FROM assignations WHERE influenceur_id=(SELECT id FROM influenceurs WHERE email='moussa@influence.com')), 'https://instagram.com/p/DEF456', 'instagram', 'soumis');

-- Insert sample stats
INSERT INTO stats_campagnes (assignation_id, livraison_id, vues, clics, likes, comments, engagement, reach, impressions) VALUES
((SELECT id FROM assignations WHERE influenceur_id=(SELECT id FROM influenceurs WHERE email='awa@influence.com')), (SELECT id FROM livraisons WHERE url_post='https://instagram.com/p/ABC123'), 2500, 180, 320, 45, 5.2, 3500, 2800),
((SELECT id FROM assignations WHERE influenceur_id=(SELECT id FROM influenceurs WHERE email='moussa@influence.com')), (SELECT id FROM livraisons WHERE url_post='https://instagram.com/p/DEF456'), 1200, 95, 180, 25, 6.8, 1800, 1500);

-- Reset sequences (if using auto-increment instead of UUID)
-- SELECT setval('annonceurs_id_seq', (SELECT MAX(id) FROM annonceurs));
-- SELECT setval('influenceurs_id_seq', (SELECT MAX(id) FROM influenceurs));
-- SELECT setval('agences_id_seq', (SELECT MAX(id) FROM agences));
-- SELECT setval('clients_id_seq', (SELECT MAX(id) FROM clients));
-- SELECT setval('briefs_id_seq', (SELECT MAX(id) FROM briefs));
-- SELECT setval('campagnes_id_seq', (SELECT MAX(id) FROM campagnes));
-- SELECT setval('assignations_id_seq', (SELECT MAX(id) FROM assignations));
-- SELECT setval('paiements_id_seq', (SELECT MAX(id) FROM paiements));
-- SELECT setval('livraisons_id_seq', (SELECT MAX(id) FROM livraisons));
-- SELECT setval('stats_campagnes_id_seq', (SELECT MAX(id) FROM stats_campagnes);

-- Grant permissions (adjust username as needed)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_username;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_username;