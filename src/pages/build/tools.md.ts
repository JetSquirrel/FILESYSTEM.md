import docSource from "../../content/docs/build-tools.md?raw";

export function GET() {
	return new Response(docSource, {
		status: 200,
		headers: {
			"Content-Type": "text/markdown; charset=utf-8",
			"Cache-Control": "public, max-age=300",
		},
	});
}
