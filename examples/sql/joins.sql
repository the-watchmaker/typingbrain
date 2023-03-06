SQL join examples
SELECT
  -- @hide orders
  orders.order_id,
  -- @skip
  orders.order_date,
  -- @hide customers
  customers.customer_name,
  -- @skip
  customers.customer_email
FROM orders
INNER JOIN customers -- Only include rows where there is a match in both tables
ON orders.customer_id = customers.customer_id;

SELECT
  -- @hide orders
  orders.order_id,
  -- @skip
  orders.order_date,
  -- @hide customers
  customers.customer_name,
  -- @skip
  customers.customer_email
FROM orders
-- @hide LEFT JOIN
LEFT JOIN customers -- Include all rows from the left table (orders) and only matching rows from the right table (customers)
ON orders.customer_id = customers.customer_id;

SELECT
  -- @hide orders
  orders.order_id,
  -- @skip
  orders.order_date,
  -- @hide customers
  customers.customer_name,
  -- @skip
  customers.customer_email
FROM orders
-- @hide RIGHT JOIN
RIGHT JOIN customers -- Include all rows from the right table (customers) and only matching rows from the left table (orders)
ON orders.customer_id = customers.customer_id;

SELECT
  -- @hide orders
  orders.order_id,
  -- @skip
  orders.order_date,
  -- @hide customers
  customers.customer_name,
  -- @skip
  customers.customer_email
FROM orders
-- @hide FULL OUTER JOIN
FULL OUTER JOIN customers -- Include all rows from both tables, filling in NULLs for non-matching rows
ON orders.customer_id = customers.customer_id;
