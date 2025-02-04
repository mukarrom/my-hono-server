import { Hono } from 'hono';

const app = new Hono();

app.get('/', c => {
	return c.text('Hello Hono!');
});

const port = process.env.PORT || 5000;

export default {
	port: port,
	fetch: app.fetch,
};
