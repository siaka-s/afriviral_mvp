-- AfriViral Database Schema
-- PostgreSQL schema for MVP

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create database (run this separately)
-- CREATE DATABASE afriviral;

-- Drop tables if they exist (for development)
DROP TABLE IF EXISTS stats_campagnes CASCADE;
DROP TABLE IF EXISTS livraisons CASCADE;
DROP TABLE IF EXISTS paiements CASCADE;
DROP TABLE IF EXISTS assignations CASCADE;
DROP TABLE IF EXISTS campagnes CASCADE;
DROP TABLE IF EXISTS briefs CASCADE;
DROP TABLE IF EXISTS clients CASCADE;
DROP TABLE IF EXISTS agences CASCADE;
DROP TABLE IF EXISTS influenceurs CASCADE;
DROP TABLE IF EXISTS annonceurs CASCADE;

-- Table: annonceurs
CREATE TABLE annonceurs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    whatsapp VARCHAR(20),
    entreprise VARCHAR(255),
    secteur VARCHAR(100),
    adresse TEXT,
    logo_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: influenceurs
CREATE TABLE influenceurs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    followers INTEGER DEFAULT 0,
    reseaux JSONB DEFAULT '[]'::jsonb,
    verified BOOLEAN DEFAULT FALSE,
    kyc JSONB DEFAULT '{}'::jsonb,
    statut VARCHAR(50) DEFAULT 'actif',
    telephone VARCHAR(20),
    whatsapp VARCHAR(20),
    adresse TEXT,
    photo_url VARCHAR(500),
    categories JSONB DEFAULT '[]'::jsonb,
    taux_engagement DECIMAL(5,2) DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: agences
CREATE TABLE agences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    mot_de_passe VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    adresse TEXT,
    logo_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: clients (sous-comptes des agences)
CREATE TABLE clients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agence_id UUID NOT NULL REFERENCES agences(id) ON DELETE CASCADE,
    nom VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    entreprise VARCHAR(255),
    secteur VARCHAR(100),
    telephone VARCHAR(20),
    adresse TEXT,
    logo_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(agence_id, email)
);

-- Table: briefs
CREATE TABLE briefs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    annonceur_id UUID REFERENCES annonceurs(id) ON DELETE SET NULL,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    prompt TEXT NOT NULL,
    categorie VARCHAR(100),
    objectif VARCHAR(255),
    audience JSONB DEFAULT '{}'::jsonb,
    produit VARCHAR(255),
    budget_estime_min DECIMAL(10,2),
    budget_estime_max DECIMAL(10,2),
    formats JSONB DEFAULT '[]'::jsonb,
    duree INTEGER DEFAULT 7,
    statut VARCHAR(50) DEFAULT 'brouillon',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (
        (annonceur_id IS NOT NULL AND client_id IS NULL) OR 
        (annonceur_id IS NULL AND client_id IS NOT NULL)
    )
);

-- Table: campagnes
CREATE TABLE campagnes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brief_id UUID NOT NULL REFERENCES briefs(id) ON DELETE CASCADE,
    annonceur_id UUID REFERENCES annonceurs(id) ON DELETE SET NULL,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    budget DECIMAL(10,2) NOT NULL,
    statut VARCHAR(50) DEFAULT 'brouillon',
    type VARCHAR(50) DEFAULT 'standard',
    date_debut DATE,
    date_fin DATE,
    formats JSONB DEFAULT '[]'::jsonb,
    calendrier JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (
        (annonceur_id IS NOT NULL AND client_id IS NULL) OR 
        (annonceur_id IS NULL AND client_id IS NOT NULL)
    )
);

-- Table: assignations
CREATE TABLE assignations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campagne_id UUID NOT NULL REFERENCES campagnes(id) ON DELETE CASCADE,
    influenceur_id UUID NOT NULL REFERENCES influenceurs(id) ON DELETE CASCADE,
    statut VARCHAR(50) DEFAULT 'en_attente',
    montant DECIMAL(10,2),
    date_acceptation TIMESTAMP,
    date_livraison TIMESTAMP,
    url_contenu VARCHAR(500),
    capture_contenu VARCHAR(500),
    validation_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(campagne_id, influenceur_id)
);

-- Table: paiements
CREATE TABLE paiements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campagne_id UUID NOT NULL REFERENCES campagnes(id) ON DELETE CASCADE,
    montant DECIMAL(10,2) NOT NULL,
    statut VARCHAR(50) DEFAULT 'en_attente',
    transaction_id VARCHAR(255),
    mode VARCHAR(50) DEFAULT 'paystack',
    reference_paystack VARCHAR(255),
    escrow_status VARCHAR(50) DEFAULT 'pending',
    date_paiement TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: livraisons
CREATE TABLE livraisons (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignation_id UUID NOT NULL REFERENCES assignations(id) ON DELETE CASCADE,
    url_post VARCHAR(500) NOT NULL,
    post_id VARCHAR(255),
    plateforme VARCHAR(50),
    date_publication TIMESTAMP,
    statut VARCHAR(50) DEFAULT 'soumis',
    validation_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: stats_campagnes
CREATE TABLE stats_campagnes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignation_id UUID NOT NULL REFERENCES assignations(id) ON DELETE CASCADE,
    livraison_id UUID REFERENCES livraisons(id) ON DELETE SET NULL,
    vues INTEGER DEFAULT 0,
    clics INTEGER DEFAULT 0,
    partages INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    engagement DECIMAL(5,2) DEFAULT 0.0,
    reach INTEGER DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    ctr DECIMAL(5,2) DEFAULT 0.0,
    date_collecte TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_annonceurs_email ON annonceurs(email);
CREATE INDEX idx_influenceurs_email ON influenceurs(email);
CREATE INDEX idx_agences_email ON agences(email);
CREATE INDEX idx_briefs_annonceur ON briefs(annonceur_id);
CREATE INDEX idx_briefs_client ON briefs(client_id);
CREATE INDEX idx_campagnes_brief ON campagnes(brief_id);
CREATE INDEX idx_campagnes_annonceur ON campagnes(annonceur_id);
CREATE INDEX idx_campagnes_client ON campagnes(client_id);
CREATE INDEX idx_assignations_campagne ON assignations(campagne_id);
CREATE INDEX idx_assignations_influenceur ON assignations(influenceur_id);
CREATE INDEX idx_paiements_campagne ON paiements(campagne_id);
CREATE INDEX idx_livraisons_assignation ON livraisons(assignation_id);
CREATE INDEX idx_stats_assignation ON stats_campagnes(assignation_id);

-- Updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_annonceurs_updated_at BEFORE UPDATE ON annonceurs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_influenceurs_updated_at BEFORE UPDATE ON influenceurs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_agences_updated_at BEFORE UPDATE ON agences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_briefs_updated_at BEFORE UPDATE ON briefs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_campagnes_updated_at BEFORE UPDATE ON campagnes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assignations_updated_at BEFORE UPDATE ON assignations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_paiements_updated_at BEFORE UPDATE ON paiements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_livraisons_updated_at BEFORE UPDATE ON livraisons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_stats_campagnes_updated_at BEFORE UPDATE ON stats_campagnes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();