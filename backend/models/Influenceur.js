const { query } = require('./database');
const bcrypt = require('bcryptjs');

class Influenceur {
  static async create(influenceurData) {
    const { 
      nom, 
      email, 
      mot_de_passe, 
      followers, 
      reseaux, 
      verified, 
      kyc, 
      telephone, 
      whatsapp, 
      adresse, 
      photo_url, 
      categories, 
      taux_engagement 
    } = influenceurData;
    
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    
    const result = await query(
      `INSERT INTO influenceurs (nom, email, mot_de_passe, followers, reseaux, verified, kyc, telephone, whatsapp, adresse, photo_url, categories, taux_engagement) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
      [nom, email, hashedPassword, followers || 0, JSON.stringify(reseaux || []), verified || false, JSON.stringify(kyc || {}), telephone, whatsapp, adresse, photo_url, JSON.stringify(categories || []), taux_engagement || 0.0]
    );
    
    const { mot_de_passe: _, ...influenceurWithoutPassword } = result.rows[0];
    return influenceurWithoutPassword;
  }

  static async findByEmail(email) {
    const result = await query('SELECT * FROM influenceurs WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  static async findById(id) {
    const result = await query('SELECT * FROM influenceurs WHERE id = $1', [id]);
    const { mot_de_passe: _, ...influenceurWithoutPassword } = result.rows[0] || {};
    return influenceurWithoutPassword || null;
  }

  static async update(id, updateData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        if (key === 'reseaux' || key === 'kyc' || key === 'categories') {
          fields.push(`${key} = $${paramCount}`);
          values.push(JSON.stringify(updateData[key]));
        } else if (key !== 'mot_de_passe') {
          fields.push(`${key} = $${paramCount}`);
          values.push(updateData[key]);
        }
        paramCount++;
      }
    });

    if (updateData.mot_de_passe) {
      const hashedPassword = await bcrypt.hash(updateData.mot_de_passe, 10);
      fields.push(`mot_de_passe = $${paramCount}`);
      values.push(hashedPassword);
      paramCount++;
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const queryText = `UPDATE influenceurs SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    
    const result = await query(queryText, values);
    const { mot_de_passe: _, ...influenceurWithoutPassword } = result.rows[0];
    return influenceurWithoutPassword;
  }

  static async delete(id) {
    const result = await query('DELETE FROM influenceurs WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  }

  static async getAll(filters = {}, limit = 50, offset = 0) {
    let whereClause = '';
    const values = [];
    let paramCount = 1;

    if (filters.categorie) {
      whereClause += ` WHERE categories @> $${paramCount}`;
      values.push(JSON.stringify([filters.categorie]));
      paramCount++;
    }

    if (filters.minFollowers) {
      whereClause += whereClause ? ' AND' : ' WHERE';
      whereClause += ` followers >= $${paramCount}`;
      values.push(filters.minFollowers);
      paramCount++;
    }

    if (filters.maxFollowers) {
      whereClause += whereClause ? ' AND' : ' WHERE';
      whereClause += ` followers <= $${paramCount}`;
      values.push(filters.maxFollowers);
      paramCount++;
    }

    if (filters.verified !== undefined) {
      whereClause += whereClause ? ' AND' : ' WHERE';
      whereClause += ` verified = $${paramCount}`;
      values.push(filters.verified);
      paramCount++;
    }

    if (filters.reseaux) {
      whereClause += whereClause ? ' AND' : ' WHERE';
      whereClause += ` reseaux @> $${paramCount}`;
      values.push(JSON.stringify(filters.reseaux));
      paramCount++;
    }

    values.push(limit, offset);
    
    const result = await query(
      `SELECT id, nom, email, followers, reseaux, verified, categories, taux_engagement, photo_url, created_at 
       FROM influenceurs ${whereClause} ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`,
      values
    );
    
    return result.rows;
  }

  static async getStats(id) {
    const result = await query(`
      SELECT 
        COUNT(DISTINCT a.id) as total_missions,
        COUNT(DISTINCT CASE WHEN a.statut = 'acceptée' THEN a.id END) as missions_acceptees,
        COUNT(DISTINCT CASE WHEN a.statut = 'livrée' THEN a.id END) as missions_livrees,
        COALESCE(SUM(a.montant), 0) as revenu_total,
        COALESCE(AVG(s.engagement), 0) as taux_engagement_moyen
      FROM influenceurs i
      LEFT JOIN assignations a ON i.id = a.influenceur_id
      LEFT JOIN stats_campagnes s ON a.id = s.assignation_id
      WHERE i.id = $1
    `, [id]);
    
    return result.rows[0];
  }

  static async getByBrief(briefId) {
    const result = await query(`
      SELECT i.*, 
             CASE 
               WHEN b.audience->>'localisation' IS NOT NULL 
               THEN calculate_matching_score(i.id, b.id) 
               ELSE 0 
             END as matching_score
      FROM influenceurs i
      CROSS JOIN briefs b
      WHERE b.id = $1
      AND i.verified = true
      AND i.statut = 'actif'
      ORDER BY matching_score DESC
      LIMIT 10
    `, [briefId]);
    
    return result.rows;
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = Influenceur;