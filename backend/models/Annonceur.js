const { query } = require('./database');
const bcrypt = require('bcryptjs');

class Annonceur {
  static async create(annonceurData) {
    const { nom, email, mot_de_passe, whatsapp, entreprise, secteur, adresse, logo_url } = annonceurData;
    
    const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
    
    const result = await query(
      `INSERT INTO annonceurs (nom, email, mot_de_passe, whatsapp, entreprise, secteur, adresse, logo_url) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [nom, email, hashedPassword, whatsapp, entreprise, secteur, adresse, logo_url]
    );
    
    const { mot_de_passe: _, ...annonceurWithoutPassword } = result.rows[0];
    return annonceurWithoutPassword;
  }

  static async findByEmail(email) {
    const result = await query('SELECT * FROM annonceurs WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  static async findById(id) {
    const result = await query('SELECT * FROM annonceurs WHERE id = $1', [id]);
    const { mot_de_passe: _, ...annonceurWithoutPassword } = result.rows[0] || {};
    return annonceurWithoutPassword || null;
  }

  static async update(id, updateData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    Object.keys(updateData).forEach(key => {
      if (key !== 'mot_de_passe' && updateData[key] !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(updateData[key]);
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
    const queryText = `UPDATE annonceurs SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    
    const result = await query(queryText, values);
    const { mot_de_passe: _, ...annonceurWithoutPassword } = result.rows[0];
    return annonceurWithoutPassword;
  }

  static async delete(id) {
    const result = await query('DELETE FROM annonceurs WHERE id = $1 RETURNING id', [id]);
    return result.rows[0];
  }

  static async getAll(limit = 50, offset = 0) {
    const result = await query(
      'SELECT id, nom, email, whatsapp, entreprise, secteur, adresse, logo_url, created_at FROM annonceurs ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );
    return result.rows;
  }

  static async getStats(id) {
    const result = await query(`
      SELECT 
        COUNT(DISTINCT c.id) as total_campagnes,
        COUNT(DISTINCT a.id) as total_assignations,
        COALESCE(SUM(c.budget), 0) as total_depenses,
        COALESCE(SUM(s.vues), 0) as total_vues,
        COALESCE(SUM(s.clics), 0) as total_clics
      FROM annonceurs an
      LEFT JOIN campagnes c ON an.id = c.annonceur_id
      LEFT JOIN assignations a ON c.id = a.campagne_id
      LEFT JOIN livraisons l ON a.id = l.assignation_id
      LEFT JOIN stats_campagnes s ON a.id = s.assignation_id
      WHERE an.id = $1
    `, [id]);
    
    return result.rows[0];
  }

  static async validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = Annonceur;