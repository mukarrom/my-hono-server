import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { handle } from 'hono/vercel';
import { onError } from './app/middlewares/globalErrorHandler';
import { notFound, notFoundMiddleware } from './app/middlewares/notFound';
import router from './app/routes';
import main from './app/utils/db';
import sendResponse from './app/utils/sendResponse';

const app = new Hono().basePath('/');

// pretty JSON middleware
app.use('*', prettyJSON());

// CORS middleware
app.use('*', cors({ origin: '*' }));

// db connection
main();

// // Global Error handler
// app.use(globalErrorHandler);

// onError middleware
app.onError(onError);

// 404
app.notFound(notFoundMiddleware);

// route handlers
app.route('/api/v1', router);

// Root path handler
app.get('/', c => {
	return sendResponse(c, {
		statusCode: 200,
		success: true,
		message: 'Congratulations! Your API is working',
		data: 'Welcome to your API',
	});
});

// error test
app.get('/err', c => {
	throw new Error('Test global error handler');
});

// 404 not found
app.use(notFound);

const port = process.env.PORT || 5000;

console.log(`Running at http://localhost:${port}`);

export default {
	fetch: handle(app),
	port,
};
