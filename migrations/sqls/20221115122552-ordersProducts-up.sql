CREATE TABLE odersProducts (id SERIAL PRIMARY KEY,
order_id bigint REFERENCES orders(id),
product_id bigint REFERENCES products(id),
quantity INT);