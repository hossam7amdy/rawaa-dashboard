CREATE TABLE IF NOT EXISTS rawaa.user(
	userId INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(16) UNIQUE NOT NULL,
    privilege VARCHAR(16) NOT NULL,
    password VARCHAR(255) NOT NULL,
    
    CONSTRAINT user_privilege CHECK (privilege IN ('admin','staff','viewer'))
);
#INSERT INTO rawaa.user VALUES(null, 'hossam', 'admin', 'hossam7amdy');

CREATE TABLE IF NOT EXISTS rawaa.parent_category(
	parentCategoryId INT PRIMARY KEY AUTO_INCREMENT,
    parentCategoryNameAR VARCHAR(32) UNIQUE NOT NULL,
    parentCategoryNameEN VARCHAR(32) UNIQUE NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedOn TIMESTAMP DEFAULT NOW(),
    createdBy VARCHAR(16) NOT NULL,
    updatedBy VARCHAR(16),
    
    FOREIGN KEY (createdBy) REFERENCES user(username),
    FOREIGN KEY (updatedBy) REFERENCES user(username)
);
#INSERT INTO rawaa.parent_category VALUES(null,'مشروبات','Drinks','2022-12-21',null,'hossam',null);

CREATE TABLE IF NOT EXISTS rawaa.attachment(
	attachmentId INT PRIMARY KEY AUTO_INCREMENT,
    attachmentName VARCHAR(32) NOT NULL,
    attachmentSize VARCHAR(16) NOT NULL,
    mimeType VARCHAR(16) NOT NULL,
    imageUrl VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS rawaa.category(
	categoryId INT PRIMARY KEY AUTO_INCREMENT,
    parentCategoryId INT NOT NULL,
    categoryNameAR VARCHAR(64) UNIQUE NOT NULL,
    categoryNameEN VARCHAR(64) UNIQUE NOT NULL,
    createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedOn TIMESTAMP DEFAULT NOW(),
    createdBy VARCHAR(16) NOT NULL,
    updatedBy VARCHAR(16),
    
    FOREIGN KEY (createdBy) REFERENCES user(username),
    FOREIGN KEY (updatedBy) REFERENCES user(username),
    FOREIGN KEY (parentCategoryId) REFERENCES parent_category(parentCategoryId)
);
#INSERT INTO rawaa.category VALUES(null,1,'مشروبات ساخنة','Hot Drinks','2022-12-21',null,'hossam',null);

CREATE TABLE IF NOT EXISTS rawaa.category_attachments(
	categoryId	INT UNIQUE NOT NULL,
	attachmentId INT NOT NULL,
    PRIMARY KEY (categoryId, attachmentId),
    FOREIGN KEY (categoryId) REFERENCES category(categoryId),
    FOREIGN KEY (attachmentId) REFERENCES attachment(attachmentId)
);

CREATE TABLE IF NOT EXISTS rawaa.product (
	productId INT PRIMARY KEY AUTO_INCREMENT,
    categoryId INT NOT NULL,
    productNameAR VARCHAR(64) NOT NULL,
    productNameEN VARCHAR(64) NOT NULL,
    descriptionAR VARCHAR(512),
    descriptionEN VARCHAR(512),
	createdOn TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedOn TIMESTAMP DEFAULT NOW(),
    createdBy VARCHAR(16) NOT NULL,
    updatedBy VARCHAR(16),
    
    FOREIGN KEY (createdBy) REFERENCES user(username),
    FOREIGN KEY (updatedBy) REFERENCES user(username),
    FOREIGN KEY (categoryId) REFERENCES category(categoryId)
);
#INSERT INTO rawaa.product VALUES(null,1, "تفاح","apple", null,null, '2022-12-27',null, 'hossam',null);

CREATE TABLE IF NOT EXISTS rawaa.unit(
	unitId INT PRIMARY KEY AUTO_INCREMENT,
    productId INT NOT NULL,
    unitNameAR VARCHAR(16) NOT NULL,
    unitNameEN VARCHAR(16) NOT NULL,
    pricePerUnit DECIMAL(10,2) NOT NULL,
    
    FOREIGN KEY (productId) REFERENCES product(productId)
);

CREATE TABLE IF NOT EXISTS rawaa.stock(
	productId INT PRIMARY KEY,
	inStock INT NOT NULL,
    lastUpdatedTime TIMESTAMP NOT NULL DEFAULT NOW(),
    FOREIGN KEY (productId) REFERENCES product(productId)
);

CREATE TABLE IF NOT EXISTS rawaa.product_attachments(
	productId INT NOT NULL,
	attachmentId INT NOT NULL,
    PRIMARY KEY (productId, attachmentId)
);

#DROP TABLE rawaa.product_attachments;
#DROP TABLE rawaa.stock;
#DROP TABLE rawaa.unit;
#DROP TABLE rawaa.product;
#DROP TABLE rawaa.category_attachments;
#DROP TABLE rawaa.attachment;
#DROP TABLE rawaa.category;
#DROP TABLE rawaa.parent_category;
#DROP TABLE rawaa.user;