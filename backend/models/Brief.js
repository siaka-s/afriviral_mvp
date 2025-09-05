const { query } = require('./database');

class Brief {
  static async create(briefData) {
    const { 
      annonceur_id, 
      client_id, 
      prompt, 
      categorie, 
      objectif, 
      audience, 
      produit, 
      budget_estime_min, 
      budget_estime_max, 
      formats, 
      duree 
    } = briefData;
    
    const result = await query(
      `INSERT INTO briefs (annonceur_id, client_id, prompt, categorie, objectif, audience, produit, budget_estime_min, budget_estime_max, formats, duree) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        annonceur_id, 
        client_id, 
        prompt, 
        categorie, 
        objectif, 
        JSON.stringify(audience || {}), 
        produit, 
        budget_estime_min, 
        budget_estime_max, 
        JSON.stringify(formats || []), 
        duree || 7
      ]
    );
    
    return result.rows[0];
  }

  static async findById(id) {
    const result = await query(`
      SELECT b.*, 
             a.nom as annonceur_nom, a.email as annonceur_email,
             c.nom as client_nom, c.email as client_email, ag.nom as agence_nom
      FROM briefs b
      LEFT JOIN annonceurs a ON b.annonceur_id = a.id
      LEFT JOIN clients c ON b.client_id = c.id
      LEFT JOIN agences ag ON c.agence_id = ag.id
      WHERE b.id = $1
    `, [id]);
    
    return result.rows[0] || null;
  }

  static async findByUser(userId, userType) {
    let queryText;
    let values;

    if (userType === 'annonceur') {
      queryText = `
        SELECT b.*, 
               COUNT(c.id) as campagnes_count
        FROM briefs b
        LEFT JOIN campagnes c ON b.id = c.brief_id
        WHERE b.annonceur_id = $1
        GROUP BY b.id
        ORDER BY b.created_at DESC
      `;
      values = [userId];
    } else if (userType === 'client') {
      queryText = `
        SELECT b.*, 
               COUNT(c.id) as campagnes_count,
               ag.nom as agence_nom
        FROM briefs b
        LEFT JOIN campagnes c ON b.id = c.brief_id
        LEFT JOIN clients cl ON b.client_id = cl.id
        LEFT JOIN agences ag ON cl.agence_id = ag.id
        WHERE b.client_id = $1
        GROUP BY b.id, ag.nom
        ORDER BY b.created_at DESC
      `;
      values = [userId];
    } else {
      throw new Error('Invalid user type');
    }

    const result = await query(queryText, values);
    return result.rows;
  }

  static async update(id, updateData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined) {
        if (key === 'audience' || key === 'formats') {
          fields.push(`${key} = $${paramCount}`);
          values.push(JSON.stringify(updateData[key]));
        } else {
          fields.push(`${key} = $${paramCount}`);
          values.push(updateData[key]);
        }
        paramCount++;
      }
    });

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const queryText = `UPDATE briefs SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    
    const result = await query(queryText, values);
    return result.rows[0];
  }

  static async delete(id) {
    const result = await query('DELETE FROM briefs WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  }

  static async getAll(limit = 50, offset = 0) {
    const result = await query(`
      SELECT b.*, 
             a.nom as annonceur_nom, 
             c.nom as client_nom, 
             ag.nom as agence_nom
      FROM briefs b
      LEFT JOIN annonceurs a ON b.annonceur_id = a.id
      LEFT JOIN clients c ON b.client_id = c.id
      LEFT JOIN agences ag ON c.agence_id = ag.id
      ORDER BY b.created_at DESC
      LIMIT $1 OFFSET $2
    `, [limit, offset]);
    
    return result.rows;
  }

  static async getMatchingInfluenceurs(briefId) {
    const brief = await this.findById(briefId);
    if (!brief) return [];

    // This would integrate with the AI matching engine
    // For now, return top influenceurs based on criteria
    const result = await query(`
      SELECT i.*, 
             CASE 
               WHEN i.categories @> ARRAY[b.categorie] THEN 30
               ELSE 0
             END +
             CASE 
               WHEN i.followers >= 10000 THEN 25
               WHEN i.followers >= 5000 THEN 15
               ELSE 5
             END +
             CASE 
               WHEN i.verified = true THEN 20
               ELSE 0
             END +
             (i.taux_engagement * 10) as matching_score
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

  static async updateStatus(id, status) {
    const result = await query(
      'UPDATE briefs SET statut = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0];
  }
}

module.exports = Brief;