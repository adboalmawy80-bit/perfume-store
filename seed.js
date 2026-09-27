const { sequelize } = require('./src/config/database');

const seedData = async () => {
  try {
    await sequelize.authenticate();
    console.log('🔄 Re-seeding database with Images and Full Schema...');

    await sequelize.query(`DROP TABLE IF EXISTS order_items;`);
    await sequelize.query(`DROP TABLE IF EXISTS orders;`);
    await sequelize.query(`DROP TABLE IF EXISTS products;`);
    await sequelize.query(`DROP TABLE IF EXISTS categories;`);

    await sequelize.query(`
      CREATE TABLE categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await sequelize.query(`
      CREATE TABLE products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
        brand VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
        description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
        price DECIMAL(10, 2) NOT NULL,
        image_url VARCHAR(500) DEFAULT 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500',
        category_id INT,
        FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await sequelize.query(`
      INSERT INTO categories (id, name) VALUES 
      (1, 'عطور شرقية'), 
      (2, 'عطور فرنسية');
    `);

    await sequelize.query(`
      INSERT INTO products (name, brand, description, price, image_url, category_id) VALUES 
      ('عود ملكي فاخر', 'الماوي', 'نفحات عتيقة من العود الكمبودي والمسك الصافي', 1200.00, 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=500', 1),
      ('بلاك أوركيد', 'توم فورد', 'عطر ساحر يجمع بين الأوركيد السوداء والتوابل الغنية', 2500.00, 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=500', 2),
      ('سوفاج ديور', 'ديور', 'انتعاش طبيعي ممزوج بالأخشاب الدافئة', 3100.00, 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=500', 2);
    `);

    console.log('🌱 Full E-Commerce Database Ready!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

seedData();
