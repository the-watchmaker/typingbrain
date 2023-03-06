Json and Foreign Key
-- @hide CREATE TABLE
CREATE TABLE orders (
  -- @skip
  order_id SERIAL PRIMARY KEY, -- Defines the `order_id` column as the primary key, and uses the SERIAL data type to automatically generate a unique identifier for each new row added to the table
  customer_id INT REFERENCES customers (customer_id), -- Defines the `customer_id` column as a foreign key that references the `customer_id` column in the `customers` table
  -- @skip
  order_date DATE -- Defines the `order_date` column as a DATE data type
-- @skip
);

-- @hide CREATE TABLE
CREATE TABLE customers (
  customer_id SERIAL PRIMARY KEY, -- Defines the `customer_id` column as the primary key, and uses the SERIAL data type to automatically generate a unique identifier for each new row added to the table
  -- @skip
  customer_name VARCHAR(50) NOT NULL, -- Defines the `customer_name` column as a VARCHAR data type with a maximum length of 50 characters, and specifies that this field is required and cannot be null
  -- @skip
  customer_email VARCHAR(50) UNIQUE NOT NULL -- Defines the `customer_email` column as a VARCHAR data type with a maximum length of 50 characters, specifies that this field is required and cannot be null, and enforces the unique constraint on this column so that no two rows can have the same value for `customer_email`
-- @skip
);

SELECT
  orders.order_id, -- Selects the `order_id` column from the `orders` table
  orders.order_date, -- Selects the `order_date` column from the `orders` table
  (
    -- @hide JSON_OBJECT
    SELECT JSON_OBJECT( -- Selects customer data as a JSON object using the `JSON_OBJECT` function
      -- @hide customers
      'customer_id', customers.customer_id, -- Adds the `customer_id` field to the JSON object
      -- @hide customers
      'customer_name', customers.customer_name, -- Adds the `customer_name` field to the JSON object
      -- @hide customers
      'customer_email', customers.customer_email -- Adds the `customer_email` field to the JSON object
    -- skip
    )
    -- @hide customers
    FROM customers -- Specifies the `customers` table as the source for the subquery that generates the customer JSON object
    -- @hide customers
    -- @hide orders
    WHERE customers.customer_id = orders.customer_id -- Specifies the join condition between the `customers` and `orders` tables, where the `customer_id` value in the `customers` table matches the `customer_id` value in the current row of the `orders` table
    -- @hide customers
  ) AS customer -- Renames the subquery result as the `customer` column in the outer query
-- @hide orders
FROM orders; -- Selects data from the `orders` table
