CTE syntax
-- Example CTE used in a dbt model file
-- @hide WITH
WITH monthly_sales AS (
  -- Select the month and the total sales for each month
  -- @hide SELECT
  SELECT
    date_trunc('month', date) AS month, -- date_trunc('month', date) truncates the date column to the beginning of the month. The month argument specifies the precision, indicating that the date should be truncated to the first day of the month. For example, if date is "2022-03-15", date_trunc('month', date) would return "2022-03-01".
    -- @hide sum
    sum(sales) AS total_sales,
    -- imaginary field 1: calculate the average sales for each month
    -- @hide avg
    avg(sales) AS average_sales,
    -- @hide count
    count(*) AS num_transactions, -- imaginary field 2: count the number of transactions for each month
    -- @hide sum
    -- @hide AS
    sum(profit) AS total_profit -- imaginary field 3: calculate the total profit for each month
  -- @hide FROM
  FROM
    my_schema.my_sales_table
  -- @hide GROUP
  GROUP BY
    1
)

-- Select the month, total sales, average sales, and total profit for each month
-- @hide SELECT
SELECT
  month,
  total_sales,
  average_sales,
  num_transactions,
  total_profit,
  -- Calculate the average sales for a three-month period by dividing total sales by 3
  -- @hide AS
  total_sales / 3 AS avg_sales
-- @hide FROM
FROM
  monthly_sales
