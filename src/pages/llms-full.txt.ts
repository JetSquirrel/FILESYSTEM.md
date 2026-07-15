import { buildLlmsFullTxt } from "@/data/llms-manifest";

export function GET() {
	return new Response(buildLlmsFullTxt(), {
		status: 200,
		headers: {
			"Content-Type": "text/plain; charset=utf-8",
			"Cache-Control": "public, max-age=300",
		},
	});
}
