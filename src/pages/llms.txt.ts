import { buildLlmsTxt } from "@/data/llms-manifest";

export function GET() {
	return new Response(buildLlmsTxt(), {
		status: 200,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=300",
		},
	});
}
